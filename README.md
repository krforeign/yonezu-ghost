# 米津玄師 2026 TOUR / GHOST — 팬페이지 (Cloudflare 버전)

공연 정보 · 콜 가이드 · 공연 기록(영수증) · 셋리스트 통계를 한 페이지에 담은 팬 사이트입니다.
이 폴더는 **Cloudflare Workers + D1**에서 돌아가도록 옮긴 버전이에요. 화면과 기능은 Vercel 버전과 같습니다.

## 구조

```
public/          화면 (HTML/CSS/JS, 정적 파일 그대로 배포)
  dict/          일본어 형태소 사전 (발음 자동 입력용, 편집자만 처음 1번 내려받음)
  vendor/        kuromoji(형태소 분석기), 가나→한글 변환
  _headers       보안 헤더 + 캐시 규칙
worker/          /api/* 를 처리하는 Worker
  index.js       라우터
  routes.js      data · login · translate · lrclib · requests
  store.js       D1 저장소 (가이드 데이터, 요청함)
  auth.js        관리자 로그인 토큰 (HMAC, 30일)
  ratelimit.js   IP별 횟수 제한 (D1)
wrangler.jsonc   Cloudflare 설정
schema.sql       D1 테이블 (Worker가 처음 실행 때 자동으로 만들어서 선택 사항)
```

Vercel 버전과 달라진 점
- 저장소: Upstash Redis → **Cloudflare D1** (무료 플랜 하루 읽기 500만 행 / 쓰기 10만 행, 용량 5GB)
- 발음 자동 입력: 서버 → **브라우저**에서 실행. Workers 무료 플랜은 요청당 CPU 10ms라 사전 로딩이 불가능해서요. 편집 화면에서 처음 누를 때 사전(약 17MB)을 한 번 받고, 이후엔 브라우저 캐시를 씁니다. 방문자는 이 파일을 받지 않아요.
- Vercel Analytics 제거 → 원하면 Cloudflare Web Analytics로 대체 (아래 참고)

## 배포 방법

Node.js 18 이상과 Cloudflare 계정(무료)이 필요해요.

```bash
npm install
npx wrangler login                      # 브라우저에서 Cloudflare 로그인
npx wrangler d1 create yonezu-ghost     # 출력된 database_id 복사
```

`wrangler.jsonc`의 `PASTE-YOUR-DATABASE-ID-HERE`를 복사한 ID로 바꾼 뒤:

```bash
npx wrangler secret put ADMIN_PASSWORD  # 관리자 비밀번호 입력
npx wrangler secret put DEEPL_API_KEY   # (선택) 번역 자동 입력용 DeepL 키
npx wrangler deploy
```

끝나면 `https://yonezu-ghost.<계정이름>.workers.dev` 주소가 나옵니다.

**GitHub로 자동 배포하고 싶다면**: 이 폴더를 GitHub 저장소에 올린 뒤, Cloudflare 대시보드 → Workers & Pages → Create → Import a repository 에서 연결하면 push할 때마다 배포됩니다. 이 경우에도 D1 생성·ID 입력과 시크릿 설정(대시보드 → 해당 Worker → Settings → Variables and Secrets)은 한 번 해 주세요.

### 기본 관리자 비밀번호

기본값은 **없습니다**. `ADMIN_PASSWORD` 시크릿을 넣기 전에는 로그인이 막혀 있어요.

### 환경 변수 (모두 Settings → Variables and Secrets)

| 이름 | 필수 | 설명 |
|---|---|---|
| `ADMIN_PASSWORD` | ✔ | 관리자 비밀번호 |
| `DEEPL_API_KEY` | | 가사 번역 자동 입력 (무료 키는 `:fx`로 끝남) |
| `AUTH_SECRET` | | 로그인 토큰 서명 키. 비워 두면 비밀번호에서 만들어져서, 비밀번호를 바꾸면 기존 로그인이 모두 풀려요 |
| `DATA_KEY` | | 저장 키 이름 (기본 `yonezu:data`) |
| `LRCLIB_USER_AGENT` | | LRCLIB 가사 검색 시 보낼 User-Agent |

## 로컬에서 실행

```bash
cp .dev.vars.example .dev.vars          # ADMIN_PASSWORD=test
npm run dev                             # http://localhost:8787
```

로컬 실행은 로컬 D1(파일)을 쓰기 때문에 실제 사이트 데이터에는 영향이 없어요.

## 데이터 백업 · 확인

```bash
# 저장된 가이드 데이터 보기
npx wrangler d1 execute yonezu-ghost --remote --command "SELECT k, at, length(v) FROM kv"
# 요청함 최근 10개
npx wrangler d1 execute yonezu-ghost --remote --command "SELECT at, status, substr(body,1,80) FROM requests ORDER BY at DESC LIMIT 10"
# 전체 백업 파일로 내보내기
npx wrangler d1 export yonezu-ghost --remote --output backup.sql
```

저장할 때마다 직전 버전이 `yonezu:data:prev`로 남아서, 실수로 덮어써도 되돌릴 수 있어요.

## Cloudflare Web Analytics (선택)

대시보드 → Analytics & Logs → Web Analytics → Add a site 에서 토큰을 받은 뒤,
`public/index.html` 아래쪽 주석 속 `<script ... beacon.min.js ...>` 줄의 `YOUR_TOKEN`을 바꾸고 주석을 풀어 주세요.
(`*.workers.dev`가 아닌 Cloudflare에 연결된 내 도메인이면 대시보드에서 자동 삽입을 켜도 됩니다.)

## 내 도메인 연결 (선택)

도메인이 Cloudflare에 등록돼 있으면 Worker → Settings → Domains & Routes → Add → Custom domain.
연결 후 `public/app.js`에서 `yonezu-ghost.workers.dev`를 검색해 새 주소로 바꾸면 영수증 X 공유 링크도 그 주소로 나갑니다.

## 안전 장치

- 관리자 API는 모두 로그인 토큰 필요, 로그인은 IP당 15분 8회 · 시간당 오답 60회 제한
- 요청함: IP당 하루 10건, 전체 하루 300건, 500건 넘으면 오래된 것부터 삭제, 30일 지나면 자동 삭제, 봇 방지 함정 필드
- 저장 시 다른 기기에서 먼저 저장했으면 덮어쓰지 않고 충돌로 알림
- 가사 원문은 넣지 않습니다 (가사는 각 곡 페이지에서 LRCLIB 싱크 가사를 실시간으로 불러와 보여 주기만 함)

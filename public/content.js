/* Static site content (bilingual). Edit freely.
   米津玄師 2026 TOUR / GHOST fan page. Facts: official announcements, Wikipedia, fan setlist records (2026-11-15). */

/* ---- GHOST tour dates (start time in local time; tz = UTC offset of the venue) ---- */
const GHOST_DATES = [
  {d:'2026-11-06', st:'18:30', op:'17:00', tz:'+09:00', city:'長野', cityKo:'나가노', v:'長野ビッグハット'},
  {d:'2026-11-07', st:'17:00', op:'15:30', tz:'+09:00', city:'長野', cityKo:'나가노', v:'長野ビッグハット'},
  {d:'2026-11-11', st:'18:30', op:'17:00', tz:'+09:00', city:'神奈川', cityKo:'가나가와', v:'K-Arena Yokohama'},
  {d:'2026-11-12', st:'18:30', op:'17:00', tz:'+09:00', city:'神奈川', cityKo:'가나가와', v:'K-Arena Yokohama'},
  {d:'2026-11-18', st:'18:30', op:'17:00', tz:'+09:00', city:'大阪', cityKo:'오사카', v:'大阪城ホール'},
  {d:'2026-11-19', st:'18:30', tz:'+09:00', city:'大阪', cityKo:'오사카', v:'大阪城ホール'},
  {d:'2026-11-27', st:'18:30', tz:'+09:00', city:'福岡', cityKo:'후쿠오카', v:'マリンメッセ福岡 A館'},
  {d:'2026-11-28', st:'17:00', tz:'+09:00', city:'福岡', cityKo:'후쿠오카', v:'マリンメッセ福岡 A館'},
  {d:'2026-12-03', st:'18:30', tz:'+09:00', city:'宮城', cityKo:'미야기', v:'セキスイハイムスーパーアリーナ'},
  {d:'2026-12-04', st:'18:30', tz:'+09:00', city:'宮城', cityKo:'미야기', v:'セキスイハイムスーパーアリーナ'},
  {d:'2026-12-08', st:'18:30', tz:'+09:00', city:'愛知', cityKo:'아이치', v:'ポートメッセなごや 第1展示館'},
  {d:'2026-12-09', st:'18:30', tz:'+09:00', city:'愛知', cityKo:'아이치', v:'ポートメッセなごや 第1展示館'},
  {d:'2026-12-16', st:'18:30', tz:'+09:00', city:'神奈川', cityKo:'가나가와', v:'K-Arena Yokohama', fin:true},
  {d:'2026-12-17', st:'18:30', tz:'+09:00', city:'神奈川', cityKo:'가나가와', v:'K-Arena Yokohama', fin:true},
  {d:'2026-12-26', st:'18:00', tz:'+08:00', city:'台北', cityKo:'타이베이', v:'TAIPEI DOME', world:true},
  {d:'2026-12-27', st:'18:00', tz:'+08:00', city:'台北', cityKo:'타이베이', v:'TAIPEI DOME', world:true},
  {d:'2027-01-14', tz:'+09:00', city:'ソウル', cityKo:'서울', v:'INSPIRE ARENA', world:true},
  {d:'2027-01-16', tz:'+09:00', city:'ソウル', cityKo:'서울', v:'INSPIRE ARENA', world:true},
  {d:'2027-01-17', tz:'+09:00', city:'ソウル', cityKo:'서울', v:'INSPIRE ARENA', world:true},
  {d:'2027-01-29', tz:'+08:00', city:'シンガポール', cityKo:'싱가포르', v:'Singapore Indoor Stadium', world:true},
  {d:'2027-01-30', st:'20:00', tz:'+08:00', city:'シンガポール', cityKo:'싱가포르', v:'Singapore Indoor Stadium', world:true},
  {d:'2027-02-04', st:'20:00', tz:'-08:00', city:'オークランド', cityKo:'오클랜드', v:'Oakland Arena', world:true},
  {d:'2027-02-06', tz:'-08:00', city:'ロサンゼルス', cityKo:'로스앤젤레스', v:'Kia Forum', world:true},
  {d:'2027-02-09', tz:'-06:00', city:'メキシコシティ', cityKo:'멕시코시티', v:'Palacio de los Deportes', world:true},
  {d:'2027-02-12', st:'20:00', tz:'-05:00', city:'ニューヨーク/ニューアーク', cityKo:'뉴욕/뉴어크', v:'Prudential Center', world:true},
  {d:'2027-02-14', st:'19:00', tz:'-05:00', city:'トロント', cityKo:'토론토', v:'Scotiabank Arena', world:true},
  {d:'2027-02-24', tz:'+00:00', city:'ロンドン', cityKo:'런던', v:'The O2 Arena', world:true},
  {d:'2027-02-26', tz:'+01:00', city:'パリ', cityKo:'파리', v:'Accor Arena', world:true},
  {d:'2027-02-28', st:'20:00', tz:'+01:00', city:'アムステルダム', cityKo:'암스테르담', v:'Ziggo Dome', world:true}
];
const showStart = g=>new Date(g.d+'T'+(g.st||'00:00')+':00'+g.tz);
// debut days: Hachi's first original upload, and the first album under his own name
const DEBUTS = [
  {id:'hachi', d:'2009-05-20', ja:'ボカロP デビューから', ko:'보카로P 데뷔', sj:'ハチ「お姫様は電子音で眠る」', sk:'하치 「お姫様は電子音で眠る」'},
  {id:'kenshi', d:'2012-05-16', ja:'米津玄師 デビューから', ko:'요네즈 켄시 데뷔', sj:'1st Album『diorama』', sk:'1st Album 『diorama』'}
];

const T = {
  ja:{
    langName:'日本語', fanpage:'GHOST Fan Page', tabMain:'メイン', tabCall:'コールガイド',
    navInfo:'公演情報', navMembers:'プロフィール', navHistory:'ヒストリー', navSetlist:'セットリスト',
    navCallTop:'曲一覧', navWatch:'見どころ', navManner:'マナー', toBudo:'次の公演まで',
    countNote:'次の公演の開演 (現地時間) までのカウントダウン', countLive:'いま公演中!', countDone:'GHOST、ありがとう。',
    outline:'Outline', schedule:'Ticket Schedule', ep:'公式チケットサイト ↗',
    resale:'チケットの受付はすべて終了しています。最新情報は公式サイト・公式チケットサイトで確認してください。',
    stLive:'受付中', stDone:'終了', stSoon:'予定',
    membersLabel:'プロフィール', historyLabel:'ヒストリー 2009 — 2027', setlistLabel:'最近のセットリスト', infoLabel:'公演情報',
    membersLead:'作詞・作曲・編曲から歌、ジャケットのイラスト、ときには映像まで自分で手がけるシンガーソングライター。ボカロP「ハチ」として2009年に活動を始め、2012年に本名でデビューしました。ライブはサポートメンバーとのバンド編成で行われます。',
    historyLead:'ニコニコ動画への初投稿から、ドームツアー、世界ツアーまで。おもな出来事をたどります。',
    setlistLead:'GHOST の各公演と、過去ツアーの最終公演のセットリスト。CALL マークの曲はタップするとコールガイドへ。もっと詳しい比較は「統計」タブへ。',
    freqH:'GHOST 予習の優先度', freqP:'これまでの GHOST 公演 (セトリ登録済み) のうち何回演奏されたか。多い曲ほど次の公演でも聴ける可能性が高めです。',
    songsUnit:'曲', encore:'ENCORE', bd:'誕生日', from:'出身', blood:'血液型', bloodSuffix:'型',
    footer:'非公式ファンページです。アーティスト・所属事務所 (REISSUE RECORDS / Sony Music Labels) とは関係ありません。情報は公式発表・公開記事・ファンの記録をもとにまとめています。変更があれば公式発表を優先してください。',
    callLead:'米津玄師・ハチの曲をアルバムごとに収録。曲をタップすると、歌詞に合わせて呼応や見どころが流れるガイドが開きます。米津玄師のライブはコールより「聴く」場面が多め。一緒に歌う・手を挙げる場面はステージの合図を最優先に。',
    legend:'READING THE GUIDE',
    acts:{cr:'コール&レスポンス', shout:'みんなで叫ぶ', clap:'クラップ', jump:'ジャンプ', sing:'一緒に歌う', watch:'見どころ (コールなし)'},
    lyricsReady:'同期歌詞あり', lyricsNone:'コールのみ', lines:'行',
    watchH:'見逃し厳禁', mannerH:'アリーナ公演のマナー',
    back:'← 曲一覧', ytOpen:'YouTube で見る', ytSub:'公式動画を新しいタブで開きます', ytSearch:'YouTube で探す', ytSearchSub:'動画リンクは準備中です',
    playerHint:'YouTubeの再生と同時に ▶ を押すと歌詞が流れます。時刻をタップするとその位置へ。',
    autoScroll:'自動スクロール', noLines:'まだ歌詞・コールが登録されていません。', ytAt:'この位置からYouTubeで再生',
    credit:'クレジット', level:'コール難易度', source:'出典',
    /* owner */
    ownerOn:'編集モード', ownerOff:'編集を終える', addSong:'+ 曲を追加', editSong:'この曲を編集', done:'編集を閉じる',
    draftBar:'未公開の変更があります', publish:'保存して公開', discard:'変更を破棄', discardSure:'本当に破棄', cancel:'やめる',
    publishing:'公開中…', published:'公開しました。ページを再読み込みします。',
    errWriter:'この画面からは保存できません (編集権限がありません)。', errConflict:'別の版が先に公開されました。最新版を読み込みます。', errRate:'保存が続いています。少し待ってからもう一度。', errOther:'保存できませんでした: ',
    restore:'前回の未公開の編集が残っています。', restoreYes:'復元する', restoreNo:'捨てる',
    fBasic:'曲の情報', fTitle:'曲名 (日本語)', fKo:'韓国語の読み', fCredit:'作詞・作曲', fAlbum:'収録', fYt:'YouTube URL', fLevel:'難易度 (1〜3)', fNoteJa:'ひとこと (日本語)', fNoteKo:'ひとこと (韓国語)', fSrc:'出典',
    fLines:'歌詞 & コール', fLinesP:'1行ずつ: 時刻 / 歌詞 / コール / 種類。「詳細」にセクション名・韓国語の読み・メモ。時刻は 1:23.4 形式。',
    fBulk:'歌詞をまとめて貼り付け (1行 = 1行)', fBulkBtn:'下に追加', addLine:'+ 行を追加',
    lTime:'時刻', lLy:'歌詞', lCall:'コール・動作', lSec:'セクション (サビ等)', lSub:'韓国語の読み/訳', lMj:'メモ (日本語)', lMk:'メモ (韓国語)', lMore:'詳細', actNone:'— 種類なし —',
    tapH:'タップで時刻を記録', tapP:'YouTubeの再生と同時に「スタート」。歌詞が歌われた瞬間に大きいボタン (PCはスペースキー) をタップすると、その行に時刻が入って次の行へ進みます。行の ◎ で開始位置を選べます。',
    tapStart:'スタート', tapStop:'ストップ', tapReset:'0に戻す', tapBtn:'タップ ⏎', tapNext:'次: ', tapEnd:'最後の行まで記録しました',
    moveUp:'前へ', moveDown:'後ろへ', delSong:'この曲を削除', delSure:'削除する', untitled:'新しい曲',
    fDisc:'収録作品', fNo:'曲順 (トラック番号)', fCreditKo:'作詞・作曲 (韓国語)', fLyr:'歌詞ページ URL (空欄なら作品ページ)', fAlbum2:'補足 (配信日など)',
    lyrics:'歌詞を見る (Genius) ↗', track:'Track', ref:'EP版と同じ曲 →', discLyr:'歌詞 (Genius) ↗', songsCount:'曲', pending:'準備中',
    st1:'歌詞の原文入力', st2:'発音・翻訳の確認', st3:'歌詞の同期', st4:'コール・合唱の入力',
    st1p:'日本語の原文歌詞を1小節 = 1行で入力してください。LRC / SRT ファイルを読み込むとタイミングも一緒に入ります。',
    st1ph:'発音や翻訳は入れずに、原文だけを小節ごとに入力してください', lrcUpload:'LRC / SRT を読み込む',
    importedTimes:'{n}行分のタイミングを読み込みました。「次へ」で反映されます。', next:'次へ', prev:'戻る',
    st2p:'各行の発音(ハングル表記)と翻訳を確認して直してください。韓国語モードで歌詞の下に表示されます。+ で行を追加。',
    fOrig:'原文', fPr:'発音', fTr:'翻訳', unsynced:'未設定', bulkH:'まとめて貼り付け', bulkPr:'発音 (1行ずつ)', bulkTr:'翻訳 (1行ずつ)', apply:'を反映',
    st3p:'再生しながら、歌い出しの瞬間に「タップ」(PCはスペースキー)。◎ で記録を始める行を選べます。時刻を押すとその少し前から再生。',
    fromHere:'ここから記録', setNow:'今の時間を入れる',
    st4p:'① 上で呼応を選ぶ → ② 歌詞の文字を2回タップして区間を指定(始まり → 終わり)。消しゴムで区間を消せます。「+ 呼応だけの行」で前奏・間奏などのコールを追加。',
    pickCheer:'呼応を選択', erase:'消しゴム', customCheer:'オリジナル呼応を追加', ccName:'名前 (日本語)', ccNameKo:'名前 (韓国語)', ccColor:'色', ccIcon:'アイコン', ccAdd:'追加',
    addCheerLine:'呼応だけの行', fLabel:'区間名 (前奏・間奏など)', fCall:'コール内容 (例: オイ!)', memo:'メモ',
    curTime:'現在の時間', loadAudio:'手元の音源ファイルで再生', audioHint:'音源ファイルはこの端末の中だけで再生され、アップロードされません。読み込まない場合はタイマーで時間が進みます。',
    audioOn:'読み込んだ音源に合わせて時間が進みます (アップロードはされません)', backGuide:'曲ページへ', edit:'編集', legendSong:'この曲の呼応',
    autoGen:'発音・翻訳を自動入力', genAll:'全部作り直す', genBusy:'Claudeが作成中… {n}/{m}行', genStop:'止める', genOne:'この行を作り直す',
    genHint:'Claudeがあなたのアカウントで、発音(ハングル)と韓国語訳を作ります。「自動入力」は空欄の行だけ、「全部作り直す」は全行を上書き。初回は利用の許可を求められます。結果は必ず確認してください。',
    genDone:'{n}行を入力しました。内容を確認して、必要なら直してください。', genNone:'空欄の行はありません。全行を作り直すなら「全部作り直す」を押してください。',
    genErrGrant:'Claudeの利用が許可されていないため、自動入力は使えません。', genErrRate:'利用が集中しています。少し時間をおいてもう一度押してください。',
    genErrJson:'結果をうまく読み取れませんでした。もう一度押してください。', genErrRefused:'この内容は自動入力できませんでした。手で入力してください。', genErrOther:'自動入力に失敗しました: '
  },
  ko:{
    langName:'한국어', fanpage:'GHOST Fan Page', tabMain:'메인', tabCall:'콜 가이드',
    navInfo:'공연 정보', navMembers:'프로필', navHistory:'연혁', navSetlist:'셋리스트',
    navCallTop:'곡 목록', navWatch:'감상 포인트', navManner:'매너', toBudo:'다음 공연까지',
    countNote:'다음 공연 개연 (현지 시간)까지 남은 시간', countLive:'지금 공연 중!', countDone:'GHOST, 고마웠어요.',
    outline:'Outline', schedule:'Ticket Schedule', ep:'공식 티켓 사이트 ↗',
    resale:'티켓 접수는 모두 끝났어요. 최신 정보는 공식 사이트·공식 티켓 사이트에서 확인해 주세요.',
    stLive:'접수 중', stDone:'종료', stSoon:'예정',
    membersLabel:'프로필', historyLabel:'연혁 2009 — 2027', setlistLabel:'최근 셋리스트', infoLabel:'공연 정보',
    membersLead:'작사·작곡·편곡부터 노래, 재킷 일러스트, 때로는 영상까지 혼자 만드는 싱어송라이터. 2009년 보카로P \'하치\'로 활동을 시작해 2012년 본명으로 데뷔했어요. 라이브는 서포트 멤버와 함께하는 밴드 편성이에요.',
    historyLead:'니코니코 동화 첫 투고부터 돔 투어, 월드 투어까지. 주요 사건을 따라가 보세요.',
    setlistLead:'GHOST 각 공연과 지난 투어 마지막 공연의 셋리스트예요. CALL 표시가 붙은 곡은 누르면 콜 가이드로 이동해요. 자세한 비교는 \'통계\' 탭에서.',
    freqH:'GHOST 예습 우선순위', freqP:'지금까지의 GHOST 공연(셋리 등록된 공연) 중 몇 번 연주됐는지 센 숫자예요. 많이 나온 곡일수록 다음 공연에서도 들을 가능성이 높아요.',
    songsUnit:'곡', encore:'ENCORE', bd:'생일', from:'출신', blood:'혈액형', bloodSuffix:'형',
    footer:'비공식 팬페이지 · 아티스트 및 소속사(REISSUE RECORDS / Sony Music Labels)와 무관합니다. 공식 발표·공개 기사·팬들의 기록을 바탕으로 정리했고, 바뀐 내용이 있으면 공식 발표를 우선해 주세요.',
    callLead:'요네즈 켄시·하치의 곡을 앨범별로 모았어요. 곡을 누르면 가사에 맞춰 호응과 감상 포인트가 흘러가는 가이드가 열려요. 요네즈 켄시 라이브는 콜보다 \'듣는\' 순간이 많은 편. 따라 부르기·손 들기는 무대의 신호를 가장 먼저 따라 주세요.',
    legend:'READING THE GUIDE',
    acts:{cr:'콜 앤 리스폰스', shout:'다 같이 외치기', clap:'클랩', jump:'점프', sing:'따라 부르기', watch:'감상 포인트 (콜 없음)'},
    lyricsReady:'싱크 가사 있음', lyricsNone:'콜만 있음', lines:'줄',
    watchH:'놓치지 말 것', mannerH:'아레나 공연 매너',
    back:'← 곡 목록', ytOpen:'YouTube에서 보기', ytSub:'공식 영상을 새 탭으로 열어요', ytSearch:'YouTube에서 찾기', ytSearchSub:'영상 링크 준비 중이에요',
    playerHint:'YouTube 재생과 동시에 ▶를 누르면 가사가 흘러가요. 시간을 누르면 그 위치로 이동.',
    autoScroll:'자동 스크롤', noLines:'아직 가사·콜이 등록되지 않았어요.', ytAt:'이 위치부터 YouTube에서 재생',
    credit:'크레딧', level:'콜 난이도', source:'출처',
    ownerOn:'편집 모드', ownerOff:'편집 끝내기', addSong:'+ 곡 추가', editSong:'이 곡 편집', done:'편집 닫기',
    draftBar:'공개하지 않은 변경 사항이 있어요', publish:'저장하고 공개', discard:'변경 취소', discardSure:'정말 취소', cancel:'그만두기',
    publishing:'공개하는 중…', published:'공개했어요. 페이지를 다시 불러옵니다.',
    errWriter:'이 화면에서는 저장할 수 없어요 (편집 권한 없음).', errConflict:'다른 버전이 먼저 공개됐어요. 최신 버전을 불러옵니다.', errRate:'저장이 너무 잦아요. 잠시 후 다시 시도하세요.', errOther:'저장하지 못했어요: ',
    restore:'지난번에 공개하지 않은 편집이 남아 있어요.', restoreYes:'복원하기', restoreNo:'버리기',
    fBasic:'곡 정보', fTitle:'곡 제목 (일본어)', fKo:'한국어 읽기', fCredit:'작사·작곡', fAlbum:'수록', fYt:'YouTube URL', fLevel:'난이도 (1~3)', fNoteJa:'한마디 (일본어)', fNoteKo:'한마디 (한국어)', fSrc:'출처',
    fLines:'가사 & 콜', fLinesP:'한 줄씩: 시간 / 가사 / 콜 / 종류. \'상세\'에 구간 이름·한국어 발음·메모. 시간은 1:23.4 형식.',
    fBulk:'가사 한꺼번에 붙여넣기 (한 줄 = 한 줄)', fBulkBtn:'아래에 추가', addLine:'+ 줄 추가',
    lTime:'시간', lLy:'가사', lCall:'콜·동작', lSec:'구간 (후렴 등)', lSub:'한국어 발음/번역', lMj:'메모 (일본어)', lMk:'메모 (한국어)', lMore:'상세', actNone:'— 종류 없음 —',
    tapH:'탭으로 시간 기록', tapP:'YouTube 재생과 동시에 \'시작\'. 가사가 불리는 순간 큰 버튼(PC는 스페이스바)을 누르면 그 줄에 시간이 들어가고 다음 줄로 넘어가요. 각 줄의 ◎로 시작 위치를 고를 수 있어요.',
    tapStart:'시작', tapStop:'정지', tapReset:'0으로', tapBtn:'탭 ⏎', tapNext:'다음: ', tapEnd:'마지막 줄까지 기록했어요',
    moveUp:'앞으로', moveDown:'뒤로', delSong:'이 곡 삭제', delSure:'삭제하기', untitled:'새 곡',
    fDisc:'수록 작품', fNo:'곡 순서 (트랙 번호)', fCreditKo:'작사·작곡 (한국어)', fLyr:'가사 페이지 URL (비우면 작품 페이지)', fAlbum2:'보충 (배신일 등)',
    lyrics:'가사 보기 (Genius) ↗', track:'Track', ref:'EP 버전과 같은 곡 →', discLyr:'가사 (Genius) ↗', songsCount:'곡', pending:'준비 중',
    st1:'가사 원문 입력', st2:'발음·번역 확인', st3:'가사 싱크', st4:'호응·떼창 입력',
    st1p:'일본어 원문 가사를 한 소절 = 한 줄로 입력하세요. LRC / SRT 파일을 불러오면 타이밍도 함께 들어가요.',
    st1ph:'발음이나 번역은 빼고 원문 가사만 소절 단위로 입력해 주세요', lrcUpload:'LRC / SRT 불러오기',
    importedTimes:'{n}줄의 타이밍을 불러왔어요. \'다음\'을 누르면 반영돼요.', next:'다음', prev:'이전',
    st2p:'각 줄의 발음(한글 표기)과 번역을 확인하고 고쳐 주세요. 한국어 모드에서 가사 아래에 표시돼요. +로 줄 추가.',
    fOrig:'원문', fPr:'발음', fTr:'번역', unsynced:'미설정', bulkH:'한꺼번에 붙여넣기', bulkPr:'발음 (한 줄씩)', bulkTr:'번역 (한 줄씩)', apply:'반영',
    st3p:'재생하면서 가사가 시작되는 순간 \'탭\'(PC는 스페이스바). ◎로 기록을 시작할 줄을 고를 수 있어요. 시간을 누르면 조금 앞에서부터 재생.',
    fromHere:'여기서부터 기록', setNow:'현재 시간 넣기',
    st4p:'① 위에서 호응을 고르고 → ② 가사 글자를 두 번 탭해서 구간을 지정(시작 → 끝). 지우개로 구간을 지울 수 있어요. \'+ 호응 전용 줄\'로 전주·간주 같은 콜을 추가하세요.',
    pickCheer:'호응 선택', erase:'지우개', customCheer:'커스텀 호응 추가', ccName:'이름 (일본어)', ccNameKo:'이름 (한국어)', ccColor:'색', ccIcon:'아이콘', ccAdd:'추가',
    addCheerLine:'호응 전용 줄', fLabel:'구간 이름 (전주·간주 등)', fCall:'콜 내용 (예: オイ!)', memo:'메모',
    curTime:'현재 시간', loadAudio:'내 음원 파일로 재생', audioHint:'음원 파일은 이 기기 안에서만 재생되고 업로드되지 않아요. 불러오지 않으면 타이머로 시간이 흘러가요.',
    audioOn:'불러온 음원에 맞춰 시간이 흘러가요 (업로드 안 됨)', backGuide:'곡 페이지로', edit:'편집', legendSong:'이 곡의 호응',
    autoGen:'발음·번역 자동 입력', genAll:'전부 다시 만들기', genBusy:'Claude가 만드는 중… {n}/{m}줄', genStop:'멈추기', genOne:'이 줄 다시 만들기',
    genHint:'Claude가 당신 계정으로 발음(한글 표기)과 한국어 번역을 만들어요. \'자동 입력\'은 빈 줄만, \'전부 다시 만들기\'는 모든 줄을 덮어써요. 처음엔 사용 허용을 물어봐요. 결과는 꼭 확인해 주세요.',
    genDone:'{n}줄을 채웠어요. 내용을 확인하고 필요하면 고쳐 주세요.', genNone:'빈 줄이 없어요. 모든 줄을 새로 만들려면 \'전부 다시 만들기\'를 누르세요.',
    genErrGrant:'Claude 사용이 허용되지 않아 자동 입력을 쓸 수 없어요.', genErrRate:'사용량이 몰렸어요. 잠시 뒤 다시 눌러 주세요.',
  }
};

/* ---- strings for the GHOST page, profile, statistics ---- */
Object.assign(T.ja, {
  grpShows:'{n}公演', grpPicked:'{n}/{m} チェック', grpPickAll:'このツアーをすべてチェック', grpUnpick:'チェックを外す', grpSpan:'年をまたぐツアー',
  callTourAll:'すべての曲', callTourH:'ツアーで絞り込む', callTourN:'{t} で演奏された曲', sortRelease:'新しいリリース順', unreleased:'未リリース', relDate:'リリース',
  songLivesH:'この曲を演奏した公演', songLivesNone:'まだライブでの演奏記録がありません。', songLivesN:'{n}公演',
  rcCtaH:'行ったライブを、<wbr>1枚のレシートに。', rcCtaP:'参加した公演にチェックするだけで、公演数・聴いた曲・いちばん多く聴いた曲 TOP10 をまとめたレシート画像ができます。そのまま保存して X でシェアできます。',
  rcStep1:'公演にチェック', rcStep2:'レシートができる', rcStep3:'保存・X でシェア', rcCtaGo:'レシートを作る', rcX:'X でポスト', rcXNote:'画像を保存しました。ポストに添付してください。', rcXText:'米津玄師のライブに{n}公演参加しました',
  lsList:'公演一覧', lsStats:'セトリ統計', lsShows:'集計した公演', lsTotal:'のべ演奏曲数', lsUnique:'演奏された曲', lsAvg:'1公演あたり',
  lsRankH:'よく演奏される曲', lsFirstH:'1曲目に多い曲', lsLastH:'最後に多い曲', lsUnplayedH:'この条件で演奏されていない曲',
  lsShowAll:'すべて表示', lsTopOnly:'上位だけ表示', lsSeeStats:'セトリ統計を見る',
  lsBasis:'上の年・種類・検索の条件で集計しています。ツアーは各公演を1回ずつ数え、セトリ未登録の公演と開催前の公演は入りません。GHOST のスイッチを切ると今回のツアー分を除いて集計します。',
  lsNone:'この条件ではセトリのある公演がありません。', lsPick:'公演を選ぶとセットリストが表示されます。', lsSearch:'公演名・会場・地域で検索',
  tabStats:'統計', navStats:'セトリ統計', heroSub:'米津玄師 2026 TOUR / GHOST', heroWorld:'→ 2026-2027 WORLD TOUR / GHOST',
  nextShow:'次の公演', allDone:'全公演が終了しました', timeTbd:'開演時間は未発表', open:'開場', start:'開演',
  datesH:'ツアー日程', datesJp:'国内 6都市14公演', datesWorld:'WORLD TOUR 11都市15公演', played:'終了', today:'本日',
  bandH:'Support Band', since:'から', height:'身長', alias:'ボカロP名義',
  statsLabel:'セットリスト統計', statsLead:'登録されているセットリストから集計しています。ツアーを選ぶと、公演ごとにセトリがどう変わったか・アルバムごとの割合・曲別の回数がわかります。',
  ghostOn:'GHOST のセトリを含める', ghostOnSub:'ON: 進行中のツアーも集計に入れる / OFF: 過去の公演だけで集計 (コールガイドの「ライブ○回」にも反映)',
  ghostOffNote:'いまは GHOST のセトリを集計から外しています。', ghostTurnOn:'GHOST を含める',
  scopeAll:'総合', tourBack:'ツアー一覧に戻る', scopeTours:'ツアー', kindsH:'集計する公演',
  tShows:'公演', tPlays:'演奏 (延べ)', tUnique:'曲の種類', tAvg:'1公演の平均曲数', tCore:'全公演で演奏', tRotate:'日替わり・入れ替え', tSpan:'期間',
  albumMixH:'アルバム別の割合', albumMixP:'演奏された曲がどの作品に収録されているか (延べ回数の割合)。',
  albumCol:'作品', playsCol:'延べ', uniqueCol:'曲', coverCol:'収録曲のうち演奏', shareCol:'割合',
  tourMixH:'ツアーごとのアルバム構成', tourMixP:'各ツアーで演奏された曲のアルバム内訳。行をタップするとそのツアーの詳細へ。',
  matrixH:'公演ごとのセトリの変化', matrixP:'数字はその公演での曲順 (EN = アンコール)。空欄はその日に演奏されなかった曲。色の付いた行が入れ替わりのあった曲です。',
  diffH:'前の公演からの変化', added:'追加', dropped:'外れた', moved:'曲順だけ変更', same:'前の公演と同じ', firstShow:'ツアー初日',
  premiere:'初披露', daily:'日替わり', songCountH:'曲別の回数', songCountP:'このツアーで演奏された回数 / 公演数。',
  rankH:'曲別ライブ回数', rankP:'登録されている全セトリでの演奏回数 (SEは除く)。', showZero:'未演奏の曲も表示', firstPlayed:'初演奏', lastPlayed:'最近',
  stSortPlays:'回数順', stSortAlbum:'アルバム順', stSortTitle:'曲名順', stSortRecent:'最近演奏した順', noData:'セトリが登録されていません。',
  futureN:'セトリ未登録 {n}公演 (予定を含む)', perShow:'公演',
  statsLink:'セトリ統計をくわしく見る →', ghostChip:'GHOST', ghostOffChip:'GHOST (OFF)',
  kS2:'ワンマン', kF2:'フェス', kE2:'イベント・TV'
});
Object.assign(T.ko, {
  grpShows:'{n}공연', grpPicked:'{n}/{m} 체크', grpPickAll:'이 투어 모두 체크', grpUnpick:'체크 해제', grpSpan:'해를 넘기는 투어',
  callTourAll:'모든 곡', callTourH:'투어로 보기', callTourN:'{t}에서 부른 곡', sortRelease:'최신 발매순', unreleased:'미발매', relDate:'발매',
  songLivesH:'이 곡을 부른 공연', songLivesNone:'아직 라이브 연주 기록이 없어요.', songLivesN:'{n}공연',
  rcCtaH:'다녀온 공연을 <wbr>한 장의 영수증으로.', rcCtaP:'다녀온 공연에 체크만 하면 공연 수·들은 곡·가장 많이 들은 곡 TOP10을 담은 영수증 이미지가 만들어져요. 바로 저장하고 X에 공유할 수 있어요.',
  rcStep1:'공연에 체크', rcStep2:'영수증 완성', rcStep3:'저장·X 공유', rcCtaGo:'영수증 만들기', rcX:'X에 공유', rcXNote:'이미지를 저장했어요. 게시물에 첨부해 주세요.', rcXText:'요네즈 켄시 라이브에 {n}공연 다녀왔어요',
  lsList:'공연 목록', lsStats:'셋리스트 통계', lsShows:'집계한 공연', lsTotal:'연주된 곡 (누적)', lsUnique:'연주된 곡 종류', lsAvg:'공연당 평균',
  lsRankH:'자주 연주되는 곡', lsFirstH:'첫 곡으로 많이 한 곡', lsLastH:'마지막 곡으로 많이 한 곡', lsUnplayedH:'이 조건에서 연주되지 않은 곡',
  lsShowAll:'모두 보기', lsTopOnly:'상위만 보기', lsSeeStats:'셋리스트 통계 보기',
  lsBasis:'위의 연도 · 종류 · 검색 조건으로 집계해요. 투어는 공연마다 한 번씩 세고, 셋리스트가 없는 공연과 아직 열리지 않은 공연은 빠져요. GHOST 스위치를 끄면 이번 투어 공연은 빼고 집계해요.',
  lsNone:'이 조건에는 셋리스트가 있는 공연이 없어요.', lsPick:'공연을 고르면 셋리스트가 표시돼요.', lsSearch:'공연명·공연장·지역으로 검색',
  tabStats:'통계', navStats:'셋리 통계', heroSub:'米津玄師 2026 TOUR / GHOST', heroWorld:'→ 2026-2027 WORLD TOUR / GHOST',
  nextShow:'다음 공연', allDone:'모든 공연이 끝났어요', timeTbd:'개연 시간 미발표', open:'개장', start:'개연',
  datesH:'투어 일정', datesJp:'일본 6도시 14공연', datesWorld:'WORLD TOUR 11도시 15공연', played:'종료', today:'오늘',
  bandH:'Support Band', since:'부터', height:'키', alias:'보카로P 이름',
  statsLabel:'셋리스트 통계', statsLead:'등록된 셋리스트로 집계했어요. 투어를 고르면 공연마다 셋리가 어떻게 바뀌었는지, 앨범별 비율, 곡별 횟수를 볼 수 있어요.',
  ghostOn:'GHOST 셋리 포함하기', ghostOnSub:'ON: 진행 중인 투어도 집계 / OFF: 지난 공연만으로 집계 (콜 가이드의 \'라이브 ○회\'에도 반영)',
  ghostOffNote:'지금은 GHOST 셋리를 집계에서 빼고 있어요.', ghostTurnOn:'GHOST 포함하기',
  scopeAll:'종합', tourBack:'투어 목록으로', scopeTours:'투어', kindsH:'집계할 공연',
  tShows:'공연', tPlays:'연주 (총)', tUnique:'곡 종류', tAvg:'공연당 평균 곡 수', tCore:'모든 공연에서 연주', tRotate:'날마다 바뀐 곡', tSpan:'기간',
  albumMixH:'앨범별 비율', albumMixP:'연주된 곡이 어느 작품에 실린 곡인지 (총 연주 횟수 기준 비율).',
  albumCol:'작품', playsCol:'총', uniqueCol:'곡', coverCol:'수록곡 중 연주', shareCol:'비율',
  tourMixH:'투어별 앨범 구성', tourMixP:'각 투어에서 연주된 곡의 앨범 구성. 줄을 누르면 그 투어 상세로 이동해요.',
  matrixH:'공연별 셋리 변화', matrixP:'숫자는 그 공연에서의 곡 순서 (EN = 앙코르). 빈칸은 그날 연주하지 않은 곡. 색이 칠해진 줄이 공연마다 바뀐 곡이에요.',
  diffH:'직전 공연과 비교', added:'추가', dropped:'빠짐', moved:'곡 순서만 변경', same:'직전 공연과 같음', firstShow:'투어 첫날',
  premiere:'첫 공개', daily:'날마다 바뀜', songCountH:'곡별 횟수', songCountP:'이 투어에서 연주된 횟수 / 공연 수.',
  rankH:'곡별 라이브 횟수', rankP:'등록된 모든 셋리에서의 연주 횟수 (SE 제외).', showZero:'연주 안 된 곡도 보기', firstPlayed:'첫 연주', lastPlayed:'최근',
  stSortPlays:'횟수순', stSortAlbum:'앨범순', stSortTitle:'곡명순', stSortRecent:'최근 연주순', noData:'셋리가 등록되지 않았어요.',
  futureN:'셋리 미등록 {n}공연 (예정 포함)', perShow:'공연',
  statsLink:'셋리 통계 자세히 보기 →', ghostChip:'GHOST', ghostOffChip:'GHOST (OFF)',
  kS2:'단독 공연', kF2:'페스티벌', kE2:'이벤트·TV'
});

const SCHED = [
  {ja:'最速先行 (抽選)', ko:'최속 선행 (추첨)', from:'2025-06-10T12:00:00+09:00', to:'2025-06-15T23:59:00+09:00', wj:'シングル「Plazma / BOW AND ARROW」封入シリアル', wk:'싱글 「Plazma / BOW AND ARROW」 봉입 시리얼'},
  {ja:'2次先行 (抽選)', ko:'2차 선행 (추첨)', from:'2025-09-22T12:00:00+09:00', to:'2025-09-28T23:59:00+09:00', wj:'シングル「IRIS OUT / JANE DOE」封入シリアル', wk:'싱글 「IRIS OUT / JANE DOE」 봉입 시리얼'},
  {ja:'一般発売 (抽選)', ko:'일반 발매 (추첨)', from:'2026-07-07T00:00:00+09:00', to:'2026-07-26T23:59:00+09:00', wj:'7.07 (七夕の日) – 7.26 (幽霊の日) 23:59', wk:'7.07 (칠석) – 7.26 (유령의 날) 23:59'}
];
const TICKET_URL = 'https://ticket.kenshiyonezu.jp/tour/2026';

const INFO = {
  ja:[['ツアー名','米津玄師 2026 TOUR / GHOST','約1年半ぶりのツアー。続けて KENSHI YONEZU 2026-2027 WORLD TOUR / GHOST'],['国内','2026.11.06 (金) – 12.17 (木)','長野・神奈川・大阪・福岡・宮城・愛知の6都市14公演 (アリーナ)'],['海外','2026.12.26 (土) – 2027.02.28 (日)','台北・ソウル・シンガポール・北米5都市・欧州3都市の11都市15公演'],['チケット','指定席・立見 ¥9,900 (税込)','ファンサイトの報道ベース。正確な券種・料金は公式チケットサイトで確認してください'],['オフィシャル','REISSUE RECORDS','reissuerecords.net · X @hachi_08']],
  ko:[['투어명','米津玄師 2026 TOUR / GHOST','약 1년 반 만의 투어. 이어서 KENSHI YONEZU 2026-2027 WORLD TOUR / GHOST'],['일본','2026.11.06 (금) – 12.17 (목)','나가노·가나가와·오사카·후쿠오카·미야기·아이치 6도시 14공연 (아레나)'],['해외','2026.12.26 (토) – 2027.02.28 (일)','타이베이·서울·싱가포르·북미 5도시·유럽 3도시, 11도시 15공연'],['티켓','지정석·스탠딩 ¥9,900 (세금 포함)','보도 기준이에요. 정확한 권종·가격은 공식 티켓 사이트에서 확인해 주세요'],['오피셜','REISSUE RECORDS','reissuerecords.net · X @hachi_08']]
};

const ARTIST = {
  ja:'米津玄師', ko:'요네즈 켄시', en:'Kenshi Yonezu', bd:'1991.03.10', fj:'徳島県', fk:'도쿠시마현', blood:'O', h:'188cm',
  bj:'2009年、ボカロP「ハチ」として「マトリョシカ」「パンダヒーロー」などのヒット曲を発表。2012年に本名で『diorama』をリリースし、翌年メジャーデビュー。「Lemon」「KICK BACK」「IRIS OUT」など、ドラマ・アニメ・映画の主題歌を数多く手がけています。',
  bk:'2009년 보카로P \'하치\'로 「マトリョシカ」「パンダヒーロー」 같은 히트곡을 발표했어요. 2012년 본명으로 『diorama』를 내고 이듬해 메이저 데뷔. 「Lemon」「KICK BACK」「IRIS OUT」 등 드라마·애니메이션·영화 주제가를 많이 맡아 왔어요.',
  wj:['ボカロP「ハチ」','イラスト・ジャケットも自作','『LOST CORNER』2024'], wk:['보카로P \'하치\'','일러스트·재킷도 직접','『LOST CORNER』 2024']
};
const MEMBERS = [
  {ja:'中島宏士', ko:'나카지마 코지', part:'Guitar', since:2014},
  {ja:'須藤優', ko:'스도 유', part:'Bass', since:2014},
  {ja:'堀正輝', ko:'호리 마사키', part:'Drums', since:2014},
  {ja:'宮川純', ko:'미야가와 준', part:'Keyboard', since:2023}
];

const HISTORY = {
  2009:[{d:'05',k:'news',tj:'ボカロP「ハチ」として初投稿',tk:'보카로P \'하치\'로 첫 투고',pj:'初音ミクを使った「お姫様は電子音で眠る」をニコニコ動画に投稿。',pk:'하쓰네 미쿠로 만든 「お姫様は電子音で眠る」를 니코니코 동화에 공개.'}],
  2010:[{d:'02.07',k:'rel',tj:'ハチ 1st『花束と水葬』',tk:'하치 1st 『花束と水葬』',pj:'',pk:''},{d:'11.14',k:'rel',tj:'ハチ 2nd『OFFICIAL ORANGE』',tk:'하치 2nd 『OFFICIAL ORANGE』',pj:'「マトリョシカ」「パンダヒーロー」を収録。',pk:'「マトリョシカ」「パンダヒーロー」 수록.'}],
  2012:[{d:'05.16',k:'rel',tj:'本名で『diorama』をリリース',tk:'본명으로 『diorama』 발매',pj:'作詞・作曲・歌・イラスト・映像まで1人で手がけ、インディーズながらオリコン週間6位。',pk:'작사·작곡·노래·일러스트·영상까지 혼자 만들어, 인디로 오리콘 주간 6위.',big:true}],
  2013:[{d:'05.29',k:'rel',tj:'「サンタマリア」でメジャーデビュー',tk:'「サンタマリア」로 메이저 데뷔',pj:'ユニバーサルシグマから。',pk:'유니버설 시그마에서.'}],
  2014:[{d:'04.23',k:'rel',tj:'2nd Album『YANKEE』',tk:'2nd Album 『YANKEE』',pj:'「アイネクライネ」収録。',pk:'「アイネクライネ」 수록.'},{d:'06.27',k:'live',tj:'初ライブ「帰りの会」@ 代官山UNIT',tk:'첫 라이브 「帰りの会」 @ 다이칸야마 UNIT',pj:'中島宏士・須藤優・堀正輝とのバンド編成はここから。',pk:'나카지마 코지·스도 유·호리 마사키와의 밴드 편성이 여기서 시작.'}],
  2015:[{d:'10.07',k:'rel',tj:'3rd Album『Bremen』',tk:'3rd Album 『Bremen』',pj:'自身初のオリコン週間1位。',pk:'첫 오리콘 주간 1위.'}],
  2016:[{d:'09.28',k:'rel',tj:'「LOSER / ナンバーナイン」',tk:'「LOSER / ナンバーナイン」',pj:'ソニー・ミュージックレコーズへ移籍後初のシングル。',pk:'소니 뮤직 레코즈 이적 후 첫 싱글.'}],
  2017:[{d:'11.01',k:'rel',tj:'4th Album『BOOTLEG』',tk:'4th Album 『BOOTLEG』',pj:'「ピースサイン」「打上花火」「灰色と青」を収録。日本レコード大賞 最優秀アルバム賞。',pk:'「ピースサイン」「打上花火」「灰色と青」 수록. 일본 레코드 대상 최우수 앨범상.'}],
  2018:[{d:'01.09',k:'live',tj:'初の日本武道館「Fogbound」',tk:'첫 일본 무도관 「Fogbound」',pj:'',pk:''},{d:'03.14',k:'rel',tj:'「Lemon」',tk:'「Lemon」',pj:'ダウンロード300万を超え、2年連続で Billboard JAPAN 年間1位。',pk:'다운로드 300만을 넘기고, 2년 연속 Billboard JAPAN 연간 1위.',big:true},{d:'12.31',k:'live',tj:'NHK紅白歌合戦に初出場',tk:'NHK 홍백가합전 첫 출연',pj:'地元・徳島の大塚国際美術館から「Lemon」を中継。',pk:'고향 도쿠시마 오쓰카 국제미술관에서 「Lemon」 중계.'}],
  2019:[{d:'03.19',k:'live',tj:'初の海外公演 @ 上海・台北',tk:'첫 해외 공연 @ 상하이·타이베이',pj:'',pk:''}],
  2020:[{d:'08.05',k:'rel',tj:'5th Album『STRAY SHEEP』',tk:'5th Album 『STRAY SHEEP』',pj:'ソロアーティスト初のダブルミリオン (オリコン合算)。',pk:'솔로 아티스트 최초 더블 밀리언 (오리콘 합산).'},{d:'08.07',k:'live',tj:'フォートナイトでバーチャルライブ',tk:'포트나이트에서 버추얼 라이브',pj:'',pk:''}],
  2022:[{d:'11.23',k:'rel',tj:'「KICK BACK」',tk:'「KICK BACK」',pj:'TVアニメ『チェンソーマン』OP。のちにRIAAゴールド認定 (日本語詞の曲で初)。',pk:'TV 애니메이션 『체인소 맨』 OP. 이후 RIAA 골드 인증 (일본어 가사 곡 최초).'}],
  2024:[{d:'08.21',k:'rel',tj:'6th Album『LOST CORNER』',tk:'6th Album 『LOST CORNER』',pj:'全20曲。「さよーならまたいつか！」「がらくた」「地球儀」を収録。',pk:'20곡 수록. 「さよーならまたいつか！」「がらくた」「地球儀」 수록.'}],
  2025:[{d:'01.09',k:'live',tj:'「JUNK」ツアー開幕、初のドーム公演も',tk:'「JUNK」 투어 개막, 첫 돔 공연도',pj:'国内に続き、アジア・欧米のワールドツアーへ。合計44万人を動員。',pk:'일본에 이어 아시아·유럽·미국 월드 투어까지. 총 44만 명 동원.'},{d:'09.15',k:'rel',tj:'「IRIS OUT」',tk:'「IRIS OUT」',pj:'劇場版『チェンソーマン レゼ篇』主題歌。ストリーミングの週間再生数で史上最高を記録。',pk:'극장판 『체인소 맨 레제 편』 주제가. 스트리밍 주간 재생 수 역대 최고 기록.'},{d:'12.31',k:'live',tj:'紅白歌合戦で「IRIS OUT」をテレビ初披露',tk:'홍백가합전에서 「IRIS OUT」 TV 첫 공개',pj:'',pk:''}],
  2026:[{d:'06.15',k:'rel',tj:'「烏」',tk:'「烏」',pj:'2026 NHKサッカーテーマ。',pk:'2026 NHK 축구 테마.'},{d:'07.13',k:'rel',tj:'「夜鷹」',tk:'「夜鷹」',pj:'映画『キングダム 魂の決戦』主題歌。',pk:'영화 『킹덤 혼의 결전』 주제가.'},{d:'11.06',k:'ghost',tj:'「GHOST」ツアー開幕 @ 長野ビッグハット',tk:'「GHOST」 투어 개막 @ 나가노 빅해트',pj:'新曲「春が灯り」「こんにちはごきげんよう！」を初披露。',pk:'신곡 「春が灯り」「こんにちはごきげんよう！」 첫 공개.',big:true},{d:'12.11',k:'next',tj:'『劇場版 薬屋のひとりごと 亡妃の秘宝』公開',tk:'『극장판 약사의 혼잣말 망비의 비보』 개봉',pj:'主題歌「春が灯り」。',pk:'주제가 「春が灯り」.'},{d:'12.17',k:'next',tj:'国内ツアーファイナル @ K-Arena Yokohama',tk:'일본 투어 파이널 @ K-Arena Yokohama',pj:'',pk:''},{d:'12.26',k:'next',tj:'WORLD TOUR / GHOST 開幕 @ 台北ドーム',tk:'WORLD TOUR / GHOST 개막 @ 타이베이 돔',pj:'自身初のドーム2デイズ (台北)。',pk:'첫 돔 2데이즈 (타이베이).'}],
  2027:[{d:'01.15',k:'next',tj:'『劇場版「虎に翼」』公開',tk:'『극장판 「호랑이에 날개」』 개봉',pj:'主題歌「こんにちはごきげんよう！」。',pk:'주제가 「こんにちはごきげんよう！」.'},{d:'02.28',k:'next',tj:'ワールドツアー最終公演 @ アムステルダム',tk:'월드 투어 마지막 공연 @ 암스테르담',pj:'',pk:''}]
};

const WATCH = {
  ja:[['新曲の初披露','GHOST では未リリースの「春が灯り」「こんにちはごきげんよう！」がアンコールで披露されています。音源より先に聴けるチャンス。'],['日替わりの枠','公演によって「1991」「ゴーゴー幽霊船」「打上花火」「BOW AND ARROW」などが入れ替わっています。どれが来るかは「統計」タブでチェック。'],['バンドの音','2014年から続く中島宏士・須藤優・堀正輝、そしてキーボードの宮川純。曲間のアレンジやイントロにも注目。']],
  ko:[['신곡 첫 공개','GHOST에서는 아직 발매되지 않은 「春が灯り」「こんにちはごきげんよう！」가 앙코르에서 공개되고 있어요. 음원보다 먼저 들을 기회.'],['날마다 바뀌는 자리','공연에 따라 「1991」「ゴーゴー幽霊船」「打上花火」「BOW AND ARROW」 등이 바뀌어요. 어떤 곡이 나올지는 \'통계\' 탭에서 확인.'],['밴드 사운드','2014년부터 함께한 나카지마 코지·스도 유·호리 마사키, 그리고 키보드 미야가와 준. 곡 사이 편곡과 인트로도 놓치지 마세요.']]
};
const MANNER = {
  ja:[['自分の席・エリアで','アリーナ公演は座席・エリアが指定されています。立ち上がる・手を挙げるときも前後左右の人に配慮を。'],['撮影・録音は公式の案内に従う','撮影の可否は公演ごとに案内されます。案内がない場面での撮影・録音はしないでください。'],['規制退場に協力','終演後は会場のアナウンスに従ってブロックごとに退場します。交通機関も混むので時間に余裕を。']],
  ko:[['내 자리·구역에서','아레나 공연은 좌석·구역이 지정돼 있어요. 일어서거나 손을 들 때도 앞뒤옆 사람을 배려해 주세요.'],['촬영·녹음은 공식 안내대로','촬영 가능 여부는 공연마다 안내돼요. 안내가 없는 순간에는 촬영·녹음을 하지 말아 주세요.'],['규제 퇴장에 협조','공연이 끝나면 안내 방송에 따라 블록별로 퇴장해요. 교통도 붐비니 시간을 넉넉히.']]
};
const SOURCES = [
  ['https://reissuerecords.net/','REISSUE RECORDS · 米津玄師 official site'],
  ['https://ticket.kenshiyonezu.jp/tour/2026','米津玄師 オフィシャルチケットサイト'],
  ['https://ja.wikipedia.org/wiki/米津玄師','Wikipedia · 米津玄師'],
  ['https://ja.wikipedia.org/wiki/米津玄師の作品','Wikipedia · 米津玄師の作品'],
  ['https://www.thefirsttimes.jp/news/0000840280/','THE FIRST TIMES · GHOST 一般発売・日程'],
  ['https://realsound.jp/2026/10/post-2555048.html','Real Sound · WORLD TOUR / GHOST'],
  ['https://mikiki.tokyo.jp/articles/-/46465','Mikiki · 「春が灯り」'],
  ['https://press.moviewalker.jp/news/article/1454025/','MOVIE WALKER PRESS · 「こんにちはごきげんよう！」']
];
const ACT_KEYS = ['cr','shout','clap','jump','sing','watch'];
const ACT_LABEL = {cr:'C&R',shout:'SHOUT',clap:'CLAP',jump:'JUMP',sing:'SING',watch:'WATCH'};
const DISCS = [{"id": "hachi-hanataba", "name": "ハチ『花束と水葬』", "ko": "하치 『花束と水葬』", "kind": "Album", "date": "2010.02.07", "g": "hachi", "lyr": ""},
  {"id": "hachi-orange", "name": "ハチ『OFFICIAL ORANGE』", "ko": "하치 『OFFICIAL ORANGE』", "kind": "Album", "date": "2010.11.14", "g": "hachi", "lyr": ""},
  {"id": "hachi-single", "name": "ハチ シングル", "ko": "하치 싱글", "kind": "Single", "date": "", "g": "hachi", "lyr": ""},
  {"id": "diorama", "name": "『diorama』", "ko": "『diorama』", "kind": "Album", "date": "2012.05.16", "g": "diorama", "lyr": ""},
  {"id": "yankee", "name": "『YANKEE』", "ko": "『YANKEE』", "kind": "Album", "date": "2014.04.23", "g": "yankee", "lyr": ""},
  {"id": "bremen", "name": "『Bremen』", "ko": "『Bremen』", "kind": "Album", "date": "2015.10.07", "g": "bremen", "lyr": ""},
  {"id": "bootleg", "name": "『BOOTLEG』", "ko": "『BOOTLEG』", "kind": "Album", "date": "2017.11.01", "g": "bootleg", "lyr": ""},
  {"id": "straysheep", "name": "『STRAY SHEEP』", "ko": "『STRAY SHEEP』", "kind": "Album", "date": "2020.08.05", "g": "straysheep", "lyr": ""},
  {"id": "lostcorner", "name": "『LOST CORNER』", "ko": "『LOST CORNER』", "kind": "Album", "date": "2024.08.21", "g": "lostcorner", "lyr": ""},
  {"id": "cw", "name": "シングル カップリング曲", "ko": "싱글 커플링 곡", "kind": "c/w", "date": "", "g": "cw", "lyr": ""},
  {"id": "singles", "name": "LOST CORNER 以降のシングル", "ko": "LOST CORNER 이후 싱글", "kind": "Single", "date": "", "g": "singles", "lyr": ""},
  {"id": "new", "name": "未リリースの新曲", "ko": "미발매 신곡", "kind": "New", "date": "", "g": "new", "lyr": ""},
  {"id": "other", "name": "その他", "ko": "기타", "kind": "", "date": "", "g": "other", "lyr": ""}];
const discOf = id=>DISCS.find(d=>d.id===id)||DISCS[DISCS.length-1];
/* album groups for statistics (colors tuned for the paper / night themes) */
const GROUPS = [
  {id:'hachi', ja:'ハチ', ko:'하치', c:'#8E8AA8'},
  {id:'diorama', ja:'diorama', ko:'diorama', c:'#C9A227'},
  {id:'yankee', ja:'YANKEE', ko:'YANKEE', c:'#D4643B'},
  {id:'bremen', ja:'Bremen', ko:'Bremen', c:'#4F8F6F'},
  {id:'bootleg', ja:'BOOTLEG', ko:'BOOTLEG', c:'#B23A48'},
  {id:'straysheep', ja:'STRAY SHEEP', ko:'STRAY SHEEP', c:'#3D6FB6'},
  {id:'lostcorner', ja:'LOST CORNER', ko:'LOST CORNER', c:'#2FA39A'},
  {id:'singles', ja:'LOST CORNER以降', ko:'LOST CORNER 이후', c:'#7B5CC4'},
  {id:'new', ja:'未リリース', ko:'미발매', c:'#5FD3C4'},
  {id:'cw', ja:'カップリング', ko:'커플링', c:'#A88763'},
  {id:'other', ja:'その他', ko:'기타', c:'#9A9A93'}
];

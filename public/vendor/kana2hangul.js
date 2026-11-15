/* Japanese tokens -> Hangul pronunciation (browser build of the fan page's kana2hangul). */
(function(){
// Japanese (kuromoji tokens) -> Korean Hangul pronunciation, fan-guide style.
// Uses each token's pronunciation (は→ワ, へ→エ handled by the dictionary),
// keeps Latin words as written, and spaces words while attaching particles.

const BASE = {
  ア:'아',イ:'이',ウ:'우',エ:'에',オ:'오',
  カ:'카',キ:'키',ク:'쿠',ケ:'케',コ:'코',ガ:'가',ギ:'기',グ:'구',ゲ:'게',ゴ:'고',
  サ:'사',シ:'시',ス:'스',セ:'세',ソ:'소',ザ:'자',ジ:'지',ズ:'즈',ゼ:'제',ゾ:'조',
  タ:'타',チ:'치',ツ:'츠',テ:'테',ト:'토',ダ:'다',ヂ:'지',ヅ:'즈',デ:'데',ド:'도',
  ナ:'나',ニ:'니',ヌ:'누',ネ:'네',ノ:'노',
  ハ:'하',ヒ:'히',フ:'후',ヘ:'헤',ホ:'호',バ:'바',ビ:'비',ブ:'부',ベ:'베',ボ:'보',パ:'파',ピ:'피',プ:'푸',ペ:'페',ポ:'포',
  マ:'마',ミ:'미',ム:'무',メ:'메',モ:'모',ヤ:'야',ユ:'유',ヨ:'요',
  ラ:'라',リ:'리',ル:'루',レ:'레',ロ:'로',ワ:'와',ヰ:'이',ヱ:'에',ヲ:'오',ヴ:'부',
  ァ:'아',ィ:'이',ゥ:'우',ェ:'에',ォ:'오',ャ:'야',ュ:'유',ョ:'요',ヮ:'와',ヵ:'카',ヶ:'케',
};
const COMBO = {
  キャ:'캬',キュ:'큐',キョ:'쿄',ギャ:'갸',ギュ:'규',ギョ:'교',シャ:'샤',シュ:'슈',ショ:'쇼',ジャ:'자',ジュ:'주',ジョ:'조',
  チャ:'차',チュ:'추',チョ:'초',ニャ:'냐',ニュ:'뉴',ニョ:'뇨',ヒャ:'햐',ヒュ:'휴',ヒョ:'효',ビャ:'뱌',ビュ:'뷰',ビョ:'뵤',
  ピャ:'퍄',ピュ:'퓨',ピョ:'표',ミャ:'먀',ミュ:'뮤',ミョ:'묘',リャ:'랴',リュ:'류',リョ:'료',ヂャ:'자',ヂュ:'주',ヂョ:'조',
  ティ:'티',ディ:'디',トゥ:'투',ドゥ:'두',テュ:'튜',デュ:'듀',ファ:'파',フィ:'피',フェ:'페',フォ:'포',フュ:'퓨',
  ウィ:'위',ウェ:'웨',ウォ:'워',ヴァ:'바',ヴィ:'비',ヴェ:'베',ヴォ:'보',シェ:'셰',ジェ:'제',チェ:'체',イェ:'예',
  ツァ:'차',ツィ:'치',ツェ:'체',ツォ:'초',クァ:'콰',クィ:'퀴',クェ:'퀘',クォ:'쿼',グァ:'과',スィ:'시',ズィ:'지',
};
const FINAL_N = 4, FINAL_S = 19;

const toKata = s => s.replace(/[ぁ-ゖ]/g, c => String.fromCharCode(c.charCodeAt(0) + 0x60));
const isHangulSyl = c => c >= '가' && c <= '힣';

function addFinal(out, fin, fallback) {
  const last = out.slice(-1);
  if (isHangulSyl(last)) {
    const code = last.charCodeAt(0) - 0xac00;
    if (code % 28 === 0) return out.slice(0, -1) + String.fromCharCode(0xac00 + code + fin);
  }
  return out + fallback;
}

// Append a katakana/hiragana string to `out`, converting to Hangul.
function appendKana(out, kana) {
  const s = toKata(kana);
  for (let i = 0; i < s.length; i++) {
    const c = s[i], pair = s.slice(i, i + 2);
    if (COMBO[pair]) { out += COMBO[pair]; i++; continue; }
    if (c === 'ッ') { out = addFinal(out, FINAL_S, ''); continue; }
    if (c === 'ン') { out = addFinal(out, FINAL_N, '은'); continue; }
    if (c === 'ー') { out += '-'; continue; }
    if (BASE[c]) { out += BASE[c]; continue; }
    out += c; // kanji without reading, symbols, etc.
  }
  return out;
}

const ATTACH_POS = new Set(['助詞', '助動詞']);
const ATTACH_DETAIL = new Set(['接尾', '非自立']);

function tokensToHangul(tokens) {
  let out = '';
  for (const tk of tokens) {
    const surf = tk.surface_form;
    if (/^\s+$/.test(surf)) { out += ' '; continue; }
    if (tk.pos === '記号') {
      if (/^[、。・…]+$/.test(surf)) { out += ' '; continue; }
      if (/^[「」『』（）()【】]+$/.test(surf)) continue;
      out += surf; continue;
    }
    // Latin words / numbers: keep as written
    if (/^[ -~！-～]+$/.test(surf)) {
      const punct = /^[!-\/:-@\[-`{-~\uff01-\uff0f\uff1a-\uff20]+$/.test(surf);
      if (out && !punct && !/\s$/.test(out)) out += ' ';
      out += surf.replace(/[！-～]/g, c => String.fromCharCode(c.charCodeAt(0) - 0xfee0));
      continue;
    }
    const read = tk.pronunciation && tk.pronunciation !== '*' ? tk.pronunciation
      : tk.reading && tk.reading !== '*' ? tk.reading : surf;
    const attach = ATTACH_POS.has(tk.pos) || ATTACH_DETAIL.has(tk.pos_detail_1) || /^[ッンー]/.test(toKata(read));
    if (out && !attach && !/\s$/.test(out)) out += ' ';
    out = appendKana(out, read);
  }
  return out.replace(/\s+/g, ' ').trim();
}

window.KanaHangul = { tokensToHangul, appendKana };

})();

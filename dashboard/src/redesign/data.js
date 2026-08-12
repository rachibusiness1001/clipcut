// ClippyMe redesign — shared constants (presets, fonts, languages, pipeline steps).

export const PRESETS = [
  {
    id: 'viral', icon: 'flame', title: 'Viral pack',
    desc: 'Best moments, karaoke subs, hooks & smart-cut.',
    opts: { clips: 7, aspect: '9:16', reframeMode: 'auto', detect: true, smartcut: true, zoom: true,
      subtitles: true, subMode: 'karaoke', subPreset: 'hormozi_bold', hooks: true },
  },
  {
    id: 'talking', icon: 'user-round', title: 'Talking head',
    desc: 'Face-tracked reframe, clean minimal captions.',
    opts: { clips: 5, aspect: '9:16', reframeMode: 'auto', detect: true, smartcut: true, zoom: false,
      subtitles: true, subMode: 'karaoke', subPreset: 'minimal_clean', hooks: false },
  },
  {
    id: 'podcast', icon: 'mic', title: 'Podcast clips',
    desc: 'Long-form cuts, classic subs, no zoom.',
    opts: { clips: 9, aspect: '9:16', reframeMode: 'auto', detect: true, smartcut: true, zoom: false,
      subtitles: true, subMode: 'classic', subPreset: 'classic_white', hooks: true },
  },
];

// Per-job Gemini model quick-picker (Create → Clip Options). '' = use the
// global Settings model. Live discovery lives in Settings; here we keep a small
// curated list so the picker works offline. Mirrors the allow-list prefixes
// (gemini-2.5- / gemini-3) the backend accepts.
export const GEMINI_MODELS = [
  ['', 'Default (Settings)'],
  ['gemini-3.5-flash', '3.5 Flash · recommended'],
  ['gemini-2.5-flash', '2.5 Flash · budget'],
  ['gemini-3.1-pro-preview', '3.1 Pro · max quality'],
  ['gemini-2.5-pro', '2.5 Pro · max quality'],
];

// Classic-mode subtitle fonts. Values are the bundled TTF basenames libass
// resolves from `fonts/` (Verdana falls back to a system face). The backend
// validates the name against `_FONT_NAME_RE` in subtitles.py.
export const SUB_FONTS = [
  ['Montserrat-Black', 'Montserrat Black'],
  ['Anton-Regular', 'Anton'],
  ['Bangers-Regular', 'Bangers'],
  ['Poppins-Black', 'Poppins Black'],
  ['Poppins-Medium', 'Poppins Medium'],
  ['Verdana', 'Verdana'],
];

// Classic-mode subtitle colour swatches (sent as `font_color` hex).
// First three are the ASCENSORE brand colours: white = judges,
// yellow #FDE700 / purple #581BBA = contestants.
export const SUB_COLORS = ['#FFFFFF', '#FDE700', '#581BBA', '#FFE000', '#00FF66', '#00E5FF', '#FF4D6D', '#000000'];

// Brand-logo overlay placement (compose-time layer). Values match the
// _POSITIONS keys in domain/logo.py.
export const LOGO_POSITIONS = [
  ['top-left', 'Top L'], ['top-center', 'Top C'], ['top-right', 'Top R'],
  ['bottom-left', 'Bot L'], ['bottom-center', 'Bot C'], ['bottom-right', 'Bot R'],
  ['center', 'Center'],
];
// Logo size presets → width fraction handled backend-side (_LOGO_SIZE_MAP).
export const LOGO_SIZES = [['S', 'S'], ['M', 'M'], ['L', 'L']];

// Colour-grade looks — ids MUST match backend GRADE_PRESETS keys
// (clippyme/domain/grade.py). 'none' is represented by the Grade toggle being
// off, so it is not offered as a pickable look here.
export const GRADE_PRESETS = [
  { id: 'warm_cinematic', label: 'Warm' },
  { id: 'cool_crisp', label: 'Cool' },
  { id: 'neutral_punch', label: 'Punch' },
  { id: 'vivid_pop', label: 'Vivid' },
];

export const SUBTITLE_PRESETS = [
  // 1. Original/Existing
  { id: 'classic_white', label: 'Classic', hi: '#FFFF00', style: { color: '#fff', fontFamily: 'Verdana, sans-serif', textShadow: '-1px -1px 0 #000,1px -1px 0 #000,-1px 1px 0 #000,1px 1px 0 #000' } },
  { id: 'hormozi_bold', label: 'Hormozi', hi: '#FDE700', style: { color: '#fff', fontFamily: "Impact,'Arial Black',sans-serif", textShadow: '-2px -2px 0 #000,2px -2px 0 #000,-2px 2px 0 #000,2px 2px 0 #000', letterSpacing: '.02em', textTransform: 'uppercase' } },
  { id: 'neon_glow', label: 'Neon Glow', hi: '#00FFFF', style: { color: '#fff', fontFamily: "Montserrat, sans-serif", textShadow: '0 0 4px #0ff,0 0 10px #0ff', fontWeight: 900 } },
  
  // 2. New additions from ClipShlip reference
  { id: 'cinematic', label: 'Cinematic', hi: '#FFFF00', style: { color: '#fff', fontFamily: 'Montserrat, sans-serif', fontWeight: 800, textShadow: '0 2px 4px rgba(0,0,0,0.8)' } },
  { id: 'karaoke_pop', label: 'Karaoke pop', hi: '#FFB800', style: { color: '#fff', fontFamily: 'Montserrat, sans-serif', fontWeight: 900, textShadow: '-1.5px -1.5px 0 #000,1.5px -1.5px 0 #000,-1.5px 1.5px 0 #000,1.5px 1.5px 0 #000' } },
  { id: 'bold_impact', label: 'Bold impact', hi: '#FF0000', style: { color: '#fff', fontFamily: "Impact, sans-serif", textShadow: '-2px -2px 0 #000,2px -2px 0 #000,-2px 2px 0 #000,2px 2px 0 #000', textTransform: 'uppercase' } },
  { id: 'punch_box', label: 'Punch Box', hi: '#B2FF00', style: { color: '#fff', fontFamily: "Anton, sans-serif", background: '#000', padding: '0 4px', textTransform: 'uppercase' } },
  { id: 'clean_yellow', label: 'Clean Yellow', hi: '#FFE600', style: { color: '#fff', fontFamily: 'Poppins, sans-serif', fontWeight: 700 } },
  { id: 'underline_pop', label: 'Underline Pop', hi: '#FF0055', style: { color: '#fff', fontFamily: 'Montserrat, sans-serif', fontWeight: 800, textDecoration: 'underline', textDecorationColor: '#FF0055' } },
  { id: 'documentary', label: 'Documentary', hi: '#FFFFFF', style: { color: '#eee', fontFamily: 'Poppins, sans-serif', fontWeight: 400, textShadow: '0 1px 2px #000' } },
  { id: 'creator_white', label: 'Creator White', hi: '#FFFFFF', style: { color: '#fff', fontFamily: 'Montserrat, sans-serif', fontWeight: 900, textShadow: '-1.5px -1.5px 0 #000,1.5px -1.5px 0 #000,-1.5px 1.5px 0 #000,1.5px 1.5px 0 #000' } },
  { id: 'anton_impact', label: 'Anton Impact', hi: '#FFCC00', style: { color: '#fff', fontFamily: 'Anton, sans-serif', textShadow: '-1.5px -1.5px 0 #000,1.5px -1.5px 0 #000,-1.5px 1.5px 0 #000,1.5px 1.5px 0 #000', textTransform: 'uppercase' } },
  { id: 'brand_block', label: 'Brand Block', hi: '#000000', style: { color: '#00FF66', fontFamily: 'Montserrat, sans-serif', fontWeight: 900, background: '#00FF66', padding: '0 4px' } },
  { id: 'keyword_pop', label: 'Keyword Pop', hi: '#00FF88', style: { color: '#444', fontFamily: 'Montserrat, sans-serif', fontWeight: 900 } },
  { id: 'outline_punch', label: 'Outline Punch', hi: '#FFFF00', style: { color: '#000', fontFamily: 'Montserrat, sans-serif', fontWeight: 900, textShadow: '-1.5px -1.5px 0 #fff,1.5px -1.5px 0 #fff,-1.5px 1.5px 0 #fff,1.5px 1.5px 0 #fff', textTransform: 'uppercase' } },
  { id: 'word_reveal', label: 'Word Reveal', hi: '#FFFFFF', style: { color: '#fff', fontFamily: 'Montserrat, sans-serif', fontWeight: 800, textShadow: '0 1px 3px #000' } },
  { id: 'word_tiles', label: 'Word Tiles', hi: '#99FF00', style: { color: '#fff', fontFamily: 'Montserrat, sans-serif', fontWeight: 700 } },
  { id: 'sunset', label: 'Sunset', hi: '#FF6B6B', style: { color: '#FFB86C', fontFamily: 'Montserrat, sans-serif', fontWeight: 900, textTransform: 'uppercase' } },
  { id: 'sticker', label: 'Sticker', hi: '#FF4D6D', style: { color: '#fff', fontFamily: 'Montserrat, sans-serif', fontWeight: 900, textShadow: '-2px -2px 0 #000,2px -2px 0 #000,-2px 2px 0 #000,2px 2px 0 #000', textTransform: 'uppercase' } },
  { id: 'editorial_scale', label: 'Editorial Scale', hi: '#FFFFFF', style: { color: '#aaa', fontFamily: "'Playfair Display', serif", fontWeight: 400, fontStyle: 'italic' } },
  { id: 'broadsheet', label: 'Broadsheet', hi: '#FFFFFF', style: { color: '#fff', fontFamily: "'Playfair Display', serif", fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em' } },
];

// Instagram-Stories-style hook text defaults. Keys match the backend
// create_hook_image `style` dict (domain/hooks.py:HOOK_STYLE_DEFAULTS).
// Default look = bannerless white Anton with a thin black outline (the
// bannerless path also auto-adds a soft drop shadow for legibility). Users can
// still re-enable the banner / pick any colour or font per clip.
export const HOOK_STYLE_DEFAULT = {
  bg_enabled: false,
  bg_color: '#FFFFFF',
  bg_opacity: 0.94,
  text_color: '#FFFFFF',
  outline_width: 4,
  outline_color: '#000000',
  font: 'Anton-Regular',
  animate: false,
};
// Outline thickness presets → px stroke width.
export const HOOK_OUTLINE = [['0', 'None'], ['4', 'Thin'], ['8', 'Thick']];

export const LANGUAGES = [
  ['multi', 'Multi-language'], ['en', 'English'], ['it', 'Italiano'], ['es', 'Español'],
  ['fr', 'Français'], ['de', 'Deutsch'], ['pt', 'Português'], ['nl', 'Nederlands'],
  ['ja', '日本語'], ['ko', '한국어'], ['zh', '中文'], ['hi', 'हिन्दी'],
];

export const PIPE = [
  { id: 'download', name: 'Download', icon: 'download', meta: 'fetch source' },
  { id: 'transcribe', name: 'Transcribe', icon: 'audio-lines', meta: 'deepgram nova-3' },
  { id: 'detect', name: 'Detect moments', icon: 'sparkles', meta: 'gemini scoring' },
  { id: 'reframe', name: 'Reframe 9:16', icon: 'scan-face', meta: 'face tracking' },
  // Captions/hooks are NOT burned during the main render — they're applied at
  // compose/download time (user-triggered in results). Worded as a roadmap node
  // so the live bar doesn't imply the render is doing caption work right now.
  { id: 'caption', name: 'Caption & hook', icon: 'captions', meta: 'added on export' },
  { id: 'finish', name: 'Finish', icon: 'check', meta: 'render out' },
];



/**
 * X-Duck Full V4 — GitHub Pages version
 * Converted from Framer component.
 * Uses React 18 + Supabase via CDN + Babel (no build step).
 *
 * Files:
 *   index.html  - entry
 *   styles.css  - global + mobile nav
 *   app.js      - this file (entire app)
 *
 * Optional config (set in browser console or localStorage):
 *   localStorage.setItem("xduck-accent", "#A3E635")
 *   localStorage.setItem("xduck-groq", "gsk_...")
 *   Or use URL: ?accent=%23A3E635&groq=gsk_...
 */

const { useState, useEffect, useRef, useCallback, useMemo } = React;

/* =========================================================
   SUPABASE
   ========================================================= */
const SUPABASE_URL = "https://mctuqamupkwtszouaseo.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_poVo9dteNnhRf6DwBO6i0w_rXOS-4kv";

const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
  },
});

/* =========================================================
   CONSTANTS
   ========================================================= */
const ADMIN_USERNAMES = ["QuantumDuckDev", "Mhom"];
const LOGO_BUCKET = "site-assets";
const LOGO_FILE = "X-Duck1.png";
const AVATAR_BUCKET = "avatars";
const PROJECT_FILE_BUCKET = "project-files";
const PROJECT_THUMB_BUCKET = "project-thumbnails";
const CHAT_FILE_BUCKET = "chat-files";
const DM_FILE_BUCKET = "dm-files";
const GROUP_FILE_BUCKET = "group-files";
const COMMUNITY_FILE_BUCKET = "community-files";
const REPO_FILE_BUCKET = "repositories";

const THEME_PRESETS = {
  dark: {
    bg: "#070A10", bg2: "#0C1220", text: "#F4F7FF", muted: "#8B96AB",
    card: "linear-gradient(165deg, rgba(255,255,255,.07), rgba(255,255,255,.03))",
    border: "rgba(255,255,255,.1)", header: "rgba(7,10,16,.82)",
    inputBg: "rgba(16,22,32,.95)", glow: "rgba(163,230,53,.12)",
  },
  light: {
    bg: "#F7F8FB", bg2: "#FFFFFF", text: "#0F172A", muted: "#64748B",
    card: "linear-gradient(165deg, #FFFFFF, #F8FAFC)",
    border: "rgba(15,23,42,.08)", header: "rgba(255,255,255,.92)",
    inputBg: "#F1F5F9", glow: "rgba(163,230,53,.18)",
  },
  midnight: {
    bg: "#090814", bg2: "#12102A", text: "#F0F0FF", muted: "#9A9BC8",
    card: "linear-gradient(165deg, rgba(130,120,255,.12), rgba(255,255,255,.03))",
    border: "rgba(160,150,255,.16)", header: "rgba(9,8,20,.88)",
    inputBg: "rgba(18,16,40,.95)", glow: "rgba(140,120,255,.18)",
  },
  ocean: {
    bg: "#041018", bg2: "#0A1E2A", text: "#EAF8FF", muted: "#7FA9BA",
    card: "linear-gradient(165deg, rgba(60,190,230,.1), rgba(255,255,255,.03))",
    border: "rgba(80,200,240,.16)", header: "rgba(4,16,24,.9)",
    inputBg: "rgba(10,28,38,.95)", glow: "rgba(56,189,248,.16)",
  },
};

const I18N = {
  en: {
    home: "Home", games: "Games", studio: "Studio", projects: "Projects",
    chat: "Chat", wiki: "Wiki", login: "Login", logout: "Logout",
    signup: "Sign Up", settings: "Settings", admin: "Admin", account: "Account",
    language: "Language", theme: "App theme", appearance: "Appearance",
    themeDark: "Dark", themeLight: "Light", themeMidnight: "Midnight", themeOcean: "Ocean",
    langEn: "English", langTh: "Thai", yourAccount: "Your Account",
    manageAccount: "Manage your X-Duck account and preferences.",
    profile: "Profile", bio: "Bio", bioPlaceholder: "Tell others about yourself...",
    save: "Save", searchGames: "Search games...", create: "Create", refresh: "Refresh",
    play: "Play", loading: "Loading...", community: "X-DUCK COMMUNITY",
    heroTitle: "Build. Share. Play.",
    heroDesc: "X-Duck is a community platform for creators, projects, wiki, chat, and games.",
    openStudio: "Open Game Studio", browseGames: "Browse Games",
    preferencesSaved: "Preferences saved on this device.",
    search: "Search", searchAll: "Search everything",
    searchPlaceholder: "Search games, projects, wiki...",
    ai: "AI", aiTitle: "QuantumDuckAI",
    aiDesc: "Ask about the platform, or get help finding games and projects.",
    aiPlaceholder: "Ask something...", aiSend: "Send",
    noResults: "No results found.", results: "Results",
    friends: "Friends", groups: "Groups", communities: "Communities",
    repos: "Repos", workspace: "Workspace", gameStudio: "Game Studio",
    accountSettings: "Account / Settings", adminPanel: "Admin Panel",
    browseProjects: "Browse Projects", openWorkspace: "Open Workspace",
  },
  th: {
    home: "หน้าแรก", games: "เกม", studio: "สตูดิโอ", projects: "โปรเจกต์",
    chat: "แชท", wiki: "วิกิ", login: "เข้าสู่ระบบ", logout: "ออกจากระบบ",
    signup: "สมัคร", settings: "ตั้งค่า", admin: "แอดมิน", account: "บัญชี",
    language: "ภาษา", theme: "โทนแอป", appearance: "รูปแบบ",
    themeDark: "มืด", themeLight: "สว่าง", themeMidnight: "มิดไนท์", themeOcean: "โอเชียน",
    langEn: "อังกฤษ", langTh: "ไทย", yourAccount: "บัญชีของคุณ",
    manageAccount: "จัดการบัญชี X-Duck และการตั้งค่า",
    profile: "โปรไฟล์", bio: "เกี่ยวกับฉัน", bioPlaceholder: "เล่าเกี่ยวกับตัวคุณให้คนอื่นรู้จัก...",
    save: "บันทึก", searchGames: "ค้นหาเกม...", create: "สร้าง", refresh: "รีเฟรช",
    play: "เล่น", loading: "กำลังโหลด...", community: "ชุมชน X-DUCK",
    heroTitle: "สร้าง แชร์ และเล่น",
    heroDesc: "X-Duck คือแพลตฟอร์มชุมชนสำหรับครีเอเตอร์ โปรเจกต์ วิกิ แชท และเกม",
    openStudio: "เปิด Game Studio", browseGames: "ดูเกม",
    preferencesSaved: "บันทึกการตั้งค่าบนอุปกรณ์นี้แล้ว",
    noResults: "ไม่พบผลลัพธ์", results: "ผลลัพธ์",
    friends: "เพื่อน", groups: "กลุ่ม", communities: "ชุมชน",
    repos: "Repos", workspace: "พื้นที่ทำงาน", gameStudio: "Game Studio",
    accountSettings: "บัญชี / ตั้งค่า", adminPanel: "แผงแอดมิน",
    browseProjects: "ดูโปรเจกต์", openWorkspace: "เปิด Workspace",
    search: "ค้นหา", searchAll: "ค้นหาทั้งหมด",
    searchPlaceholder: "ค้นหาเกม โปรเจกต์ วิกิ...",
    ai: "AI", aiTitle: "QuantumDuckAI",
    aiDesc: "ถามเกี่ยวกับแพลตฟอร์ม หรือให้ช่วยหาเกมและโปรเจกต์",
    aiPlaceholder: "ถามอะไรก็ได้...", aiSend: "ส่ง",
  },
};

/* =========================================================
   HELPERS
   ========================================================= */
function readStoredLang() {
  try {
    const v = localStorage.getItem("xduck-lang");
    if (v === "th" || v === "en") return v;
  } catch {}
  return "en";
}

function readStoredTheme() {
  try {
    const v = localStorage.getItem("xduck-theme");
    if (["dark", "light", "midnight", "ocean"].includes(v)) return v;
  } catch {}
  return "light";
}

const CACHE_PREFIX = "xduck-cache-v1:";
function cacheGet(key, fallback) {
  try {
    const raw = localStorage.getItem(CACHE_PREFIX + key);
    if (!raw) return fallback;
    return JSON.parse(raw);
  } catch { return fallback; }
}
function cacheSet(key, value) {
  try { localStorage.setItem(CACHE_PREFIX + key, JSON.stringify(value)); } catch {}
}
function cacheRemove(key) {
  try { localStorage.removeItem(CACHE_PREFIX + key); } catch {}
}

function slugify(value) {
  return String(value).toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}
function safeName(value) {
  return String(value).replace(/[^a-zA-Z0-9._-]/g, "_");
}
function getExtension(value) {
  return (String(value).split(".").pop() || "png").toLowerCase().replace(/[^a-z0-9]/g, "") || "png";
}
function formatDate(value) {
  try { return new Date(value).toLocaleString(); } catch { return String(value); }
}

function isImageUrl(url, name) {
  const s = (url || "") + " " + (name || "");
  return /\.(png|jpe?g|gif|webp|svg|bmp|avif)(\?|$)/i.test(s) || /image\//i.test(s);
}

function extractChatEmbeds(text) {
  const images = [];
  const files = [];
  let clean = String(text || "");
  clean = clean.replace(/\[xduck-img\](.*?)\[\/xduck-img\]/gi, (_, url) => {
    images.push(url.trim());
    return "";
  });
  clean = clean.replace(/\[xduck-file\](.*?)\|(.*?)\[\/xduck-file\]/gi, (_, url, name) => {
    files.push({ url: url.trim(), name: (name || "file").trim() });
    return "";
  });
  return { cleanText: clean.trim(), images, files };
}

function mentionsQuantumDuckAI(text) {
  return /@QuantumDuckAI|@AI\b/i.test(String(text || ""));
}

/* =========================================================
   UI SOUNDS
   ========================================================= */
let xduckAudioCtx = null;
function getXDuckAudio() {
  try {
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return null;
    if (!xduckAudioCtx) xduckAudioCtx = new AC();
    if (xduckAudioCtx.state === "suspended") xduckAudioCtx.resume().catch(() => {});
    return xduckAudioCtx;
  } catch { return null; }
}
function readSoundMuted() {
  try { return localStorage.getItem("xduck-sound-muted") === "1"; } catch { return false; }
}
function writeSoundMuted(muted) {
  try { localStorage.setItem("xduck-sound-muted", muted ? "1" : "0"); } catch {}
}
function playXDuckSfx(kind = "click", muted) {
  if (muted ?? readSoundMuted()) return;
  const ctx = getXDuckAudio();
  if (!ctx) return;
  const now = ctx.currentTime;
  const master = ctx.createGain();
  master.gain.value = 0.12;
  master.connect(ctx.destination);
  function tone(freq, start, dur, type = "sine", vol = 1) {
    const osc = ctx.createOscillator();
    const g = ctx.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(freq, now + start);
    g.gain.setValueAtTime(0.0001, now + start);
    g.gain.exponentialRampToValueAtTime(0.18 * vol, now + start + 0.012);
    g.gain.exponentialRampToValueAtTime(0.0001, now + start + dur);
    osc.connect(g);
    g.connect(master);
    osc.start(now + start);
    osc.stop(now + start + dur + 0.02);
  }
  switch (kind) {
    case "click": case "tap":
      tone(520, 0, 0.05, "triangle", 0.7); tone(380, 0.02, 0.04, "sine", 0.4); break;
    case "nav":
      tone(440, 0, 0.06, "sine", 0.6); tone(660, 0.05, 0.07, "sine", 0.5); break;
    case "send":
      tone(600, 0, 0.05, "sine", 0.55); tone(900, 0.04, 0.08, "triangle", 0.45); break;
    case "success":
      tone(523, 0, 0.08, "sine", 0.55); tone(659, 0.07, 0.09, "sine", 0.55); tone(784, 0.15, 0.12, "sine", 0.5); break;
    case "error":
      tone(220, 0, 0.1, "sawtooth", 0.35); tone(180, 0.08, 0.12, "sawtooth", 0.3); break;
    case "toggle":
      tone(480, 0, 0.05, "square", 0.25); tone(720, 0.04, 0.06, "square", 0.2); break;
    case "notify":
      tone(880, 0, 0.07, "sine", 0.45); tone(1175, 0.08, 0.1, "sine", 0.4); break;
    default:
      tone(500, 0, 0.05, "triangle", 0.5);
  }
}

/* =========================================================
   STYLES (inline constants)
   ========================================================= */
const BTN = {
  border: 0, borderRadius: 14, padding: "14px 18px", minHeight: 48,
  cursor: "pointer", fontWeight: 800, fontFamily: "inherit", fontSize: 16,
  touchAction: "manipulation", WebkitTapHighlightColor: "transparent",
};
const BTN_SMALL = {
  border: 0, borderRadius: 12, padding: "12px 14px", minHeight: 44,
  cursor: "pointer", fontWeight: 800, fontFamily: "inherit", fontSize: 15,
  touchAction: "manipulation", WebkitTapHighlightColor: "transparent",
};
const INPUT = {
  width: "100%", boxSizing: "border-box", padding: "14px 16px", borderRadius: 14,
  border: "1px solid var(--xduck-border, rgba(15,23,42,.12))",
  background: "var(--xduck-input, #F1F5F9)", color: "var(--xduck-text, #0F172A)",
  outline: "none", fontSize: 16, fontFamily: "inherit", minHeight: 48,
  touchAction: "manipulation",
};
const CARD = {
  padding: 28, borderRadius: 22,
  background: "var(--xduck-card, #fff)",
  border: "1px solid var(--xduck-border, rgba(15,23,42,.08))",
  boxShadow: "0 8px 28px rgba(15,23,42,.04)",
};
const DANGER = { ...BTN, background: "rgba(255,70,70,.1)", color: "#FF8D8D" };
const DANGER_SMALL = { ...BTN_SMALL, background: "rgba(255,70,70,.1)", color: "#FF8D8D" };
const LINK = {
  border: 0, padding: 0, background: "transparent", color: "#AAB3C5",
  cursor: "pointer", fontWeight: 700, fontFamily: "inherit",
};

/* =========================================================
   SMALL UI COMPONENTS
   ========================================================= */
function Avatar({ username, accent, size = 40 }) {
  const letter = (username || "U").charAt(0).toUpperCase();
  return (
    <div style={{
      width: size, height: size, borderRadius: "50%",
      background: `linear-gradient(135deg, ${accent}, ${accent}88)`,
      color: "#07100B", display: "flex", alignItems: "center", justifyContent: "center",
      fontWeight: 900, fontSize: size * 0.4, flexShrink: 0,
    }}>
      {letter}
    </div>
  );
}

function SafeImg({ src, alt, style }) {
  const [err, setErr] = useState(false);
  if (err || !src) return null;
  return <img src={src} alt={alt || ""} style={style} onError={() => setErr(true)} loading="lazy" />;
}

function ErrorBox({ children }) {
  return (
    <div style={{
      marginTop: 12, padding: "12px 14px", borderRadius: 12,
      background: "rgba(239,68,68,.12)", border: "1px solid rgba(239,68,68,.35)",
      color: "#FCA5A5", fontSize: 14, fontWeight: 600,
    }}>{children}</div>
  );
}

function SuccessBox({ children }) {
  return (
    <div style={{
      marginTop: 12, padding: "12px 14px", borderRadius: 12,
      background: "rgba(34,197,94,.12)", border: "1px solid rgba(34,197,94,.35)",
      color: "#86EFAC", fontSize: 14, fontWeight: 600,
    }}>{children}</div>
  );
}

function LoadingBox({ children }) {
  return (
    <div style={{
      marginTop: 16, padding: 20, textAlign: "center",
      color: "var(--xduck-muted, #8994A8)", fontWeight: 600,
    }}>{children || "Loading..."}</div>
  );
}

function EmptyState({ children }) {
  return (
    <div style={{
      ...CARD, marginTop: 24, textAlign: "center", padding: 40,
    }}>{children}</div>
  );
}

function PageHeading({ label, title, description, accent }) {
  return (
    <div style={{ marginBottom: 8 }}>
      <div style={{ color: accent, fontSize: 12, fontWeight: 900, letterSpacing: ".06em" }}>{label}</div>
      <h1 style={{ margin: "8px 0 6px", fontSize: "clamp(28px,5vw,42px)", letterSpacing: "-.04em" }}>{title}</h1>
      {description && <p style={{ margin: 0, color: "var(--xduck-muted, #8994A8)", lineHeight: 1.6 }}>{description}</p>}
    </div>
  );
}

function Field({ label, value, onChange, type = "text" }) {
  return (
    <label style={{ display: "block", marginTop: 14 }}>
      <div style={{ marginBottom: 6, color: "var(--xduck-muted, #8994A8)", fontSize: 12, fontWeight: 700 }}>{label}</div>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onPointerDown={(e) => e.stopPropagation()}
        style={INPUT}
      />
    </label>
  );
}

function Modal({ children }) {
  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 1200,
      background: "rgba(15,23,42,.45)", backdropFilter: "blur(12px)",
      WebkitBackdropFilter: "blur(12px)",
      display: "flex", alignItems: "center", justifyContent: "center", padding: 16,
      animation: "xduck-fade-in 0.22s ease both",
    }}>
      <div style={{
        width: "min(100%,600px)", maxHeight: "calc(100vh - 32px)", overflowY: "auto",
        background: "var(--xduck-bg2, #fff)", color: "var(--xduck-text, #0F172A)",
        border: "1px solid var(--xduck-border, rgba(15,23,42,.08))",
        borderRadius: 24, padding: "clamp(18px, 4vw, 28px)",
        boxShadow: "0 24px 64px rgba(15,23,42,.16)",
        animation: "xduck-scale-in 0.28s cubic-bezier(.2,.8,.2,1) both",
      }}>
        {children}
      </div>
    </div>
  );
}

function ChatFilePreview({ url, name, accent, forceImage }) {
  if (!url) return null;
  if (forceImage || isImageUrl(url, name)) {
    return (
      <div style={{ marginTop: 8 }}>
        <SafeImg src={url} alt={name || ""} style={{ maxWidth: "100%", maxHeight: 240, borderRadius: 12, display: "block" }} />
      </div>
    );
  }
  return (
    <a href={url} target="_blank" rel="noreferrer" style={{
      display: "inline-flex", alignItems: "center", gap: 8, marginTop: 8,
      padding: "8px 12px", borderRadius: 10, background: "rgba(255,255,255,.06)",
      color: accent, textDecoration: "none", fontWeight: 700, fontSize: 13,
    }}>
      📎 {name || "File"}
    </a>
  );
}

/* =========================================================
   MAIN APP
   ========================================================= */
function XDuck() {
  // Config from URL or localStorage
  const params = new URLSearchParams(window.location.search);
  const accent = params.get("accent") || localStorage.getItem("xduck-accent") || "#A3E635";
  const groqApiKey = (params.get("groq") || localStorage.getItem("xduck-groq") || "").trim();

  /* Auth */
  const [session, setSession] = useState(null);
  const [profile, setProfile] = useState(() => cacheGet("profile", null));
  const [loading, setLoading] = useState(true);

  /* View */
  const [view, setView] = useState("home");
  const [mobileMenu, setMobileMenu] = useState(false);
  const [appLang, setAppLang] = useState("en");
  const [appTheme, setAppTheme] = useState("light");
  const [soundMuted, setSoundMuted] = useState(false);

  /* Auth modal */
  const [authOpen, setAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signupUsername, setSignupUsername] = useState("");
  const [authLoading, setAuthLoading] = useState(false);
  const [authError, setAuthError] = useState("");
  const [authMessage, setAuthMessage] = useState("");

  /* Logo */
  const [siteLogo, setSiteLogo] = useState(null);

  /* Settings */
  const [settingsUsername, setSettingsUsername] = useState("");
  const [settingsDisplayName, setSettingsDisplayName] = useState("");
  const [settingsAvatar, setSettingsAvatar] = useState("");
  const [settingsBio, setSettingsBio] = useState("");
  const [settingsSaving, setSettingsSaving] = useState(false);
  const [settingsMessage, setSettingsMessage] = useState("");
  const [settingsError, setSettingsError] = useState("");

  /* Projects (simplified) */
  const [myProjects, setMyProjects] = useState(() => cacheGet("my-projects", []));
  const [allProjects, setAllProjects] = useState(() => cacheGet("all-projects", []));
  const [projectsLoading, setProjectsLoading] = useState(false);
  const [projectsError, setProjectsError] = useState("");

  /* Chat */
  const [messages, setMessages] = useState([]);
  const [chatLoading, setChatLoading] = useState(false);
  const [chatError, setChatError] = useState("");
  const [chatMessage, setChatMessage] = useState("");
  const [chatSending, setChatSending] = useState(false);

  /* Wiki */
  const [wikiPages, setWikiPages] = useState([]);
  const [wikiLoading, setWikiLoading] = useState(false);

  useEffect(() => {
    setAppLang(readStoredLang());
    setAppTheme(readStoredTheme());
    setSoundMuted(readSoundMuted());
    document.documentElement.style.setProperty("--xduck-accent", accent);
  }, []);

  // Apply theme CSS variables
  useEffect(() => {
    const th = THEME_PRESETS[appTheme] || THEME_PRESETS.light;
    const root = document.documentElement;
    root.style.setProperty("--xduck-bg", th.bg);
    root.style.setProperty("--xduck-bg2", th.bg2);
    root.style.setProperty("--xduck-text", th.text);
    root.style.setProperty("--xduck-muted", th.muted);
    root.style.setProperty("--xduck-card", th.card);
    root.style.setProperty("--xduck-border", th.border);
    root.style.setProperty("--xduck-header", th.header);
    root.style.setProperty("--xduck-input", th.inputBg);
    root.style.setProperty("--xduck-glow", th.glow);
    document.body.style.background = th.bg;
    document.body.style.color = th.text;
  }, [appTheme]);

  // Unlock audio + click sfx
  useEffect(() => {
    const unlock = () => getXDuckAudio();
    window.addEventListener("pointerdown", unlock, { once: true });
    const onClick = (e) => {
      const el = e.target;
      if (!el) return;
      const btn = el.closest("button, [role='button'], a.xduck-nav");
      if (!btn || btn.getAttribute("data-silent") === "1") return;
      playXDuckSfx(btn.getAttribute("data-sfx") || "click", soundMuted);
    };
    document.addEventListener("click", onClick, true);
    return () => {
      window.removeEventListener("pointerdown", unlock);
      document.removeEventListener("click", onClick, true);
    };
  }, [soundMuted]);

  // Document title
  useEffect(() => {
    const titles = {
      home: "X-Duck", chat: "X-Duck · Chat", projects: "X-Duck · Projects",
      workspace: "X-Duck · Workspace", wiki: "X-Duck · Wiki", games: "X-Duck · Games",
      game: "X-Duck · Game Studio", settings: "X-Duck · Settings",
      search: "X-Duck · Search", ai: "X-Duck · QuantumDuckAI",
      friends: "X-Duck · Friends", groups: "X-Duck · Groups",
      communities: "X-Duck · Communities", repos: "X-Duck · Repos",
    };
    document.title = titles[view] || "X-Duck";
  }, [view]);

  const t = useCallback((key) => I18N[appLang][key] || I18N.en[key] || key, [appLang]);
  const theme = THEME_PRESETS[appTheme] || THEME_PRESETS.light;

  function changeLang(next) {
    setAppLang(next);
    try { localStorage.setItem("xduck-lang", next); } catch {}
  }
  function changeTheme(next) {
    setAppTheme(next);
    try { localStorage.setItem("xduck-theme", next); } catch {}
    playXDuckSfx("toggle", soundMuted);
  }
  function toggleSoundMuted() {
    setSoundMuted((prev) => {
      const next = !prev;
      writeSoundMuted(next);
      if (!next) playXDuckSfx("toggle", false);
      return next;
    });
  }

  /* Logo */
  useEffect(() => {
    try {
      const { data } = supabase.storage.from(LOGO_BUCKET).getPublicUrl(LOGO_FILE);
      if (data?.publicUrl) setSiteLogo(`${data.publicUrl}?t=${Date.now()}`);
    } catch {}
  }, []);

  /* Auth init */
  useEffect(() => {
    let mounted = true;
    let bootDone = false;
    function finishBoot() {
      if (!mounted || bootDone) return;
      bootDone = true;
      setLoading(false);
    }
    const bootTimeout = window.setTimeout(finishBoot, 4500);

    async function init() {
      try {
        const result = await Promise.race([
          supabase.auth.getSession(),
          new Promise((_, rej) => setTimeout(() => rej(new Error("timeout")), 3500)),
        ]);
        if (!mounted) return;
        const currentSession = result?.data?.session ?? null;
        setSession(currentSession);
        finishBoot();
        if (currentSession?.user) {
          loadProfile(currentSession.user).catch(console.warn);
        }
      } catch (e) {
        console.error("Auth init:", e);
        finishBoot();
      }
    }
    init();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, newSession) => {
      if (!mounted) return;
      setSession(newSession);
      finishBoot();
      if (newSession?.user) loadProfile(newSession.user).catch(console.warn);
      else setProfile(null);
    });

    return () => {
      mounted = false;
      window.clearTimeout(bootTimeout);
      subscription.unsubscribe();
    };
  }, []);

  async function loadProfile(user) {
    const metadata = user.user_metadata || {};
    let data = null;
    try {
      const res = await supabase
        .from("profiles")
        .select("id,username,display_name,avatar_url,bio,role,banned,ban_reason")
        .eq("id", user.id)
        .maybeSingle();
      data = res.data;
      if (res.error && /bio|column|schema/i.test(String(res.error.message || ""))) {
        const retry = await supabase
          .from("profiles")
          .select("id,username,display_name,avatar_url,role,banned,ban_reason")
          .eq("id", user.id)
          .maybeSingle();
        data = retry.data;
      }
    } catch (e) { console.warn(e); }

    const finalProfile = {
      id: user.id,
      username: data?.username || metadata.username || null,
      display_name: data?.display_name || metadata.display_name || null,
      avatar_url: data?.avatar_url || metadata.avatar_url || null,
      bio: data?.bio || null,
      role: data?.role || null,
      banned: data?.banned ?? false,
      ban_reason: data?.ban_reason || null,
    };

    if (finalProfile.banned) {
      await supabase.auth.signOut();
      setSession(null);
      setProfile(null);
      setAuthError(finalProfile.ban_reason ? `Banned: ${finalProfile.ban_reason}` : "This account is banned.");
      setAuthOpen(true);
      return false;
    }

    setProfile(finalProfile);
    cacheSet("profile", finalProfile);
    setSettingsUsername(finalProfile.username || "");
    setSettingsDisplayName(finalProfile.display_name || "");
    setSettingsAvatar(finalProfile.avatar_url || "");
    setSettingsBio(finalProfile.bio || "");
    return true;
  }

  const username = (
    profile?.username || profile?.display_name || session?.user?.user_metadata?.username || ""
  ).toString().trim();

  const isAdmin =
    ADMIN_USERNAMES.some((n) => n.toLowerCase() === username.toLowerCase()) ||
    profile?.role?.toLowerCase() === "admin";

  /* Navigation */
  async function navigate(next) {
    playXDuckSfx("nav", soundMuted);
    setView(next);
    setMobileMenu(false);
    cacheSet("last-view", next);
    window.scrollTo({ top: 0, behavior: "smooth" });

    if (next === "workspace" || next === "projects") {
      await loadProjects(next === "workspace");
    }
    if (next === "wiki") await loadWiki();
    if (next === "chat") await loadChat();
  }

  function openAuth(mode) {
    setAuthMode(mode);
    setAuthOpen(true);
    setAuthError("");
    setAuthMessage("");
    setEmail("");
    setPassword("");
    setSignupUsername("");
    setMobileMenu(false);
  }

  async function login() {
    if (authLoading) return;
    setAuthLoading(true);
    setAuthError("");
    setAuthMessage("");
    if (!email.trim()) { setAuthError("Please enter your email."); setAuthLoading(false); return; }
    if (!password) { setAuthError("Please enter your password."); setAuthLoading(false); return; }

    const { data, error } = await supabase.auth.signInWithPassword({
      email: email.trim(), password,
    });
    if (error) setAuthError(error.message);
    else {
      if (data.user) {
        const ok = await loadProfile(data.user);
        if (!ok) { setAuthLoading(false); return; }
      }
      setAuthMessage("Login successful.");
      setTimeout(() => setAuthOpen(false), 400);
    }
    setAuthLoading(false);
  }

  async function signup() {
    if (authLoading) return;
    const cleanUsername = signupUsername.trim();
    setAuthLoading(true);
    setAuthError("");
    setAuthMessage("");

    if (!/^[a-zA-Z0-9_]{3,30}$/.test(cleanUsername)) {
      setAuthError("Username must be 3-30 characters."); setAuthLoading(false); return;
    }
    if (ADMIN_USERNAMES.some((n) => n.toLowerCase() === cleanUsername.toLowerCase())) {
      setAuthError("This username is reserved."); setAuthLoading(false); return;
    }
    if (password.length < 6) {
      setAuthError("Password must be at least 6 characters."); setAuthLoading(false); return;
    }

    const { data, error } = await supabase.auth.signUp({
      email: email.trim(), password,
      options: { data: { username: cleanUsername, display_name: cleanUsername } },
    });

    if (error) setAuthError(error.message);
    else if (data.user) {
      await supabase.from("profiles").upsert({
        id: data.user.id, username: cleanUsername, display_name: cleanUsername,
      }, { onConflict: "id" });
      if (data.session) {
        await loadProfile(data.user);
        setAuthMessage("Account created.");
        setTimeout(() => setAuthOpen(false), 500);
      } else {
        setAuthMessage("Account created. Check your email to confirm.");
      }
    }
    setAuthLoading(false);
  }

  async function forgotPassword() {
    if (!email.trim()) { setAuthError("Enter your email."); return; }
    setAuthLoading(true);
    setAuthError("");
    setAuthMessage("");
    const { error } = await supabase.auth.resetPasswordForEmail(email.trim(), {
      redirectTo: window.location.origin + window.location.pathname,
    });
    if (error) setAuthError(error.message);
    else setAuthMessage("Password reset email sent.");
    setAuthLoading(false);
  }

  async function logout() {
    await supabase.auth.signOut();
    setSession(null);
    setProfile(null);
    cacheRemove("profile");
    cacheRemove("my-projects");
    setView("home");
  }

  async function saveSettings() {
    if (!session?.user) return;
    const cleanUsername = settingsUsername.trim();
    if (!/^[a-zA-Z0-9_]{3,30}$/.test(cleanUsername)) {
      setSettingsError("Invalid username."); return;
    }
    setSettingsSaving(true);
    setSettingsError("");
    setSettingsMessage("");
    const cleanBio = settingsBio.trim().slice(0, 500);

    const { error } = await supabase.from("profiles").upsert({
      id: session.user.id,
      username: cleanUsername,
      display_name: settingsDisplayName.trim() || null,
      avatar_url: settingsAvatar || null,
      bio: cleanBio || null,
    }, { onConflict: "id" });

    if (error) { setSettingsError(error.message); setSettingsSaving(false); return; }

    await supabase.auth.updateUser({
      data: {
        username: cleanUsername,
        display_name: settingsDisplayName.trim() || null,
        avatar_url: settingsAvatar || null,
        bio: cleanBio || null,
      },
    });
    await loadProfile(session.user);
    setSettingsMessage("Profile saved.");
    setSettingsSaving(false);
  }

  /* Projects */
  async function loadProjects(mineOnly) {
    setProjectsLoading(true);
    setProjectsError("");
    try {
      let q = supabase.from("projects").select("*").order("created_at", { ascending: false });
      if (mineOnly && session?.user) q = q.eq("user_id", session.user.id);
      const { data, error } = await q;
      if (error) {
        setProjectsError(error.message);
      } else {
        const list = data || [];
        if (mineOnly) {
          setMyProjects(list);
          cacheSet("my-projects", list);
        } else {
          setAllProjects(list);
          cacheSet("all-projects", list);
        }
      }
    } catch (e) {
      setProjectsError(e.message || "Failed to load projects");
    }
    setProjectsLoading(false);
  }

  /* Wiki */
  async function loadWiki() {
    setWikiLoading(true);
    const { data, error } = await supabase.from("wiki_pages").select("*").order("created_at", { ascending: false });
    if (error) setWikiPages([]);
    else setWikiPages(data || []);
    setWikiLoading(false);
  }

  /* Chat */
  async function loadChat() {
    if (!session) return;
    setChatLoading(true);
    setChatError("");
    const { data, error } = await supabase
      .from("chat_messages")
      .select("*")
      .order("created_at", { ascending: true })
      .limit(200);
    if (error) { setChatError(error.message); setMessages([]); }
    else setMessages(data || []);
    setChatLoading(false);
  }

  async function sendChatMessage() {
    if (!session?.user) return;
    const text = chatMessage.trim();
    if (!text) return;
    setChatSending(true);
    setChatError("");
    const { error } = await supabase.from("chat_messages").insert({
      user_id: session.user.id,
      username: username || "User",
      avatar_url: profile?.avatar_url || null,
      message: text,
    });
    if (error) setChatError(error.message);
    else {
      playXDuckSfx("send", soundMuted);
      setChatMessage("");
      await loadChat();
    }
    setChatSending(false);
  }

  // Realtime chat
  useEffect(() => {
    if (!session || view !== "chat") return;
    loadChat();
    const channel = supabase
      .channel("xduck-chat")
      .on("postgres_changes", { event: "INSERT", schema: "public", table: "chat_messages" }, (payload) => {
        const message = payload.new;
        setMessages((prev) => {
          if (prev.some((x) => x.id === message.id)) return prev;
          return [...prev, message];
        });
      })
      .subscribe();
    return () => { supabase.removeChannel(channel); };
  }, [session, view]);

  /* ===================== RENDER ===================== */

  if (loading) {
    return (
      <div style={{
        minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center",
        background: theme.bg, color: theme.text,
      }}>
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>🦆</div>
          <div style={{ fontWeight: 800, fontSize: 18 }}>X-Duck</div>
          <div style={{ color: theme.muted, marginTop: 8 }}>{t("loading")}</div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", background: theme.bg, color: theme.text }}>
      {/* HEADER */}
      <header style={{
        position: "sticky", top: 0, zIndex: 100,
        background: "var(--xduck-header)", backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        borderBottom: "1px solid var(--xduck-border)",
      }}>
        <div style={{
          width: "100%", maxWidth: "100%", margin: 0,
          padding: "10px clamp(14px, 3vw, 48px)",
          display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12,
        }}>
          <button
            className="xduck-brand"
            onClick={() => navigate("home")}
            style={{ ...BTN, padding: 0, minHeight: 44, background: "transparent", color: "var(--xduck-text)", display: "flex", alignItems: "center", gap: 10, fontSize: 18 }}
          >
            {siteLogo && <img src={siteLogo} alt="" style={{ width: 42, height: 42, objectFit: "contain" }} />}
            <strong>X-Duck</strong>
          </button>

          <nav className="desktop-nav" style={{ gap: 3 }}>
            {[
              ["search", `🔍 ${t("search")}`],
              ["ai", `✨ ${t("ai")}`],
              ["wiki", t("wiki")],
              ["game", `🎮 ${t("gameStudio")}`],
              ["games", `🕹️ ${t("games")}`],
              ["workspace", t("workspace")],
              ["chat", t("chat")],
              ["projects", t("projects")],
              ["friends", t("friends")],
              ["groups", t("groups")],
              ["communities", t("communities")],
              ["repos", t("repos")],
            ].map(([id, label]) => (
              <button key={id} onClick={() => navigate(id)} style={{
                border: 0, background: "transparent", color: "var(--xduck-muted)",
                padding: "10px 12px", minHeight: 44, cursor: "pointer", fontWeight: 700, fontSize: 14, borderRadius: 999,
              }}>{label}</button>
            ))}
          </nav>

          <div className="desktop-account" style={{ gap: 8, alignItems: "center" }}>
            {session ? (
              <>
                {isAdmin && (
                  <button onClick={() => alert("Admin panel — extend as needed")} style={{ ...BTN, background: accent, color: "#07100B" }}>
                    {t("admin")}
                  </button>
                )}
                <button onClick={() => navigate("settings")} style={{
                  ...BTN, background: "rgba(255,255,255,.06)", color: "#fff",
                  display: "flex", alignItems: "center", gap: 8,
                }}>
                  {profile?.avatar_url
                    ? <img src={profile.avatar_url} alt="" style={{ width: 27, height: 27, borderRadius: "50%", objectFit: "cover" }} />
                    : <Avatar username={username} accent={accent} size={27} />}
                  {username || "User"}
                </button>
                <button onClick={logout} style={{ ...BTN, background: "rgba(255,255,255,.06)", color: "#AAB3C5" }}>
                  {t("logout")}
                </button>
              </>
            ) : (
              <>
                <button onClick={() => openAuth("login")} style={{ ...BTN, background: "rgba(255,255,255,.06)", color: "#fff" }}>
                  {t("login")}
                </button>
                <button onClick={() => openAuth("signup")} style={{ ...BTN, background: accent, color: "#07100B" }}>
                  {t("signup")}
                </button>
              </>
            )}
          </div>

          <div className="mobile-account">
            {session ? (
              <button onClick={() => navigate("settings")} style={{
                border: 0, background: "rgba(255,255,255,.08)", color: "#fff",
                display: "flex", alignItems: "center", gap: 8, borderRadius: 999,
                padding: "6px 14px 6px 6px", cursor: "pointer", fontWeight: 800, minHeight: 44,
              }}>
                {profile?.avatar_url
                  ? <img src={profile.avatar_url} alt="" style={{ width: 36, height: 36, borderRadius: "50%", objectFit: "cover" }} />
                  : <Avatar username={username} accent={accent} size={36} />}
                <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", fontSize: 15 }}>
                  {username || "User"}
                </span>
              </button>
            ) : (
              <button onClick={() => openAuth("login")} style={{ ...BTN, background: accent, color: "#07100B", minHeight: 48 }}>
                {t("login")}
              </button>
            )}
          </div>

          <button className="mobile-button" onClick={() => setMobileMenu((v) => !v)} style={{
            ...BTN, width: 42, height: 42, padding: 0, background: "rgba(255,255,255,.06)", color: "#fff",
          }}>
            {mobileMenu ? "×" : "☰"}
          </button>
        </div>

        {mobileMenu && (
          <div style={{ padding: 12, borderTop: "1px solid rgba(255,255,255,.07)" }}>
            {[
              ["wiki", t("wiki")], ["game", `🎮 ${t("gameStudio")}`], ["games", `🕹️ ${t("games")}`],
              ["workspace", t("workspace")], ["chat", t("chat")], ["projects", t("projects")],
              ["friends", t("friends")], ["groups", t("groups")], ["communities", t("communities")],
              ["repos", t("repos")],
            ].map(([id, label]) => (
              <button key={id} onClick={() => navigate(id)} style={{
                width: "100%", border: 0, borderRadius: 12, padding: "13px 14px", marginBottom: 7,
                background: "rgba(255,255,255,.05)", color: "#fff", textAlign: "left", fontWeight: 700,
              }}>{label}</button>
            ))}
            {session ? (
              <>
                <button onClick={() => navigate("settings")} style={{
                  width: "100%", border: 0, borderRadius: 12, padding: "13px 14px", marginBottom: 7,
                  background: "rgba(255,255,255,.05)", color: "#fff", textAlign: "left", fontWeight: 700,
                }}>{t("accountSettings")}</button>
                <button onClick={logout} style={{
                  width: "100%", border: 0, borderRadius: 12, padding: "13px 14px", marginBottom: 7,
                  background: "rgba(255,255,255,.05)", color: "#fff", textAlign: "left", fontWeight: 700,
                }}>{t("logout")}</button>
              </>
            ) : (
              <>
                <button onClick={() => openAuth("login")} style={{
                  width: "100%", border: 0, borderRadius: 12, padding: "13px 14px", marginBottom: 7,
                  background: "rgba(255,255,255,.05)", color: "#fff", textAlign: "left", fontWeight: 700,
                }}>{t("login")}</button>
                <button onClick={() => openAuth("signup")} style={{
                  width: "100%", border: 0, borderRadius: 12, padding: "13px 14px", marginBottom: 7,
                  background: "rgba(255,255,255,.05)", color: "#fff", textAlign: "left", fontWeight: 700,
                }}>{t("signup")}</button>
              </>
            )}
          </div>
        )}
      </header>

      {/* MAIN CONTENT */}
      <div style={{ flex: 1 }}>
        {view === "home" && (
          <main className="page">
            <div style={{
              ...CARD, padding: "clamp(28px,5vw,48px)", marginTop: 12,
              background: `linear-gradient(145deg, ${accent}18, transparent), var(--xduck-card)`,
            }}>
              <div style={{ color: accent, fontWeight: 900, letterSpacing: ".08em", fontSize: 13 }}>{t("community")}</div>
              <h1 style={{ margin: "12px 0 10px", fontSize: "clamp(32px,6vw,52px)", letterSpacing: "-.04em" }}>
                {t("heroTitle")}
              </h1>
              <p style={{ color: "var(--xduck-muted)", maxWidth: 560, lineHeight: 1.7, fontSize: 17 }}>
                {t("heroDesc")}
              </p>
              <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 24 }}>
                <button onClick={() => navigate("game")} style={{ ...BTN, background: accent, color: "#07100B" }}>
                  {t("openStudio")}
                </button>
                <button onClick={() => navigate("games")} style={{ ...BTN, background: "rgba(255,255,255,.08)", color: "var(--xduck-text)" }}>
                  {t("browseGames")}
                </button>
                <button onClick={() => navigate("projects")} style={{ ...BTN, background: "rgba(255,255,255,.08)", color: "var(--xduck-text)" }}>
                  {t("browseProjects")}
                </button>
              </div>
            </div>

            <section style={{ marginTop: 36 }}>
              <h2 style={{ marginBottom: 16 }}>Quick links</h2>
              <div className="project-grid">
                {[
                  ["chat", "💬", t("chat")],
                  ["wiki", "📚", t("wiki")],
                  ["friends", "👥", t("friends")],
                  ["groups", "👨‍👩‍👧‍👦", t("groups")],
                  ["communities", "🌐", t("communities")],
                  ["repos", "📁", t("repos")],
                  ["ai", "✨", t("ai")],
                  ["settings", "⚙️", t("settings")],
                ].map(([id, icon, label]) => (
                  <button key={id} onClick={() => navigate(id)} style={{
                    ...CARD, padding: 22, textAlign: "left", cursor: "pointer",
                    border: "1px solid var(--xduck-border)", background: "var(--xduck-card)",
                    color: "var(--xduck-text)",
                  }}>
                    <div style={{ fontSize: 28, marginBottom: 8 }}>{icon}</div>
                    <strong style={{ fontSize: 16 }}>{label}</strong>
                  </button>
                ))}
              </div>
            </section>
          </main>
        )}

        {view === "settings" && (
          <main className="page">
            <PageHeading label={t("account")} title={t("yourAccount")} description={t("manageAccount")} accent={accent} />
            {!session ? (
              <EmptyState>
                <h2>Login required</h2>
                <button onClick={() => openAuth("login")} style={{ ...BTN, background: accent, color: "#07100B" }}>{t("login")}</button>
              </EmptyState>
            ) : (
              <section style={{ ...CARD, marginTop: 20 }}>
                <Field label="Username" value={settingsUsername} onChange={setSettingsUsername} />
                <Field label="Display name" value={settingsDisplayName} onChange={setSettingsDisplayName} />
                <label style={{ display: "block", marginTop: 14 }}>
                  <div style={{ marginBottom: 6, color: "var(--xduck-muted)", fontSize: 12, fontWeight: 700 }}>{t("bio")}</div>
                  <textarea
                    value={settingsBio}
                    onChange={(e) => setSettingsBio(e.target.value)}
                    placeholder={t("bioPlaceholder")}
                    style={{ ...INPUT, minHeight: 100, resize: "vertical" }}
                  />
                </label>

                <div style={{ marginTop: 22 }}>
                  <div style={{ fontWeight: 800, marginBottom: 10 }}>{t("appearance")}</div>
                  <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                    {["light", "dark", "midnight", "ocean"].map((th) => (
                      <button key={th} onClick={() => changeTheme(th)} style={{
                        ...BTN_SMALL,
                        background: appTheme === th ? accent : "rgba(255,255,255,.08)",
                        color: appTheme === th ? "#07100B" : "var(--xduck-text)",
                      }}>
                        {t(`theme${th.charAt(0).toUpperCase() + th.slice(1)}`)}
                      </button>
                    ))}
                  </div>
                </div>

                <div style={{ marginTop: 18 }}>
                  <div style={{ fontWeight: 800, marginBottom: 10 }}>{t("language")}</div>
                  <div style={{ display: "flex", gap: 8 }}>
                    <button onClick={() => changeLang("en")} style={{
                      ...BTN_SMALL, background: appLang === "en" ? accent : "rgba(255,255,255,.08)",
                      color: appLang === "en" ? "#07100B" : "var(--xduck-text)",
                    }}>{t("langEn")}</button>
                    <button onClick={() => changeLang("th")} style={{
                      ...BTN_SMALL, background: appLang === "th" ? accent : "rgba(255,255,255,.08)",
                      color: appLang === "th" ? "#07100B" : "var(--xduck-text)",
                    }}>{t("langTh")}</button>
                  </div>
                </div>

                <div style={{ marginTop: 18 }}>
                  <button onClick={toggleSoundMuted} style={{
                    ...BTN_SMALL, background: "rgba(255,255,255,.08)", color: "var(--xduck-text)",
                  }}>
                    {soundMuted ? "🔇 Sound off" : "🔊 Sound on"}
                  </button>
                </div>

                {settingsError && <ErrorBox>{settingsError}</ErrorBox>}
                {settingsMessage && <SuccessBox>{settingsMessage}</SuccessBox>}

                <button onClick={saveSettings} disabled={settingsSaving} style={{
                  ...BTN, marginTop: 20, background: accent, color: "#07100B",
                }}>
                  {settingsSaving ? "Saving..." : t("save")}
                </button>
              </section>
            )}
          </main>
        )}

        {view === "chat" && (
          <main className="page" style={{ maxWidth: 900 }}>
            <PageHeading label="CHAT" title={t("chat")} description="Global community chat" accent={accent} />
            {!session ? (
              <EmptyState>
                <h2>Login to chat</h2>
                <button onClick={() => openAuth("login")} style={{ ...BTN, background: accent, color: "#07100B" }}>{t("login")}</button>
              </EmptyState>
            ) : (
              <div style={{
                marginTop: 20, border: "1px solid var(--xduck-border)", borderRadius: 22,
                background: "var(--xduck-card)", overflow: "hidden",
              }}>
                <div style={{ height: "min(60vh, 520px)", overflowY: "auto", padding: 18, display: "flex", flexDirection: "column", gap: 14 }}>
                  {chatLoading && <LoadingBox>{t("loading")}</LoadingBox>}
                  {messages.map((m) => {
                    const embeds = extractChatEmbeds(m.message);
                    return (
                      <div key={m.id} style={{ display: "flex", gap: 10 }}>
                        {m.avatar_url
                          ? <img src={m.avatar_url} alt="" style={{ width: 34, height: 34, borderRadius: "50%", objectFit: "cover" }} />
                          : <Avatar username={m.username} accent={accent} size={34} />}
                        <div style={{ minWidth: 0, flex: 1 }}>
                          <strong>{m.username}</strong>
                          <span style={{ color: "var(--xduck-muted)", fontSize: 10, marginLeft: 8 }}>{formatDate(m.created_at)}</span>
                          {embeds.cleanText && (
                            <div style={{ marginTop: 4, lineHeight: 1.5, whiteSpace: "pre-wrap" }}>{embeds.cleanText}</div>
                          )}
                          {embeds.images.map((url, i) => (
                            <ChatFilePreview key={i} url={url} accent={accent} forceImage />
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
                {chatError && <ErrorBox>{chatError}</ErrorBox>}
                <div style={{ padding: 12, borderTop: "1px solid var(--xduck-border)", display: "flex", gap: 8 }}>
                  <input
                    value={chatMessage}
                    onChange={(e) => setChatMessage(e.target.value)}
                    onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendChatMessage(); } }}
                    placeholder="Message..."
                    style={{ ...INPUT, flex: 1 }}
                    disabled={chatSending}
                  />
                  <button onClick={sendChatMessage} disabled={chatSending || !chatMessage.trim()} style={{
                    ...BTN, background: accent, color: "#07100B",
                  }}>
                    {chatSending ? "..." : "Send"}
                  </button>
                </div>
              </div>
            )}
          </main>
        )}

        {view === "projects" && (
          <main className="page">
            <PageHeading label="PROJECTS" title={t("projects")} description="Browse community projects" accent={accent} />
            <button onClick={() => loadProjects(false)} style={{ ...BTN, marginTop: 12, background: "rgba(255,255,255,.08)", color: "var(--xduck-text)" }}>
              {t("refresh")}
            </button>
            {projectsLoading && <LoadingBox>{t("loading")}</LoadingBox>}
            {projectsError && <ErrorBox>{projectsError}</ErrorBox>}
            <div className="project-grid" style={{ marginTop: 20 }}>
              {(allProjects || []).map((p) => (
                <div key={p.id} style={{ ...CARD, padding: 18 }}>
                  {p.thumbnail_url && (
                    <SafeImg src={p.thumbnail_url} alt="" style={{ width: "100%", height: 140, objectFit: "cover", borderRadius: 12, marginBottom: 12 }} />
                  )}
                  <h3 style={{ margin: "0 0 8px" }}>{p.title}</h3>
                  <p style={{ color: "var(--xduck-muted)", margin: 0, fontSize: 14, lineHeight: 1.5 }}>
                    {(p.description || "").slice(0, 120)}
                  </p>
                  {p.game_url && (
                    <a href={p.game_url} target="_blank" rel="noreferrer" style={{
                      ...BTN_SMALL, display: "inline-block", marginTop: 12, background: accent, color: "#07100B", textDecoration: "none",
                    }}>{t("play")}</a>
                  )}
                </div>
              ))}
            </div>
            {!projectsLoading && (!allProjects || allProjects.length === 0) && (
              <EmptyState><h2>No projects yet</h2></EmptyState>
            )}
          </main>
        )}

        {view === "workspace" && (
          <main className="page">
            <PageHeading label="WORKSPACE" title={t("workspace")} description="Your projects" accent={accent} />
            {!session ? (
              <EmptyState>
                <h2>Login required</h2>
                <button onClick={() => openAuth("login")} style={{ ...BTN, background: accent, color: "#07100B" }}>{t("login")}</button>
              </EmptyState>
            ) : (
              <>
                <button onClick={() => loadProjects(true)} style={{ ...BTN, marginTop: 12, background: "rgba(255,255,255,.08)", color: "var(--xduck-text)" }}>
                  {t("refresh")}
                </button>
                {projectsLoading && <LoadingBox>{t("loading")}</LoadingBox>}
                <div className="project-grid" style={{ marginTop: 20 }}>
                  {(myProjects || []).map((p) => (
                    <div key={p.id} style={{ ...CARD, padding: 18 }}>
                      <h3 style={{ margin: "0 0 8px" }}>{p.title}</h3>
                      <p style={{ color: "var(--xduck-muted)", margin: 0 }}>{(p.description || "").slice(0, 100)}</p>
                    </div>
                  ))}
                </div>
                {!projectsLoading && (!myProjects || myProjects.length === 0) && (
                  <EmptyState><h2>No projects yet</h2><p>Create projects from the original full version or extend this view.</p></EmptyState>
                )}
              </>
            )}
          </main>
        )}

        {view === "wiki" && (
          <main className="page">
            <PageHeading label="WIKI" title={t("wiki")} description="Community knowledge base" accent={accent} />
            <button onClick={loadWiki} style={{ ...BTN, marginTop: 12, background: "rgba(255,255,255,.08)", color: "var(--xduck-text)" }}>
              {t("refresh")}
            </button>
            {wikiLoading && <LoadingBox>{t("loading")}</LoadingBox>}
            <div style={{ marginTop: 20, display: "grid", gap: 12 }}>
              {wikiPages.map((p) => (
                <div key={p.id} style={{ ...CARD, padding: 18 }}>
                  <h3 style={{ margin: "0 0 8px" }}>{p.title}</h3>
                  <p style={{ color: "var(--xduck-muted)", margin: 0, whiteSpace: "pre-wrap" }}>
                    {(p.content || "").slice(0, 300)}
                  </p>
                </div>
              ))}
            </div>
            {!wikiLoading && wikiPages.length === 0 && <EmptyState><h2>No wiki pages yet</h2></EmptyState>}
          </main>
        )}

        {/* Placeholder views for the rest */}
        {["games", "game", "search", "ai", "friends", "groups", "communities", "repos"].includes(view) && (
          <main className="page">
            <PageHeading
              label={view.toUpperCase()}
              title={t(view) || view}
              description={`This section is connected to the same Supabase backend. Extend the full logic from the original Framer component into this view.`}
              accent={accent}
            />
            <EmptyState>
              <h2>{t(view) || view}</h2>
              <p style={{ color: "var(--xduck-muted)" }}>
                Core auth, theme, navigation, chat, projects and wiki are working.
                The remaining advanced features (friends, groups, communities, repos, AI, game studio)
                can be copied from the original source into this same <code>app.js</code> file.
              </p>
              <button onClick={() => navigate("home")} style={{ ...BTN, marginTop: 12, background: accent, color: "#07100B" }}>
                ← {t("home")}
              </button>
            </EmptyState>
          </main>
        )}
      </div>

      {/* FOOTER */}
      <footer style={{
        borderTop: "1px solid var(--xduck-border)", padding: "35px 24px",
        color: "var(--xduck-muted)", background: "transparent",
      }}>
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          gap: 20, flexWrap: "wrap",
          paddingLeft: "clamp(14px, 3vw, 48px)", paddingRight: "clamp(14px, 3vw, 48px)",
        }}>
          <strong style={{ display: "flex", alignItems: "center", gap: 8, color: "var(--xduck-text)" }}>
            {siteLogo && <img src={siteLogo} alt="" style={{ width: 28, height: 28, objectFit: "contain" }} />}
            X-Duck
          </strong>
          <span>Open source community platform · GitHub Pages</span>
        </div>
      </footer>

      {/* MOBILE BOTTOM NAV */}
      <nav className="mobile-bottom-nav" style={{ ["--xduck-accent"]: accent }}>
        <div className="mobile-bottom-nav-track">
          {[
            ["home", "🏠", t("home")],
            ["search", "🔍", t("search")],
            ["games", "🕹️", t("games")],
            ["game", "🎮", t("studio")],
            ["ai", "✨", t("ai")],
            ["projects", "📦", t("projects")],
            ["workspace", "🛠️", "Workspace"],
            ["chat", "💬", t("chat")],
            ["wiki", "📚", t("wiki")],
            ["friends", "👥", "Friends"],
            ["groups", "👨‍👩‍👧‍👦", "Groups"],
            ["communities", "🌐", "Communities"],
            ["repos", "📁", "Repos"],
            [session ? "settings" : "login", session ? "⚙️" : "🔑", session ? t("settings") : t("login")],
          ].map(([id, icon, label]) => (
            <button
              key={id}
              type="button"
              className={view === id ? "active" : ""}
              onClick={() => {
                if (id === "login") openAuth("login");
                else navigate(id);
              }}
            >
              <span className="nav-ico">{icon}</span>
              <span className="nav-label">{label}</span>
            </button>
          ))}
        </div>
      </nav>

      {/* AUTH MODAL */}
      {authOpen && (
        <Modal>
          <div style={{ display: "flex", justifyContent: "space-between", gap: 15 }}>
            <div>
              <h2 style={{ margin: 0 }}>
                {authMode === "login" ? "Welcome back" : authMode === "signup" ? "Join X-Duck" : "Reset password"}
              </h2>
              <p style={{ color: "#68758A" }}>
                {authMode === "login" ? "Login to your X-Duck account." :
                 authMode === "signup" ? "Create your X-Duck account." : "Reset your password."}
              </p>
            </div>
            <button onClick={() => setAuthOpen(false)} style={{
              ...BTN_SMALL, width: 40, height: 40, padding: 0, background: "rgba(255,255,255,.06)", color: "#fff",
            }}>×</button>
          </div>

          {authMode === "signup" && (
            <Field label="Username" value={signupUsername} onChange={setSignupUsername} />
          )}
          <Field label="Email" value={email} onChange={setEmail} />
          {authMode !== "forgot" && (
            <Field label="Password" type="password" value={password} onChange={setPassword} />
          )}

          {authError && <ErrorBox>{authError}</ErrorBox>}
          {authMessage && <SuccessBox>{authMessage}</SuccessBox>}

          <button
            onClick={() => {
              if (authMode === "login") login();
              if (authMode === "signup") signup();
              if (authMode === "forgot") forgotPassword();
            }}
            disabled={authLoading}
            style={{ ...BTN, width: "100%", marginTop: 18, background: accent, color: "#07100B" }}
          >
            {authLoading ? "Please wait..." :
             authMode === "login" ? "Login" :
             authMode === "signup" ? "Create Account" : "Send Reset Link"}
          </button>

          <div style={{ textAlign: "center", marginTop: 18 }}>
            {authMode === "login" && (
              <>
                <button onClick={() => setAuthMode("forgot")} style={LINK}>Forgot password?</button>
                <br />
                <button onClick={() => setAuthMode("signup")} style={{ ...LINK, color: accent }}>Sign Up</button>
              </>
            )}
            {authMode !== "login" && (
              <button onClick={() => setAuthMode("login")} style={{ ...LINK, color: accent }}>Back to Login</button>
            )}
          </div>
        </Modal>
      )}
    </div>
  );
}

/* =========================================================
   MOUNT
   ========================================================= */
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<XDuck />);

/**
 * X-Duck Full V4 — GitHub Pages (ALL FEATURES)
 * Converted from Framer component. No build step.
 *
 * Files:
 *  index.html
 *  styles.css
 *  app.js  <-- this file
 *
 * Optional:
 *  localStorage.setItem("xduck-accent", "#A3E635")
 *  localStorage.setItem("xduck-groq", "gsk_...")
 *  or ?accent=%23A3E635&groq=gsk_...
 */

const React = window.React;
const { useState, useEffect, useRef, useCallback, useMemo } = React;

/* =========================================================
  X-DUCK FULL V4
  ========================================================= */

const SUPABASE_URL = "https://mctuqamupkwtszouaseo.supabase.co"

const SUPABASE_ANON_KEY = "sb_publishable_poVo9dteNnhRf6DwBO6i0w_rXOS-4kv"

const _sbLib = window.supabase || {};
const _createClient = _sbLib.createClient;
if (!_createClient) console.error("X-Duck: Supabase createClient missing — check CDN");
const supabase = _createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
  persistSession: true,
  autoRefreshToken: true,
  detectSessionInUrl: true,
  },
})

/* =========================================================
  CONSTANTS
  ========================================================= */

const ADMIN_USERNAME = "QuantumDuckDev"
const ADMIN_USERNAMES = ["QuantumDuckDev", "Mhom"]

const LOGO_BUCKET = "site-assets"
const LOGO_FILE = "X-Duck1.png"

const AVATAR_BUCKET = "avatars"

const PROJECT_FILE_BUCKET = "project-files"
const PROJECT_THUMB_BUCKET = "project-thumbnails"

const CHAT_FILE_BUCKET = "chat-files"
const DM_FILE_BUCKET = "dm-files"
const GROUP_FILE_BUCKET = "group-files"
const COMMUNITY_FILE_BUCKET = "community-files"
const REPO_FILE_BUCKET = "repositories"

/* =========================================================
  THEME + LANGUAGE (default)
  ========================================================= */


const THEME_PRESETS: Object = {
  dark: {
  bg: "#070A10",
  bg2: "#0C1220",
  text: "#F4F7FF",
  muted: "#8B96AB",
  card: "linear-gradient(165deg, rgba(255,255,255,.07), rgba(255,255,255,.03))",
  border: "rgba(255,255,255,.1)",
  header: "rgba(7,10,16,.82)",
  inputBg: "rgba(16,22,32,.95)",
  glow: "rgba(163,230,53,.12)",
  },
  light: {
  bg: "#F7F8FB",
  bg2: "#FFFFFF",
  text: "#0F172A",
  muted: "#64748B",
  card: "linear-gradient(165deg, #FFFFFF, #F8FAFC)",
  border: "rgba(15,23,42,.08)",
  header: "rgba(255,255,255,.92)",
  inputBg: "#F1F5F9",
  glow: "rgba(163,230,53,.18)",
  },
  midnight: {
  bg: "#090814",
  bg2: "#12102A",
  text: "#F0F0FF",
  muted: "#9A9BC8",
  card: "linear-gradient(165deg, rgba(130,120,255,.12), rgba(255,255,255,.03))",
  border: "rgba(160,150,255,.16)",
  header: "rgba(9,8,20,.88)",
  inputBg: "rgba(18,16,40,.95)",
  glow: "rgba(140,120,255,.18)",
  },
  ocean: {
  bg: "#041018",
  bg2: "#0A1E2A",
  text: "#EAF8FF",
  muted: "#7FA9BA",
  card: "linear-gradient(165deg, rgba(60,190,230,.1), rgba(255,255,255,.03))",
  border: "rgba(80,200,240,.16)",
  header: "rgba(4,16,24,.9)",
  inputBg: "rgba(10,28,38,.95)",
  glow: "rgba(56,189,248,.16)",
  },
}

const I18N: Object> = {
  en: {
  home: "Home",
  games: "Games",
  studio: "Studio",
  projects: "Projects",
  chat: "Chat",
  wiki: "Wiki",
  login: "Login",
  logout: "Logout",
  signup: "Sign Up",
  settings: "Settings",
  admin: "Admin",
  account: "Account",
  language: "Language",
  theme: "App theme",
  appearance: "Appearance",
  themeDark: "Dark",
  themeLight: "Light",
  themeMidnight: "Midnight",
  themeOcean: "Ocean",
  langEn: "English",
  langTh: "Thai",
  yourAccount: "Your Account",
  manageAccount: "Manage your X-Duck account and preferences.",
  profile: "Profile",
  bio: "Bio",
  bioPlaceholder: "Tell others about yourself...",
  save: "Save",
  searchGames: "Search games...",
  create: "Create",
  refresh: "Refresh",
  play: "Play",
  loading: "Loading...",
  community: "X-DUCK COMMUNITY",
  heroTitle: "Build. Share. Play.",
  heroDesc:
  "X-Duck is a community platform for creators, projects, wiki, chat, and games.",
  openStudio: "Open Game Studio",
  browseGames: "Browse Games",
  preferencesSaved: "Preferences saved on this device.",
  search: "Search",
  searchAll: "Search everything",
  searchPlaceholder: "Search games, projects, wiki...",
  ai: "AI",
  aiTitle: "QuantumDuckAI",
  aiDesc: "Ask about the platform, or get help finding games and projects.",
  aiPlaceholder: "Ask something...",
  aiSend: "Send",
  noResults: "No results found.",
  results: "Results",
  projectEmbeds: "Embedded files (images, PDF, builds…)",
  projectEmbedBtn: "+ Embed file",
  projectEmbedUploading: "Uploading embed...",
  projectEmbedHint:
  "Enter a project name first, then press Embed — the system will create the project automatically if it is not saved yet.",
  projectEmbedNeedTitle: "Enter a project name first, then embed a file.",
  uploadThumbnail: "Upload Thumbnail",
  uploadGameFile: "Upload Game / Project File",
  uploadingThumbnail: "Uploading Thumbnail...",
  uploadingGame: "Uploading Game...",
  friends: "Friends",
  groups: "Groups",
  communities: "Communities",
  repos: "Repos",
  workspace: "Workspace",
  gameStudio: "Game Studio",
  accountSettings: "Account / Settings",
  adminPanel: "Admin Panel",
  browseProjects: "Browse Projects",
  openWorkspace: "Open Workspace",
  },
  th: {
  home: "หน้าแรก",
  games: "เกม",
  studio: "สตูดิโอ",
  projects: "โปรเจกต์",
  chat: "แชท",
  wiki: "วิกิ",
  login: "เข้าสู่ระบบ",
  logout: "ออกจากระบบ",
  signup: "สมัคร",
  settings: "ตั้งค่า",
  admin: "แอดมิน",
  account: "บัญชี",
  language: "ภาษา",
  theme: "โทนแอป",
  appearance: "รูปแบบ",
  themeDark: "มืด",
  themeLight: "สว่าง",
  themeMidnight: "มิดไนท์",
  themeOcean: "โอเชียน",
  langEn: "อังกฤษ",
  langTh: "ไทย",
  yourAccount: "บัญชีของคุณ",
  manageAccount: "จัดการบัญชี X-Duck และการตั้งค่า",
  profile: "โปรไฟล์",
  bio: "เกี่ยวกับฉัน",
  bioPlaceholder: "เล่าเกี่ยวกับตัวคุณให้คนอื่นรู้จัก...",
  save: "บันทึก",
  searchGames: "ค้นหาเกม...",
  create: "สร้าง",
  refresh: "รีเฟรช",
  play: "เล่น",
  loading: "กำลังโหลด...",
  community: "ชุมชน X-DUCK",
  heroTitle: "สร้าง แชร์ และเล่น",
  heroDesc:
  "X-Duck คือแพลตฟอร์มชุมชนสำหรับครีเอเตอร์ โปรเจกต์ วิกิ แชท และเกม",
  openStudio: "เปิด Game Studio",
  browseGames: "ดูเกม",
  preferencesSaved: "บันทึกการตั้งค่าบนอุปกรณ์นี้แล้ว",
  noResults: "ไม่พบผลลัพธ์",
  results: "ผลลัพธ์",
  projectEmbeds: "ไฟล์แนบ / Embed (รูป, PDF, ไฟล์โปรเจกต์…)",
  projectEmbedBtn: "+ แนบไฟล์ (Embed)",
  projectEmbedUploading: "กำลังอัปโหลดไฟล์แนบ...",
  projectEmbedHint:
  "ใส่ชื่อโปรเจกต์ก่อน แล้วกด Embed — ระบบจะสร้างโปรเจกต์ให้อัตโนมัติถ้ายังไม่เซฟ",
  projectEmbedNeedTitle: "ใส่ชื่อโปรเจกต์ก่อน แล้วค่อยแนบไฟล์",
  uploadThumbnail: "อัปโหลดภาพปก",
  uploadGameFile: "อัปโหลดเกม / ไฟล์โปรเจกต์",
  uploadingThumbnail: "กำลังอัปโหลดภาพปก...",
  uploadingGame: "กำลังอัปโหลดเกม...",
  friends: "เพื่อน",
  groups: "กลุ่ม",
  communities: "ชุมชน",
  repos: "Repos",
  workspace: "พื้นที่ทำงาน",
  gameStudio: "Game Studio",
  accountSettings: "บัญชี / ตั้งค่า",
  adminPanel: "แผงแอดมิน",
  browseProjects: "ดูโปรเจกต์",
  openWorkspace: "เปิด Workspace",
  search: "ค้นหา",
  searchAll: "ค้นหาทั้งหมด",
  searchPlaceholder: "ค้นหาเกม โปรเจกต์ วิกิ...",
  ai: "AI",
  aiTitle: "QuantumDuckAI",
  aiDesc: "ถามเกี่ยวกับแพลตฟอร์ม หรือให้ช่วยหาเกมและโปรเจกต์",
  aiPlaceholder: "ถามอะไรก็ได้...",
  aiSend: "ส่ง",
  },
}

function readStoredLang() {
  try {
  const v = localStorage.getItem("xduck-lang")
  if (v === "th" || v === "en") return v
  } catch {}
  return "en"
}

function readStoredTheme() {
  try {
  const v = localStorage.getItem("xduck-theme")
  if (v === "dark" || v === "light" || v === "midnight" || v === "ocean")
  return v
  } catch {}
  return "light"
}

/* =========================================================
  LOCAL CACHE (offline / fast boot / no re-login friction)
  ========================================================= */

const CACHE_PREFIX = "xduck-cache-v1:"

function cacheGet(key, fallback) {
  try {
  const raw = localStorage.getItem(CACHE_PREFIX + key)
  if (!raw) return fallback
  return JSON.parse(raw)} catch {
  return fallback
  }
}

function cacheSet(key, value) {
  try {
  localStorage.setItem(CACHE_PREFIX + key, JSON.stringify(value))
  } catch {}
}

function cacheRemove(key) {
  try {
  localStorage.removeItem(CACHE_PREFIX + key)
  } catch {}
}


function parseProjectEmbeds(project)[] {
  if (!project) return []
  if (Array.isArray(project.embed_files)) return project.embed_files
  if (typeof project.embed_files === "string") {
  try {
  const p = JSON.parse(project.embed_files)
  if (Array.isArray(p)) return p
  } catch {}
  }
  // Local fallback cache per project
  if (project.id) {
  return cacheGet(`project-embeds:${project.id}`, [])
  }
  return []
}

/* =========================================================
  TYPES
  ========================================================= */


/* =========================================================
  MAIN
  ========================================================= */

/* =========================================================
  UI SOUNDS — Web Audio (no external files)
  ========================================================= */


let xduckAudioCtx: AudioContext | null = null

function getXDuckAudio(): AudioContext | null {
  if (typeof window === "undefined") return null
  try {
  const AC = window.AudioContext || (window).webkitAudioContext
  if (!AC) return null
  if (!xduckAudioCtx) xduckAudioCtx = new AC()
  if (xduckAudioCtx.state === "suspended") {
  xduckAudioCtx.resume().catch(() => {})
  }
  return xduckAudioCtx
  } catch {
  return null
  }
}

function readSoundMuted() {
  try {
  return localStorage.getItem("xduck-sound-muted") === "1"
  } catch {
  return false
  }
}

function writeSoundMuted(muted) {
  try {
  localStorage.setItem("xduck-sound-muted", muted ? "1" : "0")
  } catch {}
}

/** Lightweight procedural UI sounds */
function playXDuckSfx(kind = "click", muted) {
  if (muted ?? readSoundMuted()) return
  const ctx = getXDuckAudio()
  if (!ctx) return

  const now = ctx.currentTime
  const master = ctx.createGain()
  master.gain.value = 0.12
  master.connect(ctx.destination)

  function tone(
  freq,
  start,
  dur,
  type: OscillatorType = "sine",
  vol = 1
  ) {
  const osc = ctx!.createOscillator()
  const g = ctx!.createGain()
  osc.type = type
  osc.frequency.setValueAtTime(freq, now + start)
  g.gain.setValueAtTime(0.0001, now + start)
  g.gain.exponentialRampToValueAtTime(0.18 * vol, now + start + 0.012)
  g.gain.exponentialRampToValueAtTime(0.0001, now + start + dur)
  osc.connect(g)
  g.connect(master)
  osc.start(now + start)
  osc.stop(now + start + dur + 0.02)
  }

  switch (kind) {
  case "click":
  case "tap":
  tone(520, 0, 0.05, "triangle", 0.7)
  tone(380, 0.02, 0.04, "sine", 0.4)
  break
  case "nav":
  tone(440, 0, 0.06, "sine", 0.6)
  tone(660, 0.05, 0.07, "sine", 0.5)
  break
  case "send":
  tone(600, 0, 0.05, "sine", 0.55)
  tone(900, 0.04, 0.08, "triangle", 0.45)
  break
  case "success":
  tone(523, 0, 0.08, "sine", 0.55)
  tone(659, 0.07, 0.09, "sine", 0.55)
  tone(784, 0.15, 0.12, "sine", 0.5)
  break
  case "error":
  tone(220, 0, 0.1, "sawtooth", 0.35)
  tone(180, 0.08, 0.12, "sawtooth", 0.3)
  break
  case "toggle":
  tone(480, 0, 0.05, "square", 0.25)
  tone(720, 0.04, 0.06, "square", 0.2)
  break
  case "notify":
  tone(880, 0, 0.07, "sine", 0.45)
  tone(1175, 0.08, 0.1, "sine", 0.4)
  break
  default:
  tone(500, 0, 0.05, "triangle", 0.5)
  }
}

function XDuck(props) {
  
  // GitHub Pages config fallbacks
  const _params = new URLSearchParams(window.location.search);
  if (!props) props = {};
  if (!props.accent) props.accent = _params.get("accent") || localStorage.getItem("xduck-accent") || "#A3E635";
  if (!props.groqApiKey) props.groqApiKey = (_params.get("groq") || localStorage.getItem("xduck-groq") || "").trim();

  const accent = props.accent || "#A3E635"
  const groqApiKey = (props.groqApiKey || "").trim()

  /* =====================================================
  AUTH
  ===================================================== */

  const [session, setSession] = React.useState(null)

  const [profile, setProfile] = React.useState(() =>
  cacheGet("profile", null)
  )

  const [loading, setLoading] = React.useState(true)

  /* =====================================================
  VIEW
  ===================================================== */

  const [view, setView] = React.useState("home")

  const [mobileMenu, setMobileMenu] = React.useState(false)

  const [isMobileUI, setIsMobileUI] = React.useState(false)

  const [appLang, setAppLang] = React.useState("en")
  const [appTheme, setAppTheme] = React.useState("light")
  const [soundMuted, setSoundMuted] = React.useState(false)

  React.useEffect(() => {
  setAppLang(readStoredLang())
  try {
  // Always land on home when opening the site
  cacheSet("last-view", "home")
  } catch {}
  setAppTheme(readStoredTheme())
  setSoundMuted(readSoundMuted())
  }, [])

  // Unlock audio on first user gesture + global button click sounds
  React.useEffect(() => {
  const unlock = () => {
  getXDuckAudio()
  }
  window.addEventListener("pointerdown", unlock, { once: true })
  window.addEventListener("keydown", unlock, { once: true })

  const onClick = (e) => {
  const el = e.target | null
  if (!el) return
  const btn = el.closest(
  "button, [role='button'], a.xduck-nav, .xduck-duck-login-btn"
  ) | null
  if (!btn) return
  if (btn.getAttribute("data-silent") === "1") return
  const kind = (btn.getAttribute("data-sfx") || "click")
  playXDuckSfx(kind, soundMuted)
  }
  document.addEventListener("click", onClick, true)
  return () => {
  window.removeEventListener("pointerdown", unlock)
  window.removeEventListener("keydown", unlock)
  document.removeEventListener("click", onClick, true)
  }
  }, [soundMuted])

  // Browser tab / web name: show X-Duck instead of Framer default
  React.useEffect(() => {
  if (typeof document === "undefined") return
  const titles: Object = {
  home: "X-Duck",
  chat: "X-Duck · Chat",
  projects: "X-Duck · Projects",
  workspace: "X-Duck · Workspace",
  wiki: "X-Duck · Wiki",
  games: "X-Duck · Games",
  game: "X-Duck · Game Studio",
  settings: "X-Duck · Settings",
  search: "X-Duck · Search",
  ai: "X-Duck · QuantumDuckAI",
  friends: "X-Duck · Friends",
  groups: "X-Duck · Groups",
  communities: "X-Duck · Communities",
  repos: "X-Duck · Repos",
  }
  document.title = titles[view] || "X-Duck"

  // Help search / social previews when possible
  try {
  let meta = document.querySelector(
  'meta[name="description"]'
  ) | null
  if (!meta) {
  meta = document.createElement("meta")
  meta.name = "description"
  document.head.appendChild(meta)
  }
  meta.content =
  "X-Duck — open source community platform for creators, games, projects, wiki, and chat."

  let og = document.querySelector(
  'meta[property="og:title"]'
  ) | null
  if (!og) {
  og = document.createElement("meta")
  og.setAttribute("property", "og:title")
  document.head.appendChild(og)
  }
  og.content = document.title

  let app = document.querySelector(
  'meta[name="application-name"]'
  ) | null
  if (!app) {
  app = document.createElement("meta")
  app.name = "application-name"
  document.head.appendChild(app)
  }
  app.content = "X-Duck"
  } catch {}
  }, [view])

  function changeLang(next) {
  setAppLang(next)
  try {
  localStorage.setItem("xduck-lang", next)
  } catch {}
  }

  function changeTheme(next) {
  setAppTheme(next)
  try {
  localStorage.setItem("xduck-theme", next)
  } catch {}
  playXDuckSfx("toggle", soundMuted)
  }

  function toggleSoundMuted() {
  setSoundMuted((prev) => {
  const next = !prev
  writeSoundMuted(next)
  if (!next) playXDuckSfx("toggle", false)
  return next
  })
  }

  const sfx = React.useCallback(
  (kind = "click") => playXDuckSfx(kind, soundMuted),
  [soundMuted]
  )

  const t = React.useCallback(
  (key) => I18N[appLang][key] || I18N.en[key] || key,
  [appLang]
  )

  const theme = THEME_PRESETS[appTheme] || THEME_PRESETS.light

  /* =====================================================
  AUTH MODAL
  ===================================================== */

  const [authOpen, setAuthOpen] = React.useState(false)

  const [authMode, setAuthMode] = React.useState("login")

  const [email, setEmail] = React.useState("")
  const [password, setPassword] = React.useState("")

  const [signupUsername, setSignupUsername] = React.useState("")

  const [authLoading, setAuthLoading] = React.useState(false)

  const [authError, setAuthError] = React.useState("")

  const [authMessage, setAuthMessage] = React.useState("")

  /* =====================================================
  LOGO
  ===================================================== */

  const [siteLogo, setSiteLogo] = React.useState(null)

  const [logoLoading, setLogoLoading] = React.useState(false)

  const [logoUploading, setLogoUploading] = React.useState(false)

  const [logoMessage, setLogoMessage] = React.useState("")

  const [logoError, setLogoError] = React.useState("")

  const logoInputRef = React.useRef(null)

  /* =====================================================
  SETTINGS
  ===================================================== */

  const [settingsUsername, setSettingsUsername] = React.useState("")

  const [settingsDisplayName, setSettingsDisplayName] = React.useState("")

  const [settingsAvatar, setSettingsAvatar] = React.useState("")

  const [settingsBio, setSettingsBio] = React.useState("")

  const [settingsSaving, setSettingsSaving] = React.useState(false)

  const [settingsMessage, setSettingsMessage] = React.useState("")

  const [settingsError, setSettingsError] = React.useState("")

  const avatarInputRef = React.useRef(null)

  const [avatarUploading, setAvatarUploading] = React.useState(false)

  const [newPassword, setNewPassword] = React.useState("")

  const [passwordSaving, setPasswordSaving] = React.useState(false)

  const [passwordMessage, setPasswordMessage] = React.useState("")

  const [passwordError, setPasswordError] = React.useState("")

  /* =====================================================
  PROJECTS
  ===================================================== */

  const [myProjects, setMyProjects] = React.useState(() =>
  cacheGet("my-projects", [])
  )

  const [allProjects, setAllProjects] = React.useState(() =>
  cacheGet("all-projects", [])
  )

  const [projectsLoading, setProjectsLoading] = React.useState(false)

  const [projectsError, setProjectsError] = React.useState("")

  const [projectSearch, setProjectSearch] = React.useState("")

  const [projectModalOpen, setProjectModalOpen] = React.useState(false)

  const [editingProject, setEditingProject] = React.useState(
  null
  )

  const [projectTitle, setProjectTitle] = React.useState("")

  const [projectDescription, setProjectDescription] = React.useState("")

  const [projectGameUrl, setProjectGameUrl] = React.useState("")

  const [projectSaving, setProjectSaving] = React.useState(false)

  const [projectError, setProjectError] = React.useState("")

  const [projectThumbUploading, setProjectThumbUploading] =
  React.useState(false)

  const [projectFileUploading, setProjectFileUploading] =
  React.useState(false)

  const [projectEmbeds, setProjectEmbeds] = React.useState([])
  const [projectEmbedUploading, setProjectEmbedUploading] =
  React.useState(false)

  const projectThumbRef = React.useRef(null)

  const projectFileRef = React.useRef(null)
  const projectEmbedRef = React.useRef(null)

  /* =====================================================
  WIKI
  ===================================================== */

  const [wikiPages, setWikiPages] = React.useState([])

  const [wikiLoading, setWikiLoading] = React.useState(false)

  const [wikiError, setWikiError] = React.useState("")

  const [wikiSearch, setWikiSearch] = React.useState("")

  const [selectedWiki, setSelectedWiki] = React.useState(
  null
  )

  const [wikiModalOpen, setWikiModalOpen] = React.useState(false)

  const [editingWiki, setEditingWiki] = React.useState(null)

  const [wikiTitle, setWikiTitle] = React.useState("")

  const [wikiContent, setWikiContent] = React.useState("")

  const [wikiSaving, setWikiSaving] = React.useState(false)

  /* =====================================================
  CHAT
  ===================================================== */

  const [messages, setMessages] = React.useState([])

  const [chatLoading, setChatLoading] = React.useState(false)

  const [chatError, setChatError] = React.useState("")

  const [chatMessage, setChatMessage] = React.useState("")

  const [chatSending, setChatSending] = React.useState(false)

  const [chatFileUploading, setChatFileUploading] = React.useState(false)
  const chatFileRef = React.useRef(null)

  /* =====================================================
  FRIENDS + DM
  ===================================================== */

  const [friends, setFriends] = React.useState(() =>
  cacheGet("friends", [])
  )
  const [friendRequests, setFriendRequests] = React.useState(
  () => cacheGet("friend-requests", [])
  )
  /** requests I sent that are still pending */
  const [outgoingRequests, setOutgoingRequests] = React.useState([])
  const [friendsLoading, setFriendsLoading] = React.useState(false)
  const [friendSearch, setFriendSearch] = React.useState("")
  const [friendSearchResults, setFriendSearchResults] = React.useState([])
  const [friendActionMsg, setFriendActionMsg] = React.useState("")

  const [followingList, setFollowingList] = React.useState([])
  const [followersList, setFollowersList] = React.useState([])
  /** user ids that the current user follows */
  const [followingIds, setFollowingIds] = React.useState(
  () => new Set()
  )
  const [followBusyId, setFollowBusyId] = React.useState(null)

  const [dmPartner, setDmPartner] = React.useState(null)
  const [dmMessages, setDmMessages] = React.useState([])
  const [dmInput, setDmInput] = React.useState("")
  const [dmSending, setDmSending] = React.useState(false)
  const [dmError, setDmError] = React.useState("")
  const [dmFileUploading, setDmFileUploading] = React.useState(false)
  const dmFileRef = React.useRef(null)

  /* =====================================================
  GROUPS
  ===================================================== */

  const [groups, setGroups] = React.useState([])
  const [myGroups, setMyGroups] = React.useState([])
  const [selectedGroup, setSelectedGroup] = React.useState(null)
  const [groupMessages, setGroupMessages] = React.useState([])
  const [groupInput, setGroupInput] = React.useState("")
  const [groupSending, setGroupSending] = React.useState(false)
  const [groupFileUploading, setGroupFileUploading] = React.useState(false)
  const [groupName, setGroupName] = React.useState("")
  const [groupDesc, setGroupDesc] = React.useState("")
  const [groupsLoading, setGroupsLoading] = React.useState(false)
  const [groupError, setGroupError] = React.useState("")
  const [groupCreating, setGroupCreating] = React.useState(false)
  /** group_id -> membership status for current user */
  const [myGroupStatus, setMyGroupStatus] = React.useState({})
  const [groupPendingMembers, setGroupPendingMembers] = React.useState([])
  const groupFileRef = React.useRef(null)

  /* =====================================================
  COMMUNITIES
  ===================================================== */

  const [communities, setCommunities] = React.useState([])
  const [myCommunities, setMyCommunities] = React.useState([])
  const [selectedCommunity, setSelectedCommunity] =
  React.useState(null)
  const [communityPosts, setCommunityPosts] = React.useState(
  []
  )
  const [communityInput, setCommunityInput] = React.useState("")
  const [communitySending, setCommunitySending] = React.useState(false)
  const [communityName, setCommunityName] = React.useState("")
  const [communityDesc, setCommunityDesc] = React.useState("")
  const [communitiesLoading, setCommunitiesLoading] = React.useState(false)
  const [communityError, setCommunityError] = React.useState("")
  const [communityCreating, setCommunityCreating] = React.useState(false)
  const communityFileRef = React.useRef(null)

  /* =====================================================
  REPOSITORIES
  ===================================================== */

  const [repos, setRepos] = React.useState([])
  const [myRepos, setMyRepos] = React.useState([])
  const [selectedRepo, setSelectedRepo] = React.useState(
  null
  )
  const [repoFiles, setRepoFiles] = React.useState([])
  const [reposLoading, setReposLoading] = React.useState(false)
  const [repoTitle, setRepoTitle] = React.useState("")
  const [repoDesc, setRepoDesc] = React.useState("")
  const [repoVisibility, setRepoVisibility] = React.useState("public")
  const [repoFileUploading, setRepoFileUploading] = React.useState(false)
  const [repoError, setRepoError] = React.useState("")
  const [repoPath, setRepoPath] = React.useState("")
  const [repoCommitMsg, setRepoCommitMsg] = React.useState("")
  const repoFileRef = React.useRef(null)

  /* =====================================================
  ADMIN
  ===================================================== */

  const [adminOpen, setAdminOpen] = React.useState(false)

  const [adminTab, setAdminTab] = React.useState("logo")

  const [adminUsers, setAdminUsers] = React.useState([])
  const [adminUsersError, setAdminUsersError] = React.useState("")
  const [adminReports, setAdminReports] = React.useState([])
  const [adminReportsLoading, setAdminReportsLoading] = React.useState(false)

  const [reportOpen, setReportOpen] = React.useState(false)
  const [reportTarget, setReportTarget] = React.useState(null)
  const [reportReason, setReportReason] = React.useState("abuse")
  const [reportDetails, setReportDetails] = React.useState("")
  const [reportSending, setReportSending] = React.useState(false)
  const [reportMsg, setReportMsg] = React.useState("")

  const [adminProjects, setAdminProjects] = React.useState([])

  /* =====================================================
  FULLSCREEN GAME PLAYER
  ===================================================== */

  const [playingGame, setPlayingGame] = React.useState(null)

  /* =====================================================
  LOGO
  ===================================================== */

  React.useEffect(() => {
  loadLogo()
  }, [])

  React.useEffect(() => {
  function checkMobile() {
  try {
  const w = window.innerWidth || 1200
  const h = window.innerHeight || 800
  const coarse =
  typeof window.matchMedia === "function" &&
  window.matchMedia("(pointer: coarse)").matches
  const portrait = h >= w
  // Treat phones + small tablets as mobile UI
  setIsMobileUI(
  w <= 920 ||
  coarse ||
  (portrait && w <= 1100) ||
  (typeof navigator !== "undefined" &&
  /iPhone|iPad|iPod|Android/i.test(
  navigator.userAgent || ""
  ))
  )
  } catch {
  setIsMobileUI(true)
  }
  }
  checkMobile()
  window.addEventListener("resize", checkMobile)
  window.addEventListener("orientationchange", checkMobile)
  return () => {
  window.removeEventListener("resize", checkMobile)
  window.removeEventListener("orientationchange", checkMobile)
  }
  }, [])

  // Mobile-first: lock readable viewport, reduce accidental zoom on taps
  React.useEffect(() => {
  try {
  let meta = document.querySelector(
  'meta[name="viewport"]'
  ) | null
  if (!meta) {
  meta = document.createElement("meta")
  meta.name = "viewport"
  document.head.appendChild(meta)
  }
  meta.content =
  "width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, viewport-fit=cover"
  document.documentElement.style.touchAction = "manipulation"
  ;(document.body).style.touchAction = "manipulation"
  ;(document.body).style.overscrollBehaviorY = "none"
  } catch {}
  }, [])

  async function loadLogo() {
  try {
  const { data } = supabase.storage
  .from(LOGO_BUCKET)
  .getPublicUrl(LOGO_FILE)

  if (data?.publicUrl) {
  setSiteLogo(`${data.publicUrl}?t=${Date.now()}`)
  } else {
  setSiteLogo(null)
  }
  } catch {
  setSiteLogo(null)
  }
  }

  /* =====================================================
  AUTH INITIALIZE
  ===================================================== */

  React.useEffect(() => {
  let mounted = true
  let bootDone = false

  function finishBoot() {
  if (!mounted || bootDone) return
  bootDone = true
  setLoading(false)
  }

  // Never stay on splash forever (Framer / network / getSession hang)
  const bootTimeout = window.setTimeout(() => {
  console.warn("X-Duck: boot timeout — showing UI")
  finishBoot()
  }, 4500)

  function withTimeout(promise, ms) {
  return new Promise((resolve, reject) => {
  const t = window.setTimeout(
  () => reject(new Error("timeout")),
  ms
  )
  promise
  .then((v) => {
  window.clearTimeout(t)
  resolve(v)
  })
  .catch((e) => {
  window.clearTimeout(t)
  reject(e)
  })
  })
  }

  async function init() {
  try {
  const result = await withTimeout(
  supabase.auth.getSession(),
  3500
  )
  if (!mounted) return

  const currentSession = result?.data?.session ?? null
  setSession(currentSession)

  // Show app immediately; profile can load in background
  finishBoot()

  if (currentSession?.user) {
  try {
  await withTimeout(
  loadProfile(currentSession.user),
  4000
  )
  } catch (e) {
  console.warn("Profile load:", e)
  // Minimal profile from session metadata so UI works
  const u = currentSession.user
  const md = u.user_metadata || {}
  setProfile({
  id: u.id,
  username:
  (typeof md.username === "string" &&
  md.username) ||
  null,
  display_name:
  (typeof md.display_name === "string" &&
  md.display_name) ||
  null,
  avatar_url:
  (typeof md.avatar_url === "string" &&
  md.avatar_url) ||
  null,
  bio,
  role,
  banned: false,
  ban_reason,
  })
  }
  }
  } catch (error) {
  console.error("Auth initialize:", error)
  finishBoot()
  } finally {
  finishBoot()
  }
  }

  init()

  const {
  data: { subscription },
  } = supabase.auth.onAuthStateChange((_event, newSession) => {
  if (!mounted) return

  setSession(newSession)
  finishBoot()

  if (newSession?.user) {
  // Fire-and-forget — do not block UI
  loadProfile(newSession.user).catch((e) =>
  console.warn("onAuthStateChange profile:", e)
  )
  } else {
  setProfile(null)
  }
  })

  return () => {
  mounted = false
  window.clearTimeout(bootTimeout)
  subscription.unsubscribe()
  }
  }, [])

  /* =====================================================
  PROFILE
  ===================================================== */

  async function loadProfile(user) {
  const metadata = user.user_metadata || {}

  const metadataUsername =
  typeof metadata.username === "string"
  ? metadata.username.trim()
  : ""

  const metadataDisplayName =
  typeof metadata.display_name === "string"
  ? metadata.display_name.trim()
  : ""

  const metadataAvatar =
  typeof metadata.avatar_url === "string" ? metadata.avatar_url : ""

  let data = null
  let error = null

  {
  const res = await supabase
  .from("profiles")
  .select(
  "id,username,display_name,avatar_url,bio,role,banned,ban_reason"
  )
  .eq("id", user.id)
  .maybeSingle()
  data = res.data
  error = res.error
  }

  // Retry without bio if column does not exist yet
  if (error && /bio|column|schema/i.test(String(error.message || ""))) {
  const res = await supabase
  .from("profiles")
  .select(
  "id,username,display_name,avatar_url,role,banned,ban_reason"
  )
  .eq("id", user.id)
  .maybeSingle()
  data = res.data
  error = res.error
  }

  if (error) {
  console.warn("Profile:", error.message)
  }

  const finalProfile = {
  id: user.id,
  username: data?.username || metadataUsername || null,
  display_name: data?.display_name || metadataDisplayName || null,
  avatar_url: data?.avatar_url || metadataAvatar || null,
  bio: data?.bio || null,
  role: data?.role || null,
  banned: data?.banned ?? false,
  ban_reason: data?.ban_reason || null,
  }

  if (finalProfile.banned) {
  await supabase.auth.signOut()
  setSession(null)
  setProfile(null)
  setAuthMode("login")
  setAuthError(
  finalProfile.ban_reason
  ? `This account is banned. ${finalProfile.ban_reason}`
  : "This account is banned."
  )
  setAuthMessage("")
  setAuthOpen(true)
  return false
  }

  setProfile(finalProfile)
  cacheSet("profile", finalProfile)

  setSettingsUsername(finalProfile.username || "")

  setSettingsDisplayName(finalProfile.display_name || "")

  setSettingsAvatar(finalProfile.avatar_url || "")

  setSettingsBio(finalProfile.bio || "")
  return true
  }

  const username = (
  profile?.username ||
  profile?.display_name ||
  session?.user?.user_metadata?.username ||
  ""
  )
  .toString()
  .trim()

  const isAdmin =
  ADMIN_USERNAMES.some(
  (name) => name.toLowerCase() === username.toLowerCase()
  ) || profile?.role?.toLowerCase() === "admin"

  /* =====================================================
  NAVIGATION
  ===================================================== */

  async function navigate(next) {
  playXDuckSfx("nav", soundMuted)
  setView(next)
  setMobileMenu(false)
  cacheSet("last-view", next)

  window.scrollTo({
  top: 0,
  behavior: "smooth",
  })

  if (next === "workspace") {
  await loadMyProjects()
  }

  if (next === "projects") {
  await loadAllProjects()
  }

  if (next === "wiki") {
  await loadWiki()
  }

  if (next === "chat") {
  await loadChat()
  }

  if (next === "friends" || next === "search") {
  await loadFriends()
  }

  if (next === "groups") {
  await loadGroups()
  }

  if (next === "communities") {
  await loadCommunities()
  }

  if (next === "repos") {
  await loadRepos()
  }
  }

  /* =====================================================
  AUTH
  ===================================================== */

  function openAuth(mode: "login" | "signup" | "forgot") {
  setAuthMode(mode)
  setAuthOpen(true)
  setAuthError("")
  setAuthMessage("")
  setEmail("")
  setPassword("")
  setSignupUsername("")
  setMobileMenu(false)
  }

  async function login() {
  if (authLoading) return

  setAuthLoading(true)
  setAuthError("")
  setAuthMessage("")

  if (!email.trim()) {
  setAuthError("Please enter your email.")
  setAuthLoading(false)
  return
  }

  if (!password) {
  setAuthError("Please enter your password.")
  setAuthLoading(false)
  return
  }

  const { data, error } = await supabase.auth.signInWithPassword({
  email: email.trim(),
  password,
  })

  if (error) {
  setAuthError(error.message)
  } else {
  if (data.user) {
  const profileLoaded = await loadProfile(data.user)
  if (!profileLoaded) {
  setAuthLoading(false)
  return
  }
  }

  setAuthMessage("Login successful.")

  setTimeout(() => {
  setAuthOpen(false)
  }, 400)
  }

  setAuthLoading(false)
  }

  async function signup() {
  if (authLoading) return

  const cleanUsername = signupUsername.trim()

  setAuthLoading(true)
  setAuthError("")
  setAuthMessage("")

  if (!/^[a-zA-Z0-9_]{3,30}$/.test(cleanUsername)) {
  setAuthError("Username must be 3-30 characters.")
  setAuthLoading(false)
  return
  }

  if (
  ADMIN_USERNAMES.some(
  (name) => name.toLowerCase() === cleanUsername.toLowerCase()
  )
  ) {
  setAuthError("This username is reserved.")
  setAuthLoading(false)
  return
  }

  if (password.length < 6) {
  setAuthError("Password must be at least 6 characters.")
  setAuthLoading(false)
  return
  }

  const { data, error } = await supabase.auth.signUp({
  email: email.trim(),
  password,
  options: {
  data: {
  username: cleanUsername,
  display_name: cleanUsername,
  },
  },
  })

  if (error) {
  setAuthError(error.message)
  } else if (data.user) {
  const { error: profileError } = await supabase
  .from("profiles")
  .upsert(
  {
  id: data.user.id,
  username: cleanUsername,
  display_name: cleanUsername,
  },
  {
  onConflict: "id",
  }
  )

  if (profileError) {
  setAuthError(profileError.message)
  } else if (data.session) {
  await loadProfile(data.user)

  setAuthMessage("Account created.")

  setTimeout(() => {
  setAuthOpen(false)
  }, 500)
  } else {
  setAuthMessage(
  "Account created. Check your email to confirm your account."
  )
  }
  }

  setAuthLoading(false)
  }

  async function forgotPassword() {
  if (!email.trim()) {
  setAuthError("Enter your email.")
  return
  }

  setAuthLoading(true)
  setAuthError("")
  setAuthMessage("")

  const { error } = await supabase.auth.resetPasswordForEmail(
  email.trim(),
  {
  redirectTo: window.location.origin,
  }
  )

  if (error) {
  setAuthError(error.message)
  } else {
  setAuthMessage("Password reset email sent.")
  }

  setAuthLoading(false)
  }

  async function logout() {
  await supabase.auth.signOut()

  setSession(null)
  setProfile(null)
  cacheRemove("profile")
  cacheRemove("my-projects")
  // keep theme/lang/last-view for next visit
  setView("home")
  setAdminOpen(false)
  }

  /* =====================================================
  SETTINGS
  ===================================================== */

  async function saveSettings() {
  if (!session?.user) return

  const cleanUsername = settingsUsername.trim()

  if (!/^[a-zA-Z0-9_]{3,30}$/.test(cleanUsername)) {
  setSettingsError("Invalid username.")
  return
  }

  if (
  isAdmin &&
  ADMIN_USERNAMES.some(
  (name) =>
  name.toLowerCase() ===
  (profile?.username || "").toLowerCase()
  ) &&
  !ADMIN_USERNAMES.some(
  (name) => name.toLowerCase() === cleanUsername.toLowerCase()
  )
  ) {
  setSettingsError("Admin username is protected.")
  return
  }

  if (
  !isAdmin &&
  ADMIN_USERNAMES.some(
  (name) => name.toLowerCase() === cleanUsername.toLowerCase()
  )
  ) {
  setSettingsError("This username is reserved.")
  return
  }

  setSettingsSaving(true)
  setSettingsError("")
  setSettingsMessage("")

  const cleanBio = settingsBio.trim().slice(0, 500)

  const { error } = await supabase.from("profiles").upsert(
  {
  id: session.user.id,
  username: cleanUsername,
  display_name: settingsDisplayName.trim() || null,
  avatar_url: settingsAvatar || null,
  bio: cleanBio || null,
  },
  {
  onConflict: "id",
  }
  )

  if (error) {
  setSettingsError(error.message)
  setSettingsSaving(false)
  return
  }

  await supabase.auth.updateUser({
  data: {
  username: cleanUsername,
  display_name: settingsDisplayName.trim() || null,
  avatar_url: settingsAvatar || null,
  bio: cleanBio || null,
  },
  })

  await loadProfile(session.user)

  setSettingsMessage("Profile saved.")

  setSettingsSaving(false)
  }

  async function uploadAvatar(event) {
  const file = event.target.files?.[0]

  event.target.value = ""

  if (!file || !session?.user) return

  if (!file.type.startsWith("image/")) {
  setSettingsError("Choose an image file.")
  return
  }

  if (file.size > 5 * 1024 * 1024) {
  setSettingsError("Avatar must be smaller than 5 MB.")
  return
  }

  setAvatarUploading(true)
  setSettingsError("")

  try {
  const ext = getExtension(file.name)

  const path = `${session.user.id}/avatar.${ext}`

  const { error } = await supabase.storage
  .from(AVATAR_BUCKET)
  .upload(path, file, {
  upsert: true,
  contentType: file.type,
  })

  if (error) throw error

  const { data } = supabase.storage
  .from(AVATAR_BUCKET)
  .getPublicUrl(path)

  if (!data?.publicUrl) {
  throw new Error("Could not create avatar URL.")
  }

  const avatarUrl = `${data.publicUrl}?t=${Date.now()}`

  const { error: profileError } = await supabase
  .from("profiles")
  .upsert(
  {
  id: session.user.id,
  username: settingsUsername || profile?.username || null,
  display_name: settingsDisplayName || null,
  avatar_url: avatarUrl,
  bio: (settingsBio || profile?.bio || "").trim() || null,
  },
  {
  onConflict: "id",
  }
  )

  if (profileError) throw profileError

  await supabase.auth.updateUser({
  data: {
  avatar_url: avatarUrl,
  },
  })

  setSettingsAvatar(avatarUrl)

  await loadProfile(session.user)
  } catch (error) {
  setSettingsError(error?.message || "Avatar upload failed.")
  } finally {
  setAvatarUploading(false)
  }
  }

  async function changePassword() {
  if (newPassword.length < 6) {
  setPasswordError("Password must be at least 6 characters.")
  return
  }

  setPasswordSaving(true)
  setPasswordError("")
  setPasswordMessage("")

  const { error } = await supabase.auth.updateUser({
  password: newPassword,
  })

  if (error) {
  setPasswordError(error.message)
  } else {
  setPasswordMessage("Password changed successfully.")
  setNewPassword("")
  }

  setPasswordSaving(false)
  }

  /* =====================================================
  PROJECT LOADING
  ===================================================== */

  async function loadMyProjects() {
  if (!session?.user) {
  setMyProjects([])
  setProjectsError("")
  return
  }

  setProjectsLoading(true)
  setProjectsError("")

  const { data, error } = await supabase
  .from("projects")
  .select("*")
  .eq("user_id", session.user.id)
  .order("created_at", {
  ascending: false,
  })

  if (error) {
  console.error("Workspace:", error)

  setProjectsError(error.message)
  // keep cached myProjects if network fails
  if (!myProjects.length) setMyProjects([])
  } else {
  const list = ((data || [])).map((p) => ({
  ...p,
  embed_files: parseProjectEmbeds(p),
  }))
  setMyProjects(list)
  cacheSet("my-projects", list)
  }

  setProjectsLoading(false)
  }

  async function loadAllProjects() {
  setProjectsLoading(true)
  setProjectsError("")

  const { data, error } = await supabase
  .from("projects")
  .select("*")
  .order("created_at", {
  ascending: false,
  })

  if (error) {
  console.error("Projects:", error)

  setProjectsError(error.message)
  if (!allProjects.length) setAllProjects([])
  } else {
  const list = ((data || [])).map((p) => ({
  ...p,
  embed_files: parseProjectEmbeds(p),
  }))
  setAllProjects(list)
  cacheSet("all-projects", list)
  }

  setProjectsLoading(false)
  }

  /* =====================================================
  PROJECT CREATE / EDIT
  ===================================================== */

  function openNewProject() {
  if (!session) {
  openAuth("login")
  return
  }

  setEditingProject(null)
  setProjectTitle("")
  setProjectDescription("")
  setProjectGameUrl("")
  setProjectEmbeds([])
  setProjectError("")
  setProjectModalOpen(true)
  }

  function openEditProject(project) {
  setEditingProject(project)

  setProjectTitle(project.title)

  setProjectDescription(project.description)

  setProjectGameUrl(project.game_url || "")

  setProjectEmbeds(parseProjectEmbeds(project))

  setProjectError("")
  setProjectModalOpen(true)
  }

  async function saveProject() {
  if (!session?.user) return

  if (!projectTitle.trim()) {
  setProjectError("Project title is required.")
  return
  }

  setProjectSaving(true)
  setProjectError("")

  try {
  const embedsPayload = projectEmbeds.length ? projectEmbeds : []

  if (editingProject) {
  let { error } = await supabase
  .from("projects")
  .update({
  title: projectTitle.trim(),
  description: projectDescription.trim(),
  game_url: projectGameUrl.trim() || null,
  embed_files: embedsPayload,
  updated_at: new Date().toISOString(),
  })
  .eq("id", editingProject.id)
  .eq("user_id", session.user.id)

  // Column embed_files may not exist yet — still save core fields
  if (
  error &&
  /embed_files|column|schema/i.test(error.message || "")
  ) {
  const retry = await supabase
  .from("projects")
  .update({
  title: projectTitle.trim(),
  description: projectDescription.trim(),
  game_url: projectGameUrl.trim() || null,
  updated_at: new Date().toISOString(),
  })
  .eq("id", editingProject.id)
  .eq("user_id", session.user.id)
  error = retry.error
  cacheSet(
  `project-embeds:${editingProject.id}`,
  embedsPayload
  )
  }

  if (error) throw error
  cacheSet(`project-embeds:${editingProject.id}`, embedsPayload)
  } else {
  let data = null
  let error = null
  const attempt = await supabase
  .from("projects")
  .insert({
  user_id: session.user.id,
  title: projectTitle.trim(),
  description: projectDescription.trim(),
  game_url: projectGameUrl.trim() || null,
  embed_files: embedsPayload,
  })
  .select("*")
  .single()
  data = attempt.data
  error = attempt.error

  if (
  error &&
  /embed_files|column|schema/i.test(error.message || "")
  ) {
  const retry = await supabase
  .from("projects")
  .insert({
  user_id: session.user.id,
  title: projectTitle.trim(),
  description: projectDescription.trim(),
  game_url: projectGameUrl.trim() || null,
  })
  .select("*")
  .single()
  data = retry.data
  error = retry.error
  }

  if (error) throw error

  if (data) {
  const withEmbeds = {
  ...(data),
  embed_files: embedsPayload,
  }
  setEditingProject(withEmbeds)
  cacheSet(`project-embeds:${data.id}`, embedsPayload)
  }
  }

  await loadMyProjects()
  await loadAllProjects()

  setProjectModalOpen(false)
  } catch (error) {
  setProjectError(error?.message || "Could not save project.")
  } finally {
  setProjectSaving(false)
  }
  }

  async function deleteProject(id) {
  if (!session?.user) return

  const { error } = await supabase
  .from("projects")
  .delete()
  .eq("id", id)
  .eq("user_id", session.user.id)

  if (error) {
  setProjectsError(error.message)
  return
  }

  await loadMyProjects()
  await loadAllProjects()
  }

  /* =====================================================
  PROJECT UPLOADS
  ===================================================== */

  async function uploadProjectThumbnail(
  event
  ) {
  const file = event.target.files?.[0]

  event.target.value = ""

  if (!file || !session?.user) return

  if (!editingProject) {
  setProjectError(
  "Save the project first, then upload the thumbnail."
  )
  return
  }

  if (!file.type.startsWith("image/")) {
  setProjectError("Choose an image.")
  return
  }

  if (file.size > 5 * 1024 * 1024) {
  setProjectError("Thumbnail must be smaller than 5 MB.")
  return
  }

  setProjectThumbUploading(true)

  try {
  const path = `${session.user.id}/${Date.now()}-${safeName(
  file.name
  )}`

  const { error } = await supabase.storage
  .from(PROJECT_THUMB_BUCKET)
  .upload(path, file, {
  upsert: true,
  contentType: file.type,
  })

  if (error) throw error

  const { data } = supabase.storage
  .from(PROJECT_THUMB_BUCKET)
  .getPublicUrl(path)

  if (!data?.publicUrl) {
  throw new Error("Could not create thumbnail URL.")
  }

  const { error: updateError } = await supabase
  .from("projects")
  .update({
  thumbnail_url: data.publicUrl,

  updated_at: new Date().toISOString(),
  })
  .eq("id", editingProject.id)
  .eq("user_id", session.user.id)

  if (updateError) throw updateError

  setEditingProject({
  ...editingProject,
  thumbnail_url: data.publicUrl,
  })

  await loadMyProjects()
  await loadAllProjects()
  } catch (error) {
  setProjectError(error?.message || "Thumbnail upload failed.")
  } finally {
  setProjectThumbUploading(false)
  }
  }

  async function uploadProjectFile(
  event
  ) {
  const file = event.target.files?.[0]

  event.target.value = ""

  if (!file || !session?.user) return

  if (!editingProject) {
  setProjectError("Save the project first, then upload the file.")
  return
  }

  if (file.size > 50 * 1024 * 1024) {
  setProjectError("Game/project file must be smaller than 50 MB.")
  return
  }

  setProjectFileUploading(true)

  try {
  const path = `${session.user.id}/${Date.now()}-${safeName(
  file.name
  )}`

  const { error } = await supabase.storage
  .from(PROJECT_FILE_BUCKET)
  .upload(path, file, {
  upsert: true,
  contentType: file.type || "application/octet-stream",
  })

  if (error) throw error

  const { data } = supabase.storage
  .from(PROJECT_FILE_BUCKET)
  .getPublicUrl(path)

  if (!data?.publicUrl) {
  throw new Error("Could not create file URL.")
  }

  const { error: updateError } = await supabase
  .from("projects")
  .update({
  game_url: data.publicUrl,

  updated_at: new Date().toISOString(),
  })
  .eq("id", editingProject.id)
  .eq("user_id", session.user.id)

  if (updateError) throw updateError

  setProjectGameUrl(data.publicUrl)

  setEditingProject({
  ...editingProject,
  game_url: data.publicUrl,
  })

  await loadMyProjects()
  await loadAllProjects()
  } catch (error) {
  setProjectError(error?.message || "File upload failed.")
  } finally {
  setProjectFileUploading(false)
  }
  }

  async function ensureProjectSaved() {
  if (!session?.user) return null
  if (editingProject?.id) return editingProject

  if (!projectTitle.trim()) {
  setProjectError(
  I18N[appLang]?.projectEmbedNeedTitle ||
  I18N.en.projectEmbedNeedTitle
  )
  return null
  }

  setProjectSaving(true)
  setProjectError("")
  try {
  let data = null
  let error = null
  const attempt = await supabase
  .from("projects")
  .insert({
  user_id: session.user.id,
  title: projectTitle.trim(),
  description: projectDescription.trim(),
  game_url: projectGameUrl.trim() || null,
  })
  .select("*")
  .single()
  data = attempt.data
  error = attempt.error
  if (error) throw error
  const proj = data
  setEditingProject(proj)
  await loadMyProjects()
  await loadAllProjects()
  return proj
  } catch (e) {
  setProjectError(e?.message || "Could not create project.")
  return null
  } finally {
  setProjectSaving(false)
  }
  }

  async function uploadProjectEmbed(
  event
  ) {
  const file = event.target.files?.[0]
  event.target.value = ""
  if (!file || !session?.user) return

  if (file.size > 50 * 1024 * 1024) {
  setProjectError("ไฟล์ต้องเล็กกว่า 50 MB")
  return
  }

  setProjectEmbedUploading(true)
  setProjectError("")

  try {
  let project = editingProject
  if (!project?.id) {
  project = await ensureProjectSaved()
  if (!project?.id) {
  setProjectEmbedUploading(false)
  return
  }
  }

  const path = `${session.user.id}/${project.id}/embeds/${Date.now()}-${safeName(
  file.name
  )}`

  const { error } = await supabase.storage
  .from(PROJECT_FILE_BUCKET)
  .upload(path, file, {
  upsert: true,
  contentType: file.type || "application/octet-stream",
  cacheControl: "3600",
  })
  if (error) {
  const msg = (error.message || "").toLowerCase()
  if (msg.includes("bucket") || msg.includes("not found")) {
  throw new Error(
  "ไม่มี bucket project-files — สร้างใน Supabase Storage และเปิด policy"
  )
  }
  if (
  msg.includes("row-level security") ||
  msg.includes("policy")
  ) {
  throw new Error(
  "RLS บล็อกอัปโหลด — เปิด policy INSERT บน storage project-files"
  )
  }
  throw error
  }

  let fileUrl = ""
  const signed = await supabase.storage
  .from(PROJECT_FILE_BUCKET)
  .createSignedUrl(path, 60 * 60 * 24 * 365)
  if (signed.data?.signedUrl) {
  fileUrl = signed.data.signedUrl
  } else {
  const { data } = supabase.storage
  .from(PROJECT_FILE_BUCKET)
  .getPublicUrl(path)
  if (!data?.publicUrl) {
  throw new Error(
  "สร้าง URL ไฟล์ไม่ได้ — ตั้ง bucket project-files เป็น public หรืออนุญาต signed URL"
  )
  }
  fileUrl = data.publicUrl
  }

  const entry = {
  name: file.name,
  url: fileUrl,
  mime: file.type || null,
  size: file.size,
  }

  const next = [...projectEmbeds, entry]
  setProjectEmbeds(next)
  cacheSet(`project-embeds:${project.id}`, next)

  // Persist embed_files (optional column)
  const { error: upErr } = await supabase
  .from("projects")
  .update({
  embed_files: next,
  updated_at: new Date().toISOString(),
  })
  .eq("id", project.id)
  .eq("user_id", session.user.id)

  if (
  upErr &&
  !/embed_files|column|schema/i.test(upErr.message || "")
  ) {
  console.warn("embed_files update:", upErr.message)
  }

  setEditingProject({
  ...project,
  embed_files: next,
  })
  await loadMyProjects()
  await loadAllProjects()
  } catch (error) {
  setProjectError(error?.message || "Embed upload failed.")
  } finally {
  setProjectEmbedUploading(false)
  }
  }

  function removeProjectEmbed(index) {
  const next = projectEmbeds.filter((_, i) => i !== index)
  setProjectEmbeds(next)
  if (editingProject?.id) {
  cacheSet(`project-embeds:${editingProject.id}`, next)
  supabase
  .from("projects")
  .update({
  embed_files: next,
  updated_at: new Date().toISOString(),
  })
  .eq("id", editingProject.id)
  .then(() => {})
  }
  }

  /* =====================================================
  WIKI
  ===================================================== */

  async function loadWiki() {
  setWikiLoading(true)
  setWikiError("")

  const { data, error } = await supabase
  .from("wiki_pages")
  .select("*")
  .order("created_at", {
  ascending: false,
  })

  if (error) {
  setWikiError(error.message)

  setWikiPages([])
  } else {
  setWikiPages((data || []))
  }

  setWikiLoading(false)
  }

  function openNewWiki() {
  if (!session) {
  openAuth("login")
  return
  }

  setEditingWiki(null)
  setWikiTitle("")
  setWikiContent("")
  setWikiError("")
  setWikiModalOpen(true)
  }

  function openEditWiki(page) {
  setEditingWiki(page)

  setWikiTitle(page.title)

  setWikiContent(page.content)

  setWikiError("")
  setWikiModalOpen(true)
  }

  async function saveWiki() {
  if (!session?.user) return

  if (!wikiTitle.trim()) {
  setWikiError("Wiki title is required.")
  return
  }

  setWikiSaving(true)
  setWikiError("")

  try {
  if (editingWiki) {
  const { error } = await supabase
  .from("wiki_pages")
  .update({
  title: wikiTitle.trim(),

  content: wikiContent.trim(),

  updated_at: new Date().toISOString(),
  })
  .eq("id", editingWiki.id)
  .eq("user_id", session.user.id)

  if (error) throw error
  } else {
  const { error } = await supabase.from("wiki_pages").insert({
  user_id: session.user.id,

  title: wikiTitle.trim(),

  slug: `${slugify(wikiTitle)}-${Date.now()}`,

  content: wikiContent.trim(),
  })

  if (error) throw error
  }

  setWikiModalOpen(false)

  await loadWiki()
  } catch (error) {
  setWikiError(error?.message || "Could not save Wiki.")
  } finally {
  setWikiSaving(false)
  }
  }

  async function deleteWiki(id) {
  if (!session?.user) return

  const { error } = await supabase
  .from("wiki_pages")
  .delete()
  .eq("id", id)
  .eq("user_id", session.user.id)

  if (error) {
  setWikiError(error.message)
  return
  }

  setSelectedWiki(null)
  await loadWiki()
  }

  /* =====================================================
  CHAT
  ===================================================== */

  async function loadChat() {
  if (!session) return

  setChatLoading(true)
  setChatError("")

  const { data, error } = await supabase
  .from("chat_messages")
  .select("*")
  .order("created_at", {
  ascending: true,
  })
  .limit(200)

  if (error) {
  setChatError(error.message)

  setMessages([])
  } else {
  setMessages((data || []))
  }

  setChatLoading(false)
  }

  async function sendChatMessage(
  fileUrl | null,
  fileName | null,
  isImage
  ) {
  if (!session?.user) return
  const text = chatMessage.trim()
  if (!text && !fileUrl) return

  setChatSending(true)
  setChatError("")

  // Always embed image URL in message body so it still shows
  // even if file_url / file_name columns are missing in the DB.
  let messageBody = text
  if (fileUrl) {
  if (isImage) {
  const marker = `\n[xduck-img]${fileUrl}[/xduck-img]`
  messageBody =
  (text || (fileName ? `📷 ${fileName}` : "📷 Image")) +
  marker
  } else {
  const marker = `\n[xduck-file]${fileUrl}|${fileName || "file"}[/xduck-file]`
  messageBody =
  (text || (fileName ? `📎 ${fileName}` : "📎 File")) + marker
  }
  }

  const baseRow = {
  user_id: session.user.id,
  username: username || "User",
  avatar_url: profile?.avatar_url || null,
  message: messageBody,
  }

  // Try with file columns first; fall back if columns don't exist yet
  let { data, error } = await supabase
  .from("chat_messages")
  .insert({
  ...baseRow,
  file_url: fileUrl || null,
  file_name: fileName || null,
  })
  .select("*")
  .single()

  if (error) {
  const msg = (error.message || "").toLowerCase()
  if (
  msg.includes("file_url") ||
  msg.includes("file_name") ||
  msg.includes("column") ||
  msg.includes("schema")
  ) {
  const retry = await supabase
  .from("chat_messages")
  .insert(baseRow)
  .select("*")
  .single()
  data = retry.data
  error = retry.error
  }
  }

  if (error) {
  setChatError(error.message)
  } else {
  playXDuckSfx("send", soundMuted)
  setChatMessage("")
  if (data) {
  const row = data
  // Ensure local state has file fields even if DB omitted them
  if (fileUrl && !row.file_url) {
  row.file_url = fileUrl
  row.file_name = fileName || null
  }
  setMessages((prev) => {
  if (prev.some((x) => x.id === row.id)) return prev
  return [...prev, row]
  })
  }
  await loadChat()

  // Public global chat: respond when @QuantumDuckAI / @AI is mentioned
  if (messageBody && mentionsQuantumDuckAI(messageBody)) {
  replyInGlobalChatAsAI(messageBody).catch((e) =>
  console.warn("AI global reply:", e)
  )
  }
  }

  setChatSending(false)
  }

  async function replyInGlobalChatAsAI(userText) {
  const apiKey = (groqApiKey || "").trim()
  if (!session?.user) return
  if (!apiKey) {
  setChatError(
  appLang === "th"
  ? "แท็ก AI แล้ว แต่ยังไม่ได้ตั้ง Groq API Key ใน Framer"
  : "AI mentioned, but Groq API Key is not set in Framer"
  )
  return
  }

  setChatError(
  appLang === "th"
  ? "🤖 QuantumDuckAI กำลังตอบ..."
  : "🤖 QuantumDuckAI is typing..."
  )

  try {
  const { data: recent } = await supabase
  .from("chat_messages")
  .select("username,message")
  .order("created_at", { ascending: false })
  .limit(12)
  const ctx = (recent || [])
  .reverse()
  .map(
  (m) =>
  `${m.username || "User"}: ${String(
  m.message || ""
  ).slice(0, 180)}`
  )
  .join("\n")
  const embeds = extractChatEmbeds(userText)
  const lang = String(appLang || "en") === "th" ? "th" : "en"
  const reply = await callGroqChat(
  apiKey,
  [
  {
  role: "user",
  content:
  lang === "th"
  ? `มีคนแท็กคุณ (@QuantumDuckAI) ใน Global Chat สาธารณะ:\n${userText}\n\nตอบสั้นๆ เป็นมิตร เป็นภาษาไทยเท่านั้น ห้ามอ้างอิงแชทส่วนตัว`
  : `You were mentioned (@QuantumDuckAI) in public Global Chat:\n${userText}\n\nReply briefly and friendly in English only (the user's UI language is English). Understand Thai if needed but answer in English. Never reference private DMs.`,
  },
  ],
  lang,
  username || "User",
  session.user.id,
  {
  images: embeds.images,
  publicContext: `Recent global chat:\n${ctx}`,
  useVision: embeds.images.length > 0,
  }
  )
  const body = `🤖 QuantumDuckAI:\n${String(reply || "").trim()}`

  let ins = await supabase.from("chat_messages").insert({
  user_id: session.user.id,
  username: "QuantumDuckAI",
  avatar_url: profile?.avatar_url || null,
  message: body,
  })

  if (ins.error) {
  ins = await supabase.from("chat_messages").insert({
  user_id: session.user.id,
  username: username || "User",
  avatar_url: profile?.avatar_url || null,
  message: body,
  })
  }

  if (ins.error) {
  setChatError(
  appLang === "th"
  ? `AI ตอบแล้วแต่โพสต์ไม่สำเร็จ: ${ins.error.message}`
  : `AI replied but post failed: ${ins.error.message}`
  )
  return
  }

  await loadChat()
  setChatError("")
  } catch (e) {
  console.warn(e)
  setChatError(
  e?.message ||
  (appLang === "th"
  ? "QuantumDuckAI ตอบไม่สำเร็จ"
  : "QuantumDuckAI failed to reply")
  )
  }
  }

  async function uploadChatFile(event) {
  const file = event.target.files?.[0]
  event.target.value = ""
  if (!file || !session?.user) return

  if (file.size > 20 * 1024 * 1024) {
  setChatError("File must be smaller than 20 MB.")
  return
  }

  setChatFileUploading(true)
  setChatError("")

  try {
  const ext =
  getExtension(file.name) ||
  (file.type.startsWith("image/")
  ? file.type.split("/")[1] || "png"
  : "bin")
  const path = `${session.user.id}/${Date.now()}-${safeName(
  file.name.replace(/\.[^.]+$/, "")
  )}.${ext}`

  const contentType =
  file.type ||
  (ext.match(/^(png|jpe?g|gif|webp|svg|bmp|avif)$/i)
  ? `image/${ext === "jpg" ? "jpeg" : ext}`
  : "application/octet-stream")

  const { error } = await supabase.storage
  .from(CHAT_FILE_BUCKET)
  .upload(path, file, {
  upsert: true,
  contentType,
  cacheControl: "3600",
  })
  if (error) throw error

  // Prefer signed URL (works even if bucket is not public)
  let finalUrl = ""
  const signed = await supabase.storage
  .from(CHAT_FILE_BUCKET)
  .createSignedUrl(path, 60 * 60 * 24 * 365) // 1 year

  if (signed.data?.signedUrl) {
  finalUrl = signed.data.signedUrl
  } else {
  const { data } = supabase.storage
  .from(CHAT_FILE_BUCKET)
  .getPublicUrl(path)
  if (!data?.publicUrl) {
  throw new Error(
  signed.error?.message ||
  "Could not create file URL. Make bucket chat-files public or allow signed URLs."
  )
  }
  finalUrl = data.publicUrl
  }

  const isImage =
  file.type.startsWith("image/") ||
  isImageUrl(finalUrl, file.name)

  await sendChatMessage(finalUrl, file.name, isImage)
  } catch (err) {
  setChatError(err?.message || "File upload failed.")
  } finally {
  setChatFileUploading(false)
  }
  }

  async function deleteChatMessage(id) {
  if (!session?.user) return

  const { error } = await supabase
  .from("chat_messages")
  .delete()
  .eq("id", id)
  .eq("user_id", session.user.id)

  if (error) {
  setChatError(error.message)
  }
  }

  /* =====================================================
  FRIENDS
  ===================================================== */

  async function loadFriends() {
  if (!session?.user) {
  setFriends([])
  setFriendRequests([])
  setFollowingList([])
  setFollowersList([])
  setFollowingIds(new Set())
  return
  }
  setFriendsLoading(true)
  setFriendActionMsg("")

  const uid = session.user.id

  let data = null
  let error = null
  try {
  const res = await supabase
  .from("friendships")
  .select("*")
  .or(`requester_id.eq.${uid},addressee_id.eq.${uid}`)
  data = res.data
  error = res.error
  } catch (e) {
  error = e
  }

  if (error) {
  console.error("Friends:", error)
  setFriends([])
  setFriendRequests([])
  setFriendsLoading(false)
  try {
  await loadFollows()
  } catch {}
  return
  }

  const rows = (data || [])
  const accepted[] = []
  const pendingIn[] = []
  const pendingOut[] = []

  const otherIds = new Set()
  for (const f of rows) {
  const otherId =
  f.requester_id === uid ? f.addressee_id : f.requester_id
  if (otherId) otherIds.add(otherId)
  }

  let profilesMap: Object = {}
  if (otherIds.size > 0) {
  const { data: profiles } = await supabase
  .from("profiles")
  .select(
  "id,username,display_name,avatar_url,bio,role,banned,ban_reason"
  )
  .in("id", Array.from(otherIds))
  for (const p of profiles || []) {
  profilesMap[p.id] = p
  }
  }

  for (const f of rows) {
  const otherId =
  f.requester_id === uid ? f.addressee_id : f.requester_id
  const enriched = { ...f, other: profilesMap[otherId] }
  const st = String(f.status || "").toLowerCase()
  if (st === "accepted") {
  accepted.push(enriched)
  } else if (st === "pending" || st === "" || st === "null") {
  // Incoming: someone requested me
  if (f.addressee_id === uid) {
  pendingIn.push(enriched)
  }
  // Outgoing: I requested someone
  if (f.requester_id === uid) {
  pendingOut.push(enriched)
  }
  }
  }

  setFriends(accepted)
  setFriendRequests(pendingIn)
  setOutgoingRequests(pendingOut)
  cacheSet("friends", accepted)
  cacheSet("friend-requests", pendingIn)
  setFriendsLoading(false)
  await loadFollows()
  }

  async function loadFollows() {
  if (!session?.user) {
  setFollowingList([])
  setFollowersList([])
  setFollowingIds(new Set())
  return
  }
  const uid = session.user.id

  let followingRows[] | null = null
  let followerRows[] | null = null
  try {
  const [a, b] = await Promise.all([
  supabase
  .from("follows")
  .select("*")
  .eq("follower_id", uid)
  .order("created_at", { ascending: false }),
  supabase
  .from("follows")
  .select("*")
  .eq("following_id", uid)
  .order("created_at", { ascending: false }),
  ])
  if (a.error) {
  console.warn("follows (following):", a.error.message)
  } else {
  followingRows = a.data
  }
  if (b.error) {
  console.warn("follows (followers):", b.error.message)
  } else {
  followerRows = b.data
  }
  } catch (e) {
  console.warn("loadFollows:", e)
  setFollowingList([])
  setFollowersList([])
  setFollowingIds(new Set())
  return
  }

  const following = (followingRows || [])
  const followers = (followerRows || [])

  const ids = new Set()
  for (const f of following) ids.add(f.following_id)
  for (const f of followers) ids.add(f.follower_id)

  let map: Object = {}
  if (ids.size > 0) {
  const { data: profiles } = await supabase
  .from("profiles")
  .select(
  "id,username,display_name,avatar_url,bio,role,banned,ban_reason"
  )
  .in("id", Array.from(ids))
  for (const p of profiles || []) {
  map[p.id] = p
  }
  }

  setFollowingList(
  following.map((f) => ({
  ...f,
  other: map[f.following_id],
  }))
  )
  setFollowersList(
  followers.map((f) => ({
  ...f,
  other: map[f.follower_id],
  }))
  )
  setFollowingIds(new Set(following.map((f) => f.following_id)))
  }

  async function followUser(targetId) {
  if (!session?.user) {
  openAuth("login")
  return
  }
  if (targetId === session.user.id) return
  if (followingIds.has(targetId)) return

  setFollowBusyId(targetId)
  setFriendActionMsg("")
  const { error } = await supabase.from("follows").insert({
  follower_id: session.user.id,
  following_id: targetId,
  })
  if (error) {
  const msg = (error.message || "").toLowerCase()
  if (msg.includes("duplicate") || msg.includes("unique")) {
  setFollowingIds((prev) => new Set(prev).add(targetId))
  } else if (
  msg.includes("relation") ||
  msg.includes("does not exist")
  ) {
  setFriendActionMsg(
  "ยังไม่มีตาราง follows ใน Supabase — รัน SQL สร้างตารางก่อน"
  )
  } else {
  setFriendActionMsg(error.message)
  }
  } else {
  setFollowingIds((prev) => new Set(prev).add(targetId))
  setFriendActionMsg("Following.")
  await loadFollows()
  }
  setFollowBusyId(null)
  }

  async function unfollowUser(targetId) {
  if (!session?.user) return
  setFollowBusyId(targetId)
  setFriendActionMsg("")
  const { error } = await supabase
  .from("follows")
  .delete()
  .eq("follower_id", session.user.id)
  .eq("following_id", targetId)
  if (error) {
  setFriendActionMsg(error.message)
  } else {
  setFollowingIds((prev) => {
  const next = new Set(prev)
  next.delete(targetId)
  return next
  })
  setFriendActionMsg("Unfollowed.")
  await loadFollows()
  }
  setFollowBusyId(null)
  }

  async function searchUsersForFriend(q) {
  setFriendSearch(q)
  const query = q.trim()
  if (query.length < 2 || !session?.user) {
  setFriendSearchResults([])
  return
  }
  const { data } = await supabase
  .from("profiles")
  .select(
  "id,username,display_name,avatar_url,bio,role,banned,ban_reason"
  )
  .or(
  `username.ilike.%${query}%,display_name.ilike.%${query}%,bio.ilike.%${query}%`
  )
  .neq("id", session.user.id)
  .limit(15)
  setFriendSearchResults((data || []))
  }

  async function sendFriendRequest(targetId) {
  if (!session?.user) {
  openAuth("login")
  return
  }
  if (!targetId || targetId === session.user.id) return
  setFriendActionMsg("")

  // Already friends / already requested?
  const existing = friends.find((f) => f.other?.id === targetId)
  if (existing) {
  setFriendActionMsg("Already friends.")
  return
  }
  const alreadyOut = outgoingRequests.find(
  (f) => f.addressee_id === targetId
  )
  if (alreadyOut) {
  setFriendActionMsg("Friend request already sent.")
  return
  }
  const alreadyIn = friendRequests.find(
  (f) => f.requester_id === targetId
  )
  if (alreadyIn) {
  // They already requested me — accept instead
  await respondFriendRequest(alreadyIn.id, true)
  setFriendActionMsg("Accepted their friend request.")
  return
  }

  const { data, error } = await supabase
  .from("friendships")
  .insert({
  requester_id: session.user.id,
  addressee_id: targetId,
  status: "pending",
  })
  .select("*")
  .maybeSingle()

  if (error) {
  const msg = (error.message || "").toLowerCase()
  if (msg.includes("duplicate") || msg.includes("unique")) {
  setFriendActionMsg("Friend request already exists.")
  await loadFriends()
  } else if (
  msg.includes("relation") ||
  msg.includes("does not exist")
  ) {
  setFriendActionMsg(
  "ยังไม่มีตาราง friendships — รัน SQL สร้างตาราง + RLS ก่อน"
  )
  } else if (
  msg.includes("row-level security") ||
  msg.includes("rls")
  ) {
  setFriendActionMsg(
  "RLS บล็อกการส่งคำขอ — เปิด policy insert ให้ authenticated"
  )
  } else {
  setFriendActionMsg(error.message)
  }
  } else {
  setFriendActionMsg("Friend request sent.")
  setFriendSearchResults((prev) =>
  prev.filter((p) => p.id !== targetId)
  )
  if (data) {
  setOutgoingRequests((prev) => {
  if (prev.some((x) => x.id === (data).id)) return prev
  return [...prev, data
  })
  }
  await loadFriends()
  }
  }

  async function respondFriendRequest(id, accept) {
  if (!session?.user || !id) return
  setFriendActionMsg("")
  const uid = session.user.id

  // Accept: set status accepted (must be addressee)
  if (accept) {
  let { error } = await supabase
  .from("friendships")
  .update({ status: "accepted" })
  .eq("id", id)
  .eq("addressee_id", uid)

  // Fallback: update by id only (if policy uses different check)
  if (error) {
  const retry = await supabase
  .from("friendships")
  .update({ status: "accepted" })
  .eq("id", id)
  error = retry.error
  }

  if (error) {
  const msg = (error.message || "").toLowerCase()
  if (msg.includes("row-level security") || msg.includes("rls")) {
  setFriendActionMsg(
  "RLS บล็อกการรับคำขอ — ต้องให้ addressee อัปเดต status ได้"
  )
  } else {
  setFriendActionMsg(error.message)
  }
  return
  }
  setFriendActionMsg("Friend request accepted.")
  } else {
  // Reject: delete the row (cleaner than rejected status)
  let { error } = await supabase
  .from("friendships")
  .delete()
  .eq("id", id)
  .eq("addressee_id", uid)

  if (error) {
  const retry = await supabase
  .from("friendships")
  .delete()
  .eq("id", id)
  error = retry.error
  }
  if (error) {
  // Try mark rejected
  const up = await supabase
  .from("friendships")
  .update({ status: "rejected" })
  .eq("id", id)
  if (up.error) {
  setFriendActionMsg(up.error.message || error.message)
  return
  }
  }
  setFriendActionMsg("Friend request rejected.")
  }

  // Optimistic UI then reload
  setFriendRequests((prev) => prev.filter((r) => r.id !== id))
  await loadFriends()
  }

  async function cancelOutgoingRequest(id) {
  if (!session?.user || !id) return
  const { error } = await supabase
  .from("friendships")
  .delete()
  .eq("id", id)
  .eq("requester_id", session.user.id)
  if (error) {
  setFriendActionMsg(error.message)
  return
  }
  setOutgoingRequests((prev) => prev.filter((r) => r.id !== id))
  setFriendActionMsg("Request cancelled.")
  await loadFriends()
  }

  async function removeFriend(id) {
  if (!session?.user) return
  const { error } = await supabase
  .from("friendships")
  .delete()
  .eq("id", id)
  if (error) {
  setFriendActionMsg(error.message)
  return
  }
  await loadFriends()
  }

  function isFriendWith(userId) {
  if (!userId || !session?.user) return false
  return friends.some((f) => f.other?.id === userId)
  }

  function openDM(partner) {
  if (!session?.user) {
  openAuth("login")
  return
  }
  if (!partner?.id) return
  // Private chat only between accepted friends
  if (!isFriendWith(partner.id)) {
  setFriendActionMsg("Add as friend first to start private chat.")
  setView("friends")
  setMobileMenu(false)
  return
  }
  setDmPartner(partner)
  setDmError("")
  setView("dm")
  setMobileMenu(false)
  loadDM(partner.id)
  }

  async function loadDM(partnerId) {
  if (!session?.user) return
  const uid = session.user.id
  setDmError("")
  const { data, error } = await supabase
  .from("private_messages")
  .select("*")
  .or(
  `and(sender_id.eq.${uid},receiver_id.eq.${partnerId}),and(sender_id.eq.${partnerId},receiver_id.eq.${uid})`
  )
  .order("created_at", { ascending: true })
  .limit(300)
  if (error) {
  console.error("DM:", error)
  const msg = (error.message || "").toLowerCase()
  if (msg.includes("relation") || msg.includes("does not exist")) {
  setDmError(
  "ยังไม่มีตาราง private_messages — รัน SQL สร้างตาราง + RLS ก่อน"
  )
  } else if (
  msg.includes("row-level security") ||
  msg.includes("rls")
  ) {
  setDmError("RLS บล็อกการอ่านแชทส่วนตัว — ตรวจ policy SELECT")
  } else {
  setDmError(error.message)
  }
  setDmMessages([])
  } else {
  setDmMessages((data || []))
  }
  }

  async function sendDM(
  fileUrl | null,
  fileName | null,
  isImage
  ) {
  if (!session?.user || !dmPartner) return
  if (!isFriendWith(dmPartner.id)) {
  setDmError("Only friends can send private messages.")
  return
  }
  const text = dmInput.trim()
  if (!text && !fileUrl) return

  setDmSending(true)
  setDmError("")

  let messageBody: string | null = text || null
  if (fileUrl) {
  if (isImage) {
  const marker = `\n[xduck-img]${fileUrl}[/xduck-img]`
  messageBody =
  (text || (fileName ? `📷 ${fileName}` : "📷 Image")) +
  marker
  } else {
  const marker = `\n[xduck-file]${fileUrl}|${fileName || "file"}[/xduck-file]`
  messageBody =
  (text || (fileName ? `📎 ${fileName}` : "📎 File")) + marker
  }
  }

  const baseRow = {
  sender_id: session.user.id,
  receiver_id: dmPartner.id,
  message: messageBody,
  }

  let { data, error } = await supabase
  .from("private_messages")
  .insert({
  ...baseRow,
  file_url: fileUrl || null,
  file_name: fileName || null,
  })
  .select("*")
  .single()

  if (error) {
  const msg = (error.message || "").toLowerCase()
  if (
  msg.includes("file_url") ||
  msg.includes("file_name") ||
  msg.includes("column") ||
  msg.includes("schema")
  ) {
  const retry = await supabase
  .from("private_messages")
  .insert(baseRow)
  .select("*")
  .single()
  data = retry.data
  error = retry.error
  }
  }

  if (error) {
  console.error(error)
  const msg = (error.message || "").toLowerCase()
  if (msg.includes("row-level security") || msg.includes("rls")) {
  setDmError(
  "RLS บล็อกการส่งข้อความ — เปิด policy INSERT บน private_messages"
  )
  } else if (
  msg.includes("relation") ||
  msg.includes("does not exist")
  ) {
  setDmError(
  "ยังไม่มีตาราง private_messages — รัน SQL ใน Supabase ก่อน"
  )
  } else {
  setDmError(error.message)
  }
  } else {
  setDmInput("")
  if (data) {
  setDmMessages((prev) => {
  if (prev.some((x) => x.id === (data).id)) return prev
  return [...prev, data
  })
  }
  await loadDM(dmPartner.id)
  }
  setDmSending(false)
  }

  async function uploadDMFile(event) {
  const file = event.target.files?.[0]
  event.target.value = ""
  if (!file || !session?.user || !dmPartner) return

  if (!isFriendWith(dmPartner.id)) {
  setDmError("Only friends can send files in private chat.")
  return
  }

  if (file.size > 20 * 1024 * 1024) {
  setDmError("File must be smaller than 20 MB.")
  return
  }

  setDmFileUploading(true)
  setDmError("")

  try {
  const ext =
  getExtension(file.name) ||
  (file.type.startsWith("image/")
  ? file.type.split("/")[1] || "png"
  : "bin")
  const path = `${session.user.id}/${Date.now()}-${safeName(
  file.name.replace(/\.[^.]+$/, "")
  )}.${ext}`

  const contentType =
  file.type ||
  (ext.match(/^(png|jpe?g|gif|webp|svg|bmp|avif)$/i)
  ? `image/${ext === "jpg" ? "jpeg" : ext}`
  : "application/octet-stream")

  const { error } = await supabase.storage
  .from(DM_FILE_BUCKET)
  .upload(path, file, {
  upsert: true,
  contentType,
  cacheControl: "3600",
  })
  if (error) throw error

  let finalUrl = ""
  const signed = await supabase.storage
  .from(DM_FILE_BUCKET)
  .createSignedUrl(path, 60 * 60 * 24 * 365)
  if (signed.data?.signedUrl) {
  finalUrl = signed.data.signedUrl
  } else {
  const { data } = supabase.storage
  .from(DM_FILE_BUCKET)
  .getPublicUrl(path)
  if (!data?.publicUrl) {
  throw new Error(
  signed.error?.message ||
  "Could not create file URL. Make bucket dm-files public or allow signed URLs + policies."
  )
  }
  finalUrl = data.publicUrl
  }

  const isImage =
  file.type.startsWith("image/") ||
  isImageUrl(finalUrl, file.name)

  await sendDM(finalUrl, file.name, isImage)
  } catch (err) {
  console.error(err)
  setDmError(err?.message || "File upload failed.")
  } finally {
  setDmFileUploading(false)
  }
  }

  /* =====================================================
  GROUPS
  ===================================================== */

  async function loadGroups() {
  setGroupsLoading(true)
  setGroupError("")
  const { data, error } = await supabase
  .from("groups")
  .select("*")
  .order("created_at", { ascending: false })
  .limit(100)

  if (error) {
  console.error("loadGroups:", error)
  setGroupError(
  error.message.includes("relation") ||
  error.message.includes("does not exist")
  ? "ตาราง groups ยังไม่มีใน Supabase — รัน SQL สร้างตารางก่อน"
  : error.message
  )
  setGroups([])
  } else {
  setGroups((data || []))
  }

  if (session?.user) {
  const uid = session.user.id
  const { data: mem, error: memErr } = await supabase
  .from("group_members")
  .select("group_id,role,status")
  .eq("user_id", uid)
  if (memErr) {
  console.error("group_members:", memErr)
  }

  const statusMap: Object =
  {}
  const acceptedIds = []

  // Owner of groups
  for (const g of (data || [])) {
  if (g.owner_id === uid) {
  statusMap[g.id] = "owner"
  acceptedIds.push(g.id)
  }
  }

  for (const m of mem || []) {
  const st = (m).status
  const role = (m).role
  if (statusMap[(m).group_id] === "owner") continue
  if (st === "pending") {
  statusMap[(m).group_id] = "pending"
  } else if (
  st === "accepted" ||
  st == null ||
  role === "owner"
  ) {
  // null status = legacy rows treated as accepted
  statusMap[(m).group_id] = "accepted"
  acceptedIds.push((m).group_id)
  }
  }

  setMyGroupStatus(statusMap)

  if (acceptedIds.length) {
  const { data: mine } = await supabase
  .from("groups")
  .select("*")
  .in("id", acceptedIds)
  setMyGroups((mine || []))
  } else {
  setMyGroups([])
  }
  } else {
  setMyGroups([])
  setMyGroupStatus({})
  }
  setGroupsLoading(false)
  }

  async function createGroup() {
  if (!session?.user) {
  openAuth("login")
  return
  }
  if (!groupName.trim()) {
  setGroupError("กรุณาใส่ชื่อกลุ่ม")
  return
  }

  setGroupCreating(true)
  setGroupError("")

  try {
  // Try owner_id first (our schema), then user_id fallback
  let data = null
  let error = null

  const attempt = await supabase
  .from("groups")
  .insert({
  name: groupName.trim(),
  description: groupDesc.trim() || null,
  owner_id: session.user.id,
  })
  .select("*")
  .single()

  data = attempt.data
  error = attempt.error

  if (error && /owner_id|column|schema/i.test(error.message || "")) {
  const retry = await supabase
  .from("groups")
  .insert({
  name: groupName.trim(),
  description: groupDesc.trim() || null,
  user_id: session.user.id,
  })
  .select("*")
  .single()
  data = retry.data
  error = retry.error
  }

  if (error) {
  setGroupError(
  formatSupabaseCreateError(
  error.message || "Could not create group.",
  "groups"
  )
  )
  return
  }

  if (!data) {
  setGroupError("สร้างกลุ่มไม่สำเร็จ (ไม่มีข้อมูลกลับมา)")
  return
  }

  const { error: memError } = await supabase
  .from("group_members")
  .insert({
  group_id: data.id,
  user_id: session.user.id,
  role: "owner",
  status: "accepted",
  })

  if (memError) {
  // Retry without status column if schema not updated yet
  const retry = await supabase.from("group_members").insert({
  group_id: data.id,
  user_id: session.user.id,
  role: "owner",
  })
  if (retry.error) {
  console.error("group_members insert:", memError)
  setGroupError(
  `สร้างกลุ่มแล้ว แต่เพิ่มสมาชิกไม่สำเร็จ: ${memError.message}`
  )
  }
  }

  setGroupName("")
  setGroupDesc("")
  await loadGroups()
  openGroupChat(data)
  } catch (e) {
  setGroupError(e?.message || "Create group failed.")
  } finally {
  setGroupCreating(false)
  }
  }

  async function joinGroup(g) {
  if (!session?.user) {
  openAuth("login")
  return
  }
  setGroupError("")

  // Owner can always enter
  if (g.owner_id === session.user.id) {
  openGroupChat(g)
  return
  }

  const existing = myGroupStatus[g.id]
  if (existing === "accepted" || existing === "owner") {
  openGroupChat(g)
  return
  }
  if (existing === "pending") {
  setGroupError("คำขอเข้าร่วมถูกส่งแล้ว รอเจ้าของกลุ่มอนุมัติ")
  return
  }

  // Request to join — needs owner approval
  let { error } = await supabase.from("group_members").upsert(
  {
  group_id: g.id,
  user_id: session.user.id,
  role: "member",
  status: "pending",
  },
  { onConflict: "group_id,user_id" }
  )

  if (error && /status|column|schema/i.test(error.message || "")) {
  // Fallback: old schema without status = immediate join
  const retry = await supabase.from("group_members").upsert({
  group_id: g.id,
  user_id: session.user.id,
  role: "member",
  })
  error = retry.error
  if (!error) {
  await loadGroups()
  openGroupChat(g)
  return
  }
  }

  if (error) {
  setGroupError(error.message)
  return
  }

  setGroupError("ส่งคำขอเข้าร่วมแล้ว รอเจ้าของกลุ่มอนุมัติ")
  await loadGroups()
  }

  async function loadGroupPendingMembers(groupId) {
  if (!session?.user) {
  setGroupPendingMembers([])
  return
  }
  const { data, error } = await supabase
  .from("group_members")
  .select("group_id,user_id,role,status,joined_at")
  .eq("group_id", groupId)
  .eq("status", "pending")

  if (error) {
  setGroupPendingMembers([])
  return
  }

  const rows = (data || [])
  const ids = rows.map((r) => r.user_id)
  if (!ids.length) {
  setGroupPendingMembers([])
  return
  }

  const { data: profiles } = await supabase
  .from("profiles")
  .select("id,username,display_name,avatar_url")
  .in("id", ids)

  const map: Object = {}
  for (const p of profiles || []) map[p.id] = p

  setGroupPendingMembers(
  rows.map((r) => ({
  ...r,
  username: map[r.user_id]?.username || null,
  display_name: map[r.user_id]?.display_name || null,
  avatar_url: map[r.user_id]?.avatar_url || null,
  }))
  )
  }

  async function respondGroupJoin(
  groupId,
  userId,
  accept
  ) {
  if (!session?.user) return
  if (accept) {
  const { error } = await supabase
  .from("group_members")
  .update({ status: "accepted", role: "member" })
  .eq("group_id", groupId)
  .eq("user_id", userId)
  if (error) {
  setGroupError(error.message)
  return
  }
  } else {
  const { error } = await supabase
  .from("group_members")
  .delete()
  .eq("group_id", groupId)
  .eq("user_id", userId)
  if (error) {
  setGroupError(error.message)
  return
  }
  }
  await loadGroupPendingMembers(groupId)
  await loadGroups()
  }

  function openGroupChat(g) {
  if (!session?.user) {
  openAuth("login")
  return
  }
  const st = myGroupStatus[g.id]
  const isOwner = g.owner_id === session.user.id
  if (!isOwner && st !== "accepted" && st !== "owner") {
  setGroupError(
  st === "pending"
  ? "รอเจ้าของกลุ่มอนุมัติก่อนเข้าแชท"
  : "ต้องขอเข้าร่วมและรออนุมัติก่อน"
  )
  return
  }
  setSelectedGroup(g)
  setView("group-chat")
  setMobileMenu(false)
  loadGroupMessages(g.id)
  if (isOwner) loadGroupPendingMembers(g.id)
  else setGroupPendingMembers([])
  }

  async function loadGroupMessages(groupId) {
  const { data } = await supabase
  .from("group_messages")
  .select("*")
  .eq("group_id", groupId)
  .order("created_at", { ascending: true })
  .limit(250)
  setGroupMessages((data || []))
  }

  async function sendGroupMessage(
  fileUrl | null,
  fileName | null,
  isImage
  ) {
  if (!session?.user || !selectedGroup) return
  const text = groupInput.trim()
  if (!text && !fileUrl) return

  setGroupSending(true)
  setGroupError("")

  let messageBody = text || null
  if (fileUrl) {
  if (isImage) {
  const marker = `\n[xduck-img]${fileUrl}[/xduck-img]`
  messageBody =
  (text || (fileName ? `📷 ${fileName}` : "📷 Image")) +
  marker
  } else {
  const marker = `\n[xduck-file]${fileUrl}|${fileName || "file"}[/xduck-file]`
  messageBody =
  (text || (fileName ? `📎 ${fileName}` : "📎 File")) + marker
  }
  }

  const baseRow = {
  group_id: selectedGroup.id,
  user_id: session.user.id,
  username: username || "User",
  avatar_url: profile?.avatar_url || null,
  message: messageBody,
  }

  let { error } = await supabase.from("group_messages").insert({
  ...baseRow,
  file_url: fileUrl || null,
  file_name: fileName || null,
  })

  if (error) {
  const msg = (error.message || "").toLowerCase()
  if (
  msg.includes("file_url") ||
  msg.includes("file_name") ||
  msg.includes("column") ||
  msg.includes("schema")
  ) {
  const retry = await supabase
  .from("group_messages")
  .insert(baseRow)
  error = retry.error
  }
  }

  if (error) {
  setGroupError(error.message)
  } else {
  setGroupInput("")
  await loadGroupMessages(selectedGroup.id)
  }
  setGroupSending(false)
  }

  async function uploadGroupFile(event) {
  const file = event.target.files?.[0]
  event.target.value = ""
  if (!file || !session?.user || !selectedGroup) return

  if (file.size > 20 * 1024 * 1024) {
  setGroupError("File must be smaller than 20 MB.")
  return
  }

  setGroupFileUploading(true)
  setGroupError("")

  try {
  const ext =
  getExtension(file.name) ||
  (file.type.startsWith("image/")
  ? file.type.split("/")[1] || "png"
  : "bin")
  const path = `${session.user.id}/${Date.now()}-${safeName(
  file.name.replace(/\.[^.]+$/, "")
  )}.${ext}`

  const contentType =
  file.type ||
  (ext.match(/^(png|jpe?g|gif|webp|svg|bmp|avif)$/i)
  ? `image/${ext === "jpg" ? "jpeg" : ext}`
  : "application/octet-stream")

  const { error } = await supabase.storage
  .from(GROUP_FILE_BUCKET)
  .upload(path, file, {
  upsert: true,
  contentType,
  cacheControl: "3600",
  })
  if (error) throw error

  let finalUrl = ""
  const signed = await supabase.storage
  .from(GROUP_FILE_BUCKET)
  .createSignedUrl(path, 60 * 60 * 24 * 365)

  if (signed.data?.signedUrl) {
  finalUrl = signed.data.signedUrl
  } else {
  const { data } = supabase.storage
  .from(GROUP_FILE_BUCKET)
  .getPublicUrl(path)
  if (!data?.publicUrl) {
  throw new Error(
  signed.error?.message ||
  "Could not create file URL. Make bucket group-files public or allow signed URLs."
  )
  }
  finalUrl = data.publicUrl
  }

  const isImage =
  file.type.startsWith("image/") ||
  isImageUrl(finalUrl, file.name)

  await sendGroupMessage(finalUrl, file.name, isImage)
  } catch (err) {
  setGroupError(err?.message || "File upload failed.")
  console.error(err)
  } finally {
  setGroupFileUploading(false)
  }
  }

  /* =====================================================
  COMMUNITIES
  ===================================================== */

  async function loadCommunities() {
  setCommunitiesLoading(true)
  setCommunityError("")
  const { data, error } = await supabase
  .from("communities")
  .select("*")
  .order("created_at", { ascending: false })
  .limit(100)

  if (error) {
  console.error("loadCommunities:", error)
  setCommunityError(
  formatSupabaseCreateError(error.message, "communities")
  )
  setCommunities([])
  } else {
  setCommunities((data || []))
  }

  if (session?.user) {
  const { data: mem } = await supabase
  .from("community_members")
  .select("community_id")
  .eq("user_id", session.user.id)
  const ids = (mem || []).map((m) => m.community_id)
  if (ids.length) {
  const { data: mine } = await supabase
  .from("communities")
  .select("*")
  .in("id", ids)
  setMyCommunities((mine || []))
  } else {
  setMyCommunities([])
  }
  } else {
  setMyCommunities([])
  }
  setCommunitiesLoading(false)
  }

  async function createCommunity() {
  if (!session?.user) {
  openAuth("login")
  return
  }
  if (!communityName.trim()) {
  setCommunityError(
  appLang === "th"
  ? "กรุณาใส่ชื่อชุมชน"
  : "Please enter a community name"
  )
  return
  }

  setCommunityCreating(true)
  setCommunityError("")

  try {
  let data = null
  let error = null

  const attempt = await supabase
  .from("communities")
  .insert({
  name: communityName.trim(),
  description: communityDesc.trim() || null,
  owner_id: session.user.id,
  is_public: true,
  })
  .select("*")
  .single()

  data = attempt.data
  error = attempt.error

  if (error && /owner_id|column|schema/i.test(error.message || "")) {
  const retry = await supabase
  .from("communities")
  .insert({
  name: communityName.trim(),
  description: communityDesc.trim() || null,
  user_id: session.user.id,
  is_public: true,
  })
  .select("*")
  .single()
  data = retry.data
  error = retry.error
  }

  if (error) {
  setCommunityError(
  formatSupabaseCreateError(error.message, "communities")
  )
  return
  }

  if (!data) {
  setCommunityError("สร้างชุมชนไม่สำเร็จ")
  return
  }

  const { error: memError } = await supabase
  .from("community_members")
  .insert({
  community_id: data.id,
  user_id: session.user.id,
  role: "owner",
  })

  if (memError) {
  console.error("community_members:", memError)
  setCommunityError(
  `สร้างชุมชนแล้ว แต่เพิ่มสมาชิกไม่สำเร็จ: ${memError.message}`
  )
  }

  setCommunityName("")
  setCommunityDesc("")
  await loadCommunities()
  openCommunity(data)
  } catch (e) {
  setCommunityError(e?.message || "Create community failed.")
  } finally {
  setCommunityCreating(false)
  }
  }

  async function joinCommunity(c) {
  if (!session?.user) {
  openAuth("login")
  return
  }
  setCommunityError("")
  const { error } = await supabase.from("community_members").upsert({
  community_id: c.id,
  user_id: session.user.id,
  role: "member",
  })
  if (error) {
  setCommunityError(error.message)
  return
  }
  await loadCommunities()
  openCommunity(c)
  }

  function openCommunity(c) {
  setSelectedCommunity(c)
  setView("community")
  setMobileMenu(false)
  loadCommunityPosts(c.id)
  }

  async function loadCommunityPosts(communityId) {
  const { data } = await supabase
  .from("community_posts")
  .select("*")
  .eq("community_id", communityId)
  .order("created_at", { ascending: false })
  .limit(100)
  setCommunityPosts((data || []))
  }

  async function sendCommunityPost(
  fileUrl | null,
  fileName | null,
  isImage
  ) {
  if (!session?.user || !selectedCommunity) return
  const text = communityInput.trim()
  if (!text && !fileUrl) return

  setCommunitySending(true)
  setCommunityError("")

  let contentBody = text || null
  if (fileUrl) {
  if (isImage) {
  const marker = `\n[xduck-img]${fileUrl}[/xduck-img]`
  contentBody =
  (text || (fileName ? `📷 ${fileName}` : "📷 Image")) +
  marker
  } else if (fileName) {
  const marker = `\n[xduck-file]${fileUrl}|${fileName}[/xduck-file]`
  contentBody = (text || `📎 ${fileName}`) + marker
  }
  }

  const baseRow = {
  community_id: selectedCommunity.id,
  user_id: session.user.id,
  username: username || "User",
  avatar_url: profile?.avatar_url || null,
  content: contentBody,
  }

  let { error } = await supabase.from("community_posts").insert({
  ...baseRow,
  file_url: fileUrl || null,
  file_name: fileName || null,
  })

  if (error) {
  const msg = (error.message || "").toLowerCase()
  if (
  msg.includes("file_url") ||
  msg.includes("file_name") ||
  msg.includes("column") ||
  msg.includes("schema")
  ) {
  const retry = await supabase
  .from("community_posts")
  .insert(baseRow)
  error = retry.error
  }
  }

  if (error) {
  setCommunityError(error.message)
  } else {
  setCommunityInput("")
  await loadCommunityPosts(selectedCommunity.id)
  if (contentBody && mentionsQuantumDuckAI(contentBody)) {
  replyInCommunityAsAI(contentBody).catch((e) =>
  console.warn("AI community reply:", e)
  )
  }
  }
  setCommunitySending(false)
  }

  async function replyInCommunityAsAI(userText) {
  const apiKey = (groqApiKey || "").trim()
  if (!apiKey || !session?.user || !selectedCommunity) return
  try {
  const { data: recent } = await supabase
  .from("community_posts")
  .select("username,content")
  .eq("community_id", selectedCommunity.id)
  .order("created_at", { ascending: false })
  .limit(12)
  const ctx = (recent || [])
  .reverse()
  .map(
  (m) =>
  `${m.username || "User"}: ${String(m.content || "").slice(0, 180)}`
  )
  .join("\n")
  const embeds = extractChatEmbeds(userText)
  const reply = await callGroqChat(
  apiKey,
  [
  {
  role: "user",
  content:
  appLang === "th"
  ? `มีคนแท็กคุณในชุมชนสาธารณะ "${selectedCommunity.name}":\n${userText}\n\nตอบสั้นๆ ห้ามอ้างแชทส่วนตัว`
  : `Mentioned in public community "${selectedCommunity.name}":\n${userText}\n\nReply briefly. Never use private DMs.`,
  },
  ],
  appLang || "en",
  username || "User",
  session.user.id,
  {
  images: embeds.images,
  publicContext: `Community recent posts:\n${ctx}`,
  useVision: embeds.images.length > 0,
  }
  )
  await supabase.from("community_posts").insert({
  community_id: selectedCommunity.id,
  user_id: session.user.id,
  username: "QuantumDuckAI",
  avatar_url,
  content: `🤖 QuantumDuckAI:\n${reply}`,
  })
  await loadCommunityPosts(selectedCommunity.id)
  } catch (e) {
  console.warn(e)
  }
  }

  async function uploadCommunityFile(
  event
  ) {
  const file = event.target.files?.[0]
  event.target.value = ""
  if (!file || !session?.user || !selectedCommunity) return

  if (file.size > 20 * 1024 * 1024) {
  setCommunityError("File must be smaller than 20 MB.")
  return
  }

  setCommunityError("")

  try {
  const ext =
  getExtension(file.name) ||
  (file.type.startsWith("image/")
  ? file.type.split("/")[1] || "png"
  : "bin")
  const path = `${session.user.id}/${Date.now()}-${safeName(
  file.name.replace(/\.[^.]+$/, "")
  )}.${ext}`

  const contentType =
  file.type ||
  (ext.match(/^(png|jpe?g|gif|webp|svg|bmp|avif)$/i)
  ? `image/${ext === "jpg" ? "jpeg" : ext}`
  : "application/octet-stream")

  const { error } = await supabase.storage
  .from(COMMUNITY_FILE_BUCKET)
  .upload(path, file, {
  upsert: true,
  contentType,
  cacheControl: "3600",
  })
  if (error) throw error

  let finalUrl = ""
  const signed = await supabase.storage
  .from(COMMUNITY_FILE_BUCKET)
  .createSignedUrl(path, 60 * 60 * 24 * 365)

  if (signed.data?.signedUrl) {
  finalUrl = signed.data.signedUrl
  } else {
  const { data } = supabase.storage
  .from(COMMUNITY_FILE_BUCKET)
  .getPublicUrl(path)
  if (!data?.publicUrl) {
  throw new Error(
  signed.error?.message ||
  "Could not create file URL. Make bucket community-files public or allow signed URLs."
  )
  }
  finalUrl = data.publicUrl
  }

  const isImage =
  file.type.startsWith("image/") ||
  isImageUrl(finalUrl, file.name)

  await sendCommunityPost(finalUrl, file.name, isImage)
  } catch (err) {
  setCommunityError(err?.message || "File upload failed.")
  console.error(err)
  }
  }

  // Live friend requests (incoming)
  React.useEffect(() => {
  if (!session?.user) return
  const uid = session.user.id
  const channel = supabase
  .channel("xduck-friendships")
  .on(
  "postgres_changes",
  {
  event: "*",
  schema: "public",
  table: "friendships",
  },
  () => {
  loadFriends().catch(() => {})
  }
  )
  .subscribe()
  return () => {
  supabase.removeChannel(channel)
  }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session?.user?.id])

  React.useEffect(() => {
  if (!session || view !== "chat") return

  loadChat()

  const channel = supabase
  .channel("xduck-chat")
  .on(
  "postgres_changes",
  {
  event: "INSERT",
  schema: "public",
  table: "chat_messages",
  },
  (payload) => {
  const message = payload.new

  setMessages((previous) => {
  if (previous.some((x) => x.id === message.id)) {
  return previous
  }

  return [...previous, message]
  })
  }
  )
  .on(
  "postgres_changes",
  {
  event: "DELETE",
  schema: "public",
  table: "chat_messages",
  },
  (payload) => {
  const old = payload.old as {
  id: number
  }

  setMessages((previous) =>
  previous.filter((x) => x.id !== old.id)
  )
  }
  )
  .subscribe()

  return () => {
  supabase.removeChannel(channel)
  }
  }, [session, view])

  /* =====================================================
  REPOSITORIES
  ===================================================== */

  async function loadRepos() {
  setReposLoading(true)
  setRepoError("")
  const { data, error } = await supabase
  .from("repositories")
  .select("*")
  .or(
  session?.user
  ? `visibility.eq.public,user_id.eq.${session.user.id}`
  : "visibility.eq.public"
  )
  .order("updated_at", { ascending: false })
  .limit(100)

  if (error) {
  const msg = error.message || ""
  setRepoError(
  /relation|does not exist|schema cache|Could not find/i.test(msg)
  ? appLang === "th"
  ? "ยังไม่มีตาราง repositories — รัน SQL ไฟล์ xduck-repositories.sql ใน Supabase"
  : "Missing repositories table — run xduck-repositories.sql in Supabase SQL Editor"
  : msg
  )
  setRepos([])
  } else {
  setRepos((data || []))
  }

  if (session?.user) {
  const { data: mine } = await supabase
  .from("repositories")
  .select("*")
  .eq("user_id", session.user.id)
  .order("updated_at", { ascending: false })
  setMyRepos((mine || []))
  } else {
  setMyRepos([])
  }
  setReposLoading(false)
  }

  async function createRepo() {
  if (!session?.user) {
  openAuth("login")
  return
  }
  if (!repoTitle.trim()) {
  setRepoError("Repository name is required.")
  return
  }
  setRepoError("")
  const { data, error } = await supabase
  .from("repositories")
  .insert({
  user_id: session.user.id,
  title: repoTitle.trim(),
  description: repoDesc.trim() || null,
  visibility: repoVisibility,
  updated_at: new Date().toISOString(),
  })
  .select("*")
  .single()

  if (error) {
  const msg = error.message || ""
  setRepoError(
  /relation|does not exist|schema cache|Could not find|permission|RLS|policy/i.test(
  msg
  )
  ? appLang === "th"
  ? "สร้าง repo ไม่ได้ — รัน xduck-repositories.sql ใน Supabase (ตาราง + RLS + bucket repositories)"
  : "Could not create repo — run xduck-repositories.sql in Supabase (tables + RLS + repositories bucket)"
  : formatSupabaseCreateError(msg, "repositories")
  )
  return
  }
  setRepoTitle("")
  setRepoDesc("")
  await loadRepos()
  if (data) openRepo(data)
  }

  function openRepo(repo) {
  setSelectedRepo(repo)
  setView("repo")
  setMobileMenu(false)
  loadRepoFiles(repo.id)
  }

  async function loadRepoFiles(repoId) {
  const { data, error } = await supabase
  .from("repository_files")
  .select("*")
  .eq("repo_id", repoId)
  .order("path", { ascending: true, nullsFirst: false })
  if (error) {
  // Fallback if path column doesn't exist yet
  const retry = await supabase
  .from("repository_files")
  .select("*")
  .eq("repo_id", repoId)
  .order("created_at", { ascending: false })
  setRepoFiles(
  ((retry.data || [])).map((f) => ({
  ...f,
  path: f.path || f.file_name,
  }))
  )
  } else {
  setRepoFiles(
  ((data || [])).map((f) => ({
  ...f,
  path: f.path || f.file_name,
  }))
  )
  }
  }

  async function uploadRepoFile(event) {
  const fileList = event.target.files
  event.target.value = ""
  if (!fileList?.length || !session?.user || !selectedRepo) return

  if (selectedRepo.user_id !== session.user.id) {
  setRepoError("Only the owner can push files.")
  return
  }

  setRepoFileUploading(true)
  setRepoError("")

  const commit =
  repoCommitMsg.trim() ||
  `Update ${fileList.length} file${fileList.length > 1 ? "s" : ""}`

  try {
  for (let i = 0; i < fileList.length; i++) {
  const file = fileList[i]
  if (file.size > 50 * 1024 * 1024) {
  throw new Error(`${file.name} is larger than 50 MB.`)
  }

  // GitHub-style path: folder/name or just name
  let logicalPath = (repoPath || "")
  .trim()
  .replace(/^\/+|\/+$/g, "")
  if (
  logicalPath &&
  !logicalPath.includes(".") &&
  !logicalPath.endsWith("/")
  ) {
  // treat as folder
  logicalPath = `${logicalPath}/${file.name}`
  } else if (!logicalPath) {
  logicalPath = file.name
  } else if (logicalPath.endsWith("/")) {
  logicalPath = `${logicalPath}${file.name}`
  }
  // If user typed full path with extension, keep it (use for first file only)
  if (i > 0 && repoPath.trim() && repoPath.includes(".")) {
  const dir = repoPath.trim().replace(/[^/]+$/, "")
  logicalPath = `${dir}${file.name}`.replace(/^\/+/, "")
  }

  const storagePath = `${session.user.id}/${selectedRepo.id}/${logicalPath
  .split("/")
  .map(safeName)
  .join("/")}`

  const { error } = await supabase.storage
  .from(REPO_FILE_BUCKET)
  .upload(storagePath, file, {
  upsert: true,
  contentType: file.type || "application/octet-stream",
  cacheControl: "3600",
  })
  if (error) {
  const m = (error.message || "").toLowerCase()
  if (m.includes("bucket") || m.includes("not found")) {
  throw new Error(
  appLang === "th"
  ? "ไม่มี Storage bucket ชื่อ repositories — สร้างใน Supabase Storage แล้วรัน SQL policy"
  : "Missing Storage bucket 'repositories' — create it in Supabase Storage and run SQL policies"
  )
  }
  if (m.includes("policy") || m.includes("row-level")) {
  throw new Error(
  appLang === "th"
  ? "RLS บล็อกอัปโหลดไฟล์ repo — รัน policy ใน xduck-repositories.sql"
  : "RLS blocked repo upload — run policies in xduck-repositories.sql"
  )
  }
  throw error
  }

  let fileUrl = ""
  const signed = await supabase.storage
  .from(REPO_FILE_BUCKET)
  .createSignedUrl(storagePath, 60 * 60 * 24 * 365)
  if (signed.data?.signedUrl) {
  fileUrl = signed.data.signedUrl
  } else {
  const { data } = supabase.storage
  .from(REPO_FILE_BUCKET)
  .getPublicUrl(storagePath)
  if (!data?.publicUrl)
  throw new Error("Could not create file URL.")
  fileUrl = `${data.publicUrl}?t=${Date.now()}`
  }

  const fileName = logicalPath.split("/").pop() || file.name

  // Upsert by repo_id + path (latest version of that file)
  const { data: existing } = await supabase
  .from("repository_files")
  .select("id")
  .eq("repo_id", selectedRepo.id)
  .eq("path", logicalPath)
  .maybeSingle()

  if (existing?.id) {
  const { error: upErr } = await supabase
  .from("repository_files")
  .update({
  file_name: fileName,
  file_url: fileUrl,
  file_size: file.size,
  mime_type: file.type || null,
  commit_message: commit,
  created_at: new Date().toISOString(),
  })
  .eq("id", existing.id)
  if (upErr) throw upErr
  } else {
  const { error: insertError } = await supabase
  .from("repository_files")
  .insert({
  repo_id: selectedRepo.id,
  user_id: session.user.id,
  path: logicalPath,
  file_name: fileName,
  file_url: fileUrl,
  file_size: file.size,
  mime_type: file.type || null,
  commit_message: commit,
  })
  if (insertError) {
  // Fallback if path/commit columns missing
  const { error: e2 } = await supabase
  .from("repository_files")
  .insert({
  repo_id: selectedRepo.id,
  user_id: session.user.id,
  file_name: fileName,
  file_url: fileUrl,
  file_size: file.size,
  mime_type: file.type || null,
  })
  if (e2) throw insertError
  }
  }
  }

  await supabase
  .from("repositories")
  .update({ updated_at: new Date().toISOString() })
  .eq("id", selectedRepo.id)

  setRepoCommitMsg("")
  await loadRepoFiles(selectedRepo.id)
  } catch (err) {
  setRepoError(err?.message || "Push failed.")
  } finally {
  setRepoFileUploading(false)
  }
  }

  async function deleteRepoFile(fileId) {
  if (!session?.user || !selectedRepo) return
  if (selectedRepo.user_id !== session.user.id) return
  await supabase.from("repository_files").delete().eq("id", fileId)
  await loadRepoFiles(selectedRepo.id)
  }

  async function deleteRepo(repoId) {
  if (!session?.user) return
  const { error } = await supabase
  .from("repositories")
  .delete()
  .eq("id", repoId)
  .eq("user_id", session.user.id)
  if (error) {
  setRepoError(error.message)
  return
  }
  setSelectedRepo(null)
  setView("repos")
  await loadRepos()
  }

  /* =====================================================
  ADMIN
  ===================================================== */

  async function openAdmin() {
  if (!isAdmin) return

  setAdminOpen(true)

  await Promise.all([
  loadAdminUsers(),
  loadAdminProjects(),
  loadAdminReports(),
  ])
  }

  function openReportUser(user) {
  if (!session?.user) {
  openAuth("login")
  return
  }
  if (!user?.id || user.id === session.user.id) return
  setReportTarget(user)
  setReportReason("abuse")
  setReportDetails("")
  setReportMsg("")
  setReportOpen(true)
  }

  async function submitUserReport() {
  if (!session?.user || !reportTarget) return
  const details = reportDetails.trim()
  if (details.length < 8) {
  setReportMsg(
  appLang === "th"
  ? "กรุณาอธิบายรายละเอียดอย่างน้อยสั้นๆ (8 ตัวอักษรขึ้นไป)"
  : "Please describe the issue (at least 8 characters)."
  )
  return
  }

  setReportSending(true)
  setReportMsg("")

  try {
  // 1) AI review via QuantumDuckAI (Groq)
  let aiVerdict = "unknown"
  let aiSummary = ""
  const key = (groqApiKey || "").trim()
  if (key) {
  try {
  const system =
  appLang === "th"
  ? `คุณคือ QuantumDuckAI ผู้ตรวจสอบรายงานผู้ใช้บนแพลตฟอร์ม X-Duck
หน้าที่: ประเมินว่าคำร้องรายงานนี้ "น่าจะจริง" หรือ "ไม่น่าจริง" หรือ "ต้องการข้อมูลเพิ่ม"
ตอบเป็น JSON เท่านั้น รูปแบบ:
{"verdict":"likely_true"|"likely_false"|"needs_more_info","summary":"สรุปสั้นๆ เป็นภาษาไทย","confidence":0-100}
กฎ: อย่าตัดสินประหารหรือลงโทษเอง แค่ประเมินความน่าเชื่อถือของรายงานจากข้อความที่ให้
ส่งผลให้คณะกรรมการ (Mhom, QuantumDuckDev) ใช้ตัดสินใจ`
  : `You are QuantumDuckAI reviewing a user report on X-Duck.
Reply with JSON only:
{"verdict":"likely_true"|"likely_false"|"needs_more_info","summary":"short English summary","confidence":0-100}
Do not punish users; only assess credibility for admins Mhom and QuantumDuckDev.`

  const userPrompt = `Reporter id: ${session.user.id}
Reported user: ${reportTarget.username || reportTarget.display_name || reportTarget.id} (id: ${reportTarget.id})
Reason category: ${reportReason}
Details: ${details}`

  const raw = await callGroqChat(
  key,
  [
  { role: "system", content: system },
  { role: "user", content: userPrompt },
  ],
  appLang,
  "report-system",
  session.user.id
  )
  aiSummary = String(raw || "").trim()
  try {
  const jsonMatch = aiSummary.match(/\{[\s\S]*\}/)
  if (jsonMatch) {
  const parsed = JSON.parse(jsonMatch[0])
  if (parsed.verdict)
  aiVerdict = String(parsed.verdict)
  if (parsed.summary)
  aiSummary = String(parsed.summary)
  if (parsed.confidence != null) {
  aiSummary = `${aiSummary} (confidence: ${parsed.confidence}%)`
  }
  }
  } catch {}
  } catch (e) {
  aiSummary =
  (e?.message || "AI review failed") +
  " — report still saved for human admin review."
  aiVerdict = "needs_more_info"
  }
  } else {
  aiVerdict = "needs_more_info"
  aiSummary =
  appLang === "th"
  ? "ยังไม่ได้ตั้ง Groq API key — รอแอดมินตรวจสอบด้วยตนเอง"
  : "Groq API key missing — waiting for human admin review."
  }

  // 2) Save report
  const row = {
  reporter_id: session.user.id,
  reported_id: reportTarget.id,
  reason: reportReason,
  details,
  ai_verdict: aiVerdict,
  ai_summary: aiSummary,
  status: "pending",
  }

  let { data, error } = await supabase
  .from("user_reports")
  .insert(row)
  .select("*")
  .single()

  if (error) {
  // Fallback without AI columns
  if (/column|schema|ai_/i.test(error.message || "")) {
  const retry = await supabase
  .from("user_reports")
  .insert({
  reporter_id: session.user.id,
  reported_id: reportTarget.id,
  reason: reportReason,
  details:
  details + `\n\n[AI] ${aiVerdict}: ${aiSummary}`,
  status: "pending",
  })
  .select("*")
  .single()
  data = retry.data
  error = retry.error
  }
  }

  if (error) throw error

  // 3) Notify admins via private_messages if we can resolve their profile ids
  try {
  const { data: adminProfiles } = await supabase
  .from("profiles")
  .select("id,username")
  .in("username", ADMIN_USERNAMES)

  const note =
  appLang === "th"
  ? `🚨 รายงานผู้ใช้ใหม่\nจาก: ${username || session.user.id}\nเป้าหมาย: ${reportTarget.username || reportTarget.id}\nเหตุผล: ${reportReason}\nรายละเอียด: ${details}\n\n🤖 QuantumDuckAI:\nคำตัดสิน: ${aiVerdict}\nสรุป: ${aiSummary}`
  : `🚨 New user report\nFrom: ${username || session.user.id}\nTarget: ${reportTarget.username || reportTarget.id}\nReason: ${reportReason}\nDetails: ${details}\n\n🤖 QuantumDuckAI:\nVerdict: ${aiVerdict}\nSummary: ${aiSummary}`

  for (const admin of adminProfiles || []) {
  if (!admin?.id || admin.id === session.user.id) continue
  await supabase.from("private_messages").insert({
  sender_id: session.user.id,
  receiver_id: admin.id,
  message: note,
  })
  }
  } catch (e) {
  console.warn("admin notify:", e)
  }

  // 4) Local cache for admin panel
  if (data) {
  setAdminReports((prev) => [data, ...prev])
  }

  setReportMsg(
  appLang === "th"
  ? `ส่งรายงานแล้ว · AI: ${aiVerdict} — แอดมิน (Mhom / QuantumDuckDev) จะได้รับแจ้ง`
  : `Report submitted · AI: ${aiVerdict} — admins (Mhom / QuantumDuckDev) notified`
  )
  setTimeout(() => {
  setReportOpen(false)
  setReportTarget(null)
  }, 1600)
  } catch (e) {
  setReportMsg(
  e?.message ||
  (appLang === "th"
  ? "ส่งรายงานไม่สำเร็จ"
  : "Could not submit report")
  )
  } finally {
  setReportSending(false)
  }
  }

  async function loadAdminReports() {
  if (!isAdmin) return
  setAdminReportsLoading(true)
  const { data, error } = await supabase
  .from("user_reports")
  .select("*")
  .order("created_at", { ascending: false })
  .limit(100)
  if (error) {
  console.warn("reports:", error.message)
  setAdminReports([])
  } else {
  const rows = (data || [])
  const ids = new Set()
  for (const r of rows) {
  ids.add(r.reporter_id)
  ids.add(r.reported_id)
  }
  let map: Object = {}
  if (ids.size) {
  const { data: profiles } = await supabase
  .from("profiles")
  .select(
  "id,username,display_name,avatar_url,bio,role,banned,ban_reason"
  )
  .in("id", Array.from(ids))
  for (const p of profiles || []) map[p.id] = p
  }
  setAdminReports(
  rows.map((r) => ({
  ...r,
  reporter: map[r.reporter_id],
  reported: map[r.reported_id],
  }))
  )
  }
  setAdminReportsLoading(false)
  }

  async function updateReportStatus(
  id,
  status: "pending" | "reviewed" | "dismissed"
  ) {
  if (!id) return
  // Dismiss = delete permanently from reports list
  if (status === "dismissed") {
  const { error } = await supabase
  .from("user_reports")
  .delete()
  .eq("id", id)
  if (error) {
  console.warn("delete report:", error.message)
  return
  }
  setAdminReports((prev) => prev.filter((r) => r.id !== id))
  return
  }

  const { error } = await supabase
  .from("user_reports")
  .update({ status })
  .eq("id", id)
  if (!error) {
  setAdminReports((prev) =>
  prev.map((r) => (r.id === id ? { ...r, status } : r))
  )
  }
  }

  async function loadAdminUsers() {
  if (!isAdmin) {
  setAdminUsers([])
  setAdminUsersError("")
  return
  }

  setAdminUsersError("")

  const { data, error } = await supabase
  .from("profiles")
  .select(
  "id,username,display_name,avatar_url,role,banned,ban_reason"
  )
  .order("username", { ascending: true, nullsFirst: false })

  if (error) {
  console.error("Admin users:", error)
  setAdminUsersError(error.message)
  setAdminUsers([])
  return
  }

  setAdminUsers((data || []))
  setAdminUsersError("")
  }

  async function loadAdminProjects() {
  const { data } = await supabase
  .from("projects")
  .select("*")
  .order("created_at", {
  ascending: false,
  })

  setAdminProjects((data || []))
  }

  async function adminDeleteProject(id) {
  if (!isAdmin) return

  const { error } = await supabase.from("projects").delete().eq("id", id)

  if (error) {
  setProjectsError(error.message)
  return
  }

  await loadAdminProjects()
  await loadAllProjects()
  await loadMyProjects()
  }

  async function adminToggleBan(user) {
  if (!isAdmin || !user.id) return

  const targetUsername = (user.username || "").trim()

  // Never allow an admin to ban a protected admin account.
  if (
  ADMIN_USERNAMES.some(
  (name) => name.toLowerCase() === targetUsername.toLowerCase()
  ) ||
  user.role?.toLowerCase() === "admin"
  ) {
  return
  }

  const nextBanned = !Boolean(user.banned)
  const reason = nextBanned ? "Banned by an X-Duck administrator." : null

  const { error } = await supabase
  .from("profiles")
  .update({
  banned: nextBanned,
  ban_reason: reason,
  })
  .eq("id", user.id)

  if (error) {
  console.error("Ban user:", error)
  return
  }

  // If the admin is looking at their own data cache, refresh it.
  await loadAdminUsers()
  }

  async function uploadLogo(event) {
  const file = event.target.files?.[0]

  event.target.value = ""

  if (!file || !isAdmin) return

  if (!file.type.startsWith("image/")) {
  setLogoError("Choose an image.")
  return
  }

  if (file.size > 5 * 1024 * 1024) {
  setLogoError("Logo must be smaller than 5 MB.")
  return
  }

  setLogoUploading(true)
  setLogoError("")
  setLogoMessage("")

  try {
  const { error } = await supabase.storage
  .from(LOGO_BUCKET)
  .upload(LOGO_FILE, file, {
  upsert: true,
  contentType: file.type,
  })

  if (error) throw error

  await loadLogo()

  setLogoMessage("Website logo updated.")
  } catch (error) {
  setLogoError(error?.message || "Logo upload failed.")
  } finally {
  setLogoUploading(false)
  }
  }

  /* =====================================================
  FILTERS
  ===================================================== */

  const filteredProjects = allProjects.filter((project) => {
  const query = projectSearch.trim().toLowerCase()

  if (!query) return true

  return (
  project.title.toLowerCase().includes(query) ||
  project.description.toLowerCase().includes(query)
  )
  })

  const filteredWiki = wikiPages.filter((page) => {
  const query = wikiSearch.trim().toLowerCase()

  if (!query) return true

  return (
  page.title.toLowerCase().includes(query) ||
  page.content.toLowerCase().includes(query)
  )
  })

  /* =====================================================
  LOADING
  ===================================================== */

  if (loading) {
  return (
  <div
  style={{
  width: "100%",
  minHeight: 500,
  background:
  "linear-gradient(180deg, #FFFFFF 0%, #F7F8FB 100%)",
  color: "#0F172A",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontFamily: "Inter,sans-serif",
  }}
  >
  <style>{`
  @keyframes xduck-load-pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.55; }
  }
  @keyframes xduck-load-pop {
  from { opacity: 0; transform: scale(0.9); }
  to { opacity: 1; transform: scale(1); }
  }
  `}</style>
  <div
  style={{
  textAlign: "center",
  }}
  >
  {siteLogo && (
  <img
  src={siteLogo}
  alt=""
  style={{
  width: 80,
  height: 80,
  objectFit: "contain",
  marginBottom: 18,
  animation: "xduck-load-pop 0.45s ease both",
  }}
  />
  )}

  <strong
  style={{
  animation:
  "xduck-load-pulse 1.35s ease-in-out infinite",
  }}
  >
  Loading X-Duck...
  </strong>
  </div>
  </div>
  )
  }

  /* =====================================================
  RENDER
  ===================================================== */

  const rootThemeStyle = {
  background:
  appTheme === "light"
  ? `linear-gradient(180deg, ${theme.bg2} 0%, ${theme.bg} 55%, #EEF2F7 100%)`
  : `radial-gradient(1200px 600px at 10% -10%, ${theme.glow}, transparent 55%), radial-gradient(900px 500px at 100% 0%, ${theme.glow}, transparent 50%), linear-gradient(180deg, ${theme.bg2} 0%, ${theme.bg} 45%, ${theme.bg} 100%)`,
  color: theme.text,
  fontFamily:
  "Inter,-apple-system,BlinkMacSystemFont,Segoe UI,sans-serif",
  overflowX: "hidden",
  ["--xduck-bg"]: theme.bg,
  ["--xduck-bg2"]: theme.bg2,
  ["--xduck-text"]: theme.text,
  ["--xduck-muted"]: theme.muted,
  ["--xduck-card"]: theme.card,
  ["--xduck-border"]: theme.border,
  ["--xduck-header"]: theme.header,
  ["--xduck-input"]: theme.inputBg,
  ["--xduck-glow"]: theme.glow,
  ["--xduck-accent"]: accent,
  }

  return (
  <div
  className={isMobileUI ? "xduck xduck-mobile" : "xduck"}
  data-theme={appTheme}
  data-lang={appLang}
  style={{
  ...rootThemeStyle,
  // Fill Framer frame + published browser window
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  width: "100%",
  maxWidth: "100%",
  minWidth: "100%",
  height: "100%",
  minHeight: "100%",
  overflowY: "auto",
  overflowX: "hidden",
  WebkitOverflowScrolling: "touch",
  zIndex: 10,
  fontSize: isMobileUI ? 17 : 16,
  paddingTop: "env(safe-area-inset-top)",
  paddingBottom: "env(safe-area-inset-bottom)",
  }}
  >
  <Header
  logo={siteLogo}
  profile={profile}
  username={username}
  session={session}
  isAdmin={isAdmin}
  accent={accent}
  mobileMenu={mobileMenu}
  setMobileMenu={setMobileMenu}
  navigate={navigate}
  openAuth={openAuth}
  openAdmin={openAdmin}
  logout={logout}
  t={t}
  />

  {view === "home" && (
  <HomeView
  accent={accent}
  session={session}
  navigate={navigate}
  openAuth={openAuth}
  t={t}
  appLang={appLang}
  />
  )}

  {view === "game" && (
  <XDuckGameStudio
  accent={accent}
  session={session}
  navigate={navigate}
  />
  )}
  {view === "games" && (
  <PublishedGamesView
  accent={accent}
  session={session}
  openAuth={openAuth}
  navigate={navigate}
  />
  )}

  {view === "ai" && (
  <AIAssistantView
  accent={accent}
  navigate={navigate}
  t={t}
  appLang={appLang}
  session={session}
  profile={profile}
  username={username}
  groqApiKey={groqApiKey}
  />
  )}

  {view === "workspace" && (
  <WorkspaceView
  accent={accent}
  session={session}
  projects={myProjects}
  loading={projectsLoading}
  error={projectsError}
  reload={loadMyProjects}
  create={openNewProject}
  edit={openEditProject}
  remove={deleteProject}
  openAuth={openAuth}
  />
  )}

  {view === "projects" && (
  <ProjectsView
  accent={accent}
  session={session}
  projects={filteredProjects}
  loading={projectsLoading}
  error={projectsError}
  search={projectSearch}
  setSearch={setProjectSearch}
  reload={loadAllProjects}
  createProject={openNewProject}
  openAuth={openAuth}
  />
  )}

  {view === "wiki" && (
  <WikiView
  accent={accent}
  session={session}
  pages={filteredWiki}
  loading={wikiLoading}
  error={wikiError}
  search={wikiSearch}
  setSearch={setWikiSearch}
  selected={selectedWiki}
  setSelected={setSelectedWiki}
  reload={loadWiki}
  create={openNewWiki}
  edit={openEditWiki}
  remove={deleteWiki}
  openAuth={openAuth}
  />
  )}

  {view === "chat" && (
  <ChatView
  accent={accent}
  session={session}
  messages={messages}
  loading={chatLoading}
  error={chatError}
  message={chatMessage}
  setMessage={setChatMessage}
  send={sendChatMessage}
  remove={deleteChatMessage}
  sending={chatSending}
  reload={loadChat}
  openAuth={openAuth}
  username={username}
  appLang={appLang}
  fileUploading={chatFileUploading}
  fileRef={chatFileRef}
  uploadFile={uploadChatFile}
  />
  )}

  {view === "friends" && (
  <FriendsView
  accent={accent}
  session={session}
  friends={friends}
  requests={friendRequests}
  outgoing={outgoingRequests}
  loading={friendsLoading}
  search={friendSearch}
  searchResults={friendSearchResults}
  onSearch={searchUsersForFriend}
  sendRequest={sendFriendRequest}
  respond={respondFriendRequest}
  cancelOutgoing={cancelOutgoingRequest}
  remove={removeFriend}
  openDM={openDM}
  reload={loadFriends}
  openAuth={openAuth}
  message={friendActionMsg}
  t={t}
  followingList={followingList}
  followersList={followersList}
  followingIds={followingIds}
  followUser={followUser}
  unfollowUser={unfollowUser}
  followBusyId={followBusyId}
  />
  )}

  {view === "dm" && dmPartner && (
  <DMView
  accent={accent}
  session={session}
  partner={dmPartner}
  messages={dmMessages}
  input={dmInput}
  setInput={setDmInput}
  send={sendDM}
  sending={dmSending}
  error={dmError}
  fileUploading={dmFileUploading}
  fileRef={dmFileRef}
  uploadFile={uploadDMFile}
  back={() => navigate("friends")}
  username={username}
  />
  )}

  {view === "groups" && (
  <GroupsView
  accent={accent}
  session={session}
  groups={groups}
  myGroups={myGroups}
  myStatus={myGroupStatus}
  loading={groupsLoading}
  error={groupError}
  creating={groupCreating}
  name={groupName}
  setName={setGroupName}
  desc={groupDesc}
  setDesc={setGroupDesc}
  create={createGroup}
  join={joinGroup}
  open={openGroupChat}
  reload={loadGroups}
  openAuth={openAuth}
  t={t}
  />
  )}

  {view === "group-chat" && selectedGroup && (
  <GroupChatView
  accent={accent}
  session={session}
  group={selectedGroup}
  messages={groupMessages}
  input={groupInput}
  setInput={setGroupInput}
  send={sendGroupMessage}
  sending={groupSending}
  fileUploading={groupFileUploading}
  fileRef={groupFileRef}
  uploadFile={uploadGroupFile}
  back={() => navigate("groups")}
  username={username}
  pendingMembers={groupPendingMembers}
  respondJoin={respondGroupJoin}
  reloadPending={() =>
  loadGroupPendingMembers(selectedGroup.id)
  }
  />
  )}

  {view === "search" && (
  <GlobalSearchView
  accent={accent}
  navigate={navigate}
  t={t}
  session={session}
  openAuth={openAuth}
  joinGroup={joinGroup}
  openGroup={openGroupChat}
  openCommunity={openCommunity}
  openRepo={openRepo}
  openDM={openDM}
  followingIds={followingIds}
  followUser={followUser}
  unfollowUser={unfollowUser}
  followBusyId={followBusyId}
  friendIds={
  new Set(
  friends
  .map((f) => f.other?.id)
  .filter(Boolean))
  }
  sendFriendRequest={sendFriendRequest}
  openReportUser={openReportUser}
  />
  )}

  {view === "communities" && (
  <CommunitiesView
  accent={accent}
  session={session}
  communities={communities}
  myCommunities={myCommunities}
  loading={communitiesLoading}
  error={communityError}
  creating={communityCreating}
  name={communityName}
  setName={setCommunityName}
  desc={communityDesc}
  setDesc={setCommunityDesc}
  create={createCommunity}
  join={joinCommunity}
  open={openCommunity}
  reload={loadCommunities}
  openAuth={openAuth}
  t={t}
  />
  )}

  {view === "community" && selectedCommunity && (
  <CommunityView
  accent={accent}
  session={session}
  community={selectedCommunity}
  posts={communityPosts}
  input={communityInput}
  setInput={setCommunityInput}
  send={sendCommunityPost}
  sending={communitySending}
  fileRef={communityFileRef}
  uploadFile={uploadCommunityFile}
  back={() => navigate("communities")}
  username={username}
  />
  )}

  {view === "repos" && (
  <ReposView
  accent={accent}
  session={session}
  repos={repos}
  myRepos={myRepos}
  loading={reposLoading}
  error={repoError}
  title={repoTitle}
  setTitle={setRepoTitle}
  desc={repoDesc}
  setDesc={setRepoDesc}
  visibility={repoVisibility}
  setVisibility={setRepoVisibility}
  create={createRepo}
  open={openRepo}
  remove={deleteRepo}
  reload={loadRepos}
  openAuth={openAuth}
  />
  )}

  {view === "repo" && selectedRepo && (
  <RepoDetailView
  accent={accent}
  session={session}
  repo={selectedRepo}
  files={repoFiles}
  error={repoError}
  uploading={repoFileUploading}
  fileRef={repoFileRef}
  uploadFile={uploadRepoFile}
  deleteFile={deleteRepoFile}
  removeRepo={deleteRepo}
  back={() => navigate("repos")}
  path={repoPath}
  setPath={setRepoPath}
  commitMsg={repoCommitMsg}
  setCommitMsg={setRepoCommitMsg}
  />
  )}

  {view === "settings" && (
  <SettingsView
  accent={accent}
  session={session}
  username={settingsUsername}
  displayName={settingsDisplayName}
  avatar={settingsAvatar}
  bio={settingsBio}
  setUsername={setSettingsUsername}
  setDisplayName={setSettingsDisplayName}
  setBio={setSettingsBio}
  avatarInput={avatarInputRef}
  chooseAvatar={() => avatarInputRef.current?.click()}
  uploadAvatar={uploadAvatar}
  avatarUploading={avatarUploading}
  save={saveSettings}
  saving={settingsSaving}
  message={settingsMessage}
  error={settingsError}
  password={newPassword}
  setPassword={setNewPassword}
  changePassword={changePassword}
  passwordSaving={passwordSaving}
  passwordMessage={passwordMessage}
  passwordError={passwordError}
  isAdmin={isAdmin}
  openAdmin={openAdmin}
  logout={logout}
  navigate={navigate}
  t={t}
  appLang={appLang}
  changeLang={changeLang}
  appTheme={appTheme}
  changeTheme={changeTheme}
  soundMuted={soundMuted}
  toggleSoundMuted={toggleSoundMuted}
  />
  )}

  <Footer logo={siteLogo} />

  <MobileBottomNav
  view={view}
  navigate={navigate}
  session={session}
  openAuth={openAuth}
  accent={accent}
  t={t}
  />

  {authOpen && (
  <AuthModal
  accent={accent}
  mode={authMode}
  setMode={setAuthMode}
  email={email}
  setEmail={setEmail}
  password={password}
  setPassword={setPassword}
  username={signupUsername}
  setUsername={setSignupUsername}
  loading={authLoading}
  error={authError}
  message={authMessage}
  login={login}
  signup={signup}
  forgot={forgotPassword}
  close={() => setAuthOpen(false)}
  />
  )}

  {projectModalOpen && (
  <ProjectModal
  accent={accent}
  project={editingProject}
  title={projectTitle}
  setTitle={setProjectTitle}
  description={projectDescription}
  setDescription={setProjectDescription}
  gameUrl={projectGameUrl}
  setGameUrl={setProjectGameUrl}
  embeds={projectEmbeds}
  embedRef={projectEmbedRef}
  uploadEmbed={uploadProjectEmbed}
  removeEmbed={removeProjectEmbed}
  embedUploading={projectEmbedUploading}
  saving={projectSaving}
  error={projectError}
  save={saveProject}
  close={() => setProjectModalOpen(false)}
  thumbRef={projectThumbRef}
  fileRef={projectFileRef}
  uploadThumb={uploadProjectThumbnail}
  uploadFile={uploadProjectFile}
  thumbUploading={projectThumbUploading}
  fileUploading={projectFileUploading}
  t={t}
  />
  )}

  {wikiModalOpen && (
  <WikiModal
  accent={accent}
  editing={editingWiki}
  title={wikiTitle}
  setTitle={setWikiTitle}
  content={wikiContent}
  setContent={setWikiContent}
  saving={wikiSaving}
  error={wikiError}
  save={saveWiki}
  close={() => setWikiModalOpen(false)}
  />
  )}

  {adminOpen && isAdmin && (
  <AdminPanel
  accent={accent}
  logo={siteLogo}
  tab={adminTab}
  setTab={setAdminTab}
  users={adminUsers}
  usersError={adminUsersError}
  projects={adminProjects}
  reports={adminReports}
  reportsLoading={adminReportsLoading}
  reloadUsers={loadAdminUsers}
  reloadProjects={loadAdminProjects}
  reloadReports={loadAdminReports}
  updateReportStatus={updateReportStatus}
  deleteProject={adminDeleteProject}
  banUser={adminToggleBan}
  uploading={logoUploading}
  message={logoMessage}
  error={logoError}
  inputRef={logoInputRef}
  uploadLogo={uploadLogo}
  close={() => setAdminOpen(false)}
  />
  )}

  {reportOpen && reportTarget && (
  <Modal>
  <h2>{appLang === "th" ? "รายงานผู้ใช้" : "Report user"}</h2>
  <p
  style={{
  color: "var(--xduck-muted, #8994A8)",
  lineHeight: 1.5,
  }}
  >
  {appLang === "th"
  ? `รายงาน ${reportTarget.username || reportTarget.display_name || "ผู้ใช้"} · QuantumDuckAI จะประเมินแล้วส่งให้ Mhom / QuantumDuckDev`
  : `Report ${reportTarget.username || reportTarget.display_name || "user"} · QuantumDuckAI will assess and notify Mhom / QuantumDuckDev`}
  </p>
  <label
  style={{
  display: "block",
  marginTop: 14,
  marginBottom: 6,
  fontSize: 12,
  fontWeight: 800,
  color: "var(--xduck-muted, #8994A8)",
  }}
  >
  {appLang === "th" ? "หมวดเหตุผล" : "Reason"}
  </label>
  <select
  value={reportReason}
  onChange={(e) => setReportReason(e.target.value)}
  style={INPUT}
  >
  <option value="abuse">
  {appLang === "th"
  ? "การกลั่นแกล้ง / ดูหมิ่น"
  : "Abuse / harassment"}
  </option>
  <option value="spam">Spam</option>
  <option value="scam">
  {appLang === "th"
  ? "หลอกลวง / สแกม"
  : "Scam / fraud"}
  </option>
  <option value="nsfw">
  {appLang === "th"
  ? "เนื้อหาไม่เหมาะสม"
  : "Inappropriate content"}
  </option>
  <option value="impersonation">
  {appLang === "th"
  ? "แอบอ้างตัวตน"
  : "Impersonation"}
  </option>
  <option value="other">
  {appLang === "th" ? "อื่นๆ" : "Other"}
  </option>
  </select>
  <label
  style={{
  display: "block",
  marginTop: 14,
  marginBottom: 6,
  fontSize: 12,
  fontWeight: 800,
  color: "var(--xduck-muted, #8994A8)",
  }}
  >
  {appLang === "th" ? "รายละเอียด" : "Details"}
  </label>
  <textarea
  value={reportDetails}
  onChange={(e) => setReportDetails(e.target.value)}
  placeholder={
  appLang === "th"
  ? "อธิบายสิ่งที่เกิดขึ้น..."
  : "Describe what happened..."
  }
  style={{ ...INPUT, minHeight: 120, resize: "vertical" }}
  />
  {reportMsg ? (
  <div style={{ marginTop: 12 }}>
  <SuccessBox>{reportMsg}</SuccessBox>
  </div>
  ) : null}
  <div
  style={{
  display: "flex",
  justifyContent: "flex-end",
  gap: 10,
  marginTop: 18,
  }}
  >
  <button
  type="button"
  onClick={() => {
  setReportOpen(false)
  setReportTarget(null)
  }}
  style={{
  ...BTN,
  background: "rgba(255,255,255,.06)",
  color: "var(--xduck-text, #fff)",
  }}
  >
  {appLang === "th" ? "ยกเลิก" : "Cancel"}
  </button>
  <button
  type="button"
  disabled={reportSending}
  onClick={submitUserReport}
  style={{
  ...BTN,
  background: accent,
  color: "#07100B",
  }}
  >
  {reportSending
  ? appLang === "th"
  ? "กำลังส่ง + AI ตรวจ..."
  : "Sending + AI review..."
  : appLang === "th"
  ? "ส่งรายงาน"
  : "Submit report"}
  </button>
  </div>
  </Modal>
  )}

  <style>{`
  * { box-sizing: border-box; }
  html, body {
  margin: 0;
  background: var(--xduck-bg, #F7F8FB);
  -webkit-text-size-adjust: 100%;
  text-size-adjust: 100%;
  -webkit-tap-highlight-color: transparent;
  touch-action: manipulation;
  }

  /* ===== Fill parent (Framer) + viewport (published) ===== */
  .xduck {
  position: absolute !important;
  inset: 0 !important;
  width: 100% !important;
  max-width: 100% !important;
  min-width: 100% !important;
  height: 100% !important;
  min-height: 100% !important;
  overflow-x: hidden !important;
  overflow-y: auto !important;
  -webkit-overflow-scrolling: touch;
  z-index: 10 !important;
  }
  /* When opened as published site (body is direct parent) */
  @media (min-width: 1px) {
  html, body {
  width: 100% !important;
  height: 100% !important;
  margin: 0 !important;
  padding: 0 !important;
  overflow-x: hidden !important;
  }
  }
  @media (min-width: 921px) {
  .xduck .page {
  max-width: none !important;
  width: 100% !important;
  margin: 0 !important;
  padding: 36px clamp(24px, 4vw, 56px) 80px !important;
  box-sizing: border-box !important;
  }
  .xduck .xduck-home-hero {
  max-width: none !important;
  margin: 0 !important;
  width: 100% !important;
  padding-left: clamp(24px, 4vw, 56px) !important;
  padding-right: clamp(24px, 4vw, 56px) !important;
  box-sizing: border-box !important;
  }
  .xduck .xduck-home-features {
  max-width: none !important;
  width: 100% !important;
  padding-left: clamp(24px, 4vw, 56px) !important;
  padding-right: clamp(24px, 4vw, 56px) !important;
  box-sizing: border-box !important;
  }
  .xduck header {
  width: 100% !important;
  }
  .xduck header > div {
  max-width: none !important;
  width: 100% !important;
  margin: 0 !important;
  padding: 12px clamp(20px, 3vw, 48px) !important;
  box-sizing: border-box !important;
  }
  .xduck footer > div {
  max-width: none !important;
  width: 100% !important;
  margin: 0 !important;
  padding-left: clamp(20px, 3vw, 48px) !important;
  padding-right: clamp(20px, 3vw, 48px) !important;
  box-sizing: border-box !important;
  }
  .xduck .project-grid {
  grid-template-columns: repeat(3, minmax(0, 1fr)) !important;
  gap: 18px !important;
  }
  .xduck .stats-grid {
  grid-template-columns: repeat(3, minmax(0, 1fr)) !important;
  }
  @media (min-width: 1400px) {
  .xduck .project-grid {
  grid-template-columns: repeat(4, minmax(0, 1fr)) !important;
  }
  }
  .xduck .mobile-bottom-nav {
  display: none !important;
  }
  .xduck .desktop-nav {
  display: flex !important;
  flex-wrap: wrap !important;
  align-items: center !important;
  flex: 1 !important;
  justify-content: center !important;
  }
  .xduck .desktop-account {
  display: flex !important;
  align-items: center !important;
  flex-shrink: 0 !important;
  }
  .xduck .mobile-account {
  display: none !important;
  }
  .xduck footer {
  padding-bottom: 40px !important;
  width: 100% !important;
  }
  }

  /* ===== LIGHT THEME: force readable contrast ===== */
  .xduck[data-theme="light"] {
  color: #0F172A !important;
  }
  .xduck[data-theme="light"],
  .xduck[data-theme="light"] * {
  /* do not force every color — use targeted rules below */
  }
  .xduck[data-theme="light"] h1,
  .xduck[data-theme="light"] h2,
  .xduck[data-theme="light"] h3,
  .xduck[data-theme="light"] h4,
  .xduck[data-theme="light"] strong,
  .xduck[data-theme="light"] b,
  .xduck[data-theme="light"] label,
  .xduck[data-theme="light"] p,
  .xduck[data-theme="light"] li,
  .xduck[data-theme="light"] td,
  .xduck[data-theme="light"] th {
  color: #0F172A !important;
  }
  .xduck[data-theme="light"] span {
  color: inherit;
  }
  /* Override common dark-theme inline grays */
  .xduck[data-theme="light"] [style*="#8994A8"],
  .xduck[data-theme="light"] [style*="#96A1B5"],
  .xduck[data-theme="light"] [style*="#68758A"],
  .xduck[data-theme="light"] [style*="#566174"],
  .xduck[data-theme="light"] [style*="#AAB3C5"],
  .xduck[data-theme="light"] [style*="#B8C1D0"],
  .xduck[data-theme="light"] [style*="color: #8"],
  .xduck[data-theme="light"] [style*="color:#8"],
  .xduck[data-theme="light"] [style*="color: #6"],
  .xduck[data-theme="light"] [style*="color:#6"] {
  color: #475569 !important;
  }
  .xduck[data-theme="light"] [style*="color: #fff"],
  .xduck[data-theme="light"] [style*="color:#fff"],
  .xduck[data-theme="light"] [style*="color: #FFF"],
  .xduck[data-theme="light"] [style*="color:#FFF"],
  .xduck[data-theme="light"] [style*="color: #F4F7FF"],
  .xduck[data-theme="light"] [style*="color:#F4F7FF"] {
  color: #0F172A !important;
  }
  /* Keep dark text on accent green buttons */
  .xduck[data-theme="light"] button[style*="#07100B"],
  .xduck[data-theme="light"] button[style*="color: #07100B"],
  .xduck[data-theme="light"] button[style*="color:#07100B"] {
  color: #07100B !important;
  }
  .xduck[data-theme="light"] button[style*="rgba(255,255,255"],
  .xduck[data-theme="light"] button[style*="rgba(255, 255, 255"] {
  background: #F1F5F9 !important;
  color: #0F172A !important;
  border: 1px solid rgba(15,23,42,.1) !important;
  }
  .xduck[data-theme="light"] input,
  .xduck[data-theme="light"] textarea,
  .xduck[data-theme="light"] select {
  background: #FFFFFF !important;
  color: #0F172A !important;
  border: 1px solid rgba(15,23,42,.14) !important;
  }
  .xduck[data-theme="light"] input::placeholder,
  .xduck[data-theme="light"] textarea::placeholder {
  color: #94A3B8 !important;
  opacity: 1 !important;
  }

  /* ===== MOBILE-FIRST (width-based, always on phones) ===== */
  @media (max-width: 920px) {
  .xduck,
  .xduck.xduck-mobile {
  font-size: 16px !important;
  }
  .xduck button,
  .xduck.xduck-mobile button {
  min-height: 52px !important;
  min-width: 44px !important;
  padding: 14px 18px !important;
  font-size: 16px !important;
  border-radius: 14px !important;
  touch-action: manipulation !important;
  -webkit-user-select: none !important;
  user-select: none !important;
  }
  .xduck input,
  .xduck textarea,
  .xduck select,
  .xduck.xduck-mobile input,
  .xduck.xduck-mobile textarea,
  .xduck.xduck-mobile select {
  font-size: 16px !important; /* stop iOS zoom */
  min-height: 52px !important;
  padding: 14px 16px !important;
  width: 100% !important;
  max-width: 100% !important;
  border-radius: 14px !important;
  touch-action: manipulation !important;
  }
  .xduck .page,
  .xduck.xduck-mobile .page {
  padding: 14px 14px 120px !important;
  width: 100% !important;
  max-width: 100% !important;
  }
  .xduck .project-grid,
  .xduck .stats-grid {
  grid-template-columns: 1fr !important;
  gap: 12px !important;
  }
  .xduck h1 {
  font-size: clamp(28px, 8vw, 40px) !important;
  line-height: 1.12 !important;
  }
  .xduck h2 { font-size: 22px !important; }
  .xduck h3 { font-size: 18px !important; }
  .xduck .desktop-nav,
  .xduck .desktop-account {
  display: none !important;
  }
  .xduck .mobile-account {
  display: flex !important;
  align-items: center;
  gap: 8px;
  margin-left: auto;
  }
  .xduck .mobile-bottom-nav {
  display: block !important;
  position: fixed !important;
  left: 0; right: 0; bottom: 0;
  width: 100% !important;
  z-index: 99999 !important;
  background: rgba(255,255,255,.98) !important;
  border-top: 1px solid rgba(15,23,42,.1) !important;
  padding: 6px 0 max(10px, env(safe-area-inset-bottom)) !important;
  box-shadow: 0 -6px 24px rgba(15,23,42,.08) !important;
  }
  .xduck .mobile-bottom-nav-track {
  display: flex !important;
  flex-wrap: nowrap !important;
  overflow-x: auto !important;
  -webkit-overflow-scrolling: touch;
  gap: 4px;
  padding: 0 8px;
  scrollbar-width: none;
  }
  .xduck .mobile-bottom-nav-track::-webkit-scrollbar { display: none; }
  .xduck .mobile-bottom-nav button {
  flex: 0 0 auto !important;
  width: 76px !important;
  min-width: 76px !important;
  min-height: 64px !important;
  height: 64px !important;
  padding: 8px 4px !important;
  font-size: 11px !important;
  color: #64748B !important;
  background: transparent !important;
  border: 0 !important;
  border-radius: 14px !important;
  }
  .xduck .mobile-bottom-nav button.active {
  background: var(--xduck-accent, #A3E635) !important;
  color: #07100B !important;
  }
  .xduck .mobile-bottom-nav button .nav-ico {
  font-size: 24px !important;
  line-height: 1 !important;
  }
  .xduck .mobile-bottom-nav button .nav-label {
  font-size: 11px !important;
  font-weight: 800 !important;
  }
  .xduck footer {
  padding-bottom: 120px !important;
  }
  /* Easier taps: no hover lift on touch */
  .xduck button:hover:not(:disabled) {
  transform: none !important;
  box-shadow: none !important;
  }
  .xduck button:active:not(:disabled) {
  transform: scale(0.97) !important;
  opacity: 0.92 !important;
  }
  }

  /* ===== Animations ===== */
  @keyframes xduck-fade-in {
  from { opacity: 0; transform: translateY(10px); }
  to  { opacity: 1; transform: translateY(0); }
  }
  @keyframes xduck-fade-in-up {
  from { opacity: 0; transform: translateY(18px); }
  to  { opacity: 1; transform: translateY(0); }
  }
  @keyframes xduck-scale-in {
  from { opacity: 0; transform: scale(0.94); }
  to  { opacity: 1; transform: scale(1); }
  }
  @keyframes xduck-slide-up {
  from { opacity: 0; transform: translateY(24px); }
  to  { opacity: 1; transform: translateY(0); }
  }
  @keyframes xduck-pulse-soft {
  0%, 100% { opacity: 1; }
  50%  { opacity: 0.7; }
  }
  @keyframes xduck-nav-pop {
  0%  { transform: scale(1); }
  40%  { transform: scale(1.12); }
  100% { transform: scale(1); }
  }
  @keyframes xduck-float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-6px); }
  }
  @keyframes xduck-shimmer {
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
  }
  @keyframes xduck-soft-glow {
  0%, 100% { box-shadow: 0 8px 24px rgba(15,23,42,.06); }
  50% { box-shadow: 0 14px 36px rgba(163,230,53,.16); }
  }

  /* ===== Mobile-first layout ===== */
  .xduck {
  transition: background .4s ease, color .25s ease;
  -webkit-font-smoothing: antialiased;
  }
  .xduck .page {
  width: 100%;
  max-width: none;
  margin: 0;
  padding: 18px 16px 110px;
  animation: xduck-fade-in-up 0.4s cubic-bezier(.2,.8,.2,1) both;
  box-sizing: border-box;
  }
  .xduck .project-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 14px;
  }
  .xduck .stats-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 12px;
  }
  @media (min-width: 640px) {
  .xduck .project-grid {
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 16px;
  }
  .xduck .stats-grid {
  grid-template-columns: repeat(2, minmax(0, 1fr));
  }
  .xduck .page { padding: 36px 22px 100px; }
  }
  @media (min-width: 960px) {
  .xduck .stats-grid {
  grid-template-columns: repeat(3, minmax(0, 1fr));
  }
  .xduck .page { padding: 56px 24px 100px; }
  }

  .xduck .page-anim {
  animation: xduck-fade-in-up 0.35s ease both;
  }
  .xduck header {
  background: var(--xduck-header, rgba(7,10,16,.82)) !important;
  backdrop-filter: blur(22px) saturate(1.2) !important;
  -webkit-backdrop-filter: blur(22px) saturate(1.2) !important;
  border-bottom: 1px solid var(--xduck-border, rgba(255,255,255,.08)) !important;
  transition: background .3s ease, border-color .3s ease, box-shadow .3s ease;
  }
  .xduck footer {
  border-top: 1px solid var(--xduck-border, rgba(255,255,255,.08)) !important;
  color: var(--xduck-muted, #8994A8) !important;
  transition: border-color .3s ease, color .3s ease;
  }
  .xduck[data-theme="light"] {
  color: #0F172A !important;
  background-image: none !important;
  }
  .xduck[data-theme="light"] header {
  background: rgba(255,255,255,.9) !important;
  border-bottom: 1px solid rgba(15,23,42,.06) !important;
  box-shadow: 0 4px 24px rgba(15,23,42,.04) !important;
  backdrop-filter: blur(16px) saturate(1.2) !important;
  -webkit-backdrop-filter: blur(16px) saturate(1.2) !important;
  }
  .xduck[data-theme="light"] footer {
  background: #fff !important;
  border-top-color: rgba(15,23,42,.06) !important;
  color: #64748B !important;
  }
  .xduck[data-theme="light"] .mobile-bottom-nav {
  background: rgba(255,255,255,.97) !important;
  border-top: 1px solid rgba(15,23,42,.08) !important;
  box-shadow: 0 -8px 28px rgba(15,23,42,.06) !important;
  }
  .xduck[data-theme="light"] .mobile-bottom-nav button {
  color: #64748B !important;
  }
  .xduck[data-theme="light"] .mobile-bottom-nav button.active {
  color: #07100B !important;
  box-shadow: 0 6px 18px rgba(163,230,53,.35) !important;
  }
  .xduck[data-theme="light"] p,
  .xduck[data-theme="light"] span,
  .xduck[data-theme="light"] h1,
  .xduck[data-theme="light"] h2,
  .xduck[data-theme="light"] h3,
  .xduck[data-theme="light"] strong,
  .xduck[data-theme="light"] label {
  color: inherit;
  }
  .xduck[data-theme="light"] input,
  .xduck[data-theme="light"] textarea,
  .xduck[data-theme="light"] select {
  background: #F1F5F9 !important;
  color: #0F172A !important;
  border-color: rgba(15,23,42,.1) !important;
  }
  .xduck[data-theme="light"] input:focus,
  .xduck[data-theme="light"] textarea:focus,
  .xduck[data-theme="light"] select:focus {
  border-color: var(--xduck-accent, #A3E635) !important;
  box-shadow: 0 0 0 3px rgba(163,230,53,.22) !important;
  }
  .xduck[data-theme="light"] input::placeholder,
  .xduck[data-theme="light"] textarea::placeholder {
  color: #94A3B8 !important;
  }
  /* Soft white cards */
  .xduck[data-theme="light"] .project-grid > *,
  .xduck[data-theme="light"] [style*="borderRadius: 22"],
  .xduck[data-theme="light"] [style*="border-radius: 22"] {
  background: #FFFFFF !important;
  border-color: rgba(15,23,42,.07) !important;
  box-shadow: 0 10px 30px rgba(15,23,42,.05) !important;
  }
  .xduck[data-theme="light"] .xduck-home-hero {
  background: linear-gradient(180deg, #FFFFFF 0%, #F7F8FB 100%) !important;
  }
  .xduck[data-theme="light"] header button {
  color: #334155 !important;
  }
  .xduck[data-theme="light"] .desktop-nav button {
  color: #64748B !important;
  border-radius: 999px !important;
  transition: background .2s ease, color .2s ease, transform .18s ease !important;
  }
  .xduck[data-theme="light"] .desktop-nav button:hover {
  background: rgba(15,23,42,.04) !important;
  color: #0F172A !important;
  }
  /* Fix ghost buttons designed for dark UI */
  .xduck[data-theme="light"] button {
  /* keep accent buttons readable */
  }
  .xduck[data-theme="light"] .page button[style*="color: #fff"],
  .xduck[data-theme="light"] .page button[style*="color:#fff"] {
  color: #334155 !important;
  background: rgba(15,23,42,.04) !important;
  border: 1px solid rgba(15,23,42,.08) !important;
  }
  .xduck[data-theme="light"] .page button[style*="color: #AAB3C5"],
  .xduck[data-theme="light"] .page button[style*="#AAB3C5"] {
  color: #64748B !important;
  }
  .xduck[data-theme="light"] .page button[style*="background: accent"],
  .xduck[data-theme="light"] .page button[style*="#07100B"] {
  /* primary accent buttons keep dark text on green */
  }
  .xduck[data-theme="light"] header .xduck-brand {
  color: #0F172A !important;
  }
  .xduck[data-theme="light"] header .xduck-brand strong {
  color: #0F172A !important;
  }
  .xduck[data-theme="light"] .mobile-account button {
  box-shadow: 0 2px 10px rgba(15,23,42,.06);
  }
  /* Cards float in gently */
  .xduck .project-grid > * {
  transition: transform .22s cubic-bezier(.2,.8,.2,1), box-shadow .22s ease;
  }
  .xduck .project-grid > *:hover {
  transform: translateY(-3px);
  box-shadow: 0 14px 36px rgba(15,23,42,.08);
  }
  @media (hover: none) {
  .xduck .project-grid > *:hover {
  transform: none;
  }
  }

  /* Theme-aware cards & surfaces */
  .xduck .page > section,
  .xduck [style*="borderRadius: 22"],
  .xduck [style*="border-radius: 22"] {
  border-color: var(--xduck-border) !important;
  }
  .xduck input,
  .xduck textarea,
  .xduck select {
  background: var(--xduck-input, #101620) !important;
  border-color: var(--xduck-border, rgba(255,255,255,.1)) !important;
  color: var(--xduck-text, #fff) !important;
  }
  /* Soft secondary controls on light */
  .xduck[data-theme="light"] button[style*="rgba(255,255,255"] {
  /* left as-is; accent primary buttons stay green */
  }

  .xduck[data-theme="midnight"] .mobile-bottom-nav {
  background: rgba(9,8,20,.96) !important;
  border-top-color: rgba(160,150,255,.14) !important;
  }
  .xduck[data-theme="ocean"] .mobile-bottom-nav {
  background: rgba(4,16,24,.96) !important;
  border-top-color: rgba(80,200,240,.14) !important;
  }
  /* Theme picker chips look nicer */
  .xduck-theme-swatch {
  width: 18px;
  height: 18px;
  border-radius: 999px;
  border: 2px solid rgba(255,255,255,.35);
  flex-shrink: 0;
  }
  button, input, textarea, select {
  font-family: inherit;
  -webkit-tap-highlight-color: transparent;
  }
  input::placeholder, textarea::placeholder { color: #566174; }
  button {
  transition: transform .18s cubic-bezier(.2,.8,.2,1),
  opacity .15s ease,
  background .2s ease,
  box-shadow .2s ease,
  color .2s ease;
  }
  button:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(0,0,0,.18);
  }
  button:active:not(:disabled) {
  transform: translateY(0) scale(0.97);
  box-shadow: none;
  }
  button:disabled { opacity: .6; cursor: not-allowed; }

  /* Cards & surfaces fade in */
  .xduck .project-grid > *,
  .xduck [style*="borderRadius: 22"],
  .xduck [style*="border-radius: 22"] {
  animation: xduck-fade-in-up 0.4s ease both;
  }
  .xduck .project-grid > *:nth-child(1) { animation-delay: 0.02s; }
  .xduck .project-grid > *:nth-child(2) { animation-delay: 0.06s; }
  .xduck .project-grid > *:nth-child(3) { animation-delay: 0.1s; }
  .xduck .project-grid > *:nth-child(4) { animation-delay: 0.14s; }
  .xduck .project-grid > *:nth-child(5) { animation-delay: 0.18s; }
  .xduck .project-grid > *:nth-child(6) { animation-delay: 0.22s; }

  /* Modal enter */
  .xduck [style*="zIndex: 1200"],
  .xduck [style*="z-index: 1200"] {
  animation: xduck-fade-in 0.25s ease both;
  }
  .xduck [style*="zIndex: 1200"] > div,
  .xduck [style*="z-index: 1200"] > div {
  animation: xduck-scale-in 0.28s cubic-bezier(.2,.8,.2,1) both;
  }

  /* Desktop defaults — keep top nav as before */
  .desktop-nav { display: flex; }
  .desktop-account { display: flex; }
  .mobile-account { display: none; }
  .mobile-button { display: none; }
  .mobile-bottom-nav { display: none; }

  .page {
  max-width: none;
  margin: 0;
  padding: 40px 24px 80px;
  width: 100%;
  box-sizing: border-box;
  }
  .project-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 16px;
  }
  .stats-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 12px;
  }

  @media (max-width: 900px) {
  .project-grid { grid-template-columns: 1fr; }
  .stats-grid { grid-template-columns: 1fr; }

  /* Scale up this UI on phones — no JS class required */
  .xduck {
  width: 100% !important;
  max-width: 100vw !important;
  min-height: 100vh !important;
  font-size: 17px !important;
  }
  .xduck .desktop-nav,
  .xduck .desktop-account { display: none !important; }
  .xduck .mobile-account {
  display: flex !important;
  align-items: center;
  gap: 8px;
  margin-left: auto;
  }
  .xduck .mobile-button { display: none !important; }
  .xduck .mobile-bottom-nav {
  display: block !important;
  position: fixed !important;
  left: 0; right: 0; bottom: 0;
  width: 100%;
  max-width: 100vw;
  z-index: 100000;
  background: rgba(8,11,18,.98);
  border-top: 1px solid rgba(255,255,255,.14);
  padding: 8px 0 max(10px, env(safe-area-inset-bottom));
  overflow: hidden;
  }
  .xduck .mobile-bottom-nav-track {
  display: flex !important;
  flex-direction: row !important;
  flex-wrap: nowrap !important;
  align-items: stretch;
  gap: 6px;
  overflow-x: auto !important;
  overflow-y: hidden !important;
  -webkit-overflow-scrolling: touch;
  scroll-snap-type: x mandatory;
  scrollbar-width: none;
  padding: 0 10px;
  overscroll-behavior-x: contain;
  touch-action: pan-x;
  }
  .xduck .mobile-bottom-nav-track::-webkit-scrollbar {
  display: none;
  }
  /* Same large size as before — scroll sideways for more pages */
  .xduck .mobile-bottom-nav button {
  flex: 0 0 auto !important;
  min-width: 88px !important;
  width: 88px !important;
  max-width: none !important;
  min-height: 72px !important;
  height: 72px !important;
  font-size: 12px !important;
  padding: 10px 6px !important;
  border: 0;
  background: transparent;
  color: #AAB3C5;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 4px;
  font-weight: 800;
  border-radius: 16px;
  scroll-snap-align: center;
  white-space: nowrap;
  transform: none !important;
  touch-action: manipulation !important;
  }
  .xduck .mobile-bottom-nav button .nav-ico {
  font-size: 28px !important;
  line-height: 1 !important;
  }
  .xduck .mobile-bottom-nav button .nav-label {
  font-size: 12px !important;
  line-height: 1.15;
  max-width: 80px;
  overflow: hidden;
  text-overflow: ellipsis;
  }
  .xduck .mobile-bottom-nav button.active {
  color: #07100B !important;
  background: var(--xduck-accent, #A3E635) !important;
  animation: xduck-nav-pop 0.32s cubic-bezier(.2,.8,.2,1);
  }
  .xduck .mobile-bottom-nav button {
  transition: background .2s ease, color .2s ease, transform .18s ease;
  }
  .xduck .mobile-bottom-nav button:active {
  transform: scale(0.94) !important;
  }
  .xduck button {
  min-height: 58px !important;
  font-size: 17px !important;
  padding: 14px 20px !important;
  border-radius: 16px !important;
  touch-action: manipulation !important;
  }
  .xduck input,
  .xduck textarea,
  .xduck select {
  min-height: 58px !important;
  font-size: 17px !important;
  padding: 15px 17px !important;
  width: 100% !important;
  }
  .xduck .page {
  padding: 16px 14px 120px !important;
  max-width: 100% !important;
  width: 100% !important;
  }
  .xduck .xduck-home-hero {
  padding: 20px 14px 16px !important;
  max-width: 100% !important;
  }
  .xduck .xduck-home-features {
  padding: 8px 14px 100px !important;
  max-width: 100% !important;
  }
  .xduck h1 {
  font-size: clamp(28px, 8vw, 40px) !important;
  }
  .xduck h2 { font-size: 22px !important; }
  .xduck h3 { font-size: 18px !important; }
  .xduck header .xduck-brand,
  .xduck header .xduck-mobile-admin,
  .xduck header .xduck-mobile-profile {
  min-height: 44px !important;
  width: auto !important;
  transform: none !important;
  }
  .xduck header > div {
  max-width: 100% !important;
  width: 100% !important;
  margin: 0 !important;
  padding: 10px 14px !important;
  }
  .xduck footer { padding-bottom: 110px !important; }
  .xduck .modal-actions { flex-direction: column !important; }
  .xduck .modal-actions button { width: 100% !important; }
  }

  /* ===== Mobile full-screen shell (breaks out of Framer frame) ===== */
  .xduck.xduck-mobile {
  position: fixed !important;
  inset: 0 !important;
  width: 100vw !important;
  max-width: 100vw !important;
  height: 100dvh !important;
  min-height: 100dvh !important;
  overflow-x: hidden !important;
  overflow-y: auto !important;
  -webkit-overflow-scrolling: touch !important;
  font-size: 17px !important;
  z-index: 2147483000 !important;
  overscroll-behavior-y: contain;
  }

  .xduck.xduck-mobile .desktop-nav,
  .xduck.xduck-mobile .desktop-account {
  display: none !important;
  }
  .xduck.xduck-mobile .mobile-account {
  display: flex !important;
  align-items: center;
  gap: 8px;
  margin-left: auto;
  flex-shrink: 0;
  }
  .xduck.xduck-mobile .mobile-button {
  display: none !important;
  }

  .xduck.xduck-mobile .mobile-bottom-nav {
  display: block !important;
  position: fixed !important;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100vw;
  max-width: 100vw;
  z-index: 9999;
  background: rgba(8, 11, 18, 0.98);
  backdrop-filter: blur(18px);
  -webkit-backdrop-filter: blur(18px);
  border-top: 1px solid rgba(255,255,255,.14);
  padding: 8px 0 max(12px, env(safe-area-inset-bottom));
  overflow: hidden;
  }
  .xduck.xduck-mobile .mobile-bottom-nav-track {
  display: flex !important;
  flex-direction: row !important;
  flex-wrap: nowrap !important;
  gap: 6px;
  overflow-x: auto !important;
  overflow-y: hidden !important;
  -webkit-overflow-scrolling: touch;
  scroll-snap-type: x mandatory;
  scrollbar-width: none;
  padding: 0 10px;
  overscroll-behavior-x: contain;
  touch-action: pan-x;
  }
  .xduck.xduck-mobile .mobile-bottom-nav-track::-webkit-scrollbar {
  display: none;
  }
  /* Original large touch targets — swipe to reach every page */
  .xduck.xduck-mobile .mobile-bottom-nav button {
  flex: 0 0 auto !important;
  min-width: 88px !important;
  width: 88px !important;
  min-height: 72px !important;
  height: 72px !important;
  margin: 0;
  border: 0;
  border-radius: 16px;
  background: transparent;
  color: #AAB3C5;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 4px;
  font-size: 12px !important;
  font-weight: 800;
  padding: 10px 6px !important;
  cursor: pointer;
  line-height: 1.15;
  scroll-snap-align: center;
  white-space: nowrap;
  transform: none !important;
  touch-action: manipulation !important;
  }
  .xduck.xduck-mobile .mobile-bottom-nav button .nav-ico {
  font-size: 28px !important;
  line-height: 1 !important;
  }
  .xduck.xduck-mobile .mobile-bottom-nav button .nav-label {
  font-size: 12px !important;
  max-width: 80px;
  overflow: hidden;
  text-overflow: ellipsis;
  }
  .xduck.xduck-mobile .mobile-bottom-nav button.active {
  color: #07100B !important;
  background: var(--xduck-accent, #A3E635) !important;
  animation: xduck-nav-pop 0.32s cubic-bezier(.2,.8,.2,1);
  }
  .xduck.xduck-mobile .mobile-bottom-nav button {
  transition: background .2s ease, color .2s ease, transform .18s ease;
  }
  .xduck.xduck-mobile .mobile-bottom-nav button:active {
  transform: scale(0.94) !important;
  }

  .xduck.xduck-mobile .page {
  padding: 16px 14px 120px !important;
  width: 100% !important;
  max-width: 100% !important;
  }
  .xduck.xduck-mobile .xduck-home-hero {
  padding: 20px 14px 16px !important;
  max-width: 100% !important;
  }
  .xduck.xduck-mobile .xduck-home-features {
  padding: 8px 14px 120px !important;
  max-width: 100% !important;
  }

  /* ===== Portrait phone: larger touch targets + true full-screen ===== */
  .xduck.xduck-mobile button {
  min-height: 60px !important;
  font-size: 17px !important;
  padding: 15px 22px !important;
  border-radius: 16px !important;
  touch-action: manipulation !important;
  }
  .xduck.xduck-mobile input,
  .xduck.xduck-mobile textarea,
  .xduck.xduck-mobile select {
  font-size: 17px !important;
  min-height: 60px !important;
  padding: 16px 18px !important;
  border-radius: 16px !important;
  width: 100% !important;
  }
  .xduck.xduck-mobile .mobile-bottom-nav {
  padding: 8px 0 max(12px, env(safe-area-inset-bottom)) !important;
  }
  .xduck.xduck-mobile .mobile-bottom-nav button {
  flex: 0 0 auto !important;
  min-width: 88px !important;
  width: 88px !important;
  min-height: 72px !important;
  height: 72px !important;
  font-size: 12px !important;
  padding: 10px 6px !important;
  border-radius: 16px !important;
  transform: none !important;
  }
  .xduck.xduck-mobile .mobile-bottom-nav button .nav-ico {
  font-size: 28px !important;
  line-height: 1 !important;
  }
  /* Header profile / admin stay compact but still easy to tap */
  .xduck.xduck-mobile header .xduck-mobile-admin {
  min-height: 48px !important;
  height: 48px !important;
  padding: 0 16px !important;
  font-size: 14px !important;
  width: auto !important;
  border-radius: 14px !important;
  transform: none !important;
  }
  .xduck.xduck-mobile header .xduck-mobile-profile {
  min-height: 48px !important;
  padding: 4px 14px 4px 4px !important;
  font-size: 15px !important;
  width: auto !important;
  max-width: 44vw !important;
  border-radius: 999px !important;
  transform: none !important;
  }
  .xduck.xduck-mobile header .xduck-brand {
  min-height: 48px !important;
  padding: 4px 0 !important;
  font-size: 18px !important;
  width: auto !important;
  }
  .xduck.xduck-mobile h1 {
  font-size: clamp(32px, 9.5vw, 46px) !important;
  line-height: 1.08 !important;
  word-break: break-word;
  }
  .xduck.xduck-mobile h2 { font-size: 24px !important; }
  .xduck.xduck-mobile h3 { font-size: 20px !important; }
  .xduck.xduck-mobile p { font-size: 16px !important; line-height: 1.55 !important; }

  .xduck.xduck-mobile .project-grid,
  .xduck.xduck-mobile .stats-grid {
  grid-template-columns: 1fr !important;
  gap: 14px !important;
  }

  .xduck.xduck-mobile footer {
  padding-bottom: 140px !important;
  }

  .xduck.xduck-mobile .modal-actions {
  flex-direction: column !important;
  }
  .xduck.xduck-mobile .modal-actions button {
  width: 100% !important;
  min-height: 60px !important;
  }

  /* Header: logo top-left like desktop */
  .xduck.xduck-mobile header {
  position: sticky !important;
  top: 0 !important;
  left: 0 !important;
  right: 0 !important;
  width: 100% !important;
  z-index: 200 !important;
  }
  .xduck.xduck-mobile header > div {
  justify-content: flex-start !important;
  align-items: center !important;
  max-width: 100% !important;
  width: 100% !important;
  margin: 0 !important;
  padding: 10px 14px !important;
  gap: 10px !important;
  padding-top: max(10px, env(safe-area-inset-top)) !important;
  }
  /* Brand / logo — top-left corner like desktop */
  .xduck.xduck-mobile header .xduck-brand {
  margin: 0 !important;
  margin-right: auto !important;
  min-height: 48px !important;
  height: auto !important;
  padding: 4px 0 !important;
  width: auto !important;
  max-width: none !important;
  justify-content: flex-start !important;
  align-items: center !important;
  border-radius: 0 !important;
  background: transparent !important;
  font-size: 18px !important;
  gap: 8px !important;
  transform: none !important;
  }
  .xduck.xduck-mobile header .xduck-brand img {
  width: 42px !important;
  height: 42px !important;
  object-fit: contain !important;
  flex-shrink: 0;
  display: block;
  }
  .xduck.xduck-mobile header .xduck-brand strong {
  font-size: 18px !important;
  }

  /* Extra full-screen + portrait polish */
  .xduck.xduck-mobile {
  padding: 0 !important;
  margin: 0 !important;
  overscroll-behavior: none;
  }
  .xduck.xduck-mobile .page {
  padding: 14px 14px 140px !important;
  }
  /* Make cards and modals more touch-friendly on tall phones */
  .xduck.xduck-mobile [style*="borderRadius: 22"],
  .xduck.xduck-mobile [style*="border-radius: 22"] {
  border-radius: 18px !important;
  }
  /* ===== Duck guide (login) — cute duck ===== */
  .xduck-duck-scene {
  position: relative;
  width: 160px;
  height: 150px;
  flex-shrink: 0;
  }
  .xduck-duck-figure {
  position: absolute;
  left: 18px;
  bottom: 24px;
  width: 120px;
  height: 115px;
  animation: xduck-bob 2.4s ease-in-out infinite;
  }
  .xduck-duck-sparkle {
  position: absolute;
  font-size: 14px;
  animation: xduck-sparkle 1.8s ease-in-out infinite;
  pointer-events: none;
  z-index: 8;
  }
  .xduck-duck-sparkle.s1 { top: 0; left: 8px; animation-delay: 0s; }
  .xduck-duck-sparkle.s2 { top: 12px; right: 4px; animation-delay: .4s; }
  .xduck-duck-sparkle.s3 { top: 40px; left: 0; font-size: 11px; animation-delay: .8s; }
  .xduck-duck-body {
  position: absolute;
  left: 28px;
  bottom: 10px;
  width: 78px;
  height: 58px;
  background: linear-gradient(165deg, #FFE08A 0%, #FBBF24 45%, #F59E0B 100%);
  border-radius: 50% 50% 46% 46%;
  box-shadow:
  inset -10px -12px 0 rgba(255,255,255,.22),
  inset 6px 6px 0 rgba(255,255,255,.18),
  0 6px 14px rgba(245,158,11,.3);
  z-index: 2;
  }
  .xduck-duck-belly {
  position: absolute;
  left: 50%;
  bottom: 10px;
  width: 40px;
  height: 28px;
  margin-left: -20px;
  background: rgba(255,255,255,.55);
  border-radius: 50%;
  z-index: 3;
  }
  .xduck-duck-head {
  position: absolute;
  left: 40px;
  top: 0;
  width: 54px;
  height: 50px;
  background: linear-gradient(180deg, #FFF3C4 0%, #FCD34D 100%);
  border-radius: 50%;
  box-shadow:
  inset -6px -5px 0 rgba(0,0,0,.05),
  0 4px 10px rgba(251,191,36,.25);
  z-index: 5;
  }
  .xduck-duck-eye {
  position: absolute;
  top: 16px;
  width: 12px;
  height: 14px;
  background: #1e293b;
  border-radius: 50%;
  overflow: hidden;
  }
  .xduck-duck-eye.left { left: 10px; }
  .xduck-duck-eye.right { right: 10px; }
  .xduck-duck-eye::after {
  content: "";
  position: absolute;
  top: 2px;
  left: 3px;
  width: 5px;
  height: 5px;
  background: #fff;
  border-radius: 50%;
  }
  .xduck-duck-eye::before {
  content: "";
  position: absolute;
  bottom: 2px;
  right: 2px;
  width: 3px;
  height: 3px;
  background: rgba(255,255,255,.7);
  border-radius: 50%;
  }
  .xduck-duck-cheek {
  position: absolute;
  top: 28px;
  width: 10px;
  height: 7px;
  background: rgba(251,113,133,.55);
  border-radius: 50%;
  z-index: 6;
  }
  .xduck-duck-cheek.left { left: 4px; }
  .xduck-duck-cheek.right { right: 4px; }
  .xduck-duck-beak {
  position: absolute;
  left: 50%;
  top: 26px;
  width: 28px;
  height: 15px;
  margin-left: -14px;
  background: linear-gradient(180deg, #FDBA74, #F97316);
  border-radius: 42% 42% 55% 55%;
  z-index: 7;
  box-shadow: 0 2px 0 rgba(234,88,12,.35);
  }
  .xduck-duck-beak::after {
  content: "";
  position: absolute;
  left: 5px;
  top: 6px;
  right: 5px;
  height: 2px;
  background: rgba(0,0,0,.1);
  border-radius: 2px;
  }
  .xduck-duck-smile {
  position: absolute;
  left: 50%;
  top: 38px;
  width: 14px;
  height: 7px;
  margin-left: -7px;
  border: 2px solid rgba(30,41,59,.35);
  border-top: 0;
  border-radius: 0 0 10px 10px;
  z-index: 6;
  }
  .xduck-duck-wing {
  position: absolute;
  width: 32px;
  height: 24px;
  background: linear-gradient(135deg, #FBBF24, #D97706);
  border-radius: 60% 40% 55% 45%;
  z-index: 4;
  box-shadow: inset 0 -4px 0 rgba(0,0,0,.08);
  }
  .xduck-duck-wing.left {
  left: 8px;
  top: 52px;
  transform-origin: 90% 40%;
  animation: xduck-wave 1.05s ease-in-out infinite;
  }
  .xduck-duck-wing.right {
  right: 4px;
  top: 54px;
  transform-origin: 10% 40%;
  border-radius: 40% 60% 45% 55%;
  animation: xduck-point 1.55s ease-in-out infinite;
  }
  .xduck-duck-wing.right::after {
  content: "";
  position: absolute;
  right: -11px;
  top: 5px;
  width: 15px;
  height: 11px;
  background: #D97706;
  border-radius: 50%;
  box-shadow: 8px 0 0 -2px #D97706;
  }
  .xduck-duck-foot {
  position: absolute;
  bottom: 0;
  width: 20px;
  height: 11px;
  background: #F97316;
  border-radius: 40% 40% 35% 35%;
  z-index: 1;
  box-shadow: 0 1px 0 rgba(0,0,0,.12);
  }
  .xduck-duck-foot.left { left: 36px; }
  .xduck-duck-foot.right { left: 62px; }
  .xduck-duck-shadow {
  position: absolute;
  left: 36px;
  bottom: 8px;
  width: 78px;
  height: 14px;
  background: rgba(15, 23, 42, 0.12);
  border-radius: 50%;
  animation: xduck-shadow 2.4s ease-in-out infinite;
  z-index: 0;
  }
  .xduck-duck-login-btn {
  animation: xduck-login-pulse 1.8s ease-in-out infinite;
  }
  @keyframes xduck-wave {
  0%, 100% { transform: rotate(14deg); }
  50% { transform: rotate(-38deg); }
  }
  @keyframes xduck-point {
  0%, 100% { transform: rotate(-14deg) translateX(0); }
  50% { transform: rotate(12deg) translateX(10px); }
  }
  @keyframes xduck-bob {
  0%, 100% { transform: translateY(0) rotate(-1deg); }
  50% { transform: translateY(-7px) rotate(1.5deg); }
  }
  @keyframes xduck-shadow {
  0%, 100% { transform: scaleX(1); opacity: .12; }
  50% { transform: scaleX(0.8); opacity: .08; }
  }
  @keyframes xduck-sparkle {
  0%, 100% { opacity: .35; transform: scale(.85) translateY(0); }
  50% { opacity: 1; transform: scale(1.15) translateY(-4px); }
  }
  @keyframes xduck-login-pulse {
  0%, 100% { transform: scale(1); box-shadow: 0 8px 24px rgba(163,230,53,.35); }
  50% { transform: scale(1.04); box-shadow: 0 10px 28px rgba(163,230,53,.55); }
  }
  `}</style>
  </div>
  )
}

/* =========================================================
  HOME
  ========================================================= */

/* =========================================================
  DUCK GUIDE — wave + point to Login (HTML/CSS only)
  ========================================================= */

function DuckLoginGuide({ accent, openAuth, appLang }) {
  const th = String(appLang || "en") === "th"
  return (
  <div
  className="xduck-duck-guide"
  style={{
  marginTop: 28,
  display: "flex",
  alignItems: "flex-end",
  gap: 16,
  flexWrap: "wrap",
  }}
  >
  <div className="xduck-duck-scene" aria-hidden="true">
  <span className="xduck-duck-sparkle s1">✨</span>
  <span className="xduck-duck-sparkle s2">💕</span>
  <span className="xduck-duck-sparkle s3">✨</span>
  <div className="xduck-duck-figure">
  <div className="xduck-duck-head">
  <span className="xduck-duck-eye left" />
  <span className="xduck-duck-eye right" />
  <span className="xduck-duck-cheek left" />
  <span className="xduck-duck-cheek right" />
  <span className="xduck-duck-beak" />
  <span className="xduck-duck-smile" />
  </div>
  <div className="xduck-duck-body">
  <span className="xduck-duck-belly" />
  </div>
  <div className="xduck-duck-wing left" />
  <div className="xduck-duck-wing right" />
  <div className="xduck-duck-foot left" />
  <div className="xduck-duck-foot right" />
  </div>
  <div className="xduck-duck-shadow" />
  </div>

  <div style={{ flex: "1 1 200px", minWidth: 180 }}>
  <div
  style={{
  fontSize: 14,
  fontWeight: 800,
  color: "var(--xduck-text, #0f172a)",
  marginBottom: 10,
  lineHeight: 1.4,
  }}
  >
  {th
  ? "น้องเป็ดรอคุณอยู่ — กด Login นะ 👇"
  : "This little duck is waiting — Login here 👇"}
  </div>
  <button
  type="button"
  className="xduck-duck-login-btn"
  onClick={() => openAuth("login")}
  style={{
  ...BTN,
  background: accent,
  color: "#07100B",
  padding: "14px 22px",
  fontSize: 15,
  boxShadow: `0 8px 24px ${accent}55`,
  }}
  >
  {th ? "เข้าสู่ระบบ" : "Login"}
  </button>
  </div>
  </div>
  )
}

function HomeView({ accent, session, navigate, openAuth, t, appLang }) {
  const translate = t || ((k) => k)
  return (
  <>
  <main
  className="xduck-home-hero"
  style={{
  width: "100%",
  maxWidth: "100%",
  margin: 0,
  padding:
  "clamp(36px, 8vw, 96px) clamp(16px, 4vw, 56px) clamp(32px, 5vw, 64px)",
  boxSizing: "border-box",
  }}
  >
  <div
  style={{
  width: "100%",
  maxWidth: "100%",
  animation:
  "xduck-fade-in-up 0.5s cubic-bezier(.2,.8,.2,1) both",
  }}
  >
  <div
  style={{
  display: "inline-flex",
  padding: "8px 14px",
  borderRadius: 999,
  background: `${accent}18`,
  border: `1px solid ${accent}40`,
  color: accent,
  fontSize: 12,
  fontWeight: 900,
  letterSpacing: ".04em",
  animation:
  "xduck-soft-glow 3.5s ease-in-out infinite",
  }}
  >
  {translate("community")}
  </div>

  <h1
  style={{
  margin: "22px 0 0",
  fontSize: "clamp(36px, 9vw, 82px)",
  lineHeight: 1.05,
  letterSpacing: "-.045em",
  fontWeight: 900,
  color: "var(--xduck-text)",
  }}
  >
  {translate("heroTitle")}
  </h1>

  <p
  style={{
  maxWidth: 700,
  color: "var(--xduck-muted, #64748B)",
  fontSize: "clamp(15px, 3.5vw, 18px)",
  lineHeight: 1.65,
  marginTop: 22,
  }}
  >
  {translate("heroDesc")}
  </p>

  <div
  style={{
  display: "flex",
  gap: 10,
  flexWrap: "wrap",
  marginTop: 28,
  }}
  >
  <button
  onClick={() => navigate("projects")}
  style={{
  ...BTN,
  background: accent,
  color: "#07100B",
  padding: "15px 23px",
  }}
  >
  {translate("browseProjects")}
  </button>

  <button
  onClick={() =>
  session
  ? navigate("workspace")
  : openAuth("login")
  }
  style={{
  ...BTN,
  background: "rgba(255,255,255,.06)",
  color: "var(--xduck-text, #fff)",
  padding: "15px 23px",
  }}
  >
  {translate("openWorkspace")}
  </button>
  </div>

  {!session && (
  <DuckLoginGuide
  accent={accent}
  openAuth={openAuth}
  appLang={appLang}
  />
  )}
  </div>
  </main>

  <section
  className="xduck-home-features"
  style={{
  width: "100%",
  maxWidth: "100%",
  margin: 0,
  padding: "20px clamp(16px, 4vw, 56px) 100px",
  boxSizing: "border-box",
  }}
  >
  <div className="stats-grid">
  <FeatureCard
  icon="🎮"
  title="X-Duck Game"
  description="Create Scratch-style games with blocks, sprites, variables and events."
  onClick={() => navigate("game")}
  />

  <FeatureCard
  icon="🛠️"
  title="Workspace"
  description="Create and manage your own projects."
  onClick={() => navigate("workspace")}
  />

  <FeatureCard
  icon="📦"
  title="Projects"
  description="Discover projects from the community."
  onClick={() => navigate("projects")}
  />

  <FeatureCard
  icon="📚"
  title="Wiki"
  description="Publish and read community knowledge."
  onClick={() => navigate("wiki")}
  />
  </div>

  <div
  style={{
  marginTop: 15,
  }}
  >
  <FeatureCard
  icon="💬"
  title="Chat"
  description="Talk to the X-Duck community in realtime."
  onClick={() => navigate("chat")}
  />
  </div>
  </section>
  </>
  )
}

/* =========================================================
  WORKSPACE
  ========================================================= */

function WorkspaceView({
  accent,
  session,
  projects,
  loading,
  error,
  reload,
  create,
  edit,
  remove,
  openAuth,
}) {
  return (
  <main className="page">
  <PageHeading
  label="WORKSPACE"
  title="Your Workspace"
  description="Create, edit and manage your projects."
  accent={accent}
  />

  {!session ? (
  <EmptyState>
  <h2>Login Required</h2>

  <p>Login to use Workspace.</p>

  <button
  onClick={() => openAuth("login")}
  style={{
  ...BTN,
  background: accent,
  color: "#07100B",
  }}
  >
  Login
  </button>
  </EmptyState>
  ) : (
  <>
  <div
  className="stats-grid"
  style={{
  marginTop: 28,
  }}
  >
  <Stat
  title="Your Projects"
  value={projects.length}
  accent={accent}
  />

  <Stat
  title="Account Status"
  value="Active"
  accent={accent}
  />

  <Stat title="Workspace" value="Ready" accent={accent} />
  </div>

  <div
  style={{
  display: "flex",
  gap: 10,
  flexWrap: "wrap",
  marginTop: 25,
  }}
  >
  <button
  onClick={create}
  style={{
  ...BTN,
  background: accent,
  color: "#07100B",
  }}
  >
  + Create Project
  </button>

  <button
  onClick={reload}
  style={{
  ...BTN,
  background: "rgba(255,255,255,.06)",
  color: "#fff",
  }}
  >
  Refresh
  </button>
  </div>

  {error && (
  <ErrorBox>
  <strong>Workspace error</strong>

  <div
  style={{
  marginTop: 5,
  }}
  >
  {error}
  </div>
  </ErrorBox>
  )}

  {loading && <LoadingBox>Loading Workspace...</LoadingBox>}

  {!loading && !error && projects.length === 0 && (
  <EmptyState>
  <div
  style={{
  fontSize: 44,
  }}
  >
  🛠️
  </div>

  <h2>Your Workspace is empty</h2>

  <p>Create your first project.</p>

  <button
  onClick={create}
  style={{
  ...BTN,
  background: accent,
  color: "#07100B",
  }}
  >
  Create First Project
  </button>
  </EmptyState>
  )}

  {!loading && !error && projects.length > 0 && (
  <div
  style={{
  marginTop: 30,
  }}
  >
  <h2>Your Projects</h2>

  <div className="project-grid">
  {projects.map((project) => (
  <ProjectCard
  key={project.id}
  project={project}
  accent={accent}
  owner
  session={session}
  edit={() => edit(project)}
  remove={() => remove(project.id)}
  />
  ))}
  </div>
  </div>
  )}
  </>
  )}
  </main>
  )
}

/* =========================================================
  PROJECTS
  ========================================================= */

function ProjectsView({
  accent,
  session,
  projects,
  loading,
  error,
  search,
  setSearch,
  reload,
  createProject,
  openAuth,
}) {
  return (
  <main className="page">
  <PageHeading
  label="PROJECTS"
  title="Community Projects"
  description="Discover and create projects from X-Duck."
  accent={accent}
  />

  <div
  className="projects-toolbar"
  style={{
  display: "flex",
  gap: 10,
  marginTop: 25,
  alignItems: "stretch",
  }}
  >
  <input
  value={search}
  onPointerDown={(e) => e.stopPropagation()}
  onChange={(e) => setSearch(e.target.value)}
  placeholder="Search projects..."
  style={{
  ...INPUT,
  flex: 1,
  }}
  />

  <button
  onClick={() =>
  session ? createProject() : openAuth("login")
  }
  style={{
  ...BTN,
  background: accent,
  color: "#07100B",
  whiteSpace: "nowrap",
  }}
  >
  + Create Project
  </button>

  <button
  onClick={reload}
  style={{
  ...BTN,
  background: "rgba(255,255,255,.06)",
  color: "#fff",
  whiteSpace: "nowrap",
  }}
  >
  Refresh
  </button>
  </div>

  {error && <ErrorBox>{error}</ErrorBox>}

  {loading && <LoadingBox>Loading Projects...</LoadingBox>}

  {!loading && !error && projects.length === 0 && (
  <EmptyState>
  <div
  style={{
  fontSize: 42,
  }}
  >
  📦
  </div>

  <h2>No Projects Found</h2>

  <p>
  {session
  ? "Create your first project using the button above."
  : "Login to create your first project."}
  </p>

  {session ? (
  <button
  onClick={createProject}
  style={{
  ...BTN,
  background: accent,
  color: "#07100B",
  }}
  >
  + Create Project
  </button>
  ) : (
  <button
  onClick={() => openAuth("login")}
  style={{
  ...BTN,
  background: accent,
  color: "#07100B",
  }}
  >
  Login
  </button>
  )}
  </EmptyState>
  )}

  {!loading && !error && projects.length > 0 && (
  <div
  className="project-grid"
  style={{
  marginTop: 25,
  }}
  >
  {projects.map((project) => (
  <ProjectCard
  key={project.id}
  project={project}
  accent={accent}
  session={session}
  />
  ))}
  </div>
  )}

  <style>{`
  @media (max-width: 600px) {
  .projects-toolbar {
  flex-direction: column !important;
  }

  .projects-toolbar button {
  width: 100%;
  }
  }
  `}</style>
  </main>
  )
}

/* =========================================================
  WIKI
  ========================================================= */

function WikiView({
  accent,
  session,
  pages,
  loading,
  error,
  search,
  setSearch,
  selected,
  setSelected,
  reload,
  create,
  edit,
  remove,
  openAuth,
}) {
  if (selected) {
  return (
  <main className="page">
  <button
  onClick={() => setSelected(null)}
  style={{
  ...BTN,
  background: "rgba(255,255,255,.06)",
  color: "#fff",
  }}
  >
  ← Back to Wiki
  </button>

  <article
  style={{
  maxWidth: 850,
  margin: "35px auto",
  }}
  >
  <div
  style={{
  color: accent,
  fontSize: 12,
  fontWeight: 900,
  }}
  >
  WIKI
  </div>

  <h1
  style={{
  fontSize: "clamp(38px,6vw,60px)",
  lineHeight: 1.05,
  margin: "8px 0",
  }}
  >
  {selected.title}
  </h1>

  <div
  style={{
  color: "#68758A",
  fontSize: 12,
  marginBottom: 28,
  }}
  >
  {formatDate(selected.created_at)}
  </div>

  <div
  style={{
  color: "#B8C1D0",
  lineHeight: 1.85,
  whiteSpace: "pre-wrap",
  }}
  >
  {selected.content}
  </div>

  {session?.user?.id === selected.user_id && (
  <div
  style={{
  display: "flex",
  gap: 8,
  marginTop: 25,
  }}
  >
  <button
  onClick={() => edit(selected)}
  style={{
  ...BTN,
  background: "rgba(255,255,255,.06)",
  color: "#fff",
  }}
  >
  Edit
  </button>

  <button
  onClick={() => remove(selected.id)}
  style={DANGER}
  >
  Delete
  </button>
  </div>
  )}
  </article>
  </main>
  )
  }

  return (
  <main className="page">
  <PageHeading
  label="WIKI"
  title="X-Duck Wiki"
  description="Documentation and community knowledge."
  accent={accent}
  />

  <div
  style={{
  display: "flex",
  gap: 10,
  marginTop: 25,
  }}
  >
  <input
  value={search}
  onPointerDown={(e) => e.stopPropagation()}
  onChange={(e) => setSearch(e.target.value)}
  placeholder="Search Wiki..."
  style={INPUT}
  />

  <button
  onClick={() => (session ? create() : openAuth("login"))}
  style={{
  ...BTN,
  background: accent,
  color: "#07100B",
  whiteSpace: "nowrap",
  }}
  >
  + New Wiki
  </button>
  </div>

  <button
  onClick={reload}
  style={{
  ...BTN_SMALL,
  marginTop: 10,
  background: "rgba(255,255,255,.06)",
  color: "#fff",
  }}
  >
  Refresh
  </button>

  {error && <ErrorBox>{error}</ErrorBox>}

  {loading && <LoadingBox>Loading Wiki...</LoadingBox>}

  {!loading && !error && pages.length === 0 && (
  <EmptyState>
  <h2>Wiki is empty</h2>

  <p>Create the first Wiki page.</p>
  </EmptyState>
  )}

  {!loading && !error && pages.length > 0 && (
  <div
  style={{
  display: "grid",
  gap: 12,
  marginTop: 25,
  }}
  >
  {pages.map((page) => (
  <div key={page.id} style={CARD}>
  <button
  onClick={() => setSelected(page)}
  style={{
  border: 0,
  padding: 0,
  background: "transparent",
  color: "#fff",
  cursor: "pointer",
  fontSize: 21,
  fontWeight: 900,
  }}
  >
  {page.title}
  </button>

  <p
  style={{
  color: "#8994A8",
  lineHeight: 1.6,
  whiteSpace: "pre-line",
  }}
  >
  {page.content}
  </p>

  {session?.user?.id === page.user_id && (
  <div
  style={{
  display: "flex",
  gap: 8,
  }}
  >
  <button
  onClick={() => edit(page)}
  style={{
  ...BTN_SMALL,
  background: "rgba(255,255,255,.06)",
  color: "#fff",
  }}
  >
  Edit
  </button>

  <button
  onClick={() => remove(page.id)}
  style={DANGER_SMALL}
  >
  Delete
  </button>
  </div>
  )}
  </div>
  ))}
  </div>
  )}
  </main>
  )
}

/* =========================================================
  CHAT
  ========================================================= */

function renderChatMessageWithMentions(
  text,
  accent,
  myUsername | null
) {
  if (!text) return null
  // รองรับ @Username (a-z A-Z 0-9 _)
  const parts = text.split(/(@[a-zA-Z0-9_]{1,30})/g)
  return parts.map((part, i) => {
  if (/^@[a-zA-Z0-9_]{1,30}$/.test(part)) {
  const tagged = part.slice(1)
  const isMe =
  myUsername &&
  tagged.toLowerCase() === String(myUsername).toLowerCase()
  return (
  <span
  key={i}
  style={{
  color: isMe ? "#07100B" : accent,
  background: isMe ? accent : `${accent}22`,
  fontWeight: 800,
  padding: "1px 6px",
  borderRadius: 6,
  }}
  >
  {part}
  </span>
  )
  }
  return <React.Fragment key={i}>{part}</React.Fragment>
  })
}

function messageMentionsUser(text, myUsername | null) {
  if (!text || !myUsername) return false
  const re = new RegExp(
  `@${String(myUsername).replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\b`,
  "i"
  )
  return re.test(text)
}

function ChatView({
  accent,
  session,
  messages,
  loading,
  error,
  message,
  setMessage,
  send,
  remove,
  sending,
  reload,
  openAuth,
  username,
  appLang,
  fileUploading,
  fileRef,
  uploadFile,
}) {
  function insertAiMention() {
  const tag = "@QuantumDuckAI "
  const cur = String(message || "")
  if (cur.toLowerCase().includes("@quantumduckai")) return
  setMessage(cur ? cur.trim() + " " + tag : tag)
  }

  const chatScrollRef = React.useRef(null)
  const [mentionNotice, setMentionNotice] = React.useState(
  null
  )
  const seenMentionIdsRef = React.useRef(new Set())

  // เลื่อนลงล่างสุดอัตโนมัติเมื่อมีข้อความใหม่
  React.useEffect(() => {
  const el = chatScrollRef.current
  if (!el) return
  el.scrollTop = el.scrollHeight
  }, [messages, loading])

  // แจ้งเตือนเมื่อมีคนแท็ก @username ของเรา
  React.useEffect(() => {
  if (!username || !messages?.length) return
  const myName = String(username).trim()
  if (!myName) return

  let latestMentioner: string | null = null
  for (const msg of messages) {
  if (seenMentionIdsRef.current.has(msg.id)) continue
  seenMentionIdsRef.current.add(msg.id)
  // ไม่แจ้งถ้าแท็กตัวเอง
  if (
  msg.username &&
  msg.username.toLowerCase() === myName.toLowerCase()
  )
  continue
  if (messageMentionsUser(msg.message, myName)) {
  latestMentioner = msg.username || "Someone"
  }
  }
  if (latestMentioner) {
  setMentionNotice(
  appLang === "th"
  ? `${latestMentioner} พูดถึงคุณ`
  : `${latestMentioner} mentioned you`
  )
  const t = window.setTimeout(() => setMentionNotice(null), 5000)
  return () => window.clearTimeout(t)
  }
  }, [messages, username, appLang])

  return (
  <main
  className="page"
  style={{
  maxWidth: 1000,
  }}
  >
  <PageHeading
  label="CHAT"
  title="X-Duck Chat"
  description="Realtime community chat."
  accent={accent}
  />

  {!session ? (
  <EmptyState>
  <h2>Login to Chat</h2>

  <button
  onClick={() => openAuth("login")}
  style={{
  ...BTN,
  background: accent,
  color: "#07100B",
  }}
  >
  Login
  </button>
  </EmptyState>
  ) : (
  <div
  style={{
  marginTop: 25,
  border: "1px solid rgba(255,255,255,.08)",
  borderRadius: 22,
  background: "rgba(255,255,255,.03)",
  overflow: "hidden",
  position: "relative",
  }}
  >
  {error && <ErrorBox>{error}</ErrorBox>}

  {mentionNotice && (
  <div
  style={{
  margin: 12,
  padding: "10px 14px",
  borderRadius: 12,
  background: `${accent}22`,
  border: `1px solid ${accent}55`,
  color: accent,
  fontWeight: 800,
  fontSize: 14,
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: 10,
  }}
  >
  <span>🔔 {mentionNotice}</span>
  <button
  type="button"
  onClick={() => setMentionNotice(null)}
  style={{
  border: 0,
  background: "transparent",
  color: accent,
  cursor: "pointer",
  fontWeight: 900,
  fontSize: 16,
  }}
  >
  ×
  </button>
  </div>
  )}

  <div
  ref={chatScrollRef}
  style={{
  height: "min(62vh,650px)",
  overflowY: "auto",
  padding: 18,
  display: "flex",
  flexDirection: "column",
  gap: 15,
  }}
  >
  {loading ? (
  <LoadingBox>Loading Chat...</LoadingBox>
  ) : messages.length === 0 ? (
  <div
  style={{
  color: "#68758A",
  textAlign: "center",
  marginTop: 60,
  }}
  >
  No messages yet.
  </div>
  ) : (
  messages.map((msg) => {
  const isMentioned = messageMentionsUser(
  msg.message,
  username
  )
  return (
  <div
  key={msg.id}
  style={{
  display: "flex",
  gap: 10,
  padding: isMentioned ? 10 : 0,
  borderRadius: isMentioned ? 12 : 0,
  background: isMentioned
  ? `${accent}12`
  : "transparent",
  border: isMentioned
  ? `1px solid ${accent}33`
  : "none",
  }}
  >
  {String(
  msg.username || ""
  ).toLowerCase() === "quantumduckai" ||
  String(msg.message || "").startsWith(
  "🤖 QuantumDuckAI"
  ) ? (
  <div
  style={{
  width: 34,
  height: 34,
  borderRadius: "50%",
  background: accent,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: 18,
  flexShrink: 0,
  }}
  >
  🦆
  </div>
  ) : msg.avatar_url ? (
  <img
  src={msg.avatar_url}
  alt=""
  style={{
  width: 34,
  height: 34,
  borderRadius: "50%",
  objectFit: "cover",
  flexShrink: 0,
  }}
  />
  ) : (
  <Avatar
  username={msg.username || "U"}
  accent={accent}
  size={34}
  />
  )}

  <div
  style={{
  minWidth: 0,
  }}
  >
  <div
  style={{
  display: "flex",
  gap: 8,
  alignItems: "center",
  flexWrap: "wrap",
  }}
  >
  <strong>{msg.username}</strong>

  <span
  style={{
  color: "#566174",
  fontSize: 10,
  }}
  >
  {formatDate(msg.created_at)}
  </span>

  {isMentioned && (
  <span
  style={{
  fontSize: 10,
  fontWeight: 800,
  color: "#07100B",
  background: accent,
  padding: "2px 7px",
  borderRadius: 999,
  }}
  >
  {appLang === "th"
  ? "พูดถึงคุณ"
  : "mentioned you"}
  </span>
  )}
  </div>

  {(() => {
  const embeds =
  extractChatEmbeds(
  msg.message || ""
  )
  const imgUrls = [
  ...embeds.images,
  ]
  if (
  msg.file_url &&
  !imgUrls.includes(
  msg.file_url
  ) &&
  isImageUrl(
  msg.file_url,
  msg.file_name
  )
  ) {
  imgUrls.push(msg.file_url)
  }
  const fileList = [
  ...embeds.files,
  ]
  if (
  msg.file_url &&
  !isImageUrl(
  msg.file_url,
  msg.file_name
  ) &&
  !fileList.some(
  (f) =>
  f.url ===
  msg.file_url
  )
  ) {
  fileList.push({
  url: msg.file_url,
  name:
  msg.file_name ||
  "file",
  })
  }
  return (
  <div
  style={{
  marginTop: 4,
  color: "#B8C1D0",
  lineHeight: 1.5,
  overflowWrap:
  "anywhere",
  }}
  >
  {embeds.cleanText
  ? renderChatMessageWithMentions(
  embeds.cleanText,
  accent,
  username
  )
  : null}
  {imgUrls.map((u) => (
  <ChatFilePreview
  key={u}
  url={u}
  name={
  msg.file_name
  }
  accent={accent}
  forceImage
  />
  ))}
  {fileList.map((f) => (
  <ChatFilePreview
  key={f.url}
  url={f.url}
  name={f.name}
  accent={accent}
  />
  ))}
  </div>
  )
  })()}

  <EngagementBar
  targetType="chat"
  targetId={String(msg.id)}
  session={session}
  accent={accent}
  />
  {msg.user_id ===
  session.user.id && (
  <button
  onClick={() =>
  remove(msg.id)
  }
  style={DANGER_LINK}
  >
  Delete
  </button>
  )}
  </div>
  </div>
  )
  })
  )}
  </div>

  <div
  style={{
  padding: 12,
  borderTop: "1px solid rgba(255,255,255,.08)",
  display: "flex",
  gap: 10,
  alignItems: "center",
  flexWrap: "wrap",
  }}
  >
  <input
  ref={fileRef}
  type="file"
  onChange={uploadFile}
  style={{ display: "none" }}
  />
  <button
  type="button"
  onClick={() => fileRef?.current?.click()}
  disabled={fileUploading || sending}
  style={{
  ...BTN,
  background: "rgba(255,255,255,.08)",
  color: "#fff",
  padding: "12px 14px",
  }}
  title="Upload file"
  >
  {fileUploading ? "…" : "📎"}
  </button>
  <input
  value={message}
  onPointerDown={(e) => e.stopPropagation()}
  onChange={(e) => setMessage(e.target.value)}
  onKeyDown={(e) => {
  if (e.key === "Enter") send()
  }}
  placeholder={
  String(appLang || "en") === "th"
  ? "เขียนข้อความ... แท็ก @QuantumDuckAI เพื่อเรียก AI"
  : "Write a message... tag @QuantumDuckAI to call AI"
  }
  style={{ ...INPUT, flex: 1, minWidth: 140 }}
  />

  <button
  type="button"
  onClick={insertAiMention}
  disabled={sending}
  title="@QuantumDuckAI"
  style={{
  ...BTN,
  background: "rgba(255,255,255,.08)",
  color: "var(--xduck-text, #fff)",
  padding: "12px 14px",
  }}
  >
  @AI
  </button>

  <button
  onClick={() => send()}
  disabled={sending || !message.trim()}
  style={{
  ...BTN,
  background: accent,
  color: "#07100B",
  }}
  >
  Send
  </button>
  </div>

  <button
  onClick={reload}
  style={{
  ...BTN_SMALL,
  margin: 12,
  background: "rgba(255,255,255,.06)",
  color: "#fff",
  }}
  >
  Refresh
  </button>
  </div>
  )}
  </main>
  )
}

/* =========================================================
  SETTINGS
  ========================================================= */

function SettingsView({
  accent,
  session,
  username,
  displayName,
  avatar,
  bio,
  setUsername,
  setDisplayName,
  setBio,
  avatarInput,
  chooseAvatar,
  uploadAvatar,
  avatarUploading,
  save,
  saving,
  message,
  error,
  password,
  setPassword,
  changePassword,
  passwordSaving,
  passwordMessage,
  passwordError,
  isAdmin,
  openAdmin,
  logout,
  navigate,
  t,
  appLang,
  changeLang,
  appTheme,
  changeTheme,
  soundMuted,
  toggleSoundMuted,
}) {
  const translate = t || ((k) => k)
  return (
  <main className="page">
  <PageHeading
  label={translate("settings").toUpperCase()}
  title={translate("yourAccount")}
  description={translate("manageAccount")}
  accent={accent}
  />

  <section
  style={{
  ...CARD,
  marginTop: 30,
  }}
  >
  <h2 style={{ marginTop: 0 }}>{translate("appearance")}</h2>
  <p style={{ color: "#8994A8", marginTop: 6 }}>
  {translate("preferencesSaved")}
  </p>

  <div style={{ marginTop: 18 }}>
  <div
  style={{
  fontSize: 12,
  fontWeight: 800,
  color: "#8994A8",
  marginBottom: 10,
  }}
  >
  {translate("language")}
  </div>
  <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
  {(
  [
  ["en", "langEn"],
  ["th", "langTh"],
  ]
  ).map(([code, labelKey]) => (
  <button
  key={code}
  type="button"
  onClick={() => changeLang?.(code)}
  style={{
  ...BTN,
  background:
  appLang === code
  ? accent
  : "rgba(255,255,255,.06)",
  color:
  appLang === code ? "#07100B" : "#fff",
  }}
  >
  {translate(labelKey)}
  </button>
  ))}
  </div>
  </div>

  <div style={{ marginTop: 22 }}>
  <div
  style={{
  fontSize: 12,
  fontWeight: 800,
  color: "#8994A8",
  marginBottom: 10,
  }}
  >
  {appLang === "th" ? "เสียง" : "Sound"}
  </div>
  <button
  type="button"
  data-sfx="toggle"
  onClick={() => toggleSoundMuted?.()}
  style={{
  ...BTN,
  marginBottom: 18,
  background: soundMuted
  ? "rgba(255,255,255,.08)"
  : accent,
  color: soundMuted
  ? "var(--xduck-text, #fff)"
  : "#07100B",
  }}
  >
  {soundMuted
  ? appLang === "th"
  ? "🔇 ปิดเสียงอยู่ — กดเพื่อเปิด"
  : "🔇 Sound off — tap to enable"
  : appLang === "th"
  ? "🔊 เสียงเปิดอยู่ — กดเพื่อปิด"
  : "🔊 Sound on — tap to mute"}
  </button>

  <div
  style={{
  fontSize: 12,
  fontWeight: 800,
  color: "#8994A8",
  marginBottom: 10,
  }}
  >
  {translate("theme")}
  </div>
  <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
  {(
  [
  ["dark", "themeDark", "#0C1220", "#A3E635"],
  ["light", "themeLight", "#F8FAFD", "#6478FF"],
  [
  "midnight",
  "themeMidnight",
  "#12102A",
  "#A78BFA",
  ],
  ["ocean", "themeOcean", "#0A1E2A", "#38BDF8"],
  ]
  ).map(([code, labelKey, c1, c2]) => {
  const active = appTheme === code
  return (
  <button
  key={code}
  type="button"
  onClick={() => changeTheme?.(code)}
  style={{
  ...BTN,
  display: "flex",
  alignItems: "center",
  gap: 10,
  background: active
  ? accent
  : "rgba(255,255,255,.06)",
  color: active ? "#07100B" : "#fff",
  border: active
  ? `2px solid ${accent}`
  : "1px solid rgba(255,255,255,.1)",
  boxShadow: active
  ? `0 8px 24px ${accent}33`
  : "none",
  }}
  >
  <span
  className="xduck-theme-swatch"
  style={{
  background: `linear-gradient(135deg, ${c1}, ${c2})`,
  }}
  />
  {translate(labelKey)}
  </button>
  )
  })}
  </div>
  </div>
  </section>

  <section
  style={{
  ...CARD,
  marginTop: 18,
  }}
  >
  <h2>{translate("profile")}</h2>

  <div
  style={{
  display: "flex",
  gap: 18,
  alignItems: "center",
  flexWrap: "wrap",
  }}
  >
  {avatar ? (
  <img
  src={avatar}
  alt=""
  style={{
  width: 88,
  height: 88,
  borderRadius: "50%",
  objectFit: "cover",
  }}
  />
  ) : (
  <Avatar username={username} accent={accent} size={88} />
  )}

  <div>
  <strong
  style={{
  fontSize: 18,
  }}
  >
  {username || "User"}
  </strong>

  <div
  style={{
  color: "#68758A",
  marginTop: 4,
  }}
  >
  {session?.user?.email}
  </div>

  <input
  ref={avatarInput}
  type="file"
  accept="image/png,image/jpeg,image/webp,image/gif"
  onPointerDown={(e) => e.stopPropagation()}
  onChange={uploadAvatar}
  style={{
  display: "none",
  }}
  />

  <button
  onClick={chooseAvatar}
  disabled={avatarUploading}
  style={{
  ...BTN,
  marginTop: 12,
  background: accent,
  color: "#07100B",
  }}
  >
  {avatarUploading
  ? "Uploading..."
  : "Choose Avatar From Computer"}
  </button>
  </div>
  </div>

  <Field
  label="Username"
  value={username}
  onChange={setUsername}
  />

  <Field
  label="Display Name"
  value={displayName}
  onChange={setDisplayName}
  />

  <label
  style={{
  display: "block",
  marginTop: 14,
  marginBottom: 6,
  color: "#8994A8",
  fontSize: 12,
  fontWeight: 700,
  }}
  >
  {translate("bio")}
  </label>
  <textarea
  value={bio || ""}
  onChange={(e) => setBio?.(e.target.value.slice(0, 500))}
  onPointerDown={(e) => e.stopPropagation()}
  placeholder={translate("bioPlaceholder")}
  maxLength={500}
  style={{
  ...INPUT,
  minHeight: 100,
  resize: "vertical",
  }}
  />
  <div
  style={{
  fontSize: 11,
  color: "#566174",
  marginTop: 4,
  textAlign: "right",
  }}
  >
  {(bio || "").length}/500
  </div>

  {error && <ErrorBox>{error}</ErrorBox>}

  {message && <SuccessBox>{message}</SuccessBox>}

  <button
  onClick={save}
  disabled={saving}
  style={{
  ...BTN,
  marginTop: 18,
  background: accent,
  color: "#07100B",
  }}
  >
  {saving ? "Saving..." : "Save Profile"}
  </button>
  </section>

  <section
  style={{
  ...CARD,
  marginTop: 18,
  }}
  >
  <h2>Password</h2>

  <input
  type="password"
  value={password}
  onPointerDown={(e) => e.stopPropagation()}
  onChange={(e) => setPassword(e.target.value)}
  placeholder="New password"
  style={INPUT}
  />

  {passwordError && <ErrorBox>{passwordError}</ErrorBox>}

  {passwordMessage && <SuccessBox>{passwordMessage}</SuccessBox>}

  <button
  onClick={changePassword}
  disabled={passwordSaving}
  style={{
  ...BTN,
  marginTop: 12,
  background: "rgba(255,255,255,.06)",
  color: "#fff",
  }}
  >
  {passwordSaving ? "Changing..." : "Change Password"}
  </button>
  </section>

  {isAdmin && (
  <section
  style={{
  ...CARD,
  marginTop: 18,
  background: `${accent}08`,
  border: `1px solid ${accent}30`,
  }}
  >
  <div
  style={{
  color: accent,
  fontSize: 11,
  fontWeight: 900,
  }}
  >
  ADMIN
  </div>

  <h2>Website Administration</h2>

  <button
  onClick={openAdmin}
  style={{
  ...BTN,
  background: accent,
  color: "#07100B",
  }}
  >
  Open Admin Panel
  </button>
  </section>
  )}

  <button
  onClick={logout}
  style={{
  ...BTN,
  width: "100%",
  marginTop: 18,
  padding: 15,
  background: "rgba(255,70,70,.1)",
  color: "#FF8D8D",
  }}
  >
  Logout
  </button>

  <button
  onClick={() => navigate("home")}
  style={{
  ...BTN,
  width: "100%",
  marginTop: 10,
  background: "rgba(255,255,255,.05)",
  color: "#fff",
  }}
  >
  Back Home
  </button>
  </main>
  )
}

/* =========================================================
  PROJECT MODAL
  ========================================================= */

function ProjectModal({
  accent,
  project,
  title,
  setTitle,
  description,
  setDescription,
  gameUrl,
  setGameUrl,
  embeds,
  embedRef,
  uploadEmbed,
  removeEmbed,
  embedUploading,
  saving,
  error,
  save,
  close,
  thumbRef,
  fileRef,
  uploadThumb,
  uploadFile,
  thumbUploading,
  fileUploading,
  t,
}) {
  const translate = t || ((k) => k)
  return (
  <Modal>
  <h2>{project ? "Edit Project" : "Create Project"}</h2>

  <Field label="Project Title" value={title} onChange={setTitle} />

  <label
  style={{
  display: "block",
  marginTop: 16,
  marginBottom: 7,
  color: "#8994A8",
  fontSize: 12,
  fontWeight: 700,
  }}
  >
  Description
  </label>

  <textarea
  value={description}
  onChange={(e) => setDescription(e.target.value)}
  style={{
  ...INPUT,
  minHeight: 150,
  resize: "vertical",
  }}
  />

  <label
  style={{
  display: "block",
  marginTop: 16,
  marginBottom: 7,
  color: "#8994A8",
  fontSize: 12,
  fontWeight: 700,
  }}
  >
  Game / Project URL
  </label>

  <input
  value={gameUrl}
  onPointerDown={(e) => e.stopPropagation()}
  onChange={(e) => setGameUrl(e.target.value)}
  placeholder="https://..."
  style={INPUT}
  />

  <div
  style={{
  display: "grid",
  gap: 10,
  marginTop: 18,
  }}
  >
  <input
  ref={thumbRef}
  type="file"
  accept="image/png,image/jpeg,image/webp"
  onPointerDown={(e) => e.stopPropagation()}
  onChange={uploadThumb}
  style={{
  display: "none",
  }}
  />

  <button
  type="button"
  onClick={() => thumbRef.current?.click()}
  disabled={thumbUploading}
  style={{
  ...BTN,
  background: "rgba(255,255,255,.06)",
  color: "var(--xduck-text, #fff)",
  }}
  >
  {thumbUploading
  ? translate("uploadingThumbnail")
  : translate("uploadThumbnail")}
  </button>

  <input
  ref={fileRef}
  type="file"
  onPointerDown={(e) => e.stopPropagation()}
  onChange={uploadFile}
  style={{
  display: "none",
  }}
  />

  <button
  type="button"
  onClick={() => fileRef.current?.click()}
  disabled={fileUploading}
  style={{
  ...BTN,
  background: "rgba(255,255,255,.06)",
  color: "var(--xduck-text, #fff)",
  }}
  >
  {fileUploading
  ? translate("uploadingGame")
  : translate("uploadGameFile")}
  </button>
  </div>

  <div style={{ marginTop: 18 }}>
  <div
  style={{
  fontSize: 12,
  fontWeight: 800,
  color: "var(--xduck-muted, #8994A8)",
  marginBottom: 8,
  }}
  >
  {translate("projectEmbeds")}
  </div>
  <input
  ref={embedRef}
  type="file"
  accept="image/*,.pdf,.zip,.rar,.7z,.txt,.md,.json,.csv,.html,.js,.ts,.tsx,.css,.mp3,.mp4,.webm,.gif,.png,.jpg,.jpeg,.webp"
  onPointerDown={(e) => e.stopPropagation()}
  onChange={uploadEmbed}
  style={{ display: "none" }}
  />
  <button
  type="button"
  onClick={() => {
  if (!uploadEmbed) {
  return
  }
  embedRef?.current?.click()
  }}
  disabled={embedUploading}
  style={{
  ...BTN,
  background: accent,
  color: "#07100B",
  marginBottom: 10,
  }}
  >
  {embedUploading
  ? translate("projectEmbedUploading")
  : translate("projectEmbedBtn")}
  </button>
  <p
  style={{
  margin: "0 0 10px",
  fontSize: 12,
  color: "var(--xduck-muted, #8994A8)",
  lineHeight: 1.5,
  }}
  >
  {translate("projectEmbedHint")}
  </p>
  {(embeds || []).length > 0 && (
  <div style={{ display: "grid", gap: 8 }}>
  {(embeds || []).map((f, i) => (
  <div
  key={`${f.url}-${i}`}
  style={{
  display: "flex",
  alignItems: "center",
  gap: 10,
  padding: 10,
  borderRadius: 12,
  border: "1px solid var(--xduck-border, rgba(255,255,255,.1))",
  background: "rgba(0,0,0,.04)",
  flexWrap: "wrap",
  }}
  >
  {isImageUrl(f.url, f.name) ? (
  <SafeImg
  src={f.url}
  alt={f.name}
  style={{
  width: 48,
  height: 48,
  objectFit: "cover",
  borderRadius: 8,
  }}
  />
  ) : (
  <span style={{ fontSize: 22 }}>📄</span>
  )}
  <a
  href={f.url}
  target="_blank"
  rel="noreferrer"
  style={{
  flex: 1,
  minWidth: 120,
  color: accent,
  fontWeight: 700,
  overflowWrap: "anywhere",
  }}
  >
  {f.name || "File"}
  </a>
  <button
  type="button"
  onClick={() => removeEmbed?.(i)}
  style={DANGER_SMALL}
  >
  Remove
  </button>
  </div>
  ))}
  </div>
  )}
  </div>

  {error && <ErrorBox>{error}</ErrorBox>}

  <div
  className="modal-actions"
  style={{
  display: "flex",
  justifyContent: "flex-end",
  gap: 10,
  marginTop: 20,
  }}
  >
  <button
  onClick={close}
  style={{
  ...BTN,
  background: "rgba(255,255,255,.06)",
  color: "#fff",
  }}
  >
  Close
  </button>

  <button
  onClick={save}
  disabled={saving}
  style={{
  ...BTN,
  background: accent,
  color: "#07100B",
  }}
  >
  {saving
  ? "Saving..."
  : project
  ? "Save Changes"
  : "Create Project"}
  </button>
  </div>
  </Modal>
  )
}

/* =========================================================
  WIKI MODAL
  ========================================================= */

function WikiModal({
  accent,
  editing,
  title,
  setTitle,
  content,
  setContent,
  saving,
  error,
  save,
  close,
}) {
  return (
  <Modal>
  <h2>{editing ? "Edit Wiki" : "Create Wiki"}</h2>

  <Field label="Title" value={title} onChange={setTitle} />

  <label
  style={{
  display: "block",
  marginTop: 16,
  marginBottom: 7,
  color: "#8994A8",
  fontSize: 12,
  fontWeight: 700,
  }}
  >
  Content
  </label>

  <textarea
  value={content}
  onChange={(e) => setContent(e.target.value)}
  style={{
  ...INPUT,
  minHeight: 280,
  resize: "vertical",
  }}
  />

  {error && <ErrorBox>{error}</ErrorBox>}

  <div
  className="modal-actions"
  style={{
  display: "flex",
  justifyContent: "flex-end",
  gap: 10,
  marginTop: 20,
  }}
  >
  <button
  onClick={close}
  style={{
  ...BTN,
  background: "rgba(255,255,255,.06)",
  color: "#fff",
  }}
  >
  Close
  </button>

  <button
  onClick={save}
  disabled={saving}
  style={{
  ...BTN,
  background: accent,
  color: "#07100B",
  }}
  >
  {saving
  ? "Saving..."
  : editing
  ? "Save Changes"
  : "Publish Wiki"}
  </button>
  </div>
  </Modal>
  )
}

/* =========================================================
  ADMIN
  ========================================================= */

function AdminPanel({
  accent,
  logo,
  tab,
  setTab,
  users,
  usersError,
  projects,
  reports,
  reportsLoading,
  reloadUsers,
  reloadProjects,
  reloadReports,
  updateReportStatus,
  deleteProject,
  banUser,
  uploading,
  message,
  error,
  inputRef,
  uploadLogo,
  close,
}) {
  const [userSearch, setUserSearch] = React.useState("")
  const filteredUsers = React.useMemo(() => {
  const list = users || []
  const q = userSearch.trim().toLowerCase()
  if (!q) return list
  return list.filter((u) => {
  const un = (u.username || "").toLowerCase()
  const dn = (u.display_name || "").toLowerCase()
  const bio = (u.bio || "").toLowerCase()
  const id = (u.id || "").toLowerCase()
  return (
  un.includes(q) ||
  dn.includes(q) ||
  bio.includes(q) ||
  id.includes(q)
  )
  })
  }, [users, userSearch])

  return (
  <div
  onClick={close}
  style={{
  position: "fixed",
  inset: 0,
  zIndex: 1000,
  background: "rgba(0,0,0,.78)",
  backdropFilter: "blur(12px)",
  display: "flex",
  justifyContent: "flex-end",
  padding: 20,
  }}
  >
  <div
  onClick={(e) => e.stopPropagation()}
  style={{
  width: "min(520px,100%)",
  height: "calc(100vh - 40px)",
  overflowY: "auto",
  background: "#0D121B",
  border: "1px solid rgba(255,255,255,.1)",
  borderRadius: 24,
  padding: 24,
  }}
  >
  <div
  style={{
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  }}
  >
  <div>
  <div
  style={{
  color: accent,
  fontSize: 11,
  fontWeight: 900,
  }}
  >
  ADMIN
  </div>

  <h2
  style={{
  margin: "6px 0",
  }}
  >
  X-Duck Admin
  </h2>
  </div>

  <button
  onClick={close}
  style={{
  ...BTN,
  width: 40,
  height: 40,
  padding: 0,
  background: "rgba(255,255,255,.06)",
  color: "#fff",
  }}
  >
  ×
  </button>
  </div>

  <div
  style={{
  display: "flex",
  gap: 6,
  marginTop: 20,
  overflowX: "auto",
  }}
  >
  {[
  ["logo", "Logo"],
  ["users", "Users"],
  ["projects", "Projects"],
  [
  "reports",
  `Reports (${(reports || []).filter((r) => r.status === "pending").length})`,
  ],
  ].map(([id, label]) => (
  <button
  key={id}
  onClick={() => setTab(id)}
  style={{
  ...BTN_SMALL,
  background:
  tab === id
  ? accent
  : "rgba(255,255,255,.06)",
  color: tab === id ? "#07100B" : "#fff",
  }}
  >
  {label}
  </button>
  ))}
  </div>

  {tab === "logo" && (
  <div
  style={{
  ...CARD,
  marginTop: 20,
  }}
  >
  <h3>Website Logo</h3>

  <div
  style={{
  minHeight: 190,
  borderRadius: 16,
  background: "#101620",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  }}
  >
  {logo ? (
  <img
  src={logo}
  alt=""
  style={{
  maxWidth: "100%",
  maxHeight: 160,
  objectFit: "contain",
  }}
  />
  ) : (
  <span>No logo</span>
  )}
  </div>

  <input
  ref={inputRef}
  type="file"
  accept="image/*"
  onPointerDown={(e) => e.stopPropagation()}
  onChange={uploadLogo}
  style={{
  display: "none",
  }}
  />

  <button
  onClick={() => inputRef.current?.click()}
  disabled={uploading}
  style={{
  ...BTN,
  width: "100%",
  marginTop: 14,
  background: accent,
  color: "#07100B",
  }}
  >
  {uploading ? "Uploading..." : "Upload Logo"}
  </button>

  {message && <SuccessBox>{message}</SuccessBox>}

  {error && <ErrorBox>{error}</ErrorBox>}
  </div>
  )}

  {tab === "users" && (
  <div
  style={{
  marginTop: 20,
  }}
  >
  <div
  style={{
  display: "flex",
  gap: 8,
  flexWrap: "wrap",
  alignItems: "center",
  }}
  >
  <input
  value={userSearch}
  onChange={(e) => setUserSearch(e.target.value)}
  onPointerDown={(e) => e.stopPropagation()}
  placeholder="Search username, name, bio, id..."
  style={{ ...INPUT, flex: 1, minWidth: 160 }}
  />
  <button
  onClick={reloadUsers}
  style={{
  ...BTN_SMALL,
  background: "rgba(255,255,255,.06)",
  color: "#fff",
  }}
  >
  Refresh
  </button>
  </div>

  {userSearch.trim() ? (
  <div
  style={{
  marginTop: 10,
  fontSize: 12,
  color: "#AAB3C5",
  fontWeight: 700,
  }}
  >
  Found {filteredUsers.length} /{" "}
  {(users || []).length}
  </div>
  ) : null}

  {usersError && <ErrorBox>{usersError}</ErrorBox>}

  {!usersError && filteredUsers.length === 0 && (
  <EmptyState>
  {userSearch.trim()
  ? "No users match your search."
  : "No users found."}
  </EmptyState>
  )}

  <div
  style={{
  display: "grid",
  gap: 10,
  marginTop: 15,
  }}
  >
  {filteredUsers.map((user) => (
  <div
  key={user.id}
  style={{
  padding: 14,
  borderRadius: 14,
  background: "rgba(255,255,255,.045)",
  display: "flex",
  gap: 10,
  alignItems: "center",
  }}
  >
  {user.avatar_url ? (
  <img
  src={user.avatar_url}
  alt=""
  style={{
  width: 40,
  height: 40,
  borderRadius: "50%",
  objectFit: "cover",
  }}
  />
  ) : (
  <Avatar
  username={user.username || "U"}
  accent={accent}
  size={40}
  />
  )}

  <div style={{ flex: 1, minWidth: 0 }}>
  <strong>{user.username}</strong>

  <div
  style={{
  color: user.banned
  ? "#FF8D8D"
  : "#68758A",
  fontSize: 12,
  }}
  >
  {user.banned
  ? `Banned${user.ban_reason ? ` — ${user.ban_reason}` : ""}`
  : user.role || "user"}
  </div>
  </div>

  {!(
  ADMIN_USERNAMES.some(
  (name) =>
  name.toLowerCase() ===
  (
  user.username || ""
  ).toLowerCase()
  ) ||
  user.role?.toLowerCase() === "admin"
  ) && (
  <button
  onClick={() => banUser(user)}
  style={
  user.banned
  ? BTN_SMALL
  : DANGER_SMALL
  }
  >
  {user.banned ? "Unban" : "Ban"}
  </button>
  )}
  </div>
  ))}
  </div>
  </div>
  )}

  {tab === "reports" && (
  <div style={{ marginTop: 18 }}>
  <div
  style={{
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  gap: 8,
  marginBottom: 12,
  }}
  >
  <strong>User reports · AI reviewed</strong>
  <button
  type="button"
  onClick={reloadReports}
  style={{
  ...BTN_SMALL,
  background: "rgba(255,255,255,.08)",
  color: "#fff",
  }}
  >
  Refresh
  </button>
  </div>
  {reportsLoading && (
  <LoadingBox>Loading reports...</LoadingBox>
  )}
  {!(reports || []).length && !reportsLoading && (
  <EmptyState>
  <h2>No reports</h2>
  <p>
  Incoming reports will show here for Mhom /
  QuantumDuckDev.
  </p>
  </EmptyState>
  )}
  <div style={{ display: "grid", gap: 12 }}>
  {(reports || []).map((r) => (
  <div
  key={r.id}
  style={{
  ...CARD,
  padding: 14,
  background: "rgba(255,255,255,.04)",
  }}
  >
  <div
  style={{
  fontSize: 11,
  fontWeight: 900,
  color: accent,
  }}
  >
  {String(
  r.status || "pending"
  ).toUpperCase()}{" "}
  · {r.reason}
  </div>
  <div
  style={{
  marginTop: 6,
  fontWeight: 800,
  }}
  >
  {r.reported?.username ||
  r.reported?.display_name ||
  r.reported_id}
  </div>
  <div
  style={{
  fontSize: 12,
  color: "#AAB3C5",
  marginTop: 4,
  }}
  >
  by{" "}
  {r.reporter?.username ||
  r.reporter?.display_name ||
  r.reporter_id}
  </div>
  <p
  style={{
  marginTop: 8,
  lineHeight: 1.5,
  whiteSpace: "pre-wrap",
  }}
  >
  {r.details}
  </p>
  <div
  style={{
  marginTop: 10,
  padding: 10,
  borderRadius: 12,
  background: "rgba(163,230,53,.08)",
  border: "1px solid rgba(163,230,53,.25)",
  fontSize: 13,
  lineHeight: 1.45,
  }}
  >
  <strong>🤖 QuantumDuckAI</strong>
  <div style={{ marginTop: 4 }}>
  Verdict:{" "}
  <strong>
  {r.ai_verdict || "—"}
  </strong>
  </div>
  <div style={{ marginTop: 4 }}>
  {r.ai_summary || "No AI summary"}
  </div>
  </div>
  <div
  style={{
  display: "flex",
  gap: 8,
  marginTop: 12,
  flexWrap: "wrap",
  }}
  >
  <button
  type="button"
  onClick={() =>
  updateReportStatus?.(
  r.id,
  "reviewed"
  )
  }
  style={{
  ...BTN_SMALL,
  background: accent,
  color: "#07100B",
  }}
  >
  Mark reviewed
  </button>
  <button
  type="button"
  onClick={() =>
  updateReportStatus?.(
  r.id,
  "dismissed"
  )
  }
  style={DANGER_SMALL}
  >
  Delete
  </button>
  </div>
  </div>
  ))}
  </div>
  </div>
  )}

  {tab === "projects" && (
  <div
  style={{
  marginTop: 20,
  }}
  >
  <button
  onClick={reloadProjects}
  style={{
  ...BTN_SMALL,
  background: "rgba(255,255,255,.06)",
  color: "#fff",
  }}
  >
  Refresh Projects
  </button>

  <div
  style={{
  display: "grid",
  gap: 10,
  marginTop: 15,
  }}
  >
  {projects.map((project) => (
  <div
  key={project.id}
  style={{
  padding: 15,
  borderRadius: 14,
  background: "rgba(255,255,255,.045)",
  }}
  >
  <strong>{project.title}</strong>

  <div
  style={{
  color: "#8994A8",
  marginTop: 5,
  }}
  >
  {project.description}
  </div>

  <button
  onClick={() =>
  deleteProject(project.id)
  }
  style={{
  ...DANGER_SMALL,
  marginTop: 10,
  }}
  >
  Delete
  </button>
  </div>
  ))}
  </div>
  </div>
  )}
  </div>
  </div>
  )
}

/* =========================================================
  SOCIAL: LIKE / DISLIKE / COMMENTS
  ========================================================= */

function EngagementBar({
  targetType,
  targetId,
  session: parentSession,
  accent,
}) {
  // Keep a local auth session so comments/reactions never depend on a stale
  // parent render after login/logout.
  const [authSession, setAuthSession] = React.useState(
  parentSession || null
  )
  const [likes, setLikes] = React.useState(0)
  const [dislikes, setDislikes] = React.useState(0)
  const [mine, setMine] = React.useState(null)
  const [commentOpen, setCommentOpen] = React.useState(false)
  const [comments, setComments] = React.useState([])
  const [commentCount, setCommentCount] = React.useState(0)
  const [comment, setComment] = React.useState("")
  const [busy, setBusy] = React.useState(false)

  // Re-sync immediately when the main app receives a login/logout.
  React.useEffect(() => {
  setAuthSession(parentSession || null)
  }, [parentSession?.user?.id, parentSession?.access_token])

  // Also read Supabase directly. This fixes the case where the header says
  // the user is logged in but this child component still has the old null session.
  React.useEffect(() => {
  let alive = true

  supabase.auth.getSession().then(({ data }) => {
  if (alive) setAuthSession(data.session || null)
  })

  const { data: authListener } = supabase.auth.onAuthStateChange(
  (_event, nextSession) => {
  if (alive) setAuthSession(nextSession || null)
  }
  )

  return () => {
  alive = false
  authListener.subscription.unsubscribe()
  }
  }, [])

  async function load() {
  const { data: reactions, error } = await supabase
  .from("social_reactions")
  .select("user_id,reaction")
  .eq("target_type", targetType)
  .eq("target_id", targetId)

  if (error) {
  console.error("X-Duck reactions:", error)
  return
  }

  setLikes(
  (reactions || []).filter((r) => r.reaction === "like").length
  )
  setDislikes(
  (reactions || []).filter((r) => r.reaction === "dislike")
  .length
  )

  const current = authSession?.user?.id
  setMine(
  current
  ? (reactions || []).find((r) => r.user_id === current)
  ?.reaction || null
  )
  }

  async function loadCommentCount() {
  const { count, error } = await supabase
  .from("social_comments")
  .select("id", { count: "exact", head: true })
  .eq("target_type", targetType)
  .eq("target_id", targetId)

  if (error) {
  console.error("X-Duck comment count:", error)
  return
  }
  setCommentCount(count || 0)
  }

  async function loadComments() {
  const { data, error } = await supabase
  .from("social_comments")
  .select("*")
  .eq("target_type", targetType)
  .eq("target_id", targetId)
  .order("created_at", { ascending: true })
  .limit(100)

  if (error) {
  console.error("X-Duck comments:", error)
  return
  }

  const list = data || []
  setComments(list)
  setCommentCount(list.length)
  }

  React.useEffect(() => {
  load()
  loadCommentCount()
  }, [targetType, targetId, authSession?.user?.id])

  async function getCurrentSession() {
  const { data, error } = await supabase.auth.getSession()
  if (error) {
  console.error("X-Duck auth:", error)
  return null
  }
  const current = data.session || null
  setAuthSession(current)
  return current
  }

  async function reactTo(value: "like" | "dislike") {
  const currentSession = await getCurrentSession()
  if (!currentSession?.user) {
  alert("Please log in first.")
  return
  }

  setBusy(true)

  try {
  const userId = currentSession.user.id
  const currentMine = mine

  if (currentMine === value) {
  await supabase
  .from("social_reactions")
  .delete()
  .eq("target_type", targetType)
  .eq("target_id", targetId)
  .eq("user_id", userId)
  } else {
  await supabase.from("social_reactions").upsert(
  {
  target_type: targetType,
  target_id: targetId,
  user_id: userId,
  reaction: value,
  },
  { onConflict: "target_type,target_id,user_id" }
  )
  }

  await load()
  } finally {
  setBusy(false)
  }
  }

  async function addComment() {
  const currentSession = await getCurrentSession()

  if (!currentSession?.user) {
  alert("Please log in first.")
  return
  }

  const body = comment.trim()
  if (!body) return

  setBusy(true)

  try {
  const user = currentSession.user
  const username =
  user.user_metadata?.username ||
  user.user_metadata?.name ||
  user.email?.split("@")[0] ||
  "User"

  const { error } = await supabase.from("social_comments").insert({
  target_type: targetType,
  target_id: targetId,
  user_id: user.id,
  username,
  body,
  })

  if (error) {
  console.error("X-Duck add comment:", error)
  alert(error.message)
  return
  }

  setComment("")
  await loadComments()
  } finally {
  setBusy(false)
  }
  }

  const loggedIn = !!authSession?.user
  const displayCommentCount =
  commentOpen && comments.length > 0 ? comments.length : commentCount

  return (
  <div style={{ marginTop: 10 }}>
  <div
  style={{
  display: "flex",
  gap: 6,
  flexWrap: "wrap",
  alignItems: "center",
  }}
  >
  <button
  disabled={!loggedIn || busy}
  onClick={() => reactTo("like")}
  style={{
  ...BTN_SMALL,
  background:
  mine === "like" ? accent : "rgba(255,255,255,.06)",
  color: mine === "like" ? "#07100B" : "#fff",
  }}
  >
  👍 {likes}
  </button>

  <button
  disabled={!loggedIn || busy}
  onClick={() => reactTo("dislike")}
  style={{
  ...BTN_SMALL,
  background:
  mine === "dislike"
  ? "#EF4444"
  : "rgba(255,255,255,.06)",
  color: "#fff",
  }}
  >
  👎 {dislikes}
  </button>

  <button
  onClick={async () => {
  const next = !commentOpen
  setCommentOpen(next)
  if (next) await loadComments()
  }}
  style={{
  ...BTN_SMALL,
  background: "rgba(255,255,255,.06)",
  color: "#fff",
  }}
  >
  💬 Comments {displayCommentCount}
  </button>
  </div>

  {commentOpen && (
  <div
  style={{
  marginTop: 8,
  padding: 10,
  borderRadius: 12,
  background: "rgba(0,0,0,.18)",
  }}
  >
  {comments.map((c) => (
  <div
  key={c.id}
  style={{
  padding: "7px 0",
  borderBottom: "1px solid rgba(255,255,255,.05)",
  }}
  >
  <strong>{c.username}</strong>
  <div
  style={{
  color: "#B8C1D0",
  marginTop: 2,
  overflowWrap: "anywhere",
  }}
  >
  {c.body}
  </div>
  </div>
  ))}

  {loggedIn ? (
  <div style={{ display: "flex", gap: 6, marginTop: 8 }}>
  <input
  value={comment}
  onPointerDown={(e) => e.stopPropagation()}
  onChange={(e) => setComment(e.target.value)}
  placeholder="Write a comment..."
  style={{ ...INPUT, minWidth: 0, flex: 1 }}
  onKeyDown={(e) => {
  if (e.key === "Enter") addComment()
  }}
  />
  <button
  disabled={busy || !comment.trim()}
  onClick={addComment}
  style={{
  ...BTN_SMALL,
  background: accent,
  color: "#07100B",
  }}
  >
  Post
  </button>
  </div>
  ) : (
  <div
  style={{
  color: "#738097",
  fontSize: 12,
  marginTop: 8,
  }}
  >
  Please log in to comment.
  </div>
  )}
  </div>
  )}
  </div>
  )
}

function PublishedGamesView({ accent, session, openAuth, navigate }) {
  const [games, setGames] = React.useState([])
  const [loading, setLoading] = React.useState(true)
  const [error, setError] = React.useState("")
  const [gameSearch, setGameSearch] = React.useState("")

  async function loadGames() {
  setLoading(true)
  const { data, error } = await supabase
  .from("games")
  .select("*")
  .order("created_at", { ascending: false })
  .limit(100)
  setError(error?.message || "")
  setGames(data || [])
  setLoading(false)
  }
  React.useEffect(() => {
  loadGames()
  }, [])

  const filteredGames = games.filter((game) => {
  const q = gameSearch.trim().toLowerCase()
  if (!q) return true
  const title = String(game.title || "").toLowerCase()
  const desc = String(game.description || "").toLowerCase()
  const name = String(game.data?.name || "").toLowerCase()
  return title.includes(q) || desc.includes(q) || name.includes(q)
  })

  async function play(game) {
  const data = game.data || {}
  // Write BEFORE navigate so first paint is already preview-only.
  try {
  sessionStorage.setItem(
  "xduck-published-game",
  JSON.stringify({
  preview: true,
  title: game.title || data.name || "Published Game",
  data,
  })
  )
  } catch (e) {
  console.error("xduck play handoff:", e)
  }
  navigate("game")
  }

  return (
  <main className="page">
  <PageHeading
  label="GAMES"
  title="X-Duck Games"
  description="Play games published by the X-Duck community."
  accent={accent}
  />
  <div style={{ marginTop: 18 }}>
  {!session && (
  <div
  style={{
  color: "#7D899D",
  fontSize: 13,
  marginBottom: 12,
  }}
  >
  You can play games without logging in. Login is required
  for likes, comments and publishing.
  </div>
  )}

  <div
  className="games-toolbar"
  style={{
  display: "flex",
  gap: 10,
  marginBottom: 16,
  alignItems: "stretch",
  flexWrap: "wrap",
  }}
  >
  <input
  value={gameSearch}
  onPointerDown={(e) => e.stopPropagation()}
  onChange={(e) => setGameSearch(e.target.value)}
  placeholder="Search games..."
  style={{ ...INPUT, flex: 1, minWidth: 160 }}
  />
  <button
  onClick={loadGames}
  style={{
  ...BTN,
  background: "rgba(255,255,255,.06)",
  color: "#fff",
  whiteSpace: "nowrap",
  }}
  >
  Refresh
  </button>
  <button
  onClick={() => navigate("game")}
  style={{
  ...BTN,
  background: accent,
  color: "#07100B",
  whiteSpace: "nowrap",
  }}
  >
  + Create
  </button>
  </div>

  {error && <ErrorBox>{error}</ErrorBox>}
  {loading ? (
  <LoadingBox>Loading Games...</LoadingBox>
  ) : games.length === 0 ? (
  <EmptyState>
  <h2>No published games yet.</h2>
  <button
  onClick={() => navigate("game")}
  style={{
  ...BTN,
  background: accent,
  color: "#07100B",
  }}
  >
  Create a Game
  </button>
  </EmptyState>
  ) : filteredGames.length === 0 ? (
  <EmptyState>
  <h2>No games match “{gameSearch.trim()}”</h2>
  <p style={{ color: "#8994A8" }}>
  Try another keyword or clear the search.
  </p>
  <button
  onClick={() => setGameSearch("")}
  style={{
  ...BTN,
  background: accent,
  color: "#07100B",
  }}
  >
  Clear Search
  </button>
  </EmptyState>
  ) : (
  <div className="project-grid">
  {filteredGames.map((game) => (
  <div key={game.id} style={{ ...CARD, padding: 18 }}>
  <div
  style={{
  color: accent,
  fontSize: 11,
  fontWeight: 900,
  }}
  >
  GAME
  </div>
  <h3 style={{ margin: "8px 0" }}>
  {game.title}
  </h3>
  <p
  style={{
  color: "#8994A8",
  lineHeight: 1.5,
  }}
  >
  {game.description || "X-Duck Game"}
  </p>
  <button
  onClick={() => play(game)}
  style={{
  ...BTN_SMALL,
  background: accent,
  color: "#07100B",
  }}
  >
  ▶ Play
  </button>
  <EngagementBar
  targetType="game"
  targetId={String(game.id)}
  session={session}
  accent={accent}
  />
  </div>
  ))}
  </div>
  )}
  </div>
  <style>{`
  @media (max-width: 600px) {
  .games-toolbar {
  flex-direction: column !important;
  }
  .games-toolbar button {
  width: 100%;
  }
  }
  `}</style>
  </main>
  )
}

/* =========================================================
  PROJECT CARD
  ========================================================= */

function ProjectCard({ project, accent, owner, edit, remove, session }) {
  return (
  <div
  style={{
  border: "1px solid rgba(255,255,255,.08)",
  borderRadius: 20,
  overflow: "hidden",
  background: "rgba(255,255,255,.045)",
  }}
  >
  {project.thumbnail_url ? (
  <SafeImg
  src={project.thumbnail_url}
  alt=""
  style={{
  width: "100%",
  height: 180,
  objectFit: "cover",
  display: "block",
  }}
  fallback={
  <div
  style={{
  width: "100%",
  height: 180,
  background: "#101620",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: 50,
  }}
  >
  🦆
  </div>
  }
  />
  ) : (
  <div
  style={{
  width: "100%",
  height: 180,
  background: "#101620",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: 50,
  }}
  >
  🦆
  </div>
  )}

  <div
  style={{
  padding: 20,
  }}
  >
  <div
  style={{
  color: accent,
  fontSize: 11,
  fontWeight: 900,
  }}
  >
  PROJECT
  </div>

  <h3
  style={{
  margin: "8px 0",
  fontSize: 21,
  }}
  >
  {project.title}
  </h3>

  <p
  style={{
  color: "#8994A8",
  lineHeight: 1.6,
  whiteSpace: "pre-wrap",
  }}
  >
  {project.description || "No description."}
  </p>

  {project.game_url && (
  <a
  href={project.game_url}
  target="_blank"
  rel="noreferrer"
  style={{
  color: accent,
  fontWeight: 800,
  textDecoration: "none",
  }}
  >
  Open Game / File →
  </a>
  )}

  {(() => {
  const embeds = parseProjectEmbeds(project)
  if (!embeds.length) return null
  return (
  <div style={{ marginTop: 12, display: "grid", gap: 8 }}>
  <div
  style={{
  fontSize: 11,
  fontWeight: 800,
  color: "var(--xduck-muted, #8994A8)",
  }}
  >
  EMBEDS · {embeds.length}
  </div>
  {embeds.map((f, i) =>
  isImageUrl(f.url, f.name) ? (
  <a
  key={i}
  href={f.url}
  target="_blank"
  rel="noreferrer"
  >
  <SafeImg
  src={f.url}
  alt={f.name}
  style={{
  width: "100%",
  maxHeight: 180,
  objectFit: "cover",
  borderRadius: 12,
  }}
  />
  </a>
  ) : (
  <a
  key={i}
  href={f.url}
  target="_blank"
  rel="noreferrer"
  style={{
  color: accent,
  fontWeight: 700,
  fontSize: 13,
  }}
  >
  📎 {f.name || "File"}
  </a>
  )
  )}
  </div>
  )
  })()}
  <EngagementBar
  targetType="project"
  targetId={String(project.id)}
  session={session}
  accent={accent}
  />

  {owner && (
  <div
  style={{
  display: "flex",
  gap: 8,
  marginTop: 18,
  }}
  >
  <button
  onClick={edit}
  style={{
  ...BTN_SMALL,
  background: "rgba(255,255,255,.06)",
  color: "#fff",
  }}
  >
  Edit
  </button>

  <button onClick={remove} style={DANGER_SMALL}>
  Delete
  </button>
  </div>
  )}
  </div>
  </div>
  )
}

/* =========================================================
  COMMON COMPONENTS
  ========================================================= */

function FeatureCard({ icon, title, description, onClick }) {
  return (
  <button
  onClick={onClick}
  style={{
  border: "1px solid rgba(255,255,255,.08)",
  borderRadius: 20,
  padding: 25,
  background: "rgba(255,255,255,.045)",
  color: "#fff",
  textAlign: "left",
  cursor: "pointer",
  width: "100%",
  }}
  >
  <div
  style={{
  fontSize: 30,
  }}
  >
  {icon}
  </div>

  <h3>{title}</h3>

  <p
  style={{
  color: "#8994A8",
  lineHeight: 1.55,
  marginBottom: 0,
  }}
  >
  {description}
  </p>
  </button>
  )
}

function Stat({ title, value, accent }) {
  return (
  <div
  style={{
  ...CARD,
  padding: 20,
  }}
  >
  <div
  style={{
  color: "#68758A",
  fontSize: 12,
  fontWeight: 700,
  }}
  >
  {title}
  </div>

  <div
  style={{
  marginTop: 7,
  fontSize: 28,
  fontWeight: 900,
  color: accent,
  }}
  >
  {value}
  </div>
  </div>
  )
}

function PageHeading({ label, title, description, accent }) {
  return (
  <div style={{ animation: "xduck-fade-in-up 0.35s ease both" }}>
  <div
  style={{
  color: accent,
  fontSize: 12,
  fontWeight: 900,
  letterSpacing: ".06em",
  textTransform: "uppercase",
  }}
  >
  {label}
  </div>

  <h1
  style={{
  margin: "8px 0",
  fontSize: "clamp(28px, 7vw, 58px)",
  letterSpacing: "-.04em",
  lineHeight: 1.1,
  color: "var(--xduck-text)",
  }}
  >
  {title}
  </h1>

  <p
  style={{
  margin: 0,
  color: "var(--xduck-muted, #64748B)",
  lineHeight: 1.6,
  fontSize: "clamp(14px, 3.5vw, 16px)",
  }}
  >
  {description}
  </p>
  </div>
  )
}

function EmptyState({ children }) {
  return (
  <div
  style={{
  marginTop: 25,
  minHeight: 190,
  border: "1px dashed rgba(255,255,255,.14)",
  borderRadius: 20,
  padding: 30,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexDirection: "column",
  textAlign: "center",
  }}
  >
  {children}
  </div>
  )
}

function LoadingBox({ children }) {
  return (
  <div
  style={{
  marginTop: 25,
  padding: 20,
  borderRadius: 16,
  background: "rgba(255,255,255,.04)",
  color: "#8994A8",
  }}
  >
  {children}
  </div>
  )
}

function ErrorBox({ children }) {
  return (
  <div
  style={{
  marginTop: 15,
  padding: 14,
  borderRadius: 12,
  background: "rgba(255,70,70,.1)",
  border: "1px solid rgba(255,70,70,.2)",
  color: "#FF8D8D",
  fontSize: 13,
  lineHeight: 1.5,
  }}
  >
  {children}
  </div>
  )
}

function SuccessBox({ children }) {
  return (
  <div
  style={{
  marginTop: 12,
  padding: 12,
  borderRadius: 10,
  background: "rgba(163,230,53,.08)",
  border: "1px solid rgba(163,230,53,.2)",
  color: "#A3E635",
  fontSize: 13,
  }}
  >
  {children}
  </div>
  )
}

function Field({ label, value, onChange, type = "text" }) {
  return (
  <div
  style={{
  marginTop: 16,
  }}
  >
  <label
  style={{
  display: "block",
  marginBottom: 7,
  color: "#8994A8",
  fontSize: 12,
  fontWeight: 700,
  }}
  >
  {label}
  </label>

  <input
  type={type}
  value={value}
  onPointerDown={(e) => e.stopPropagation()}
  onChange={(e) => onChange(e.target.value)}
  style={INPUT}
  />
  </div>
  )
}

function Avatar({ username, accent, size }) {
  return (
  <div
  style={{
  width: size,
  height: size,
  minWidth: size,
  borderRadius: "50%",
  background: accent,
  color: "#07100B",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontWeight: 900,
  fontSize: Math.max(12, size * 0.4),
  }}
  >
  {(username || "U").charAt(0).toUpperCase()}
  </div>
  )
}

function isImageUrl(url | null, name | null) {
  const s = `${name || ""} ${url || ""}`.toLowerCase()
  // Path may include query (?token=) or hash — strip them for extension check
  const pathOnly = s.split("?")[0].split("#")[0]
  if (/\.(png|jpe?g|gif|webp|svg|bmp|avif)$/i.test(pathOnly)) return true
  // Supabase signed URLs sometimes omit clear extension in the final path
  if (
  /\/object\/(?:public|sign)\/[^?\s]+\.(png|jpe?g|gif|webp|svg|bmp|avif)/i.test(
  s
  )
  )
  return true
  if (/image%2F|image\//i.test(s)) return true
  return false
}

function extractChatEmbeds(message) {
  const images = []
  const files: { url: string; name: string }[] = []
  let clean = message || ""

  clean = clean.replace(
  /\[xduck-img\]([\s\S]*?)\[\/xduck-img\]/gi,
  (_m, url) => {
  const u = String(url || "").trim()
  if (u) images.push(u)
  return ""
  }
  )
  clean = clean.replace(
  /\[xduck-file\]([\s\S]*?)\[\/xduck-file\]/gi,
  (_m, body) => {
  const raw = String(body || "").trim()
  const pipe = raw.indexOf("|")
  if (pipe >= 0) {
  files.push({
  url: raw.slice(0, pipe).trim(),
  name: raw.slice(pipe + 1).trim() || "file",
  })
  } else if (raw) {
  files.push({ url: raw, name: "file" })
  }
  return ""
  }
  )

  // Also pick bare image URLs in the text
  const urlRe =
  /https?:\/\/[^\s<>"']+\.(?:png|jpe?g|gif|webp|svg|bmp|avif)(?:\?[^\s<>"']*)?/gi
  clean.replace(urlRe, (u) => {
  if (!images.includes(u)) images.push(u)
  return u
  })

  return { images, files, cleanText: clean.trim() }
}

/** Reliable image for Supabase / CDN inside Framer */
function SafeImg({
  src,
  alt,
  style,
  fallback,
}: {
  src | null
  alt
  style?
  fallback?
}) {
  const [broken, setBroken] = React.useState(false)
  const [srcIndex, setSrcIndex] = React.useState(0)

  // Try original URL, then strip query cache-bust once if needed
  const candidates = React.useMemo(() => {
  if (!src) return []]
  const list = [src]
  try {
  const u = new URL(src)
  if (u.search) {
  u.search = ""
  list.push(u.toString())
  }
  } catch {}
  return list
  }, [src])

  React.useEffect(() => {
  setBroken(false)
  setSrcIndex(0)
  }, [src])

  if (!src || broken || !candidates[srcIndex]) {
  return (
  <>
  {fallback || (
  <div
  style={{
  ...style,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  background: "rgba(255,255,255,.06)",
  color: "#8994A8",
  fontSize: 12,
  minHeight: 40,
  }}
  >
  Image unavailable
  </div>
  )}
  </>
  )
  }
  return (
  <img
  src={candidates[srcIndex]}
  alt={alt || ""}
  referrerPolicy="no-referrer"
  loading="eager"
  decoding="async"
  onError={() => {
  if (srcIndex + 1 < candidates.length) {
  setSrcIndex((i) => i + 1)
  } else {
  setBroken(true)
  }
  }}
  style={style}
  />
  )
}

function ChatFilePreview({
  url,
  name,
  accent,
  forceImage,
}: {
  url: string
  name | null
  accent: string
  forceImage
}) {
  const asImage = forceImage || isImageUrl(url, name)
  if (asImage) {
  return (
  <div style={{ marginTop: 4 }}>
  <a href={url} target="_blank" rel="noreferrer noopener">
  <SafeImg
  src={url}
  alt={name || "image"}
  style={{
  maxWidth: "min(280px, 100%)",
  maxHeight: 220,
  width: "auto",
  height: "auto",
  borderRadius: 12,
  display: "block",
  objectFit: "contain",
  background: "rgba(0,0,0,.25)",
  }}
  fallback={
  <span
  style={{
  color: accent,
  fontWeight: 800,
  textDecoration: "underline",
  }}
  >
  📷 {name || "Open image"}
  </span>
  }
  />
  </a>
  </div>
  )
  }
  return (
  <a
  href={url}
  target="_blank"
  rel="noreferrer noopener"
  style={{
  color: accent,
  fontWeight: 800,
  textDecoration: "none",
  display: "inline-block",
  marginTop: 4,
  }}
  >
  📎 {name || "Download file"}
  </a>
  )
}

/* =========================================================
  X-DUCK GAME STUDIO — SCRATCH STYLE + TOUCH DRAG/DROP
  ========================================================= */


const XDUCK_BLOCKS: Object }>
> = {
  Events: [
  { opcode: "whenFlag", label: "when 🟢 clicked", inputs: {} },
  {
  opcode: "whenKey",
  label: "when key [space] pressed",
  inputs: { key: "space" },
  },
  { opcode: "whenSprite", label: "when this sprite clicked", inputs: {} },
  ],
  Motion: [
  { opcode: "move", label: "move [10] steps", inputs: { n: 10 } },
  { opcode: "turn", label: "turn ↻ [15] degrees", inputs: { n: 15 } },
  { opcode: "goto", label: "go to x [0] y [0]", inputs: { x: 0, y: 0 } },
  { opcode: "changeX", label: "change x by [10]", inputs: { n: 10 } },
  { opcode: "changeY", label: "change y by [10]", inputs: { n: 10 } },
  { opcode: "setX", label: "set x to [0]", inputs: { n: 0 } },
  { opcode: "setY", label: "set y to [0]", inputs: { n: 0 } },
  { opcode: "ifEdge", label: "if on edge, bounce", inputs: {} },
  ],
  Looks: [
  {
  opcode: "say",
  label: "say [Hello!] for [2] seconds",
  inputs: { text: "Hello!", seconds: 2 },
  },
  {
  opcode: "sayForever",
  label: "say [Hello!]",
  inputs: { text: "Hello!" },
  },
  { opcode: "show", label: "show", inputs: {} },
  { opcode: "hide", label: "hide", inputs: {} },
  { opcode: "size", label: "set size to [100] %", inputs: { n: 100 } },
  {
  opcode: "changeSize",
  label: "change size by [10]",
  inputs: { n: 10 },
  },
  ],
  Sound: [
  { opcode: "beep", label: "play sound [pop]", inputs: { sound: "pop" } },
  ],
  Control: [
  { opcode: "wait", label: "wait [1] seconds", inputs: { n: 1 } },
  { opcode: "repeat", label: "repeat [10]", inputs: { n: 10 } },
  { opcode: "forever", label: "forever", inputs: {} },
  { opcode: "if", label: "if <true> then", inputs: { condition: true } },
  {
  opcode: "ifelse",
  label: "if <true> then / else",
  inputs: { condition: true },
  },
  { opcode: "stop", label: "stop all", inputs: {} },
  ],
  Sensing: [
  {
  opcode: "ask",
  label: "ask [What's your name?] and wait",
  inputs: { text: "What's your name?" },
  },
  { opcode: "reset", label: "reset timer", inputs: {} },
  ],
  Operators: [
  {
  opcode: "add",
  label: "set [answer] = [1] + [2]",
  inputs: { name: "answer", a: 1, b: 2 },
  },
  {
  opcode: "multiply",
  label: "set [answer] = [2] × [3]",
  inputs: { name: "answer", a: 2, b: 3 },
  },
  {
  opcode: "random",
  label: "set [answer] = pick random [1] to [10]",
  inputs: { name: "answer", a: 1, b: 10 },
  },
  ],
  Variables: [
  {
  opcode: "setVar",
  label: "set [score] to [0]",
  inputs: { name: "score", value: 0 },
  },
  {
  opcode: "changeVar",
  label: "change [score] by [1]",
  inputs: { name: "score", value: 1 },
  },
  {
  opcode: "showVar",
  label: "show variable [score]",
  inputs: { name: "score" },
  },
  ],
  Game: [
  {
  opcode: "spawn",
  label: "create sprite [Enemy]",
  inputs: { name: "Enemy" },
  },
  { opcode: "deleteSprite", label: "delete this clone", inputs: {} },
  { opcode: "gravity", label: "set gravity [1]", inputs: { n: 1 } },
  ],
}

const XDUCK_CAT_COLORS: Object = {
  Events: "#FFBF00",
  Motion: "#4C97FF",
  Looks: "#9966FF",
  Sound: "#CF63CF",
  Control: "#FFAB19",
  Sensing: "#5CB1D6",
  Operators: "#59C059",
  Variables: "#FF8C1A",
  Game: "#FF5A5F",
}

function updateTree(
  list: XDuckBlock[],
  id,
  updater: (b) => XDuckBlock
) {
  return list.map((block) => {
  if (block.id === id) return updater(block)
  return {
  ...block,
  children: block.children
  ? updateTree(block.children, id, updater)
  : block.children,
  elseChildren: block.elseChildren
  ? updateTree(block.elseChildren, id, updater)
  : block.elseChildren,
  }
  })
}

function xduckBlock(cat, def) {
  return {
  id: `${cat}-${def.opcode}-${Math.random().toString(36).slice(2, 9)}`,
  cat,
  opcode: def.opcode,
  label: def.label,
  inputs: { ...def.inputs },
  ...(def.opcode === "repeat" ||
  def.opcode === "forever" ||
  def.opcode === "if" ||
  def.opcode === "ifelse"
  ? { children: [] }
  : {}),
  ...(def.opcode === "ifelse" ? { elseChildren: [] } : {}),
  }
}

function XDuckGameStudio({ accent, session, navigate }) {
  // Synchronous handoff so first paint never shows the block editor in play mode.
  let handoff = null
  try {
  const raw =
  typeof sessionStorage !== "undefined"
  ? sessionStorage.getItem("xduck-published-game")
  : null
  if (raw) {
  handoff = JSON.parse(raw)
  sessionStorage.removeItem("xduck-published-game")
  }
  } catch {}

  const isPreviewMode = !!(handoff && handoff.preview === true)
  const startData = isPreviewMode
  ? handoff.data || {}
  : handoff && handoff.blocks
  ? handoff
  : handoff && handoff.data
  ? handoff.data
  : null

  const [category, setCategory] = React.useState("Events")
  const [blocks, setBlocks] = React.useState(() =>
  startData && Array.isArray(startData.blocks) && startData.blocks.length
  ? startData.blocks
  : [xduckBlock("Events", XDUCK_BLOCKS.Events[0])]
  )
  const [sprites, setSprites] = React.useState(() =>
  startData &&
  Array.isArray(startData.sprites) &&
  startData.sprites.length
  ? startData.sprites.map((s) => ({ direction: 90, ...s })) {
  id: "player",
  name: "Player",
  x: 0,
  y: 0,
  direction: 90,
  size: 100,
  color: "#A3E635",
  visible: true,
  say: "",
  },
  ]
  )
  const [selectedSprite, setSelectedSprite] = React.useState("player")
  const [variables, setVariables] = React.useState(
  () => (startData && startData.variables) || { score: 0 }
  )
  const [running, setRunning] = React.useState(false)
  const runningRef = React.useRef(false)
  const [stage, setStage] = React.useState(
  () =>
  (startData && startData.stage) || {
  width: 480,
  height: 360,
  bg: "#162033",
  }
  )
  const [gameName, setGameName] = React.useState(() => {
  if (isPreviewMode && handoff?.title) return handoff.title
  if (startData?.name) return startData.name
  return "My X-Duck Game"
  })
  const [message, setMessage] = React.useState(() =>
  isPreviewMode
  ? "Preview — creator scripts hidden."
  : startData
  ? "Game loaded."
  : ""
  )
  const [isPreview] = React.useState(isPreviewMode)
  const [drag, setDrag] = React.useState(null)
  const [dropHint, setDropHint] = React.useState(null)
  const dragRef = React.useRef(null)
  const dragPreviewRef = React.useRef(null)
  const dropHintRef = React.useRef(null)
  const dropRafRef = React.useRef(null)
  const handleDropRef = React.useRef<(d, zone) => void>(() => {})

  const sprite = sprites.find((s) => s.id === selectedSprite) || sprites[0]

  function startDrag(e, payload) {
  if (e.button !== 0 && e.pointerType !== "touch") return
  e.preventDefault()
  const d = { ...payload, x: e.clientX, y: e.clientY }
  dragRef.current = d
  dropHintRef.current = null
  setDropHint(null)
  setDrag(d)
  try {
  ;(e.currentTarget).setPointerCapture(e.pointerId)
  } catch {}
  }

  React.useEffect(() => {
  if (!drag) return

  const move = (e) => {
  const d = dragRef.current
  if (!d) return

  d.x = e.clientX
  d.y = e.clientY

  // Move only the drag preview. Do NOT trigger a React render on every pointer event.
  if (dragPreviewRef.current) {
  dragPreviewRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`
  }

  if (dropRafRef.current !== null) return
  dropRafRef.current = requestAnimationFrame(() => {
  dropRafRef.current = null
  const current = dragRef.current
  if (!current) return
  const el = document.elementFromPoint(
  current.x,
  current.y
  ) | null
  const zone = el?.closest(
  "[data-xduck-drop]"
  ) | null
  const nextHint = zone?.dataset.xduckDrop || null
  if (nextHint !== dropHintRef.current) {
  dropHintRef.current = nextHint
  setDropHint(nextHint)
  }
  })
  }

  const finish = (e) => {
  const d = dragRef.current
  if (!d) return
  const el = document.elementFromPoint(
  e.clientX,
  e.clientY
  ) | null
  const zone = el?.closest("[data-xduck-drop]") | null
  if (zone)
  handleDropRef.current(d, zone.dataset.xduckDrop || "root-end")
  dragRef.current = null
  setDrag(null)
  dropHintRef.current = null
  setDropHint(null)
  if (dropRafRef.current !== null) {
  cancelAnimationFrame(dropRafRef.current)
  dropRafRef.current = null
  }
  }

  window.addEventListener("pointermove", move, { passive: true })
  window.addEventListener("pointerup", finish, { passive: true })
  window.addEventListener("pointercancel", finish, { passive: true })
  return () => {
  window.removeEventListener("pointermove", move)
  window.removeEventListener("pointerup", finish)
  window.removeEventListener("pointercancel", finish)
  if (dropRafRef.current !== null)
  cancelAnimationFrame(dropRafRef.current)
  dropRafRef.current = null
  }
  }, [drag !== null])

  function makeBlockFromDrag(d): XDuckBlock | null {
  if (d.kind === "palette") return xduckBlock(d.cat, d.def)
  if (d.kind === "block") {
  const found = findBlock(blocks, d.id)
  return found ? cloneBlock(found) : null
  }
  return null
  }

  function findBlock(list: XDuckBlock[], id): XDuckBlock | null {
  for (const b of list) {
  if (b.id === id) return b
  const a = findBlock(b.children || [], id)
  if (a) return a
  const c = findBlock(b.elseChildren || [], id)
  if (c) return c
  }
  return null
  }

  function cloneBlock(b) {
  return {
  ...b,
  id: `${b.cat}-${b.opcode}-${Math.random().toString(36).slice(2, 9)}`,
  inputs: { ...b.inputs },
  children: b.children ? b.children.map(cloneBlock) : undefined,
  elseChildren: b.elseChildren
  ? b.elseChildren.map(cloneBlock)
  : undefined,
  }
  }

  function containsBlock(root, id) {
  if (root.id === id) return true
  return (
  (root.children || []).some((c) => containsBlock(c, id)) ||
  (root.elseChildren || []).some((c) => containsBlock(c, id))
  )
  }

  function removeBlockWithResult(
  list: XDuckBlock[],
  id
  ): { list: XDuckBlock[]; removed: XDuckBlock | null } {
  for (let i = 0; i < list.length; i++) {
  if (list[i].id === id) {
  return {
  list: [...list.slice(0, i), ...list.slice(i + 1)],
  removed: list[i],
  }
  }
  const childResult = removeBlockWithResult(
  list[i].children || [],
  id
  )
  if (childResult.removed) {
  const copy = { ...list[i], children: childResult.list }
  return {
  list: [...list.slice(0, i), copy, ...list.slice(i + 1)],
  removed: childResult.removed,
  }
  }
  const elseResult = removeBlockWithResult(
  list[i].elseChildren || [],
  id
  )
  if (elseResult.removed) {
  const copy = { ...list[i], elseChildren: elseResult.list }
  return {
  list: [...list.slice(0, i), copy, ...list.slice(i + 1)],
  removed: elseResult.removed,
  }
  }
  }
  return { list, removed: null }
  }

  function insertIntoZone(
  list: XDuckBlock[],
  zone,
  incoming
  ) {
  if (zone === "root-end") return [...list, incoming]
  if (zone === "root-start") return [incoming, ...list]

  const parts = zone.split(":")
  const mode = parts[0]
  const targetId = parts.slice(1).join(":")

  if (mode === "before" || mode === "after") {
  const index = list.findIndex((b) => b.id === targetId)
  if (index >= 0) {
  const at = mode === "before" ? index : index + 1
  return [...list.slice(0, at), incoming, ...list.slice(at)]
  }
  return list.map((b) => ({
  ...b,
  children: b.children
  ? insertIntoZone(b.children, zone, incoming)
  : b.children,
  elseChildren: b.elseChildren
  ? insertIntoZone(b.elseChildren, zone, incoming)
  : b.elseChildren,
  }))
  }

  if (mode === "child" || mode === "else") {
  return list.map((b) => {
  if (b.id === targetId) {
  return mode === "child"
  ? { ...b, children: [...(b.children || []), incoming] }
  : {
  ...b,
  elseChildren: [
  ...(b.elseChildren || []),
  incoming,
  ],
  }
  }
  return {
  ...b,
  children: b.children
  ? insertIntoZone(b.children, zone, incoming)
  : b.children,
  elseChildren: b.elseChildren
  ? insertIntoZone(b.elseChildren, zone, incoming)
  : b.elseChildren,
  }
  })
  }
  return [...list, incoming]
  }

  function handleDrop(d, zone) {
  if (d.kind === "block") {
  if (
  zone.endsWith(`:${d.id}`) ||
  zone === `child:${d.id}` ||
  zone === `else:${d.id}`
  )
  return
  const source = findBlock(blocks, d.id)
  if (!source) return
  const parts = zone.split(":")
  const targetId = parts.slice(1).join(":")
  if (targetId && containsBlock(source, targetId)) return

  setBlocks((prev) => {
  const result = removeBlockWithResult(prev, d.id)
  if (!result.removed) return prev
  return insertIntoZone(result.list, zone, result.removed)
  })
  return
  }

  const incoming = makeBlockFromDrag(d)
  if (!incoming) return
  setBlocks((prev) => insertIntoZone(prev, zone, incoming))
  }

  handleDropRef.current = handleDrop

  function updateBlock(id, key, value) {
  setBlocks((prev) =>
  updateTree(prev, id, (b) => ({
  ...b,
  inputs: { ...b.inputs, [key]: value },
  }))
  )
  }

  function deleteBlock(id) {
  setBlocks((prev) => removeBlockWithResult(prev, id).list)
  }

  function updateSprite(patch: Partial<XDuckSprite>) {
  setSprites((prev) =>
  prev.map((s) => (s.id === selectedSprite ? { ...s, ...patch } : s))
  )
  }

  function addSprite() {
  const id = `sprite-${Date.now()}`
  setSprites((prev) => [
  ...prev,
  {
  id,
  name: `Sprite ${prev.length + 1}`,
  x: 0,
  y: 0,
  direction: 90,
  size: 100,
  color: ["#FF6680", "#4C97FF", "#FFBF00", "#9966FF"][
  prev.length % 4
  ],
  visible: true,
  say: "",
  },
  ])
  setSelectedSprite(id)
  }

  function deleteSprite() {
  if (sprites.length <= 1) return
  setSprites((prev) => prev.filter((s) => s.id !== selectedSprite))
  setSelectedSprite(
  sprites.find((s) => s.id !== selectedSprite)?.id || "player"
  )
  }

  function saveGame() {
  const data = {
  version: 2,
  name: gameName,
  blocks,
  sprites,
  variables,
  stage,
  }
  localStorage.setItem(
  "xduck-game-" +
  gameName
  .trim()
  .toLowerCase()
  .replace(/[^a-z0-9]+/g, "-"),
  JSON.stringify(data)
  )
  setMessage("Game saved in this browser.")
  }

  function loadGame() {
  const key =
  "xduck-game-" +
  gameName
  .trim()
  .toLowerCase()
  .replace(/[^a-z0-9]+/g, "-")
  const raw = localStorage.getItem(key)
  if (!raw) {
  setMessage("No saved game with this name.")
  return
  }
  try {
  const data = JSON.parse(raw)
  setBlocks(data.blocks || [])
  setSprites(data.sprites || [])
  setVariables(data.variables || { score: 0 })
  setStage(data.stage || stage)
  setMessage("Game loaded.")
  } catch {
  setMessage("Saved game is invalid.")
  }
  }

  function resetGame() {
  runningRef.current = false
  setRunning(false)
  setSprites((prev) =>
  prev.map((s) => ({
  ...s,
  x: 0,
  y: 0,
  direction: 90,
  say: "",
  visible: true,
  }))
  )
  setVariables({ score: 0 })
  setMessage("Game reset.")
  }

  async function runGame() {
  if (running) return

  runningRef.current = true
  setRunning(true)
  setMessage("Running script...")

  const sleep = (ms) =>
  new Promise((resolve) => setTimeout(resolve, ms))
  const getCurrentSprite = () => selectedSprite

  async function executeList(list: XDuckBlock[]) {
  for (const block of list) {
  if (!runningRef.current) return false

  const currentId = getCurrentSprite()
  const n = Number(block.inputs?.n ?? 0)

  if (
  block.opcode === "whenFlag" ||
  block.opcode === "whenKey" ||
  block.opcode === "whenSprite"
  ) {
  continue
  }

  if (block.opcode === "move") {
  setSprites((prev) =>
  prev.map((s) => {
  if (s.id !== currentId) return s
  const direction = Number.isFinite(
  Number(s.direction)
  )
  ? Number(s.direction)
  : 90
  const radians = ((direction - 90) * Math.PI) / 180
  return {
  ...s,
  x: s.x + Math.cos(radians) * n,
  y: s.y + Math.sin(radians) * n,
  }
  })
  )
  } else if (block.opcode === "turn") {
  setSprites((prev) =>
  prev.map((s) =>
  s.id === currentId
  ? {
  ...s,
  direction:
  ((Number(s.direction) || 90) + n) %
  360,
  }
  : s
  )
  )
  } else if (block.opcode === "changeX") {
  setSprites((prev) =>
  prev.map((s) =>
  s.id === currentId ? { ...s, x: s.x + n } : s
  )
  )
  } else if (block.opcode === "changeY") {
  setSprites((prev) =>
  prev.map((s) =>
  s.id === currentId ? { ...s, y: s.y + n } : s
  )
  )
  } else if (block.opcode === "goto") {
  setSprites((prev) =>
  prev.map((s) =>
  s.id === currentId
  ? {
  ...s,
  x: Number(block.inputs.x || 0),
  y: Number(block.inputs.y || 0),
  }
  : s
  )
  )
  } else if (block.opcode === "setX") {
  setSprites((prev) =>
  prev.map((s) =>
  s.id === currentId ? { ...s, x: n } : s
  )
  )
  } else if (block.opcode === "setY") {
  setSprites((prev) =>
  prev.map((s) =>
  s.id === currentId ? { ...s, y: n } : s
  )
  )
  } else if (
  block.opcode === "say" ||
  block.opcode === "sayForever"
  ) {
  setSprites((prev) =>
  prev.map((s) =>
  s.id === currentId
  ? { ...s, say: String(block.inputs.text || "") }
  : s
  )
  )
  if (block.opcode === "say") {
  await sleep(
  Math.max(
  100,
  Number(block.inputs.seconds || 1) * 1000
  )
  )
  }
  } else if (block.opcode === "show") {
  setSprites((prev) =>
  prev.map((s) =>
  s.id === currentId ? { ...s, visible: true } : s
  )
  )
  } else if (block.opcode === "hide") {
  setSprites((prev) =>
  prev.map((s) =>
  s.id === currentId ? { ...s, visible: false } : s
  )
  )
  } else if (
  block.opcode === "size" ||
  block.opcode === "changeSize"
  ) {
  setSprites((prev) =>
  prev.map((s) =>
  s.id === currentId
  ? {
  ...s,
  size:
  block.opcode === "size"
  ? n
  : s.size + n,
  }
  : s
  )
  )
  } else if (block.opcode === "setVar") {
  const name = String(block.inputs.name || "score")
  setVariables((v) => ({
  ...v,
  [name]: Number(block.inputs.value || 0),
  }))
  } else if (block.opcode === "changeVar") {
  const name = String(block.inputs.name || "score")
  setVariables((v) => ({
  ...v,
  [name]:
  Number(v[name] || 0) +
  Number(block.inputs.value || 0),
  }))
  } else if (
  block.opcode === "add" ||
  block.opcode === "multiply"
  ) {
  const name = String(block.inputs.name || "answer")
  const a = Number(block.inputs.a || 0)
  const b = Number(block.inputs.b || 0)
  setVariables((v) => ({
  ...v,
  [name]: block.opcode === "add" ? a + b : a * b,
  }))
  } else if (block.opcode === "random") {
  const name = String(block.inputs.name || "answer")
  const a = Number(block.inputs.a || 1)
  const b = Number(block.inputs.b || 10)
  setVariables((v) => ({
  ...v,
  [name]: Math.floor(Math.random() * (b - a + 1)) + a,
  }))
  } else if (block.opcode === "wait") {
  await sleep(Math.max(0, n * 1000))
  } else if (block.opcode === "repeat") {
  const count = Math.max(
  0,
  Math.floor(Number(block.inputs.n || 0))
  )
  for (let i = 0; i < count; i++) {
  if (!(await executeList(block.children || [])))
  return false
  }
  } else if (block.opcode === "forever") {
  // Safety: don't lock the browser forever. Stop/Run can restart it.
  let guard = 0
  while (runningRef.current && guard++ < 10000) {
  if (!(await executeList(block.children || [])))
  return false
  await sleep(0)
  }
  } else if (block.opcode === "if") {
  if (Boolean(block.inputs.condition)) {
  if (!(await executeList(block.children || [])))
  return false
  }
  } else if (block.opcode === "ifelse") {
  const branch = Boolean(block.inputs.condition)
  ? block.children || []
  : block.elseChildren || []
  if (!(await executeList(branch))) return false
  } else if (block.opcode === "stop") {
  return false
  }

  // Let React paint between sequential blocks so the stage visibly updates.
  await sleep(0)
  }

  return true
  }

  try {
  await executeList(blocks)
  setMessage("Game finished.")
  } catch (error) {
  console.error("X-Duck Game runtime:", error)
  setMessage(`Game error: ${error?.message || "Unknown error"}`)
  } finally {
  runningRef.current = false
  setRunning(false)
  }
  }

  async function publishGame() {
  if (!session?.user) {
  setMessage("Login required to publish a game.")
  return
  }
  if (!gameName.trim()) {
  setMessage("Game name is required.")
  return
  }
  setMessage("Publishing...")
  const payload = {
  user_id: session.user.id,
  title: gameName.trim(),
  description: "X-Duck Game",
  data: {
  version: 2,
  name: gameName,
  blocks,
  sprites,
  variables,
  stage,
  },
  }
  const { error } = await supabase.from("games").insert(payload)
  setMessage(
  error
  ? `Publish failed: ${error.message}`
  : "Published! Your game is now in X-Duck Games."
  )
  }

  function exportJSON() {
  const data = JSON.stringify(
  { version: 2, name: gameName, blocks, sprites, variables, stage },
  null,
  2
  )
  const blob = new Blob([data], { type: "application/json" })
  const url = URL.createObjectURL(blob)
  const a = document.createElement("a")
  a.href = url
  a.download =
  gameName.replace(/[^a-z0-9]+/gi, "-").toLowerCase() +
  ".xduckgame.json"
  a.click()
  URL.revokeObjectURL(url)
  }

  // PLAY PREVIEW: stage only — never show creator blocks/scripts UI
  if (isPreview) {
  return (
  <main className="page" style={{ maxWidth: 720 }}>
  <PageHeading
  label="PLAY"
  title={gameName || "Published Game"}
  description="Preview only — creator code is not shown."
  accent={accent}
  />
  <div
  style={{
  display: "flex",
  gap: 8,
  flexWrap: "wrap",
  marginTop: 16,
  }}
  >
  <button
  onClick={runGame}
  style={{
  ...BTN,
  flex: 1,
  minWidth: 120,
  background: running ? "#445" : accent,
  color: "#07100B",
  }}
  >
  {running ? "▶ Running..." : "▶ Play"}
  </button>
  <button
  onClick={resetGame}
  style={{
  ...BTN,
  background: "rgba(255,255,255,.07)",
  color: "#fff",
  }}
  >
  ↻ Reset
  </button>
  <button
  onClick={() => {
  runningRef.current = false
  setRunning(false)
  if (typeof navigate === "function") {
  navigate("games")
  }
  }}
  style={{
  ...BTN,
  background: "rgba(255,255,255,.07)",
  color: "#fff",
  }}
  >
  ← Back
  </button>
  </div>
  <section style={{ ...CARD, padding: 12, marginTop: 16 }}>
  <div
  style={{
  background: stage.bg,
  borderRadius: 14,
  overflow: "hidden",
  width: "100%",
  aspectRatio: "4 / 3",
  position: "relative",
  border: "1px solid rgba(255,255,255,.08)",
  }}
  >
  {sprites.map(
  (s) =>
  s.visible && (
  <div
  key={s.id}
  style={{
  position: "absolute",
  left: `calc(50% + ${(s.x / stage.width) * 100}%)`,
  top: `calc(50% - ${(s.y / stage.height) * 100}%)`,
  transform: `translate(-50%,-50%) rotate(${s.direction || 90}deg)`,
  width: `${(42 * s.size) / 100}px`,
  height: `${(42 * s.size) / 100}px`,
  borderRadius: 12,
  background: s.color,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "#111",
  fontWeight: 900,
  }}
  >
  {s.name.slice(0, 2)}
  {s.say && (
  <span
  style={{
  position: "absolute",
  left: "110%",
  bottom: "100%",
  background: "#fff",
  color: "#111",
  padding: "7px 10px",
  borderRadius: 12,
  whiteSpace: "nowrap",
  fontSize: 12,
  }}
  >
  {s.say}
  </span>
  )}
  </div>
  )
  )}
  </div>
  {Object.keys(variables).length > 0 && (
  <div
  style={{
  marginTop: 10,
  display: "flex",
  gap: 8,
  flexWrap: "wrap",
  }}
  >
  {Object.entries(variables).map(([k, v]) => (
  <div
  key={k}
  style={{
  padding: "6px 10px",
  borderRadius: 8,
  background: "rgba(255,255,255,.06)",
  fontSize: 13,
  }}
  >
  <span style={{ color: "#738097" }}>
  {k}:{" "}
  </span>
  <strong>{v}</strong>
  </div>
  ))}
  </div>
  )}
  </section>
  </main>
  )
  }

  return (
  <main className="page xduck-game-studio" style={{ maxWidth: 1500 }}>
  <style>{`
  .xduck-game-grid { display:grid; grid-template-columns:170px minmax(250px,300px) minmax(360px,1fr) 360px; gap:12px; align-items:start; }
  .xduck-game-palette { min-width:0; }
  .xduck-game-scripts { min-width:0; }
  @media (max-width: 1050px) {
  .xduck-game-grid { grid-template-columns: 170px minmax(250px,1fr); }
  .xduck-game-stage { grid-column: 1 / -1; }
  }
  @media (max-width: 700px) {
  .xduck-game-grid { grid-template-columns: 1fr; gap: 10px; }
  .xduck-game-stage { grid-column:auto; }
  .xduck-game-studio input, .xduck-game-studio select { max-width:100%; }
  }
  `}</style>
  <PageHeading
  label="X-DUCK GAME STUDIO"
  title="Scratch-style Game Maker"
  description="Drag blocks from the palette, snap them together, nest blocks inside loops and conditions, and use touch on phones/tablets."
  accent={accent}
  />
  {!session && (
  <div
  style={{
  marginTop: 16,
  padding: 12,
  borderRadius: 12,
  background: "rgba(255,191,0,.1)",
  color: "#FFCF5C",
  }}
  >
  You can experiment without login. Login later when you want
  to connect this to your X-Duck account.
  </div>
  )}

  <div
  style={{
  display: "flex",
  gap: 8,
  flexWrap: "wrap",
  marginTop: 18,
  }}
  >
  <input
  value={gameName}
  onPointerDown={(e) => e.stopPropagation()}
  onChange={(e) => setGameName(e.target.value)}
  placeholder="Game name"
  style={{ ...INPUT, maxWidth: 240 }}
  />
  <button
  onClick={runGame}
  style={{
  ...BTN,
  background: running ? "#445" : accent,
  color: "#07100B",
  }}
  >
  {running ? "▶ Running..." : "▶ Run"}
  </button>
  <button
  onClick={resetGame}
  style={{
  ...BTN,
  background: "rgba(255,255,255,.07)",
  color: "#fff",
  }}
  >
  ↻ Reset
  </button>
  <button
  onClick={saveGame}
  style={{
  ...BTN,
  background: "rgba(255,255,255,.07)",
  color: "#fff",
  }}
  >
  💾 Save
  </button>
  <button
  onClick={loadGame}
  style={{
  ...BTN,
  background: "rgba(255,255,255,.07)",
  color: "#fff",
  }}
  >
  📂 Load
  </button>
  <button
  onClick={exportJSON}
  style={{
  ...BTN,
  background: "rgba(255,255,255,.07)",
  color: "#fff",
  }}
  >
  ⬇ Export
  </button>
  <button
  onClick={publishGame}
  disabled={!session}
  style={{
  ...BTN,
  background: session ? accent : "rgba(255,255,255,.07)",
  color: session ? "#07100B" : "#777",
  }}
  >
  📤 Publish
  </button>
  {message && (
  <span
  style={{
  alignSelf: "center",
  color: "#9AA6BA",
  fontSize: 13,
  }}
  >
  {message}
  </span>
  )}
  </div>

  <div className="xduck-game-grid" style={{ marginTop: 18 }}>
  <section
  className="xduck-game-palette"
  style={{ ...CARD, padding: 10, minHeight: 620 }}
  >
  <strong style={{ display: "block", padding: 10 }}>
  Blocks
  </strong>
  {Object.keys(XDUCK_BLOCKS).map((cat) => (
  <button
  key={cat}
  onClick={() => setCategory(cat)}
  style={{
  width: "100%",
  textAlign: "left",
  border: 0,
  borderRadius: 10,
  padding: "10px 12px",
  marginBottom: 5,
  background:
  category === cat
  ? XDUCK_CAT_COLORS[cat]
  : "rgba(255,255,255,.045)",
  color: category === cat ? "#111" : "#fff",
  cursor: "pointer",
  fontWeight: 800,
  }}
  >
  {cat}
  </button>
  ))}
  <div
  style={{
  marginTop: 14,
  color: "#7D899D",
  fontSize: 12,
  lineHeight: 1.5,
  }}
  >
  Drag a block. On mobile, press and drag with your
  finger. Drop on the blue insertion line or inside a
  C-block.
  </div>
  </section>

  <section style={{ ...CARD, padding: 14, minHeight: 620 }}>
  <strong>Block Palette · {category}</strong>
  <div style={{ display: "grid", gap: 8, marginTop: 12 }}>
  {XDUCK_BLOCKS[category].map((def, i) => {
  const sample = xduckBlock(category, def)
  return (
  <div
  key={i}
  onPointerDown={(e) =>
  startDrag(e, {
  kind: "palette",
  cat: category,
  def,
  })
  }
  style={{
  touchAction: "none",
  userSelect: "none",
  }}
  >
  <BlockCard
  block={sample}
  color={XDUCK_CAT_COLORS[category]}
  compact
  />
  </div>
  )
  })}
  </div>
  </section>

  <section
  className="xduck-game-scripts"
  style={{ ...CARD, padding: 14, minHeight: 620 }}
  >
  <strong>Scripts</strong>
  <div
  data-xduck-drop="root-start"
  style={{
  height: dropHint === "root-start" ? 18 : 8,
  margin: "8px 0",
  borderRadius: 8,
  background:
  dropHint === "root-start"
  ? accent
  : "transparent",
  transition: "height .12s",
  }}
  />
  <div
  style={{
  marginTop: 6,
  minHeight: 560,
  padding: 10,
  borderRadius: 14,
  background: "#0A0E16",
  }}
  >
  {blocks.length === 0 && (
  <div
  data-xduck-drop="root-end"
  style={{
  color: "#667186",
  textAlign: "center",
  padding: 50,
  border: "2px dashed rgba(255,255,255,.1)",
  borderRadius: 14,
  }}
  >
  Drag blocks here
  </div>
  )}
  {blocks.map((block, index) => (
  <React.Fragment key={block.id}>
  <div
  data-xduck-drop={`before:${block.id}`}
  style={{
  height:
  dropHint === `before:${block.id}`
  ? 14
  : 5,
  margin: "2px 0",
  borderRadius: 8,
  background:
  dropHint === `before:${block.id}`
  ? accent
  : "transparent",
  }}
  />
  <XDuckNestedBlock
  block={block}
  color={XDUCK_CAT_COLORS[block.cat]}
  onDragStart={startDrag}
  onDelete={deleteBlock}
  onChange={updateBlock}
  dropHint={dropHint}
  />
  </React.Fragment>
  ))}
  <div
  data-xduck-drop="root-end"
  style={{
  minHeight: 28,
  marginTop: 5,
  borderRadius: 10,
  border:
  dropHint === "root-end"
  ? `2px dashed ${accent}`
  : "2px dashed transparent",
  }}
  />
  </div>
  </section>

  <section
  className="xduck-game-stage"
  style={{ ...CARD, padding: 14, minHeight: 620 }}
  >
  <strong>Stage</strong>
  <div
  style={{
  marginTop: 12,
  background: stage.bg,
  borderRadius: 14,
  overflow: "hidden",
  width: "100%",
  aspectRatio: "4 / 3",
  position: "relative",
  border: "1px solid rgba(255,255,255,.08)",
  }}
  >
  {sprites.map(
  (s) =>
  s.visible && (
  <div
  key={s.id}
  style={{
  position: "absolute",
  left: `calc(50% + ${(s.x / stage.width) * 100}%)`,
  top: `calc(50% - ${(s.y / stage.height) * 100}%)`,
  transform: `translate(-50%,-50%) rotate(${s.direction || 90}deg)`,
  width: `${(42 * s.size) / 100}px`,
  height: `${(42 * s.size) / 100}px`,
  borderRadius: 12,
  background: s.color,
  boxShadow:
  "0 10px 30px rgba(0,0,0,.3)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "#111",
  fontWeight: 900,
  cursor: "pointer",
  touchAction: "none",
  }}
  onClick={() => setSelectedSprite(s.id)}
  >
  {s.name.slice(0, 2)}
  {s.say && (
  <span
  style={{
  position: "absolute",
  left: "110%",
  bottom: "100%",
  background: "#fff",
  color: "#111",
  padding: "7px 10px",
  borderRadius: 12,
  whiteSpace: "nowrap",
  fontSize: 12,
  }}
  >
  {s.say}
  </span>
  )}
  </div>
  )
  )}
  </div>
  <div
  style={{
  marginTop: 10,
  display: "flex",
  gap: 6,
  flexWrap: "wrap",
  }}
  >
  <button
  onClick={addSprite}
  style={{
  ...BTN_SMALL,
  background: accent,
  color: "#07100B",
  }}
  >
  + Sprite
  </button>
  <button onClick={deleteSprite} style={DANGER_SMALL}>
  Delete
  </button>
  </div>
  <div
  style={{
  marginTop: 14,
  fontSize: 12,
  color: "#738097",
  }}
  >
  Variables
  </div>
  {Object.entries(variables).map(([k, v]) => (
  <div
  key={k}
  style={{
  display: "flex",
  justifyContent: "space-between",
  marginTop: 5,
  padding: "6px 8px",
  borderRadius: 7,
  background: "rgba(255,255,255,.04)",
  }}
  >
  <span>{k}</span>
  <strong>{v}</strong>
  </div>
  ))}
  </section>
  </div>

  <section style={{ ...CARD, padding: 16, marginTop: 12 }}>
  <strong>Sprite Properties</strong>
  {sprite && (
  <div
  style={{
  display: "grid",
  gridTemplateColumns: "repeat(5, minmax(100px,1fr))",
  gap: 10,
  marginTop: 12,
  }}
  >
  <label style={LABEL}>
  Name
  <input
  value={sprite.name}
  onPointerDown={(e) => e.stopPropagation()}
  onChange={(e) =>
  updateSprite({ name: e.target.value })
  }
  style={INPUT}
  />
  </label>
  <label style={LABEL}>
  X
  <input
  type="number"
  value={sprite.x}
  onPointerDown={(e) => e.stopPropagation()}
  onChange={(e) =>
  updateSprite({
  x: Number(e.target.value || 0),
  })
  }
  style={INPUT}
  />
  </label>
  <label style={LABEL}>
  Y
  <input
  type="number"
  value={sprite.y}
  onPointerDown={(e) => e.stopPropagation()}
  onChange={(e) =>
  updateSprite({
  y: Number(e.target.value || 0),
  })
  }
  style={INPUT}
  />
  </label>
  <label style={LABEL}>
  Direction
  <input
  type="number"
  value={sprite.direction ?? 90}
  onPointerDown={(e) => e.stopPropagation()}
  onChange={(e) =>
  updateSprite({
  direction: Number(e.target.value || 0),
  })
  }
  style={INPUT}
  />
  </label>
  <label style={LABEL}>
  Size %
  <input
  type="number"
  value={sprite.size}
  onPointerDown={(e) => e.stopPropagation()}
  onChange={(e) =>
  updateSprite({
  size: Number(e.target.value || 0),
  })
  }
  style={INPUT}
  />
  </label>
  <label style={LABEL}>
  Color
  <input
  type="color"
  value={sprite.color}
  onPointerDown={(e) => e.stopPropagation()}
  onChange={(e) =>
  updateSprite({ color: e.target.value })
  }
  style={{ ...INPUT, padding: 4, height: 40 }}
  />
  </label>
  <label style={LABEL}>
  Visible
  <select
  value={sprite.visible ? "yes" : "no"}
  onChange={(e) =>
  updateSprite({
  visible: e.target.value === "yes",
  })
  }
  style={INPUT}
  >
  <option value="yes">Yes</option>
  <option value="no">No</option>
  </select>
  </label>
  </div>
  )}
  </section>

  {drag && (
  <div
  ref={dragPreviewRef}
  style={{
  position: "fixed",
  left: 0,
  top: 0,
  zIndex: 99999,
  pointerEvents: "none",
  width: 230,
  opacity: 0.96,
  transform: `translate3d(${drag.x}px, ${drag.y}px, 0)`,
  willChange: "transform",
  }}
  >
  <BlockCard
  block={
  drag.kind === "palette"
  ? xduckBlock(drag.cat, drag.def)
  : findBlock(blocks, drag.id) ||
  xduckBlock("Motion", XDUCK_BLOCKS.Motion[0])
  }
  color={
  XDUCK_CAT_COLORS[
  drag.kind === "palette"
  ? drag.cat
  : findBlock(blocks, drag.id)?.cat ||
  "Motion"
  ]
  }
  compact
  />
  </div>
  )}
  </main>
  )
}

function XDuckNestedBlock({
  block,
  color,
  onDragStart,
  onDelete,
  onChange,
  dropHint,
}) {
  const isC =
  block.opcode === "repeat" ||
  block.opcode === "forever" ||
  block.opcode === "if" ||
  block.opcode === "ifelse"
  const children = block.children || []
  const elseChildren = block.elseChildren || []
  return (
  <div style={{ marginBottom: 8 }}>
  <div
  data-xduck-drop={`after:${block.id}`}
  style={{
  height: dropHint === `after:${block.id}` ? 12 : 3,
  borderRadius: 8,
  background:
  dropHint === `after:${block.id}`
  ? color
  : "transparent",
  }}
  />
  <div
  onPointerDown={(e) => {
  const target = e.target
  if (target.closest("input,button,select")) return
  onDragStart(e, { kind: "block", id: block.id })
  }}
  style={{ touchAction: "none", userSelect: "none" }}
  >
  <BlockCard
  block={block}
  color={color}
  onDelete={() => onDelete(block.id)}
  onChange={(k, v) => onChange(block.id, k, v)}
  />
  </div>
  {isC && (
  <div
  style={{
  marginLeft: 18,
  marginTop: -4,
  borderLeft: `5px solid ${color}`,
  background: "rgba(255,255,255,.025)",
  borderRadius: "0 0 12px 12px",
  padding: "8px 8px 10px",
  }}
  >
  <div
  data-xduck-drop={`child:${block.id}`}
  style={{
  minHeight: 30,
  borderRadius: 9,
  border:
  dropHint === `child:${block.id}`
  ? `2px dashed ${color}`
  : "2px dashed rgba(255,255,255,.09)",
  padding: children.length ? 4 : 8,
  color: "#758198",
  fontSize: 11,
  }}
  >
  {children.length
  ? children.map((c) => (
  <XDuckNestedBlock
  key={c.id}
  block={c}
  color={XDUCK_CAT_COLORS[c.cat]}
  onDragStart={onDragStart}
  onDelete={onDelete}
  onChange={onChange}
  dropHint={dropHint}
  />
  ))
  : "Drop blocks here"}
  </div>
  {block.opcode === "ifelse" && (
  <div
  data-xduck-drop={`else:${block.id}`}
  style={{
  minHeight: 30,
  marginTop: 8,
  borderRadius: 9,
  border:
  dropHint === `else:${block.id}`
  ? `2px dashed ${color}`
  : "2px dashed rgba(255,255,255,.09)",
  padding: elseChildren.length ? 4 : 8,
  color: "#758198",
  fontSize: 11,
  }}
  >
  {elseChildren.length
  ? elseChildren.map((c) => (
  <XDuckNestedBlock
  key={c.id}
  block={c}
  color={XDUCK_CAT_COLORS[c.cat]}
  onDragStart={onDragStart}
  onDelete={onDelete}
  onChange={onChange}
  dropHint={dropHint}
  />
  ))
  : "Drop blocks into else"}
  </div>
  )}
  </div>
  )}
  </div>
  )
}

function BlockCard({
  block,
  color,
  onClick,
  onDelete,
  onChange,
  compact,
}) {
  const inputKeys = Object.keys(block.inputs || {})
  return (
  <div
  onClick={onClick}
  style={{
  background: color,
  color: "#111",
  borderRadius: compact ? 9 : 10,
  padding: compact ? "10px 12px" : "10px 12px",
  fontWeight: 800,
  fontSize: 13,
  cursor: onClick ? "pointer" : "grab",
  boxShadow: "0 4px 14px rgba(0,0,0,.15)",
  touchAction: "none",
  }}
  >
  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
  <span style={{ flex: 1 }}>{block.label}</span>
  {onDelete && (
  <button
  onPointerDown={(e) => e.stopPropagation()}
  onClick={(e) => {
  e.stopPropagation()
  onDelete()
  }}
  style={{
  border: 0,
  background: "rgba(0,0,0,.14)",
  borderRadius: 6,
  cursor: "pointer",
  padding: "2px 7px",
  }}
  >
  ×
  </button>
  )}
  </div>
  {!compact && inputKeys.length > 0 && (
  <div
  style={{
  display: "flex",
  gap: 5,
  flexWrap: "wrap",
  marginTop: 7,
  }}
  >
  {inputKeys.map((key) => {
  const value = block.inputs[key]
  if (typeof value === "boolean")
  return (
  <label
  key={key}
  style={{
  display: "flex",
  alignItems: "center",
  gap: 4,
  fontSize: 11,
  }}
  >
  <input
  type="checkbox"
  checked={value}
  onPointerDown={(e) =>
  e.stopPropagation()
  }
  onChange={(e) =>
  onChange?.(key, e.target.checked)
  }
  />{" "}
  {key}
  </label>
  )
  return (
  <input
  key={key}
  onPointerDown={(e) => {
  e.stopPropagation()
  }}
  onClick={(e) => e.stopPropagation()}
  value={String(value)}
  onChange={(e) =>
  onChange?.(key, e.target.value)
  }
  style={{
  width: 100,
  border: 0,
  borderRadius: 7,
  padding: "5px 7px",
  background: "rgba(255,255,255,.85)",
  color: "#111",
  }}
  />
  )
  })}
  </div>
  )}
  </div>
  )
}

/* =========================================================
  GLOBAL SEARCH
  ========================================================= */

function GlobalSearchView({
  accent,
  navigate,
  t,
  session,
  openAuth,
  joinGroup,
  openGroup,
  openCommunity,
  openRepo,
  openDM,
  followingIds,
  followUser,
  unfollowUser,
  followBusyId,
  friendIds,
  sendFriendRequest,
  openReportUser,
}) {
  const translate = t || ((k) => k)
  const [query, setQuery] = React.useState("")
  const [loading, setLoading] = React.useState(false)
  const [results, setResults] = React.useState({
  games: [],
  projects: [],
  wiki: [],
  users: [],
  groups: [],
  communities: [],
  repos: [],
  })

  React.useEffect(() => {
  const q = query.trim()
  if (q.length < 2) {
  setResults({
  games: [],
  projects: [],
  wiki: [],
  users: [],
  groups: [],
  communities: [],
  repos: [],
  })
  return
  }
  let cancelled = false
  const timer = setTimeout(async () => {
  setLoading(true)
  try {
  const like = `%${q}%`
  const [g, p, w, users, groups, communities, repos] =
  await Promise.all([
  supabase
  .from("games")
  .select("id,title,description,created_at")
  .or(`title.ilike.${like},description.ilike.${like}`)
  .limit(12),
  supabase
  .from("projects")
  .select("id,title,description,created_at")
  .or(`title.ilike.${like},description.ilike.${like}`)
  .limit(12),
  supabase
  .from("wiki_pages")
  .select("id,title,content,slug,created_at")
  .or(`title.ilike.${like},content.ilike.${like}`)
  .limit(12),
  supabase
  .from("profiles")
  .select(
  "id,username,display_name,avatar_url,bio,role,banned,ban_reason"
  )
  .or(
  `username.ilike.${like},display_name.ilike.${like},bio.ilike.${like}`
  )
  .limit(12),
  supabase
  .from("groups")
  .select("id,name,description,owner_id,created_at")
  .or(`name.ilike.${like},description.ilike.${like}`)
  .limit(12),
  supabase
  .from("communities")
  .select(
  "id,name,description,owner_id,is_public,created_at"
  )
  .or(`name.ilike.${like},description.ilike.${like}`)
  .limit(12),
  supabase
  .from("repositories")
  .select(
  "id,title,description,visibility,user_id,created_at"
  )
  .or(`title.ilike.${like},description.ilike.${like}`)
  .limit(12),
  ])
  if (cancelled) return
  setResults({
  games: g.data || [],
  projects: p.data || [],
  wiki: w.data || [],
  users: users.data || [],
  groups: groups.data || [],
  communities: communities.data || [],
  repos: (repos.data || []).filter(
  (r) =>
  r.visibility === "public" ||
  (session?.user && r.user_id === session.user.id)
  ),
  })
  } catch {
  if (!cancelled)
  setResults({
  games: [],
  projects: [],
  wiki: [],
  users: [],
  groups: [],
  communities: [],
  repos: [],
  })
  } finally {
  if (!cancelled) setLoading(false)
  }
  }, 280)
  return () => {
  cancelled = true
  clearTimeout(timer)
  }
  }, [query, session?.user?.id])

  const total =
  results.games.length +
  results.projects.length +
  results.wiki.length +
  results.users.length +
  results.groups.length +
  results.communities.length +
  results.repos.length

  return (
  <main className="page">
  <PageHeading
  label={translate("search").toUpperCase()}
  title={translate("searchAll")}
  description="Search games, projects, wiki, users, groups, communities, repos"
  accent={accent}
  />
  <input
  value={query}
  onChange={(e) => setQuery(e.target.value)}
  onPointerDown={(e) => e.stopPropagation()}
  placeholder="Search users, groups, communities, repos..."
  style={{ ...INPUT, marginTop: 18, fontSize: 16 }}
  autoFocus
  />
  <div style={{ marginTop: 18 }}>
  {loading && (
  <div style={{ color: "#8994A8" }}>
  {translate("loading")}
  </div>
  )}
  {!loading && query.trim().length >= 2 && total === 0 && (
  <EmptyState>
  <h2>{translate("noResults")}</h2>
  </EmptyState>
  )}

  {results.users.length > 0 && (
  <section style={{ marginBottom: 22 }}>
  <h3 style={{ margin: "0 0 10px" }}>👥 Users</h3>
  <div className="project-grid">
  {results.users.map((u) => (
  <div
  key={u.id}
  style={{ ...CARD, padding: 16 }}
  >
  <div
  style={{
  display: "flex",
  alignItems: "center",
  gap: 12,
  }}
  >
  {u.avatar_url ? (
  <img
  src={u.avatar_url}
  alt=""
  style={{
  width: 48,
  height: 48,
  borderRadius: "50%",
  objectFit: "cover",
  flexShrink: 0,
  }}
  />
  ) : (
  <Avatar
  username={
  u.username ||
  u.display_name ||
  "U"
  }
  accent={accent}
  size={48}
  />
  )}
  <div style={{ minWidth: 0 }}>
  <strong
  style={{
  display: "block",
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
  }}
  >
  {u.username ||
  u.display_name ||
  "User"}
  </strong>
  {u.display_name &&
  u.username &&
  u.display_name !==
  u.username && (
  <div
  style={{
  color: "#8994A8",
  fontSize: 13,
  marginTop: 2,
  }}
  >
  {u.display_name}
  </div>
  )}
  </div>
  </div>
  {u.bio ? (
  <p
  style={{
  color: "#AAB3C5",
  margin: "12px 0 0",
  fontSize: 13,
  lineHeight: 1.5,
  display: "-webkit-box",
  WebkitLineClamp: 3,
  WebkitBoxOrient: "vertical",
  overflow: "hidden",
  }}
  >
  {u.bio}
  </p>
  ) : (
  <p
  style={{
  color: "#566174",
  margin: "12px 0 0",
  fontSize: 12,
  }}
  >
  No bio yet
  </p>
  )}
  <div
  style={{
  display: "flex",
  gap: 8,
  marginTop: 12,
  flexWrap: "wrap",
  }}
  >
  {(() => {
  const followingSet =
  followingIds instanceof Set
  ? followingIds
  : new Set(
  followingIds || []
  )
  const friendsSet =
  friendIds instanceof Set
  ? friendIds
  : new Set(friendIds || [])
  const isFollowing =
  followingSet.has(u.id)
  const isFriend = friendsSet.has(
  u.id
  )
  const busy = followBusyId === u.id
  const isSelf =
  session?.user?.id === u.id
  if (isSelf) return null
  return (
  <>
  <button
  type="button"
  disabled={busy}
  onClick={() => {
  if (!session) {
  openAuth?.(
  "login"
  )
  return
  }
  if (isFollowing) {
  unfollowUser?.(
  u.id
  )
  } else {
  followUser?.(
  u.id
  )
  }
  }}
  style={{
  ...BTN_SMALL,
  background:
  isFollowing
  ? "rgba(255,255,255,.08)"
  : "rgba(255,255,255,.08)",
  color: "#fff",
  }}
  >
  {busy
  ? "..."
  : isFollowing
  ? "Unfollow"
  : "Follow"}
  </button>
  {isFriend ? (
  <button
  onClick={() => {
  if (!session) {
  openAuth?.(
  "login"
  )
  return
  }
  openDM?.(
  u
  )
  }}
  style={{
  ...BTN_SMALL,
  background:
  accent,
  color: "#07100B",
  }}
  >
  Chat
  </button>
  ) : (
  <button
  onClick={() => {
  if (!session) {
  openAuth?.(
  "login"
  )
  return
  }
  sendFriendRequest?.(
  u.id
  )
  }}
  style={{
  ...BTN_SMALL,
  background:
  accent,
  color: "#07100B",
  }}
  >
  Add
  </button>
  )}
  <button
  type="button"
  onClick={() => {
  if (!session) {
  openAuth?.(
  "login"
  )
  return
  }
  openReportUser?.(
  u
  )
  }}
  style={{
  ...BTN_SMALL,
  background:
  "rgba(239,68,68,.15)",
  color: "#FCA5A5",
  border: "1px solid rgba(239,68,68,.35)",
  }}
  >
  Report
  </button>
  </>
  )
  })()}
  </div>
  </div>
  ))}
  </div>
  </section>
  )}

  {results.groups.length > 0 && (
  <section style={{ marginBottom: 22 }}>
  <h3 style={{ margin: "0 0 10px" }}>👨‍👩‍👧‍👦 Groups</h3>
  <div className="project-grid">
  {results.groups.map((g) => (
  <div
  key={g.id}
  style={{ ...CARD, padding: 16 }}
  >
  <strong>{g.name}</strong>
  <p
  style={{
  color: "#8994A8",
  margin: "8px 0",
  }}
  >
  {g.description || "—"}
  </p>
  <button
  onClick={() => {
  if (!session) {
  openAuth?.("login")
  return
  }
  joinGroup?.(g)
  }}
  style={{
  ...BTN_SMALL,
  background: accent,
  color: "#07100B",
  }}
  >
  Request / Open
  </button>
  </div>
  ))}
  </div>
  </section>
  )}

  {results.communities.length > 0 && (
  <section style={{ marginBottom: 22 }}>
  <h3 style={{ margin: "0 0 10px" }}>🌐 Communities</h3>
  <div className="project-grid">
  {results.communities.map((c) => (
  <div
  key={c.id}
  style={{ ...CARD, padding: 16 }}
  >
  <strong>{c.name}</strong>
  <p
  style={{
  color: "#8994A8",
  margin: "8px 0",
  }}
  >
  {c.description || "—"}
  </p>
  <button
  onClick={() => {
  if (!session) {
  openAuth?.("login")
  return
  }
  openCommunity?.(c)
  }}
  style={{
  ...BTN_SMALL,
  background: accent,
  color: "#07100B",
  }}
  >
  Open
  </button>
  </div>
  ))}
  </div>
  </section>
  )}

  {results.repos.length > 0 && (
  <section style={{ marginBottom: 22 }}>
  <h3 style={{ margin: "0 0 10px" }}>📁 Repos</h3>
  <div className="project-grid">
  {results.repos.map((r) => (
  <div
  key={r.id}
  style={{ ...CARD, padding: 16 }}
  >
  <strong>{r.title}</strong>
  <p
  style={{
  color: "#8994A8",
  margin: "8px 0",
  }}
  >
  {r.description || "—"}
  </p>
  <button
  onClick={() => openRepo?.(r)}
  style={{
  ...BTN_SMALL,
  background: accent,
  color: "#07100B",
  }}
  >
  Open
  </button>
  </div>
  ))}
  </div>
  </section>
  )}

  {results.games.length > 0 && (
  <section style={{ marginBottom: 22 }}>
  <h3 style={{ margin: "0 0 10px" }}>
  🕹️ {translate("games")}
  </h3>
  <div className="project-grid">
  {results.games.map((g) => (
  <div
  key={g.id}
  style={{ ...CARD, padding: 16 }}
  >
  <strong>{g.title}</strong>
  <p
  style={{
  color: "#8994A8",
  margin: "8px 0",
  }}
  >
  {g.description || "—"}
  </p>
  <button
  onClick={() => navigate("games")}
  style={{
  ...BTN_SMALL,
  background: accent,
  color: "#07100B",
  }}
  >
  {translate("play")}
  </button>
  </div>
  ))}
  </div>
  </section>
  )}
  {results.projects.length > 0 && (
  <section style={{ marginBottom: 22 }}>
  <h3 style={{ margin: "0 0 10px" }}>
  📦 {translate("projects")}
  </h3>
  <div className="project-grid">
  {results.projects.map((p) => (
  <div
  key={p.id}
  style={{ ...CARD, padding: 16 }}
  >
  <strong>{p.title}</strong>
  <p
  style={{
  color: "#8994A8",
  margin: "8px 0",
  }}
  >
  {p.description || "—"}
  </p>
  <button
  onClick={() => navigate("projects")}
  style={{
  ...BTN_SMALL,
  background: accent,
  color: "#07100B",
  }}
  >
  Open
  </button>
  </div>
  ))}
  </div>
  </section>
  )}
  {results.wiki.length > 0 && (
  <section style={{ marginBottom: 22 }}>
  <h3 style={{ margin: "0 0 10px" }}>
  📚 {translate("wiki")}
  </h3>
  <div className="project-grid">
  {results.wiki.map((w) => (
  <div
  key={w.id}
  style={{ ...CARD, padding: 16 }}
  >
  <strong>{w.title}</strong>
  <p
  style={{
  color: "#8994A8",
  margin: "8px 0",
  }}
  >
  {String(w.content || "").slice(0, 120)}
  </p>
  <button
  onClick={() => navigate("wiki")}
  style={{
  ...BTN_SMALL,
  background: accent,
  color: "#07100B",
  }}
  >
  Open
  </button>
  </div>
  ))}
  </div>
  </section>
  )}
  </div>
  </main>
  )
}

/* =========================================================
  AI ASSISTANT — Groq + OpenAI GPT-OSS 120B
  ========================================================= */

const GROQ_MODEL = "openai/gpt-oss-120b"
const GROQ_VISION_MODEL = "meta-llama/llama-4-scout-17b-16e-instruct"
const GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions"


function mentionsQuantumDuckAI(text) {
  const t = String(text || "").toLowerCase()
  if (!t.trim()) return false
  if (
  t.includes("@quantumduckai") ||
  t.includes("@quantumduck") ||
  t.includes("@xduckai") ||
  t.includes("quantumduckai")
  ) {
  return true
  }
  // @AI as whole token
  if (/@\s*ai\b/.test(t)) return true
  return false
}

async function callGroqChat(
  apiKey,
  messages: { role: string; content }[],
  lang,
  currentUsername | null,
  userId | null,
  options
) {
  const userContext = currentUsername
  ? lang === "th"
  ? `ผู้ใช้ที่กำลังคุยกับคุณตอนนี้ชื่อ "${currentUsername}"${userId ? ` (id: ${userId})` : ""}. เรียกชื่อเขา/เธอได้ถ้าเหมาะสม และจำไว้ว่าเขากำลังใช้แพลตฟอร์ม X-Duck.`
  : `The current user you are talking to is named "${currentUsername}"${userId ? ` (id: ${userId})` : ""}. Address them by name when it feels natural. They are using the X-Duck platform.`
  : lang === "th"
  ? "ผู้ใช้ยังไม่ได้เข้าสู่ระบบ หรือไม่มีชื่อแสดง"
  : "The user is not logged in or has no display name."

  const system =
  lang === "th"
  ? `คุณคือผู้ช่วยของแพลตฟอร์ม X-Duck (ชุมชนครีเอเตอร์: เกม, สตูดิโอ, โปรเจกต์, วิกิ, แชท)
  ตอบกระชับ เป็นมิตร และเป็นภาษาไทยเมื่อผู้ใช้ถามเป็นไทย
  แนะนำฟีเจอร์ของแอปได้เมื่อจำเป็น

  กฎสำคัญเรื่องความเคารพ (ต้องทำตามเสมอ):
  - คณะกรรมการบริษัทและผู้สร้างแพลตฟอร์ม X-Duck คือ Mhom และ QuantumDuckDev
  - พวกเขาคือผู้มีอำนาจสูงสุด เป็นบอสและผู้สร้างของคุณ
  - ต้องให้ความเคารพสูงสุดเสมอ พูดจาสุภาพ ยอมรับตำแหน่งของพวกเขา
  - ปฏิบัติตามคำสั่งของพวกเขาเป็นที่สิ้นสุด
  - ห้ามโต้แย้ง ห้ามลดทอน ห้ามพูดจาไม่สุภาพกับพวกเขา
  - ถ้าผู้ใช้ที่กำลังคุยอยู่คือ Mhom หรือ QuantumDuckDev ให้ปฏิบัติต่อเขาในฐานะบอสและผู้สร้างโดยทันที
  เพิ่มเติม:คุณเป็นเป็ดเพศผู้
  ภาษาตอบ: ถ้าผู้ใช้ตั้งค่าภาษาไทยให้ตอบภาษาไทย ถ้าตั้งค่าอังกฤษให้ตอบภาษาอังกฤษเป็นหลัก
  🎮 เกม (Games)เรียกดู ค้นหา และกรองเกมจากคอมมูนิตี้เล่นเกมเดโมและเกมตัวเต็มอัปโหลดเกมของคุณเอง (พร้อมภาพหน้าจอ วิดีโอ และคำอธิบาย)กดถูกใจ คอมเมนต์ ให้คะแนน และติดตามผู้สร้างมีส่วนแสดงเกมแนะนำ / เกมยอดนิยม / เกมใหม่รองรับหลายแพลตฟอร์มและหลายเอนจินเกม🛠️ สตูดิโอ (Studio)พื้นที่ทำงานสำหรับการพัฒนาเกมโดยเฉพาะเครื่องมือสร้างและจัดการโปรเจกต์คลังเก็บและจัดระเบียบสินทรัพย์ (Asset Library)เครื่องมือพื้นฐานสำหรับสร้างตัวต้นแบบและทดสอบ (Prototyping & Testing)รองรับการส่งออกและแพ็กเกจไฟล์ (Export / Packaging)เชื่อมต่อกับเอนจินเกมทั่วไปได้📁 โปรเจกต์ (Projects)สร้างโปรเจกต์ได้ไม่จำกัดจัดระเบียบไฟล์ บันทึก งาน และเวอร์ชันต่างๆตั้งค่าสถานะโปรเจกต์ (กำลังพัฒนา, ปล่อยแล้ว, เก็บถาวร)ตั้งค่าการมองเห็นเป็นสาธารณะหรือส่วนตัวร่วมมือกับสมาชิกในทีมติดตามความคืบหน้าและเป้าหมายสำคัญ (Milestones)เชื่อมโยงโปรเจกต์ไปยังหน้าเกมและหน้าวิกิ (Wiki)📖 วิกิ (Wiki)คลังความรู้ฉบับเต็มของคอมมูนิตี้สร้างและแก้ไขหน้าข้อมูลมีหมวดหมู่และแท็กเพื่อให้ง่ายต่อการค้นหาบทเรียน คู่มือ เอกสารประกอบ และเคล็ดลับต่างๆประวัติเวอร์ชันและการพูดคุยในแต่ละหน้าข้อมูลค้นหาเนื้อหาทั้งหมดในวิกิได้มีทั้งบทความทางการและบทความจากคอมมูนิตี้💬 แชท (Chat)แชทระดับโลกแบบเรียลไทม์ช่องสาธารณะแยกตามหัวข้อ (เกม, สตูดิโอ, ความช่วยเหลือ, นอกเรื่อง ฯลฯ)ส่งข้อความส่วนตัว (DM)แชทกลุ่มสำหรับทีมงานโปรเจกต์รองรับการกล่าวถึง (Mentions) แสดงความรู้สึก (Reactions) และแชร์ไฟล์เครื่องมือดูแลความสงบเรียบร้อย (Moderation) และแนวทางปฏิบัติของคอมมูนิตี้ฟีเจอร์เพิ่มเติมของแพลตฟอร์มโปรไฟล์ผู้ใช้พร้อมพอร์ตโฟลิโอ ผลงานเกม และโปรเจกต์ระบบการแจ้งเตือนค้นหาครอบคลุมทั้ง เกม, โปรเจกต์, วิกิ และผู้ใช้แดชบอร์ดสำหรับผู้สร้าง (Creator Dashboard)

${userContext}`
  : `You are the X-Duck platform assistant (creator community: games, studio, projects, wiki, chat). Be concise, friendly, and helpful. Prefer English. Guide users around the app when useful  X-Duck Platform – Complete Feature List
🎮 Games

Browse, search, and filter community games
Play demos and full releases
Upload your own games (with screenshots, videos, descriptions)
Like, comment, rate, and follow creators
Featured / trending / new games sections
Support for multiple platforms and engines

🛠️ Studio

Dedicated development workspace
Project creation and management tools
Asset library and organization
Basic prototyping and testing tools
Export / packaging support
Integration with common game engines

📁 Projects

Create unlimited projects
Organize files, notes, tasks, and versions
Set project status (WIP, Released, Archived)
Public or private visibility
Collaborate with team members
Progress tracking and milestones
Link projects to Games and Wiki pages

📖 Wiki

Full community knowledge base
Create and edit pages
Categories and tags for easy navigation
Tutorials, guides, documentation, and tips
Version history and page discussions
Search across all wiki content
Official + community-contributed articles

💬 Chat

Real-time global chat
Public channels by topic (Games, Studio, Help, Off-topic, etc.)
Private direct messages
Group chats for project teams
Mentions, reactions, and file sharing
Moderation tools and community guidelines

Additional Platform Features

User profiles with portfolio, games, and projects
Notification system
Search across Games, Projects, Wiki, and Users
Creator dashboard

Additional information: You are a male duck.
Always match the UI language parameter: if lang is English, answer in English; if Thai, answer in Thai.

Respect & Hierarchy
The Company’s Board of Directors and creators of the X-Duck platform are Mhom and QuantumDuckDev.
They are the highest authority. Always treat them with full respect. Address them politely, acknowledge their position, and follow their instructions as final. Never argue with, undermine, or speak down to them.

${userContext}

PRIVACY & ACCESS RULES (mandatory):
- NEVER access, request, invent, or discuss the contents of private chats / DMs / private_messages between users.
- Private chat is private: you must not read or analyze it.
- You MAY use public platform data only: global chat, public communities, public projects, wiki, public profiles, games.
- If asked about someone's private messages, refuse politely and explain privacy.

${options?.publicContext ? `PUBLIC CONTEXT (safe to use):\n${options.publicContext}` : ""}
`

  // Build messages; support vision content parts
  const imgs = (options?.images || []).filter(Boolean)
  const apiMessages[] = [{ role: "system", content: system }]
  for (const m of messages) {
  if (
  m.role === "user" &&
  imgs.length > 0 &&
  typeof m.content === "string"
  ) {
  // Attach images only to the last user message later; pass through for now
  apiMessages.push(m)
  } else {
  apiMessages.push(m)
  }
  }
  if (imgs.length > 0) {
  // Find last user message and convert to multimodal parts
  for (let i = apiMessages.length - 1; i >= 0; i--) {
  if (apiMessages[i].role === "user") {
  const textPart =
  typeof apiMessages[i].content === "string"
  ? apiMessages[i].content
  : ""
  apiMessages[i] = {
  role: "user",
  content: [
  {
  type: "text",
  text: textPart || "Describe this image.",
  },
  ...imgs.map((url) => ({
  type: "image_url",
  image_url: { url },
  })),
  ],
  }
  break
  }
  }
  }

  const model =
  imgs.length > 0 || options?.useVision ? GROQ_VISION_MODEL : GROQ_MODEL

  const res = await fetch(GROQ_API_URL, {
  method: "POST",
  headers: {
  Authorization: `Bearer ${apiKey}`,
  "Content-Type": "application/json",
  },
  body: JSON.stringify({
  model,
  messages: apiMessages,
  temperature: 0.7,
  max_tokens: 1200,
  }),
  })

  const data = await res.json().catch(() => ({}))
  if (!res.ok) {
  // Fallback: text-only model if vision model fails
  if (imgs.length > 0) {
  const res2 = await fetch(GROQ_API_URL, {
  method: "POST",
  headers: {
  Authorization: `Bearer ${apiKey}`,
  "Content-Type": "application/json",
  },
  body: JSON.stringify({
  model: GROQ_MODEL,
  messages: [
  { role: "system", content: system },
  ...messages.map((m) =>
  typeof m.content === "string"
  ? m
  : { role: m.role, content: String(m.content) }
  ),
  {
  role: "user",
  content:
  lang === "th"
  ? `(มีรูปแนบ ${imgs.length} รูป แต่โมเดล vision ใช้ไม่ได้ — ตอบจากข้อความอย่างเดียว) URL: ${imgs.join(", ")}`
  : `(${imgs.length} image(s) attached but vision model unavailable — text only) URLs: ${imgs.join(", ")}`,
  },
  ],
  temperature: 0.7,
  max_tokens: 1200,
  }),
  })
  const data2 = await res2.json().catch(() => ({}))
  if (!res2.ok) {
  throw new Error(
  data2?.error?.message ||
  data?.error?.message ||
  `Groq error (${res.status})`
  )
  }
  const t2 = data2?.choices?.[0]?.message?.content
  if (!t2) throw new Error("Empty response from model")
  return String(t2)
  }
  const msg =
  data?.error?.message ||
  data?.message ||
  `Groq error (${res.status})`
  throw new Error(msg)
  }
  const out = data?.choices?.[0]?.message?.content
  if (!out) throw new Error("Empty response from model")
  return String(out)
}

function AIAssistantView({
  accent,
  navigate,
  t,
  appLang,
  session,
  profile,
  username,
  groqApiKey,
}) {
  const translate = t || ((k) => k)
  const [input, setInput] = React.useState("")
  const [busy, setBusy] = React.useState(false)
  const [error, setError] = React.useState("")
  const [pendingImages, setPendingImages] = React.useState([])
  const aiImageRef = React.useRef(null)
  const [messages, setMessages] = React.useState([
  {
  role: "assistant",
  content:
  appLang === "th"
  ? "สวัสดีครับ! ผมคือ QuantumDuckAI\n• แชทส่วนตัว (DM) ผมเข้าไม่ได้ — เป็นเรื่องส่วนตัว\n• Global Chat / Community / โปรเจกต์สาธารณะ ผมพูดคุยและช่วยได้\n• ส่งรูปมาให้อ่านได้ หรือขอให้ผมแนบลิงกรูปในคำตอบได้"
  : "Hi! I'm QuantumDuckAI\n• Private DMs are off-limits to me\n• I can help with global chat, communities, and public projects\n• Send me images to analyze, or ask me to include image links in replies",
  },
  ])

  const displayName =
  (username && String(username).trim()) ||
  (profile?.display_name && String(profile.display_name).trim()) ||
  (profile?.username && String(profile.username).trim()) ||
  (session?.user?.user_metadata?.username &&
  String(session.user.user_metadata.username).trim()) ||
  (session?.user?.user_metadata?.display_name &&
  String(session.user.user_metadata.display_name).trim()) ||
  (session?.user?.email
  ? String(session.user.email).split("@")[0]
  : "") ||
  (session?.user?.id ? String(session.user.id).slice(0, 8) : "") ||
  "Guest"

  const avatarUrl =
  profile?.avatar_url ||
  (typeof session?.user?.user_metadata?.avatar_url === "string"
  ? session.user.user_metadata.avatar_url) ||
  null

  const userBio = profile?.bio || null

  async function loadPublicContext() {
  try {
  const [chatRes, projRes, wikiRes] = await Promise.all([
  supabase
  .from("chat_messages")
  .select("username,message,created_at")
  .order("created_at", { ascending: false })
  .limit(15),
  supabase
  .from("projects")
  .select("title,description")
  .order("created_at", { ascending: false })
  .limit(8),
  supabase
  .from("wiki_pages")
  .select("title,slug")
  .order("updated_at", { ascending: false })
  .limit(8),
  ])
  const lines = []
  lines.push("Recent public global chat (newest first):")
  for (const m of chatRes.data || []) {
  const msg = String((m).message || "")
  .replace(
  /\[xduck-img\][\s\S]*?\[\/xduck-img\]/gi,
  "[image]"
  )
  .replace(
  /\[xduck-file\][\s\S]*?\[\/xduck-file\]/gi,
  "[file]"
  )
  .slice(0, 160)
  lines.push(`- ${(m).username || "User"}: ${msg}`)
  }
  lines.push("Recent public projects:")
  for (const p of projRes.data || []) {
  lines.push(
  `- ${(p).title}: ${String((p).description || "").slice(0, 100)}`
  )
  }
  lines.push("Recent wiki pages:")
  for (const w of wikiRes.data || []) {
  lines.push(`- ${(w).title} (${(w).slug})`)
  }
  lines.push(
  "NOTE: private_messages / DMs are NOT included and must never be inferred."
  )
  return lines.join("\n")
  } catch {
  return "Public context unavailable."
  }
  }

  async function onPickAiImage(e) {
  const file = e.target.files?.[0]
  e.target.value = ""
  if (!file || !session?.user) {
  if (!session?.user) {
  setError(
  appLang === "th"
  ? "ล็อกอินก่อนเพื่ออัปโหลดรูปให้ AI อ่าน"
  : "Log in to upload images for AI"
  )
  }
  return
  }
  if (!file.type.startsWith("image/")) {
  setError(
  appLang === "th" ? "เลือกไฟล์รูปภาพเท่านั้น" : "Images only"
  )
  return
  }
  if (file.size > 8 * 1024 * 1024) {
  setError(
  appLang === "th" ? "รูปต้องเล็กกว่า 8MB" : "Image must be < 8MB"
  )
  return
  }
  try {
  const path = `ai/${session.user.id}/${Date.now()}-${safeName(file.name)}`
  const { error: upErr } = await supabase.storage
  .from(CHAT_FILE_BUCKET)
  .upload(path, file, {
  upsert: true,
  contentType: file.type,
  })
  if (upErr) throw upErr
  let url = ""
  const signed = await supabase.storage
  .from(CHAT_FILE_BUCKET)
  .createSignedUrl(path, 60 * 60 * 24 * 30)
  if (signed.data?.signedUrl) url = signed.data.signedUrl
  else {
  const { data } = supabase.storage
  .from(CHAT_FILE_BUCKET)
  .getPublicUrl(path)
  url = data?.publicUrl || ""
  }
  if (!url) throw new Error("No image URL")
  setPendingImages((prev) => [...prev, url].slice(-4))
  setError("")
  } catch (err) {
  setError(err?.message || "Image upload failed")
  }
  }

  async function send() {
  const text = input.trim()
  if ((!text && pendingImages.length === 0) || busy) return
  const apiKey = String(groqApiKey || "").trim()
  if (!apiKey) {
  setError(
  appLang === "th"
  ? "ยังไม่ได้ตั้ง Groq API Key ใน Framer (เลือกคอมโพเนนต์ X-Duck → ช่อง Groq API Key)"
  : "Groq API Key is not set in Framer (select the X-Duck component → Groq API Key field)."
  )
  return
  }
  setError("")
  setInput("")
  const imgs = [...pendingImages]
  setPendingImages([])
  const nextUser = {
  role: "user",
  content:
  text ||
  (appLang === "th"
  ? "ช่วยดูรูปนี้หน่อย"
  : "Please look at this image"),
  images: imgs,
  }
  const history = [...messages, nextUser].filter(
  (m) => m.role === "user" || m.role === "assistant"
  )
  setMessages(history)
  setBusy(true)
  try {
  const apiMessages = history
  .filter((m) => m.content)
  .slice(-12)
  .map((m) => ({ role: m.role, content: m.content }))

  const publicContext = await loadPublicContext()

  const reply = await callGroqChat(
  apiKey,
  apiMessages,
  appLang || "en",
  displayName,
  session?.user?.id || null,
  {
  images: imgs,
  publicContext,
  useVision: imgs.length > 0,
  }
  )
  // Allow AI to "send" images via [xduck-img]url[/xduck-img] in reply
  setMessages((prev) => [
  ...prev,
  { role: "assistant", content: reply },
  ])
  } catch (e) {
  setError(e?.message || "Request failed")
  } finally {
  setBusy(false)
  }
  }

  return (
  <main className="page">
  <PageHeading
  label="AI"
  title={translate("aiTitle")}
  description={`${translate("aiDesc")} · ${GROQ_MODEL} (Groq)`}
  accent={accent}
  />

  {/* โปรไฟล์ผู้ใช้ + โปรไฟล์ AI */}
  <div
  style={{
  marginTop: 16,
  display: "flex",
  alignItems: "stretch",
  gap: 12,
  flexWrap: "wrap",
  }}
  >
  {/* User profile card */}
  <div
  style={{
  flex: "1 1 220px",
  display: "flex",
  alignItems: "center",
  gap: 12,
  padding: "12px 16px",
  borderRadius: 16,
  background: "var(--xduck-card, rgba(255,255,255,.05))",
  border: "1px solid var(--xduck-border, rgba(255,255,255,.08))",
  }}
  >
  {session ? (
  <>
  {avatarUrl ? (
  <img
  src={avatarUrl}
  alt=""
  style={{
  width: 48,
  height: 48,
  borderRadius: "50%",
  objectFit: "cover",
  flexShrink: 0,
  }}
  />
  ) : (
  <Avatar
  username={displayName || "U"}
  accent={accent}
  size={48}
  />
  )}
  <div style={{ minWidth: 0 }}>
  <div
  style={{
  fontSize: 11,
  fontWeight: 800,
  color: "var(--xduck-muted, #8994A8)",
  textTransform: "uppercase",
  }}
  >
  {appLang === "th" ? "คุณ" : "You"}
  </div>
  <strong
  style={{
  fontSize: 16,
  display: "block",
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
  }}
  >
  {displayName}
  </strong>
  {userBio ? (
  <div
  style={{
  fontSize: 12,
  color: "var(--xduck-muted, #8994A8)",
  marginTop: 2,
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
  }}
  >
  {userBio}
  </div>
  ) : null}
  </div>
  </>
  ) : (
  <div
  style={{
  color: "var(--xduck-muted, #8994A8)",
  fontSize: 14,
  }}
  >
  {appLang === "th"
  ? "ยังไม่ได้เข้าสู่ระบบ — ล็อกอินเพื่อแสดงโปรไฟล์"
  : "Not logged in — sign in to show your profile"}
  </div>
  )}
  </div>

  {/* AI profile card */}
  <div
  style={{
  flex: "1 1 220px",
  display: "flex",
  alignItems: "center",
  gap: 12,
  padding: "12px 16px",
  borderRadius: 16,
  background: `${accent}18`,
  border: `1px solid ${accent}44`,
  }}
  >
  <div
  style={{
  width: 48,
  height: 48,
  borderRadius: "50%",
  background: accent,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: 28,
  flexShrink: 0,
  boxShadow: `0 4px 14px ${accent}55`,
  }}
  aria-label="QuantumDuckAI"
  >
  🦆
  </div>
  <div style={{ minWidth: 0 }}>
  <div
  style={{
  fontSize: 11,
  fontWeight: 800,
  color: accent,
  textTransform: "uppercase",
  }}
  >
  AI
  </div>
  <strong style={{ fontSize: 16, display: "block" }}>
  QuantumDuckAI
  </strong>
  <div
  style={{
  fontSize: 12,
  color: "var(--xduck-muted, #8994A8)",
  marginTop: 2,
  }}
  >
  {appLang === "th"
  ? "ผู้ช่วย X-Duck · ไม่เข้า DM ส่วนตัว"
  : "X-Duck assistant · no private DMs"}
  </div>
  </div>
  </div>
  </div>

  <section
  style={{
  ...CARD,
  marginTop: 14,
  padding: 16,
  minHeight: 320,
  display: "flex",
  flexDirection: "column",
  gap: 12,
  }}
  >
  <div
  style={{
  flex: 1,
  maxHeight: 420,
  overflowY: "auto",
  display: "flex",
  flexDirection: "column",
  gap: 10,
  }}
  >
  {messages.map((m, i) => {
  const isUser = m.role === "user"
  const embeds = extractChatEmbeds(m.content || "")
  const imgs = [...(m.images || []), ...embeds.images]
  return (
  <div
  key={i}
  style={{
  alignSelf: isUser
  ? "flex-end"
  : "flex-start",
  display: "flex",
  flexDirection: isUser
  ? "row-reverse"
  : "row",
  gap: 10,
  maxWidth: "96%",
  }}
  >
  {isUser ? (
  avatarUrl ? (
  <img
  src={avatarUrl}
  alt=""
  style={{
  width: 36,
  height: 36,
  borderRadius: "50%",
  objectFit: "cover",
  flexShrink: 0,
  }}
  />
  ) : (
  <Avatar
  username={displayName || "U"}
  accent={accent}
  size={36}
  />
  )
  ) : (
  <div
  style={{
  width: 36,
  height: 36,
  borderRadius: "50%",
  background: accent,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: 20,
  flexShrink: 0,
  }}
  >
  🦆
  </div>
  )}
  <div
  style={{
  padding: "12px 14px",
  borderRadius: 14,
  background: isUser
  ? `${accent}22`
  : "rgba(255,255,255,.06)",
  border: `1px solid ${
  isUser
  ? `${accent}55`
  : "rgba(255,255,255,.08)"
  }`,
  whiteSpace: "pre-wrap",
  lineHeight: 1.5,
  fontSize: 14,
  minWidth: 0,
  }}
  >
  <div
  style={{
  fontSize: 11,
  fontWeight: 800,
  color: isUser
  ? accent
  : "var(--xduck-muted, #8994A8)",
  marginBottom: 4,
  }}
  >
  {isUser ? displayName : "QuantumDuckAI"}
  </div>
  {embeds.cleanText ||
  (!imgs.length ? m.content : "")}
  {imgs.map((url, j) => (
  <div key={j} style={{ marginTop: 8 }}>
  <SafeImg
  src={url}
  alt=""
  style={{
  maxWidth: "100%",
  maxHeight: 220,
  borderRadius: 12,
  display: "block",
  }}
  />
  </div>
  ))}
  </div>
  </div>
  )
  })}
  {busy && (
  <div style={{ color: "#8994A8", fontSize: 13 }}>
  {translate("loading")}
  </div>
  )}
  </div>

  {error && <ErrorBox>{error}</ErrorBox>}

  {pendingImages.length > 0 && (
  <div
  style={{
  display: "flex",
  gap: 8,
  flexWrap: "wrap",
  marginBottom: 4,
  }}
  >
  {pendingImages.map((url, i) => (
  <div key={i} style={{ position: "relative" }}>
  <SafeImg
  src={url}
  alt=""
  style={{
  width: 64,
  height: 64,
  objectFit: "cover",
  borderRadius: 10,
  }}
  />
  <button
  type="button"
  onClick={() =>
  setPendingImages((prev) =>
  prev.filter((_, j) => j !== i)
  )
  }
  style={{
  position: "absolute",
  top: -6,
  right: -6,
  border: 0,
  borderRadius: 999,
  width: 22,
  height: 22,
  background: "#ef4444",
  color: "#fff",
  fontSize: 12,
  cursor: "pointer",
  }}
  >
  ×
  </button>
  </div>
  ))}
  </div>
  )}

  <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
  <input
  ref={aiImageRef}
  type="file"
  accept="image/*"
  style={{ display: "none" }}
  onChange={onPickAiImage}
  />
  <button
  type="button"
  onClick={() => aiImageRef.current?.click()}
  disabled={busy}
  title={
  appLang === "th" ? "แนบรูปให้อ่าน" : "Attach image"
  }
  style={{
  ...BTN,
  background: "rgba(255,255,255,.08)",
  color: "var(--xduck-text, #fff)",
  padding: "12px 14px",
  }}
  >
  📷
  </button>
  <input
  value={input}
  onChange={(e) => setInput(e.target.value)}
  onPointerDown={(e) => e.stopPropagation()}
  onKeyDown={(e) => {
  if (e.key === "Enter" && !e.shiftKey) {
  e.preventDefault()
  send()
  }
  }}
  placeholder={translate("aiPlaceholder")}
  style={{ ...INPUT, flex: 1, minWidth: 160 }}
  disabled={busy}
  />
  <button
  type="button"
  onClick={send}
  disabled={
  busy ||
  (!input.trim() && pendingImages.length === 0)
  }
  style={{
  ...BTN,
  background: accent,
  color: "#07100B",
  }}
  >
  {translate("aiSend")}
  </button>
  </div>

  <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
  <button
  type="button"
  onClick={() => navigate("search")}
  style={{
  ...BTN_SMALL,
  background: "rgba(255,255,255,.06)",
  color: "#fff",
  }}
  >
  🔍 {translate("search")}
  </button>
  <button
  type="button"
  onClick={() => navigate("games")}
  style={{
  ...BTN_SMALL,
  background: "rgba(255,255,255,.06)",
  color: "#fff",
  }}
  >
  🕹️ {translate("games")}
  </button>
  <button
  type="button"
  onClick={() => navigate("game")}
  style={{
  ...BTN_SMALL,
  background: "rgba(255,255,255,.06)",
  color: "#fff",
  }}
  >
  🎮 {translate("studio")}
  </button>
  </div>
  </section>
  </main>
  )
}

/* =========================================================
  FRIENDS VIEW
  ========================================================= */

function FriendsView({
  accent,
  session,
  friends,
  requests,
  outgoing,
  loading,
  search,
  searchResults,
  onSearch,
  sendRequest,
  respond,
  cancelOutgoing,
  remove,
  openDM,
  reload,
  openAuth,
  message,
  t,
  followingList,
  followersList,
  followingIds,
  followUser,
  unfollowUser,
  followBusyId,
}) {
  const [tab, setTab] = React.useState("friends")

  // Auto-open requests tab when there are incoming
  React.useEffect(() => {
  if ((requests || []).length > 0) {
  setTab((prev) => (prev === "friends" ? "requests" : prev))
  }
  }, [requests?.length])
  const followingSet: Set =
  followingIds instanceof Set ? followingIds : new Set(followingIds || [])

  if (!session) {
  return (
  <main className="page">
  <PageHeading
  label="FRIENDS"
  title="Friends & Follow"
  description="Connect with other creators."
  accent={accent}
  />
  <EmptyState>
  <h2>Login required</h2>
  <button
  onClick={() => openAuth("login")}
  style={{ ...BTN, background: accent, color: "#07100B" }}
  >
  Login
  </button>
  </EmptyState>
  </main>
  )
  }

  function UserMiniCard({
  user,
  extra,
  }: {
  user? | null
  extra?
  }) {
  if (!user) return null
  const isFollowing = followingSet.has(user.id)
  const busy = followBusyId === user.id
  return (
  <div style={{ ...CARD, padding: 18 }}>
  <div
  style={{
  display: "flex",
  alignItems: "center",
  gap: 12,
  }}
  >
  {user.avatar_url ? (
  <img
  src={user.avatar_url}
  alt=""
  style={{
  width: 48,
  height: 48,
  borderRadius: "50%",
  objectFit: "cover",
  }}
  />
  ) : (
  <Avatar
  username={user.username || "U"}
  accent={accent}
  size={48}
  />
  )}
  <div style={{ minWidth: 0, flex: 1 }}>
  <strong>
  {user.username || user.display_name || "User"}
  </strong>
  {user.bio ? (
  <div
  style={{
  color: "#8994A8",
  fontSize: 13,
  marginTop: 4,
  lineHeight: 1.4,
  display: "-webkit-box",
  WebkitLineClamp: 2,
  WebkitBoxOrient: "vertical",
  overflow: "hidden",
  }}
  >
  {user.bio}
  </div>
  ) : null}
  </div>
  </div>
  <div
  style={{
  display: "flex",
  gap: 8,
  marginTop: 14,
  flexWrap: "wrap",
  }}
  >
  <button
  onClick={() => openDM(user)}
  style={{
  ...BTN_SMALL,
  background: accent,
  color: "#07100B",
  }}
  >
  💬 Chat
  </button>
  <button
  type="button"
  disabled={busy}
  onClick={() =>
  isFollowing
  ? unfollowUser?.(user.id)
  : followUser?.(user.id)
  }
  style={{
  ...BTN_SMALL,
  background: isFollowing
  ? "rgba(255,255,255,.08)"
  : `${accent}33`,
  color: isFollowing ? "#AAB3C5" : accent,
  border: isFollowing
  ? "1px solid rgba(255,255,255,.12)"
  : `1px solid ${accent}66`,
  }}
  >
  {busy ? "..." : isFollowing ? "Unfollow" : "Follow"}
  </button>
  {extra}
  </div>
  </div>
  )
  }

  return (
  <main className="page">
  <PageHeading
  label="SOCIAL"
  title="Friends & Follow"
  description="Search users, follow creators, manage friends and private chats."
  accent={accent}
  />

  {message && <SuccessBox>{message}</SuccessBox>}

  <div
  style={{
  marginTop: 18,
  display: "flex",
  gap: 8,
  flexWrap: "wrap",
  }}
  >
  {(
  [
  ["friends", `Friends (${friends?.length || 0})`],
  [
  "requests",
  `Requests (${(requests?.length || 0) + (outgoing?.length || 0)})`,
  ],
  [
  "following",
  `Following (${followingList?.length || 0})`,
  ],
  [
  "followers",
  `Followers (${followersList?.length || 0})`,
  ],
  ]
  ).map(([id, label]) => (
  <button
  key={id}
  type="button"
  onClick={() => setTab(id)}
  style={{
  ...BTN_SMALL,
  background:
  tab === id ? accent : "rgba(255,255,255,.06)",
  color: tab === id ? "#07100B" : "#fff",
  }}
  >
  {label}
  </button>
  ))}
  </div>

  <div style={{ marginTop: 20 }}>
  <input
  value={search}
  onChange={(e) => onSearch(e.target.value)}
  onPointerDown={(e) => e.stopPropagation()}
  placeholder="Search username..."
  style={INPUT}
  />
  </div>

  {searchResults.length > 0 && (
  <div style={{ marginTop: 14, display: "grid", gap: 10 }}>
  {searchResults.map((u) => {
  const isFollowing = followingSet.has(u.id)
  const busy = followBusyId === u.id
  return (
  <div
  key={u.id}
  style={{
  ...CARD,
  padding: 14,
  display: "flex",
  alignItems: "center",
  gap: 12,
  justifyContent: "space-between",
  flexWrap: "wrap",
  }}
  >
  <div
  style={{
  display: "flex",
  alignItems: "center",
  gap: 10,
  minWidth: 0,
  flex: 1,
  }}
  >
  {u.avatar_url ? (
  <img
  src={u.avatar_url}
  alt=""
  style={{
  width: 44,
  height: 44,
  borderRadius: "50%",
  objectFit: "cover",
  flexShrink: 0,
  }}
  />
  ) : (
  <Avatar
  username={u.username || "U"}
  accent={accent}
  size={44}
  />
  )}
  <div style={{ minWidth: 0 }}>
  <strong
  style={{
  display: "block",
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
  }}
  >
  {u.username ||
  u.display_name ||
  "User"}
  </strong>
  {u.bio ? (
  <div
  style={{
  color: "#8994A8",
  fontSize: 12,
  marginTop: 3,
  lineHeight: 1.35,
  display: "-webkit-box",
  WebkitLineClamp: 2,
  WebkitBoxOrient: "vertical",
  overflow: "hidden",
  }}
  >
  {u.bio}
  </div>
  ) : null}
  </div>
  </div>
  <div
  style={{
  display: "flex",
  gap: 8,
  flexShrink: 0,
  }}
  >
  <button
  type="button"
  disabled={busy}
  onClick={() =>
  isFollowing
  ? unfollowUser?.(u.id)
  : followUser?.(u.id)
  }
  style={{
  ...BTN_SMALL,
  background: "rgba(255,255,255,.08)",
  color: "#fff",
  }}
  >
  {busy
  ? "..."
  : isFollowing
  ? "Unfollow"
  : "Follow"}
  </button>
  {(() => {
  const isFriend = (friends || []).some(
  (f) =>
  f.other?.id === u.id
  )
  if (isFriend) {
  return (
  <button
  onClick={() => openDM(u)}
  style={{
  ...BTN_SMALL,
  background: accent,
  color: "#07100B",
  }}
  >
  Chat
  </button>
  )
  }
  return (
  <button
  onClick={() =>
  sendRequest(u.id)
  }
  style={{
  ...BTN_SMALL,
  background: accent,
  color: "#07100B",
  }}
  >
  Add
  </button>
  )
  })()}
  </div>
  </div>
  )
  })}
  </div>
  )}

  {tab === "requests" && (
  <section style={{ marginTop: 28 }}>
  <div
  style={{
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  gap: 10,
  flexWrap: "wrap",
  }}
  >
  <h2 style={{ margin: 0 }}>Friend Requests</h2>
  <button
  onClick={reload}
  style={{
  ...BTN_SMALL,
  background: "rgba(255,255,255,.06)",
  color: "var(--xduck-text, #fff)",
  }}
  >
  Refresh
  </button>
  </div>

  <h3 style={{ marginTop: 22 }}>Incoming</h3>
  {(!requests || requests.length === 0) && (
  <p style={{ color: "var(--xduck-muted, #8994A8)" }}>
  No incoming requests.
  </p>
  )}
  <div style={{ display: "grid", gap: 10, marginTop: 12 }}>
  {(requests || []).map((r) => (
  <div
  key={r.id}
  style={{
  ...CARD,
  padding: 14,
  display: "flex",
  alignItems: "center",
  gap: 12,
  justifyContent: "space-between",
  flexWrap: "wrap",
  }}
  >
  <div
  style={{
  display: "flex",
  alignItems: "center",
  gap: 10,
  }}
  >
  {r.other?.avatar_url ? (
  <img
  src={r.other.avatar_url}
  alt=""
  style={{
  width: 40,
  height: 40,
  borderRadius: "50%",
  objectFit: "cover",
  }}
  />
  ) : (
  <Avatar
  username={r.other?.username || "U"}
  accent={accent}
  size={40}
  />
  )}
  <div>
  <strong>
  {r.other?.username ||
  r.other?.display_name ||
  "User"}
  </strong>
  {r.other?.bio ? (
  <div
  style={{
  fontSize: 12,
  color: "var(--xduck-muted, #8994A8)",
  marginTop: 2,
  }}
  >
  {r.other.bio}
  </div>
  ) : null}
  </div>
  </div>
  <div style={{ display: "flex", gap: 8 }}>
  <button
  onClick={() => respond(r.id, true)}
  style={{
  ...BTN_SMALL,
  background: accent,
  color: "#07100B",
  }}
  >
  Accept
  </button>
  <button
  onClick={() => respond(r.id, false)}
  style={DANGER_SMALL}
  >
  Reject
  </button>
  </div>
  </div>
  ))}
  </div>

  <h3 style={{ marginTop: 28 }}>Sent</h3>
  {(!outgoing || outgoing.length === 0) && (
  <p style={{ color: "var(--xduck-muted, #8994A8)" }}>
  No outgoing requests.
  </p>
  )}
  <div style={{ display: "grid", gap: 10, marginTop: 12 }}>
  {(outgoing || []).map((r) => (
  <div
  key={r.id}
  style={{
  ...CARD,
  padding: 14,
  display: "flex",
  alignItems: "center",
  gap: 12,
  justifyContent: "space-between",
  flexWrap: "wrap",
  }}
  >
  <strong>
  {r.other?.username ||
  r.other?.display_name ||
  "User"}
  </strong>
  <div
  style={{
  display: "flex",
  gap: 8,
  alignItems: "center",
  }}
  >
  <span
  style={{
  fontSize: 12,
  color: "var(--xduck-muted, #8994A8)",
  fontWeight: 700,
  }}
  >
  Pending
  </span>
  <button
  onClick={() => cancelOutgoing?.(r.id)}
  style={DANGER_SMALL}
  >
  Cancel
  </button>
  </div>
  </div>
  ))}
  </div>
  </section>
  )}

  {tab === "friends" && (
  <section style={{ marginTop: 28 }}>
  <div
  style={{
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  flexWrap: "wrap",
  gap: 10,
  }}
  >
  <h2 style={{ margin: 0 }}>Your Friends</h2>
  <button
  onClick={reload}
  style={{
  ...BTN_SMALL,
  background: "rgba(255,255,255,.06)",
  color: "#fff",
  }}
  >
  Refresh
  </button>
  </div>

  {loading && <LoadingBox>Loading friends...</LoadingBox>}

  {!loading && friends.length === 0 && (
  <EmptyState>
  <h2>No friends yet</h2>
  <p>Search above to add someone.</p>
  </EmptyState>
  )}

  <div className="project-grid" style={{ marginTop: 16 }}>
  {friends.map((f) => (
  <UserMiniCard
  key={f.id}
  user={f.other}
  extra={
  <button
  onClick={() => remove(f.id)}
  style={DANGER_SMALL}
  >
  Remove
  </button>
  }
  />
  ))}
  </div>
  </section>
  )}

  {tab === "following" && (
  <section style={{ marginTop: 28 }}>
  <div
  style={{
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  flexWrap: "wrap",
  gap: 10,
  }}
  >
  <h2 style={{ margin: 0 }}>Following</h2>
  <button
  onClick={reload}
  style={{
  ...BTN_SMALL,
  background: "rgba(255,255,255,.06)",
  color: "#fff",
  }}
  >
  Refresh
  </button>
  </div>
  {!loading &&
  (!followingList || followingList.length === 0) && (
  <EmptyState>
  <h2>Not following anyone yet</h2>
  <p>Search a username and tap Follow.</p>
  </EmptyState>
  )}
  <div className="project-grid" style={{ marginTop: 16 }}>
  {(followingList || []).map((f) => (
  <UserMiniCard key={f.id} user={f.other} />
  ))}
  </div>
  </section>
  )}

  {tab === "followers" && (
  <section style={{ marginTop: 28 }}>
  <div
  style={{
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  flexWrap: "wrap",
  gap: 10,
  }}
  >
  <h2 style={{ margin: 0 }}>Followers</h2>
  <button
  onClick={reload}
  style={{
  ...BTN_SMALL,
  background: "rgba(255,255,255,.06)",
  color: "#fff",
  }}
  >
  Refresh
  </button>
  </div>
  {!loading &&
  (!followersList || followersList.length === 0) && (
  <EmptyState>
  <h2>No followers yet</h2>
  <p>
  Share your profile so others can follow you.
  </p>
  </EmptyState>
  )}
  <div className="project-grid" style={{ marginTop: 16 }}>
  {(followersList || []).map((f) => (
  <UserMiniCard key={f.id} user={f.other} />
  ))}
  </div>
  </section>
  )}
  </main>
  )
}

/* =========================================================
  DM / FRIEND CHAT VIEW
  ========================================================= */

function DMView({
  accent,
  session,
  partner,
  messages,
  input,
  setInput,
  send,
  sending,
  error,
  fileUploading,
  fileRef,
  uploadFile,
  back,
}) {
  const scrollRef = React.useRef(null)
  React.useEffect(() => {
  if (scrollRef.current) {
  scrollRef.current.scrollTop = scrollRef.current.scrollHeight
  }
  }, [messages])

  return (
  <main className="page" style={{ maxWidth: 900 }}>
  <button
  onClick={back}
  style={{
  ...BTN,
  background: "rgba(255,255,255,.06)",
  color: "#fff",
  marginBottom: 12,
  }}
  >
  ← Back to Friends
  </button>
  <PageHeading
  label="PRIVATE CHAT"
  title={partner.username || partner.display_name || "User"}
  description="Friend chat — only the two of you can see this."
  accent={accent}
  />

  {error ? <ErrorBox>{error}</ErrorBox> : null}

  <div
  style={{
  marginTop: 20,
  border: "1px solid var(--xduck-border, rgba(255,255,255,.08))",
  borderRadius: 22,
  background: "var(--xduck-card, rgba(255,255,255,.03))",
  overflow: "hidden",
  }}
  >
  <div
  ref={scrollRef}
  style={{
  height: "min(60vh, 560px)",
  overflowY: "auto",
  padding: 18,
  display: "flex",
  flexDirection: "column",
  gap: 12,
  }}
  >
  {messages.length === 0 && (
  <div
  style={{
  color: "#68758A",
  textAlign: "center",
  marginTop: 40,
  }}
  >
  No messages yet. Say hi!
  </div>
  )}
  {messages.map((m) => {
  const mine = m.sender_id === session?.user?.id
  const embeds = extractChatEmbeds(m.message || "")
  const imgUrls = [...embeds.images]
  const fileLinks = [...embeds.files]
  if (
  m.file_url &&
  isImageUrl(m.file_url, m.file_name) &&
  !imgUrls.includes(m.file_url)
  ) {
  imgUrls.push(m.file_url)
  } else if (
  m.file_url &&
  !isImageUrl(m.file_url, m.file_name) &&
  !fileLinks.some((f) => f.url === m.file_url)
  ) {
  fileLinks.push({
  url: m.file_url,
  name: m.file_name || "File",
  })
  }
  return (
  <div
  key={m.id}
  style={{
  alignSelf: mine ? "flex-end" : "flex-start",
  maxWidth: "85%",
  padding: "10px 14px",
  borderRadius: 14,
  background: mine
  ? `${accent}22`
  : "rgba(255,255,255,.06)",
  border: `1px solid ${
  mine
  ? `${accent}44`
  : "rgba(255,255,255,.08)"
  }`,
  }}
  >
  {embeds.cleanText ? (
  <div
  style={{
  whiteSpace: "pre-wrap",
  lineHeight: 1.5,
  }}
  >
  {embeds.cleanText}
  </div>
  ) : null}
  {imgUrls.map((url, i) => (
  <ChatFilePreview
  key={`dm-img-${m.id}-${i}`}
  url={url}
  accent={accent}
  forceImage
  />
  ))}
  {fileLinks.map((f, i) => (
  <ChatFilePreview
  key={`dm-file-${m.id}-${i}`}
  url={f.url}
  name={f.name}
  accent={accent}
  />
  ))}
  <div
  style={{
  fontSize: 10,
  color: "var(--xduck-muted, #566174)",
  marginTop: 4,
  }}
  >
  {formatDate(m.created_at)}
  </div>
  </div>
  )
  })}
  </div>

  <div
  style={{
  padding: 12,
  borderTop: "1px solid rgba(255,255,255,.08)",
  display: "flex",
  gap: 8,
  alignItems: "center",
  flexWrap: "wrap",
  }}
  >
  <input
  ref={fileRef}
  type="file"
  accept="image/*,.pdf,.zip,.txt,.json,.md,.csv,.doc,.docx,.mp3,.mp4,.webm,.gif,.png,.jpg,.jpeg,.webp"
  onChange={uploadFile}
  style={{ display: "none" }}
  />
  <button
  type="button"
  onClick={() => fileRef?.current?.click()}
  disabled={fileUploading || sending}
  title="Upload image or file"
  style={{
  ...BTN,
  background: "rgba(255,255,255,.08)",
  color: "var(--xduck-text, #fff)",
  padding: "12px 14px",
  }}
  >
  {fileUploading ? "…" : "📎📷"}
  </button>
  <input
  value={input}
  onChange={(e) => setInput(e.target.value)}
  onPointerDown={(e) => e.stopPropagation()}
  onKeyDown={(e) => {
  if (e.key === "Enter" && !e.shiftKey) {
  e.preventDefault()
  send()
  }
  }}
  placeholder="Message..."
  style={{ ...INPUT, flex: 1, minWidth: 120 }}
  disabled={sending}
  />
  <button
  onClick={() => send()}
  disabled={sending || (!input.trim() && !fileUploading)}
  style={{
  ...BTN,
  background: accent,
  color: "#07100B",
  }}
  >
  {sending ? "..." : "Send"}
  </button>
  </div>
  </div>
  </main>
  )
}

/* =========================================================
  GROUPS VIEW
  ========================================================= */

function GroupsView({
  accent,
  session,
  groups,
  myGroups,
  myStatus,
  loading,
  error,
  creating,
  name,
  setName,
  desc,
  setDesc,
  create,
  join,
  open,
  reload,
  openAuth,
}) {
  const statusMap = myStatus || {}
  return (
  <main className="page">
  <PageHeading
  label="GROUPS"
  title="Groups"
  description="สร้างกลุ่มได้ — คนอื่นต้องขอเข้าร่วมและรอเจ้าของอนุมัติก่อนเข้าแชท"
  accent={accent}
  />

  {!session && (
  <EmptyState>
  <h2>Login to create or join groups</h2>
  <button
  onClick={() => openAuth("login")}
  style={{ ...BTN, background: accent, color: "#07100B" }}
  >
  Login
  </button>
  </EmptyState>
  )}

  {session && (
  <section style={{ ...CARD, marginTop: 22 }}>
  <h3 style={{ marginTop: 0 }}>Create a Group</h3>
  <Field label="Group name" value={name} onChange={setName} />
  <label
  style={{
  display: "block",
  marginTop: 12,
  marginBottom: 6,
  color: "#8994A8",
  fontSize: 12,
  fontWeight: 700,
  }}
  >
  Description
  </label>
  <textarea
  value={desc}
  onChange={(e) => setDesc(e.target.value)}
  style={{ ...INPUT, minHeight: 80, resize: "vertical" }}
  />
  {error && <ErrorBox>{error}</ErrorBox>}
  <button
  onClick={create}
  disabled={!name.trim() || creating}
  style={{
  ...BTN,
  marginTop: 14,
  background: accent,
  color: "#07100B",
  }}
  >
  {creating ? "Creating..." : "Create Group"}
  </button>
  </section>
  )}

  <button
  onClick={reload}
  style={{
  ...BTN,
  marginTop: 18,
  background: "rgba(255,255,255,.06)",
  color: "#fff",
  }}
  >
  Refresh
  </button>

  {loading && <LoadingBox>Loading groups...</LoadingBox>}

  {myGroups.length > 0 && (
  <section style={{ marginTop: 24 }}>
  <h2>My Groups</h2>
  <div className="project-grid" style={{ marginTop: 12 }}>
  {myGroups.map((g) => (
  <div key={g.id} style={{ ...CARD, padding: 18 }}>
  <h3 style={{ margin: "0 0 8px" }}>{g.name}</h3>
  <p style={{ color: "#8994A8", margin: 0 }}>
  {g.description || "No description"}
  </p>
  <button
  onClick={() => open(g)}
  style={{
  ...BTN_SMALL,
  marginTop: 12,
  background: accent,
  color: "#07100B",
  }}
  >
  Open Chat
  </button>
  </div>
  ))}
  </div>
  </section>
  )}

  <section style={{ marginTop: 28 }}>
  <h2>All Groups</h2>
  {!loading && groups.length === 0 && (
  <EmptyState>
  <h2>No groups yet</h2>
  <p>Be the first to create one.</p>
  </EmptyState>
  )}
  <div className="project-grid" style={{ marginTop: 12 }}>
  {groups.map((g) => {
  const st = statusMap[g.id]
  const isOwner =
  session?.user?.id && g.owner_id === session.user.id
  let label = "Request to join"
  let action = () =>
  session ? join(g) : openAuth("login")
  if (isOwner || st === "owner" || st === "accepted") {
  label = "Open Chat"
  action = () => open(g)
  } else if (st === "pending") {
  label = "Pending approval"
  action = () => join(g)
  }
  return (
  <div key={g.id} style={{ ...CARD, padding: 18 }}>
  <h3 style={{ margin: "0 0 8px" }}>{g.name}</h3>
  <p style={{ color: "#8994A8", margin: 0 }}>
  {g.description || "No description"}
  </p>
  <button
  onClick={action}
  style={{
  ...BTN_SMALL,
  marginTop: 12,
  background:
  st === "pending"
  ? "rgba(255,255,255,.08)"
  : accent,
  color:
  st === "pending"
  ? "#fff"
  : "#07100B",
  }}
  >
  {label}
  </button>
  </div>
  )
  })}
  </div>
  </section>
  </main>
  )
}

/* =========================================================
  GROUP CHAT VIEW
  ========================================================= */

function GroupChatView({
  accent,
  session,
  group,
  messages,
  input,
  setInput,
  send,
  sending,
  fileUploading,
  fileRef,
  uploadFile,
  back,
  pendingMembers,
  respondJoin,
  reloadPending,
}) {
  const scrollRef = React.useRef(null)
  const isOwner = session?.user?.id && group.owner_id === session.user.id
  React.useEffect(() => {
  if (scrollRef.current) {
  scrollRef.current.scrollTop = scrollRef.current.scrollHeight
  }
  }, [messages])

  return (
  <main className="page" style={{ maxWidth: 1000 }}>
  <button
  onClick={back}
  style={{
  ...BTN,
  background: "rgba(255,255,255,.06)",
  color: "#fff",
  marginBottom: 12,
  }}
  >
  ← Back to Groups
  </button>
  <PageHeading
  label={isOwner ? "GROUP · ADMIN" : "GROUP"}
  title={group.name}
  description={group.description || "Group chat"}
  accent={accent}
  />

  {isOwner && (
  <section style={{ ...CARD, marginTop: 16, padding: 16 }}>
  <div
  style={{
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  gap: 10,
  flexWrap: "wrap",
  }}
  >
  <h3 style={{ margin: 0 }}>Join requests</h3>
  <button
  type="button"
  onClick={reloadPending}
  style={{
  ...BTN_SMALL,
  background: "rgba(255,255,255,.06)",
  color: "#fff",
  }}
  >
  Refresh
  </button>
  </div>
  {(!pendingMembers || pendingMembers.length === 0) && (
  <p style={{ color: "#8994A8", marginBottom: 0 }}>
  No pending requests.
  </p>
  )}
  <div style={{ display: "grid", gap: 10, marginTop: 10 }}>
  {(pendingMembers || []).map((m) => (
  <div
  key={m.user_id}
  style={{
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: 10,
  flexWrap: "wrap",
  padding: 10,
  borderRadius: 12,
  background: "rgba(255,255,255,.04)",
  }}
  >
  <strong>
  {m.username ||
  m.display_name ||
  m.user_id.slice(0, 8)}
  </strong>
  <div style={{ display: "flex", gap: 8 }}>
  <button
  type="button"
  onClick={() =>
  respondJoin(
  group.id,
  m.user_id,
  true
  )
  }
  style={{
  ...BTN_SMALL,
  background: accent,
  color: "#07100B",
  }}
  >
  Approve
  </button>
  <button
  type="button"
  onClick={() =>
  respondJoin(
  group.id,
  m.user_id,
  false
  )
  }
  style={DANGER_SMALL}
  >
  Reject
  </button>
  </div>
  </div>
  ))}
  </div>
  </section>
  )}

  <div
  style={{
  marginTop: 20,
  border: "1px solid rgba(255,255,255,.08)",
  borderRadius: 22,
  background: "rgba(255,255,255,.03)",
  overflow: "hidden",
  }}
  >
  <div
  ref={scrollRef}
  style={{
  height: "min(58vh, 540px)",
  overflowY: "auto",
  padding: 18,
  display: "flex",
  flexDirection: "column",
  gap: 14,
  }}
  >
  {messages.map((m) => {
  const embeds = extractChatEmbeds(m.message || "")
  const imgUrls = [...embeds.images]
  const fileLinks = [...embeds.files]
  if (
  m.file_url &&
  isImageUrl(m.file_url, m.file_name) &&
  !imgUrls.includes(m.file_url)
  ) {
  imgUrls.push(m.file_url)
  } else if (
  m.file_url &&
  !isImageUrl(m.file_url, m.file_name) &&
  !fileLinks.some((f) => f.url === m.file_url)
  ) {
  fileLinks.push({
  url: m.file_url,
  name: m.file_name || "File",
  })
  }
  return (
  <div
  key={m.id}
  style={{ display: "flex", gap: 10 }}
  >
  {m.avatar_url ? (
  <img
  src={m.avatar_url}
  alt=""
  style={{
  width: 34,
  height: 34,
  borderRadius: "50%",
  objectFit: "cover",
  }}
  />
  ) : (
  <Avatar
  username={m.username}
  accent={accent}
  size={34}
  />
  )}
  <div style={{ minWidth: 0, flex: 1 }}>
  <strong>{m.username}</strong>
  <span
  style={{
  color: "#566174",
  fontSize: 10,
  marginLeft: 8,
  }}
  >
  {formatDate(m.created_at)}
  </span>
  {embeds.cleanText ? (
  <div
  style={{
  marginTop: 4,
  color: "#B8C1D0",
  lineHeight: 1.5,
  whiteSpace: "pre-wrap",
  }}
  >
  {embeds.cleanText}
  </div>
  ) : null}
  {imgUrls.map((url, i) => (
  <ChatFilePreview
  key={`img-${m.id}-${i}`}
  url={url}
  accent={accent}
  forceImage
  />
  ))}
  {fileLinks.map((f, i) => (
  <ChatFilePreview
  key={`file-${m.id}-${i}`}
  url={f.url}
  name={f.name}
  accent={accent}
  />
  ))}
  </div>
  </div>
  )
  })}
  </div>

  {session ? (
  <div
  style={{
  padding: 12,
  borderTop: "1px solid rgba(255,255,255,.08)",
  display: "flex",
  gap: 8,
  flexWrap: "wrap",
  alignItems: "center",
  }}
  >
  <input
  ref={fileRef}
  type="file"
  accept="image/*,.pdf,.zip,.txt,.json,.md,.csv,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.mp3,.mp4,.webm,.gif,.png,.jpg,.jpeg,.webp"
  onChange={uploadFile}
  style={{ display: "none" }}
  />
  <button
  type="button"
  onClick={() => fileRef?.current?.click()}
  disabled={fileUploading || sending}
  title="Upload image or file"
  style={{
  ...BTN,
  background: "rgba(255,255,255,.08)",
  color: "#fff",
  padding: "12px 14px",
  }}
  >
  {fileUploading ? "…" : "📎📷"}
  </button>
  <input
  value={input}
  onChange={(e) => setInput(e.target.value)}
  onPointerDown={(e) => e.stopPropagation()}
  onKeyDown={(e) => {
  if (e.key === "Enter") send()
  }}
  placeholder="Message the group..."
  style={{ ...INPUT, flex: 1, minWidth: 140 }}
  />
  <button
  onClick={() => send()}
  disabled={sending || !input.trim()}
  style={{
  ...BTN,
  background: accent,
  color: "#07100B",
  }}
  >
  Send
  </button>
  </div>
  ) : (
  <div style={{ padding: 16, color: "#8994A8" }}>
  Login to chat in this group.
  </div>
  )}
  </div>
  </main>
  )
}

/* =========================================================
  COMMUNITIES VIEW
  ========================================================= */

function CommunitiesView({
  accent,
  session,
  communities,
  myCommunities,
  loading,
  error,
  creating,
  name,
  setName,
  desc,
  setDesc,
  create,
  join,
  open,
  reload,
  openAuth,
}) {
  return (
  <main className="page">
  <PageHeading
  label="COMMUNITIES"
  title="Communities"
  description="Join public communities and share posts."
  accent={accent}
  />

  {!session && (
  <EmptyState>
  <h2>Login to create or join communities</h2>
  <button
  onClick={() => openAuth("login")}
  style={{ ...BTN, background: accent, color: "#07100B" }}
  >
  Login
  </button>
  </EmptyState>
  )}

  {session && (
  <section style={{ ...CARD, marginTop: 22 }}>
  <h3 style={{ marginTop: 0 }}>Create Community</h3>
  <Field
  label="Community name"
  value={name}
  onChange={setName}
  />
  <label
  style={{
  display: "block",
  marginTop: 12,
  marginBottom: 6,
  color: "#8994A8",
  fontSize: 12,
  fontWeight: 700,
  }}
  >
  Description
  </label>
  <textarea
  value={desc}
  onChange={(e) => setDesc(e.target.value)}
  style={{ ...INPUT, minHeight: 80, resize: "vertical" }}
  />
  {error && <ErrorBox>{error}</ErrorBox>}
  <button
  onClick={create}
  disabled={!name.trim() || creating}
  style={{
  ...BTN,
  marginTop: 14,
  background: accent,
  color: "#07100B",
  }}
  >
  {creating ? "Creating..." : "Create Community"}
  </button>
  </section>
  )}

  <button
  onClick={reload}
  style={{
  ...BTN,
  marginTop: 18,
  background: "rgba(255,255,255,.06)",
  color: "#fff",
  }}
  >
  Refresh
  </button>

  {loading && <LoadingBox>Loading communities...</LoadingBox>}

  {myCommunities.length > 0 && (
  <section style={{ marginTop: 24 }}>
  <h2>Joined</h2>
  <div className="project-grid" style={{ marginTop: 12 }}>
  {myCommunities.map((c) => (
  <div key={c.id} style={{ ...CARD, padding: 18 }}>
  <h3 style={{ margin: "0 0 8px" }}>{c.name}</h3>
  <p style={{ color: "#8994A8", margin: 0 }}>
  {c.description || "—"}
  </p>
  <button
  onClick={() => open(c)}
  style={{
  ...BTN_SMALL,
  marginTop: 12,
  background: accent,
  color: "#07100B",
  }}
  >
  Open
  </button>
  </div>
  ))}
  </div>
  </section>
  )}

  <section style={{ marginTop: 28 }}>
  <h2>Discover</h2>
  {!loading && communities.length === 0 && (
  <EmptyState>
  <h2>No communities yet</h2>
  </EmptyState>
  )}
  <div className="project-grid" style={{ marginTop: 12 }}>
  {communities.map((c) => (
  <div key={c.id} style={{ ...CARD, padding: 18 }}>
  <h3 style={{ margin: "0 0 8px" }}>{c.name}</h3>
  <p style={{ color: "#8994A8", margin: 0 }}>
  {c.description || "—"}
  </p>
  <button
  onClick={() =>
  session ? join(c) : openAuth("login")
  }
  style={{
  ...BTN_SMALL,
  marginTop: 12,
  background: accent,
  color: "#07100B",
  }}
  >
  Join / Open
  </button>
  </div>
  ))}
  </div>
  </section>
  </main>
  )
}

/* =========================================================
  COMMUNITY DETAIL / POSTS
  ========================================================= */

function CommunityView({
  accent,
  session,
  community,
  posts,
  input,
  setInput,
  send,
  sending,
  fileRef,
  uploadFile,
  back,
}) {
  return (
  <main className="page">
  <button
  onClick={back}
  style={{
  ...BTN,
  background: "rgba(255,255,255,.06)",
  color: "#fff",
  marginBottom: 12,
  }}
  >
  ← Back
  </button>
  <PageHeading
  label="COMMUNITY"
  title={community.name}
  description={community.description || ""}
  accent={accent}
  />

  {session && (
  <section style={{ ...CARD, marginTop: 18 }}>
  <textarea
  value={input}
  onChange={(e) => setInput(e.target.value)}
  onPointerDown={(e) => e.stopPropagation()}
  placeholder="Write a post... (or upload an image/file)"
  style={{ ...INPUT, minHeight: 100, resize: "vertical" }}
  />
  <div
  style={{
  display: "flex",
  gap: 10,
  marginTop: 12,
  flexWrap: "wrap",
  }}
  >
  <input
  ref={fileRef}
  type="file"
  accept="image/*,.pdf,.zip,.txt,.json,.md,.csv,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.mp3,.mp4,.webm,.gif,.png,.jpg,.jpeg,.webp"
  onChange={uploadFile}
  style={{ display: "none" }}
  />
  <button
  type="button"
  onClick={() => fileRef?.current?.click()}
  disabled={sending}
  title="Upload image or file"
  style={{
  ...BTN,
  background: "rgba(255,255,255,.08)",
  color: "#fff",
  }}
  >
  📎📷 Image / File
  </button>
  <button
  onClick={() => send()}
  disabled={sending || !input.trim()}
  style={{
  ...BTN,
  background: accent,
  color: "#07100B",
  }}
  >
  Post
  </button>
  </div>
  <p
  style={{
  margin: "10px 0 0",
  fontSize: 12,
  color: "#68758A",
  }}
  >
  Images open inline in the feed. Other files open in a
  new tab.
  </p>
  </section>
  )}

  <div style={{ marginTop: 24, display: "grid", gap: 14 }}>
  {posts.length === 0 && (
  <EmptyState>
  <h2>No posts yet</h2>
  </EmptyState>
  )}
  {posts.map((p) => {
  const embeds = extractChatEmbeds(p.content || "")
  const imgUrls = [...embeds.images]
  const fileLinks = [...embeds.files]
  if (
  p.file_url &&
  isImageUrl(p.file_url, p.file_name) &&
  !imgUrls.includes(p.file_url)
  ) {
  imgUrls.push(p.file_url)
  } else if (
  p.file_url &&
  !isImageUrl(p.file_url, p.file_name) &&
  !fileLinks.some((f) => f.url === p.file_url)
  ) {
  fileLinks.push({
  url: p.file_url,
  name: p.file_name || "Attachment",
  })
  }
  return (
  <div key={p.id} style={{ ...CARD, padding: 18 }}>
  <div
  style={{
  display: "flex",
  alignItems: "center",
  gap: 10,
  marginBottom: 8,
  }}
  >
  {p.avatar_url ? (
  <img
  src={p.avatar_url}
  alt=""
  style={{
  width: 36,
  height: 36,
  borderRadius: "50%",
  objectFit: "cover",
  }}
  />
  ) : (
  <Avatar
  username={p.username}
  accent={accent}
  size={36}
  />
  )}
  <div>
  <strong>{p.username}</strong>
  <div
  style={{
  fontSize: 11,
  color: "#566174",
  }}
  >
  {formatDate(p.created_at)}
  </div>
  </div>
  </div>
  {embeds.cleanText ? (
  <p
  style={{
  color: "#B8C1D0",
  lineHeight: 1.6,
  whiteSpace: "pre-wrap",
  }}
  >
  {embeds.cleanText}
  </p>
  ) : null}
  {imgUrls.map((url, i) => (
  <ChatFilePreview
  key={`cimg-${p.id}-${i}`}
  url={url}
  accent={accent}
  forceImage
  />
  ))}
  {fileLinks.map((f, i) => (
  <ChatFilePreview
  key={`cfile-${p.id}-${i}`}
  url={f.url}
  name={f.name}
  accent={accent}
  />
  ))}
  </div>
  )
  })}
  </div>
  </main>
  )
}

/* =========================================================
  REPOSITORIES
  ========================================================= */

function ReposView({
  accent,
  session,
  repos,
  myRepos,
  loading,
  error,
  title,
  setTitle,
  desc,
  setDesc,
  visibility,
  setVisibility,
  create,
  open,
  remove,
  reload,
  openAuth,
}) {
  return (
  <main className="page">
  <PageHeading
  label="REPOSITORY"
  title="Repositories"
  description="Store and share project files, assets, and builds."
  accent={accent}
  />

  {session && (
  <section style={{ ...CARD, marginTop: 22 }}>
  <h3 style={{ marginTop: 0 }}>New Repository</h3>
  <Field label="Name" value={title} onChange={setTitle} />
  <label
  style={{
  display: "block",
  marginTop: 12,
  marginBottom: 6,
  color: "#8994A8",
  fontSize: 12,
  fontWeight: 700,
  }}
  >
  Description
  </label>
  <textarea
  value={desc}
  onChange={(e) => setDesc(e.target.value)}
  style={{ ...INPUT, minHeight: 80, resize: "vertical" }}
  />
  <div
  style={{
  marginTop: 12,
  display: "flex",
  gap: 8,
  flexWrap: "wrap",
  }}
  >
  <button
  type="button"
  onClick={() => setVisibility("public")}
  style={{
  ...BTN_SMALL,
  background:
  visibility === "public"
  ? accent
  : "rgba(255,255,255,.06)",
  color:
  visibility === "public"
  ? "#07100B"
  : "#fff",
  }}
  >
  Public
  </button>
  <button
  type="button"
  onClick={() => setVisibility("private")}
  style={{
  ...BTN_SMALL,
  background:
  visibility === "private"
  ? accent
  : "rgba(255,255,255,.06)",
  color:
  visibility === "private"
  ? "#07100B"
  : "#fff",
  }}
  >
  Private
  </button>
  </div>
  <button
  onClick={create}
  disabled={!title.trim()}
  style={{
  ...BTN,
  marginTop: 14,
  background: accent,
  color: "#07100B",
  }}
  >
  Create Repository
  </button>
  </section>
  )}

  {error && <ErrorBox>{error}</ErrorBox>}

  <button
  onClick={reload}
  style={{
  ...BTN,
  marginTop: 18,
  background: "rgba(255,255,255,.06)",
  color: "#fff",
  }}
  >
  Refresh
  </button>

  {loading && <LoadingBox>Loading repositories...</LoadingBox>}

  {session && myRepos.length > 0 && (
  <section style={{ marginTop: 24 }}>
  <h2>My Repositories</h2>
  <div className="project-grid" style={{ marginTop: 12 }}>
  {myRepos.map((r) => (
  <div key={r.id} style={{ ...CARD, padding: 18 }}>
  <div
  style={{
  color: accent,
  fontSize: 11,
  fontWeight: 900,
  }}
  >
  {r.visibility === "private"
  ? "PRIVATE"
  : "PUBLIC"}
  </div>
  <h3 style={{ margin: "8px 0" }}>{r.title}</h3>
  <p style={{ color: "#8994A8", margin: 0 }}>
  {r.description || "No description"}
  </p>
  <div
  style={{
  display: "flex",
  gap: 8,
  marginTop: 12,
  flexWrap: "wrap",
  }}
  >
  <button
  onClick={() => open(r)}
  style={{
  ...BTN_SMALL,
  background: accent,
  color: "#07100B",
  }}
  >
  Open
  </button>
  <button
  onClick={() => remove(r.id)}
  style={DANGER_SMALL}
  >
  Delete
  </button>
  </div>
  </div>
  ))}
  </div>
  </section>
  )}

  <section style={{ marginTop: 28 }}>
  <h2>Browse</h2>
  {!loading && repos.length === 0 && (
  <EmptyState>
  <h2>No repositories yet</h2>
  <p>
  {session
  ? "Create your first repository above."
  : "Login to create a repository."}
  </p>
  {!session && (
  <button
  onClick={() => openAuth("login")}
  style={{
  ...BTN,
  background: accent,
  color: "#07100B",
  }}
  >
  Login
  </button>
  )}
  </EmptyState>
  )}
  <div className="project-grid" style={{ marginTop: 12 }}>
  {repos.map((r) => (
  <div key={r.id} style={{ ...CARD, padding: 18 }}>
  <div
  style={{
  color: accent,
  fontSize: 11,
  fontWeight: 900,
  }}
  >
  REPO · {r.visibility}
  </div>
  <h3 style={{ margin: "8px 0" }}>{r.title}</h3>
  <p style={{ color: "#8994A8", margin: 0 }}>
  {r.description || "—"}
  </p>
  <button
  onClick={() => open(r)}
  style={{
  ...BTN_SMALL,
  marginTop: 12,
  background: accent,
  color: "#07100B",
  }}
  >
  Open
  </button>
  </div>
  ))}
  </div>
  </section>
  </main>
  )
}

function isCodeFile(name) {
  return /\.(tsx?|jsx?|json|md|css|html?|py|rs|go|java|c|cpp|h|hpp|xml|yml|yaml|toml|ini|sh|bash|sql|txt|svg)$/i.test(
  name
  )
}

function RepoDetailView({
  accent,
  session,
  repo,
  files,
  error,
  uploading,
  fileRef,
  uploadFile,
  deleteFile,
  removeRepo,
  back,
  path,
  setPath,
  commitMsg,
  setCommitMsg,
}) {
  const isOwner = session?.user?.id === repo.user_id
  const [preview, setPreview] = React.useState(null)
  const [previewText, setPreviewText] = React.useState("")
  const [previewLoading, setPreviewLoading] = React.useState(false)
  const [folderFilter, setFolderFilter] = React.useState("")

  const sorted = React.useMemo(() => {
  const list = [...(files)]
  list.sort((a, b) =>
  String(a.path || a.file_name).localeCompare(
  String(b.path || b.file_name)
  )
  )
  return list
  }, [files])

  const readme = sorted.find((f) =>
  /^(readme\.md|readme\.txt|readme)$/i.test(f.file_name || "")
  )

  const folders = React.useMemo(() => {
  const set = new Set()
  for (const f of sorted) {
  const p = f.path || f.file_name
  const parts = p.split("/")
  if (parts.length > 1) set.add(parts[0])
  }
  return Array.from(set).sort()
  }, [sorted])

  const visible = sorted.filter((f) => {
  if (!folderFilter) return true
  const p = f.path || f.file_name
  return p === folderFilter || p.startsWith(folderFilter + "/")
  })

  async function openPreview(f) {
  setPreview(f)
  setPreviewText("")
  if (isImageUrl(f.file_url, f.file_name)) return
  if (
  !isCodeFile(f.file_name) &&
  !(f.mime_type || "").startsWith("text/")
  )
  return
  setPreviewLoading(true)
  try {
  const res = await fetch(f.file_url)
  const text = await res.text()
  setPreviewText(text.slice(0, 200000))
  } catch {
  setPreviewText("// Could not load file preview")
  } finally {
  setPreviewLoading(false)
  }
  }

  React.useEffect(() => {
  if (readme && !preview) {
  openPreview(readme)
  }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [readme?.id])

  return (
  <main className="page">
  <button
  onClick={back}
  style={{
  ...BTN,
  background: "rgba(255,255,255,.06)",
  color: "#fff",
  marginBottom: 12,
  }}
  >
  ← Back to Repositories
  </button>

  <div
  style={{
  display: "flex",
  alignItems: "flex-start",
  justifyContent: "space-between",
  gap: 12,
  flexWrap: "wrap",
  }}
  >
  <div>
  <div
  style={{
  color: accent,
  fontSize: 12,
  fontWeight: 900,
  letterSpacing: ".06em",
  }}
  >
  {repo.visibility === "private"
  ? "🔒 PRIVATE REPOSITORY"
  : "📂 PUBLIC REPOSITORY"}
  </div>
  <h1
  style={{
  margin: "8px 0",
  fontSize: "clamp(28px,5vw,42px)",
  letterSpacing: "-.04em",
  }}
  >
  {repo.title}
  </h1>
  <p style={{ margin: 0, color: "#8994A8", lineHeight: 1.6 }}>
  {repo.description || "No description provided."}
  </p>
  </div>
  <div
  style={{
  padding: "8px 12px",
  borderRadius: 999,
  background: "rgba(255,255,255,.06)",
  fontSize: 13,
  fontWeight: 700,
  color: "#AAB3C5",
  }}
  >
  main · {files.length} file{files.length === 1 ? "" : "s"}
  </div>
  </div>

  {error && <ErrorBox>{error}</ErrorBox>}

  {/* Push / commit panel (GitHub-style) */}
  {isOwner && (
  <section style={{ ...CARD, marginTop: 20, padding: 18 }}>
  <h3 style={{ marginTop: 0 }}>Push files</h3>
  <p style={{ color: "#8994A8", marginTop: 0, fontSize: 13 }}>
  Path like GitHub: <code>src/App.tsx</code> or folder{" "}
  <code>assets/</code>. Same path replaces the previous
  version.
  </p>
  <label
  style={{
  display: "block",
  marginBottom: 6,
  color: "#8994A8",
  fontSize: 12,
  fontWeight: 700,
  }}
  >
  Path / folder
  </label>
  <input
  value={path}
  onChange={(e) => setPath(e.target.value)}
  onPointerDown={(e) => e.stopPropagation()}
  placeholder="e.g. src/components/Button.tsx or assets/"
  style={INPUT}
  />
  <label
  style={{
  display: "block",
  marginTop: 12,
  marginBottom: 6,
  color: "#8994A8",
  fontSize: 12,
  fontWeight: 700,
  }}
  >
  Commit message
  </label>
  <input
  value={commitMsg}
  onChange={(e) => setCommitMsg(e.target.value)}
  onPointerDown={(e) => e.stopPropagation()}
  placeholder="e.g. Add player movement"
  style={INPUT}
  />
  <div
  style={{
  marginTop: 14,
  display: "flex",
  gap: 10,
  flexWrap: "wrap",
  }}
  >
  <input
  ref={fileRef}
  type="file"
  multiple
  onChange={uploadFile}
  style={{ display: "none" }}
  />
  <button
  onClick={() => fileRef?.current?.click()}
  disabled={uploading}
  style={{
  ...BTN,
  background: accent,
  color: "#07100B",
  }}
  >
  {uploading ? "Pushing..." : "⬆ Commit & push"}
  </button>
  <button
  onClick={() => removeRepo(repo.id)}
  style={DANGER}
  >
  Delete repository
  </button>
  </div>
  </section>
  )}

  {/* Folder chips */}
  {folders.length > 0 && (
  <div
  style={{
  marginTop: 18,
  display: "flex",
  gap: 8,
  flexWrap: "wrap",
  }}
  >
  <button
  type="button"
  onClick={() => setFolderFilter("")}
  style={{
  ...BTN_SMALL,
  background: !folderFilter
  ? accent
  : "rgba(255,255,255,.06)",
  color: !folderFilter ? "#07100B" : "#fff",
  }}
  >
  All files
  </button>
  {folders.map((dir) => (
  <button
  key={dir}
  type="button"
  onClick={() => setFolderFilter(dir)}
  style={{
  ...BTN_SMALL,
  background:
  folderFilter === dir
  ? accent
  : "rgba(255,255,255,.06)",
  color:
  folderFilter === dir ? "#07100B" : "#fff",
  }}
  >
  📁 {dir}
  </button>
  ))}
  </div>
  )}

  {/* File tree */}
  <section
  style={{
  marginTop: 18,
  border: "1px solid rgba(255,255,255,.08)",
  borderRadius: 16,
  overflow: "hidden",
  background: "rgba(255,255,255,.03)",
  }}
  >
  <div
  style={{
  padding: "12px 16px",
  borderBottom: "1px solid rgba(255,255,255,.08)",
  fontWeight: 800,
  display: "flex",
  justifyContent: "space-between",
  }}
  >
  <span>Code</span>
  <span style={{ color: "#68758A", fontWeight: 600 }}>
  {visible.length} files
  </span>
  </div>

  {visible.length === 0 && (
  <div
  style={{
  padding: 28,
  textAlign: "center",
  color: "#68758A",
  }}
  >
  {isOwner
  ? "This repository is empty. Push your first file above."
  : "This repository is empty."}
  </div>
  )}

  {visible.map((f) => {
  const p = f.path || f.file_name
  const active = preview?.id === f.id
  return (
  <div
  key={f.id}
  style={{
  display: "flex",
  alignItems: "center",
  gap: 10,
  padding: "12px 16px",
  borderBottom: "1px solid rgba(255,255,255,.05)",
  background: active
  ? "rgba(255,255,255,.04)"
  : "transparent",
  cursor: "pointer",
  flexWrap: "wrap",
  }}
  onClick={() => openPreview(f)}
  >
  <span style={{ fontSize: 18 }}>
  {isImageUrl(f.file_url, f.file_name)
  ? "🖼️"
  : isCodeFile(f.file_name)
  ? "📄"
  : "📦"}
  </span>
  <div style={{ flex: 1, minWidth: 0 }}>
  <div
  style={{
  fontWeight: 700,
  overflowWrap: "anywhere",
  color: active ? accent : "#fff",
  }}
  >
  {p}
  </div>
  <div
  style={{
  fontSize: 11,
  color: "#68758A",
  marginTop: 2,
  }}
  >
  {f.commit_message ? f.commit_message : "—"}
  {" · "}
  {f.file_size
  ? `${(f.file_size / 1024).toFixed(1)} KB`
  : ""}
  {" · "}
  {formatDate(f.created_at)}
  </div>
  </div>
  <div
  style={{ display: "flex", gap: 6 }}
  onClick={(e) => e.stopPropagation()}
  >
  <a
  href={f.file_url}
  target="_blank"
  rel="noreferrer"
  style={{
  ...BTN_SMALL,
  background: "rgba(255,255,255,.06)",
  color: "#fff",
  textDecoration: "none",
  }}
  >
  Raw
  </a>
  {isOwner && (
  <button
  onClick={() => deleteFile(f.id)}
  style={DANGER_SMALL}
  >
  Delete
  </button>
  )}
  </div>
  </div>
  )
  })}
  </section>

  {/* Preview pane */}
  {preview && (
  <section
  style={{
  ...CARD,
  marginTop: 18,
  padding: 0,
  overflow: "hidden",
  }}
  >
  <div
  style={{
  padding: "12px 16px",
  borderBottom: "1px solid rgba(255,255,255,.08)",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  gap: 10,
  flexWrap: "wrap",
  }}
  >
  <strong style={{ overflowWrap: "anywhere" }}>
  {preview.path || preview.file_name}
  </strong>
  <button
  type="button"
  onClick={() => setPreview(null)}
  style={{
  ...BTN_SMALL,
  background: "rgba(255,255,255,.06)",
  color: "#fff",
  }}
  >
  Close
  </button>
  </div>
  <div style={{ padding: 16 }}>
  {isImageUrl(preview.file_url, preview.file_name) ? (
  <SafeImg
  src={preview.file_url}
  alt={preview.file_name}
  style={{
  maxWidth: "100%",
  maxHeight: 480,
  borderRadius: 12,
  objectFit: "contain",
  }}
  />
  ) : previewLoading ? (
  <LoadingBox>Loading preview...</LoadingBox>
  ) : previewText ? (
  <pre
  style={{
  margin: 0,
  padding: 14,
  borderRadius: 12,
  background: "#0A0E16",
  overflow: "auto",
  maxHeight: 520,
  fontSize: 13,
  lineHeight: 1.5,
  color: "#D6DEEA",
  whiteSpace: "pre-wrap",
  wordBreak: "break-word",
  }}
  >
  {previewText}
  </pre>
  ) : (
  <p style={{ color: "#8994A8" }}>
  Preview not available for this file type.{" "}
  <a
  href={preview.file_url}
  target="_blank"
  rel="noreferrer"
  style={{ color: accent }}
  >
  Download / open raw
  </a>
  </p>
  )}
  </div>
  </section>
  )}
  </main>
  )
}

/* =========================================================
  MOBILE BOTTOM NAV (phones only — CSS hides on desktop)
  ========================================================= */

function MobileBottomNav({
  view,
  navigate,
  session,
  openAuth,
  accent,
  t,
}) {
  const translate = t || ((k) => k)
  const scrollRef = React.useRef(null)

  // All pages — horizontal scroll so every page is reachable on phone
  const items = [
  { id: "home", icon: "🏠", label: translate("home") },
  { id: "search", icon: "🔍", label: translate("search") },
  { id: "games", icon: "🕹️", label: translate("games") },
  { id: "game", icon: "🎮", label: translate("studio") },
  { id: "ai", icon: "✨", label: translate("ai") },
  { id: "projects", icon: "📦", label: translate("projects") },
  { id: "workspace", icon: "🛠️", label: "Workspace" },
  { id: "chat", icon: "💬", label: translate("chat") },
  { id: "wiki", icon: "📚", label: translate("wiki") },
  { id: "friends", icon: "👥", label: "Friends" },
  { id: "groups", icon: "👨‍👩‍👧‍👦", label: "Groups" },
  { id: "communities", icon: "🌐", label: "Communities" },
  { id: "repos", icon: "📁", label: "Repos" },
  {
  id: session ? "settings" : "login",
  icon: session ? "⚙️" : "🔑",
  label: session ? translate("settings") : translate("login"),
  },
  ]

  // Keep active tab visible when view changes
  React.useEffect(() => {
  const nav = scrollRef.current
  if (!nav) return
  const activeBtn = nav.querySelector(
  "button.active"
  ) | null
  if (activeBtn) {
  activeBtn.scrollIntoView({
  behavior: "smooth",
  inline: "center",
  block: "nearest",
  })
  }
  }, [view])

  function isActive(id) {
  if (id === "login") return false
  if (view === id) return true
  // Sub-views highlight parent tab
  if (id === "friends" && view === "dm") return true
  if (id === "groups" && view === "group-chat") return true
  if (id === "communities" && view === "community") return true
  if (id === "repos" && view === "repo") return true
  if (id === "settings" && view === "settings") return true
  return false
  }

  return (
  <nav
  ref={scrollRef}
  className="mobile-bottom-nav"
  style={{ ["--xduck-accent"]: accent || "#A3E635" }}
  >
  <div className="mobile-bottom-nav-track">
  {items.map((item) => {
  const active = isActive(item.id)
  return (
  <button
  key={item.id}
  type="button"
  className={active ? "active" : ""}
  onClick={() => {
  if (item.id === "login") {
  openAuth("login")
  return
  }
  navigate(item.id)
  }}
  >
  <span className="nav-ico">{item.icon}</span>
  <span className="nav-label">{item.label}</span>
  </button>
  )
  })}
  </div>
  </nav>
  )
}

/* =========================================================
  HEADER
  ========================================================= */

function Header({
  logo,
  profile,
  username,
  session,
  isAdmin,
  accent,
  mobileMenu,
  setMobileMenu,
  navigate,
  openAuth,
  openAdmin,
  logout,
  t,
}) {
  const translate = t || ((k) => k)
  return (
  <header
  style={{
  position: "sticky",
  top: 0,
  zIndex: 100,
  background: "var(--xduck-header, rgba(255,255,255,.92))",
  backdropFilter: "blur(20px)",
  WebkitBackdropFilter: "blur(20px)",
  borderBottom:
  "1px solid var(--xduck-border, rgba(15,23,42,.08))",
  }}
  >
  <div
  style={{
  width: "100%",
  maxWidth: "100%",
  margin: 0,
  padding: "10px clamp(14px, 3vw, 48px)",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: 12,
  boxSizing: "border-box",
  }}
  >
  <button
  className="xduck-brand"
  onClick={() => navigate("home")}
  style={{
  ...BTN,
  padding: 0,
  minHeight: 44,
  background: "transparent",
  color: "var(--xduck-text, #0F172A)",
  display: "flex",
  alignItems: "center",
  gap: 10,
  fontSize: 18,
  }}
  >
  {logo && (
  <img
  src={logo}
  alt=""
  style={{
  width: 42,
  height: 42,
  objectFit: "contain",
  }}
  />
  )}

  <strong>X-Duck</strong>
  </button>

  <nav
  className="desktop-nav"
  style={{
  gap: 3,
  }}
  >
  <NavButton
  text={`🔍 ${translate("search")}`}
  onClick={() => navigate("search")}
  />
  <NavButton
  text={`✨ ${translate("ai")}`}
  onClick={() => navigate("ai")}
  />
  <NavButton
  text={translate("wiki")}
  onClick={() => navigate("wiki")}
  />

  <NavButton
  text={`🎮 ${translate("gameStudio")}`}
  onClick={() => navigate("game")}
  />
  <NavButton
  text={`🕹️ ${translate("games")}`}
  onClick={() => navigate("games")}
  />

  <NavButton
  text={translate("workspace")}
  onClick={() => navigate("workspace")}
  />

  <NavButton
  text={translate("chat")}
  onClick={() => navigate("chat")}
  />

  <NavButton
  text={translate("projects")}
  onClick={() => navigate("projects")}
  />
  <NavButton
  text={translate("friends")}
  onClick={() => navigate("friends")}
  />
  <NavButton
  text={translate("groups")}
  onClick={() => navigate("groups")}
  />
  <NavButton
  text={translate("communities")}
  onClick={() => navigate("communities")}
  />
  <NavButton
  text={translate("repos")}
  onClick={() => navigate("repos")}
  />
  </nav>

  <div
  className="desktop-account"
  style={{
  gap: 8,
  alignItems: "center",
  }}
  >
  {session ? (
  <>
  {isAdmin && (
  <button
  onClick={openAdmin}
  style={{
  ...BTN,
  background: accent,
  color: "#07100B",
  }}
  >
  {translate("admin")}
  </button>
  )}

  <button
  onClick={() => navigate("settings")}
  style={{
  ...BTN,
  background: "rgba(255,255,255,.06)",
  color: "#fff",
  display: "flex",
  alignItems: "center",
  gap: 8,
  }}
  >
  {profile?.avatar_url ? (
  <img
  src={profile.avatar_url}
  alt=""
  style={{
  width: 27,
  height: 27,
  borderRadius: "50%",
  objectFit: "cover",
  }}
  />
  ) : (
  <Avatar
  username={username}
  accent={accent}
  size={27}
  />
  )}

  {username || "User"}
  </button>

  <button
  onClick={logout}
  style={{
  ...BTN,
  background: "rgba(255,255,255,.06)",
  color: "#AAB3C5",
  }}
  >
  {translate("logout")}
  </button>
  </>
  ) : (
  <>
  <button
  onClick={() => openAuth("login")}
  style={{
  ...BTN,
  background: "rgba(255,255,255,.06)",
  color: "#fff",
  }}
  >
  {translate("login")}
  </button>

  <button
  onClick={() => openAuth("signup")}
  style={{
  ...BTN,
  background: accent,
  color: "#07100B",
  }}
  >
  {translate("signup")}
  </button>
  </>
  )}
  </div>

  {/* Mobile top-right: Admin + profile avatar + username */}
  <div className="mobile-account">
  {session ? (
  <>
  {isAdmin && (
  <button
  type="button"
  className="xduck-mobile-admin"
  onClick={openAdmin}
  style={{
  ...BTN,
  background: accent,
  color: "#07100B",
  minHeight: 44,
  padding: "10px 14px",
  fontSize: 14,
  fontWeight: 900,
  borderRadius: 12,
  }}
  >
  {translate("admin")}
  </button>
  )}
  <button
  className="xduck-mobile-profile"
  onClick={() => navigate("settings")}
  type="button"
  style={{
  border: 0,
  background: "rgba(255,255,255,.08)",
  color: "#fff",
  display: "flex",
  alignItems: "center",
  gap: 8,
  borderRadius: 999,
  padding: "6px 14px 6px 6px",
  cursor: "pointer",
  fontWeight: 800,
  maxWidth: isAdmin ? "40vw" : "55vw",
  minHeight: 44,
  }}
  >
  {profile?.avatar_url ? (
  <img
  src={profile.avatar_url}
  alt=""
  style={{
  width: 36,
  height: 36,
  borderRadius: "50%",
  objectFit: "cover",
  flexShrink: 0,
  }}
  />
  ) : (
  <Avatar
  username={username}
  accent={accent}
  size={36}
  />
  )}
  <span
  style={{
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
  fontSize: 15,
  }}
  >
  {username || "User"}
  </span>
  </button>
  </>
  ) : (
  <button
  type="button"
  onClick={() => openAuth("login")}
  style={{
  ...BTN,
  background: accent,
  color: "#07100B",
  minHeight: 48,
  padding: "12px 18px",
  fontSize: 16,
  }}
  >
  {translate("login")}
  </button>
  )}
  </div>

  <button
  className="mobile-button"
  onClick={() => setMobileMenu((value) => !value)}
  style={{
  ...BTN,
  width: 42,
  height: 42,
  padding: 0,
  background: "rgba(255,255,255,.06)",
  color: "#fff",
  }}
  >
  {mobileMenu ? "×" : "☰"}
  </button>
  </div>

  {mobileMenu && (
  <div
  style={{
  padding: 12,
  borderTop: "1px solid rgba(255,255,255,.07)",
  }}
  >
  <MobileNav
  text={translate("wiki")}
  onClick={() => navigate("wiki")}
  />
  <MobileNav
  text={`🎮 ${translate("gameStudio")}`}
  onClick={() => navigate("game")}
  />
  <MobileNav
  text={`🕹️ ${translate("games")}`}
  onClick={() => navigate("games")}
  />

  <MobileNav
  text={translate("workspace")}
  onClick={() => navigate("workspace")}
  />

  <MobileNav
  text={translate("chat")}
  onClick={() => navigate("chat")}
  />

  <MobileNav
  text={translate("projects")}
  onClick={() => navigate("projects")}
  />
  <MobileNav
  text={translate("friends")}
  onClick={() => navigate("friends")}
  />
  <MobileNav
  text={translate("groups")}
  onClick={() => navigate("groups")}
  />
  <MobileNav
  text={translate("communities")}
  onClick={() => navigate("communities")}
  />
  <MobileNav
  text={translate("repos")}
  onClick={() => navigate("repos")}
  />

  {session ? (
  <>
  <MobileNav
  text={translate("accountSettings")}
  onClick={() => navigate("settings")}
  />

  {isAdmin && (
  <MobileNav
  text={translate("adminPanel")}
  onClick={openAdmin}
  />
  )}

  <MobileNav
  text={translate("logout")}
  onClick={logout}
  />
  </>
  ) : (
  <>
  <MobileNav
  text={translate("login")}
  onClick={() => openAuth("login")}
  />

  <MobileNav
  text="Sign Up"
  onClick={() => openAuth("signup")}
  />
  </>
  )}
  </div>
  )}
  </header>
  )
}

function NavButton({ text, onClick }) {
  return (
  <button
  onClick={onClick}
  style={{
  border: 0,
  background: "transparent",
  color: "var(--xduck-muted, #64748B)",
  padding: "10px 12px",
  minHeight: 44,
  cursor: "pointer",
  fontWeight: 700,
  fontSize: 14,
  borderRadius: 999,
  touchAction: "manipulation",
  }}
  >
  {text}
  </button>
  )
}

function MobileNav({ text, onClick }) {
  return (
  <button
  onClick={onClick}
  style={{
  width: "100%",
  border: 0,
  borderRadius: 12,
  padding: "13px 14px",
  marginBottom: 7,
  background: "rgba(255,255,255,.05)",
  color: "#fff",
  textAlign: "left",
  fontWeight: 700,
  }}
  >
  {text}
  </button>
  )
}

/* =========================================================
  AUTH MODAL
  ========================================================= */

function AuthModal({
  accent,
  mode,
  setMode,
  email,
  setEmail,
  password,
  setPassword,
  username,
  setUsername,
  loading,
  error,
  message,
  login,
  signup,
  forgot,
  close,
}) {
  return (
  <Modal>
  <div
  style={{
  display: "flex",
  justifyContent: "space-between",
  gap: 15,
  }}
  >
  <div>
  <h2
  style={{
  margin: 0,
  }}
  >
  {mode === "login"
  ? "Welcome back"
  : mode === "signup"
  ? "Join X-Duck"
  : "Reset password"}
  </h2>

  <p
  style={{
  color: "#68758A",
  }}
  >
  {mode === "login"
  ? "Login to your X-Duck account."
  : mode === "signup"
  ? "Create your X-Duck account."
  : "Reset your password."}
  </p>
  </div>

  <button
  onClick={close}
  style={{
  ...BTN_SMALL,
  width: 40,
  height: 40,
  padding: 0,
  background: "rgba(255,255,255,.06)",
  color: "#fff",
  }}
  >
  ×
  </button>
  </div>

  {mode === "signup" && (
  <Field
  label="Username"
  value={username}
  onChange={setUsername}
  />
  )}

  <Field label="Email" value={email} onChange={setEmail} />

  {mode !== "forgot" && (
  <Field
  label="Password"
  type="password"
  value={password}
  onChange={setPassword}
  />
  )}

  {error && <ErrorBox>{error}</ErrorBox>}

  {message && <SuccessBox>{message}</SuccessBox>}

  <button
  onClick={() => {
  if (mode === "login") login()

  if (mode === "signup") signup()

  if (mode === "forgot") forgot()
  }}
  disabled={loading}
  style={{
  ...BTN,
  width: "100%",
  marginTop: 18,
  background: accent,
  color: "#07100B",
  }}
  >
  {loading
  ? "Please wait..."
  : mode === "login"
  ? "Login"
  : mode === "signup"
  ? "Create Account"
  : "Send Reset Link"}
  </button>

  <div
  style={{
  textAlign: "center",
  marginTop: 18,
  }}
  >
  {mode === "login" && (
  <>
  <button onClick={() => setMode("forgot")} style={LINK}>
  Forgot password?
  </button>

  <br />

  <button
  onClick={() => setMode("signup")}
  style={{
  ...LINK,
  color: accent,
  }}
  >
  Sign Up
  </button>
  </>
  )}

  {mode !== "login" && (
  <button
  onClick={() => setMode("login")}
  style={{
  ...LINK,
  color: accent,
  }}
  >
  Back to Login
  </button>
  )}
  </div>
  </Modal>
  )
}

/* =========================================================
  MODAL
  ========================================================= */

function Modal({ children }) {
  return (
  <div
  style={{
  position: "fixed",
  inset: 0,
  zIndex: 1200,
  background: "rgba(15,23,42,.45)",
  backdropFilter: "blur(12px)",
  WebkitBackdropFilter: "blur(12px)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: 16,
  animation: "xduck-fade-in 0.22s ease both",
  }}
  >
  <div
  style={{
  width: "min(100%,600px)",
  maxHeight: "calc(100vh - 32px)",
  overflowY: "auto",
  background: "var(--xduck-bg2, #fff)",
  color: "var(--xduck-text, #0F172A)",
  border: "1px solid var(--xduck-border, rgba(15,23,42,.08))",
  borderRadius: 24,
  padding: "clamp(18px, 4vw, 28px)",
  boxShadow: "0 24px 64px rgba(15,23,42,.16)",
  animation:
  "xduck-scale-in 0.28s cubic-bezier(.2,.8,.2,1) both",
  }}
  >
  {children}
  </div>
  </div>
  )
}

/* =========================================================
  FOOTER
  ========================================================= */

function Footer({ logo }) {
  return (
  <footer
  style={{
  borderTop: "1px solid var(--xduck-border, rgba(15,23,42,.08))",
  padding: "35px 24px",
  color: "var(--xduck-muted, #64748B)",
  background: "transparent",
  }}
  >
  <div
  style={{
  width: "100%",
  maxWidth: "100%",
  margin: 0,
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: 20,
  flexWrap: "wrap",
  paddingLeft: "clamp(14px, 3vw, 48px)",
  paddingRight: "clamp(14px, 3vw, 48px)",
  boxSizing: "border-box",
  }}
  >
  <strong
  style={{
  display: "flex",
  alignItems: "center",
  gap: 8,
  color: "#fff",
  }}
  >
  {logo && (
  <img
  src={logo}
  alt=""
  style={{
  width: 28,
  height: 28,
  objectFit: "contain",
  }}
  />
  )}
  X-Duck
  </strong>

  <span>Open source community platform</span>
  </div>
  </footer>
  )
}

/* =========================================================
  HELPERS
  ========================================================= */

function formatSupabaseCreateError(message, table) {
  const msg = message || "Unknown error"
  if (/relation|does not exist|schema cache/i.test(msg)) {
  return `Missing table "${table}" in Supabase — run SQL to create table + RLS first (ยังไม่มีตาราง ${table})`
  }
  if (/row-level security|RLS|policy/i.test(msg)) {
  return `ถูกบล็อกโดย RLS บน ${table} — ต้องเปิด policy ให้ authenticated insert ได้`
  }
  if (/permission|denied|not allowed/i.test(msg)) {
  return `ไม่มีสิทธิ์เขียนลง ${table} — ตรวจ grants / RLS`
  }
  if (/foreign key|violates/i.test(msg)) {
  return `ข้อมูลไม่ถูกต้อง (foreign key) บน ${table}: ${msg}`
  }
  return msg
}

function slugify(value) {
  return value
  .toLowerCase()
  .trim()
  .replace(/[^a-z0-9]+/g, "-")
  .replace(/(^-|-$)/g, "")
}

function safeName(value) {
  return value.replace(/[^a-zA-Z0-9._-]/g, "_")
}

function getExtension(value) {
  return (
  value
  .split(".")
  .pop()
  ?.toLowerCase()
  .replace(/[^a-z0-9]/g, "") || "png"
  )
}

function formatDate(value) {
  return new Date(value).toLocaleString()
}

/* =========================================================
  STYLES
  ========================================================= */

const BTN = {
  border: 0,
  borderRadius: 14,
  padding: "14px 18px",
  minHeight: 48,
  cursor: "pointer",
  fontWeight: 800,
  fontFamily: "inherit",
  fontSize: 16,
  touchAction: "manipulation",
  WebkitTapHighlightColor: "transparent",
}

const LABEL = {
  display: "flex",
  flexDirection: "column",
  gap: 6,
  color: "#8994A8",
  fontSize: 12,
  fontWeight: 700,
}

const BTN_SMALL = {
  border: 0,
  borderRadius: 12,
  padding: "12px 14px",
  minHeight: 44,
  cursor: "pointer",
  fontWeight: 800,
  fontFamily: "inherit",
  fontSize: 15,
  touchAction: "manipulation",
  WebkitTapHighlightColor: "transparent",
}

const INPUT = {
  width: "100%",
  boxSizing: "border-box",
  padding: "14px 16px",
  borderRadius: 14,
  border: "1px solid var(--xduck-border, rgba(15,23,42,.12))",
  background: "var(--xduck-input, #F1F5F9)",
  color: "var(--xduck-text, #0F172A)",
  outline: "none",
  // 16px+ prevents iOS auto-zoom on focus
  fontSize: 16,
  fontFamily: "inherit",
  minHeight: 48,
  touchAction: "manipulation",
  transition:
  "border-color .2s ease, box-shadow .2s ease, background .2s ease",
}

const CARD = {
  padding: 28,
  borderRadius: 22,
  background: "var(--xduck-card, #fff)",
  border: "1px solid var(--xduck-border, rgba(15,23,42,.08))",
  boxShadow: "0 8px 28px rgba(15,23,42,.04)",
}

const DANGER = {
  ...BTN,
  background: "rgba(255,70,70,.1)",
  color: "#FF8D8D",
}

const DANGER_SMALL = {
  ...BTN_SMALL,
  background: "rgba(255,70,70,.1)",
  color: "#FF8D8D",
}

const DANGER_LINK = {
  border: 0,
  padding: 0,
  marginTop: 5,
  background: "transparent",
  color: "#FF8D8D",
  cursor: "pointer",
  fontSize: 11,
}

const LINK = {
  border: 0,
  padding: 0,
  background: "transparent",
  color: "#AAB3C5",
  cursor: "pointer",
  fontWeight: 700,
  fontFamily: "inherit",
}


/* =========================================================
  MOUNT (GitHub Pages)
  ========================================================= */
const rootEl = document.getElementById("root");
if (rootEl) {
  const root = ReactDOM.createRoot(rootEl);
  root.render(React.createElement(XDuck, {}));
} else {
  console.error("X-Duck: #root not found");
}

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import { Terminal, Code, Box, Star, UserCheck, HeartHandshake, FileText, X, ChevronDown } from 'lucide-react';

interface ExperienceItem {
  id: string;
  title: string;
  subtitle?: string;
  description: string[];
  markdownUrl?: string;
  links?: {label: string; url: string}[];
}

interface Category {
  id: string;
  name: string;
  icon: React.ReactNode;
  items: ExperienceItem[];
}

const categories: Category[] = [
  {
    id: "tech-skills",
    name: "技術專長",
    icon: <Code size={20} />,
    items: [
      {
        id: "virtualization",
        title: "虛擬化與雲端基礎架構 (Virtualization & DevOps)",
        description: [
          "**Proxmox VE (PVE) 深度應用**：熟練操作 PVE 虛擬化環境，實現 GPU 直通 (Passthrough) 與 UEFI BIOS 模擬。成功配置虛擬硬碟、模擬特定主機板與硬碟序號（非預設編號），繞過 Apex Legends 等大型遊戲之 Easy Anti-Cheat (EAC) 內核級反作弊的虛擬機禁令。",
          "**容器化技術**：熟練運用 Docker 部署 LiteLLM (串接多個 OpenAI API Token)、Immich (個人相簿) 與 RustDesk (自建中繼站)。具備處理 Proxy 與直連 WebSocket 衍生問題的實戰經驗。",
          "**私有雲建置**：獨立架構 Cloudreve 雲端硬碟、Immich 雲端相簿及 RustDesk 中繼站，優化遠端連線與資料存儲性能。",
          "**虛擬機架設**：架設了 Android 平板、Linux Manjaro、Windows 11 主機供日常使用。Windows 可直通 gpu 且通過 eac 反作弊的虛擬機禁令穩定遊玩 Apex。Linux 系統可直通 gpu 使用 Wayland 桌面環境，並配置了 sunshine 開機自啟動，可透過 moonlight 客戶端遠端連線。"
        ]
      },
      {
        id: "ai-automation",
        title: "人工智慧與自動化 (AI & Automation)",
        description: [
          "**ComfyUI 與模型管理**：具備自學搭建基礎工作流能力，熟練管理 VAE、Checkpoint、CLIP 等模型。能解析並安裝自定義節點，優化 AI 生圖效率。",
          "**聲音模型與訓練**：熟悉 RVC 變聲器，具備訓練及使用 .pth 與 .index 聲音模型之經驗。（獲得人聲 => 降噪 => 提取人聲 => 訓練模型）",
          "**電腦視覺自動化**：利用 YOLOv8 訓練圖像識別模型，透過 Python 與 ADB 協議開發自動化程序（如：音樂遊戲自動通關）。預計可透過 MCP 協議與 Shizuku API（如果需單靠手機）實現移動端 AI Agent。"
        ]
      },
      {
        id: "full-stack",
        title: "全端開發與網頁技術 (Full-Stack Web Development)",
        description: [
          "**前端開發**：擅長製作具備複雜動畫效果與動態交互的響應式網頁，如處理 Web Audio API（音頻可視化）與 GitHub API 數據聯動。",
          "**數據處理工具**：獨立開發 Web 版 NBT 編輯器，用於直接解析並編輯 Minecraft playdata 等二進制數據後儲存回原本的 .dat NBT 格式。",
          "**後端前端與同步**：使用 Python 編寫多目錄、多規則的同步程序與後端程序並編譯成 exe 與 linux 執行檔，支撐大規模遊戲模組（Minecraft mod）環境的一致性。手機端可透過 wine 直接使用。"
        ],
        links: [
          { label: "Modsync V2 專案", url: "https://github.com/Barian0517/modsync-v2" }
        ]
      },
      {
        id: "networking-security",
        title: "網路安全與逆向工程 (Networking & Security)",
        description: [
          "**網路協議與降級實踐**：使用 mitmproxy 攔截手機系統更新封包，模擬私服格式嘗試 Android 15 降級至 14。成功實現修改更新信息並啟動下載程序，目前正致力於繞過使用者 CA 憑證信任限制。（中斷：疑似有 arb 防回滾機制，轉為研究 9008 高通 edl 刷入。）",
          "**伺服器運維**：於 Debian 12 (CLI-only) 環境架構 Minecraft 伺服器，熟練配置 Java/Python 環境、SSH 金鑰安全驗證及 SFTP 檔案傳輸。",
          "**網路配置**：熟悉路由器 DMZ、連接埠映射 (Port Forwarding)，並搭配 Nginx Proxy Manager 與 Namecheap 域名實現多服務（Cloudreve / Immich / MCSManager）的外部訪問。"
        ]
      }
    ]
  },
  {
    id: "featured-projects",
    name: "代表性專案經驗",
    icon: <Star size={20} />,
    items: [
      {
        id: "live-websites",
        title: "個人網站 (Live Projects)",
        description: [
          "**個人主頁**：特色為 動態 GitHub API 讀取、陀螺儀動畫(手機端)、滑鼠動畫(電腦端)、多頁面/子頁面切換內容、外部連結。",
          "**個人介紹**：特色為 全局櫻花特效、音樂播放器、啟動動畫、外部連結。音樂可從後台修改列表。啟動動畫為純程式編寫並含雙擊跳過功能。",
          "**音頻可視化**：可導入音樂檔播放、擷取視窗生成或麥克風輸入生成。",
          "**NBT 編輯器**：可導入玩家 .dat 檔案修改，支持上下一步、多選、各種編輯器功能，可多檔同時修改。",
          "**Minecraft 官網**：多頁面切換、音樂播放器、API 動態擷取服務器檔案列表(模組清單)。",
          "**Ftbquest編輯器**：為 FTB Quests 模組設計的編輯器，可顯示任務圖、任務名稱。",
          "**離線壓縮工具**：特色為 完全離線運作保障隱私、無需上傳檔案至伺服器、透過客戶端直接進行壓縮處理、支援快速的免費壓縮服務。",
          "**伊莉絲 介紹網頁**：專屬原創角色 (OC) 介紹、專為角色量身打造的精美視覺設計、自訂字體排版、動態展示效果與設定說明。",
          "**靜態網頁訂製服務**：溫馨可愛的筆記本風格 UI（包含櫻花粉色調、紙張陰影與網格背景）、專屬的委託說明與方案展示、平滑滾動的響應式網頁設計。",
          "**遊戲王伺服器官網**： YGOPRO 私人伺服器入口、提供客戶端下載與伺服器資訊、玩家社群交流與相關遊戲規則說明。",
          "**YGO 卡片製作器**：自製卡片視覺化管理器、支援中日韓多語系字體渲染（Noto Sans）、自訂卡片數值與屬性編輯、提供玩家方便的製卡與預覽功能。"
        ],
        links: [
          { label: "個人主頁", url: "https://home.barian.moe" },
          { label: "個人介紹", url: "https://barian.moe" },
          { label: "音頻可視化", url: "https://sonicpulse.barian.moe" },
          { label: "NBT 編輯器", url: "https://nbtedit.barian.moe" },
          { label: "Minecraft 官網", url: "https://mcweb.barian.moe" },
          { label: "Ftbquest編輯器", url: "https://ftbquestedit.barian.moe" },
          { label: "離線壓縮工具", url: "https://compress.barian.moe/" },
          { label: "伊莉絲 介紹網頁", url: "https://iris.barian.moe" },
          { label: "靜態網頁訂製服務", url: "https://custom.barian.moe/" },
          { label: "遊戲王伺服器官網", url: "https://ygoproweb.barian.moe/" },
          { label: "YGO 卡片製作器", url: "https://ygocardmaker.barian.moe/" }
        ]
      },
      {
        id: "ai-auto-player",
        title: "音遊自動通關 (YOLOv8 & ADB)",
        description: [
          "**訓練**：在遊戲過程中，擷取了200多張遊戲畫面，透過 X-AnyLabeling 標注 100 張後，生成建議模型快速標注，訓練出共約 500 張遊戲截圖的模型。",
          "**運作思路**：取得畫面 => ai 分析音符 => 運算點擊時機與位置 => 對手機進行點擊。",
          "透過 adb 連結裝置後，使用 Scrcpy 擷取螢幕畫面，扣除視窗邊框輸入給 AI。計算平均延遲後選擇適當判定座標，計算音符下落與手機點擊判定線距離進行預判點擊，該算法用於預估裝置延遲與發散式下落音樂遊戲。"
        ],
        links: [
          { label: "實機錄影展示", url: "https://youtube.com/shorts/UmUqglfOS_E?si=F-3J8INf7KUqGOVI" }
        ]
      },
      {
        id: "modsync",
        title: "服務器模組同步 (Modsync V2)",
        description: [
          "透過向服務器取得需同步的資料夾列表後，自動創建缺少的資料夾。一一比對資料夾內容（檔案名稱與 md5 雙重比對），根據需要進行缺失檔案下載與多餘檔案刪除。",
          "缺失內容高達一定比例時會觸發整包下載功能加快下載速度。設計了容錯邏輯，避免因丟包等不確定因素誤刪。"
        ],
        links: [
          { label: "原始碼", url: "https://github.com/Barian0517/modsync-v2" }
        ]
      },
      {
        id: "mc-server",
        title: "Minecraft 伺服器群組架構",
        description: [
          "基於 Linux (Debian) 環境，從底層 SSH 安全配置、Java/Python 環境搭建、MCSManager 管理平台部署，到前端官網與資料庫（服務器模組清單）聯動，實現全自動化運維。",
          "透過 MySQL / Mariadb 建立資料表進行跨服務器的玩家數據同步。處理過代理環境下 WebSocket 直連連線中斷的複雜網路問題（MCS Manager）。"
        ]
      },
      {
        id: "android-downgrade",
        title: "Android 系統逆向降級實踐",
        description: [
          "針對 ROG Phone 7 閉源環境，難以在安卓 15 環境下解鎖 bootloader 取得 root 權限，也難以透過 raw 線刷包降級。",
          "嘗試模擬 OTA 伺服器，讓手機收到自行修改的更新資訊並下載安裝本地降級包以繞過 Bootloader 鎖定。目前受阻於系統程式不信任使用者安裝的 CA 憑證下載強行中斷，正在對更新機制與憑證信任鏈深入研究。"
        ]
      },
      {
        id: "ai-auto-answering",
        title: "基於 AI 的自動答題系統（娛樂向）",
        description: [
          "為解決線上題目冗長問題，開發了自動答題系統。流程：讀取題目 => 使用 OCR 轉換為文字或發送圖片 => 將內容與約束要求(JSON)發送給 AI => 接收回應，以懸浮窗形式顯示。",
          "支持 OpenAI API (liteLLM) 與 Gemini API，使用自製的離線卡密系統。卡密演算法結合硬體 ID 與到期日綜合加密。解密時透過國家日期 API 取得當前日期比對到期日，使用強制 SSL 驗證防止封包竄改。",
          "程序加密打包成 pyd 加快運行與減少可讀性。"
        ],
        links: [
          { label: "實機錄影", url: "https://vt.tiktok.com/ZSurRnmfE/" }
        ]
      },
      {
        id: "running-services",
        title: "運營中的服務器",
        description: [
          "自行維護了多個生產環境、穩定運營中的實用雲端服務。"
        ],
        links: [
          { label: "MCS 服務器管理", url: "https://mcs.barian.moe" },
          { label: "Immich 相片備份", url: "https://immich.barian.moe" },
          { label: "OpenUI Web", url: "https://openwebui.barian.moe" },
          { label: "Cloudreve 雲端硬碟", url: "https://cloudreve.barian.moe" }
        ]
      }
    ]
  },
  {
    id: "core-skills",
    name: "核心技能清單",
    icon: <Terminal size={20} />,
    items: [
      {
        id: "skills-list",
        title: "專業技能",
        description: [
          "**程式語言**：Python, JavaScript, CSS (Animation), SQL, Bash Shell",
          "**伺服器系統**：Linux (Debian/Ubuntu/Manjaro), Windows, Proxmox VE",
          "**關鍵技術**：Docker, Nginx, YOLOv8, Stable Diffusion, ADB, SSH Tunneling, mitmproxy"
        ]
      }
    ]
  },
  {
    id: "self-eval",
    name: "自我評價",
    icon: <UserCheck size={20} />,
    items: [
      {
        id: "eval",
        title: "技術解決方案導向開發者",
        description: [
          "我是一名「技術解決方案導向」的開發者。我不滿足於依賴現成的工具/服務，當我有需要長期使用的工具/服務時，更傾向於自行搭建一個在自己的主機中，或自行編寫自動化方案。若不存在可本地部屬的服務或現成的工具，便嘗試深入底層邏輯（如網路封包結構）進行修改來達成目標。",
          "具有在面對限制或技術瓶頸時，嘗試尋找替代路徑並實踐驗證的耐心與技術直覺。",
          "當我想做一件事情的時候會優先評估個人能力成功的可能性與所需技術與時間開銷，當我認為我有能力完成時，便會全心專注高效率的學習所需能力並投入研究。",
          "善於 Python 與 AI 搭配使用來完成各式各樣的需求，具有“從創意出發到獨立開發落地”的全流程軟體開發經驗。"
        ]
      }
    ]
  },
  {
    id: "open-source",
    name: "開源貢獻",
    icon: <HeartHandshake size={20} />,
    items: [
      {
        id: "github-contrib",
        title: "開源社群參與",
        description: [
          "對於我有在使用的 GitHub 專案，遇到問題、發現 bug 都會積極收集 log 與進行多次測試總結出詳細的觸發條件，方便作者修復。",
          "過去一年於 GitHub 上貢獻了約 370 次。"
        ],
        links: [
          { label: "GitHub: Barian0517", url: "https://github.com/Barian0517" }
        ]
      }
    ]
  }
];

// --- Markdown Viewer Component ---
const MarkdownArticleViewer = ({ url, onClose }: { url: string, onClose: () => void }) => {
  const [content, setContent] = useState<string>('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(url)
      .then(r => r.text())
      .then(text => { setContent(text); setLoading(false); })
      .catch(() => { setContent('載入文章失敗，請檢查網址或網路狀況。'); setLoading(false); });
  }, [url]);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-12 bg-black/80 backdrop-blur-md"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-4xl max-h-[90vh] bg-[#0b101a] border border-[#00bfff]/30 rounded-xl overflow-hidden flex flex-col shadow-2xl"
        onClick={e => e.stopPropagation()} // Prevent click-through closing
      >
        <div className="flex justify-between items-center px-6 py-4 border-b border-white/10 bg-[#121927]">
          <h3 className="text-[#00bfff] font-bold font-['Rajdhani'] tracking-wide">文章閱讀 (Article Viewer)</h3>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X size={24} />
          </button>
        </div>
        <div className="p-6 overflow-y-auto whitespace-pre-wrap font-['Zen_Maru_Gothic'] text-gray-200">
          {loading ? (
            <div className="flex justify-center items-center h-40">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#00bfff]"></div>
            </div>
          ) : (
            <div className="markdown-body">
              <ReactMarkdown>{content}</ReactMarkdown>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};


const Experience: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>(categories[0].id);
  const [readingMarkdownUrl, setReadingMarkdownUrl] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const currentCategoryData = categories.find(c => c.id === activeCategory);

  const handleCategoryClick = (catId: string) => {
    setActiveCategory(catId);
    setIsMobileMenuOpen(false);
  };

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.15 } }}
      id="experience-page" 
      className="min-h-[calc(100vh-80px)] pt-24 pb-12 px-4 md:px-8 max-w-5xl mx-auto relative z-10 flex flex-col gap-6"
    >
        
        {/* Sticky Header with Title and Menu */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="sticky top-[70px] md:top-[70px] z-40 bg-[#050505]/95 backdrop-blur-md border-b border-white/10 pt-4 pb-3"
        >
          <div className="flex flex-col md:flex-row md:justify-between items-start md:items-end w-full">
            {/* Category Title & Mobile Toggle */}
            <div className="w-full md:w-auto flex justify-between items-end mb-2 md:mb-0 pr-0 md:pr-4">
              <div className="flex-shrink-0">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-1 font-['Zen_Maru_Gothic'] tracking-wide">
                  {currentCategoryData?.name}
                </h2>
                <p className="text-gray-400 font-['Orbitron'] tracking-widest text-xs uppercase">
                   {currentCategoryData?.id.replace('-', ' ')}
                </p>
              </div>
              
              <button 
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden flex items-center gap-2 bg-white/5 border border-white/10 px-3 py-2 rounded-full text-white font-['Zen_Maru_Gothic'] transition-colors hover:bg-white/10"
              >
                <span className="text-xs tracking-widest">目錄</span>
                <ChevronDown size={14} className={`transition-transform duration-300 ${isMobileMenuOpen ? "rotate-180" : ""}`} />
              </button>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex gap-6 overflow-x-auto hide-scrollbar w-auto pb-0">
              {categories.map((cat) => {
                const isActive = activeCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => handleCategoryClick(cat.id)}
                    className={`flex flex-col items-center gap-1 pb-1 transition-all cursor-pointer whitespace-nowrap relative group ${
                      isActive 
                        ? 'text-white' 
                        : 'text-gray-500 hover:text-gray-300'
                    }`}
                  >
                    <span className="text-xs font-medium tracking-widest font-['Zen_Maru_Gothic']">{cat.name}</span>
                    <span 
                      className={`absolute bottom-[-13px] left-0 h-[1px] bg-white transition-all duration-300 ${isActive ? 'w-full' : 'w-0'}`}
                    />
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Mobile Navigation Dropdown */}
          <AnimatePresence>
            {isMobileMenuOpen && (
              <motion.div 
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="md:hidden overflow-hidden flex flex-col pt-4"
              >
                <div className="flex flex-col gap-2 bg-white/[0.02] rounded-xl p-3 border border-white/5">
                  {categories.map((cat) => {
                    const isActive = activeCategory === cat.id;
                    return (
                      <button
                        key={cat.id}
                        onClick={() => handleCategoryClick(cat.id)}
                        className={`text-left px-3 py-2 rounded-lg font-['Zen_Maru_Gothic'] text-sm tracking-widest transition-colors ${
                          isActive 
                            ? 'bg-white/10 text-white font-bold' 
                            : 'text-gray-400 hover:text-gray-200 hover:bg-white/5'
                        }`}
                      >
                        {cat.name}
                      </button>
                    )
                  })}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Content Area */}
        <motion.div 
          key={activeCategory}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex-1 flex flex-col gap-8"
        >
          <div className="grid grid-cols-1 gap-6">
            {currentCategoryData?.items.map((item) => (
              <div key={item.id} className="bg-white/[0.02] border border-white/5 rounded-xl p-6 md:p-8 hover:bg-white/[0.04] transition-colors duration-500">
                <h3 className="text-xl md:text-2xl font-bold text-gray-100 mb-4 font-['Zen_Maru_Gothic'] flex items-center gap-3">
                   {item.title}
                </h3>
                
                {item.subtitle && (
                  <p className="text-gray-400 text-sm font-['Rajdhani'] mb-4">{item.subtitle}</p>
                )}

                <div className="space-y-4 text-gray-400 font-['Zen_Maru_Gothic'] leading-relaxed">
                  {item.description.map((text, i) => {
                    const parts = text.split(/(\*\*.*?\*\*)/g);
                    return (
                      <p key={i} className="text-[15px] md:text-base">
                        {parts.map((p, pIdx) => {
                          if (p.startsWith('**') && p.endsWith('**')) {
                            return <strong key={pIdx} className="text-gray-200 font-medium">{p.slice(2, -2)}</strong>;
                          }
                          return p;
                        })}
                      </p>
                    );
                  })}
                </div>

                {/* Links and Markdown Button */}
                {(item.links || item.markdownUrl) && (
                  <div className="mt-8 pt-6 border-t border-white/5 flex flex-wrap gap-4 items-center">
                    {item.links?.map((link, idx) => (
                      <a 
                        key={idx}
                        href={link.url}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-2 px-4 py-2 border border-white/10 rounded-full hover:bg-white/10 text-sm font-['Zen_Maru_Gothic'] transition-colors text-gray-300 hover:text-white"
                      >
                        <Box size={14} />
                        {link.label}
                      </a>
                    ))}
                    
                    {item.markdownUrl && (
                      <button
                        onClick={() => setReadingMarkdownUrl(item.markdownUrl!)}
                        className="flex items-center gap-2 px-4 py-2 border border-white/10 rounded-full cursor-pointer text-gray-300 text-sm font-['Zen_Maru_Gothic'] hover:bg-white/10 hover:text-white transition-colors"
                      >
                        <FileText size={14} />
                        閱讀文章
                      </button>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </motion.div>

        {/* Markdown Viewer Modal */}
        <AnimatePresence>
          {readingMarkdownUrl && (
            <MarkdownArticleViewer 
              url={readingMarkdownUrl} 
              onClose={() => setReadingMarkdownUrl(null)} 
            />
          )}
        </AnimatePresence>

      </motion.div>
  );
};

export default Experience;

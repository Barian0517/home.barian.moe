import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Monitor, Tag, Cpu, Layout, Wrench, AppWindow, Terminal, ServerCog } from 'lucide-react';
import { WorkshopItem } from '../types';
import GlitchText from './GlitchText';

// ==========================================
// DATA DEFINITIONS
// ==========================================

// 1. 網頁工具 (Web Tools) - 原 Functional Items
const webToolItems: WorkshopItem[] = [
  {
    id: 101,
    title: "MC NBT 玩家資料編輯器",
    description: "方便快速的線上 NBT 資料編輯工具，支援上傳與修改 Minecraft 玩家存檔數據，簡化管理流程，當服主只有手機時也能透過網展處理玩家數據相關問題。",
    imageUrl: "", 
    images: ["https://cloudreve.barian.moe/f/BDDSl/nbteditor.png", "https://cloudreve.barian.moe/f/mZ4FB/nbteditor2.png"],
    linkUrl: "https://nbtedit.barian.moe",
    tags: ["Tool", "NBT Parser", "Utility"],
    date: "2026"
  },
  {
    id: 102,
    title: "SonicPulse 音訊視覺化",
    description: "氛圍感即時音訊視覺化產生器，利用 Web Audio API 將聲音轉化為動態粒子與波動效果，並提供了背景與動畫的自訂。",
    imageUrl: "", 
    images: ["https://cloudreve.barian.moe/f/x1mFb/sonicpulse.png", "https://cloudreve.barian.moe/f/v5dsl/sonicpulse2.png", "https://cloudreve.barian.moe/f/epdte/sonicpulse3.png"],
    linkUrl: "https://sonicpulse.barian.moe",
    tags: ["Web Audio API", "Canvas", "Visualization"],
    date: "2025"
  },
  {
    id: 103,
    title: "FTB Quest 編輯器",
    description: "針對 FTB Quests 模組設計的線上編輯器，提供圖形化介面以協助模組包作者快速製作任務樹。(開發中)",
    imageUrl: "", 
    images: ["https://cloudreve.barian.moe/f/0mWu2/ftbquest.png", "https://cloudreve.barian.moe/f/arosl/ftbquest2.png"],
    linkUrl: "https://ftbquestedit.barian.moe",
    tags: ["Modding", "Editor", "Efficiency"],
    date: "2026"
  },
  {
    id: 104,
    title: "離線壓縮工具",
    description: "一個免費的離線壓縮工具 無後端運行 免登入 本地上傳 保障資料安全",
    imageUrl: "", 
    images: ["https://cloudreve.barian.moe/f/6rDTB/compress.png", "https://cloudreve.barian.moe/f/lEOFR/compress2.png"],
    linkUrl: "https://compress.barian.moe/",
    tags: ["Tool", "Compression", "Offline"],
    date: "2026"
  }
];

// 2. 靜態網頁 (Static Web) - 原 Display Items
const staticWebItems: WorkshopItem[] = [
  {
    id: 1,
    title: "個人形象網站 - 幽影櫻",
    description: "基於 React + Vite + Tailwind CSS 打造的賽博風格網站，包含粒子特效與互動動畫，用來通往我的其他網站。",
    imageUrl: "", 
    images: ["https://cloudreve.barian.moe/f/epbSe/home.png", "https://cloudreve.barian.moe/f/arJtl/home2.png"],
    linkUrl: "https://home.barian.moe",
    tags: ["React", "UI/UX", "Animation"],
    date: "2025"
  },
  {
    id: 2,
    title: "自我介紹主頁",
    description: "個人介紹頁面，作為網路身份的名片，讓人容易了解我",
    imageUrl: "", 
    images: ["https://cloudreve.barian.moe/f/0mLC2/barian.png"],
    linkUrl: "https://barian.moe",
    tags: ["HTML", "CSS", "Portfolio"],
    date: "2025"
  },
  {
    id: 3,
    title: "Minecraft 伺服器官網",
    description: "專為私人 Minecraft 伺服器設計的官方網站，提供伺服器資訊介紹與社群連結。",
    imageUrl: "", 
    images: ["https://cloudreve.barian.moe/f/6rAuB/mcweb.png", "https://cloudreve.barian.moe/f/lEpTR/mcweb2.png", "https://cloudreve.barian.moe/f/JpXTn/mcweb3.png", "https://cloudreve.barian.moe/f/ZDnUQ/mcweb4.png"],
    linkUrl: "https://mcweb.barian.moe",
    tags: ["Web Design", "Minecraft", "Docs"],
    date: "2025"
  },
  {
    id: 4,
    title: "伊莉絲 介紹網頁",
    description: "幽影櫻的原創OC 伊莉絲 的介紹網頁",
    imageUrl: "", 
    images: ["https://cloudreve.barian.moe/f/x1Pib/iris.png"],
    linkUrl: "https://iris.barian.moe",
    tags: ["OC", "Character", "Portfolio"],
    date: "2026"
  },
  {
    id: 5,
    title: "靜態網頁訂製服務",
    description: "你也想要一個這樣的網站嗎?前往以查看詳情，有需要的話聯繫我訂製吧!",
    imageUrl: "", 
    images: ["https://cloudreve.barian.moe/f/25QhQ/custom.png", "https://cloudreve.barian.moe/f/v5atl/custom2.png"],
    linkUrl: "https://custom.barian.moe/",
    tags: ["Service", "Web Design", "Portfolio"],
    date: "2026"
  },
  {
    id: 6,
    title: "遊戲王伺服器官網",
    description: "遊戲王 YGOPro 伺服器的官方網站，提供下載、教學與相關資訊。",
    imageUrl: "", 
    images: ["https://cloudreve.barian.moe/f/jaNfb/ygoproweb.png", "https://cloudreve.barian.moe/f/JpeFn/ygoproweb2.png", "https://cloudreve.barian.moe/f/BDlil/ygoproweb3.png", "https://cloudreve.barian.moe/f/mZ2TB/ygoproweb4.png"],
    linkUrl: "https://ygoproweb.barian.moe/",
    tags: ["Web Design", "YGOPro", "Docs"],
    date: "2026"
  }
];

// 3. 程式應用 (Applications) - 新增分類
const appItems: WorkshopItem[] = [
  {
    id: 201,
    title: "ModSync v2",
    description: "Minecraft 模組同步工具，自動化檢測與更新客戶端模組，確保與伺服器版本一致，解決版本不相容問題。",
    imageUrl: "", // 如果有截圖可以填入
    linkUrl: "https://github.com/Barian0517/modsync-v2",
    tags: ["Python", "Automation", "CLI Tool"],
    date: "2025"
  },
  {
    id: 202,
    title: "SonicPulse 音訊視覺化 APP",
    description: "氛圍感即時音訊視覺化產生器的應用程式版本。",
    imageUrl: "", 
    linkUrl: "https://github.com/Barian0517/sonicpulse-app",
    tags: ["App", "Audio", "Visualization"],
    date: "2026"
  }
];

// 4. 前後端網頁 (Full Stack) - 新增分類
const fullstackItems: WorkshopItem[] = [
  {
    id: 301,
    title: "YGO 卡片製作器",
    description: "一個可以自定義製作與生成遊戲王卡片的網頁工具，支援高解析度匯出與多種卡片模版。",
    imageUrl: "", 
    images: ["https://cloudreve.barian.moe/f/P8vcE/cardedit.png", "https://cloudreve.barian.moe/f/L60iz/cardedit2.png", "https://cloudreve.barian.moe/f/npJFL/cardedit3.png"],
    linkUrl: "https://ygocardmaker.barian.moe/",
    tags: ["Full Stack", "YGO", "Tool"],
    date: "2026"
  }
];

type CategoryType = 'web-tools' | 'static-web' | 'apps' | 'full-stack';

const Workshop: React.FC = () => {
  const [activeTab, setActiveTab] = useState<CategoryType>('web-tools');

  // Helper to get current items
  const getCurrentItems = () => {
    switch (activeTab) {
      case 'web-tools': return webToolItems;
      case 'static-web': return staticWebItems;
      case 'apps': return appItems;
      case 'full-stack': return fullstackItems;
      default: return [];
    }
  };

  // Helper for color themes
  const getThemeColor = (tab: CategoryType) => {
    switch (tab) {
      case 'web-tools': return '#ffbd00'; // Yellow
      case 'static-web': return '#00bfff'; // Blue
      case 'apps': return '#ff00ff'; // Purple/Pink
      case 'full-stack': return '#10b981'; // Emerald
    }
  };

  const themeColor = getThemeColor(activeTab);

  return (
    <motion.div
      id="workshop-page" 
      className="min-h-screen p-4 pt-28 pb-20 relative z-10 overflow-y-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="mb-8 flex flex-col md:flex-row items-start md:items-center justify-between border-b border-white/10 pb-4 gap-4">
           <h2 className="text-3xl md:text-4xl font-bold text-white font-['Orbitron'] tracking-wider">
            <GlitchText text="我的工坊" />
            <span 
              className="text-lg ml-4 font-['Rajdhani'] opacity-70 transition-colors duration-500"
              style={{ color: themeColor }}
            >
              / WORKSHOP
            </span>
          </h2>
          
          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2 md:gap-4">
            <TabButton 
              label="網頁工具" 
              subLabel="WEB TOOLS"
              isActive={activeTab === 'web-tools'} 
              onClick={() => setActiveTab('web-tools')}
              icon={<Wrench size={16} />}
              color="#ffbd00"
            />
            <TabButton 
              label="靜態網頁" 
              subLabel="STATIC WEB"
              isActive={activeTab === 'static-web'} 
              onClick={() => setActiveTab('static-web')}
              icon={<Layout size={16} />}
              color="#00bfff"
            />
            <TabButton 
              label="前後端網頁" 
              subLabel="FULL STACK"
              isActive={activeTab === 'full-stack'} 
              onClick={() => setActiveTab('full-stack')}
              icon={<ServerCog size={16} />}
              color="#10b981"
            />
            <TabButton 
              label="程式應用" 
              subLabel="APPLICATIONS"
              isActive={activeTab === 'apps'} 
              onClick={() => setActiveTab('apps')}
              icon={<Terminal size={16} />}
              color="#ff00ff"
            />
          </div>
        </div>

        {/* Content Grid */}
        <div className="min-h-[400px]">
          {/* 
            Fixed: Added explicit exit prop and removed layoutId from children 
            to ensure AnimatePresence in App.tsx can successfully unmount this component.
          */}
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20, transition: { duration: 0.1 } }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {getCurrentItems().map((item, index) => (
              <WorkshopCard 
                key={item.id} 
                item={item} 
                index={index} 
                themeColor={themeColor}
                category={activeTab}
              />
            ))}
          </motion.div>
        </div>

      </div>
    </motion.div>
  );
};

// ==========================================
// SUB COMPONENTS
// ==========================================

interface TabButtonProps {
  label: string;
  subLabel: string;
  isActive: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  color: string;
}

const TabButton: React.FC<TabButtonProps> = ({ label, subLabel, isActive, onClick, icon, color }) => (
  <button
    onClick={onClick}
    className={`relative px-4 py-2 md:px-6 md:py-3 rounded-lg border flex items-center gap-2 transition-all duration-300 group overflow-hidden ${
      isActive ? 'bg-white/10' : 'bg-transparent hover:bg-white/5'
    }`}
    style={{
      borderColor: isActive ? color : 'rgba(255,255,255,0.1)',
      boxShadow: isActive ? `0 0 15px ${color}40` : 'none'
    }}
  >
    <span style={{ color: isActive ? color : '#9ca3af' }} className="transition-colors duration-300">
      {icon}
    </span>
    <div className="flex flex-col items-start">
      <span 
        className={`font-['Zen_Maru_Gothic'] font-bold text-sm md:text-base transition-colors duration-300 ${isActive ? 'text-white' : 'text-gray-400 group-hover:text-gray-200'}`}
      >
        {label}
      </span>
      <span className="text-[10px] font-['Rajdhani'] text-gray-500 tracking-wider hidden md:block">
        {subLabel}
      </span>
    </div>
    
    {/* Active Indicator Line - Removed layoutId to prevent unmount hangs */}
    {isActive && (
      <motion.div 
        className="absolute bottom-0 left-0 w-full h-[2px]"
        style={{ backgroundColor: color }}
        initial={{ opacity: 0, scaleX: 0 }}
        animate={{ opacity: 1, scaleX: 1 }}
        transition={{ duration: 0.3 }}
      />
    )}
  </button>
);

const SlantedImageGallery = ({ images }: { images: string[] }) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div 
      className="flex w-full h-full overflow-hidden bg-[#0f1623]"
      onMouseLeave={() => setHoveredIndex(null)}
    >
      {images.map((img, i) => {
        let clipPath = "";
        let marginLeft = "";
        const isFirst = i === 0;
        const isLast = i === images.length - 1;
        const isOnly = images.length === 1;

        if (isOnly) {
           clipPath = "none";
           marginLeft = "0";
        } else if (isFirst) {
           clipPath = "polygon(0 0, 100% 0, calc(100% - 20px) 100%, 0% 100%)";
           marginLeft = "0";
        } else if (isLast) {
           clipPath = "polygon(20px 0, 100% 0, 100% 100%, 0% 100%)";
           marginLeft = "-10px";
        } else {
           clipPath = "polygon(20px 0, 100% 0, calc(100% - 20px) 100%, 0% 100%)";
           marginLeft = "-10px";
        }

        const isHovered = hoveredIndex === i;
        const anyHovered = hoveredIndex !== null;
        
        let flexValue = 1;
        if (isHovered) {
          flexValue = 3;
        } else if (!anyHovered && isFirst) {
          flexValue = 3;
        }

        return (
          <div
            key={i}
            onMouseEnter={() => setHoveredIndex(i)}
            className="relative h-full transition-all duration-500 ease-in-out cursor-pointer group/item"
            style={{
              clipPath,
              marginLeft,
              flex: flexValue
            }}
          >
            <div 
              className={`absolute inset-0 transition-colors duration-500 z-10 pointer-events-none ${
                isHovered ? 'bg-transparent' : anyHovered ? 'bg-black/60' : 'bg-black/20'
              }`} 
            />
            <img 
              src={img} 
              alt={`preview-${i}`} 
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover/item:scale-110"
              style={{ objectPosition: 'center' }}
            />
          </div>
        );
      })}
    </div>
  );
};

const WorkshopCard: React.FC<{ 
  item: WorkshopItem; 
  index: number; 
  themeColor: string;
  category: CategoryType;
}> = ({ item, index, themeColor, category }) => {
  const shadowColor = `${themeColor}26`; // 15% opacity hex roughly

  // Icon selection based on category
  const getIcon = () => {
    switch (category) {
      case 'web-tools': return <Cpu size={48} color={themeColor} className="opacity-30 mb-2 group-hover:opacity-100 transition-opacity duration-500" />;
      case 'static-web': return <Monitor size={48} color={themeColor} className="opacity-30 mb-2 group-hover:opacity-100 transition-opacity duration-500" />;
      case 'apps': return <AppWindow size={48} color={themeColor} className="opacity-30 mb-2 group-hover:opacity-100 transition-opacity duration-500" />;
      case 'full-stack': return <ServerCog size={48} color={themeColor} className="opacity-30 mb-2 group-hover:opacity-100 transition-opacity duration-500" />;
    }
  };

  const getLabel = () => {
    switch (category) {
      case 'web-tools': return 'WEB TOOL';
      case 'static-web': return 'STATIC SITE';
      case 'apps': return 'APPLICATION';
      case 'full-stack': return 'FULL STACK';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.1 }}
      className="group relative bg-[#1a2233]/60 backdrop-blur-md border border-white/5 rounded-xl overflow-hidden transition-all duration-300 flex flex-col h-full hover:scale-[1.02]"
      style={{
        borderColor: `rgba(255,255,255,0.05)`
      }}
    >
      {/* Hover Glow Effect */}
      <div 
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{ boxShadow: `inset 0 0 20px ${shadowColor}, 0 0 20px ${shadowColor}` }}
      />

      {/* Image / Preview Area */}
      <div className="h-48 w-full overflow-hidden bg-[#0f1623] relative group-hover:shadow-inner transition-all">
        {item.images && item.images.length > 0 ? (
          <SlantedImageGallery images={item.images} />
        ) : item.imageUrl ? (
          <img 
            src={item.imageUrl} 
            alt={item.title} 
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
        ) : (
          // Placeholder pattern
          <div 
            className="w-full h-full flex flex-col items-center justify-center relative"
            style={{
               background: `linear-gradient(135deg, #1a2233 0%, #0b0f17 100%)`
            }}
          >
             <div className="absolute inset-0 opacity-10" style={{
                 backgroundImage: `radial-gradient(circle at 2px 2px, ${themeColor} 1px, transparent 0)`,
                 backgroundSize: '24px 24px'
             }}></div>
             
             {getIcon()}
             
             <span className="text-white/20 font-['Orbitron'] text-sm">
                {getLabel()}
             </span>
          </div>
        )}
        
        {/* Date Badge */}
        {item.date && (
          <div 
            className="absolute top-3 right-3 bg-black/70 backdrop-blur-sm border border-white/10 px-3 py-1 rounded-full text-xs font-bold shadow-lg font-['Orbitron']"
            style={{ color: themeColor }}
          >
            {item.date}
          </div>
        )}
      </div>

      {/* Content Area */}
      <div className="p-6 flex-1 flex flex-col">
        <h3 
            className="text-xl font-bold text-white mb-2 font-['Zen_Maru_Gothic'] transition-colors"
            style={{ textShadow: '0 0 10px rgba(0,0,0,0.5)' }}
        >
            <span className="group-hover:text-white transition-colors" style={{ color: 'white' }}>
                {item.title}
            </span>
        </h3>
        
        <p className="text-gray-400 text-sm leading-relaxed mb-6 flex-1">
          {item.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-6">
            {item.tags.map(tag => (
                <div 
                    key={tag} 
                    className="flex items-center gap-1 text-[10px] px-2 py-1 rounded border bg-opacity-10"
                    style={{ 
                        borderColor: `${themeColor}40`, 
                        backgroundColor: `${themeColor}10`,
                        color: themeColor
                    }}
                >
                    <Tag size={10} />
                    {tag}
                </div>
            ))}
        </div>

        {/* Action Buttons */}
        <div className="mt-auto">
            <a 
              href={item.linkUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full py-3 rounded-lg transition-all duration-300 font-bold border border-white/5 bg-white/5 text-white hover:text-black hover:shadow-lg"
              onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = themeColor;
                  e.currentTarget.style.boxShadow = `0 0 15px ${themeColor}60`;
              }}
              onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.05)';
                  e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <ExternalLink size={18} />
              {category === 'apps' ? '查看專案' : (category === 'static-web' || category === 'full-stack' ? '訪問網站' : '啟動工具')}
            </a>
        </div>
      </div>
    </motion.div>
  );
};

export default Workshop;
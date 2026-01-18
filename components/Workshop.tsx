import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Monitor, Tag, Cpu, Layout, Wrench } from 'lucide-react';
import { WorkshopItem } from '../types';
import GlitchText from './GlitchText';

// 展示類作品資料
const displayItems: WorkshopItem[] = [
  {
    id: 1,
    title: "個人形象網站 - 幽影櫻",
    description: "基於 React + Vite + Tailwind CSS 打造的賽博風格網站，包含粒子特效與互動動畫，用來通往我的其他網站。",
    imageUrl: "", 
    linkUrl: "https://home.barian.moe",
    tags: ["React", "UI/UX", "Animation"],
    date: "2025"
  },
  {
    id: 2,
    title: "自我介紹主頁",
    description: "個人介紹頁面，作為網路身份的名片，讓人容易了解我",
    imageUrl: "", 
    linkUrl: "https://barian.moe",
    tags: ["HTML", "CSS", "Portfolio"],
    date: "2025"
  },
  {
    id: 3,
    title: "Minecraft 伺服器官網",
    description: "專為私人 Minecraft 伺服器設計的官方網站，提供伺服器資訊介紹與社群連結。",
    imageUrl: "", 
    linkUrl: "https://mcweb.barian.moe",
    tags: ["Web Design", "Minecraft", "Docs"],
    date: "2025"
  }
];

// 功能類工具資料
const functionalItems: WorkshopItem[] = [
  {
    id: 101,
    title: "MC NBT 玩家資料編輯器",
    description: "方便快速的線上 NBT 資料編輯工具，支援上傳與修改 Minecraft 玩家存檔數據，簡化管理流程，當服主只有手機時也能透過網展處理玩家數據相關問題。",
    imageUrl: "", 
    linkUrl: "https://nbtedit.barian.moe",
    tags: ["Tool", "NBT Parser", "Utility"],
    date: "2026"
  },
  {
    id: 102,
    title: "SonicPulse 音訊視覺化",
    description: "氛圍感即時音訊視覺化產生器，利用 Web Audio API 將聲音轉化為動態粒子與波動效果，並提供了背景與動畫的自訂。",
    imageUrl: "", 
    linkUrl: "https://sonicpulse.barian.moe",
    tags: ["Web Audio API", "Canvas", "Visualization"],
    date: "2025"
  },
  {
    id: 103,
    title: "FTB Quest 編輯器",
    description: "針對 FTB Quests 模組設計的線上編輯器，提供圖形化介面以協助模組包作者快速製作任務樹。(開發中)",
    imageUrl: "", 
    linkUrl: "https://ftbquestedit.barian.moe",
    tags: ["Modding", "Editor", "Efficiency"],
    date: "2026"
  }
];

const Workshop: React.FC = () => {
  return (
    <div className="min-h-screen p-4 pt-28 pb-20 relative z-10 overflow-y-auto">
      <div className="max-w-7xl mx-auto">
        <div className="mb-10 flex items-center justify-between border-b border-white/10 pb-4">
           <h2 className="text-3xl md:text-4xl font-bold text-white font-['Orbitron'] tracking-wider">
            <GlitchText text="我的工坊" />
            <span className="text-[#ff00ff] text-lg ml-4 font-['Rajdhani'] opacity-70">/ WEB WORKSHOP</span>
          </h2>
          <div className="text-[#ff00ff] font-['Rajdhani'] hidden md:block">
             DESIGN & DEV
          </div>
        </div>

        {/* Section 1: Display (展示類) */}
        <div className="mb-16">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3 mb-6"
          >
            <Layout className="text-[#00bfff]" size={24} />
            <h3 className="text-2xl font-bold text-white font-['Zen_Maru_Gothic']">
              展示類作品 <span className="text-sm text-gray-500 font-['Rajdhani'] ml-2">// SHOWCASE</span>
            </h3>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayItems.map((item, index) => (
              <WorkshopCard key={item.id} item={item} index={index} type="display" />
            ))}
          </div>
        </div>

        {/* Section 2: Functional (功能類) */}
        <div>
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="flex items-center gap-3 mb-6"
          >
            <Wrench className="text-[#ffbd00]" size={24} />
            <h3 className="text-2xl font-bold text-white font-['Zen_Maru_Gothic']">
              功能類工具 <span className="text-sm text-gray-500 font-['Rajdhani'] ml-2">// UTILITIES & APPS</span>
            </h3>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {functionalItems.map((item, index) => (
              <WorkshopCard key={item.id} item={item} index={index} type="functional" />
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

const WorkshopCard: React.FC<{ item: WorkshopItem; index: number; type: 'display' | 'functional' }> = ({ item, index, type }) => {
  // Define theme colors based on type
  const themeColor = type === 'display' ? '#00bfff' : '#ffbd00';
  const shadowColor = type === 'display' ? 'rgba(0,191,255,0.15)' : 'rgba(255,189,0,0.15)';
  const hoverShadowColor = type === 'display' ? 'rgba(0,191,255,0.2)' : 'rgba(255,189,0,0.2)';

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="group relative bg-[#1a2233]/60 backdrop-blur-md border border-white/5 rounded-xl overflow-hidden transition-all duration-300 flex flex-col h-full hover:scale-[1.02]"
      style={{
        borderColor: `rgba(255,255,255,0.05)`
      }}
    >
      {/* Hover Glow Effect via Inline Style for dynamic color */}
      <div 
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{ boxShadow: `inset 0 0 20px ${hoverShadowColor}, 0 0 20px ${shadowColor}` }}
      />

      {/* Image / Preview Area */}
      <div className="h-48 w-full overflow-hidden bg-[#0f1623] relative group-hover:shadow-inner transition-all">
        {item.imageUrl ? (
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
             
             {type === 'display' ? (
                <Monitor size={48} color={themeColor} className="opacity-30 mb-2 group-hover:opacity-100 transition-opacity duration-500" />
             ) : (
                <Cpu size={48} color={themeColor} className="opacity-30 mb-2 group-hover:opacity-100 transition-opacity duration-500" />
             )}
             
             <span className="text-white/20 font-['Orbitron'] text-sm">
                {type === 'display' ? 'WEB PREVIEW' : 'APP SYSTEM'}
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
              {type === 'display' ? '訪問網站' : '啟動工具'}
            </a>
        </div>
      </div>
    </motion.div>
  );
};

export default Workshop;
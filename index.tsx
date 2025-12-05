
import React, { useState, useEffect, useRef } from 'react';
import { createRoot } from 'react-dom/client';

// --- Icons (Inline SVG for zero dependencies) ---
const Icons = {
    Plus: () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>,
    Trash: () => <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>,
    Edit: () => <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>,
    Settings: () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>,
    ExternalLink: () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>,
    Rocket: () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9a6.97 6.97 0 0 0 1.5 4.33L5 15.83a2 2 0 0 0 0 2.82l.83.84a2 2 0 0 0 2.82 0l2.5-2.5A6.97 6.97 0 0 0 15 18H9"></path><path d="M3 15l2-2"></path><path d="M15 18l-2 2"></path><path d="M12.4 12.4l10.25-8.8a1 1 0 0 1 1.37 1.35l-8.82 10.28a7 7 0 1 1-5.6-2.12l.8.7z"></path></svg>,
    Globe: () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>,
    ArrowUp: () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="19" x2="12" y2="5"></line><polyline points="5 12 12 5 19 12"></polyline></svg>,
    ArrowDown: () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><polyline points="19 12 12 19 5 12"></polyline></svg>,
    Check: () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>,
    Menu: () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
};

// --- Types ---
interface Link {
    id: string;
    title: string;
    url: string;
    description: string;
    category: string;
}

interface SiteConfig {
    title: string;
}

const DEFAULT_SITE_CONFIG: SiteConfig = {
    title: '星际导航'
};

const DEFAULT_CATEGORIES = [
    '人工智能',
    '开发工具',
    '媒体娱乐',
    '知识社区',
    '常用工具'
];

const DEFAULT_LINKS: Link[] = [
    { id: '1', title: 'Gemini AI', url: 'https://gemini.google.com', description: '谷歌最强人工智能助手。', category: '人工智能' },
    { id: '2', title: 'GitHub', url: 'https://github.com', description: '全球最大的代码托管平台。', category: '开发工具' },
    { id: '3', title: '哔哩哔哩', url: 'https://www.bilibili.com', description: '国内知名的视频弹幕网站。', category: '媒体娱乐' },
    { id: '4', title: 'YouTube', url: 'https://youtube.com', description: '世界上最大的视频分享网站。', category: '媒体娱乐' },
    { id: '5', title: '知乎', url: 'https://www.zhihu.com', description: '有问题，就会有答案。', category: '知识社区' },
    { id: '6', title: 'Gmail', url: 'https://mail.google.com', description: '安全、智能、易用的电子邮件。', category: '常用工具' },
    { id: '7', title: 'Vercel', url: 'https://vercel.com', description: '开发、预览、发布。', category: '开发工具' },
    { id: '8', title: '掘金', url: 'https://juejin.cn', description: '帮助开发者成长的社区。', category: '知识社区' },
];

// --- Starfield Component ---
const Starfield = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let width = window.innerWidth;
        let height = window.innerHeight;
        canvas.width = width;
        canvas.height = height;

        const stars: { x: number; y: number; z: number }[] = [];
        const numStars = 800;
        const speed = 2.0;

        for (let i = 0; i < numStars; i++) {
            stars.push({
                x: Math.random() * width - width / 2,
                y: Math.random() * height - height / 2,
                z: Math.random() * width
            });
        }

        const animate = () => {
            ctx.fillStyle = '#05070A';
            ctx.fillRect(0, 0, width, height);

            const cx = width / 2;
            const cy = height / 2;

            for (let i = 0; i < numStars; i++) {
                let star = stars[i];
                star.z -= speed;

                if (star.z <= 0) {
                    star.z = width;
                    star.x = Math.random() * width - width / 2;
                    star.y = Math.random() * height - height / 2;
                }

                const x = (star.x / star.z) * width + cx;
                const y = (star.y / star.z) * width + cy;
                const radius = Math.max(0.1, (1 - star.z / width) * 2.5);
                const alpha = (1 - star.z / width);

                ctx.beginPath();
                ctx.fillStyle = `rgba(200, 240, 255, ${alpha})`;
                ctx.arc(x, y, radius, 0, Math.PI * 2);
                ctx.fill();
            }
            requestAnimationFrame(animate);
        };

        const handleResize = () => {
            width = window.innerWidth;
            height = window.innerHeight;
            canvas.width = width;
            canvas.height = height;
        };

        window.addEventListener('resize', handleResize);
        const animId = requestAnimationFrame(animate);

        return () => {
            window.removeEventListener('resize', handleResize);
            cancelAnimationFrame(animId);
        };
    }, []);

    return <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full -z-10" />;
};

// --- Main Application ---
const App = () => {
    // --- State ---
    const [links, setLinks] = useState<Link[]>([]);
    const [categories, setCategories] = useState<string[]>([]);
    const [siteConfig, setSiteConfig] = useState<SiteConfig>(DEFAULT_SITE_CONFIG);
    const [isAdmin, setIsAdmin] = useState(false);
    
    // Modals
    const [isLinkModalOpen, setIsLinkModalOpen] = useState(false);
    const [isConfigModalOpen, setIsConfigModalOpen] = useState(false);
    
    // Data editing
    const [editingLink, setEditingLink] = useState<Link | null>(null);
    const [linkFormData, setLinkFormData] = useState({ title: '', url: '', description: '', category: '' });
    
    // Config editing
    const [configTab, setConfigTab] = useState<'general' | 'categories'>('general');
    const [configTitle, setConfigTitle] = useState('');
    const [tempCategories, setTempCategories] = useState<string[]>([]);
    const [newCategoryName, setNewCategoryName] = useState('');
    const [editingCategoryIndex, setEditingCategoryIndex] = useState<number | null>(null);
    const [editingCategoryValue, setEditingCategoryValue] = useState('');

    const [currentTime, setCurrentTime] = useState(new Date());

    // --- Persistence ---
    useEffect(() => {
        const savedLinks = localStorage.getItem('astro-links');
        const savedConfig = localStorage.getItem('astro-config');
        const savedCategories = localStorage.getItem('astro-categories');
        
        if (savedLinks) {
            setLinks(JSON.parse(savedLinks));
        } else {
            setLinks(DEFAULT_LINKS);
        }

        if (savedConfig) {
            setSiteConfig(JSON.parse(savedConfig));
        }

        if (savedCategories) {
            setCategories(JSON.parse(savedCategories));
        } else {
            setCategories(DEFAULT_CATEGORIES);
        }
    }, []);

    useEffect(() => {
        if (links.length > 0) localStorage.setItem('astro-links', JSON.stringify(links));
    }, [links]);

    useEffect(() => {
        localStorage.setItem('astro-config', JSON.stringify(siteConfig));
    }, [siteConfig]);

    useEffect(() => {
        if (categories.length > 0) localStorage.setItem('astro-categories', JSON.stringify(categories));
    }, [categories]);

    // Clock
    useEffect(() => {
        const timer = setInterval(() => setCurrentTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    // --- Handlers: Site Config ---
    const toggleAdmin = () => {
        if (!isAdmin) {
            const pass = prompt("请输入指令代码 (输入 'admin'):", "");
            if (pass === 'admin') setIsAdmin(true);
        } else {
            setIsAdmin(false);
        }
    };

    const openConfigModal = () => {
        setConfigTitle(siteConfig.title);
        setTempCategories([...categories]);
        setConfigTab('general');
        setIsConfigModalOpen(true);
    };

    const saveConfig = () => {
        setSiteConfig({ ...siteConfig, title: configTitle });
        
        // Handle category updates: if a category was renamed, we might need to update links? 
        // For simplicity, we just save the list structure for now. 
        // If we wanted robust renaming, we would map old names to new names.
        // Here we just replace the category list structure.
        setCategories(tempCategories);
        setIsConfigModalOpen(false);
    };

    // Category Management Handlers
    const handleCategoryMove = (index: number, direction: 'up' | 'down') => {
        const newCats = [...tempCategories];
        if (direction === 'up' && index > 0) {
            [newCats[index], newCats[index - 1]] = [newCats[index - 1], newCats[index]];
        } else if (direction === 'down' && index < newCats.length - 1) {
            [newCats[index], newCats[index + 1]] = [newCats[index + 1], newCats[index]];
        }
        setTempCategories(newCats);
    };

    const handleCategoryDelete = (index: number) => {
        if (confirm('确定要删除此分类吗？该分类下的链接将变为“未分类”。')) {
            const deletedCat = tempCategories[index];
            setTempCategories(tempCategories.filter((_, i) => i !== index));
            // Update links to remove this category (visual only until saved?)
            // We should strictly separate config save from link updates, but for UX, let's auto-update links
            // when the config is saved. *Correction*: Complex state sync. 
            // Better approach: Update `links` state immediately when saving config if categories changed.
            // But here we are just manipulating `tempCategories`.
            // Let's defer link updates to the `saveConfig` function.
        }
    };

    const handleCategoryAdd = () => {
        if (newCategoryName.trim() && !tempCategories.includes(newCategoryName.trim())) {
            setTempCategories([...tempCategories, newCategoryName.trim()]);
            setNewCategoryName('');
        }
    };

    const startEditCategory = (index: number) => {
        setEditingCategoryIndex(index);
        setEditingCategoryValue(tempCategories[index]);
    };

    const saveEditCategory = (index: number) => {
        const oldName = tempCategories[index];
        const newName = editingCategoryValue.trim();
        
        if (newName && newName !== oldName) {
            // Update list
            const newCats = [...tempCategories];
            newCats[index] = newName;
            setTempCategories(newCats);
            
            // Update links immediately? No, wait for Save button.
            // To make it persistent, we need to track renames. 
            // For this simple app, let's just update the links that match the oldName when we save.
            setLinks(prev => prev.map(l => l.category === oldName ? { ...l, category: newName } : l));
        }
        setEditingCategoryIndex(null);
    };

    // --- Handlers: Links ---
    const handleDeleteLink = (id: string, e: React.MouseEvent) => {
        e.stopPropagation();
        e.preventDefault();
        if (confirm('确定要移除此模块吗？')) {
            setLinks(links.filter(l => l.id !== id));
        }
    };

    const handleEditLink = (link: Link, e: React.MouseEvent) => {
        e.stopPropagation();
        e.preventDefault();
        setEditingLink(link);
        setLinkFormData({ title: link.title, url: link.url, description: link.description, category: link.category });
        setIsLinkModalOpen(true);
    };

    const handleAddNewLink = () => {
        setEditingLink(null);
        setLinkFormData({ title: '', url: '', description: '', category: categories[0] || '未分类' });
        setIsLinkModalOpen(true);
    };

    const handleLinkSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        let finalCategory = linkFormData.category.trim() || '未分类';
        
        // Auto-add new category if it doesn't exist
        if (!categories.includes(finalCategory) && finalCategory !== '未分类') {
            setCategories([...categories, finalCategory]);
        }

        if (editingLink) {
            setLinks(links.map(l => l.id === editingLink.id ? { ...l, ...linkFormData, category: finalCategory } : l));
        } else {
            const newLink = { ...linkFormData, category: finalCategory, id: Date.now().toString() };
            setLinks([...links, newLink]);
        }
        setIsLinkModalOpen(false);
    };

    // --- Layout Logic ---
    const scrollToCategory = (cat: string) => {
        const el = document.getElementById(`cat-${cat}`);
        if (el) {
            el.scrollIntoView({ behavior: 'smooth', block: 'start' });
            // Offset for sticky header
            window.scrollBy(0, -80);
        }
    };

    // Sort links based on category order
    const getLinksByCategory = (cat: string) => links.filter(l => l.category === cat);
    
    // Find categories that have links but aren't in the main list (e.g. legacy data)
    const extraCategories = Array.from(new Set(links.map(l => l.category)))
        .filter(c => !categories.includes(c) && c !== '未分类');

    const displayCategories = [...categories, ...extraCategories];
    // Add "Uncategorized" if there are any
    const uncategorizedLinks = links.filter(l => !displayCategories.includes(l.category) || l.category === '未分类');
    
    return (
        <div className="min-h-screen text-gray-100 font-rajdhani selection:bg-space-accent selection:text-space-900 flex flex-col">
            <Starfield />

            {/* Navbar */}
            <header className="fixed top-0 w-full z-40 border-b border-white/10 glass-panel">
                <div className="w-full px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                        <div className="text-space-accent animate-spin-slow">
                            <Icons.Rocket />
                        </div>
                        <h1 className="text-xl md:text-2xl font-orbitron font-bold tracking-widest text-white holo-text uppercase hidden sm:block">
                            {siteConfig.title}
                        </h1>
                        <h1 className="text-xl font-orbitron font-bold tracking-widest text-white holo-text uppercase sm:hidden">
                            {siteConfig.title.substring(0, 6)}
                        </h1>
                    </div>
                    
                    <div className="flex items-center space-x-4 md:space-x-6">
                         {/* Mobile Category Scroll (Optional, but useful) */}
                         <div className="flex md:hidden overflow-x-auto space-x-2 max-w-[150px] scrollbar-hide">
                            {displayCategories.map(cat => (
                                <button key={cat} onClick={() => scrollToCategory(cat)} className="text-xs text-gray-400 whitespace-nowrap">
                                    {cat}
                                </button>
                            ))}
                        </div>

                        <div className="hidden md:block text-right">
                            <div className="text-sm text-space-accent font-orbitron">
                                {currentTime.toLocaleTimeString([], { hour12: false })}
                            </div>
                        </div>
                        
                        <button 
                            onClick={toggleAdmin}
                            className={`p-2 rounded-full transition-all duration-300 ${isAdmin ? 'bg-space-accent text-space-900 shadow-[0_0_15px_#00F0FF]' : 'hover:bg-white/10 text-gray-400 hover:text-white'}`}
                            title={isAdmin ? "退出管理模式" : "进入管理模式"}
                        >
                            <Icons.Settings />
                        </button>
                    </div>
                </div>
            </header>

            <div className="flex pt-16 flex-1">
                {/* Desktop Sidebar */}
                <aside className="hidden md:block w-64 fixed left-0 top-16 bottom-0 border-r border-white/10 glass-panel z-30 overflow-y-auto px-4 py-8">
                    <nav className="space-y-2">
                        {displayCategories.map((cat) => {
                            const count = getLinksByCategory(cat).length;
                            if (count === 0 && !isAdmin) return null; // Hide empty categories for visitors
                            return (
                                <button
                                    key={cat}
                                    onClick={() => scrollToCategory(cat)}
                                    className="w-full text-left px-4 py-3 rounded hover:bg-white/5 text-gray-400 hover:text-space-accent transition-all flex justify-between group"
                                >
                                    <span className="font-rajdhani font-bold truncate">{cat}</span>
                                    <span className="text-xs bg-white/10 px-2 py-0.5 rounded group-hover:bg-space-accent/20 group-hover:text-space-accent transition-colors">{count}</span>
                                </button>
                            );
                        })}
                        {uncategorizedLinks.length > 0 && (
                            <button
                                onClick={() => scrollToCategory('未分类')}
                                className="w-full text-left px-4 py-3 rounded hover:bg-white/5 text-gray-400 hover:text-space-accent transition-all flex justify-between group"
                            >
                                <span className="font-rajdhani font-bold">未分类</span>
                                <span className="text-xs bg-white/10 px-2 py-0.5 rounded">{uncategorizedLinks.length}</span>
                            </button>
                        )}
                    </nav>
                </aside>

                {/* Main Content */}
                <main className="flex-1 md:ml-64 p-4 sm:p-8 relative z-10 max-w-full overflow-hidden">
                    {/* Admin Actions Bar */}
                    {isAdmin && (
                        <div className="mb-8 p-4 rounded-xl border border-dashed border-white/20 flex flex-wrap gap-4 items-center justify-between bg-black/20">
                            <div className="flex items-center space-x-2">
                                <span className="w-2 h-2 rounded-full bg-space-accent animate-pulse"></span>
                                <span className="text-sm text-space-accent font-orbitron tracking-wider">ADMINISTRATOR ACCESS GRANTED</span>
                            </div>
                            <div className="flex gap-3">
                                <button 
                                    onClick={openConfigModal}
                                    className="flex items-center space-x-2 bg-space-800 hover:bg-space-700 text-gray-300 border border-white/20 px-4 py-2 rounded transition-all duration-300 text-sm font-bold"
                                >
                                    <Icons.Globe />
                                    <span>系统设置</span>
                                </button>
                                <button 
                                    onClick={handleAddNewLink}
                                    className="flex items-center space-x-2 bg-space-accent/10 hover:bg-space-accent/20 text-space-accent border border-space-accent/50 px-4 py-2 rounded transition-all duration-300 hover:shadow-[0_0_15px_rgba(0,240,255,0.3)] text-sm font-bold"
                                >
                                    <Icons.Plus />
                                    <span>添加资源</span>
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Content Grids */}
                    <div className="space-y-16 pb-20">
                        {displayCategories.map(category => {
                            const catLinks = getLinksByCategory(category);
                            if (catLinks.length === 0 && !isAdmin) return null;

                            return (
                                <section key={category} id={`cat-${category}`} className="scroll-mt-24">
                                    <div className="flex items-center space-x-4 mb-6">
                                        <h2 className="text-2xl font-bold text-white font-rajdhani tracking-wider uppercase border-l-4 border-space-accent pl-4">
                                            {category}
                                        </h2>
                                        <div className="h-[1px] flex-grow bg-gradient-to-r from-space-accent/30 to-transparent"></div>
                                    </div>
                                    
                                    {catLinks.length === 0 ? (
                                        <div className="text-gray-500 text-sm italic py-4 border border-white/5 rounded p-4 text-center">
                                            此分类暂无链接，点击“添加资源”开始构建。
                                        </div>
                                    ) : (
                                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                            {catLinks.map((link) => (
                                                <a 
                                                    key={link.id}
                                                    href={link.url}
                                                    target="_blank" 
                                                    rel="noopener noreferrer"
                                                    className="group relative block h-full"
                                                >
                                                    <div className={`glass-panel rounded-xl p-5 h-full transition-all duration-300 transform group-hover:-translate-y-1 group-hover:border-space-accent/50 flex flex-col ${isAdmin ? 'cursor-default' : 'cursor-pointer'}`}>
                                                        <div className="flex justify-between items-start mb-4">
                                                            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-space-700 to-space-800 flex items-center justify-center border border-white/10 group-hover:border-space-accent/50 transition-colors">
                                                                <img 
                                                                    src={`https://www.google.com/s2/favicons?sz=64&domain=${link.url}`} 
                                                                    alt="icon" 
                                                                    className="w-5 h-5 opacity-80 group-hover:opacity-100"
                                                                    onError={(e) => {
                                                                        (e.target as HTMLImageElement).style.display = 'none';
                                                                    }}
                                                                />
                                                            </div>
                                                            <div className="opacity-0 group-hover:opacity-100 transition-opacity text-space-accent">
                                                                <Icons.ExternalLink />
                                                            </div>
                                                        </div>
                                                        
                                                        <h3 className="text-lg font-bold text-gray-100 mb-2 font-rajdhani group-hover:text-space-accent transition-colors truncate">
                                                            {link.title}
                                                        </h3>
                                                        <p className="text-sm text-gray-400 line-clamp-2 mb-4 flex-grow">
                                                            {link.description}
                                                        </p>
                                                        
                                                        <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/5 min-h-[32px]">
                                                            <span className="text-xs font-mono text-gray-600 uppercase tracking-widest group-hover:text-space-accent/50 transition-colors">SECURE</span>
                                                            
                                                            {isAdmin && (
                                                                <div className="flex items-center space-x-1 z-20" onClick={(e) => e.preventDefault()}>
                                                                    <button 
                                                                        onClick={(e) => handleEditLink(link, e)}
                                                                        className="p-1.5 hover:bg-space-accent hover:text-space-900 rounded transition-colors text-gray-400"
                                                                        title="编辑"
                                                                    >
                                                                        <Icons.Edit />
                                                                    </button>
                                                                    <button 
                                                                        onClick={(e) => handleDeleteLink(link.id, e)}
                                                                        className="p-1.5 hover:bg-space-danger hover:text-white rounded transition-colors text-gray-400"
                                                                        title="删除"
                                                                    >
                                                                        <Icons.Trash />
                                                                    </button>
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                    {/* Decorative corner accents */}
                                                    <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-space-accent/0 group-hover:border-space-accent/100 transition-all duration-300 -translate-x-1 -translate-y-1 opacity-0 group-hover:opacity-100"></div>
                                                    <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-space-accent/0 group-hover:border-space-accent/100 transition-all duration-300 translate-x-1 translate-y-1 opacity-0 group-hover:opacity-100"></div>
                                                </a>
                                            ))}
                                        </div>
                                    )}
                                </section>
                            );
                        })}
                        
                        {uncategorizedLinks.length > 0 && (
                            <section id="cat-未分类" className="scroll-mt-24">
                                <div className="flex items-center space-x-4 mb-6">
                                    <h2 className="text-2xl font-bold text-gray-400 font-rajdhani tracking-wider uppercase border-l-4 border-gray-600 pl-4">
                                        未分类资源
                                    </h2>
                                    <div className="h-[1px] flex-grow bg-white/10"></div>
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                    {uncategorizedLinks.map((link) => (
                                        /* Same card structure for uncategorized */
                                        <a 
                                            key={link.id}
                                            href={link.url}
                                            target="_blank" 
                                            rel="noopener noreferrer"
                                            className="group relative block h-full"
                                        >
                                            <div className={`glass-panel rounded-xl p-5 h-full transition-all duration-300 flex flex-col ${isAdmin ? 'cursor-default' : 'cursor-pointer'}`}>
                                                 <div className="flex justify-between items-start mb-4">
                                                     <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center border border-white/10">
                                                        <img 
                                                            src={`https://www.google.com/s2/favicons?sz=64&domain=${link.url}`} 
                                                            alt="icon" 
                                                            className="w-5 h-5 opacity-50 group-hover:opacity-80" 
                                                            onError={(e) => (e.target as HTMLImageElement).style.display = 'none'}
                                                        />
                                                     </div>
                                                 </div>
                                                 <h3 className="text-lg font-bold text-gray-300 mb-2 font-rajdhani truncate">{link.title}</h3>
                                                 <p className="text-sm text-gray-500 line-clamp-2 mb-4 flex-grow">{link.description}</p>
                                                 
                                                  <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/5 min-h-[32px]">
                                                      <span className="text-xs font-mono text-gray-600">UNK</span>
                                                        {isAdmin && (
                                                            <div className="flex items-center space-x-1 z-20" onClick={(e) => e.preventDefault()}>
                                                                <button onClick={(e) => handleEditLink(link, e)} className="p-1.5 hover:bg-white/10 rounded text-gray-400"><Icons.Edit /></button>
                                                                <button onClick={(e) => handleDeleteLink(link.id, e)} className="p-1.5 hover:bg-white/10 rounded text-gray-400"><Icons.Trash /></button>
                                                            </div>
                                                        )}
                                                  </div>
                                            </div>
                                        </a>
                                    ))}
                                </div>
                            </section>
                        )}
                    </div>
                </main>
            </div>

            {/* Link Edit Modal */}
            {isLinkModalOpen && (
                <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
                    <div className="glass-panel w-full max-w-md rounded-2xl p-8 relative animate-float shadow-2xl shadow-space-accent/20">
                        <button 
                            onClick={() => setIsLinkModalOpen(false)}
                            className="absolute top-4 right-4 text-gray-400 hover:text-white"
                        >
                            ✕
                        </button>
                        <h2 className="text-2xl font-rajdhani font-bold text-space-accent mb-6">
                            {editingLink ? '编辑模块' : '新建模块'}
                        </h2>
                        
                        <form onSubmit={handleLinkSubmit} className="space-y-4">
                            <div>
                                <label className="block text-xs font-mono text-gray-400 mb-1 uppercase">标题 (Title)</label>
                                <input 
                                    type="text" 
                                    required
                                    className="w-full px-4 py-2 rounded bg-black/40 border border-white/10 focus:border-space-accent focus:outline-none text-white transition-colors"
                                    value={linkFormData.title}
                                    onChange={e => setLinkFormData({...linkFormData, title: e.target.value})}
                                    placeholder="例如：控制台"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-mono text-gray-400 mb-1 uppercase">目标链接 (URL)</label>
                                <input 
                                    type="url" 
                                    required
                                    className="w-full px-4 py-2 rounded bg-black/40 border border-white/10 focus:border-space-accent focus:outline-none text-white transition-colors"
                                    value={linkFormData.url}
                                    onChange={e => setLinkFormData({...linkFormData, url: e.target.value})}
                                    placeholder="https://..."
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-mono text-gray-400 mb-1 uppercase">分类 (Category)</label>
                                <input 
                                    type="text" 
                                    className="w-full px-4 py-2 rounded bg-black/40 border border-white/10 focus:border-space-accent focus:outline-none text-white transition-colors"
                                    value={linkFormData.category}
                                    onChange={e => setLinkFormData({...linkFormData, category: e.target.value})}
                                    placeholder="例如：工具"
                                    list="category-suggestions"
                                />
                                <datalist id="category-suggestions">
                                    {categories.map(c => <option key={c} value={c} />)}
                                </datalist>
                                <p className="text-[10px] text-gray-500 mt-1">输入新分类名称将自动创建。</p>
                            </div>
                            <div>
                                <label className="block text-xs font-mono text-gray-400 mb-1 uppercase">描述 (Description)</label>
                                <textarea 
                                    className="w-full px-4 py-2 rounded bg-black/40 border border-white/10 focus:border-space-accent focus:outline-none text-white transition-colors h-24 resize-none"
                                    value={linkFormData.description}
                                    onChange={e => setLinkFormData({...linkFormData, description: e.target.value})}
                                    placeholder="简短的描述..."
                                />
                            </div>
                            
                            <div className="pt-4 flex space-x-4">
                                <button 
                                    type="button" 
                                    onClick={() => setIsLinkModalOpen(false)}
                                    className="flex-1 py-2 rounded border border-white/10 hover:bg-white/5 text-gray-300 font-rajdhani font-bold text-sm"
                                >
                                    取消
                                </button>
                                <button 
                                    type="submit" 
                                    className="flex-1 py-2 rounded bg-space-accent text-space-900 font-bold hover:bg-space-accentHover transition-colors font-rajdhani text-sm shadow-[0_0_10px_rgba(0,240,255,0.4)]"
                                >
                                    确认 (ENGAGE)
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Config Modal */}
            {isConfigModalOpen && (
                <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
                    <div className="glass-panel w-full max-w-lg rounded-2xl p-0 relative animate-float flex flex-col max-h-[85vh] shadow-2xl shadow-space-accent/20">
                        {/* Modal Header */}
                        <div className="p-6 border-b border-white/10 flex justify-between items-center bg-black/40 rounded-t-2xl">
                            <h2 className="text-2xl font-rajdhani font-bold text-white flex items-center gap-2">
                                <Icons.Settings /> 系统配置
                            </h2>
                            <button 
                                onClick={() => setIsConfigModalOpen(false)}
                                className="text-gray-400 hover:text-white"
                            >
                                ✕
                            </button>
                        </div>

                        {/* Tabs */}
                        <div className="flex border-b border-white/10">
                            <button 
                                onClick={() => setConfigTab('general')}
                                className={`flex-1 py-3 text-sm font-bold tracking-wider transition-colors ${configTab === 'general' ? 'bg-space-accent/10 text-space-accent border-b-2 border-space-accent' : 'text-gray-400 hover:text-white'}`}
                            >
                                基本设置
                            </button>
                            <button 
                                onClick={() => setConfigTab('categories')}
                                className={`flex-1 py-3 text-sm font-bold tracking-wider transition-colors ${configTab === 'categories' ? 'bg-space-accent/10 text-space-accent border-b-2 border-space-accent' : 'text-gray-400 hover:text-white'}`}
                            >
                                分类管理
                            </button>
                        </div>
                        
                        {/* Scrollable Content */}
                        <div className="p-6 overflow-y-auto custom-scrollbar flex-1">
                            {configTab === 'general' ? (
                                <div className="space-y-6">
                                    <div>
                                        <label className="block text-xs font-mono text-gray-400 mb-2 uppercase">网站名称 (Site Title)</label>
                                        <input 
                                            type="text" 
                                            className="w-full px-4 py-3 rounded bg-black/40 border border-white/10 focus:border-space-accent focus:outline-none text-white text-lg font-bold"
                                            value={configTitle}
                                            onChange={e => setConfigTitle(e.target.value)}
                                        />
                                        <p className="text-xs text-gray-500 mt-2">显示在浏览器标签页和左上角Logo处。</p>
                                    </div>
                                    <div className="p-4 rounded bg-blue-900/20 border border-blue-500/30 text-sm text-blue-200">
                                        提示：所有数据均存储在您的本地浏览器中，清除缓存可能会导致数据丢失。
                                    </div>
                                </div>
                            ) : (
                                <div className="space-y-6">
                                    <div className="flex gap-2 mb-4">
                                        <input 
                                            type="text"
                                            placeholder="新分类名称..."
                                            className="flex-1 px-4 py-2 rounded bg-black/40 border border-white/10 focus:border-space-accent focus:outline-none text-white"
                                            value={newCategoryName}
                                            onChange={e => setNewCategoryName(e.target.value)}
                                            onKeyDown={e => e.key === 'Enter' && handleCategoryAdd()}
                                        />
                                        <button 
                                            onClick={handleCategoryAdd}
                                            className="bg-space-accent/20 hover:bg-space-accent/40 text-space-accent px-4 py-2 rounded border border-space-accent/50 font-bold"
                                        >
                                            添加
                                        </button>
                                    </div>
                                    
                                    <div className="space-y-2">
                                        {tempCategories.map((cat, idx) => (
                                            <div key={idx} className="flex items-center justify-between p-3 rounded bg-white/5 border border-white/5 hover:border-white/20 transition-all group">
                                                {editingCategoryIndex === idx ? (
                                                    <div className="flex items-center gap-2 flex-1 mr-2">
                                                        <input 
                                                            autoFocus
                                                            className="w-full bg-black border border-space-accent rounded px-2 py-1 text-sm outline-none text-white"
                                                            value={editingCategoryValue}
                                                            onChange={e => setEditingCategoryValue(e.target.value)}
                                                            onBlur={() => saveEditCategory(idx)}
                                                            onKeyDown={e => e.key === 'Enter' && saveEditCategory(idx)}
                                                        />
                                                        <button onClick={() => saveEditCategory(idx)} className="text-space-accent"><Icons.Check /></button>
                                                    </div>
                                                ) : (
                                                    <span className="font-bold text-gray-300 flex-1">{cat}</span>
                                                )}
                                                
                                                <div className="flex items-center space-x-1 opacity-60 group-hover:opacity-100 transition-opacity">
                                                     <button 
                                                        onClick={() => startEditCategory(idx)}
                                                        className="p-1.5 hover:bg-white/10 rounded text-blue-400" 
                                                        title="重命名"
                                                    >
                                                        <Icons.Edit />
                                                    </button>
                                                    <button 
                                                        onClick={() => handleCategoryMove(idx, 'up')}
                                                        className="p-1.5 hover:bg-white/10 rounded text-gray-300 disabled:opacity-20" 
                                                        disabled={idx === 0}
                                                        title="上移"
                                                    >
                                                        <Icons.ArrowUp />
                                                    </button>
                                                    <button 
                                                        onClick={() => handleCategoryMove(idx, 'down')}
                                                        className="p-1.5 hover:bg-white/10 rounded text-gray-300 disabled:opacity-20" 
                                                        disabled={idx === tempCategories.length - 1}
                                                        title="下移"
                                                    >
                                                        <Icons.ArrowDown />
                                                    </button>
                                                    <button 
                                                        onClick={() => handleCategoryDelete(idx)}
                                                        className="p-1.5 hover:bg-red-500/20 rounded text-red-400 ml-1"
                                                        title="删除"
                                                    >
                                                        <Icons.Trash />
                                                    </button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    <p className="text-xs text-gray-500 text-center pt-2">拖拽排序功能开发中，请使用箭头调整顺序。</p>
                                </div>
                            )}
                        </div>

                        {/* Modal Footer */}
                        <div className="p-6 border-t border-white/10 flex space-x-4 bg-black/40 rounded-b-2xl">
                             <button 
                                onClick={() => setIsConfigModalOpen(false)}
                                className="flex-1 py-2 rounded border border-white/10 hover:bg-white/5 text-gray-300 font-rajdhani font-bold text-sm"
                            >
                                取消
                            </button>
                            <button 
                                onClick={saveConfig}
                                className="flex-1 py-2 rounded bg-space-accent text-space-900 font-bold hover:bg-space-accentHover transition-colors font-rajdhani text-sm shadow-[0_0_10px_rgba(0,240,255,0.4)]"
                            >
                                保存更改
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

const root = createRoot(document.getElementById('root')!);
root.render(<App />);

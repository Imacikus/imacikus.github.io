
// --- Types & Declarations ---
// Fix: Declare custom properties on the Window interface to resolve "property does not exist" errors.
declare global {
  interface Window {
    navigateTo: (page: string, postId?: string | null) => void;
    lucide: {
      createIcons: () => void;
    };
  }
}

// --- Daten ---
const PROJECTS = [
    {
        id: 1,
        title: "EcoSphere Dashboard",
        description: "Visualisierung von Echtzeit-Umweltdaten mit Fokus auf Interaktivität.",
        tags: ["JS", "D3.js", "Analytics"],
        link: "#"
    },
    {
        id: 2,
        title: "NeuralFlow AI",
        description: "Minimalistisches User Interface für ein modernes KI-Sprachmodell.",
        tags: ["Design", "UI/UX", "Tailwind"],
        link: "#"
    },
    {
        id: 3,
        title: "CipherVault",
        description: "Dezentrales Verschlüsselungstool für sensible Dokumente.",
        tags: ["Security", "Web3", "Privacy"],
        link: "#"
    }
];

const BLOG_POSTS = [
    {
        id: "future-of-web",
        title: "Die Web-Trends 2025",
        date: "15. Mai 2024",
        readingTime: "5 min",
        category: "Technologie",
        excerpt: "Warum statische Seiten ein Comeback feiern und was das für Entwickler bedeutet...",
        content: `Statische Seiten sind zurück. In einer Welt, in der Performance alles ist, gewinnen Tools wie GitHub Pages an Bedeutung.\n\n### Der Speed-Faktor\nNutzer warten nicht. Jede Millisekunde zählt. Statisches HTML ist die ehrlichste Form der Performance.\n\n### Minimalismus\nWeniger ist oft mehr. Reduzierte Frameworks führen zu saubererem Code und besserer Wartbarkeit.`,
        tags: ["Webdev", "Performance", "HTML"]
    },
    {
        id: "minimalist-design",
        title: "Die Kunst des Weglassens",
        date: "10. Mai 2024",
        readingTime: "8 min",
        category: "Design",
        excerpt: "Wie man mit weniger Elementen eine stärkere Wirkung erzielt...",
        content: `Design muss atmen. White Space ist kein leerer Raum, sondern ein aktives Gestaltungelement.\n\n### Fokus setzen\nDurch Reduktion führen wir das Auge des Nutzers gezielt zu den wichtigen Informationen.`,
        tags: ["Design", "UX", "Psychologie"]
    },
    {
        id: "vanilla-js-power",
        title: "Die Power von Vanilla JS",
        date: "02. Mai 2024",
        readingTime: "12 min",
        category: "Coding",
        excerpt: "Brauchen wir wirklich für alles ein Framework? Eine Spurensuche.",
        content: `Frameworks sind toll, aber Vanilla JavaScript ist das Fundament. Wer die Grundlagen beherrscht, schreibt effizienteren Code.\n\n### Keine Abhängigkeiten\nWeniger NPM-Pakete bedeuten weniger Sicherheitsrisiken und kleinere Dateigrößen.`,
        tags: ["JavaScript", "Grundlagen", "Coding"]
    }
];

// --- App State ---
let state: {
    currentPage: string;
    selectedPost: any | null;
    searchQuery: string;
} = {
    currentPage: 'home',
    selectedPost: null,
    searchQuery: ''
};

// --- DOM References ---
const appRoot = document.getElementById('app-root')!;

// --- Helper Functions ---
function updateNav() {
    document.querySelectorAll('.nav-link').forEach(link => {
        const page = link.getAttribute('data-page');
        if (state.currentPage === page || (state.currentPage === 'post' && page === 'blog')) {
            link.classList.add('text-cyan-400');
            link.classList.remove('text-slate-400');
        } else {
            link.classList.remove('text-cyan-400');
            link.classList.add('text-slate-400');
        }
    });
}

// --- Routing & Navigation ---
// Fix: navigateTo is now declared on the window interface above.
window.navigateTo = (page: string, postId: string | null = null) => {
    state.currentPage = page;
    if (postId) {
        state.selectedPost = BLOG_POSTS.find(p => p.id === postId) || null;
    } else {
        state.selectedPost = null;
    }
    render();
    window.scrollTo(0, 0);
};

// --- Rendering Logic ---
function render() {
    updateNav();
    let content = '';

    if (state.currentPage === 'home') {
        content = renderHome();
    } else if (state.currentPage === 'blog') {
        content = renderBlog();
    } else if (state.currentPage === 'post') {
        content = renderPost();
    }

    appRoot.innerHTML = `<div class="fade-in">${content}</div>`;
    
    // Re-initialize icons after DOM update
    // Fix: window.lucide is now declared on the window interface above.
    if (window.lucide) {
        window.lucide.createIcons();
    }

    // Attach dynamic search listener if on blog page
    // Fix: Cast searchInput to HTMLInputElement to access the 'value' property.
    const searchInput = document.getElementById('blog-search') as HTMLInputElement | null;
    if (searchInput) {
        searchInput.focus();
        searchInput.value = state.searchQuery;
        searchInput.addEventListener('input', (e) => {
            // Fix: Cast e.target to HTMLInputElement to access the 'value' property.
            state.searchQuery = (e.target as HTMLInputElement).value;
            renderBlogResults();
        });
    }
}

function renderHome() {
    return `
        <section class="max-w-4xl mx-auto px-6 py-12 text-center">
            <div class="inline-block px-4 py-1.5 mb-6 text-sm font-medium rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                Software Engineer & Creative Mind
            </div>
            <h1 class="text-5xl md:text-7xl font-extrabold mb-8 tracking-tight leading-tight">
                Ich gestalte die <span class="gradient-text">Zukunft</span> des Webs.
            </h1>
            <p class="text-xl text-slate-400 mb-10 max-w-2xl mx-auto leading-relaxed">
                Willkommen in meinem digitalen Zuhause. Ich entwickle stabile, schnelle und ästhetisch ansprechende Web-Lösungen.
            </p>
            <div class="flex flex-wrap justify-center gap-4">
                <button onclick="document.getElementById('projects').scrollIntoView({behavior:'smooth'})" class="gradient-bg text-white px-8 py-4 rounded-xl font-semibold flex items-center gap-2 hover:opacity-90 transition-all">
                    Projekte ansehen <i data-lucide="arrow-right" class="w-5 h-5"></i>
                </button>
                <button onclick="navigateTo('blog')" class="bg-slate-800 text-white px-8 py-4 rounded-xl font-semibold border border-slate-700 hover:bg-slate-700 transition-all">
                    Zum Blog
                </button>
            </div>
        </section>

        <section id="projects" class="max-w-6xl mx-auto px-6 py-20">
            <h2 class="text-3xl font-bold mb-12">Ausgewählte Arbeiten</h2>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                ${PROJECTS.map(p => `
                    <div class="glass p-8 rounded-3xl card-hover transition-all duration-300 border border-transparent">
                        <div class="bg-slate-800 w-12 h-12 rounded-xl flex items-center justify-center mb-6">
                            <i data-lucide="briefcase" class="text-cyan-400 w-6 h-6"></i>
                        </div>
                        <h3 class="text-xl font-bold mb-3">${p.title}</h3>
                        <p class="text-slate-400 text-sm mb-6 leading-relaxed">${p.description}</p>
                        <div class="flex flex-wrap gap-2">
                            ${p.tags.map(t => `<span class="text-[10px] uppercase font-bold tracking-widest bg-slate-800 px-2 py-1 rounded text-slate-400">${t}</span>`).join('')}
                        </div>
                    </div>
                `).join('')}
            </div>
        </section>
    `;
}

function renderBlog() {
    return `
        <section class="max-w-5xl mx-auto px-6 py-12">
            <div class="mb-16">
                <h2 class="text-4xl font-bold mb-4">Journal</h2>
                <p class="text-slate-400 mb-8">Meine Gedanken zu Technik, Design und Code.</p>
                <div class="relative max-w-xl">
                    <i data-lucide="search" class="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 w-5 h-5"></i>
                    <input 
                        id="blog-search"
                        type="text" 
                        placeholder="Durchsuche Artikel..." 
                        class="w-full bg-slate-800/50 border border-slate-700 rounded-2xl py-4 pl-12 pr-6 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 transition-all"
                    >
                </div>
            </div>
            <div id="blog-results-container" class="grid grid-cols-1 md:grid-cols-2 gap-8">
                ${renderBlogResultsList()}
            </div>
        </section>
    `;
}

function renderBlogResultsList() {
    const query = state.searchQuery.toLowerCase();
    const filtered = BLOG_POSTS.filter(p => 
        p.title.toLowerCase().includes(query) || 
        p.excerpt.toLowerCase().includes(query) ||
        p.tags.some(t => t.toLowerCase().includes(query))
    );

    if (filtered.length === 0) {
        return `<div class="col-span-full py-20 text-center text-slate-500 italic">Keine Artikel gefunden...</div>`;
    }

    return filtered.map(p => `
        <article onclick="navigateTo('post', '${p.id}')" class="glass p-8 rounded-3xl card-hover cursor-pointer flex flex-col h-full border border-transparent">
            <div class="flex items-center gap-3 mb-6 text-xs font-bold uppercase tracking-tighter text-indigo-400">
                <span>${p.category}</span>
                <span class="w-1 h-1 bg-slate-700 rounded-full"></span>
                <span>${p.readingTime} Lesezeit</span>
            </div>
            <h3 class="text-2xl font-bold mb-4 leading-tight">${p.title}</h3>
            <p class="text-slate-400 text-sm mb-8 leading-relaxed flex-grow">${p.excerpt}</p>
            <div class="flex items-center justify-between pt-6 border-t border-slate-800/50">
                <span class="text-xs text-slate-500">${p.date}</span>
                <div class="flex gap-1">
                    ${p.tags.slice(0, 2).map(t => `<span class="text-[9px] bg-slate-800 px-2 py-0.5 rounded text-slate-400">#${t}</span>`).join('')}
                </div>
            </div>
        </article>
    `).join('');
}

function renderBlogResults() {
    const container = document.getElementById('blog-results-container');
    if (container) {
        container.innerHTML = renderBlogResultsList();
        // Fix: window.lucide is now declared on the window interface above.
        if (window.lucide) window.lucide.createIcons();
    }
}

function renderPost() {
    const p = state.selectedPost;
    if (!p) return 'Artikel nicht gefunden.';
    
    return `
        <section class="max-w-3xl mx-auto px-6 py-12">
            <button onclick="navigateTo('blog')" class="flex items-center gap-2 text-slate-500 hover:text-white mb-12 transition-colors">
                <i data-lucide="chevron-left" class="w-5 h-5"></i> Zurück zum Blog
            </button>
            <div class="mb-12">
                <div class="flex gap-4 text-sm text-slate-500 mb-6">
                    <span class="flex items-center gap-1"><i data-lucide="calendar" class="w-4 h-4"></i> ${p.date}</span>
                    <span class="flex items-center gap-1"><i data-lucide="clock" class="w-4 h-4"></i> ${p.readingTime}</span>
                </div>
                <h1 class="text-4xl md:text-5xl font-extrabold mb-8 leading-tight">${p.title}</h1>
                <div class="flex flex-wrap gap-2">
                    ${p.tags.map(t => `<span class="px-3 py-1 rounded-full bg-slate-800 text-xs font-medium text-slate-400">#${t}</span>`).join('')}
                </div>
            </div>
            <div class="prose prose-invert max-w-none text-slate-300 leading-relaxed text-lg space-y-8">
                ${p.content.split('\n').map(line => {
                    if (line.startsWith('###')) return `<h3 class="text-2xl font-bold text-white pt-6">${line.replace('### ', '')}</h3>`;
                    return `<p>${line}</p>`;
                }).join('')}
            </div>
        </section>
    `;
}

// Initialer Aufruf
document.addEventListener('DOMContentLoaded', () => {
    render();
});

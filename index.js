const PROJECTS = [
    {
        id: 1,
        title: "Borin AI",
        description: "KI-Sprachmodell für Schüler von Schülern. Ein innovatives Tool, das komplexe Schulthemen verständlich erklärt und beim Lernen unterstützt.",
        tags: ["AI", "Education", "Frontend"],
        link: "https://borinai.github.io"
    },
    {
        id: 2,
        title: "Coming Soon",
        description: "Ein neues Projekt ist in der Konzeptionsphase. Hier wird bald etwas Spannendes entstehen.",
        tags: ["Development"],
        link: "#"
    },
    {
        id: 3,
        title: "Coming Soon",
        description: "Hier werden kommende Projekte präsentiert. Bleib auf dem Laufenden!",
        tags: ["Design"],
        link: "#"
    }
];

const BLOG_POSTS = [
    {
        id: "ukrainekrieg-internet-welt-verändert",
        title: "Wie der Angriffskrieg auf die Ukraine die Internet-Welt verändert hat",
        date: "14. Januar 2026",
        readingTime: "5 min",
        category: "Politik & Digitales",
        excerpt: "Seit dem 24. Februar 2022 findet nicht nur ein physischer Krieg statt, sondern auch eine digitale Auseinandersetzung, die das Netz nachhaltig prägt.",
        content: `Mit dem russischen Angriff auf die Ukraine am 24. Februar 2022 begann nicht nur ein Krieg in Europa, sondern auch eine neue Phase digitaler Auseinandersetzungen. Fast drei Jahre später zeigt sich deutlich, wie sehr dieser Konflikt die digitale Welt verändert hat – von gezielter Desinformation über soziale Netzwerke bis hin zu neuen Herausforderungen für Plattformen und Nutzer.\n\n### Fake News als digitale Kriegswaffe\nDer russische Angriffskrieg auf die Ukraine findet nicht nur auf dem Schlachtfeld statt, sondern auch im digitalen Raum. Ein zentrales Instrument dabei ist gezielte Desinformation. Über soziale Netzwerke, Messenger-Dienste und teilweise auch scheinbar seriöse Webseiten werden Inhalte verbreitet, die Zweifel säen, Angst erzeugen oder politische Meinungen beeinflussen sollen.\n\nBesonders häufig kommen dabei aus dem Kontext gerissene Videoaufnahmen, manipulierte Bilder oder bewusst irreführende Behauptungen zum Einsatz. Diese Inhalte sind oft emotional aufgeladen und gezielt darauf ausgelegt, schnell und unkritisch weiterverbreitet zu werden.\n\n### Cybersicherheit als neues Schlachtfeld\nSeit Beginn des Krieges rechnen viele Unternehmen mit einer deutlich verschärften Bedrohungslage im Cyberraum. Studien zufolge erwarten acht von zehn Digitalunternehmen eine solche Entwicklung. Feindliche Hackergruppen versuchen dabei unter anderem, Industrieanlagen zu sabotieren, Systeme zu manipulieren oder kritische Infrastrukturen zu stören.\n\n### Fazit\nDer Angriffskrieg gegen die Ukraine macht deutlich, dass Kriege heute auch im digitalen Raum geführt werden. Fake News und Cyberangriffe sind keine Randerscheinungen, sondern gezielte Werkzeuge, um Gesellschaften zu verunsichern.`,
        tags: ["Cybersecurity", "Desinformation", "DigitalWar"]
    }
];

let state = { currentPage: 'home', selectedPost: null, searchQuery: '' };
const appRoot = document.getElementById('app-root');

window.navigateTo = (page, postId = null) => {
    state.currentPage = page;
    state.selectedPost = postId ? BLOG_POSTS.find(p => p.id === postId) : null;
    render();
    window.scrollTo(0, 0);
};

function render() {
    updateNav();
    let content = '';
    if (state.currentPage === 'home') content = renderHome();
    else if (state.currentPage === 'blog') content = renderBlog();
    else if (state.currentPage === 'post') content = renderPost();
    
    appRoot.innerHTML = `<div class="fade-in">${content}</div>`;
    if (window.lucide) window.lucide.createIcons();

    const searchInput = document.getElementById('blog-search');
    if (searchInput) {
        searchInput.value = state.searchQuery;
        searchInput.addEventListener('input', (e) => {
            state.searchQuery = e.target.value;
            renderBlogResults();
        });
    }
}

function updateNav() {
    document.querySelectorAll('.nav-link').forEach(link => {
        const isActive = state.currentPage === link.getAttribute('data-page') || (state.currentPage === 'post' && link.getAttribute('data-page') === 'blog');
        link.classList.toggle('text-cyan-400', isActive);
        link.classList.toggle('text-slate-400', !isActive);
    });
}

function renderHome() {
    return `
        <section class="max-w-4xl mx-auto px-6 py-12">
            <div class="text-center mb-20">
                <div class="inline-block px-4 py-1.5 mb-6 text-sm font-medium rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">Software & Gedanken</div>
                <h1 class="text-5xl md:text-7xl font-extrabold mb-8 tracking-tight">Ich bin <span class="gradient-text">Imacikus</span>.</h1>
                <p class="text-xl text-slate-400 mb-10 max-w-2xl mx-auto">Ich entwickle Tools wie <strong>Borin AI</strong> und analysiere die Schnittstelle zwischen Technologie und Gesellschaft.</p>
                <div class="flex justify-center gap-4">
                    <button onclick="document.getElementById('projects').scrollIntoView({behavior:'smooth'})" class="gradient-bg text-white px-8 py-4 rounded-xl font-bold">Projekte</button>
                    <button onclick="navigateTo('blog')" class="bg-slate-800 px-8 py-4 rounded-xl font-bold border border-slate-700">Blog lesen</button>
                </div>
            </div>
            <div id="projects" class="grid grid-cols-1 md:grid-cols-3 gap-8 pt-10">
                ${PROJECTS.map(p => `
                    <div class="glass p-8 rounded-3xl card-hover border border-transparent flex flex-col">
                        <h3 class="text-xl font-bold mb-3">${p.title}</h3>
                        <p class="text-slate-400 text-sm mb-6 flex-grow">${p.description}</p>
                        <div class="flex flex-wrap gap-2 mb-4">${p.tags.map(t => `<span class="text-[10px] bg-slate-800 px-2 py-1 rounded text-slate-500">#${t}</span>`).join('')}</div>
                        ${p.link !== '#' ? `<a href="${p.link}" target="_blank" class="text-cyan-400 text-sm font-bold flex items-center gap-1">Link <i data-lucide="external-link" class="w-4 h-4"></i></a>` : ''}
                    </div>
                `).join('')}
            </div>
        </section>`;
}

function renderBlog() {
    return `
        <section class="max-w-5xl mx-auto px-6 py-12">
            <h2 class="text-4xl font-bold mb-8">Journal</h2>
            <input id="blog-search" type="text" placeholder="Beiträge durchsuchen..." class="w-full max-w-xl bg-slate-800/50 border border-slate-700 rounded-2xl py-4 px-6 mb-12 focus:ring-2 focus:ring-cyan-500 outline-none">
            <div id="blog-results-container" class="grid grid-cols-1 md:grid-cols-2 gap-8">${renderBlogResultsList()}</div>
        </section>`;
}

function renderBlogResultsList() {
    const query = state.searchQuery.toLowerCase();
    const filtered = BLOG_POSTS.filter(p => p.title.toLowerCase().includes(query) || p.tags.some(t => t.toLowerCase().includes(query)));
    return filtered.map(p => `
        <article onclick="navigateTo('post', '${p.id}')" class="glass p-8 rounded-3xl card-hover cursor-pointer border border-transparent">
            <span class="text-xs font-bold text-indigo-400 uppercase">${p.category}</span>
            <h3 class="text-2xl font-bold mt-2 mb-4">${p.title}</h3>
            <p class="text-slate-400 text-sm mb-6">${p.excerpt}</p>
            <div class="flex justify-between items-center pt-4 border-t border-slate-800"><span class="text-xs text-slate-500">${p.date}</span></div>
        </article>`).join('');
}

function renderBlogResults() {
    const container = document.getElementById('blog-results-container');
    if (container) container.innerHTML = renderBlogResultsList();
}

function renderPost() {
    const p = state.selectedPost;
    if (!p) return '';
    return `
        <article class="max-w-3xl mx-auto px-6 py-12">
            <button onclick="navigateTo('blog')" class="text-slate-500 hover:text-white mb-8 flex items-center gap-2 font-medium"><i data-lucide="arrow-left" class="w-4 h-4"></i> Zurück</button>
            <h1 class="text-4xl md:text-5xl font-extrabold mb-6 leading-tight">${p.title}</h1>
            <div class="flex gap-4 text-slate-500 text-sm mb-12"><span>${p.date}</span><span>•</span><span>${p.readingTime} Lesezeit</span></div>
            <div class="text-slate-300 leading-relaxed text-lg space-y-6">
                ${p.content.split('\n').map(l => l.startsWith('###') ? `<h3 class="text-2xl font-bold text-white pt-6 border-b border-slate-800 pb-2">${l.replace('### ', '')}</h3>` : (l.trim() ? `<p>${l}</p>` : '')).join('')}
            </div>
        </article>`;
}

document.addEventListener('DOMContentLoaded', render);
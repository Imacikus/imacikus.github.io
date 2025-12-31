import React, { useState, useMemo, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { 
  Github, 
  ExternalLink, 
  Search, 
  BookOpen, 
  User, 
  Briefcase, 
  Mail, 
  ArrowRight, 
  ChevronLeft,
  Calendar,
  Tag,
  Clock
} from 'lucide-react';

// --- Types ---
type Page = 'home' | 'blog' | 'post';

interface Project {
  id: number;
  title: string;
  description: string;
  tags: string[];
  link: string;
}

interface BlogPost {
  id: string;
  title: string;
  date: string;
  readingTime: string;
  category: string;
  excerpt: string;
  content: string;
  tags: string[];
}

// --- Data ---
const PROJECTS: Project[] = [
  {
    id: 1,
    title: "EcoSphere Dashboard",
    description: "Eine Echtzeit-Visualisierung von Umweltdaten unter Verwendung moderner Web-Technologien.",
    tags: ["React", "TypeScript", "D3.js"],
    link: "#"
  },
  {
    id: 2,
    title: "NeuralFlow AI",
    description: "Interface Design für eine KI-Plattform zur Workflow-Optimierung.",
    tags: ["UI/UX", "Next.js", "Tailwind"],
    link: "#"
  },
  {
    id: 3,
    title: "CipherVault",
    description: "Ein sicheres, dezentralisiertes Passwort-Management-System.",
    tags: ["Blockchain", "Security", "Rust"],
    link: "#"
  }
];

const BLOG_POSTS: BlogPost[] = [
  {
    id: "future-of-web",
    title: "Die Zukunft der Webentwicklung in 2025",
    date: "15. Mai 2024",
    readingTime: "5 min",
    category: "Technologie",
    excerpt: "Wie KI und Edge Computing die Art und Weise verändern, wie wir Applikationen bauen...",
    content: "Dies ist der vollständige Text des Artikels. Hier wird detailliert auf die Trends eingegangen, die das Web im nächsten Jahr prägen werden. Von WebAssembly bis hin zu neuen CSS-Features wie Anchor Positioning.\n\n### Die Rolle der KI\nKI-gestützte Entwicklungswerkzeuge werden zum Standard. Es geht nicht mehr nur um Code-Vervollständigung, sondern um ganze Architektur-Entscheidungen.\n\n### Performance\nIn einer Welt voller Daten ist Geschwindigkeit alles. Edge Computing rückt die Logik näher zum Nutzer.",
    tags: ["Webdev", "KI", "Trends"]
  },
  {
    id: "design-systems",
    title: "Warum Design Systems der Schlüssel sind",
    date: "10. Mai 2024",
    readingTime: "8 min",
    category: "Design",
    excerpt: "Konsistenz ist kein Zufall. Erfahren Sie, wie man skalierbare UI-Komponenten entwirft...",
    content: "Design-Systeme sind mehr als nur eine Sammlung von Buttons. Sie sind die Sprache eines Produkts. In diesem Beitrag analysieren wir die Anatomie eines guten Systems.\n\n1. Tokens\n2. Komponenten\n3. Patterns\n4. Dokumentation",
    tags: ["Design", "Workflow", "UI"]
  },
  {
    id: "clean-code-react",
    title: "Clean Code Praktiken für React-Entwickler",
    date: "02. Mai 2024",
    readingTime: "12 min",
    category: "Coding",
    excerpt: "Schluss mit Spaghetti-Code. Strategien für wartbare und testbare React-Applikationen.",
    content: "Wartbarkeit ist die wichtigste Eigenschaft von Software. In React bedeutet das oft: Separation of Concerns.\n\n- Custom Hooks für die Logik\n- Kleine, funktionale Komponenten\n- Klare Prop-Typen",
    tags: ["React", "JavaScript", "CleanCode"]
  }
];

// --- Components ---

const Navbar = ({ currentPage, setCurrentPage }: { currentPage: Page, setCurrentPage: (p: Page) => void }) => (
  <nav className="fixed top-0 left-0 right-0 z-50 glass">
    <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
      <div 
        className="text-xl font-bold cursor-pointer gradient-text"
        onClick={() => setCurrentPage('home')}
      >
        PORTFOLIO.
      </div>
      <div className="flex gap-8">
        {[
          { id: 'home', label: 'Home', icon: User },
          { id: 'blog', label: 'Blog', icon: BookOpen },
        ].map((item) => (
          <button
            key={item.id}
            onClick={() => setCurrentPage(item.id as Page)}
            className={`flex items-center gap-2 text-sm font-medium transition-colors hover:text-cyan-400 ${
              currentPage === item.id || (currentPage === 'post' && item.id === 'blog')
                ? 'text-cyan-400' 
                : 'text-slate-400'
            }`}
          >
            <item.icon size={16} />
            {item.label}
          </button>
        ))}
      </div>
    </div>
  </nav>
);

const Hero = ({ onExplore }: { onExplore: () => void }) => (
  <section className="pt-32 pb-20 px-6">
    <div className="max-w-4xl mx-auto text-center">
      <div className="inline-block px-4 py-1.5 mb-6 text-sm font-medium rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
        Verfügbar für neue Projekte
      </div>
      <h1 className="text-5xl md:text-7xl font-extrabold mb-8 tracking-tight">
        Ich baue digitale <span className="gradient-text">Erlebnisse</span> die begeistern.
      </h1>
      <p className="text-xl text-slate-400 mb-10 max-w-2xl mx-auto leading-relaxed">
        Full-Stack Engineer & Designer. Spezialisiert auf performante Web-Applikationen und intuitive Interfaces mit modernster Technologie.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <button 
          onClick={onExplore}
          className="gradient-bg text-white px-8 py-4 rounded-xl font-semibold flex items-center justify-center gap-2 hover:opacity-90 transition-all transform hover:scale-105"
        >
          Projekte ansehen <ArrowRight size={20} />
        </button>
        <button className="bg-slate-800 text-white px-8 py-4 rounded-xl font-semibold border border-slate-700 hover:bg-slate-700 transition-all">
          Kontakt aufnehmen
        </button>
      </div>
    </div>
  </section>
);

// --- Fix: Explicitly using React.FC to handle 'key' prop when component is mapped in a list ---
const ProjectCard: React.FC<{ project: Project }> = ({ project }) => (
  <div className="glass p-6 rounded-2xl group transition-all hover:border-cyan-500/50">
    <div className="flex justify-between items-start mb-4">
      <div className="p-3 bg-slate-800 rounded-lg group-hover:bg-cyan-500/20 transition-colors">
        <Briefcase className="text-cyan-400" size={24} />
      </div>
      <a href={project.link} className="text-slate-500 hover:text-white transition-colors">
        <ExternalLink size={20} />
      </a>
    </div>
    <h3 className="text-xl font-bold mb-2">{project.title}</h3>
    <p className="text-slate-400 text-sm mb-6 leading-relaxed">
      {project.description}
    </p>
    <div className="flex flex-wrap gap-2">
      {project.tags.map(tag => (
        <span key={tag} className="text-[10px] uppercase tracking-wider font-bold bg-slate-800 px-2 py-1 rounded text-slate-300">
          {tag}
        </span>
      ))}
    </div>
  </div>
);

const BlogSection = ({ 
  posts, 
  onPostClick, 
  searchQuery, 
  setSearchQuery 
}: { 
  posts: BlogPost[], 
  onPostClick: (post: BlogPost) => void,
  searchQuery: string,
  setSearchQuery: (q: string) => void
}) => {
  return (
    <div className="max-w-5xl mx-auto py-12 px-6">
      <div className="mb-12">
        <h2 className="text-3xl font-bold mb-4">Journal & Gedanken</h2>
        <p className="text-slate-400 mb-8">Einblicke in meine Arbeit, neue Technologien und Web-Trends.</p>
        
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={20} />
          <input 
            type="text"
            placeholder="Nach Artikeln oder Stichworten suchen..."
            className="w-full bg-slate-800/50 border border-slate-700 rounded-2xl py-4 pl-12 pr-6 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 transition-all"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {posts.length > 0 ? (
          posts.map(post => (
            <article 
              key={post.id}
              className="group cursor-pointer glass p-8 rounded-3xl hover:border-indigo-500/50 transition-all flex flex-col"
              onClick={() => onPostClick(post)}
            >
              <div className="flex items-center gap-4 mb-4 text-xs font-semibold uppercase tracking-widest text-indigo-400">
                <span>{post.category}</span>
                <span className="w-1 h-1 bg-slate-700 rounded-full"></span>
                <span>{post.readingTime}</span>
              </div>
              <h3 className="text-2xl font-bold mb-4 group-hover:text-cyan-400 transition-colors">
                {post.title}
              </h3>
              <p className="text-slate-400 mb-6 flex-grow">
                {post.excerpt}
              </p>
              <div className="flex items-center justify-between mt-auto pt-6 border-t border-slate-800">
                <span className="text-sm text-slate-500">{post.date}</span>
                <div className="flex gap-2">
                  {post.tags.slice(0, 2).map(tag => (
                    <span key={tag} className="text-[10px] bg-slate-800 px-2 py-1 rounded text-slate-400">#{tag}</span>
                  ))}
                </div>
              </div>
            </article>
          ))
        ) : (
          <div className="col-span-full py-20 text-center text-slate-500 italic">
            Keine Artikel zu dieser Suche gefunden.
          </div>
        )}
      </div>
    </div>
  );
};

const PostDetail = ({ post, onBack }: { post: BlogPost, onBack: () => void }) => (
  <article className="max-w-3xl mx-auto pt-32 pb-20 px-6">
    <button 
      onClick={onBack}
      className="flex items-center gap-2 text-slate-400 hover:text-white mb-10 transition-colors"
    >
      <ChevronLeft size={20} /> Zurück zur Übersicht
    </button>
    
    <div className="mb-10">
      <div className="flex items-center gap-6 mb-6 text-sm text-slate-400">
        <div className="flex items-center gap-1"><Calendar size={16}/> {post.date}</div>
        <div className="flex items-center gap-1"><Clock size={16}/> {post.readingTime} Lesezeit</div>
      </div>
      <h1 className="text-4xl md:text-5xl font-extrabold mb-6 leading-tight">
        {post.title}
      </h1>
      <div className="flex flex-wrap gap-2 mb-10">
        {post.tags.map(tag => (
          <span key={tag} className="flex items-center gap-1 px-3 py-1 rounded-full bg-slate-800 text-xs font-medium text-slate-300">
            <Tag size={12} /> {tag}
          </span>
        ))}
      </div>
    </div>

    <div className="prose prose-invert prose-cyan max-w-none text-slate-300 leading-relaxed space-y-6">
      {post.content.split('\n').map((para, i) => (
        <p key={i} className={para.startsWith('###') ? 'text-2xl font-bold text-white mt-10 mb-4' : ''}>
          {para.startsWith('###') ? para.replace('###', '') : para}
        </p>
      ))}
    </div>
  </article>
);

const Footer = () => (
  <footer className="border-t border-slate-800 py-12 px-6">
    <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
      <div className="text-slate-500 text-sm">
        © 2024 Dein Name. Gebaut mit Leidenschaft & React.
      </div>
      <div className="flex gap-6">
        <a href="#" className="text-slate-400 hover:text-white transition-colors"><Github size={20} /></a>
        <a href="#" className="text-slate-400 hover:text-white transition-colors"><Mail size={20} /></a>
      </div>
    </div>
  </footer>
);

// --- Main App ---

const App = () => {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Auto-scroll to top when page changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage, selectedPost]);

  const filteredPosts = useMemo(() => {
    if (!searchQuery) return BLOG_POSTS;
    const lowQuery = searchQuery.toLowerCase();
    return BLOG_POSTS.filter(post => 
      post.title.toLowerCase().includes(lowQuery) || 
      post.excerpt.toLowerCase().includes(lowQuery) ||
      post.tags.some(t => t.toLowerCase().includes(lowQuery)) ||
      post.category.toLowerCase().includes(lowQuery)
    );
  }, [searchQuery]);

  const handlePostClick = (post: BlogPost) => {
    setSelectedPost(post);
    setCurrentPage('post');
  };

  return (
    <div className="min-h-screen">
      <Navbar currentPage={currentPage} setCurrentPage={setCurrentPage} />
      
      <main>
        {currentPage === 'home' && (
          <>
            <Hero onExplore={() => {
              const el = document.getElementById('projects');
              el?.scrollIntoView({ behavior: 'smooth' });
            }} />
            
            <section id="projects" className="max-w-6xl mx-auto px-6 py-20">
              <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
                <div>
                  <h2 className="text-3xl font-bold mb-4">Ausgewählte Projekte</h2>
                  <p className="text-slate-400">Ein Auszug meiner jüngsten Arbeiten und Experimente.</p>
                </div>
                <button 
                  onClick={() => setCurrentPage('blog')}
                  className="text-cyan-400 font-semibold flex items-center gap-2 hover:underline decoration-2 underline-offset-4"
                >
                  Alle Artikel lesen <ArrowRight size={16} />
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {PROJECTS.map(project => (
                  <ProjectCard key={project.id} project={project} />
                ))}
              </div>
            </section>

            {/* Simple About Section */}
            <section className="bg-slate-900/50 py-20 px-6">
              <div className="max-w-4xl mx-auto text-center">
                <h2 className="text-3xl font-bold mb-8">Meine Philosophie</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
                  <div>
                    <div className="text-3xl mb-4">⚡</div>
                    <h4 className="font-bold mb-2">Performance</h4>
                    <p className="text-slate-400 text-sm">Blitzschnelle Ladezeiten sind kein Feature, sondern ein Grundrecht.</p>
                  </div>
                  <div>
                    <div className="text-3xl mb-4">🎨</div>
                    <h4 className="font-bold mb-2">Design</h4>
                    <p className="text-slate-400 text-sm">Ästhetik und Funktionalität gehen Hand in Hand für beste UX.</p>
                  </div>
                  <div>
                    <div className="text-3xl mb-4">🛠️</div>
                    <h4 className="font-bold mb-2">Qualität</h4>
                    <p className="text-slate-400 text-sm">Sauberer Code ist die Basis für langlebige digitale Produkte.</p>
                  </div>
                </div>
              </div>
            </section>
          </>
        )}

        {currentPage === 'blog' && (
          <div className="pt-24">
            <BlogSection 
              posts={filteredPosts} 
              onPostClick={handlePostClick}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
            />
          </div>
        )}

        {currentPage === 'post' && selectedPost && (
          <PostDetail post={selectedPost} onBack={() => setCurrentPage('blog')} />
        )}
      </main>

      <Footer />
    </div>
  );
};

const root = createRoot(document.getElementById('root')!);
root.render(<App />);
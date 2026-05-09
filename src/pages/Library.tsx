import React, { useEffect, useState } from 'react';
import { apiClient } from '../api/apiClient';
import { Search, BookOpen, PlayCircle, FileText, Download } from 'lucide-react';

interface LibraryItem {
  id: number;
  title: string;
  author?: string;
  type: 'video' | 'article' | 'book';
  thumbnail?: string;
  description?: string;
}

export const Library = () => {
  const [items, setItems] = useState<LibraryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [activeFilter, setActiveFilter] = useState<string>('all');

  useEffect(() => {
    const fetchLibrary = async () => {
      try {
        const res = await apiClient.get('/public/library');
        const data = Array.isArray(res.data) ? res.data : res.data.data || [];
        setItems(data);
      } catch (err) {
        console.error(err);
        setItems([
          { id: 1, title: "Shaxmat ochilishlar ensiklopediyasi", author: "GM Kasparov", type: 'book', description: "Eng mashhur ochilishlar bo'yicha to'liq qo'llanma" },
          { id: 2, title: "Endshpil san'ati", author: "GM Karpov", type: 'book', description: "Endshpil o'ynash texnikasi va strategiyalari" },
          { id: 3, title: "Siziliy himoyasi: Chuqur tahlil", author: "Uzchess Academy", type: 'video', description: "Siziliy himoyasining barcha variantlari video darslik" },
          { id: 4, title: "Qirol Hind himoyasi", author: "Uzchess Academy", type: 'video', description: "KID bo'yicha to'liq video kurs" },
          { id: 5, title: "Taktik mashqlar to'plami", author: "FM Sultonov", type: 'article', description: "1000 dan ortiq taktik mashqlar" },
          { id: 6, title: "Shaxmat psixologiyasi", author: "Dr. Karimov", type: 'article', description: "Turnir paytida ruhiy tayyorgarlik" },
          { id: 7, title: "Pozitsion o'yin asoslari", author: "GM Fischer", type: 'book', description: "Pozitsion tushunchalarni o'rganish" },
          { id: 8, title: "Shaxmat tarixi: Qadimdan bugunga", author: "Prof. Rahimov", type: 'article', description: "Shaxmat o'yinining rivojlanish tarixi" },
        ]);
      } finally {
        setLoading(false);
      }
    };
    fetchLibrary();
  }, []);

  const filters = [
    { key: 'all', label: 'Barchasi' },
    { key: 'video', label: 'Videolar' },
    { key: 'book', label: 'Kitoblar' },
    { key: 'article', label: 'Maqolalar' },
  ];

  const getIcon = (type: string) => {
    switch (type) {
      case 'video': return <PlayCircle size={20} color="#00d2ff" />;
      case 'book': return <BookOpen size={20} color="#4e46ff" />;
      case 'article': return <FileText size={20} color="#9d4edd" />;
      default: return <FileText size={20} />;
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'video': return 'Video';
      case 'book': return 'Kitob';
      case 'article': return 'Maqola';
      default: return type;
    }
  };

  const filtered = items.filter(it => {
    const matchSearch = it.title.toLowerCase().includes(search.toLowerCase());
    const matchFilter = activeFilter === 'all' || it.type === activeFilter;
    return matchSearch && matchFilter;
  });

  if (loading) {
    return (
      <div className="page-container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <div className="animate-fade-in" style={{ fontSize: '1.5rem', color: 'var(--accent-secondary)' }}>Yuklanmoqda...</div>
      </div>
    );
  }

  return (
    <div className="page-container container animate-fade-in">
      <div className="page-header">
        <h1 className="page-title">Kutubxona</h1>
        <p className="page-subtitle">Kitoblar, videolar va maqolalar to'plami</p>
      </div>

      <div className="search-bar">
        <Search size={20} />
        <input
          type="text"
          placeholder="Kutubxonadan qidirish..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="search-input"
        />
      </div>

      <div className="filter-bar">
        {filters.map(f => (
          <button
            key={f.key}
            className={`filter-chip ${activeFilter === f.key ? 'active' : ''}`}
            onClick={() => setActiveFilter(f.key)}
          >
            {f.label}
          </button>
        ))}
      </div>

      <div className="library-grid">
        {filtered.map(item => (
          <div key={item.id} className="library-card glass-panel">
            <div className="library-card-thumb">
              <img
                src={item.thumbnail || 'https://images.unsplash.com/photo-1529699211952-734e80c4d42b?auto=format&fit=crop&w=400&q=80'}
                alt={item.title}
              />
              <span className="library-type-badge">{getIcon(item.type)} {getTypeLabel(item.type)}</span>
            </div>
            <div className="library-card-body">
              <h3>{item.title}</h3>
              {item.author && <span className="library-author">{item.author}</span>}
              {item.description && <p className="library-desc">{item.description}</p>}
              <button className="btn btn-glass" style={{ width: '100%', marginTop: 'auto', fontSize: '0.9rem' }}>
                <Download size={16} /> Ko'rish
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

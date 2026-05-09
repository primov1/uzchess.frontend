import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { apiClient } from '../api/apiClient';
import { Calendar, Eye, ChevronRight, Search } from 'lucide-react';

interface NewsItem {
  id: number;
  title: string;
  description: string;
  image?: string;
  createdAt?: string;
  viewCount?: number;
  category?: string;
}

export const News = () => {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await apiClient.get('/public/news');
        const data = Array.isArray(res.data) ? res.data : res.data.data || [];
        setNews(data);
      } catch (err) {
        console.error(err);
        // Placeholder data for demo
        setNews([
          { id: 1, title: "O'zbekiston shaxmat bo'yicha jahon chempionatida", description: "O'zbekiston terma jamoasi shaxmat olimpiadasida oltin medal qo'lga kiritdi. Bu tarixiy g'alaba...", image: '', createdAt: '2026-04-15', viewCount: 1240, category: "Sport" },
          { id: 2, title: "Yangi kurs: Endshpil strategiyalari", description: "Grandmaster Nodirbek Abdusattorov bilan birgalikda tayyorlangan maxsus kurs...", image: '', createdAt: '2026-04-14', viewCount: 890, category: "Ta'lim" },
          { id: 3, title: "Online turnir natijalari e'lon qilindi", description: "Haftalik online turnirda 500 dan ortiq ishtirokchi qatnashdi. G'oliblar aniqlandi...", image: '', createdAt: '2026-04-13', viewCount: 650, category: "Turnir" },
          { id: 4, title: "Shaxmat festivali 2026 boshlanadi", description: "Toshkentda o'tkaziladigan xalqaro shaxmat festivali uchun ro'yxatdan o'tish boshlandi...", image: '', createdAt: '2026-04-12', viewCount: 2100, category: "Tadbir" },
          { id: 5, title: "Bolalar uchun yangi dastur ishga tushdi", description: "6 yoshdan 14 yoshgacha bo'lgan bolalar uchun maxsus o'quv dasturi...", image: '', createdAt: '2026-04-11', viewCount: 430, category: "Ta'lim" },
          { id: 6, title: "GM Nodirbek FIDE reytingida yangi cho'qqiga chiqdi", description: "O'zbek grossmeysteri Nodirbek Abdusattorov FIDE reytingida 2750 ballga erishdi...", image: '', createdAt: '2026-04-10', viewCount: 3200, category: "Sport" },
        ]);
      } finally {
        setLoading(false);
      }
    };
    fetchNews();
  }, []);

  const filteredNews = news.filter(n =>
    n.title.toLowerCase().includes(search.toLowerCase())
  );

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
        <h1 className="page-title">Yangiliklar</h1>
        <p className="page-subtitle">So'nggi yangiliklar va voqealar bilan tanishing</p>
      </div>

      <div className="search-bar">
        <Search size={20} />
        <input
          type="text"
          placeholder="Yangiliklar bo'yicha qidirish..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="search-input"
        />
      </div>

      {/* Featured News */}
      {filteredNews.length > 0 && (
        <Link to={`/news/${filteredNews[0].id}`} className="featured-news-card">
          <div className="featured-news-image">
            <img
              src={filteredNews[0].image || 'https://images.unsplash.com/photo-1560174038-da43ac74f01b?auto=format&fit=crop&w=1200&q=80'}
              alt={filteredNews[0].title}
            />
            <div className="featured-news-overlay">
              {filteredNews[0].category && <span className="news-badge">{filteredNews[0].category}</span>}
              <h2>{filteredNews[0].title}</h2>
              <p>{filteredNews[0].description}</p>
              <div className="news-meta">
                <span><Calendar size={14} /> {filteredNews[0].createdAt}</span>
                <span><Eye size={14} /> {filteredNews[0].viewCount} ko'rilgan</span>
              </div>
            </div>
          </div>
        </Link>
      )}

      {/* News Grid */}
      <div className="news-grid">
        {filteredNews.slice(1).map(item => (
          <Link to={`/news/${item.id}`} key={item.id} className="news-card">
            <div className="news-card-image">
              <img
                src={item.image || 'https://images.unsplash.com/photo-1529699211952-734e80c4d42b?auto=format&fit=crop&w=800&q=80'}
                alt={item.title}
              />
              {item.category && <span className="news-badge">{item.category}</span>}
            </div>
            <div className="news-card-body">
              <h3>{item.title}</h3>
              <p>{item.description}</p>
              <div className="news-meta">
                <span><Calendar size={14} /> {item.createdAt}</span>
                <span><Eye size={14} /> {item.viewCount}</span>
              </div>
              <span className="news-read-more">Batafsil <ChevronRight size={16} /></span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

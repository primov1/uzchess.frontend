import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { apiClient } from '../api/apiClient';
import { Calendar, Eye, ChevronLeft, Share2, Clock } from 'lucide-react';

interface NewsDetail {
  id: number;
  title: string;
  description: string;
  content?: string;
  image?: string;
  createdAt?: string;
  viewCount?: number;
  category?: string;
}

export const NewsDetail = () => {
  const { id } = useParams();
  const [article, setArticle] = useState<NewsDetail | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const res = await apiClient.get(`/public/news/${id}`);
        setArticle(res.data);
      } catch (err) {
        console.error(err);
        setArticle({
          id: Number(id),
          title: "O'zbekiston shaxmat bo'yicha jahon chempionatida g'olib",
          description: "O'zbekiston terma jamoasi shaxmat olimpiadasida oltin medal qo'lga kiritdi.",
          content: `O'zbekiston shaxmat terma jamoasi 2026-yilgi Shaxmat Olimpiadasida tarixiy g'alabaga erishdi. Jamoamiz barcha raqiblarini ortda qoldirib, oltin medalni qo'lga kiritdi.\n\nBu g'alaba O'zbekiston shaxmat tarixida yangi sahifa ochdi. Terma jamoa a'zolari – GM Nodirbek Abdusattorov, GM Javokhir Sindarov, GM Shamsiddin Vokhidov va boshqalar ajoyib natijalar ko'rsatdilar.\n\nTurnir davomida jamoamiz 11 ta o'yinning 9 tasida g'alaba qozondi, 2 tasida durrang o'ynadi. Bu natija turnir tarixidagi eng yaxshi ko'rsatkichlardan biri bo'ldi.\n\nFIDE prezidenti bu g'alabani "shaxmat dunyosida yangi era boshlanishi" deb baholadi. O'zbekiston Prezidenti ham g'oliblarni tabriklab, ularni davlat mukofotlariga tavsiya etdi.\n\nEndi jamoamiz 2027-yilgi jahon chempionatiga tayyorgarlik ko'rmoqda. Muxlislar kelajakdagi muvaffaqiyatlarga katta ishonch bilan qaramoqda.`,
          image: '',
          createdAt: '2026-04-15',
          viewCount: 1240,
          category: 'Sport',
        });
      } finally {
        setLoading(false);
      }
    };
    fetchArticle();
  }, [id]);

  if (loading) {
    return (
      <div className="page-container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <div className="animate-fade-in" style={{ fontSize: '1.5rem', color: 'var(--accent-secondary)' }}>Yuklanmoqda...</div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="page-container container" style={{ textAlign: 'center', paddingTop: '200px' }}>
        <h2>Maqola topilmadi</h2>
        <Link to="/news" className="btn btn-glass" style={{ marginTop: '1rem' }}>Ortga qaytish</Link>
      </div>
    );
  }

  return (
    <div className="page-container animate-fade-in">
      <div className="news-detail-hero">
        <img
          src={article.image || 'https://images.unsplash.com/photo-1560174038-da43ac74f01b?auto=format&fit=crop&w=1600&q=80'}
          alt={article.title}
          className="news-detail-hero-img"
        />
        <div className="news-detail-hero-overlay">
          <div className="container">
            <Link to="/news" className="news-detail-back">
              <ChevronLeft size={20} /> Yangiliklarga qaytish
            </Link>
            {article.category && <span className="news-badge">{article.category}</span>}
            <h1>{article.title}</h1>
            <div className="news-meta" style={{ marginTop: '1rem' }}>
              <span><Calendar size={14} /> {article.createdAt}</span>
              <span><Eye size={14} /> {article.viewCount} ko'rilgan</span>
              <span><Clock size={14} /> 5 daqiqa o'qish</span>
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="news-detail-content">
          <div className="news-detail-body">
            <p className="news-detail-lead">{article.description}</p>
            {(article.content || '').split('\n').map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>

          <div className="news-detail-sidebar">
            <div className="glass-panel" style={{ padding: '1.5rem' }}>
              <h3 style={{ marginBottom: '1rem', fontSize: '1.1rem' }}>Ulashish</h3>
              <div style={{ display: 'flex', gap: '0.75rem' }}>
                <button className="btn btn-glass" style={{ flex: 1, fontSize: '0.85rem' }}>
                  <Share2 size={16} /> Telegram
                </button>
                <button className="btn btn-glass" style={{ flex: 1, fontSize: '0.85rem' }}>
                  <Share2 size={16} /> Copy
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

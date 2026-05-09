
import { apiClient } from '../api/apiClient';
import { Star, Clock } from 'lucide-react';
import {useEffect, useState} from "react";

interface Course {
  id: number;
  title: string;
  description: string;
  price: number;
  image?: string;
  authorId?: number;
}

export const Courses = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await apiClient.get('/public/courses');
        if (Array.isArray(res.data)) {
            setCourses(res.data);
        } else if (res.data.data) {
            setCourses(res.data.data);
        }
      } catch (err: any) {
        setError('Failed to fetch courses. Please try again later.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  if (loading) {
    return (
      <div className="page-container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <div className="animate-fade-in" style={{ fontSize: '1.5rem', color: 'var(--accent-secondary)' }}>Loading courses...</div>
      </div>
    );
  }

  return (
    <div className="page-container container animate-fade-in">
      <div style={{ marginBottom: '3rem', textAlign: 'center' }}>
        <h1 className="hero-title" style={{ fontSize: '3rem', marginBottom: '1rem' }}>Our <span className="text-gradient">Premium Courses</span></h1>
        <p className="hero-subtitle" style={{ margin: '0 auto' }}>Elevate your game with meticulously structured training from world-class players and coaches.</p>
      </div>

      {error ? (
        <div className="global-error">{error}</div>
      ) : (
        <div className="grid-cards">
          {courses.length === 0 ? (
            <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '4rem', background: 'var(--bg-glass)', borderRadius: 'var(--radius-lg)' }}>
              No courses available right now.
            </div>
          ) : (
            courses.map(course => (
              <div key={course.id} className="course-card">
                <img 
                  src={course.image ? `${apiClient.defaults.baseURL}/${course.image}` : 'https://images.unsplash.com/photo-1529699211952-734e80c4d42b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'} 
                  alt={course.title} 
                  className="course-image"
                />
                <div className="course-content">
                  <div>
                    <h3 className="course-title">{course.title}</h3>
                    <p className="course-desc">{course.description || "Learn advanced concepts and apply them directly to your tournament games."}</p>
                  </div>
                  
                  <div className="course-meta">
                    <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
                      <Clock size={16} /> 12 Hours
                    </div>
                    <div style={{ display: 'flex', gap: '0.25rem', alignItems: 'center', color: '#ffb703', fontSize: '0.85rem', fontWeight: 600 }}>
                      <Star size={16} fill="#ffb703" /> 4.9
                    </div>
                    <div style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--accent-secondary)' }}>
                      {course.price ? `$${course.price}` : 'Free'}
                    </div>
                  </div>
                  
                  <button className="btn btn-glass" style={{ width: '100%', marginTop: '0.5rem' }}>View Details</button>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

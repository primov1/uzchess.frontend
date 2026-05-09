
import { Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { Courses } from './pages/Courses';
import { News } from './pages/News';
import { NewsDetail } from './pages/NewsDetail';
import { Library } from './pages/Library';
import { Profile } from './pages/Profile';
import { ProfileEdit } from './pages/ProfileEdit';
import { Cart } from './pages/Cart';
import { Contact } from './pages/Contact';
import { Live } from './pages/Live';
import { NotFound } from './pages/NotFound';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Login />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/news" element={<News />} />
        <Route path="/news/:id" element={<NewsDetail />} />
        <Route path="/library" element={<Library />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/profile/edit" element={<ProfileEdit />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/live" element={<Live />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;

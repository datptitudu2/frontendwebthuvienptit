// filepath: /f:/Webthuvien/frontend/src/components/home/Home.jsx
import React, { useState, useEffect } from 'react';
import { FaBook, FaUsers, FaLaptop, FaArrowRight, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import newsService from '../../services/news.service';
import bookService from '../../services/book.service';
import './Home.css';

const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [latestNews, setLatestNews] = useState([]);
  const [featuredBooks, setFeaturedBooks] = useState([]);
  const [loadingNews, setLoadingNews] = useState(true);
  const [loadingBooks, setLoadingBooks] = useState(true);

  const slides = [
    {
      image: 'https://scontent.fhan14-1.fna.fbcdn.net/v/t39.30808-6/384230594_695521912608776_3670382646471204016_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=833d8c&_nc_ohc=_Ooa4fdfj9cQ7kNvgF4MwcK&_nc_oc=AdjPEoqDrGFChowN94-Xw2GPPRSgWM_7fRvlW0hCjx-y7EiM5UbikH-JRemDWDJEnAU&_nc_zt=23&_nc_ht=scontent.fhan14-1.fna&_nc_gid=A7nDvjFhdETpunuTvyYj8OO&oh=00_AYArR7Rn4XZqMNsHu_WZzhGNqXlZh-ma_ZIBwHwtFXZwBA&oe=678CF438',
      title: 'Thư Viện Hiện Đại PTIT',
      description: 'Khám phá kho tàng tri thức với hơn 10,000 đầu sách'
    },
    {
      image: 'https://scontent.fhan14-3.fna.fbcdn.net/v/t1.6435-9/37368350_246126982667520_4388152053210284032_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=833d8c&_nc_ohc=AZ9jfMIXg58Q7kNvgFo5IHB&_nc_oc=AdhJRGE8crl1xC_BhhF-E1OLCWDUuEINrp7ggIMr-BmfXyPZ-0MH36lWCT3uUGwyFXU&_nc_zt=23&_nc_ht=scontent.fhan14-3.fna&_nc_gid=AvlOJkl_0n5qZEhJQUN3aUQ&oh=00_AYBH0T8J1NsCHQfAiM9ZqbGVoX7zlOUH-glEMIdbLT-ZOA&oe=67AE88B7',
      title: 'Học Tập Không Giới Hạn',
      description: 'Truy cập 24/7 với thư viện điện tử của chúng tôi'
    },
    {
      image: 'https://ptit.edu.vn/wp-content/uploads/2024/10/Anh-4-1-668x520.jpg',
      title: 'Cộng Đồng Học Tập',
      description: 'Kết nối với hàng nghìn độc giả khác'
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  useEffect(() => {
    fetchLatestNews();
    fetchFeaturedBooks();
  }, []);

  const fetchLatestNews = async () => {
    try {
      const response = await newsService.getAllNews({
        page: 1,
        limit: 3,
        status: 'published',
        featured: true
      });
      
      if (response.success) {
        setLatestNews(response.data.slice(0, 5));
      }
    } catch (error) {
      console.error('Failed to fetch latest news:', error);
    } finally {
      setLoadingNews(false);
    }
  };

  const fetchFeaturedBooks = async () => {
    try {
      const response = await bookService.getAllBooks();
      
      if (response.success) {
        setFeaturedBooks(response.data.slice(0, 5)); // Lấy 2 sách nổi bật đầu tiên
      }
    } catch (error) {
      console.error('Failed to fetch featured books:', error);
    } finally {
      setLoadingBooks(false);
    }
  };

  return (
    <div className="home-container">
      {/* Hero Slider Section */}
      <section className="hero-slider">
        <div className="slides-container" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
          {slides.map((slide, index) => (
            <div key={index} className="slide">
              <img src={slide.image} alt={slide.title} />
              <div className="slide-content">
                <h1>{slide.title}</h1>
                <p>{slide.description}</p>
                <Link to="/books" className="cta-button">
                  Khám Phá Ngay <FaArrowRight />
                </Link>
              </div>
            </div>
          ))}
        </div>
        <button className="slider-btn prev" onClick={prevSlide}>
          <FaChevronLeft />
        </button>
        <button className="slider-btn next" onClick={nextSlide}>
          <FaChevronRight />
        </button>
        <div className="slider-dots">
          {slides.map((_, index) => (
            <span
              key={index}
              className={`dot ${currentSlide === index ? 'active' : ''}`}
              onClick={() => setCurrentSlide(index)}
            />
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="section-header">
          <h2>Dịch Vụ Của Chúng Tôi</h2>
          <p>Trải nghiệm những tính năng tuyệt vời tại thư viện PTIT</p>
        </div>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">
              <FaBook />
            </div>
            <h3>Kho Sách Đa Dạng</h3>
            <p>Hơn 10,000 đầu sách từ nhiều lĩnh vực khác nhau</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">
              <FaLaptop />
            </div>
            <h3>Thư Viện Điện Tử</h3>
            <p>Truy cập và đọc sách online mọi lúc mọi nơi</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">
              <FaUsers />
            </div>
            <h3>Cộng Đồng</h3>
            <p>Tham gia thảo luận và chia sẻ với cộng đồng độc giả</p>
          </div>
        </div>
      </section>

      {/* Featured Books Section */}
      <section className="books-section">
        <div className="section-header">
          <h2>Sách Nổi Bật</h2>
          <p>Khám phá những cuốn sách nổi bật tại thư viện</p>
        </div>
        <div className="books-grid">
          {loadingBooks ? (
            <div className="loading">Đang tải sách...</div>
          ) : featuredBooks.length > 0 ? (
            featuredBooks.map((book) => (
              <div key={book.id} className="book-card">
                <div className="book-image">
                  <img 
                    src={book.image_url ? `https://khongbugptit.onrender.com${book.image_url}` : '/uploads/news/news_image-1737038718866-799210677.png'}
                    alt={book.title}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = '/images/default-book.jpg';
                    }}
                  />
                </div>
                <div className="book-content">
                  <span className="book-author">{book.author}</span>
                  <h3>{book.title}</h3>
                  <p>{book.description.substring(0, 100)}...</p>
                  <Link to={`/books/${book.id}`} className="read-more">
                    Xem thêm <FaArrowRight />
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <div className="no-books">Không có sách nổi bật</div>
          )}
        </div>
        <div className="view-all-books">
          <Link to="/books" className="view-all-button">
            Xem tất cả sách <FaArrowRight />
          </Link>
        </div>
      </section>

      {/* Latest News Section */}
      <section className="news-section">
        <div className="section-header">
          <h2>Tin Tức Mới Nhất</h2>
          <p>Cập nhật những thông tin mới nhất từ thư viện</p>
        </div>
        <div className="news-grid">
          {loadingNews ? (
            <div className="loading">Đang tải tin tức...</div>
          ) : latestNews.length > 0 ? (
            latestNews.map((news) => (
              <div key={news.id} className="news-card">
                <div className="news-image">
                  <img 
                    src={news.image_url ? `https://khongbugptit.onrender.com${news.image_url}` : '/uploads/news/news_image-1737038718866-799210677.png'}
                    alt={news.title}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = '/uploads/news/news_image-1737038718866-799210677.png';
                    }}
                  />
                </div>
                <div className="news-content">
                  <span className="news-date">
                    {new Date(news.published_at).toLocaleDateString('vi-VN')}
                  </span>
                  <h3>{news.title}</h3>
                  <p>{news.content.substring(0, 100)}...</p>
                  <Link to={`/news/${news.id}`} className="read-more">
                    Xem thêm <FaArrowRight />
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <div className="no-news">Không có tin tức mới</div>
          )}
        </div>
        <div className="view-all-news">
          <Link to="/news" className="view-all-button">
            Xem tất cả tin tức <FaArrowRight />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaEnvelope, FaLock } from 'react-icons/fa';
import { toast } from 'react-toastify';
import authService from '../../services/auth.service';
import './Login.css';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    login_id: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const togglePasswordVisibility = () => {
    setShowPassword(prev => !prev);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await authService.login(formData.login_id, formData.password);
      if (response.success) {
        toast.success('Đăng nhập thành công!');
        navigate('/home'); // Chuyển hướng đến trang Home
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Đăng nhập thất bại');
    }
  };

  return (
    <div className="login-container">
      <div className="login-wrapper">
        <div className="login-header">
          <h1>HỌC VIỆN CÔNG NGHỆ BƯU CHÍNH VIỄN THÔNG</h1>
          <h2>HỆ THỐNG THƯ VIỆN TRỰC TUYẾN</h2>
        </div>

        <div className="login-form">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Tên đăng nhập</label>
              <div className="input-with-icon">
                <FaEnvelope className="input-icon" />
                <input
                  type="text"
                  name="login_id"
                  placeholder="Nhập tên đăng nhập"
                  value={formData.login_id}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label>Mật khẩu</label>
              <div className="input-with-icon">
                <FaLock className="input-icon" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  placeholder="Nhập mật khẩu"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
                <button
                  type="button"
                  className="toggle-password"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? 'Ẩn' : 'Hiện'}
                </button>
              </div>
            </div>

            <button type="submit" className="login-btn">
              Đăng nhập
            </button>

            <div className="register-link">
              <span>Chưa có tài khoản? </span>
              <span className="register-now" onClick={() => navigate('/register')}>
                Đăng ký ngay
              </span>
            </div>
          </form>
        </div>

        <div className="footer">
          <p>© 2024 Học viện Công nghệ Bưu chính Viễn thông</p>
          <p>Developed by AISoft</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
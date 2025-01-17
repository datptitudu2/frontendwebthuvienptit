import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaEnvelope, FaLock, FaUser, FaPhone } from 'react-icons/fa';
import { toast } from 'react-toastify';
import authService from '../../services/auth.service';
import './Register.css';

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    phone: '',
    password: '',
    full_name: ''
  });
  const [phoneError, setPhoneError] = useState('');

  const validatePhone = (phone) => {
    if (!phone) {
      setPhoneError('Số điện thoại không được để trống');
      return false;
    }
    if (!/^0\d{9}$/.test(phone)) {
      setPhoneError('Số điện thoại phải có 10 số và bắt đầu bằng số 0');
      return false;
    }
    setPhoneError('');
    return true;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Validate phone khi người dùng nhập
    if (name === 'phone') {
      validatePhone(value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validatePhone(formData.phone)) {
      return;
    }

    try {
      const response = await authService.register(
        formData.email,
        formData.phone,
        formData.password,
        formData.full_name
      );
      
      if (response.success) {
        toast.success('Đăng ký thành công!');
        navigate('/login');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Đăng ký thất bại');
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
              <label>Họ và tên</label>
              <div className="input-with-icon">
                <FaUser className="input-icon" />
                <input
                  type="text"
                  name="full_name"
                  placeholder="Nhập họ và tên của bạn"
                  value={formData.full_name}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label>Email</label>
              <div className="input-with-icon">
                <FaEnvelope className="input-icon" />
                <input
                  type="email"
                  name="email"
                  placeholder="Nhập email của bạn"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label>Số điện thoại</label>
              <div className="input-with-icon">
                <FaPhone className="input-icon" />
                <input
                  type="tel"
                  name="phone"
                  className={`phone-input ${phoneError ? 'error' : ''}`}
                  placeholder="Nhập số điện thoại của bạn"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
                {phoneError && (
                  <div className="error-message">
                    {phoneError}
                  </div>
                )}
              </div>
              <div className="requirements">
                Số điện thoại phải có 10 số và bắt đầu bằng số 0
              </div>
            </div>

            <div className="form-group">
              <label>Mật khẩu</label>
              <div className="input-with-icon">
                <FaLock className="input-icon" />
                <input
                  type="password"
                  name="password"
                  placeholder="Nhập mật khẩu của bạn"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <button type="submit" className="login-btn">
              Đăng ký
            </button>

            <div className="register-link">
              <span>Đã có tài khoản? </span>
              <span className="register-now" onClick={() => navigate('/login')}>
                Đăng nhập ngay
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

export default Register;
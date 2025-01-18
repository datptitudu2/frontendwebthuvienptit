import axios from 'axios';

const API_URL = 'https://khongbugptit.onrender.com/api/profile';
const DEFAULT_AVATAR = 'https://res.cloudinary.com/dgamdk5x9/image/upload/v1/avatars/default-avatar.jpg';

const getAuthHeader = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  return user?.token ? { 
    'Authorization': `Bearer ${user.token}`,
    'Content-Type': 'application/json'
  } : {};
};

const getProfile = async () => {
  try {
    const response = await axios.get(API_URL, { headers: getAuthHeader() });
    // Kiểm tra và gán avatar mặc định nếu không có avatar_url
    if (response.data.success && (!response.data.data.avatar_url || response.data.data.avatar_url === '/uploads/avatars/default-avatar.png')) {
      response.data.data.avatar_url = DEFAULT_AVATAR;
    }
    return response.data;
  } catch (error) {
    throw error;
  }
};

const updateProfile = async (profileData) => {
  try {
    const response = await axios.put(API_URL, profileData, {
      headers: getAuthHeader()
    });
    
    if (response.data.success) {
      const user = JSON.parse(localStorage.getItem('user'));
      const updatedUser = { ...user, ...profileData };
      localStorage.setItem('user', JSON.stringify(updatedUser));
    }
    
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

const changePassword = async (passwordData) => {
  try {
    const response = await axios.put(`${API_URL}/password`, passwordData, {
      headers: getAuthHeader()
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

const updateAvatar = async (formData) => {
  try {
    const response = await axios.post(`${API_URL}/avatar`, formData, {
      headers: {
        ...getAuthHeader(),
        'Content-Type': 'multipart/form-data'
      }
    });
    
    if (response.data.success) {
      const user = JSON.parse(localStorage.getItem('user'));
      const avatar_url = response.data.data.avatar_url || DEFAULT_AVATAR;
      
      // Cập nhật avatar_url trong localStorage
      localStorage.setItem('user', JSON.stringify({
        ...user,
        avatar_url
      }));
    }
    
    return response.data;
  } catch (error) {
    throw error;
  }
};

const profileService = {
  getProfile,
  updateProfile,
  changePassword,
  updateAvatar
};

export default profileService;
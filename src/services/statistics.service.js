import axios from 'axios';

const API_URL = 'https://khongbugptit.onrender.com/api/statistics';

const getAuthHeader = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    return user?.token ? { 
        'Authorization': `Bearer ${user.token}`,
        'Content-Type': 'application/json'
    } : {};
};

const getStatistics = async () => {
    try {
        const response = await axios.get(API_URL, {
            headers: getAuthHeader()
        });
        return response.data;
    } catch (error) {
        throw error.response?.data || error;
    }
};

const getUserStatistics = async () => {
    try {
        const response = await axios.get(`${API_URL}/user`, {
            headers: getAuthHeader()
        });
        return response.data;
    } catch (error) {
        throw error.response?.data || error;
    }
};

const statisticsService = {
    getStatistics,
    getUserStatistics
};

export default statisticsService;
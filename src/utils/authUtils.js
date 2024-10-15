export const getUserInfoFromToken = () => {
    const token = localStorage.getItem('authToken');
    if (!token) return { username: '', role: '' };
  
    const decodedToken = JSON.parse(atob(token.split('.')[1]));
    return {
      username: decodedToken.username,
      role: decodedToken.role
    };
};

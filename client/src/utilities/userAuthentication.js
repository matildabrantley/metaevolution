class UserAuthentication {
  login(userIDtoken) {
    localStorage.setItem('userIDtoken', userIDtoken);
    window.location.assign('/');
  }
  getToken() {
    return localStorage.getItem('userIDtoken');
  }
  isTokenExpired(token) {
    try {
      const decoded = require('jwt-decode').(token);
      decoded.exp < Date.now() / 1000 ? true : false;
    } 
    catch (err) { return false; }
  }
}

export default new UserAuthentication();

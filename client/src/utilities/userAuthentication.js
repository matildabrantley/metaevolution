class UserAuthentication {
  login(userIDtoken) {
    localStorage.setItem('userIDtoken', userIDtoken);
    window.location.assign('/');
  }
  loggedIn() {
    const token = this.getToken();
    if (!!token && !this.isTokenExpired(token))
      return true;
    else
      return false;
  }
  getToken() {
    return localStorage.getItem('userIDtoken');
  }
  isTokenExpired(token) {
    try {
      const decoded = require('jwt-decode')(token);
      if (decoded.exp < Date.now() / 1000) 
        return true;
      else 
        return false;
    } 
    catch (err) { return false; }
  }
}

export default new UserAuthentication();

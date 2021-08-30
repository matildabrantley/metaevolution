class UserAuthentication {
  login(userIDtoken) {
    //store token 
    localStorage.setItem('userIDtoken', userIDtoken);

    //start over, now logged in
    window.location.assign('/');
  }
  logout() {
    //delete personal data
    localStorage.removeItem('userIDtoken');

    //start over, logged out
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

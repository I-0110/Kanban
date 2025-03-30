import { JwtPayload, jwtDecode } from 'jwt-decode';

class AuthService {
  getProfile() {
    // TODO: return the decoded token. This method will decode the token or return null if there is not token
    const token = this.getToken();
    return token ? jwtDecode(token): null; 
  }

  loggedIn() {
    // TODO: return a value that indicates if the user is logged in. It will return a boolean about if the token is still good or not. 
    const token = this.getToken();
    return token && !this.isTokenExpired(token);
  }
  
  isTokenExpired(token: string) {
    // TODO: return a value that indicates if the token is expired. This method tells when the token is expired. 
    const decoded: JwtPayload = jwtDecode(token);
    if (decoded.exp) {
      return decoded.exp * 1000 < Date.now();
    }
    return true;
  }

  getToken(): string {
    // TODO: return the token
    const loggedUser = localStorage.getItem('id_token') || '';
    return loggedUser;
  }

  login(idToken: string) {
    // TODO: set the token to localStorage
    localStorage.setItem('id_token', idToken);
    // TODO: redirect to the home page
    window.location.assign('/');
  }

  logout() {
    // TODO: remove the token from localStorage
    localStorage.removeItem('id_token');
    // TODO: redirect to the login page
    window.location.assign('/');
  }
}

export default new AuthService();

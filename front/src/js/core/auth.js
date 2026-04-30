const Auth = {
  getToken() {
    return localStorage.getItem('token');
  },

  getUser() {
    try {
      return JSON.parse(localStorage.getItem('user'));
    } catch {
      localStorage.removeItem('user');
      return null;
    }
  },

  isLoggedIn() {
    return !!localStorage.getItem('token');
  },

  save(token, user) {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
  },

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/pages/auth.html';
  },

  requireAuth() {
    if (!this.isLoggedIn()) {
      window.location.href = '/pages/auth.html';
    }
  },

  authHeader() {
    return {
      "Content-Type": "application/json",
      Authorization: `Bearer ${this.getToken()}`,
    };
  },
};

export default Auth;

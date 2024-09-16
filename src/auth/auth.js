export const isAuthSelector = (state) => {
    // Check if a specific key in sessionStorage is true
    return sessionStorage.getItem('isAuthenticated') === 'true';
  };
  
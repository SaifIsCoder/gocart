// Session and cookie management utilities

// Set a cookie
export const setCookie = (name, value, days = 7) => {
  if (typeof window === 'undefined') return;
  
  const expires = new Date();
  expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
  document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/;SameSite=Lax`;
};

// Get a cookie
export const getCookie = (name) => {
  if (typeof window === 'undefined') return null;
  
  const nameEQ = name + "=";
  const ca = document.cookie.split(';');
  
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === ' ') c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
  }
  
  return null;
};

// Delete a cookie
export const deleteCookie = (name) => {
  if (typeof window === 'undefined') return;
  
  document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;`;
};

// Set user session
export const setUserSession = (userData) => {
  if (typeof window === 'undefined') return;
  
  try {
    // Store in localStorage
    localStorage.setItem('userSession', JSON.stringify({
      ...userData,
      timestamp: Date.now()
    }));
    
    // Also set cookie for server-side access
    setCookie('userSession', JSON.stringify(userData), 7);
  } catch (error) {
    console.error('Error setting user session:', error);
  }
};

// Get user session
export const getUserSession = () => {
  if (typeof window === 'undefined') return null;
  
  try {
    // Try localStorage first
    const session = localStorage.getItem('userSession');
    if (session) {
      const userData = JSON.parse(session);
      // Check if session is expired (7 days)
      const sevenDays = 7 * 24 * 60 * 60 * 1000;
      if (Date.now() - userData.timestamp < sevenDays) {
        return userData;
      } else {
        // Session expired, clear it
        clearUserSession();
        return null;
      }
    }
    
    // Fallback to cookie
    const cookieSession = getCookie('userSession');
    if (cookieSession) {
      return JSON.parse(cookieSession);
    }
    
    return null;
  } catch (error) {
    console.error('Error getting user session:', error);
    return null;
  }
};

// Clear user session
export const clearUserSession = () => {
  if (typeof window === 'undefined') return;
  
  try {
    localStorage.removeItem('userSession');
    deleteCookie('userSession');
  } catch (error) {
    console.error('Error clearing user session:', error);
  }
};

// Check if user is logged in
export const isLoggedIn = () => {
  return getUserSession() !== null;
};


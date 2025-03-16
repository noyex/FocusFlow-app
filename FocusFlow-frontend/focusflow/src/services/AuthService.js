const API_URL = 'http://localhost:8080/api/auth';

export const register = async (username, email, password) => {
  try {
    const response = await fetch(`${API_URL}/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, email, password }),
    });
    
    // Log status code to debug
    console.log('Registration response status:', response.status);
    
    if (!response.ok) {
      // Try to get the response as JSON
      const errorData = await response.json();
      console.log('Error response:', errorData);
      
      // If we have a message in the response, use it
      if (errorData && errorData.message) {
        throw new Error(errorData.message);
      } else {
        // Fallback error message
        throw new Error(`Registration failed with status: ${response.status}`);
      }
    }
    
    return await response.json();
  } catch (error) {
    console.error('Registration error:', error);
    throw error;
  }
};

export const verifyAccount = async (email, verificationCode) => {
  try {
    console.log('Sending verification request with:', { email, verificationCode, type: typeof verificationCode });
    
    const response = await fetch(`${API_URL}/verify`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, verificationCode }),
    });
    
    // Log status code to debug
    console.log('Verification response status:', response.status);
    
    // If status is 200 (or 2xx range), consider it a success regardless of body content
    if (response.status >= 200 && response.status < 300) {
      console.log('Verification successful based on status code');
      // Try to parse JSON, but don't fail if it's not valid JSON
      try {
        const data = await response.json();
        console.log('Verification API response:', data);
        return data;
      } catch (e) {
        console.log('Could not parse JSON response, but verification was successful');
        return { success: true, message: 'Account verified successfully' };
      }
    }
    
    // If we reach here, it's an error
    try {
      const errorData = await response.json();
      console.error('Verification failed with response:', errorData);
      throw new Error(errorData.message || 'Verification failed');
    } catch (e) {
      // If we can't parse the error JSON
      throw new Error(`Verification failed with status: ${response.status}`);
    }
  } catch (error) {
    console.error('Verification error:', error);
    throw error;
  }
};

export const login = async (email, password) => {
  try {
    const response = await fetch(`${API_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });
    
    // Log status code to debug
    console.log('Login response status:', response.status);
    
    if (!response.ok) {
      // Try to get the response as JSON
      try {
        const errorData = await response.json();
        console.log('Login error response:', errorData);
        
        // If we have a message in the response, use it
        if (errorData && errorData.message) {
          throw new Error(errorData.message);
        }
      } catch (e) {
        // If we can't parse the error JSON
        console.log('Could not parse login error response as JSON');
      }
      
      // Fallback error message
      throw new Error('Invalid email or password. Please try again.');
    }
    
    const data = await response.json();
    localStorage.setItem('token', data.token);
    localStorage.setItem('tokenExpiration', new Date().getTime() + data.expiresIn);
    
    return data;
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
};

export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('tokenExpiration');
};

export const getToken = () => {
  const token = localStorage.getItem('token');
  const expiration = localStorage.getItem('tokenExpiration');
  
  if (!token || !expiration) {
    return null;
  }
  
  if (new Date().getTime() > expiration) {
    logout();
    return null;
  }
  
  return token;
};

export const isAuthenticated = () => {
  return getToken() !== null;
};

export const getUserProfile = async () => {
  try {
    const token = getToken();
    if (!token) {
      throw new Error('No authentication token found');
    }

    const response = await fetch('http://localhost:8080/api/users/me', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch user profile');
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching user profile:', error);
    throw error;
  }
};

export const resendVerificationCode = async (email) => {
  try {
    console.log('Resending verification code for:', email);
    
    const response = await fetch(`${API_URL}/resend`, {
      method: 'POST',
      headers: {
        'Content-Type': 'text/plain',
      },
      body: email,
    });
    
    // Log status code to debug
    console.log('Resend verification code response status:', response.status);
    
    // If status is 200 (or 2xx range), consider it a success
    if (response.status >= 200 && response.status < 300) {
      console.log('Verification code resent successfully');
      return { success: true, message: 'Verification code resent successfully' };
    }
    
    // If we reach here, it's an error
    try {
      const errorData = await response.text();
      console.error('Resend verification code failed with response:', errorData);
      throw new Error(errorData || 'Failed to resend verification code');
    } catch (e) {
      // If we can't parse the error response
      throw new Error(`Failed to resend verification code with status: ${response.status}`);
    }
  } catch (error) {
    console.error('Resend verification code error:', error);
    throw error;
  }
};
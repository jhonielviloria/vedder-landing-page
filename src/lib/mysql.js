// MySQL client initialization for frontend API calls
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001/api';

export const mysqlEnabled = Boolean(API_BASE_URL);

// API client for communicating with MySQL backend
class MySQLClient {
  constructor(baseURL) {
    this.baseURL = baseURL;
  }

  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || `HTTP ${response.status}`);
      }
      
      return { data, error: null };
    } catch (error) {
      console.error(`MySQL API Error (${endpoint}):`, error);
      return { data: null, error: error.message };
    }
  }

  // Products API
  async getProducts() {
    return this.request('/products');
  }

  async createProduct(product) {
    return this.request('/products', {
      method: 'POST',
      body: JSON.stringify(product),
    });
  }

  async updateProduct(id, product) {
    return this.request(`/products/${id}`, {
      method: 'PUT',
      body: JSON.stringify(product),
    });
  }

  async deleteProduct(id) {
    return this.request(`/products/${id}`, {
      method: 'DELETE',
    });
  }

  // Contact Messages API
  async createContactMessage(message) {
    return this.request('/contact-messages', {
      method: 'POST',
      body: JSON.stringify(message),
    });
  }

  async getContactMessages(page = 1, limit = 20) {
    return this.request(`/contact-messages?page=${page}&limit=${limit}`);
  }
}

export const mysql = mysqlEnabled 
  ? new MySQLClient(API_BASE_URL)
  : null;

if (!mysqlEnabled) {
  console.warn('MySQL API not configured. Add VITE_API_BASE_URL to .env.local and ensure backend is running.');
}
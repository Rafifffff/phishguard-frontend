const BASE_URL = "https://adorable-tranquility-production-f56c.up.railway.app/api";

// ================= TOKEN MANAGEMENT =================
const TOKEN_KEY = "phishguard_token";
const USER_KEY = "phishguard_user";

export const setToken = (token) => {
  if (token) {
    localStorage.setItem(TOKEN_KEY, token);
  }
};

export const getToken = () => {
  return localStorage.getItem(TOKEN_KEY);
};

export const removeToken = () => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
};

export const setUser = (user) => {
  if (user) {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  }
};

export const getUser = () => {
  const user = localStorage.getItem(USER_KEY);
  return user ? JSON.parse(user) : null;
};

export const isAuthenticated = () => {
  return !!getToken();
};

// ================= FETCH API WITH AUTH =================
const fetchApi = async (endpoint, options = {}) => {
  const token = getToken();
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };
  
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });
  
  // Skip session check untuk endpoint auth (login tidak butuh throw "session expired")
  const skipSessionCheck = options.skipSessionCheck || endpoint.includes('/auth') || endpoint.includes('/admin/login');
  
  if (response.status === 401 && !skipSessionCheck) {
    removeToken();
    throw new Error("Session expired. Silakan login kembali.");
  }
  
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
  }
  
  const text = await response.text();
  return text ? JSON.parse(text) : null;
};

// ================= ARTICLES =================
export const getArticles = async (kategori = "", page = 1) => {
  try {
    const queryParams = new URLSearchParams();
    if (kategori) queryParams.append("kategori", kategori);
    if (page) queryParams.append("page", page);
    return await fetchApi(`/articles?${queryParams.toString()}`);
  } catch (error) {
    console.error("Gagal mengambil data artikel:", error);
    throw error;
  }
};

export const getArticleById = async (id) => {
  return fetchApi(`/articles/${id}`);
};

export const createArticle = async (data) => {
  return fetchApi(`/articles`, {
    method: 'POST',
    body: JSON.stringify(data),
  });
};

export const updateArticle = async (id, data) => {
  return fetchApi(`/articles/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(data),
  });
};

export const deleteArticle = async (id) => {
  return fetchApi(`/articles/${id}`, {
    method: 'DELETE',
  });
};

// ================= REPORT =================
export const submitReport = async (data) => {
  return fetchApi(`/report`, {
    method: 'POST',
    body: JSON.stringify(data),
  });
};

export const getReports = async () => {
  return fetchApi(`/report`);
};

export const getReportById = async (id) => {
  return fetchApi(`/report/${id}`);
};

// ================= DASHBOARD =================
export const getWeeklyTrend = async () => {
  return fetchApi(`/admin/dashboard/weekly-trend`);
};

export const getTopChannel = async () => {
  return fetchApi(`/admin/dashboard/top-channel`);
};

export const getTopModus = async () => {
  return fetchApi(`/admin/dashboard/top-modus`);
};

export const getSegmentation = async () => {
  return fetchApi(`/admin/dashboard/segmentation`);
};

// ================= ADMIN RESPONSE =================
export const createAdminResponse = async (data) => {
  return fetchApi(`/admin/respons`, {
    method: 'POST',
    body: JSON.stringify(data),
  });
};

export const updateAdminResponse = async (id, data) => {
  return fetchApi(`/admin/respons/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(data),
  });
};

export const deleteAdminResponse = async (id) => {
  return fetchApi(`/admin/respons/${id}`, {
    method: 'DELETE',
  });
};

// ================= RESPONSE =================
export const getResponses = async () => {
  return fetchApi(`/respons`);
};

export const getResponseById = async (id) => {
  return fetchApi(`/respons/${id}`);
};

// ================= AUTHENTICATION =================
export const login = async (username, password) => {
  const response = await fetchApi(`/admin/login`, {
    method: 'POST',
    body: JSON.stringify({ username, password }),
  });
  
  // Handle response dengan atau tanpa token
  if (response.token) {
    setToken(response.token);
  } else if (response.admin) {
    // Jika tidak ada token, gunakan admin ID sebagai session identifier
    const sessionToken = `admin_${response.admin.id}_${Date.now()}`;
    setToken(sessionToken);
  }
  
  if (response.admin) {
    setUser(response.admin);
  }
  
  return response;
};

export const logout = async () => {
  try {
    await fetchApi(`/auth/logout`, {
      method: 'POST',
    });
  } catch (error) {
    console.error("Logout error:", error);
  } finally {
    removeToken();
  }
};

export const getMe = async () => {
  return fetchApi(`/auth/me`);
};
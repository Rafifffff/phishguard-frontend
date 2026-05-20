const BASE_URL = "https://be-phisguard-production.up.railway.app/docs?api-docs.json";

export const getArticles = async (kategori = "", page = 1) => {
  try {
    const queryParams = new URLSearchParams();
    if (kategori) queryParams.append("kategori", kategori);
    if (page) queryParams.append("page", page);
    
    const url = `${BASE_URL}/articles?${queryParams.toString()}`;
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return data; 
  } catch (error) {
    console.error("Gagal mengambil data artikel:", error);
    throw error;
  }
};
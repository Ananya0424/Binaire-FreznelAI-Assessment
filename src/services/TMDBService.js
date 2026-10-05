class TMDBService {
  constructor() {
    this.apiKey = '8d9875207e45b45e692982a10d53e9e6';
    this.baseUrl = 'https://api.themoviedb.org/3';
    this.imageBaseUrl = 'https://image.tmdb.org/t/p/w500';
    this.heroImageBaseUrl = 'https://image.tmdb.org/t/p/original';
  }

  async _fetchData(endpoint) {
    try {
      const separator = endpoint.includes('?') ? '&' : '?';
      const url = `${this.baseUrl}${endpoint}${separator}api_key=${this.apiKey}&language=en-US`;
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error('Network error');
      }
      
      return await response.json();
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  async getTrending() {
    return this._fetchData('/trending/movie/day');
  }

  async getPopular(page = 1) {
    return this._fetchData(`/movie/popular?page=${page}`);
  }

  getImageUrl(path, isHero = false) {
    if (!path) return '';
    return isHero ? `${this.heroImageBaseUrl}${path}` : `${this.imageBaseUrl}${path}`;
  }
}

export const tmdb = new TMDBService();

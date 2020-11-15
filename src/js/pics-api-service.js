const BASE_URL = 'https://pixabay.com/api'


export default class PicsApiService {
    constructor() {
        this.searchQuery = '';
        this.page = 1;
    }
    fetchArticles() {
        const url = `${BASE_URL}/?image_type=photo&orientation=horizontal&q=${this.searchQuery}&page=${this.page}&per_page=12&key=19021321-24050a2d959b5df6ac2754b2c`;
        return fetch(url).then(response => {
            this.page +=1
            return response.json();
            })
    }

    resetPage() {
        this.page = 1;
    }
    
    get query() {
        return this.searchQuery;
    }
    set query(newQuery) {
        return this.searchQuery = newQuery;
    }
}
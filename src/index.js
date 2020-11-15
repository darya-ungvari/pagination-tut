import './css/common.css';
import PicsApiService from './js/pics-api-service.js';
import picsCardTpl from './templates/card.hbs';
import LoadMoreBtn from './js/load-more-btn.js';

const refs = {
    searchForm:  document.querySelector('.js-search-form'),
    articlesContainer: document.querySelector('.js-articles-container'),
    // loadMoreBtn: document.querySelector('[data-action="load-more"]'),

};

const loadMoreBtn = new LoadMoreBtn( {
    selector: '[data-action="load-more"]',
    hidden: true,

}) ;

console.log(loadMoreBtn);

refs.searchForm.addEventListener('submit', onSearch);
loadMoreBtn.refs.button.addEventListener('click', onLoadMore);

const picsApiService = new PicsApiService(); 

function renderPicsCard(response) {
    const card = picsCardTpl({ hits: response.hits });
    refs.articlesContainer.insertAdjacentHTML('beforeend', card)

};

function onSearch(e) {
    e.preventDefault();
    loadMoreBtn.show();
    loadMoreBtn.disable();

    
    refs.articlesContainer.innerHTML = '';
    picsApiService.resetPage();
    picsApiService.searchQuery = e.currentTarget.elements.query.value;
    picsApiService.fetchArticles().then(renderPicsCard) 
    // не виходить в then додати loadMoreBtn.enable();
        .catch(onFetchError)
        .finally(() => e.target.value = '');
}

function onLoadMore(e) {
    loadMoreBtn.disable();

    picsApiService.fetchArticles().then(() => {
        renderPicsCard;
        loadMoreBtn.enable();
    });       
    console.log('click');
}


function onFetchError(error) {
    alert('this value does not exist');    
}
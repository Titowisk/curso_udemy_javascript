/*jshint esversion: 6 */

/**
 * All DOM selectors must be in here
 */

export const elements = {
    searchForm: document.querySelector('.search'),
    searchInput: document.querySelector('.search__field'),
    searchResList: document.querySelector('.results__list'),
    searchResults: document.querySelector('.results')
};

export const elementStrings = {
    loader: 'loader'
};

export const renderLoader = parent => {
    // render the loader while the request doesn't end
    const loader = `
        <div class="${elementStrings.loader}">
            <svg>
                <use href="img/icons.svg#icon-cw"></use>
            </svg>
        </div>
    `;
    parent.insertAdjacentHTML('afterbegin', loader);
};

export const clearLoader = () => {
    // removes the loader after the request finishes
    const loaderElement = document.querySelector(`.${elementStrings.loader}`);
    if (loaderElement) loaderElement.parentElement.removeChild(loaderElement);
};

const searchBar = document.querySelector('.searchBar');
const searchClose = document.querySelector('#searchClose');
const searchBtn = document.querySelector('.searchBtn');

/**
 * Search Bar visiable 
 */
searchBtn.addEventListener('click', function(){
    searchBar.style.visibility = "visible";
    searchBar.classList.add('open')
    this.setAttribute("aria-expanded", "true")
    
    
})

/**
 * Search Bar Hide 
 */
searchClose.addEventListener('click', function(){
    searchBar.style.visibility = "hidden";
    searchBar.classList.remove('open')
    searchBtn.setAttribute("aria-expanded", "false")
    
    
})

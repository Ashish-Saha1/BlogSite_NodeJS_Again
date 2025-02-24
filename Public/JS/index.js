
const searchBar = document.querySelector('.searchBar');
const searchClose = document.querySelector('#searchClose');
const searchBtn = document.querySelector('.searchBtn');
console.dir(searchBtn);

/**
 * Search Bar visiable 
 */
searchBtn.addEventListener('click', function(){
    searchBar.style.visibility = "visible";
    searchBar.classList.add('open')
    this.setAttribute("aria-expanded", "true")
    
    console.log('Helow click');
    
})

/**
 * Search Bar Hide 
 */
searchClose.addEventListener('click', function(){
    searchBar.style.visibility = "hidden";
    searchBar.classList.remove('open')
    searchBtn.setAttribute("aria-expanded", "false")
    
    
})


// for(let i of searchBtn){
//    i.addEventListener('click', function(){
//     // searchBar.style.visibility = "visible";
//     // searchBar.classList.add('open')
//     // this.setAttribute("aria-expanded", "true")
    
//     console.log('Helow from i click');
//     console.log(searchBar)
// })

    
    


// }

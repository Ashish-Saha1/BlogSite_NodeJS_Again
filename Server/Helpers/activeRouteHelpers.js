

function isactiveRoute(route, currentRoute){
    return route === currentRoute ? "active" : "";
}


module.exports = {isactiveRoute}
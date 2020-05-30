// Get active class in sidebar
(function(){
    let route = location.pathname.split('/');
    route = route[route.length-1];
    // console.log("Current pathname is: ", route);
    $(`.${route}`).addClass("active");
})();

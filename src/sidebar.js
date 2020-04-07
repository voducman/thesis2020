// Get active class in sidebar
(function(){
    let route = location.pathname.replace('/','');
    // console.log("Current pathname is: ", route);
    $(`.${route}`).addClass("active");
})();

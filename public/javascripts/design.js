$(".navbar-minimize").remove();
$(".navbar-header").remove();

const screenWidth = $( window ).width();
console.log(screenWidth)
console.log($(".main-navbar").width())
$(".main-navbar").width(screenWidth);
$(".main-navbar").attr('style', 'position: absolute; left: 0;')
// $(".main-navbar").width(screenWidth);
// console.log($(".main-navbar").width())
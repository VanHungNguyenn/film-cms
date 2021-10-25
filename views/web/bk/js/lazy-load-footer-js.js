// Lazy load image on site
document.addEventListener('DOMContentLoaded', lazyImage('img-lazy'));
// Lazy load button share social
(function() {
    var loaded = false;
    var exitDom = document.getElementsByClassName('a2a_kit');
    if(exitDom.length > 0){
        window.addEventListener("scroll", function() {
            if (!loaded) {
                lazyScript("//static.addtoany.com/menu/page.js", function() {
                    a2a.fill_menus("page");
                });
                loaded = true;
            }
        })
    }
})();
// Lazy Load video Youtube
(function(){
    var youtube = document.querySelectorAll(".youtube");
    for(var i=0; i<youtube.length; i++){
        var source = "https://img.youtube.com/vi/"+ youtube[i].dataset.embed +"/sddefault.jpg";            
        var image = new Image();
        image.src = source;
        image.addEventListener("load", function(){
            youtube[i].appendChild(image);
        }(i));
        youtube[i].addEventListener("click", function(){
            var iframe = document.createElement("iframe");
            iframe.setAttribute("frameborder", "0");
            iframe.setAttribute("allowfullscreen", "");
            iframe.setAttribute("allow", "autoplay");
            iframe.setAttribute("src", "https://www.youtube.com/embed/"+ this.dataset.embed +"?rel=0&showinfo=0&autoplay=1" );
            this.innerHTML = "";
            this.appendChild(iframe);
        });                
    }
})();
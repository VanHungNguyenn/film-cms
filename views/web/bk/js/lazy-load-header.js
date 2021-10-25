var token = "<%=(session.ajaxpagetoken)?session.ajaxpagetoken:''%>",
domain = "<%=(domain)?domain:''%>",
ldomain = "<%=(page.curLang && page.curLang.ismain==false)?`${domain}/${page.curLang.id}`:domain;%>",
hasWebP = !1;
!function() {
var A = new Image;
A.onload = function() {                
    hasWebP = !!(A.height > 0 && A.width > 0)
}, A.onerror = function() {
    hasWebP = !1
}, A.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA"
}();        
function lazyImage(lzl) {
return function(e) {
    var observer,
        options = {
            rootMargin: "0px",
            threshold: 0.05
        },
        allTheLazyImages = document.querySelectorAll("." + lzl);
    function lazyLoader(e) {
        e.forEach(function(e) {
            e.intersectionRatio > 0 && lazyLoadImage(e.target);
        });
    }
    function lazyLoadImage(e) {
        e.onload = function() {
            e.classList.remove(lzl);
        };
        //e.dataset.lazybackground && (e.style.backgroundImage = "url(".concat(e.dataset.lazybackground, ")")), e.getAttribute("data-img") && ((e.src = hasWebP && -1 != e.dataset.src.indexOf("googleusercontent.com") ? e.dataset.src + "-rw" : e.dataset.src), "IntersectionObserver" in window && observer.unobserve(e));
        e.getAttribute("data-img") && (e.style.backgroundImage = "url('".concat(e.getAttribute("data-img"), "')")), ("IntersectionObserver" in window && observer.unobserve(e));
    }
    if("IntersectionObserver" in window)(observer = new IntersectionObserver(lazyLoader, options)), allTheLazyImages.forEach(function(e) {
        observer.observe(e);
    });
    else for (var i = 0; i < allTheLazyImages.length; i++) lazyLoadImage(allTheLazyImages[i]);
}
}
function lazyScript(c, e) {
var n = document.createElement("script");
n.async = !0, e && (n.onload = e), document.head.appendChild(n), n.src = c
}        
var lazyLoad = false;
function onLazyLoad(){
if (lazyLoad === true) return;
lazyLoad = true;
document.removeEventListener('scroll', onLazyLoad);
document.removeEventListener('mousemove', onLazyLoad);
document.removeEventListener('mousedown', onLazyLoad);
document.removeEventListener('touchstart', onLazyLoad);            
setTimeout(function() {
    // Load Google Analytics
    !function(e, a, t, n, g, c, o) {
        e.GoogleAnalyticsObject = g, e.ga = e.ga || function() {
            (e.ga.q = e.ga.q || []).push(arguments)
        }, e.ga.l = 1 * new Date, c = a.createElement(t), o = a.getElementsByTagName(t)[0], c.async = 1, c.src = "https://www.google-analytics.com/analytics.js", o.parentNode.insertBefore(c, o)
    }(window, document, "script", 0, "ga"), ga("create", "UA-145690480-1", "auto"), ga("send", "pageview");
    // Tracking GTA
    window.onerror = function(message, source, lineno, colno, error) {
        var label = location.href + ': ' + message + ' (' + source + ':' + lineno + (colno ? ':' + colno : '') + ')';                   
        ga('send', 'event', 'performance', 'error', label, 1, {
            nonInteraction: true
        });
        window.onerror = null;
    };
    // Lazy load Facebook SDK
    lazyScript("//connect.facebook.net/en_US/sdk.js#xfbml=1&version=v11.0&appId=734723923893283&autoLogAppEvents=1");
}, 1)
}
document.addEventListener("scroll", onLazyLoad),
document.addEventListener("mousemove", onLazyLoad),
document.addEventListener("mousedown", onLazyLoad),
document.addEventListener("touchstart", onLazyLoad),
document.addEventListener("load", function() {
document.body.clientHeight != document.documentElement.clientHeight && 0 == document.documentElement.scrollTop && 0 == document.body.scrollTop || onLazyLoad();
});
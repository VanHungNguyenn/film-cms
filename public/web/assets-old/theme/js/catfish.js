jQuery(function($) {
    if (navigator.userAgent.match(/Android/i)
        || navigator.userAgent.match(/webOS/i)
        || navigator.userAgent.match(/iPhone/i)
        || navigator.userAgent.match(/iPad/i)
        || navigator.userAgent.match(/iPod/i)
        || navigator.userAgent.match(/BlackBerry/i)
        || navigator.userAgent.match(/Windows Phone/i)
        ) {
        jQuery('.ads-mobile').show();
        jQuery('.ads-pc').hide();
    } else {
        jQuery('.ads-mobile').hide();
        jQuery('.ads-pc').show();
    }
    checkCookie_eu();

    function checkCookie_eu() {
        var consent = getCookie_eu("cookies_consent");
        if (consent == null || consent == "" || consent == undefined)
        {
            $('.banner-footer-desktop').show();
        } else {
            $('.banner-footer-desktop').hide();
        }
        console.log(consent);

    }

    function setCookie_eu(c_name,value,exdays) {

        var exdate = new Date();
        exdate.setDate(exdate.getDate() + exdays);
        var c_value = escape(value) + ((exdays==null) ? "" : "; expires="+exdate.toUTCString());
        document.cookie = c_name + "=" + c_value+"; path=/";
        $('#cookie_directive_container').hide('slow');
    }


    function getCookie_eu(c_name) {
        var i,x,y,ARRcookies=document.cookie.split(";");
        for (i=0;i<ARRcookies.length;i++)
        {
            x=ARRcookies[i].substr(0,ARRcookies[i].indexOf("="));
            y=ARRcookies[i].substr(ARRcookies[i].indexOf("=")+1);
            x=x.replace(/^\s+|\s+$/g,"");
            if (x==c_name)
            {
                return unescape(y);
            }
        }
    }
    $(".banner-close").click(function(){
        setCookie_eu("cookies_consent", 1, 30);
        $('.banner-footer-desktop').hide();
    });
});
var _____WB$wombat$assign$function_____ = function(name) {return (self._wb_wombat && self._wb_wombat.local_init && self._wb_wombat.local_init(name)) || self[name]; };
if (!self.__WB_pmw) { self.__WB_pmw = function(obj) { this.__WB_source = obj; return this; } }
{
  let window = _____WB$wombat$assign$function_____("window");
  let self = _____WB$wombat$assign$function_____("self");
  let document = _____WB$wombat$assign$function_____("document");
  let location = _____WB$wombat$assign$function_____("location");
  let top = _____WB$wombat$assign$function_____("top");
  let parent = _____WB$wombat$assign$function_____("parent");
  let frames = _____WB$wombat$assign$function_____("frames");
  let opener = _____WB$wombat$assign$function_____("opener");

jQuery("head").prepend("<style type='text/css' rel='stylesheet'>#AbdDivPlayer{z-index: 2147483646 !important;}</style>");
var monitor=null;
var checkFlag=0;
var startCountDown=function(timeLeft){
	if(typeof timeLeft!="number")
		var timeLeft=5;
	if(jQuery("#AbdDivPlayer").css("display")=="none"){
		jQuery("#btn-skip-ad-trailer").css("display","none");
		return false;
	}
	jQuery("#btn-skip-ad-trailer").text("Bỏ qua quảng cáo sau "+timeLeft+"s");
	jQuery("#btn-skip-ad-trailer").css("display","inline-block");
	if(timeLeft<=0){
		jQuery("#btn-skip-ad-trailer").click(function(){
			jQuery("#AbdDivPlayer").remove();
			jQuery(this).css("display","none");
		});
		jQuery("#btn-skip-ad-trailer").text("Bỏ qua quảng cáo");
	}else{
		setTimeout("startCountDown("+(timeLeft-1)+")",1000);
	}
}
var checkSkipAvailable=function(){
	if(checkFlag)
		return false;
	if(jQuery("#AbdDivPlayer").length>0 && jQuery("#AbdDivPlayer iframe").length>0){
		jQuery("#AbdDivPlayer").after('<a href="javascript:void(0);" id="btn-skip-ad-trailer" style="position: absolute;right: 10px;bottom: 20%;padding: 8px 16px;color: #FFF;background-color: #222;border: 1px solid #000;z-index: 2147483647 !important;font-size: 12px;font-family: Tahoma;text-decoration:none;display:none;">Bỏ qua quảng cáo sau 5s</a>');
		jQuery("#AbdDivPlayer").css("z-index","2147483646 !important");
		//--Click pla
		monitor = setInterval(function(){
			var elem = document.activeElement;
			if(elem && elem.tagName == 'IFRAME' && jQuery(elem).attr("src").indexOf("adnetwork.vn")!=-1){
				clearInterval(monitor);
				startCountDown();
			}
		}, 100);
		checkFlag=1;
	}else{
		setTimeout(function(){
			checkSkipAvailable();
		},100);
	}
}

jQuery(document).ready(function(){
	checkSkipAvailable();
});

}
/*
     FILE ARCHIVED ON 04:23:28 Dec 10, 2020 AND RETRIEVED FROM THE
     INTERNET ARCHIVE ON 22:11:07 May 10, 2021.
     JAVASCRIPT APPENDED BY WAYBACK MACHINE, COPYRIGHT INTERNET ARCHIVE.

     ALL OTHER CONTENT MAY ALSO BE PROTECTED BY COPYRIGHT (17 U.S.C.
     SECTION 108(a)(3)).
*/
/*
playback timings (ms):
  captures_list: 99.328
  exclusion.robots: 0.278
  exclusion.robots.policy: 0.265
  RedisCDXSource: 2.034
  esindex: 0.013
  LoadShardBlock: 71.454 (3)
  PetaboxLoader3.datanode: 96.519 (4)
  CDXLines.iter: 22.025 (3)
  load_resource: 1121.404
  PetaboxLoader3.resolve: 1049.491
*/
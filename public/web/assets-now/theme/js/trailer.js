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

var Trailer=function(url){
	var _url='';
	
	this.setUrl=function(url){
		if(typeof url!="string")
			return false;
		if(url.indexOf('youtube.com')==-1 && url.indexOf('imdb.com')==-1)
			console.error('Hiện trailer chưa chấp nhận link: '+url);
		_url=url;
	}
	this.getEmbedUrl=function(width){
		if(typeof width!="number" || width<0)
			width=640;
		if(_url.indexOf('youtube.com')!=-1)
		{
			var reg=/v\=([^&]+)/;
			var result=reg.exec(_url);
			if(result.length>0)
			{
				var id=result[1];
				return 'https://www.youtube.com/embed/'+id+'?modestbranding=1&iv_load_policy=3&showinfo=1&rel=0&enablejsapi=1&origin='+window.location.protocol+'//'+window.location.host;
			}
			return '';
		}
		else if(_url.indexOf('imdb.com')!=-1)
		{
			//http://www.imdb.com/video/imdb/vi613658649/?ref_=tt_ov_vi
			var reg=/\/video\/imdb\/vi([0-9]+)/;
			var result=reg.exec(_url);
			if(result.length>0)
			{
				var id=result[1];
				return 'http://www.imdb.com/video/imdb/vi'+id+'/imdb/embed?autoplay=true&width='+width;
			}
			return '';
		}
		return '';
	}
	
	this.setup=function(elementId,width,height){
		if(_url=="")
			return false;
		if(typeof elementId!="string")
			return false;
		if(jQuery("#"+elementId).length==0)
			return false;
		var elem=jQuery("#"+elementId);
		if(typeof width!="number")
			var width="100%";
		
		if(width=="100%")
			width=jQuery(elem).width();
		if(typeof height!="number")
			var height=Math.ceil(width/16*9);
		if(height=="100%")
			height=jQuery(elem).height();
		var html='<iframe src="'+this.getEmbedUrl(width)+'" width="'+width+'" height="'+height+'" allowfullscreen="true" mozallowfullscreen="true" webkitallowfullscreen="true" frameborder="no" scrolling="no"></iframe>';
		jQuery(elem).html(html);
		return true;
	}
	
	if(typeof url=="string")
		this.setUrl(url);
}

}
/*
     FILE ARCHIVED ON 12:05:25 Jul 11, 2020 AND RETRIEVED FROM THE
     INTERNET ARCHIVE ON 22:03:14 May 10, 2021.
     JAVASCRIPT APPENDED BY WAYBACK MACHINE, COPYRIGHT INTERNET ARCHIVE.

     ALL OTHER CONTENT MAY ALSO BE PROTECTED BY COPYRIGHT (17 U.S.C.
     SECTION 108(a)(3)).
*/
/*
playback timings (ms):
  RedisCDXSource: 4.352
  esindex: 0.018
  captures_list: 86.537
  exclusion.robots: 0.413
  PetaboxLoader3.resolve: 43.687
  LoadShardBlock: 59.326 (3)
  exclusion.robots.policy: 0.392
  PetaboxLoader3.datanode: 265.749 (4)
  load_resource: 266.826
  CDXLines.iter: 18.725 (3)
*/
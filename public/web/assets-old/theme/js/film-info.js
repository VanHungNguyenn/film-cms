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

var filmInfo={};
jQuery(document).ready(function(){
	//--Nếu ở trang trailer
	if(jQuery('#trailer-player').length>0)
	{
		if(typeof filmInfo.trailerUrl=='string')
		{
			var trailer=new Trailer(filmInfo.trailerUrl);
			trailer.setup("trailer-player");
			jQuery(window).load(function(){
				fx.scrollTo('.block-wrapper.page-single');
			});
		}
	}
	
	//--Khi bấm nút trailer
	jQuery('.btn-film-trailer').click(function(){
		//--Nếu kích thước màn hình nhỏ thì ko play ở popup
		var wWidth=jQuery(window).width();
		var wHeight=jQuery(window).height();
		if(wWidth<1000 || wHeight<450)
			return true;
		//--Lấy URL của trailer
		var videoUrl=jQuery(this).attr('data-videourl');
		if(typeof videoUrl!='string')
			return true;
		//--Tạo popup
		var trailer=new TrailerPopup(videoUrl,'Trailer '+filmInfo.title,filmInfo.fbUrl);
		trailer.setOptionCode('<script type="text/javascript" src="http://media.adnetwork.vn/js/jwplayer.js"></script>\
						<script type="text/javascript">\
						/* load placement for account: youthclass, site: http://phimmoi.net, size: 970x90 - web, zone: video */\
						var _abd = _abd || [];\
						_abd.push(["1385700597","Video","1452850064","trailer-wrapper","720","405"]);\
						</script>\
						<script src="http://media.adnetwork.vn/js/adnetwork.js" type="text/javascript"></script>\
						<noscript><a href="http://track.adnetwork.vn/247/adServerNs/zid_1452850064/wid_1385700597/" target="_blank"><img src="http://delivery.adnetwork.vn/247/noscript/zid_1452850064/wid_1385700597/" /></a></noscript>');
		trailer.setCallback(function(){
			if(typeof removeBalloon=="function")
			{
				removeBalloon();
			}
		});
		if(trailer.show())
			return false; //Không chuyển sang trang trailer
		return true;
	});
	
	//--Căn giữa ảnh
	jQuery('.block-movie-content > .content img').each(function(){
		var parentElemCenter=jQuery(this).parent().css('text-align');
		if(parentElemCenter!='center')
		{
			jQuery(this).wrap('<div style="text-align: center"></div>');
		}
	});
	
	//--Thu gọn nội dung
	if(jQuery('#film-content-wrapper > #film-content').length>0){
		var contentElement=jQuery('#film-content-wrapper > #film-content')[0];
		jQuery(contentElement).css('max-height','800px'); //--Limit height trước
		jQuery(window).load(function(){
			if(typeof contentElement.scrollHeight=="number" && contentElement.scrollHeight>0)
			{
				window._restoreContentHeight=currentContentHeight=contentElement.scrollHeight;
				window._flagContentHeight='small';
				if(currentContentHeight>800)
				{
					window._restoreContentHeight=currentContentHeight;
					window._flagContentHeight='small';
					//--Thêm nút expand
					jQuery('#film-content-wrapper').append('<button class="expand-content" id="btn-expand-content">Hiển thị thêm</button>');
					//--Gán sự kiện
					jQuery('#btn-expand-content').click(function(){
						if(window._flagContentHeight=='small')
						{
							if(typeof contentElement.scrollHeight=="number" && contentElement.scrollHeight>0)
								window._restoreContentHeight=contentElement.scrollHeight;
							//fx.scrollTo('.block-movie-content',1000);
							jQuery(contentElement).height(window._restoreContentHeight+'px');//Dùng hiệu ứng sẵn của css, ko dùng animate
							window._flagContentHeight='large';
							jQuery('#btn-expand-content').text('Thu gọn nội dung');
							
						}
						else
						{
							fx.scrollTo('#film-content-wrapper',300);
							jQuery(contentElement).height('800px');//Dùng hiệu ứng sẵn của css, ko dùng animate
							window._flagContentHeight='small';
							jQuery('#btn-expand-content').text('Hiển thị thêm');
							
						}
					});
					//--Thu nhỏ nội dung
					jQuery(contentElement).css({'height':'800px','max-height':'none'});
				}
			}
		});
	}
	
	try{
		jQuery(window).on('message',function(e){
			var msg = e.originalEvent.data;
			var msgReg=/^(openTrailerAd|closeTrailerAd)\:(.+)$/i;
			if(typeof msg=="string" && msgReg.test(msg))
			{
				var msgParam=msgReg.exec(msg);
				var msgAction=msgParam[1];
				var msgData=jQuery.parseJSON(msgParam[2]);
				if(msgData!=null && typeof msgData.selector=="string"){
					console.log(msgAction);
					console.log(msgData);
					switch(msgAction){
						case 'openTrailerAd':
							jQuery(msgData.selector).css({'display':'block','left':'0','right':'0'});
							break;
						case 'closeTrailerAd':
							jQuery(msgData.selector).remove();
							break;
					}
				}
			}
		});
		//--Chèn trailer
		var prerollTrailerHtml='<div class="ad-topcomment-pc trailer-preroll-wrapper" style="max-height:100%;margin-top:10px;">\
			<div class="ratio-box ratio-16_9">\
				<div class="ratio-content" id="trailer-preroll-container" style="position:relative">\
					<iframe rel="nofollow" src="https://www.youtube.com/embed/VIDEOID?modestbranding=1&iv_load_policy=3&showinfo=1&rel=0" width="100%" height="100%" allowfullscreen="true" mozallowfullscreen="true" webkitallowfullscreen="true" frameborder="no" scrolling="no"></iframe>\
					<div id="pm-trailer-preroll-wrapper" style="position:absolute;left:-3000px;top:0;z-index:2;width: 100%;height: 100%;">\
						<iframe id="pm-trailer-preroll" style="border:0;margin:0;padding:0;overflow:hidden;width:100%;height:100%;background-color:#000"></iframe>\
					</div>\
				</div>\
			</div>\
		</div>';
		var crawlerReg=/(googlebot|bingbot|Slurp|Baiduspider|YandexBot|ia_archiver|similar)/i;
		var youtubeIdReg=/v=([^&]+)/i;
		if(!crawlerReg.test(navigator.userAgent) && typeof filmInfo=="object" && typeof filmInfo.trailerUrl=="string" && youtubeIdReg.test(filmInfo.trailerUrl) && window.location.href.indexOf('/xem-phim')==-1 && window.location.href.indexOf('/tap-')==-1 && (typeof device=="undefined" || !device.mobile())){
			
			var yIdRs=youtubeIdReg.exec(filmInfo.trailerUrl);
			var youtubeId=yIdRs[1];
			prerollTrailerHtml=prerollTrailerHtml.replace('VIDEOID',youtubeId);
			if(typeof COUNTRY_CODE=="string" && COUNTRY_CODE=="VN"){
				jQuery('.movie-info').after(prerollTrailerHtml);
			}else{
				jQuery('.block-movie-info').after(prerollTrailerHtml);
			}
			
			//--Add preroll
			var fbBalloonCodeEncoded="%3C!DOCTYPE%20html%3E%0A%3Chtml%3E%0A%3Chead%3E%0A%3Ctitle%3EPhimMoi.Net%20Ads%3C%2Ftitle%3E%0A%3Cmeta%20charset%3D%22utf-8%22%3E%0A%3Cmeta%20name%3D%22ROBOTS%22%20content%3D%22NOINDEX%2C%20NOFOLLOW%22%3E%0A%3Cmeta%20name%3D%22viewport%22%20content%3D%22width%3Ddevice-width%2C%20initial-scale%3D1.0%2C%20minimum-scale%3D1.0%2C%20maximum-scale%3D1.0%22%20%2F%3E%20%0A%3C!--%20base%20href%3D%22http%3A%2F%2Fwww.phimmoi.net%2F%22%20--%3E%0A%3Cscript%20type%3D%22text%2Fjavascript%22%20src%3D%22%2Fjs%2Fmobile%2Fdevice.js%22%3E%3C%2Fscript%3E%0A%3Cscript%20type%3D%22text%2Fjavascript%22%20src%3D%22%2Fstyles%2Fvtlai%2Fmovie%2Fjs%2Fjquery.js%22%3E%3C%2Fscript%3E%0A%3Cscript%20src%3D%22%2Fjs%2Fplayer%2Fv3.1%2Fplayer.js%22%3E%3C%2Fscript%3E%20%3C!--%20Oldplayer%20%3A%202.5%20--%3E%0A%3Cscript%20src%3D%22%2Fjs%2Fvtlai%2Fmovie%2Fadoverlay%2Fvastlist.js%22%3E%3C%2Fscript%3E%0A%3Cstyle%3E%0A%3C!--%0Abody%0A%7B%0A%09margin%3A0%3B%0A%09padding%3A0%3B%0A%09background-color%3A%20%23CCC%3B%0A%09overflow%3A%20hidden%3B%0A%7D%0A%23media-player-box%0A%7B%0A%09width%3A100%25%3B%0A%09min-height%3A100%25%3B%0A%09display%3A%20block%3B%0A%09margin%3A%200%3B%0A%09border%3A0%3B%0A%7D%0A%23media-player-box%3Aafter%20%7B%0A%20%20%20%20content%3A%20%22%20%22%3B%0A%20%20%20%20display%3A%20block%3B%0A%20%20%20%20height%3A%200%3B%0A%20%20%20%20line-height%3A%200%3B%0A%20%20%20%20overflow%3A%20hidden%3B%0A%7D%0A--%3E%0A%3C%2Fstyle%3E%0A%3Cscript%20type%3D%22text%2Fjavascript%22%3E%0A%3C!--%0Awindow.onAdStartedTrailer%3Dfunction(e)%7B%0A%09try%7B%0A%09%09var%20ifm%3DjQuery('.jw-media%20iframe')%5B0%5D%3B%0A%09%09var%20iframeDocument%20%3D%20ifm.contentDocument%20%7C%7C%20ifm.contentWindow.document%3B%0A%09%09iframeDocument.querySelector('a%5Bhref*%3D%22facebook.com%2Fads%2Faudience_network%3Fad_token%3D%22%5D').parentElement.style.display%3D'none'%3B%0A%09%09if(iframeDocument.querySelector('._1jgu')!%3Dnull)%7B%0A%09%09%09iframeDocument.querySelector('._1jgu').style.display%3D'none'%3B%0A%09%09%7D%0A%09%09if(typeof%20device%3D%3D%22object%22%20%26%26%20!device.mobile()%20%26%26%20iframeDocument.querySelector('_1t7z')!%3Dnull)%7B%0A%09%09%09iframeDocument.querySelector('_1t7z')%5B0%5D.style.display%3D'none'%3B%0A%09%09%7D%0A%09%09if(e.tag.indexOf('facebook.com%2F')!%3D-1)%7B%0A%09%09%09console.log(e)%3B%0A%09%09%09jQuery('.jw-state-buffering.jw-flag-ads-hide-controls').removeClass('jw-state-buffering')%3B%0A%09%09%7D%0A%09%0A%09%7Dcatch(err)%7B%7D%0A%7D%0Awindow.getSkipOffset%3Dfunction(e)%7B%0A%09return%2010%3B%0A%7D%0Awindow.postOpenAd%3Dfunction()%7B%0A%09var%20messageData%3D%7B'selector'%3A'%23pm-trailer-preroll-wrapper'%7D%3B%0A%09var%20messageStr%3D%22openTrailerAd%3A%22%2BJSON.stringify(messageData)%3B%0A%09window.top.postMessage(messageStr%2C%22*%22)%3B%0A%09console.log(%22Sent%20Message%20%3D%3E%20%22%2BmessageStr)%3B%0A%7D%0A%0Awindow.postCloseAd%3Dfunction()%7B%0A%09var%20messageData%3D%7B'selector'%3A'%23pm-trailer-preroll-wrapper'%7D%3B%0A%09var%20messageStr%3D%22closeTrailerAd%3A%22%2BJSON.stringify(messageData)%3B%0A%09window.top.postMessage(messageStr%2C%22*%22)%3B%0A%09console.log(%22Sent%20Message%20%3D%3E%20%22%2BmessageStr)%3B%0A%7D%0Awindow.customVpaidSkipAd%3Dfunction(e)%7B%0A%09return%20false%3B%0A%7D%3B%0Awindow.getSkipOffset%3Dfunction(e)%7B%0A%09if(typeof%20e%3D%3D%22string%22)%7B%0A%09%09var%20e%3D%7B'tag'%3Ae%7D%3B%0A%09%7D%0A%09console.log(e)%3B%0A%09if(typeof%20e.tag%3D%3D%22string%22%20%26%26%20(e.tag.indexOf('%23nonskip')!%3D-1%20%7C%7C%20e.tag.indexOf('%26nonskip')!%3D-1))%7B%0A%09%09return%2015%3B%20%2F%2Ffor%20nonskip%0A%09%7D%0A%09try%7B%0A%09%09var%20skipReg%3D%2F(%23%7C%26)skip(%5B0-9%5D%2B)%2F%3B%0A%09%09if(typeof%20e.tag%3D%3D%22string%22%20%26%26%20(e.tag.indexOf('%23skip')!%3D-1%20%7C%7C%20e.tag.indexOf('%26skip')!%3D-1)%20%26%26%20skipReg.test(e.tag))%7B%0A%09%09%09var%20pRs%3DskipReg.exec(e.tag)%3B%0A%09%09%09return%20pRs%5B2%5D%3B%0A%09%09%7D%0A%09%7Dcatch(err)%7B%7D%0A%09%0A%09return%2010%3B%0A%7D%0Atry%7B%0A%09var%20phimMoiPlayer%20%3D%20new%20FxPlayer(%22media-player%22)%3B%0A%09%2F%2FphimMoiPlayer.setPrimary('flash')%3B%0A%09var%20useVastList%3D%5B%22https%3A%2F%2Fan.facebook.com%2Fv1%2Finstream%2Fvast.xml%3Fplacementid%3D210589909526348_394765127775491%26pageurl%3D__page-url__%26new%3D1%22%5D%3B%0A%09if(typeof%20vastList%3D%3D%22object%22%20%26%26%20typeof%20vastList.desktop%3D%3D%22object%22)%7B%0A%09%09useVastList%3DvastList.desktop%3B%0A%09%7D%0A%09var%20videoSources%3D%5B%0A%09%09%7B%22file%22%3A%22%2Fresource%2Fvideo%2Fblank2.mp4%22%2C%22label%22%3A%22480p%22%2C%22type%22%3A%22mp4%22%7D%0A%09%5D%3B%0A%09var%20playlist%3D%5B%0A%09%09%7B%0A%09%09%09'sources'%3A%20videoSources%2C%0A%09%09%09'title'%3A'Qu%E1%BA%A3ng%20c%C3%A1o'%2C%0A%09%09%09'description'%3A%20'PhimMoi.Net%20Ads'%0A%09%09%7D%0A%09%5D%3B%0A%7Dcatch(err)%7B%0A%09console.error('Err%3A%20'%2Berr.description)%3B%0A%09console.error(err.stack)%3B%20%0A%7D%0Avar%20closeWaitLeft%3D10%3B%0Avar%20closeTimmer%3Dnull%3B%0AjQuery(document).ready(function()%7B%0A%09jQuery(%22%23ad-mini%22).click(function()%7B%0A%09%09window.postMiniAd()%3B%0A%09%09jQuery(this).css('display'%2C'none')%3B%0A%09%09jQuery(%22%23ad-close%22).css('display'%2C'block')%3B%0A%09%7D)%3B%0A%09jQuery(%22%23ad-close%22).click(function()%7B%0A%09%09if(closeWaitLeft%3C%3D0)%7B%0A%09%09%09window.postCloseAd()%3B%0A%09%09%7D%0A%09%7D)%3B%0A%7D)%3B%0AjQuery(window).load(function()%7B%0A%09phimMoiPlayer.addAdBreak('preroll'%2C'pre'%2CuseVastList)%3B%0A%09phimMoiPlayer.setSkipOffset(15)%3B%0A%09phimMoiPlayer.setPlaylist(playlist)%3B%0A%09phimMoiPlayer.setup()%3B%0A%09phimMoiPlayer.getJwPlayer().setVolume(30)%3B%0A%09phimMoiPlayer.getJwPlayer().on('adStarted'%2Cfunction()%7B%0A%09%09onAdStartedTrailer()%3B%0A%09%09window.postOpenAd()%3B%0A%09%7D)%3B%0A%09phimMoiPlayer.getJwPlayer().on('adPlay'%2Cfunction()%7B%0A%09%09onAdStartedTrailer()%3B%0A%09%09window.postOpenAd()%3B%0A%09%7D)%3B%0A%09phimMoiPlayer.getJwPlayer().on('adSkipped'%2Cfunction()%7B%0A%09%09window.postCloseAd()%3B%0A%09%7D)%3B%0A%09phimMoiPlayer.getJwPlayer().on('adComplete'%2Cfunction()%7B%0A%09%09window.postCloseAd()%3B%0A%09%7D)%3B%0A%09phimMoiPlayer.getJwPlayer().on('complete'%2Cfunction()%7B%0A%09%09window.postCloseAd()%3B%0A%09%7D)%3B%0A%09%2F%2Fconsole.clear()%3B%0A%09setInterval(function()%7B%0A%09%09%2F%2Fconsole.clear()%3B%0A%09%7D%2C500)%3B%0A%7D)%3B%0A--%3E%20%0A%3C%2Fscript%3E%0A%3C%2Fhead%3E%0A%3Cbody%3E%0A%09%3Cdiv%20class%3D%22media-player%20loading%20uniad-player%22%20id%3D%22media-player-box%22%3E%0A%09%09%3Cdiv%20id%3D%22media-player%22%3E%3C%2Fdiv%3E%0A%09%3C%2Fdiv%3E%0A%3C%2Fbody%3E%0A%3C%2Fhtml%3E%0A%0A";
			var fbBalloonCode=decodeURIComponent(fbBalloonCodeEncoded);
			if(jQuery("iframe#pm-trailer-preroll").length>0)
			{
				var ifObj=jQuery("iframe#pm-trailer-preroll")[0];
				var ifrm=(ifObj.contentWindow)?ifObj.contentWindow:(ifObj.contentDocument.document)?ifObj.contentDocument.document:ifObj.contentDocument;
				ifrm.document.open();
				ifrm.document.write(fbBalloonCode);
				ifrm.document.close();
			}
		}
	}catch(err){}
	
	try{
		if(typeof COUNTRY_CODE=='string' && COUNTRY_CODE=='VN'){
			jQuery('.block-comments').before('<div class="block-wrapper page-single block-note"><b>CẢNH BÁO:</b> Không bấm vào các đường link lạ ở khu vực bình luận. Việc truy cập vào các liên kết lạ ngoài phimmoi.net có thể khiến bạn bị hack tài khoản Facebook.</div>');
		}
	}catch(err){}
});

}
/*
     FILE ARCHIVED ON 14:52:03 Jul 11, 2020 AND RETRIEVED FROM THE
     INTERNET ARCHIVE ON 22:03:05 May 10, 2021.
     JAVASCRIPT APPENDED BY WAYBACK MACHINE, COPYRIGHT INTERNET ARCHIVE.

     ALL OTHER CONTENT MAY ALSO BE PROTECTED BY COPYRIGHT (17 U.S.C.
     SECTION 108(a)(3)).
*/
/*
playback timings (ms):
  captures_list: 240.919
  exclusion.robots: 0.292
  exclusion.robots.policy: 0.283
  RedisCDXSource: 2.943
  esindex: 0.01
  LoadShardBlock: 213.141 (3)
  PetaboxLoader3.datanode: 234.318 (4)
  CDXLines.iter: 21.58 (3)
  load_resource: 67.894
  PetaboxLoader3.resolve: 28.077
*/
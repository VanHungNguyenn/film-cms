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

//--Film Info
jQuery(document).ready(function(){
	//--Cuộn diễn viên
	if(typeof FX_DEVICE_SMALL=="undefined" || !FX_DEVICE_SMALL || typeof FX_DEVICE_TOUTCH=="undefined" || !FX_DEVICE_TOUTCH)
	{
		jQuery('#list_actor_carousel').carouFredSel({
			auto: false,
			prev: '#prevActor',
			next: '#nextActor',
		});
	}
	// cuộn thông tin phim
	if(typeof window.screen.width=='undefined' || window.screen.width>480)
	{
		jQuery('.movie-meta-info').slimScroll({
			height: '270px',
			railVisible: true,
			alwaysVisible: true
		});
	}
	//--Trang xem phim
	
	
	
	
	// rating
	var score_current = jQuery("#score_current").val();
	var hint_current = jQuery("#hint_current").val();
	jQuery("#hint").html(hint_current);
	jQuery("#score").html(score_current+" ĐIỂM");
	function scorehint(score){
		var text = "";
		if (score == "1") {
			text = "Dở tệ"
		}
		if (score == "2") {
			text = "Dở"
		}
		if (score == "3") {
			text = "Không hay"
		}
		if (score == "4") {
			text = "Ko hay lắm"
		}
		if (score == "5") {
			text = "Bình thường"
		}
		if (score == "6") {
			text = "Xem được"
		}
		if (score == "7") {
			text = "Có vẻ hay"
		}
		if (score == "8") {
			text = "Hay"
		}
		if (score == "9") {
			text = "Rất hay"
		}
		if (score == "10") {
			text = "Hay tuyệt"
		}
		return text;
	}
	jQuery('#star').raty({
		half: false,
		score: function() {
			return jQuery(this).attr('data-score');
		},

		mouseover: function(score, evt){
			jQuery("#score").html(score +" ĐIỂM");
			jQuery("#hint").html(scorehint(score));
		},
		mouseout: function(score, evt){
			var score_current = jQuery("#score_current").val();
			var hint_current = jQuery("#hint_current").val();
			jQuery("#hint").html(hint_current);
			jQuery("#score").html(score_current+" ĐIỂM");
		},
		click: function(score, evt){
			jQuery.ajax({
				'url': filmInfo.ratingUrl+'?_fxAjax=1&_fxResponseType=json',
				'type': 'POST',
				'dataType': 'JSON',
				'data': {'score':score}
			}).done(function(data){
				if(data._fxStatus)
				{
					if(typeof data._fxMessage=='string')
						fx.displayMessage(data._fxMessage);
					else
						fx.displayMessage('Đánh giá của bạn đã được lưu.');
					if(typeof data.rateCount!='undefined')
					{
						jQuery('.box-rating .num-rating').text('('+data.rateCount+' lượt)');
					}
					if(typeof data.ratePoint!='undefined')
					{
						jQuery('.box-rating #score_current').val(data.ratePoint);
					}
				}
				//auto if _fxStatus==0
			});
		}
	});
	jQuery('#star').css('width','200px');
	jQuery('.box-rating #hint').css('font-size','12px');
});

}
/*
     FILE ARCHIVED ON 19:27:43 Jul 16, 2020 AND RETRIEVED FROM THE
     INTERNET ARCHIVE ON 22:02:17 May 10, 2021.
     JAVASCRIPT APPENDED BY WAYBACK MACHINE, COPYRIGHT INTERNET ARCHIVE.

     ALL OTHER CONTENT MAY ALSO BE PROTECTED BY COPYRIGHT (17 U.S.C.
     SECTION 108(a)(3)).
*/
/*
playback timings (ms):
  LoadShardBlock: 66.603 (3)
  RedisCDXSource: 1.131
  esindex: 0.013
  load_resource: 87.546
  exclusion.robots.policy: 0.238
  PetaboxLoader3.resolve: 29.008
  PetaboxLoader3.datanode: 85.991 (4)
  exclusion.robots: 0.25
  captures_list: 91.234
  CDXLines.iter: 20.242 (3)
*/
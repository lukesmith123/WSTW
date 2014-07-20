$(document).ready(function() {
    // are we running in native app or in a browser?
    window.isphone = false;
    if(document.URL.indexOf("http://") === -1 
        && document.URL.indexOf("https://") === -1) {
        window.isphone = true;
    }

    if( window.isphone ) {
        document.addEventListener("deviceready", onDeviceReady, false);
    } else {
        onDeviceReady();
    }
});

function onDeviceReady() {
    // do everything here.



function openURL(urlString, bIAB){
	
	var ua = navigator.userAgent.toLowerCase();
	var isAndroid = ua.indexOf("android") > -1; 
	var isiPad = navigator.userAgent.match(/iPad/i) != null;
	var isiPhone = navigator.userAgent.match(/iPhone/i) != null;
	var isiPod = navigator.userAgent.match(/iPod/i) != null;
	
	if(isAndroid) {
		if(bIAB) {
			 window.open(urlString, '_blank');
		}
		else {
			navigator.app.loadUrl(urlString, { openExternal:true });
		}
	}
	else if (isipad || isiPhone || isiPod) {
		if(bIAB) {
			window.open(urlString, '_blank');
		}
		else {
			window.open(urlString, '_system');
		}
	} 
}
  
var image_text_1; 

initalLoadData(); 
  
$(".refresh-image").click(function(event) { 
var button = $(this); 
button.attr('disabled', 'disabled'); 
setTimeout(function() { 
button.removeAttr('disabled'); 
},800); 
event.preventDefault(); 
loadData(); 
$(".ui-btn-active").removeClass('ui-btn-active');
$("#imdb").remove();
$("#rt1").remove();
$("#rt2").remove();
$("#rt3").remove();
$('#nav-panel').panel('close');
window.scrollTo(0, 0);
});   
  
function loadData() { 
	// Get checked options 
	var checkboxes = new Array();  
	var fetch_limit = 1;  
	$('input[name="image_options"]:checked').each(function() { 
		checkboxes.push($(this).val()); 
	}); 
	// send checkboxes to process.php
	$.ajax({ 
		url: "http://www.wiseowlbookreviews.com/WSTW/process.php", 
		type: "post", 
		data: {checkboxes: checkboxes,limit:fetch_limit}, 
		success: function(data) { 
		
				var obj = $.parseJSON(data);                
				image_text_1 = obj.image_text; 
				//add the result to the page
				$('.text').html(image_text_1);
				//then remove the imdb and rt links from the page 
				// (as they will give away that it is not a native app)
				$("#imdb").remove();
				$("#rt1").remove();
				$("#rt2").remove();
				$("#rt3").remove();
				
				//Get the width of the videoframe /3
				var vidwidth = $("#videoclipframe").width()/2;
				//Set the height as this
				$("#videoclipframe").height(vidwidth);
		}, 
		error: function() { alert('error on loadData function call to process.php')
		} 
	}); 
} <!-- loadData end -->
  
function initalLoadData() { 		
  	// Get checked options 
	var checkboxes = new Array(); 
	$('input[name="image_options"]:checked').each(function() { 
		checkboxes.push($(this).val()); 
	}); 
	// Send checkboxes to process
	$.ajax({ 
		url: "http://www.wiseowlbookreviews.com/WSTW/process.php", 
		type: "post", 
		data: {checkboxes: checkboxes,limit: 1}, 
		success: function(data) { 
		   
			var obj = $.parseJSON(data); 
			image_text_1 = obj.image_text; 
			// add result to the page
			$('.text').html(image_text_1);

			//Get the width of the videoframe /3
			var vidwidth = $("#videoclipframe").width()/2;
			//Set the height as this
			$("#videoclipframe").height(vidwidth);
		}, 
		error: function() { alert('error on initialLoadData function call to process.php') ;  
		} 
	}); 
} <!-- initialLoadData end -->


} <!-- Ready() end -->

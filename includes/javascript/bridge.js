var _____WB$wombat$assign$function_____=function(name){return (globalThis._wb_wombat && globalThis._wb_wombat.local_init && globalThis._wb_wombat.local_init(name))||globalThis[name];};if(!globalThis.__WB_pmw){globalThis.__WB_pmw=function(obj){this.__WB_source=obj;return this;}}{
let window = _____WB$wombat$assign$function_____("window");
let self = _____WB$wombat$assign$function_____("self");
let document = _____WB$wombat$assign$function_____("document");
let location = _____WB$wombat$assign$function_____("location");
let top = _____WB$wombat$assign$function_____("top");
let parent = _____WB$wombat$assign$function_____("parent");
let frames = _____WB$wombat$assign$function_____("frames");
let opener = _____WB$wombat$assign$function_____("opener");
var bridgeParentsLogo = jQuery('').attr('src','/images/bridge/parents-logo.gif'); 
var bridgeTeachersLogo = jQuery('').attr('src','/images/bridge/teachers-logo.gif'); 
var bridgeSign = jQuery('').attr('src','/images/bridge/sign.gif'); 
var bridgeYouAreLeaving = jQuery('').attr('src','/images/bridge/youareleaving.gif'); 

var cursorFix = false;
var bridgeActive = false;
var osName = '';

if (bridgeNoConflict(location.hostname, location.pathname) == true) {
	jQuery.noConflict();
};

jQuery(document).ready(function() {


	// First, get the global GA tracker variable ready
	if (typeof(_gat) == 'object')
	{ 
		partnerPageTracker	= _gat._getTracker("UA-4005001-4");
	}
	currentUrl = window.location.href;



	if (typeof customBridgeOpacity == 'undefined' ) customBridgeOpacity = '.8';
	// Preload bridge images
	
	// jQuery.preloadImages('/images/bridge/parents-logo.gif', '/images/bridge/teachers-logo.gif', '/images/bridge/sign.gif', '/images/bridge/youareleaving.gif');
	
	var bridgeSponsorImages = new Array();
	
	jQuery('a').each(function(i){
		if (jQuery(this).attr('class') == 'pbskids_bridge_sponsor') {
			// alert('Sponsor Image Preloaded');
			bridgeSponsorImages[i] = new Image();
			bridgeSponsorImages[i].src = jQuery(this).attr('rel');
			// jQuery.preloadImages(rel);
		}
	 });

						   
	jQuery('a, area').click(function() {
		if ( (( bridgeURLs(this.hostname, this.pathname) == true ) && bridgeURLs(window.location.hostname, window.location.pathname) == false ) && (jQuery(this).attr('href').indexOf('javascript:') == -1) ) {
				var pathnameslash = '';
				if (this.pathname.substring(0, 1) != '/') { pathnameslash = '/'; };
				return (bridge((jQuery(this).attr('href')), jQuery(this).attr('title'), jQuery(this).attr('class'), jQuery(this).attr('rel'), jQuery(this).attr('rev')));
		};
	});	

});

function flashBridge(href, title) {
	if (bridgeURLs(window.location.hostname, window.location.pathname) == false) {
		bridge(href, title);
	} else {
		window.location.href = href;
	}
};

function bridge(linkhref, linktitle, linkclass, linkrel, linkrev) {	

	// Make arguments optional
	if (typeof linkclass == 'undefined' ) linkclass = 'default';
	if (typeof linkrel == 'undefined' ) linkrel = 'default';
	if (typeof linkrev == 'undefined' ) linkrev = 'default';
	// Split linkhref into hostname and pathname
	var linkhrefSplit = linkhref.split('//');
	if (linkhrefSplit.length > 1) {
		linkhrefSplit = linkhrefSplit[1].split('/');
		// alert(linkhrefSplit.length);
		var hostname = linkhrefSplit[0];
		var pathnamestring = '';
		for (var i=1;i<linkhrefSplit.length;i++) {
			pathnamestring += '/' + linkhrefSplit[i];
		}
		pathname = pathnamestring;
		// var pathname = linkhrefSplit[1];
		if (typeof pathname == 'undefined') { pathname = '' };
	} else {
		pathname = linkhrefSplit[0];
		var windowhref = window.location.href;
		windowhref = windowhref.split('//');
		windowhref = windowhref[1].split('/');
		hostname = windowhref[0];
	}
	
	if ( bridgeActive == false ) {
				
		var documentWidth = jQuery(window).width();
		var documentHeight = jQuery(document).height();
						  
		// Configuration Variables . All sizes are pixels
		bridgeHeight = 210;
		if( (navigator.userAgent.match(/iPod/i)) || (navigator.userAgent.match(/iPhone/i)) ) {
			bridgeWidth = documentWidth * 0.9;
		} else {
			bridgeWidth = 370;			
		}
		bridgeBorder = 10;
		bridgePadding = 15;
						 
		// Attach bridge event to all links not going to pbskids.org or soup.pbskids.org
		
		bridgeActive = true;
	
		if (pathname.substring(0,1) == '/') { bridgeLinkPathname = pathname; }
		else { bridgeLinkPathname = '/' + pathname; }
		
		// If link has a linktitle attribute, use it for bridge link
		if ( linktitle ) {
			bridgeLinkTitle = linktitle;
		}
		// If not, use the URL itself
		else {
			bridgeLinkTitle = hostname + bridgeLinkPathname;
			// If url is longer than 50 characters, cut the URL short and append '...'
			if ( bridgeLinkTitle != bridgeLinkTitle.substring(0, 20) ) {
				bridgeLinkTitle = bridgeLinkTitle.substring(0, 20) + '&hellip;';
			}
		}
		bridgeLink = linkhref;
		
		// Accesses function from bridge.urls.js where templates are specified
		bridgeTemplate = bridgeURLTemplates(hostname, pathname, linkclass);

	
		// A/B Testing
		// var coinFlip = Math.floor(Math.random()*2);
		var coinFlip = 0;
		var testSegment;
		coinFlip == 0 ? testSegment = 'alpha' : testSegment = 'beta';
		
		// Turn all bridge templates to default except sponsor

		if (testSegment == 'beta' && bridgeTemplate != 'sponsor') {
			bridgeTemplate = 'default';
		}
		
		// alert(hostname + ' ' + pathname);


		
		if ( bridgeTemplate == 'parentsSection' ) {
			bridgeLinkTitle = 'the Parents&nbsp;and&nbsp;Teachers&nbsp;section';	
		}
		
		bridgeBackground = '#b3ce34';
		bridgeTitleBackground = '#b3ce34 url(/images/bridge/youareleaving.gif) no-repeat 50% 50%';
		bridgeX = 'bridge-x.gif';
		bridgeLinkColor = '#516F00';
		bridgeTextColor = '#ffffff';		
		
		if (navigator.appVersion.indexOf("Mac") != (-1) ) { osName="MacOS"; }
		cursorFix = bridgeCursorFix(window.location.hostname, window.location.pathname);
		
		jQuery('object, embed').each(function(){
			var windowMode = jQuery(this).attr('wmode');
			if (typeof windowMode == 'undefined') {
				windowMode = jQuery('object').find("param[name='wmode']").attr('value');
			}
			if( (windowMode != 'transparent' && windowMode != 'Transparent' && windowMode != 'opaque' && windowMode != 'Opaque') || (osName == 'MacOS' && cursorFix == true)) {
				this.style.visibility = 'hidden';
			};
		});
		
		// Create bridge overlay elements
		if ( bridgeTemplate == 'parents' || bridgeTemplate == 'parentsSection' ) {
			
			jQuery('body').append('<div id="bridgeContainer"></div><div id="bridgeOutline"></div><div id="bridge"><div id="bridgeInner"><h3>You are now leaving PBS KIDS</h3><p><a href="' + bridgeLink + '" title="' + bridgeLink + '" class="bridgeLink">Continue to ' + bridgeLinkTitle + '&nbsp;&raquo;</a></p><p><a href="' + bridgeLink + '" title="' + bridgeLink + '" class="bridgeSignLink"><img src="/images/bridge/sign.gif" id="sign" width="213" height="92" alt="" /><img src="/images/bridge/parents-logo.gif" id="parentsLogo" width="159" height="27" alt="PBS Parents" /></a></p><a href="" id="close" title="Back to PBS KIDS"><img src="/images/bridge/back-arrow.gif" width="55" height="67" alt="Back" /></a></div></div>');
			
			jQuery('#bridge h3').css({
				'background' : bridgeTitleBackground,
				'border' : '0',
				'height' : '100px',
				'left' : (bridgeWidth - 280) / 2 + 'px',
				'margin' : '0',
				'padding' : '0',
				'position' : 'relative',
				'text-indent' : '-3000px',
				'width' : '280px'
			});
			
			jQuery('#bridgeInner a.bridgeLink').css({
				'color' : bridgeLinkColor,
				'display' : 'block',
				'font-family' : 'Arial, Verdana, sans-serif',
				'font-size' : '14px',
				'margin' : '0 20px 0 34px',
				'padding' : '0 0 100px 0',
				'text-align' : 'center',
				'width' : '300px'
			});
			
			jQuery('#bridgeInner a.bridgeSignLink').css({
				'bottom' : '0',
				'display' : 'block',
				'height' : '92px',
				'left' : '10px',
				'margin' : '0 80px',
				'outline' : 'none',
				'position' : 'absolute',
				'width' : '213px'
			});
			
			jQuery('#parentsLogo').css({
				'left' : '20px',
				'position' : 'absolute',
				'top' : '18px'
			});
			
		} else if ( bridgeTemplate == 'teachers' ) {
			
			jQuery('body').append('<div id="bridgeContainer"></div><div id="bridgeOutline"></div><div id="bridge"><div id="bridgeInner"><h3>You are now leaving PBS KIDS</h3><p><a href="' + bridgeLink + '" title="' + bridgeLink + '" class="bridgeLink">Continue to ' + bridgeLinkTitle + '&nbsp;&raquo;</a></p><p><a href="' + bridgeLink + '" title="' + bridgeLink + '" class="bridgeSignLink"><img src="/images/bridge/sign.gif" id="sign" width="213" height="92" alt="" /><img src="/images/bridge/teachers-logo.gif" id="teachersLogo" width="138" height="33" alt="PBS Teachers" /></a></p><a href="" id="close" title="Back to PBS KIDS"><img src="/images/bridge/back-arrow.gif" width="55" height="67" alt="Back" /></a></div></div>');
			
			jQuery('#bridge h3').css({
				'background' : bridgeTitleBackground,
				'border' : '0',
				'height' : '100px',
				'left' : (bridgeWidth - 280) / 2 + 'px',
				'margin' : '0',
				'padding' : '0',
				'position' : 'relative',
				'text-indent' : '-3000px',
				'width' : '280px'
			});
			
			jQuery('#bridgeInner a.bridgeLink').css({
				'color' : bridgeLinkColor,
				'display' : 'block',
				'font-family' : 'Arial, Verdana, sans-serif',
				'font-size' : '14px',
				'margin' : '0 20px 0 34px',
				'padding' : '0 0 100px 0',
				'text-align' : 'center',
				'width' : '300px'
			});
			
			jQuery('#bridgeInner a.bridgeSignLink').css({
				'bottom' : '0',
				'display' : 'block',
				'height' : '92px',
				'left' : '10px',
				'margin' : '0 80px',
				'outline' : 'none',
				'position' : 'absolute',
				'width' : '213px'
			});
				
			jQuery('#teachersLogo').css({
				'left' : '30px',
				'position' : 'absolute',
				'top' : '14px'
			});
			
		} else if ( bridgeTemplate == 'sponsor' ) {
				
			bridgeWidth = bridgeWidth + 100;
			
			jQuery('body').append('<div id="bridgeContainer"></div><div id="bridgeOutline"></div><div id="bridge"><div id="bridgeInner"><h3>You are now leaving PBS KIDS</h3><p id="bridgeSponsorText"><a href="' + bridgeLink + '" class="bridgeImageLink"><img src="' + linkrel + '" /></a><span id="bridgeInvisibleBlock"></span>' + linkrev + '</p><p class="sponsorTextLink"><a href="' + bridgeLink + '" title="' + bridgeLink + '" class="bridgeLink">Continue to ' + bridgeLinkTitle + '&nbsp;&raquo;</a></p><p id="bridgeClear"><!-- --></p><a href="" id="close" title="Back to PBS KIDS"><img src="/images/bridge/back-arrow.gif" width="55" height="67" alt="Back" /></a></div></div>');
				
			jQuery('#bridgeInvisibleBlock').css({
				// 'border' : '1px solid red',
				'clear' : 'left',
				'display' : 'inline',
				'float' : 'left',
				'height' : '82px',
				'margin' : '0 0 0 -' + (jQuery('#bridgeSponsorText img').width() + 13) + 'px',
				'width' : jQuery('#bridgeSponsorText img').width() + 'px'
			});
				
			jQuery('#bridge h3').css({
				'background' : bridgeTitleBackground,
				'border' : '0',
				'height' : '100px',
				'left' : (bridgeWidth - 280) / 2 + 'px',
				'margin' : '0',
				'padding' : '0',
				'position' : 'relative',
				'text-indent' : '-3000px',
				'width' : '280px'
			});
				
			jQuery('#bridgeInner p.sponsorTextLink').css({
				// 'border' : '1px solid orange',
				'margin' : '0',
				'padding' : '10px 20px 13px ' + (jQuery('#bridgeSponsorText img').width() + 26) + 'px',
				'text-align' : 'center'
			});
				
			jQuery('#bridgeInner a.bridgeLink').css({
				'color' : bridgeLinkColor,
				'font-family' : 'Arial, Verdana, sans-serif',
				'font-size' : '14px'
			});
			
			jQuery('#bridgeSponsorText').css({
				'color' : bridgeTextColor,
				'font-size' : '12px',
				'margin' : '0',
				'padding' : '0 13px 0 ' + (jQuery('#bridgeSponsorText img').width() + 26) + 'px',
				'text-align' : 'left'
			});
			
			jQuery('#bridgeSponsorText img').css({
				'float' : 'left',
				'margin' : '0 0 0 -' + (jQuery('#bridgeSponsorText img').width() + 13) + 'px'
			});
				
			jQuery('#bridgeClear').css({
				// 'display' : 'none',
				// 'border' : '1px solid purple',
				'clear' : 'left',
				// 'float' : 'left',
				'height' : '0',
				'line-height' : '0',
				'margin' : '0',
				'padding' : '0'
			});
		
		} else if ( bridgeTemplate == 'partnership-chrysler' ) {

			partnerPageTracker._trackEvent("Partner Bridge","Open Bridge",currentUrl);
			bridgeWidth = 595;
			bridgeBackground = '#ffffff';
			jQuery('body').append('<div id="bridgeContainer"></div><div id="bridgeOutline"></div><div id="bridge"><div id="bridgeInner"><span class="advanceToDestination"><a href="' + bridgeLink + '" title="' + bridgeLink + '" class="bridgeLink">Continue to ' + bridgeLinkTitle + '&nbsp;&raquo;</a></span><span class="backToPbsKids"><a href="#" id="close" title="Back to PBS KIDS">Back to PBS KIDS</a></span><span class="closeWindow"><a href="#" id="secondaryClose" title="Close Window">Close Window</a></span></div></div>');
			jQuery('#bridgeInner').css({
				'height' : '331px',
				'background' : 'url(/partnerships/bridge-splash-chrysler.jpg) no-repeat'
			});
		
		} else {
			jQuery('body').append('<div id="bridgeContainer"></div><div id="bridgeOutline"></div><div id="bridge"><div id="bridgeInner"><h3>You are now leaving PBS KIDS</h3><p><a href="' + bridgeLink + '" title="' + bridgeLink + '" class="bridgeLink">Continue to ' + bridgeLinkTitle + '&nbsp;&raquo;</a></p><a href="" id="close" title="Back to PBS KIDS"><img src="/images/bridge/back-arrow.gif" width="55" height="67" alt="Back" /></a></div></div>');
				
			jQuery('#bridge h3').css({
				'background' : bridgeTitleBackground,
				'border' : '0',
				'height' : '100px',
				'left' : (bridgeWidth - 280) / 2 + 'px',
				'margin' : '0',
				// 'padding' : '55px 0 20px 0',
				'padding' : '0',
				'position' : 'relative',
				'text-indent' : '-3000px',
				'width' : '280px'
			});
				
			jQuery('#bridge #bridgeInner a.bridgeLink').css({
				'color' : bridgeLinkColor,
				'cursor' : 'pointer',
				'display' : 'block',
				'font-family' : 'Arial, Verdana, sans-serif',
				'font-size' : '14px',
				'font-weight' : 'normal',
				'margin' : '0 20px 0 100px',
				'padding' : '0 0 20px 0',
				'text-align' : 'left',
				'text-decoration' : 'underline'
				// 'width' : '200px'
			});
				
		}
			
		// All Styles necessary to get height
		
		jQuery('#bridgeInner p').css({
			'margin' : '0 0 1em 0'
		});
			
		jQuery('#bridgeInner a.bridgeLink').css({
			'cursor' : 'pointer',
			'font-weight' : 'normal',
			'text-decoration' : 'underline'
		});
			
		jQuery('a img').css({ 'border' : '0' });
				
		jQuery('#bridgeContainer').css({
			'background-color' : '#000000',
			'position' : 'absolute',
			'height' : documentHeight,
			// 'width' : '100%',
			'width' : documentWidth,
			'top' : '0',
			'left' : '0',
			'opacity' : '0',
			'text-align' : 'left',
			'z-index' : '10000'
		});			
			
		jQuery('#bridgeInner').css({
			'font-size' : '16px',
			'padding' : '1px',
			'line-height' : '1.4',
			'text-align' : 'left'
		});
			
		jQuery('#bridge').css({
			'background' : bridgeBackground,
			'font-family' : 'arial, verdana, sans-serif',
			'padding' : '1px',
			'position' : 'absolute',
			'width': (bridgeWidth - 2) + 'px',
			'left' : (documentWidth / 2) - (bridgeWidth / 2) + 'px',
			'opacity' : '0',
			'z-index' : '10002'
		});


		if (bridgeTemplate !== 'partnership-chrysler') {
			jQuery('#close').css({
				'bottom' : '0',
				'display' : 'block',
				'height' : '67px',
				'left' : '15px',
				'outline' : 'none',
				'position' : 'absolute',
				'width' : '55px'
			});
		}
			
		// All post-height styles
			
		bridgeHeight = jQuery('#bridgeInner').height();
		// alert(bridgeHeight);
			
		jQuery('#bridgeOutline').css({
			'background' : '#ffffff',
			'position' : 'absolute',
			'width': (bridgeWidth * 1) + (bridgeBorder * 2) + 'px',
			'height' : (bridgeHeight + 2 * 1) + (bridgeBorder * 2) + 'px',
			'top' : (jQuery(window).height() / 2) - (bridgeHeight / 2) - (bridgeBorder * 1) + jQuery(window).scrollTop() + 'px',
			'left' : (documentWidth / 2) - (bridgeWidth / 2) - (bridgeBorder * 1) + 'px',
			'opacity' : '0',
			'z-index' : '10001'
		});
		
		jQuery('#bridge').css({
			'height' : bridgeHeight + 'px',
			'top' : (jQuery(window).height() / 2) - (bridgeHeight / 2) + jQuery(window).scrollTop() + 'px'
		});
			
		// Bridge behaviors
		
		if (typeof GA_obj !== 'undefined') {

			jQuery('.bridgeLink').click(function(){
				if (bridgeTemplate == 'partnership-chrysler') {
					partnerPageTracker._trackEvent("Partner Bridge","Visit Partner",currentUrl);
				}
				GA_obj.trackEvent('bridge_click_' + bridgeTemplate + '_' + testSegment, 'continue', 'textlink');
			});
			
			jQuery('.bridgeSignLink').click(function(){
				GA_obj.trackEvent('bridge_click_' + bridgeTemplate + '_' + testSegment, 'continue', 'sign');
			});
			
			jQuery('.bridgeImageLink').click(function(){
				GA_obj.trackEvent('bridge_click_' + bridgeTemplate + '_' + testSegment, 'continue', 'imagelink');
			});

		};
			
		jQuery('#bridgeContainer').animate({'opacity' : customBridgeOpacity}, 'fast', function() {
			jQuery('#bridgeOutline').animate({'opacity' : '1'}, 'fast');															   
			jQuery('#bridge').animate({'opacity' : '1'}, 'fast');
		});
			
		jQuery('#bridgeContainer').click(function() {
			if (typeof GA_obj !== 'undefined') {
				if (bridgeTemplate == 'partnership-chrysler') {
					partnerPageTracker._trackEvent("Partner Bridge","Close Bridge",currentUrl);
				}
				GA_obj.trackEvent('bridge_click_' + bridgeTemplate + '_' + testSegment, 'close', 'outside');
			}
			closeBridge();
		});

		// This second selector (#secondaryClose) was created for Chrysler (Apr 2011) by JPW
		jQuery('#close,#secondaryClose').click(function() {
			if (typeof GA_obj !== 'undefined') {
				if (bridgeTemplate == 'partnership-chrysler') {
					partnerPageTracker._trackEvent("Partner Bridge","Close Bridge",currentUrl);
				}
				GA_obj.trackEvent('bridge_click_' + bridgeTemplate + '_' + testSegment, 'close', 'arrow');
			}
			closeBridge();
			return false;
		});
		
		jQuery(document).keyup(function(event){
			if (event.keyCode == 27) {
				if (typeof GA_obj !== 'undefined') {
					if (bridgeTemplate == 'partnership-chrysler') {
						partnerPageTracker._trackEvent("Partner Bridge","Close Bridge",currentUrl);
					}
					GA_obj.trackEvent('bridge_click_' + bridgeTemplate + '_' + testSegment, 'close', 'escape');
				}
				closeBridge();
			}
		});
		
		function windowScrolled() {
			jQuery('#bridgeOutline').css({
				'top' : (jQuery(window).height() / 2) - (bridgeHeight / 2) - (bridgeBorder * 1) + jQuery(window).scrollTop() + 'px',
				'left' : (jQuery(window).width() / 2) - (bridgeWidth / 2) - (bridgeBorder * 1) + 'px'
			});
			jQuery('#bridge').css({
				'top' : (jQuery(window).height() / 2) - (bridgeHeight / 2) + jQuery(window).scrollTop() + 'px',
				'left' : (jQuery(window).width() / 2) - (bridgeWidth / 2) + 'px'
			});
		}
		
		function windowResized() {
			jQuery('#bridgeContainer').css({
				'height' : jQuery(document).height(),
				'width' : jQuery(window).width()
			});
			windowScrolled();
		}
		
		// Reposition bridge on scroll
		jQuery(window).bind("scroll", windowScrolled);
		
		// Resize container on resize event
		jQuery(window).bind("resize", windowResized);
	
		return false;
			
	} else {
		return false;
	};
	
	return true;

};

function closeBridge() {
	jQuery('#bridgeOutline').animate({'opacity' : '0'}, 'fast');
	jQuery('#bridge').animate({'opacity' : '0'}, 'fast', function() {
		jQuery('#bridgeContainer').animate({'opacity' : '0'}, 'fast', function() {
			jQuery('#bridge').remove();
			jQuery('#bridgeOutline').remove();
			jQuery('#bridgeContainer').remove();
			jQuery('object, embed').each(function(){this.style.visibility = 'visible';});
		});
	});
	jQuery(document).unbind('keyup');
	jQuery(window).unbind('scroll');
	jQuery(window).unbind('resize');
	bridgeActive = false;
};
}

/*
     FILE ARCHIVED ON 15:17:46 Oct 26, 2011 AND RETRIEVED FROM THE
     INTERNET ARCHIVE ON 20:53:02 Sep 16, 2026.
     JAVASCRIPT APPENDED BY WAYBACK MACHINE, COPYRIGHT INTERNET ARCHIVE.

     ALL OTHER CONTENT MAY ALSO BE PROTECTED BY COPYRIGHT (17 U.S.C.
     SECTION 108(a)(3)).
*/
/*
playback timings (ms):
  captures_list: 0.744
  exclusion.robots: 0.057
  exclusion.robots.policy: 0.044
  esindex: 0.01
  cdx.remote: 118.814
  LoadShardBlock: 1207.592 (6)
  PetaboxLoader3.resolve: 531.261 (4)
  PetaboxLoader3.datanode: 166.321 (7)
  load_resource: 253.464
*/
var _____WB$wombat$assign$function_____=function(name){return (globalThis._wb_wombat && globalThis._wb_wombat.local_init && globalThis._wb_wombat.local_init(name))||globalThis[name];};if(!globalThis.__WB_pmw){globalThis.__WB_pmw=function(obj){this.__WB_source=obj;return this;}}{
let window = _____WB$wombat$assign$function_____("window");
let self = _____WB$wombat$assign$function_____("self");
let document = _____WB$wombat$assign$function_____("document");
let location = _____WB$wombat$assign$function_____("location");
let top = _____WB$wombat$assign$function_____("top");
let parent = _____WB$wombat$assign$function_____("parent");
let frames = _____WB$wombat$assign$function_____("frames");
let opener = _____WB$wombat$assign$function_____("opener");
function bridgeURLs(hostname, pathname) { 
	return ( hostname != 'www-tc.pbskids.org' ) 
            && ( pathname.indexOf('/redir/http') == -1 )
            && ( hostname != 'pbskids.org' )
            && ( hostname != 'www.pbskids.org' )
            && ( hostname != 'pbskidsgo.org' )
            && ( hostname != 'pbskidsplay.org' )
            && ( hostname != 'www.pbskidsplay.org' )
            && ( hostname != 'dipsy.pbs.org' )
            && ( hostname != 'soup.pbskids.org' )
            && ( hostname != 'video.pbs.org' )
            && ( hostname.length > 0 || pathname.length > 0 )
            // Relative URLs cause hostname to be blank in IE 8 or lower. These should not cause bridge overlay to appear.
            && ( !(navigator.appName == 'Microsoft Internet Explorer' && hostname.length == 0) )
            && ( pathname.indexOf('openVideoWin') == -1 )
            && ( pathname.indexOf('history.back') == -1 )
            || ( pathname.indexOf('parentsteachers') != -1 )
            || ( pathname.indexOf('caregiver') != -1 )
            || ( pathname.indexOf('itsmylife/parents') != -1 )
            || ( pathname.indexOf('animalia/parents_and_teachers') != -1 )
            || ( pathname.indexOf('parentsTeachers') != -1 )
            || ( pathname.indexOf('mamamirabelle/parents') != -1 )
            || ( pathname.indexOf('barney/pareduc') != -1 )
            || ( pathname.indexOf('zoom/grownups') != -1 )
            || ( pathname.indexOf('readingrainbow/parents_and_teachers') != -1 )
            || ( pathname.indexOf('wordgirl/parentsandteachers') != -1 )
            || ( pathname.indexOf('electriccompany/parentseducators') != -1 )
            || ( pathname.indexOf('wordworld/parentsandteachers') != -1 )
            || ( pathname.indexOf('wordworld/sitemap') != -1 )
            || ( pathname.indexOf('wordworld/contactus') != -1 )
            || ( pathname.indexOf('wordworld/activities') != -1 );
}

function bridgeURLTemplates(hostname, pathname, linkClass) {
		if ( (hostname == 'pbsparents.org' || hostname == 'www.pbsparents.org') || ( (hostname == 'pbs.org' || hostname == 'www.pbs.org') && bridgeLinkPathname.substring(0,9) == '/parents/' ) ) { return 'parents'; }
		if ( ( pathname.indexOf('animalia/parents_and_teachers') != -1 ) || ( pathname.indexOf('parentsteachers') != -1 ) || ( pathname.indexOf('itsmylife/parents') != -1 ) || ( pathname.indexOf('readingrainbow/parents_and_teachers') != -1 ) || ( pathname.indexOf('barney/pareduc') != -1 ) || ( pathname.indexOf('grownups') != -1 ) || ( pathname.indexOf('/caregiver') != -1 ) || ( pathname.indexOf('parents') != -1 ) ) { return 'parentsSection'; }
		else if ( (hostname == 'pbsteachers.org' || hostname == 'www.pbsteachers.org') || ( (hostname == 'pbs.org' || hostname == 'www.pbs.org') && bridgeLinkPathname.substring(0,10) == '/teachers/' ) ) { return 'teachers'; }
		else if (linkClass == 'pbskids_bridge_sponsor' ) { return 'sponsor'; }
		/* JPW 3-28-2011 */ else if (linkClass == 'partnership-chrysler') { return 'partnership-chrysler'; }
		else { return 'default'; };
}

function bridgeCursorFix(hostname, pathname) {
	if ( ( pathname.indexOf('teletubbies') != -1 ) || 
		( pathname.indexOf('sesame') != -1 ) ||
		( pathname.indexOf('panwapa') != -1 ) ||
		( pathname.indexOf('mamamirabelle') != -1 ) ||
		( pathname.indexOf('caillou') != -1 ) ||
		( pathname.indexOf('toopyandbinoo') != -1 ) ||
		( pathname.indexOf('/zoom/games/goldburgertogo/') != -1) )				   
	{
		return true;
	} else {
		return false;
	}
}

function bridgeNoConflict(hostname, pathname) {
	if (
		( pathname.indexOf('curiousgeorge') != -1 )				   
	) { return true; } else
	{ return false; }
}

}

/*
     FILE ARCHIVED ON 15:17:48 Oct 26, 2011 AND RETRIEVED FROM THE
     INTERNET ARCHIVE ON 19:53:57 Sep 16, 2026.
     JAVASCRIPT APPENDED BY WAYBACK MACHINE, COPYRIGHT INTERNET ARCHIVE.

     ALL OTHER CONTENT MAY ALSO BE PROTECTED BY COPYRIGHT (17 U.S.C.
     SECTION 108(a)(3)).
*/
/*
playback timings (ms):
  capture_cache.get: 14.634
  load_resource: 114.756
  PetaboxLoader3.resolve: 46.688
  PetaboxLoader3.datanode: 54.804
*/
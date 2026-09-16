import mx.transitions.Tween;
import mx.transitions.easing.*;
import flash.events.*;

// 03-08-2008 - added vars for tracking plays
var varNumPlays:Number = 0;

function testCompletion(){
	if(varNumPlays == 5){
		trace("CONTACT AGGREGATOR!");
	}	
}
// end 03-08-2008 addition

//PLAYED WELCOME
var played_welcome = false;

//CONFIG SOUNDS
var feedbacksounds = new Array('amazing','awesome','incredible','cool');
var feedback_n = 0; 		// CURRENT FEEDBACK SOUND
var intervalSound = null;	// INTERVAL SOUND TO PLAY
var intervalID = null;		// INTERVAL ID


//SOUNDS CURRENTLY PLAYING
var playingSounds = new Array();

//WORDS  ENDINGS AND BEGINNINGS
var endings = new Array ('ack','an','ap','ar','est','ick','ig','ip','it','ock','op','ub','uck','ug');
var beginnings = new Array;
beginnings['ack'] = new Array('b','bl','qu','s','sn');
beginnings['an'] = new Array('c','f','m','pl','r');
beginnings['ap'] = new Array('ch','c','m','scr','r');
beginnings['ar'] = new Array('b','c','f','j','st');
beginnings['est'] = new Array('b','ch','t','v','w');
beginnings['ick'] = new Array('ch','cl','p','qu','tr');
beginnings['ig'] = new Array('b','d','p','tw','w');
beginnings['ip'] = new Array('dr','fl','sh','sk','tr');
beginnings['it'] = new Array('b','f','qu','spl','s');
beginnings['ock'] = new Array('bl','cl','r','sh','s');
beginnings['op'] = new Array('m','dr','h','st','sh');
beginnings['ub'] = new Array('cl','c','r','scr','t');
beginnings['uck'] = new Array('d','l','st','tr','y');
beginnings['ug'] = new Array('b','h','j','pl','r');

//CURRENT BEGINNING AND ENDING
var cur_end = '';
var cur_beg = '';

//AFTER SPEAK MAKE SHIRTS CCLICKABLE
var is_opponent_ending = false;

//PLAY CROWD CHEER
var do_crowd = false;

//-------------------
// SOUND STUFF
//-------------------


	// STOP ALL PLAYING SOUNDS
	//-----------------------
	
	function bb_stopAllSounds()
	{
		var len = playingSounds.length;
		for(var l:Number = 0; l < len; l++)
		{
			playingSounds[l].stop();
			playingSounds[l]= null;
		}
		playingSounds = new Array();
	}



	// PLAY SOUND (PHRASE)
	//-----------------------	
	function play_sound(this_sound)
	{
		//STOP ANYTHING PLAYING
		bb_stopAllSounds();
		
		//ADD TO LIST OF PLAYING SOUNDS
		playingSounds.push(_root.s_phrases[this_sound]);

		//PLAY SOUND
		// 03-28-08 _root.s_phrases[this_sound].setVolume(100);
		// 03-28-08 _root.s_phrases[this_sound].start();
		s_phrases[this_sound].setVolume(100);
		s_phrases[this_sound].start();
	}

	// AFTER SOUND FINISHED DO NEXT ACTION
	//-----------------------	
	function soundfinished(mememe)
	{
		var this_sound = mememe.idname;

		switch(this_sound)
		{
			
			case "chooseplayer":
					// 03-28-08 _root.enable_player();
					enable_player();
					break ;
			case "playagainst":
					// 03-28-08 _root.delay_word(_root.cur_end,5);
					delay_word(cur_end,5);
					break ;
			case "whistle":
					// 03-28-08 _root.game.gotoAndPlay("begingame");
					game.gotoAndPlay("begingame");
					break ;
			case "more":
					//_root.delay_word(_root.cur_end,5);
					// 03-28-08 _root.play_word(_root.cur_end);
					play_word(cur_end);
					break
			case "crowd":
					// 03-28-08 _root.do_feedback();
					do_feedback();
					break;
			case 'amazing':
			case 'awesome':
			case 'incredible':
			case 'cool':
					// 03-28-08 _root.game.gotoAndStop('endofgame');
					// 03-28-08 _root.game.scoreboard.gotoAndStop('canclick');
					game.gotoAndStop('endofgame');
					game.scoreboard.gotoAndStop('canclick');
					
			default:
				 //nothing;
		}
	}

	// PLAY SOUND AFTER A DELAY
	//-----------------------	
	function delay_sound(this_sound,delay)
	{
		clearInterval(intervalID);
		intervalSound = this_sound;
		intervalID = setInterval(interval_sound, delay);
	}

		function interval_sound()
		{
			clearInterval(intervalID);
			// 03-28-08 _root.play_sound(intervalSound);
			play_sound(intervalSound);
		}


	// AFTER WORD FINISHED DO NEXT ACTION
	//-----------------------	
	function wordfinished(mememe)
	{
		var this_sound = mememe.idname;
	
		if(is_opponent_ending)
		{
			is_opponent_ending = false;
			enable_opponet();
			return;
		}
		else if(do_crowd)
		{
			do_crowd = false;
			// 03-28-08 _root.play_sound('crowd');
			play_sound('crowd');
		}
	
	}


	// PLAY WORD
	//-----------------------		
	function play_word(this_sound)
	{
		//STOP ANYTHING PLAYING	
		bb_stopAllSounds();
		
		//ADD TO LIST OF PLAYING SOUNDS
		//03-28-08 playingSounds.push(_root.s_words['s_'+this_sound]);
		
		playingSounds.push(s_words['s_'+this_sound]);
		
		//PLAY WORD		
		// 03-28-08 _root.s_words['s_'+this_sound].setVolume(100);
		// 03-28-08 _root.s_words['s_'+this_sound].start();
		s_words['s_'+this_sound].setVolume(100);
		s_words['s_'+this_sound].start();
	}

	// PLAY WORD AFTER A DELAY
	//-----------------------	
	function delay_word(this_sound,delay)
	{
		clearInterval(intervalID);
		intervalSound = this_sound;
		intervalID = setInterval(interval_word, delay);
	}
	
		function interval_word()
		{
			clearInterval(intervalID);
			// 03-28-08 _root.play_word(intervalSound);
			play_word(intervalSound);
		}



//-------------------
// GAME STUFF
//-------------------

	// PLAY FEEDBACK SOUND (AMAZING etc...)
	//-----------------------	
	function do_feedback()
	{
		
		play_sound(feedbacksounds[feedback_n]);
		feedback_n++;
		if(feedback_n >= feedbacksounds.length) feedback_n = 0;
		
	}



/**
function do_feedback()
{
	//endofgame
	play_sound('crowd');
}
**/


	// MAKE THE OPPONENt (SHIRTS) BUTTONS
	//----------------------
	function choose_opponent()
	{
		is_opponent_ending = true;
		// 03-28-08 _root.play_sound('playagainst');
		// 03-28-08 _root.game.wendings.gotoAndStop(cur_end);
	
		play_sound('playagainst');
		game.wendings.gotoAndStop(cur_end);
	
		for(var l:Number = 0; l < 5; l++)
		{
			var opp:String = "p"+l;
			// 03-28-08 var opp_mc = eval('_root.game.'+opp);
			var opp_mc = eval('game.'+opp);
			opp_mc.ptype.gotoAndStop(beginnings[cur_end][l]);
			opp_mc.word = beginnings[cur_end][l];
			opp_mc.enabled = false;
			opp_mc.onRollOver = function():Void
			{
				this.gotoAndStop(2);
				// 03-28-08 _root.play_word(this.word)
				play_word(this.word)
			}
			opp_mc.onDragOver = opp_mc.onRollOver;
	
			opp_mc.onRollOut = function():Void
			{
				this.gotoAndStop(1);
			}
			opp_mc.onDragOut = opp_mc.onRollOut;
	
			opp_mc.onPress = function():Void
			{
				this.gotoAndStop(3);
			}
	
			opp_mc.onRelease = function():Void
			{
				// 03-28-08 _root.cur_beg = this.word;
				// 03-28-08 _root.game.gotoAndStop("kickoff");
				cur_beg = this.word;
				game.gotoAndStop("kickoff");
			}
	
		}
	}

		// MAKE THEM CLIKABLE
		//----------------------
		function enable_opponet()
		{
			//go through each and TWEEN away
			for(var l:Number = 0; l < 5; l++)
			{
				var opp:String = "p"+l;
				// 03-28-08 var opp_mc = eval('_root.game.'+opp);
				var opp_mc = eval('game.'+opp);
				opp_mc.ptype.gotoAndStop(beginnings[cur_end][l]);
				opp_mc.word = beginnings[cur_end][l];
				opp_mc.enabled = true;
			}
		}

	// MAKE THE PLAYER (HELMET) BUTTONS
	//----------------------
	function choose_player()
	{
		// 03-28-08 _root.played_welcome = true;
		// 03-28-08 _root.play_sound("chooseplayer");
		played_welcome = true;
		play_sound("chooseplayer");
	
			//go through each and TWEEN away
			for(var l:Number = 0; l < 14; l++)
			{
				var helmet:String = "helmet"+l;
				// 03-28-08 var helmet_mc = eval('_root.game.'+helmet);
				var helmet_mc = eval('game.'+helmet);
				helmet_mc.enabled = false;
				helmet_mc.ptype.gotoAndStop(endings[l]);
				helmet_mc.word = endings[l];
	
				helmet_mc.onRollOver = function():Void
				{
					this.gotoAndStop(2);
					// 03-28-08 _root.play_word(this.word)
					play_word(this.word)
				}
				helmet_mc.onDragOver = helmet_mc.onRollOver;
	
				helmet_mc.onRollOut = function():Void
				{
					this.gotoAndStop(1);
				}
				helmet_mc.onDragOut = helmet_mc.onRollOut;
	
				helmet_mc.onPress = function():Void
				{
					this.gotoAndStop(3);
				}
				helmet_mc.onRelease = function():Void
				{
					// 03-28-08 _root.cur_end = this.word;
					// 03-28-08 _root.game.gotoAndStop("chooseopponent");
					cur_end = this.word;
					game.gotoAndStop("chooseopponent");
				}
	
			}
	}

		// MAKE THEM CLIKABLE
		//----------------------
		function enable_player()
		{
			//go through each and TWEEN away
			for(var l:Number = 0; l < 14; l++)
			{
				var helmet:String = "helmet"+l;
				// 03-28-08 var helmet_mc = eval('_root.game.'+helmet);
				var helmet_mc = eval('game.'+helmet);
				helmet_mc.enabled = true;
			}
		}


		// SAY WORD BEGINNING, END, AND BOTH
		//----------------------
		function w_b(){
			play_word(cur_beg);
		}
		function w_e(){
			play_word(cur_end);
		}
		function w_be(){
			play_word(cur_beg+cur_end);
		}


		// SET UP SCOREBOARD
		//--------------------
		function begingame()
		{
			// 03-28-08 _root.game.scoreboard.wb.gotoAndStop(cur_beg);
			// 03-28-08 _root.game.scoreboard.we.gotoAndStop(cur_end);
			game.scoreboard.wb.gotoAndStop(cur_beg);
			game.scoreboard.we.gotoAndStop(cur_end);
		}


		// WHETHER OR NOT TO TEST WORD FINISHED
		//--------------------
		function test_word()
		{
			// 03-28-08 _root.do_crowd = true;
			do_crowd = true;
		}


		function kickoff()
		{
			//deprecated
		}


		// SET UP GAME ENDING
		//--------------------
		function game_end()
		{
			//03-28-08 
			varNumPlays ++;
			testCompletion();
			
			// 03-28-08 _root.game.ng.onRollOver = function():Void
			game.ng.onRollOver = function():Void
			{
				// 03-28-08 _root.bb_stopAllSounds();
				// 03-28-08 _root.play_sound('newgame');
				bb_stopAllSounds();
				play_sound('newgame');
				this.gotoAndStop('over');
			}
			// 03-28-08 _root.game.ng.onDragOver = _root.game.ng.onRollOver;
			game.ng.onDragOver = game.ng.onRollOver;
			//03-28-08 _root.game.ng.onRollOut = function():Void
			game.ng.onRollOut = function():Void
			{
				this.gotoAndStop(1);
			}
			// 03-28-08 _root.game.ng.onDragOut = _root.game.ng.onRollOut;
			game.ng.onDragOut = game.ng.onRollOut;
			// 03-28-08 _root.game.ng.onPress = function():Void
			game.ng.onPress = function():Void
			{
				this.gotoAndStop('click');
			}
			// 03-28-08 _root.game.ng.onRelease = function():Void
			game.ng.onRelease = function():Void
			{
				// 03-28-08 _root.cur_end = '';
				// 03-28-08 _root.cur_beg = '';
				// 03-28-08 _root.game.gotoAndStop("chooseplayer");
				cur_end = '';
				cur_beg = '';
				game.gotoAndStop("chooseplayer");
			}
			// 03-28-08 _root.game.mo.ptype.gotoAndStop(cur_end+"_e");
			// 03-28-08 _root.game.mo.onRollOver = function():Void
			game.mo.ptype.gotoAndStop(cur_end+"_e");
			game.mo.onRollOver = function():Void
			{
				// 03-28-08 _root.bb_stopAllSounds();
				// 03-28-08 _root.play_sound('more');
				bb_stopAllSounds();
				play_sound('more');
				this.gotoAndStop('over');
			}
			// 03-28-08 _root.game.mo.onDragOver = _root.game.mo.onRollOver;
			game.mo.onDragOver = game.mo.onRollOver;
			// 03-28-08 _root.game.mo.onRollOut = function():Void
			game.mo.onRollOut = function():Void
			{
				this.gotoAndStop(1);
			}
			// 03-28-08 _root.game.mo.onDragOut = _root.game.mo.onRollOut;
			game.mo.onDragOut = game.mo.onRollOut;
			// 03-28-08 _root.game.mo.onPress = function():Void
			game.mo.onPress = function():Void
			{
				this.gotoAndStop('click');
			}
			// 03-28-08 _root.game.mo.onRelease = function():Void
			game.mo.onRelease = function():Void
			{
				// 03-28-08 _root.cur_beg = '';
				// 03-28-08 _root.game.gotoAndStop("chooseopponent");
				cur_beg = '';
				game.gotoAndStop("chooseopponent");
			}
		}
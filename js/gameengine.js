/*
 ___________________________
/                           \
| o        S' GIT         o |
|   Solothurn & Grenchen    |
|       Institutes of       |
| o   gaming Technology   o |
\___________________________/

by Benedict Jäggi @ MMXX

Basic game-engine functions:
	getDeltaTime gets the ticks (ms) since the last frame update.
	UPDATE -> call this after each frame.
*/

// general log function
var log = function(txt)
{
	console.log(txt);
}

// https://keycode.info/
// standard key codes.
var KEY_LEFT=37;
var KEY_RIGHT=39;
var KEY_UP=38;
var KEY_DOWN=40;
var KEY_SPACE=32;

var KEY_W=87;
var KEY_A=65;
var KEY_S=83;
var KEY_D=68;


// the game engine GE.
var GE = function() 
{
	var me = this; // prevent stuff from getting this'ed.
	this.m_deltatime;
	this.m_lastUpdate = Date.now();
	var m_myInterval = null;
	var m_updatefunction = null;
	var m_actualDisplayID = "";
	var m_mainDisplayID = "";
	
	this.getActualDisplayID=function() {return m_actualDisplayID;}
	var m_actualDisplayBuffer = 0;
	
	var ma_keyCode=[]
	this.getKeyDown=function(code)
	{
		return ma_keyCode[code];
	}
	
	this.getDeltaTime = function() {return m_deltatime;}
	this.INIT = function(mainscreenID,updatefunc = null)
	{
		m_mainDisplayID=mainscreenID
		m_updatefunction = updatefunc;
		m_myInterval = setInterval(GE.tick,10);
		log("[ OK ] Game Engine GE initialized.")
		
		// add the two buffer displays        absolute       100         100
		var html='<div id="GEdiBuf0" style="position:absolute; width:100%; height:100%; top:0px; left:0px;"></div>';
		html+='<div id="GEdiBuf1" style="position:absolute; width:100%; height:100%;  top:0px; left:0px;"></div>';
		$(m_mainDisplayID).append(html);
		
		// init keycodes list
		ma_keyCode=[]
		for(var i=0;i<255;i++)
		{
			var c=0;
			ma_keyCode.push(c);
		}
		
		// get key events.
		$("body").on('keydown', __keydownfunc)
		$("body").on('keyup', __keyupfunc)
	}
	
	// the key down event handler.
	var __keydownfunc=function(evt)
	{
		var c = evt.keyCode;
		log("keydown "+c);
		ma_keyCode[c]=1
	}
	
	// the key up event handler.
	var __keyupfunc=function(evt)
	{
		var c = evt.keyCode;
		log("keyup "+c);
		ma_keyCode[c]=0
	}

	this.RENDER = function()
	{
		// show the actual display.
		$(m_actualDisplayID).css('display','block');
		
		// flip the buffer id.
		m_actualDisplayBuffer = Math.abs(m_actualDisplayBuffer-1); //switch between 0&1
		m_actualDisplayID = "#GEdiBuf"+m_actualDisplayBuffer;
		
		// hide the (new) actual display.
		$(m_actualDisplayID).css('display', 'none');
		
		// hide the actual display.
		me.clearActualDisplay();
	}
	
	// clear the actual display buffer.
	this.clearActualDisplay = function() {$(m_actualDisplayID).html("");}
	
	this.UPDATE = function()
	{
		if(m_updatefunction!=null)
			m_updatefunction(me.m_deltatime)
	}
}

g_gameengine = GE = new GE();
GE.getDeltaTime = function() {return g_gameengine.getDeltaTime();}
GE.tick = function() 
{
	var now = Date.now();
  	g_gameengine.m_deltatime = (now - g_gameengine.m_lastUpdate)*0.001;
    	g_gameengine.m_lastUpdate = now;
    	g_gameengine.UPDATE(g_gameengine.m_deltatime);
    	g_gameengine.RENDER(g_gameengine.m_deltatime);
}


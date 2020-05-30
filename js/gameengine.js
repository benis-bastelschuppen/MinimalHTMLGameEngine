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
	
	this.getDeltaTime = function() {return m_deltatime;}
	this.INIT = function(mainscreenID,updatefunc = null)
	{
		m_mainDisplayID=mainscreenID
		m_updatefunction = updatefunc;
		m_myInterval = setInterval(GE.tick,10);
		log("[ OK ] Game Engine GE initialized.")
		
		// add the two buffer displays        absolute       100         100
		var html='<div id="GEdiBuf0" style="position:absolute; width:100%; height:100%; top:0px; left:0px; border: 1px solid #FF00FF;"></div>';
		html+='<div id="GEdiBuf1" style="position:absolute; width:100%; height:100%;  top:0px; left:0px; border: 1px solid #FF0000;"></div>';
		$(m_mainDisplayID).append(html);
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
	this.clearActualDisplay = function()
	{
		$(m_actualDisplayID).html("");
	}
	
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


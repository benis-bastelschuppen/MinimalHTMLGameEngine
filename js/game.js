/*

******************************
*         Agis Game          *
*    A game dedicated to     *
*       Agnaldo Fuhrer       *
*   my best living friend    *
* who's got lost in my sight *
* Hope I'll find him again.  *
******************************
 ___________________________
/                           \
| o        S' GIT         o |
|   Solothurn & Grenchen    |
|       Institutes of       |
| o   gaming Technology   o |
\___________________________/

by Benedict Jäggi 2020

*/


// ***************************** OLD

var aCharacter = function()
{
	var me = this; // prevent sub functions from getting this-ed.
	// lebenspunkte
	var LP = 12; // make hearts, not war. Zelda hearts.
	this.getLP = function() {return LP;}
	this.addLP = function(value) {LP+=value;return LP;}
	this.setLP = function(value) {LP=value;return LP;}
	
	// x and y position of the player.
	var m_x = 10;
	var m_y = 20;
	// sprite name
	var m_sprite = "agi";
	// additional classes
	var m_classes = "sprite";
	// direction class
	var m_direction = 5;
	var m_dirname = -1; // set by m_direction
	// the actual frame of this direction.
	var m_dirFrame = 1;
	var m_frameChange = 0.0; // time until next frame change.
	var m_maxFrameChange = 0.15 // wait so long for next frame change.
	var m_STATE = 1 // 0 = standing, 1 = moving
	// update function
	this.UPDATE = function(deltatime)
	{
		m_frameChange+=deltatime;
		switch(m_STATE)
		{
			case 1: //moving
				if(m_frameChange >= m_maxFrameChange)
				{
					m_dirFrame+=1
					if(m_dirFrame>3)
						m_dirFrame=1;
				}
				break;
			case 0: // standing
			default:
				m_dirFrame = 3;
				break;
				
		}
		// reset framechange
		if(m_frameChange >= m_maxFrameChange)
			m_frameChange=0;
	}
	
	this.RENDER=function()
	{
		// translate direction
		switch(m_direction)
		{
			case 4:
			case 'u': m_dirname="up";break;
			case 3:
			case 'l': m_dirname = "left";break;
			case 2:
			case 'd': m_dirname = "down";break;
			case 1:
			case 'r':
			default:
				m_direction=1; // set default direction if there is a mess 
				m_dirname="right";break;
		}
		// set new class
		m_myclass = m_sprite+" "+m_classes+" "+m_dirname+"_"+m_dirFrame;
		// create element and append it to the screen.
		var elem='<div class="'+m_myclass+'" style="top: '+m_y+'px; left: '+m_x+'px;"></div>';
		log("Rendering to "+g_gameengine.getActualDisplayID());
		$(g_gameengine.getActualDisplayID()).append(elem);
	}
}

var aGame = function()
{
	var m_players = [];
	var m_maxplayers = 1;
	var m_screen = 0;
	this.INIT = function(myscreen)
	{
		for(var i = 0;i<m_maxplayers;i++)
		{
			plr = new aCharacter();
			m_players.push(plr);
		}
		m_screen = myscreen;
	}
	
	this.UPDATE = function(deltatime)
	{
		//log("looptick inside game");
		for(var i=0;i<m_maxplayers;i++)
		{
			p=m_players[i];
			p.UPDATE(deltatime);
			p.RENDER();
		}
		
//		log("TAK");
	}
}

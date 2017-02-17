function Jeu()
{
	var jeu = this;
 	var arrierePlan = null;
	var balle = null;
	var terrain = null;
	var joueur1 = null;
	var joueur2 = null;
	var collisions = null;
	
	var canvas2D;
	
	var debug = document.getElementById("debug");
	
	var canvas = document.getElementById('canvas');
	canvas2D = canvas.getContext('2d');
	canvas2D.fillStyle='red';
	canvas2D.fillRect(0,0,canvas.width,canvas.height);
	
	
	
	var CliquerSouris = function(evenement)
	{
		debug.innerHTML = "click<br>" + debug.innerHTML;
	}
	
	var BougerSouris = function(evenement)
	{
		var mousePos = evenement.clientX + ',' + evenement.clientY;
		debug.innerHTML = mousePos + '<br>' + debug.innerHTML;
	}
	
	this.lancer = function()
	{
		window.addEventListener("click", CliquerSouris);
		window.addEventListener('mousemove', BougerSouris);
	}
}



Jeu.Configuration = 
{
  interval : 1000/60
}

Jeu.Evenement =
{
  clicSourisEnAction : document.createEvent('Event'),
  arrierePlanFinChargement : document.createEvent('Event'),
}


Jeu = new Jeu();
Jeu.lancer();

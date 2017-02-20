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
	
	
	
	var CliquerSouris = function(evenement)
	{
		debug.innerHTML = "click<br>" + debug.innerHTML;
	}
	
	var BougerSouris = function(evenement)
	{
		var mousePos = 'X: ' + evenement.clientX + ' Y: ' + evenement.clientY;
		debug.innerHTML = mousePos + '<br>' + debug.innerHTML;
	}

	var Dessiner = function(evenement)
	{
		var cercle = new createjs.Shape();
		cercle.graphics.beginFill("DeepSkyBlue").drawCircle(0, 0, 50);
		cercle.x = 100;
		cercle.y = 100;
		scene.addChild(cercle);

		createjs.Ticker.addEventListener("tick", rafraichirAnimation);
	}
	
	var rafraichirAnimation = function(evenement)
	  {
			arrierePlan.rafraichirAnimation(evenement);
		
			scene.update(evenement);
	  }
	
	this.lancer = function()
	{
		
		window.addEventListener("click", CliquerSouris);
		window.addEventListener('mousemove', BougerSouris);

		window.addEventListener(window.Evenement.arrierePlanFinChargement.type,Dessiner);
		
		scene = new createjs.Stage(canvas);
		
		arrierePlan = new ArrierePlan(scene);

		createjs.Ticker.setInterval(1000/60);
	}
}



Jeu.Configuration = 
{
  interval : 1000/60,
}

Jeu.Evenement =
{
  clicSourisEnAction : document.createEvent('Event'),
  arrierePlanFinChargement : document.createEvent('Event'),
}

Jeu.Evenement.initialiser = function()
{
  for(key in Jeu.Evenement)
  {
    if(Jeu.Evenement[key] instanceof Event)
    {
      Jeu.Evenement[key].initEvent(key, true, true);
    }
  }
  window['Evenement'] = Jeu.Evenement;
}();

Jeu = new Jeu();
Jeu.lancer();
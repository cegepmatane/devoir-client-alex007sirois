function Jeu()
{
	var jeu = this;
 	var arrierePlan = null;
	var balle = null;
	var terrain = null;
	var joueur1 = null;
	var joueur2 = null;
	var collisions = null;

	var ratioX;
	var ratioY;
	
	var canevas;
	var canevas2D;
	
	var debug = document.getElementById("debug");
	
	var canevasDiv = document.getElementById('canevasDiv');
	
	
	var initialiserCanevas = function()
  {
      largeur = 1400;
			hauteur = 700;

			canevasDiv.innerHTML = "<canvas id='canevas' width='" + largeur + "px' height='" + hauteur + "px'></canvas>";

			canevas = document.getElementById('canevas');
			canevas2D = canevas.getContext('2d');

			//RecalculCanevas(null);
			canevas.style.width = "94%";
			canevas.style.height = "94%";

			canevas.style.marginLeft = "3%";
			canevas.style.marginTop="1%";

			ratioX = canevas.width / (window.innerWidth*0.94);
			ratioY = canevas.height / (window.innerHeight*0.94);
  }

	var RecalculCanevas = function(evenement)
	{
			ratioX = canevas.width / (window.innerWidth*0.94);
			ratioY = canevas.height / (window.innerHeight*0.94);
	}

	var CliquerSouris = function(evenement)
	{
		//debug.innerHTML = "click<br>" + debug.innerHTML;
		
	}
	
	var BougerSouris = function(evenement)
	{
		//var mousePos = 'X: ' + evenement.clientX + ' Y: ' + evenement.clientY;
		//debug.innerHTML = mousePos + '<br>' + debug.innerHTML;
			joueur.rafraichirAnimation(evenement,ratioX,ratioY);
			
	}

	var Dessiner = function(evenement)
	{
		balle = new Balle(scene);
		joueur = new Joueur(scene);

		createjs.Ticker.addEventListener("tick", rafraichirAnimation);
	}
	
	var rafraichirAnimation = function(evenement)
	  {
			arrierePlan.rafraichirAnimation(evenement);
			balle.rafraichirAnimation(evenement);
		
			scene.update(evenement);
	  }
	
	this.lancer = function()
	{
		initialiserCanevas();

		canevas.addEventListener("click", CliquerSouris);
		window.addEventListener('mousemove', BougerSouris);

		window.addEventListener("resize", RecalculCanevas);

		window.addEventListener(window.Evenement.arrierePlanFinChargement.type,Dessiner);

		scene = new createjs.Stage(canevas);
		
		arrierePlan = new ArrierePlan(scene);

		createjs.Ticker.setInterval(1000/60);
	}
}



window.Configuration = 
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
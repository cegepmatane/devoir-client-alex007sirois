function Jeu()
{
	var jeu = this;
 	var arrierePlan = null;
	var balle = null;
	var terrain = null;
	var joueur1 = null;
	//var joueur2 = null;
	var collisions = null;

	var vitesseBalle;

	var ratioX;
	var ratioY;

	var informationCanevas;
	var canevas;
	
	var debug = document.getElementById("debug");
	var canevasDiv = document.getElementById('canevasDiv');
	
	
	var initialiserCanevas = function()
  	{
    	largeur = 2000;
		hauteur = 1000;

		canevasDiv.innerHTML = "<canvas id='canevas' oncontextmenu='return false'  width='" + largeur + "px' height='" + hauteur + "px'></canvas>";
		canevas = document.getElementById('canevas');

			//RecalculCanevas(null);
		canevas.style.width = "94%";

		canevas.style.marginLeft = "5%";
		canevas.style.marginTop="1%";

		informationCanevas=canevas.getBoundingClientRect();

		ratioX = canevas.width / informationCanevas.width;
		ratioY = canevas.height / informationCanevas.height;
	}

	this.partieTerminee = function()
	{
		balle.reinitialiser();
	}

	var RecalculCanevas = function(evenement)
	{
			informationCanevas=canevas.getBoundingClientRect();

			ratioX = canevas.width / informationCanevas.width;
			ratioY = canevas.height / informationCanevas.height;
	}

	var CliquerSouris = function(evenement)
	{
		//debug.innerHTML = "click<br>" + debug.innerHTML;
		if(joueur1!=null)
		{
			joueur1.exploser(evenement,ratioX,ratioY);
		}
	}
	
	var BougerSouris = function(evenement)
	{
		/*var mousePos = 'X: ' + (evenement.clientX - canevas.offsetLeft) + ' Y: ' + (evenement.clientY- canevas.offsetTop);
		debug.innerHTML = mousePos + '<br>' /*+ debug.innerHTML*/;
		if(joueur1!=null)
		{
			joueur1.rafraichirAnimation(evenement,ratioX,ratioY);
		}
	}

	var Dessiner = function(evenement)
	{
		window.removeEventListener(window.Evenement.arrierePlanFinChargement.type,Dessiner);

		balle = new Balle(scene);
		joueur1 = new Joueur(scene, false);
		//joueur2 = new Joueur(scene, true);

		collisions = new Collisions(jeu,balle, joueur1/*, joueur2*/);

		createjs.Ticker.addEventListener("tick", rafraichirAnimation);
	}

	var ChangerVitesse = function(evenement)
	{
			vitesseBalle = document.getElementById('vitesse').innerHTML;
	}

	var RetirerExplosion = function(evenement)
	{
			if(joueur1!=null)
		{
			joueur1.retirerExplosion();
		}
	}
	
	var rafraichirAnimation = function(evenement)
	  {
			arrierePlan.rafraichirAnimation(evenement, vitesseBalle);
			balle.rafraichirAnimation(evenement);

			collisions.testerCollisions(true, true, false);

			scene.update(evenement);
	  }
	
	this.lancer = function()
	{
		initialiserCanevas();

		canevas.addEventListener("mouseup", RetirerExplosion);
		canevas.addEventListener("mousedown", CliquerSouris);
		canevas.addEventListener('mousemove', BougerSouris);

		window.addEventListener("resize", RecalculCanevas);

		window.addEventListener(window.Evenement.arrierePlanFinChargement.type,Dessiner);
		window.addEventListener(window.Evenement.changementVitesse.type, ChangerVitesse)

		scene = new createjs.Stage(canevas);
		
		arrierePlan = new ArrierePlan(scene);

		createjs.Ticker.setInterval(1000/60);
		createjs.Ticker.setFPS(60);
	}
}



Jeu.Evenement =
{
  arrierePlanFinChargement : document.createEvent('Event'),
	changementVitesse : document.createEvent('Event'),
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
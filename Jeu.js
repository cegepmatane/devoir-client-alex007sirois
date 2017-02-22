function Jeu()
{
	var jeu = this;
 	var arrierePlan = null;
	var balle = null;
	var terrain = null;
	var joueur1 = null;
	var joueur2 = null;
	var collisions = null;
	var ratioScene = {largeur :1, hauteur : 1};
	var dimentionScene = {largeur :1, hauteur : 1};
	
	var canevas2D;
	
	var debug = document.getElementById("debug");
	
	var canevas = document.getElementById('canevas');
	canevas2D = canevas.getContext('2d');
	
	
	var initialiserCanevas = function()
  {
    //On redimensionne le canvas en respectant l'aspect ratio
    //On vise à remplir l'écran en largeur sans déborder en hauteur
    //On centre le résultat au milieu de l'écran pour renforcir l'aspect focal du jeu.
    ratioLargeur = window.innerWidth / canevas.width;
    ratioHauteur = window.innerHeight / canevas.height;
    if(ratioHauteur * canevas.height <= window.innerHeight)
    {
      canevas.style.width = "100%";
      canevas.style.left = (canevas.width * ratioLargeur)/2+"px";
      computedStyle = window.getComputedStyle(canevas);
      canevasNouvelleHeight = parseInt(computedStyle.getPropertyValue('height').replace("px",""));
      canevas.style.marginTop = (window.innerHeight - canevasNouvelleHeight) / 2 + "px";
    }
    else
    {
      canevas.style.width = (canevas.width * ratioLargeur) + "px" ;
      canevas.style.marginLeft = "-"+ (canevas.width * ratioLargeur)/2+"px";
    }
    var body = document.getElementsByTagName("body")[0];
    body.style.maxHeight = window.innerHeight + "px";
    body.style.overflow = "hidden";
    
    computedStyle = window.getComputedStyle(canevas);
    canevasNouvelleHeight = parseInt(computedStyle.getPropertyValue('height').replace("px",""));
    canevasNouvelleWidth = parseInt(computedStyle.getPropertyValue('width').replace("px",""));
    ratioScene.largeur = canevasNouvelleWidth / canevas.width;
    ratioScene.hauteur = canevasNouvelleHeight / canevas.height;
    
    dimentionScene.largeur = canevas.width;
    dimentionScene.hauteur = canevas.height ;
    
  }

	var CliquerSouris = function(evenement)
	{
		//debug.innerHTML = "click<br>" + debug.innerHTML;
		alert((evenement.clientX/canevas.width)/ratioLargeur);
	}
	
	var BougerSouris = function(evenement)
	{
		//var mousePos = 'X: ' + evenement.clientX + ' Y: ' + evenement.clientY;
		//debug.innerHTML = mousePos + '<br>' + debug.innerHTML;
			joueur.rafraichirAnimation(evenement);
			
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
		canevas.addEventListener("click", CliquerSouris);
		canevas.addEventListener('mousemove', BougerSouris);

		window.addEventListener(window.Evenement.arrierePlanFinChargement.type,Dessiner);
		
		initialiserCanevas();

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
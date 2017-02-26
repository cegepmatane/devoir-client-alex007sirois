(function(){

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

	  //Vue
	var accueilVue = null;
	var jeuVue = null;
	var finVue = null;
	var vueActive = null;

	var nomJoueur = "";
	
	var initialiserCanevas = function()
  	{
		var debug = document.getElementById("debug");
		var canevasDiv = document.getElementById('canevasDiv');

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

		var DessinerBalle = function(evenement)
		{
				window.removeEventListener(window.Evenement.arrierePlanFinChargement.type,Dessiner);
				window.addEventListener(window.Evenement.balleFinChargement.type,Dessiner);
				window.addEventListener(window.Evenement.changementVitesse.type, ChangerVitesse);
				
				balle = new Balle(scene);
		}

	var Dessiner = function(evenement)
	{
		window.removeEventListener(window.Evenement.balleFinChargement.type,Dessiner);

		joueur1 = new Joueur(scene, false);
		//joueur2 = new Joueur(scene, true);

		collisions = new Collisions(jeu,balle, joueur1/*, joueur2*/);

		createjs.Ticker.addEventListener("tick", rafraichirAnimation);
	}

	var ChangerVitesse = function(evenement)
	{
			vitesseBalle = document.getElementById('vitesse').innerHTML;
			arrierePlan.changementVitesse(vitesseBalle);
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
			arrierePlan.rafraichirAnimation(evenement);
			balle.rafraichirAnimation(evenement);

			collisions.testerCollisions(true, true, false);

			scene.update(evenement);
	  }
	
	var lancer = function()
	{
		initialiserCanevas();

		canevas.addEventListener("mouseup", RetirerExplosion);
		canevas.addEventListener("mousedown", CliquerSouris);
		canevas.addEventListener('mousemove', BougerSouris);

		window.addEventListener("resize", RecalculCanevas);

		window.addEventListener(window.Evenement.arrierePlanFinChargement.type,DessinerBalle);

		scene = new createjs.Stage(canevas);
		
		arrierePlan = new ArrierePlan(scene);

		createjs.Ticker.setInterval(1000/60);
		createjs.Ticker.setFPS(60);
	}

  //Le contexte EST GÉRÉ par cette fonction
  var interpreterEvenementsApplicatifs = function(evenement)
  {
    switch(evenement.type)
    {
      //Gestion de la navigation entre les écrans
      case window.Evenement.navigationAccueilEnAction.type:
        if (vueActive instanceof JeuVue)
        {
          quitterScene();
        }
        accueilVue.afficher();
        vueActive = accueilVue;
      break;
      case window.Evenement.navigationJeuEnAction.type:
        jeuVue.afficher();
        vueActive = jeuVue;
        lancer();
      break;
      case window.Evenement.navigationFinPerdantEnAction.type:
        if (vueActive instanceof JeuVue)
        {
          quitterScene();
        }
        finVue.afficher("perdu", nomJoueur);
        vueActive = finVue;
      break;
      case window.Evenement.navigationFinGagantEnAction.type:
        if (vueActive instanceof JeuVue)
        {
          quitterScene();
        }
        finVue.afficher("gagne", nomJoueur);
        vueActive = finVue;
      break;
        
      //Gestion du nom du joueur dans la vue Accueil
      case window.Evenement.accueilVueEnregistrerNomJoueurEnAction.type:
        nomJoueur = accueilVue.getNomJoueur();
      break;
  	}
  }

	var interpreterEvenementsLocation = function(evenement)
	{
		//hash est la partie suivant le # dans l'url
		var ancre = window.location.hash;
		//Si l'ancre est vide ou qu'il ne débute pas par #
		if(!ancre || ancre.match(/^#$/)) 
		{
		window.dispatchEvent(window.Evenement.navigationAccueilEnAction);  
		//Fait le ménage dans l'URL pour ne pas voir #
		history.pushState("", document.title, window.location.pathname + window.location.search);
		}
		//Si l'ancre commence par #accueil
		else if(ancre.match(/^#accueil/))
		{
		window.dispatchEvent(window.Evenement.navigationAccueilEnAction);  
		//Fait le ménage dans l'URL pour ne pas voir #accueil
		history.pushState("", document.title, window.location.pathname + window.location.search);
		}//Si l'ancre commence par #jeu 
		else if(ancre.match(/^#jeu/))
		{
		window.dispatchEvent(window.Evenement.navigationJeuEnAction);  
		//Fait le ménage dans l'URL pour ne pas voir #jeu
		history.pushState("", document.title, window.location.pathname + window.location.search);
		}//Si l'ancre commence par #fin- et qu'il est suivi de perdu ou gagne
		else if(succes = ancre.match(/^#fin-(perdu|gagne)/))
		{
		//La seconde évaluation de l'expression régulière (perdu|gagne) est à la position 1 du tableau de résultat succes
		switch(succes[1])
		{
			case "perdu":
			window.dispatchEvent(window.Evenement.navigationFinPerdantEnAction);  
			break;        
			case "gagne":
			window.dispatchEvent(window.Evenement.navigationFinGagantEnAction);  
			break;        
		}
		//Fait le ménage dans l'URL pour ne pas voir #fin-perdu ou #fin-gagne
		history.pushState("", document.title, window.location.pathname + window.location.search);
		}

	}

  var initialiser = function()
  {
    //Création des vues à partir des templates dans le HTML
    accueilVue = new AccueilVue();
    jeuVue = new JeuVue();
    finVue = new FinVue();

    //Enregistrer l'écoute des événements

    window.addEventListener("hashchange", interpreterEvenementsLocation);
    window.addEventListener(window.Evenement.navigationAccueilEnAction.type, interpreterEvenementsApplicatifs, false);
    window.addEventListener(window.Evenement.navigationJeuEnAction.type, interpreterEvenementsApplicatifs, false);
    window.addEventListener(window.Evenement.navigationFinGagantEnAction.type, interpreterEvenementsApplicatifs, false);
    window.addEventListener(window.Evenement.navigationFinPerdantEnAction.type, interpreterEvenementsApplicatifs, false);

    window.addEventListener(window.Evenement.accueilVueEnregistrerNomJoueurEnAction.type, interpreterEvenementsApplicatifs, false);
    
    //Première interaction possible avec le joueur
    accueilVue.afficher();
    vueActive = accueilVue;
  }

	  var quitterScene = function()
  {
    //Il faut faire du ménage pour ne pas surcharger le navigateur.
    
    //Désenregistrer l'écoute des événements
    createjs.Ticker.removeEventListener("tick", rafraichirAnimation);
		canevas.addEventListener("mouseup", RetirerExplosion);
		canevas.addEventListener("mousedown", CliquerSouris);
		canevas.addEventListener('mousemove', BougerSouris);
		window.addEventListener("resize", RecalculCanevas);
  }

	initialiser();
}

Jeu.Evenement =
{
		arrierePlanFinChargement : document.createEvent('Event'),
		balleFinChargement : document.createEvent('Event'),
		changementVitesse : document.createEvent('Event'),
		navigationAccueilEnAction : document.createEvent('Event'),
  	navigationJeuEnAction : document.createEvent('Event'),
  	navigationFinGagantEnAction : document.createEvent('Event'),
  	navigationFinPerdantEnAction : document.createEvent('Event'),
  	accueilVueEnregistrerNomJoueurEnAction : document.createEvent('Event')
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
})();
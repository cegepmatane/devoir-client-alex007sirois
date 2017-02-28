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
	var vitesseHTML;

	var ratioX;
	var ratioY;
	var canevas;
	var informationCanevas;

	var coordoneeJoueur1;

	  //Vue
	var accueilVue = null;
	var jeuVue = null;
	var finVue = null;
	var vueActive = null;

	var nomJoueur = "";
	
	var initialiserCanevas = function()
  {
		var canevasDiv = document.getElementById('canevasDiv');

		canevasDiv.innerHTML = "<canvas id='canevas' oncontextmenu='return false'  width='" + Jeu.Configuration.largeur + "px' height='" + Jeu.Configuration.hauteur + "px'></canvas>";
		canevas = document.getElementById('canevas');

			//RecalculCanevas(null);
		canevas.style.width = "94%";

		canevas.style.marginLeft = "5%";
		canevas.style.marginTop="1%";

		informationCanevas=canevas.getBoundingClientRect();

		ratioX = canevas.width / informationCanevas.width;
		ratioY = canevas.height / informationCanevas.height;
	}
	
	var rafraichirAnimation = function(evenement)
	{
		arrierePlan.rafraichirAnimation(evenement);
		balle.rafraichirAnimation(evenement);

		coordoneeJoueur1=joueur1.getCoordonnees();

		collisions.testerCollisions(balle.getCoordonnees(), coordoneeJoueur1);

		scene.update(evenement);
	}
	
	var lancer = function()
	{
		initialiserCanevas();

		canevas.addEventListener("mouseup", interpreterEvenementsApplicatifs);
		canevas.addEventListener("mousedown", interpreterEvenementsApplicatifs);
		canevas.addEventListener("mousemove", interpreterEvenementsApplicatifs);
		window.addEventListener("resize", interpreterEvenementsApplicatifs);

		window.addEventListener(window.Evenement.arrierePlanFinChargement.type, interpreterEvenementsApplicatifs);

		scene = new createjs.Stage(canevas);
		arrierePlan = new ArrierePlan(scene);

		createjs.Ticker.setInterval(1000/Jeu.Configuration.FPS);
	}

  //Le contexte EST GÉRÉ par cette fonction
	var interpreterEvenementsApplicatifs = function(evenement)
  {
    switch(evenement.type)
		{
			case "mouseup":
				if (joueur1 != null)
					joueur1.retirerExplosion();
				break;	

			case "mousedown":
				if (joueur1 != null)
					joueur1.exploser();
				break;	

			case "mousemove":
				if (joueur1 != null)
					joueur1.bouger(evenement, ratioX, ratioY, informationCanevas);
				break;	

			case "resize":
				informationCanevas = canevas.getBoundingClientRect();

				ratioX = canevas.width / informationCanevas.width;
				ratioY = canevas.height / informationCanevas.height;
				break;

			case window.Evenement.arrierePlanFinChargement.type:
        window.removeEventListener(window.Evenement.arrierePlanFinChargement.type,interpreterEvenementsApplicatifs);
				window.addEventListener(window.Evenement.balleFinChargement.type,interpreterEvenementsApplicatifs);
				window.addEventListener(window.Evenement.changementVitesse.type, interpreterEvenementsApplicatifs);
				vitesseHTML=document.getElementById('vitesse');
				balle = new Balle(scene);
      break;

			case window.Evenement.changementVitesse.type:
				vitesseBalle=balle.getVitesse();
				vitesseHTML.innerHTML=vitesseBalle;
				arrierePlan.changementVitesse(vitesseBalle);
			break;

			case window.Evenement.mortJoueur1.type:
				window.dispatchEvent(window.Evenement.navigationFinEnAction);
			break;

			case window.Evenement.explosionAvecJoueur1.type:
				balle.exploser(coordoneeJoueur1.x,coordoneeJoueur1.y)
			break;

			case window.Evenement.balleFinChargement.type:
				window.removeEventListener(window.Evenement.balleFinChargement.type,interpreterEvenementsApplicatifs);
				joueur1 = new Joueur(scene);
				//joueur2 = new Joueur(scene, true);
				coordoneeJoueur1=joueur1.getCoordonnees();
				window.addEventListener(window.Evenement.mortJoueur1.type, interpreterEvenementsApplicatifs);
				//	window.addEventListener(mortJoueur2, recalculCanevas);
				window.addEventListener(window.Evenement.explosionAvecJoueur1.type, interpreterEvenementsApplicatifs);
				//window.addEventListener(explosionAvecJoueur1, recalculCanevas);
				collisions = new Collisions(jeu,balle, joueur1/*, joueur2*/);
				createjs.Ticker.addEventListener("tick", rafraichirAnimation);
			break;
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
      case window.Evenement.navigationFinEnAction.type:
        if (vueActive instanceof JeuVue)
        {
          quitterScene();
        }
        finVue.afficher(nomJoueur, vitesseBalle);
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
			default:
			window.dispatchEvent(window.Evenement.navigationFinEnAction);  
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
    window.addEventListener(window.Evenement.navigationFinEnAction.type, interpreterEvenementsApplicatifs, false);

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
		canevas.removeEventListener("mouseup", interpreterEvenementsApplicatifs);
		canevas.removeEventListener("mousedown", interpreterEvenementsApplicatifs);
		canevas.removeEventListener('mousemove', interpreterEvenementsApplicatifs);
		window.removeEventListener("resize", interpreterEvenementsApplicatifs);
		
		window.removeEventListener(window.Evenement.changementVitesse.type, interpreterEvenementsApplicatifs);
  }

	initialiser();
}

Jeu.Evenement =
{
	boutonSourisEnAction: document.createEvent('Event'),
	boutonSourisRelache: document.createEvent('Event'),
	bougeSouris: document.createEvent('Event'),
	redimensionnementEcran: document.createEvent('Event'),
	
	arrierePlanFinChargement : document.createEvent('Event'),
	balleFinChargement : document.createEvent('Event'),

	changementVitesse: document.createEvent('Event'),

	mortJoueur1 : document.createEvent('Event'),
	mortJoueur1 : document.createEvent('Event'),
	explosionAvecJoueur1 : document.createEvent('Event'),
	explosionAvecJoueur2 : document.createEvent('Event'),

	navigationAccueilEnAction: document.createEvent('Event'),
  navigationJeuEnAction : document.createEvent('Event'),
  navigationFinEnAction : document.createEvent('Event'),
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

Jeu.Configuration =
{
	largeur:2000,
	hauteur:1000,
	FPS:60
}

new Jeu();
})();
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

	var recalculCanevas = function(evenement)
	{
			informationCanevas=canevas.getBoundingClientRect();

			ratioX = canevas.width / informationCanevas.width;
			ratioY = canevas.height / informationCanevas.height;
	}

	var cliquerSouris = function(evenement)
	{
		//debug.innerHTML = "click<br>" + debug.innerHTML;
		if(joueur1!=null)
		{
			joueur1.exploser();
		}
	}
	
	var bougerSouris = function(evenement)
	{
		/*var mousePos = 'X: ' + (evenement.clientX - canevas.offsetLeft) + ' Y: ' + (evenement.clientY- canevas.offsetTop);
		debug.innerHTML = mousePos + '<br>' /*+ debug.innerHTML*/;
		if(joueur1!=null)
		{
			joueur1.bouger(evenement,ratioX,ratioY,informationCanevas);
		}
	}

	var retirerExplosion = function(evenement)
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

		collisions.testerCollisions(balle.getCoordonnees(), joueur1.getCoordonnees());

		scene.update(evenement);
	}
	
	var lancer = function()
	{
		initialiserCanevas();

		canevas.addEventListener("mouseup", retirerExplosion);
		canevas.addEventListener("mousedown", cliquerSouris);
		canevas.addEventListener('mousemove', bougerSouris);
		window.addEventListener("resize", recalculCanevas);

		window.addEventListener(window.Evenement.arrierePlanFinChargement.type,interpreterEvenementsApplicatifs);

		scene = new createjs.Stage(canevas);
		arrierePlan = new ArrierePlan(scene);

		createjs.Ticker.setInterval(1000/Jeu.Configuration.FPS);
	}

  //Le contexte EST GÉRÉ par cette fonction
  var interpreterEvenementsApplicatifs = function(evenement)
  {
    switch(evenement.type)
    {
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
				balle.reinitialiser();
			break;

			case window.Evenement.explosionAvecJoueur1.type:
				console.log(coordoneeJoueur1.x + " " +coordoneeJoueur1.y);
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
		canevas.removeEventListener("mouseup", retirerExplosion);
		canevas.removeEventListener("mousedown", cliquerSouris);
		canevas.removeEventListener('mousemove', bougerSouris);
		window.removeEventListener("resize", recalculCanevas);
		
		window.removeEventListener(changementVitesse.type, changerVitesse);
  }

	initialiser();
}

Jeu.Evenement =
{
		arrierePlanFinChargement : document.createEvent('Event'),
		balleFinChargement : document.createEvent('Event'),

		changementVitesse : document.createEvent('Event'),

		mortJoueur1 : document.createEvent('Event'),
		mortJoueur1 : document.createEvent('Event'),
		explosionAvecJoueur1 : document.createEvent('Event'),
		explosionAvecJoueur2 : document.createEvent('Event'),

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

Jeu.Configuration =
{
	largeur:2000,
	hauteur:1000,
	FPS:60
}

new Jeu();
})();
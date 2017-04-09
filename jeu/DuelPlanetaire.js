(function(){

function Jeu()
{
	var jeu = this;

 	var arrierePlan = null;
	var balle = null;
	var terrain = null;
	var joueur1 = null;
	var joueur2 = null;

	var vitesseBalle;

	var ratioCanevasX;
	var ratioCanevasY;
	var canevas;
	var informationCanevas;

	var coordoneeJoueur1;

	  //Vue
	var accueilVue = null;
	var jeuVue = null;
	var finVue = null;
	var vueActive = null;

	var serveur=null;

	var nomJoueur = "";
	var nomAdversaire="";
	var etatVictoire="";

	var ignorerProchainImpactBalle=false;

	var numeroJoueur;
	var etat;

	var dernierRafraichissement= Date.now();
	var proportionDelais=1;
	
	var initialiserCanevas = function()
  {
		var canevasDiv = document.getElementById('canevasDiv');

		canevasDiv.innerHTML = "<canvas id='canevas' oncontextmenu='return false'  width='" + Jeu.Configuration.largeur + "px' height='" + Jeu.Configuration.hauteur + "px'></canvas>";
		canevas = document.getElementById('canevas');

			//RecalculCanevas(null);
		canevas.style.width = "92%"
		canevas.style.marginLeft = "5%";

		informationCanevas=canevas.getBoundingClientRect();

		ratioCanevasX = canevas.width / informationCanevas.width;
		ratioCanevasY = canevas.height / informationCanevas.height;
	}
	
	var rafraichirAnimation = function(evenement)
	{
		arrierePlan.rafraichirAnimation(evenement);

		date = Date.now();

		if(vitesseBalle!=0)
			proportionDelais=(date-dernierRafraichissement)/Jeu.Configuration.delais;

		balle.rafraichirAnimation(proportionDelais);

		dernierRafraichissement=date;

		coordoneeJoueur1=joueur1.getCoordonnees();

		testerCollisions(balle.getCoordonnees(), coordoneeJoueur1);

		scene.update(evenement);
	}
	
	var lancer = function()
	{
		initialiserCanevas();

		window.addEventListener("resize", interpreterEvenementsApplicatifs);

		window.addEventListener(window.Evenement.arrierePlanFinChargement.type, interpreterEvenementsApplicatifs);

		scene = new createjs.Stage(canevas);
		arrierePlan = new ArrierePlan(scene);

		createjs.Ticker.setFPS(Jeu.Configuration.FPS);
	}

  //Le contexte EST GÉRÉ par cette fonction
	var interpreterEvenementsApplicatifs = function(evenement)
  {
	switch(evenement.type)
		{
			case window.Evenement.joueur2EnAction.type:
				joueur2.recevoirCoordonneesServeur(serveur.getPositionAutreJoueur());

				if(numeroJoueur==1 && vitesseBalle==0)
					{
						ignorerProchainImpactBalle=true;
						balle.commencer();
					}
				break;

			case "mouseup":
				joueur1.retirerExplosion();
				break;	

			case "mousedown":
				joueur1.exploser();
				break;	

			case "mousemove":
				joueur1.bouger(((evenement.clientX - informationCanevas.left)*ratioCanevasX), ((evenement.clientY - informationCanevas.top)*ratioCanevasY));
				break;	

			case "resize":
				informationCanevas = canevas.getBoundingClientRect();

				ratioCanevasX = canevas.width / informationCanevas.width;
				ratioCanevasY = canevas.height / informationCanevas.height;
				break;

			case window.Evenement.arrierePlanFinChargement.type:
		window.removeEventListener(window.Evenement.arrierePlanFinChargement.type,interpreterEvenementsApplicatifs);

				window.addEventListener(window.Evenement.balleFinChargement.type,interpreterEvenementsApplicatifs);
				window.addEventListener(window.Evenement.changementVitesse.type, interpreterEvenementsApplicatifs);
				
				balle = new Balle(scene);
	  break;

			case window.Evenement.changementVitesse.type:
				vitesseBalle=balle.getVitesse();
				jeuVue.modifierVitesse(vitesseBalle);
				arrierePlan.changerVitesse(vitesseBalle);
			break;

			case window.Evenement.mortJoueur.type:
					/*if(numeroJoueur==1)
						changerVariablesServeur("etat", "mort joueur 1");
					else if(numeroJoueur==2)
						changerVariablesServeur("etat", "mort joueur 2");*/
					balle.envoyerInformationsAuServeur();
			break;
			case window.Evenement.mortJoueur2.type:
				if(numeroJoueur==1)
					etatVictoire="gagne";
				else
					etatVictoire="perdu";
				window.dispatchEvent(window.Evenement.navigationFinEnAction);
			break;
			case window.Evenement.mortJoueur1.type:
				if(numeroJoueur==2)
					etatVictoire="gagne";
				else
					etatVictoire="perdu";
				window.dispatchEvent(window.Evenement.navigationFinEnAction);
			break;

			case window.Evenement.explosionAvecJoueur.type:
				ignorerProchainImpactBalle=true;
				balle.exploser(coordoneeJoueur1.horizontal,coordoneeJoueur1.vertical);
			break;

			case window.Evenement.impactBalle.type:
				if(ignorerProchainImpactBalle);
					balle.recevoirCoordonneesServeur(serveur.getDeplacementBalle(), serveur.getPositionBalle());

				ignorerProchainImpactBalle=false;
			break;

			case window.Evenement.balleFinChargement.type:
				window.removeEventListener(window.Evenement.balleFinChargement.type,interpreterEvenementsApplicatifs);

				joueur1 = new Joueur(scene, numeroJoueur);
				joueur2 = new Joueur(scene, (3-numeroJoueur));

				coordoneeJoueur1=joueur1.getCoordonnees();

				canevas.addEventListener("mouseup", interpreterEvenementsApplicatifs);
				canevas.addEventListener("mousedown", interpreterEvenementsApplicatifs);
				canevas.addEventListener("mousemove", interpreterEvenementsApplicatifs);

				window.addEventListener(window.Evenement.joueur2EnAction.type, interpreterEvenementsApplicatifs);
				window.addEventListener(window.Evenement.mortJoueur.type, interpreterEvenementsApplicatifs);
				window.addEventListener(window.Evenement.mortJoueur1.type, interpreterEvenementsApplicatifs);
				window.addEventListener(window.Evenement.mortJoueur2.type, interpreterEvenementsApplicatifs);
				window.addEventListener(window.Evenement.explosionAvecJoueur.type, interpreterEvenementsApplicatifs);
				window.addEventListener(window.Evenement.impactBalle.type, interpreterEvenementsApplicatifs);

				createjs.Ticker.addEventListener("tick", rafraichirAnimation);

				if(numeroJoueur==2)
				{
					changerVariablesServeur("etat","partie en cours")
				}
			break;
			case window.Evenement.changementEtatPartie.type:
				etat=serveur.getEtat();

				if(etat=="mort joueur 2")
					window.dispatchEvent(window.Evenement.mortJoueur2);

				if(etat=="mort joueur 1")
					window.dispatchEvent(window.Evenement.mortJoueur1);

				if(etat=="partie en cours")
				{
					nomAdversaire=serveur.getNomAdversaire();
					document.getElementById("nomAdversaire").innerHTML = "Adversaire: " + nomAdversaire;
					tracer("Adversaire: " + serveur.getNomAdversaire());
				}
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
				window.addEventListener(window.Evenement.serveurPret.type, interpreterEvenementsApplicatifs);
				serveur.initialiserServeur(nomJoueur);
		break;
		case window.Evenement.serveurPret.type:
			window.removeEventListener(window.Evenement.serveurPret.type, interpreterEvenementsApplicatifs);
			window.addEventListener(window.Evenement.changementEtatPartie.type, interpreterEvenementsApplicatifs);
			nomJoueur = serveur.getNomJoueur();
			numeroJoueur=serveur.getNumeroJoueur();
			jeuVue.afficher();
			vueActive = jeuVue;
			document.getElementById("nomJoueur").innerHTML = "Nom du Joueur: "+ nomJoueur;
			lancer();
	  	break;
		case window.Evenement.navigationFinEnAction.type:
			if (vueActive instanceof JeuVue)
			{
				quitterScene();
			}
			finVue.afficher(nomJoueur,nomAdversaire,etatVictoire, vitesseBalle);
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
	serveur= new ConnecterServeur();
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
		serveur.quitterSeveur();
	//Désenregistrer l'écoute des événements
		window.removeEventListener(window.Evenement.joueur2EnAction.type, interpreterEvenementsApplicatifs);
		window.removeEventListener(window.Evenement.mortJoueur1.type, interpreterEvenementsApplicatifs);
		window.removeEventListener(window.Evenement.mortJoueur2.type, interpreterEvenementsApplicatifs);
		window.removeEventListener(window.Evenement.explosionAvecJoueur.type, interpreterEvenementsApplicatifs);
		window.removeEventListener(window.Evenement.changementEtatPartie.type, interpreterEvenementsApplicatifs);

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
	joueur2EnAction:document.createEvent('Event'),
	serveurPret:document.createEvent('Event'),
	changementEtatPartie:document.createEvent('Event'),
	impactBalle:document.createEvent('Event'),

	/*boutonSourisEnAction: document.createEvent('Event'),
	boutonSourisRelache: document.createEvent('Event'),
	bougeSouris: document.createEvent('Event'),*/
	redimensionnementEcran: document.createEvent('Event'),
	
	arrierePlanFinChargement : document.createEvent('Event'),
	balleFinChargement : document.createEvent('Event'),

	changementVitesse: document.createEvent('Event'),

	mortJoueur : document.createEvent('Event'),
	mortJoueur1 : document.createEvent('Event'),
	mortJoueur2 : document.createEvent('Event'),
	explosionAvecJoueur : document.createEvent('Event'),

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
	FPS:60,
	delais:(1000/60)

}

new Jeu();
})();
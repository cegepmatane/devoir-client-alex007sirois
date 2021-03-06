var CommuniquerServeurSmartfox = function()
{
	var moi = this;
	var serveur;
	
	var configuration = {};
	configuration.host = "127.0.0.1";
	configuration.port = 8888;
	configuration.debug = false;
	configuration.zone = "Univers";
	configuration.room = "Galaxie";

	var deplacementBalle = {};
	var positionJoueur1 = {};
	var positionJoueur2 = {};
	var positionBalle = {};
	var etat;

	var salle;
	var numeroJoueur;
	var utilisateur;

	this.initialiserServeur = function(nom)
	{
		var initialiser = function()
		{
			tracer('onload -> initialiser()');
			serveur = new SmartFox(configuration);
			tracer('onload -> initialiser() -> new SmartFox(configuration)');
				
			serveur.addEventListener(SFS2X.SFSEvent.CONNECTION, executerApresOuvertureContactServeur, this);
			serveur.addEventListener(SFS2X.SFSEvent.USER_EXIT_ROOM, executerApresFermetureSession, this);
			serveur.addEventListener(SFS2X.SFSEvent.LOGIN, executerApresOuvertureSession, this);
			serveur.addEventListener(SFS2X.SFSEvent.ROOM_JOIN, executerApresEntreeSalon, this);
			serveur.addEventListener(SFS2X.SFSEvent.ROOM_VARIABLES_UPDATE, executerApresVariableDeSalon, this);
			serveur.addEventListener(SFS2X.SFSEvent.LOGIN_ERROR, executerApresErreureLogin, this);
			

			ouvrirContactServeur();
		}

		// http://docs2x.smartfoxserver.com/api-docs/jsdoc/symbols/SFS2X.SFSEvent.html
		

		// http://docs2x.smartfoxserver.com/api-docs/jsdoc/symbols/SFS2X.Requests.System.LoginRequest.html

		var ouvrirContactServeur = function()
		{
			tracer('ouvrirContactServeur', false);
			serveur.connect();
		}
		
		var executerApresFermetureSession = function(evenement)
		{
			if(salle.containsUser(utilisateur))
			{
				changerVariablesServeur('etat',"mort joueur " + (3-numeroJoueur));
				tracer("Le joueur " + (3-numeroJoueur) + "a abandonné");
			}
		}

		var executerApresOuvertureContactServeur = function(evenement)
		{
			tracer('executerApresOuvertureContactServeur', false);
			ouvrirSession();
		}

		var ouvrirSession = function()
		{
			tracer("ouvrirSession", false);
			serveur.send(new SFS2X.Requests.System.LoginRequest(nom));
		}

		var executerApresErreureLogin = function(evenement)
		{
			tracer("probleme login" + evenement.errorMessage, false);

			nom+=""+1;
			ouvrirSession();
		}

		var executerApresOuvertureSession = function(evenement)
		{
			utilisateur=evenement.user;

			tracer('executerApresOuvertureSession', false);
			tracer("L'usager: " + utilisateur.name + " est dans la zone " + evenement.zone);
			entrerSalon();
		}
		
		this.changerVariablesServeur = function(noms, valeurs)
		{
			if(serveur!=null)
			{
				var listeVariables = [];
				if(noms.constructor === Array && valeurs.constructor === Array && noms.length==valeurs.length)
				{
					for(var i=0 ; i<noms.length ; i++)
						if(typeof noms[i] == 'string')
							listeVariables.push(new SFS2X.Entities.Variables.SFSRoomVariable(noms[i], valeurs[i]));
				}
				else if(typeof noms == 'string')
					listeVariables.push(new SFS2X.Entities.Variables.SFSRoomVariable(noms, valeurs));

				if(listeVariables.length>0)
				{
					var succes = serveur.send(new SFS2X.Requests.System.SetRoomVariablesRequest(listeVariables));
						

					//tracer(listeVariables.length + ' valeurs changées : ' + succes);
				}
				else
					tracer("aucune valeur changée: il y a erreur");
			}
			else
				tracer("serveur non-initialisé");
		}

		var entrerSalon = function()
		{
			tracer('entrerSalon()');
			estEnvoye = serveur.send(new SFS2X.Requests.System.JoinRoomRequest(configuration.room));
			tracer('demande d\'entrer dans le salon effectuee');
		}

		var executerApresEntreeSalon = function(evenement)
		{
			salle=evenement.room;
			numeroJoueur=salle.getUserCount();

			tracer('executerApresEntreeSalon()');
			tracer('Entree dans le salon ' + salle + ' reussie, '+ numeroJoueur + " joueurs");


			if(salle.getUserCount()<2)
				initialiserVariables();
			else
			{
				window.dispatchEvent(window.Evenement.serveurPret);
			}
		}

		var initialiserVariables = function()
		{
			tracer('initialiserVariables()');
			
			var listeNomsVariables = [];
			var listeValeursVariables = [];

			deplacementBalle = {};

			deplacementBalle.horizontal=0;
			deplacementBalle.vertical=0;

			listeNomsVariables.push('deplacementBalle');
			listeValeursVariables.push(deplacementBalle);

			positionBalle = {};

			positionBalle.horizontal = 0;
			positionBalle.vertical = 0;

			listeNomsVariables.push('positionBalle');
			listeValeursVariables.push(positionBalle);

			positionJoueur1 = {};

			positionJoueur1.horizontal = 0;
			positionJoueur1.vertical = 0;
			positionJoueur1.explose = false;

			listeNomsVariables.push('positionJoueur1');
			listeValeursVariables.push(positionJoueur1);

			positionJoueur2 = {};

			positionJoueur2.horizontal = 0;
			positionJoueur2.vertical = 0;
			positionJoueur2.explose = false;

			
			listeNomsVariables.push('positionJoueur2');
			listeValeursVariables.push(positionJoueur2);

			etat="initialisation terminee";

			listeNomsVariables.push('etat');
			listeValeursVariables.push(etat);
			
			moi.changerVariablesServeur(listeNomsVariables, listeValeursVariables);
			window.dispatchEvent(window.Evenement.serveurPret);
		}


		var executerApresVariableDeSalon = function(evenement)
		{

			for(var i=0 ; i<evenement.changedVars.length ; i++)
			{
				if(evenement.changedVars[i]=="deplacementBalle")
				{
					deplacementBalle=evenement.room.getVariable(evenement.changedVars[i]).value;

					window.dispatchEvent(window.Evenement.impactBalle);

					tracer("deplacement de la balle x=" + deplacementBalle.horizontal + " y=" + deplacementBalle.vertical);					
				}

				else if(evenement.changedVars[i]=="positionBalle")
				{
					positionBalle=evenement.room.getVariable(evenement.changedVars[i]).value;

					tracer("position de la balle = (" + positionBalle.horizontal +	" , " + positionBalle.vertical + ")");
				}

				else if(evenement.changedVars[i]=="positionJoueur1")
				{
					positionJoueur1=evenement.room.getVariable(evenement.changedVars[i]).value;

					if(numeroJoueur==2)
						window.dispatchEvent(window.Evenement.joueur2EnAction);

					//tracer("position du joueur1 = (" + positionJoueur1.horizontal + " , " + positionJoueur1.vertical + ") explose: " + positionJoueur1.explose);
				}

				else if(evenement.changedVars[i]=="positionJoueur2")
				{
					positionJoueur2=evenement.room.getVariable(evenement.changedVars[i]).value;

					if(numeroJoueur==1)
						window.dispatchEvent(window.Evenement.joueur2EnAction);

					//tracer("position du joueur2 = (" + positionJoueur2.horizontal +" , " + positionJoueur2.vertical + ") explose: " + positionJoueur2.explose);
				}

				else if(evenement.changedVars[i]=="etat")
				{
					etat=evenement.room.getVariable(evenement.changedVars[i]).value;

					window.dispatchEvent(window.Evenement.changementEtatPartie);

					tracer("État de la partie: " + evenement.room.getVariable(evenement.changedVars[i]).value);
				}

				else
				{
					tracer(evenement.changedVars[i] + ": " + evenement.room.getVariable(evenement.changedVars[i]).value);
				}
			}
		}

		initialiser();
	}

	this.quitterSeveur = function()
	{
		serveur.send(new SFS2X.Requests.System.LogoutRequest());
	}

	this.getNomJoueur = function()
	{
		return utilisateur.name;
	}

	this.getNomAdversaire = function()
	{
		var listeJoueur=salle.getPlayerList();

		var nom="";

		listeJoueur.forEach(function(joueur) 
		{
			if(!joueur.isItMe)
			{
				nom= joueur.name;
				return nom;
			}
		});

		return nom;
	}

	this.getPositionAutreJoueur = function()
	{
		if(numeroJoueur==2)
			return positionJoueur1;
		else if(numeroJoueur==1)
			return positionJoueur2;
	}

	this.getEtat = function()
	{
		return etat;
	}

	this.getDeplacementBalle = function()
	{
		return deplacementBalle;
	}

	this.getNumeroJoueur = function()
	{
		return numeroJoueur;
	}

	this.getPositionBalle = function()
	{
		return positionBalle;
	}
	
	
}
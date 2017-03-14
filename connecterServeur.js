var serveur;
var configuration = {};
configuration.host = "127.0.0.1";
configuration.port = 8888;
configuration.debug = false;
configuration.zone = "Univers";
configuration.room = "Galaxie";

function initialiserServeur()
{
	$(document).ready(function()
	{
		tracer('jquery.ready()');    
	});

	var initialiser = function()
	{
		tracer('onload -> initialiser()');
		serveur = new SmartFox(configuration);
		tracer('onload -> initialiser() -> new SmartFox(configuration)');
			
		serveur.addEventListener(SFS2X.SFSEvent.CONNECTION, executerApresOuvertureContactServeur, this);
		serveur.addEventListener(SFS2X.SFSEvent.LOGIN, executerApresOuvertureSession, this);
		serveur.addEventListener(SFS2X.SFSEvent.ROOM_JOIN, executerApresEntreeSalon, this);
		serveur.addEventListener(SFS2X.SFSEvent.ROOM_VARIABLES_UPDATE, executerApresVariableDeSalon, this);

		ouvrirContactServeur();
	}
	// http://docs2x.smartfoxserver.com/api-docs/jsdoc/symbols/SFS2X.SFSEvent.html
	

	// http://docs2x.smartfoxserver.com/api-docs/jsdoc/symbols/SFS2X.Requests.System.LoginRequest.html

	var ouvrirContactServeur = function()
	{
		tracer('ouvrirContactServeur', false);
		serveur.connect();
	}

	var executerApresOuvertureContactServeur = function(evenement)
	{
		tracer('executerApresOuvertureContactServeur', false);
		ouvrirSession();
	}

	var ouvrirSession = function()
	{
		tracer("ouvrirSession", false);
		serveur.send(new SFS2X.Requests.System.LoginRequest("Alex"));
	}

	var executerApresOuvertureSession = function(evenement)
	{
		tracer('executerApresOuvertureSession', false);
		tracer("L'usager: " + evenement.user.name + " est dans la zone " + evenement.zone);
		entrerSalon();
	}

	var entrerSalon = function()
	{
		tracer('entrerSalon()');
		estEnvoye = serveur.send(new SFS2X.Requests.System.JoinRoomRequest(configuration.room));
		tracer('demande d\'entrer dans le salon effectuee');
	}

	var executerApresEntreeSalon = function(evenement)
	{
		tracer('executerApresEntreeSalon()', false);
		tracer('Entree dans le salon ' + evenement.room + ' reussie');
		initialiserVariables();
	}

	var initialiserVariables = function()
	{
		tracer('initialiserVariables()');
		
		var listeNomsVariables = [];
		var listeValeursVariables = [];

		var infosBalle = {};

		infosBalle.vitesse=0;
		infosBalle.angle=0;

		listeNomsVariables.push('infosBalle');
		listeValeursVariables.push(infosBalle);

		var positionBalle = {};

		positionBalle.horizontal = 0;
		positionBalle.vertical = 0;

		listeNomsVariables.push('positionBalle');
		listeValeursVariables.push(positionBalle);

		var positionJoueur1 = {};

		positionJoueur1.horizontal = 0;
		positionJoueur1.vertical = 0;
		positionJoueur1.explose = false;

		listeNomsVariables.push('positionJoueur1');
		listeValeursVariables.push(positionJoueur1);

		var positionJoueur2 = {};

		positionJoueur2.horizontal = 0;
		positionJoueur2.vertical = 0;
		positionJoueur2.explose = false;

		
		listeNomsVariables.push('positionJoueur2');
		listeValeursVariables.push(positionJoueur2);

		listeNomsVariables.push('etat');
		listeValeursVariables.push("initialisation terminee");
		
		changerVariablesServeur(listeNomsVariables, listeValeursVariables);
	}

	//y me manque de la shit ici

	var executerApresVariableDeSalon = function(evenement)
	{
		tracer('executerApresVariableDeSalon()', false);

		for(var i=0 ; i<evenement.changedVars.length ; i++)
		{
			if(evenement.changedVars[i]=="infosBalle")
				tracer(
					"vitesse de la balle = " + evenement.room.getVariable(evenement.changedVars[i]).value.vitesse +
					" angle de la balle = " + evenement.room.getVariable(evenement.changedVars[i]).value.angle
				);

			else if(evenement.changedVars[i]=="positionBalle")
				tracer(
					"position de la balle = (" + evenement.room.getVariable(evenement.changedVars[i]).value.horizontal +
					" , " + evenement.room.getVariable(evenement.changedVars[i]).value.vertical + ")"
				);

			else if(evenement.changedVars[i]=="positionJoueur1")
				tracer(
					"position du joueur1 = (" + evenement.room.getVariable(evenement.changedVars[i]).value.horizontal +
					" , " + evenement.room.getVariable(evenement.changedVars[i]).value.vertical + ") explose: " + evenement.room.getVariable(evenement.changedVars[i]).value.explose
				);

			else if(evenement.changedVars[i]=="positionJoueur2")
				tracer(
					"position du joueur2 = (" + evenement.room.getVariable(evenement.changedVars[i]).value.horizontal +
					" , " + evenement.room.getVariable(evenement.changedVars[i]).value.vertical + ") explose: " + evenement.room.getVariable(evenement.changedVars[i]).value.explose
				);

			else if(evenement.changedVars[i]=="etat")
				tracer(
					"État de la partie: " + evenement.room.getVariable(evenement.changedVars[i]).value 
				);

			else
				tracer(
					evenement.changedVars[i] + ": " + evenement.room.getVariable(evenement.changedVars[i]).value 
				);
		}
	}

	initialiser();
}

function changerVariablesServeur(noms, valeurs)
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
		

		tracer(listeVariables.length + ' valeur(s) changée(s)? : ' + succes);
	}
	else
		tracer("aucune valeur changée: il y a erreur");
}

function tracer(message, alerte)
{
    console.log(message);
    if(!(alerte!=true)) alert(message);
}
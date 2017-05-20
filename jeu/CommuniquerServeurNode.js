var CommuniquerServeurNode = function()
{
	var serveur;
	
	var deplacementBalle = {};
	var positionJoueur1 = {};
	var positionJoueur2 = {};
	var positionBalle = {};
	var etat;
	
	this.initialiserServeur = function(nom)
	{
		serveur = new WebSocket('ws://localhost:2628','variable');
		serveur.onclose = this.quitterSeveur();
		serveur.onmessage = recevoirVariableServeur(evenement);
		serveur.onerror = gererErreure(error);
	}
	
	var gererErreure = function (error) 
	{
		console.log('Error Logged: ' + error);
	}
	
	this.quitterSeveur = function()
	{
		alert("connection fermée");
		serveur=null;
	}
	
	this.changerVariableServeur = function(noms, valeurs)
	{
		if(serveur!=null)
		{
			let listeVariables = [];
			
			if(noms.constructor === Array && valeurs.constructor === Array && noms.length==valeurs.length)
			{
				for(var i=0 ; i<noms.length ; i++)
					if(typeof noms[i] == 'string')
					{
						let variable = {};
						variable.nom = noms[i];
						variable.valeur = valeurs[i];
						variable = JSON.stringify(variable);
						listeVariables.push(variable);
					}
			}
			else if(typeof noms == 'string')
			{
				let variable = {};
				variable.nom = noms;
				variable.valeur = valeurs;
				variable = JSON.stringify(variable);
				listeVariables.push(variable);
			}

			if(listeVariables.length>0)
			{
				for(variable in listeVariables)
				{
					serveur.send(vari);
				}
			}
			else
				tracer("aucune valeur changée: il y a erreur");
		}
		else
			tracer("serveur non-initialisé");
		
		console.log(variable);
	
		socket.send(variable);
	}
	
	var recevoirVariableServeur = function(evenement)
	{
		let variable = JSON.parse(evenement.data);
		
		if(variable.nom=="deplacementBalle")
		{
			deplacementBalle=variable.valeur;

			window.dispatchEvent(window.Evenement.impactBalle);

			tracer("deplacement de la balle x=" + deplacementBalle.horizontal + " y=" + deplacementBalle.vertical);					
		}

		else if(variable.nom=="positionBalle")
		{
			positionBalle=variable.valeur;

			tracer("position de la balle = (" + positionBalle.horizontal +	" , " + positionBalle.vertical + ")");
		}

		else if(variable.nom=="positionJoueur1")
		{
			positionJoueur1=variable.valeur;

			if(numeroJoueur==2)
				window.dispatchEvent(window.Evenement.joueur2EnAction);

			//tracer("position du joueur1 = (" + positionJoueur1.horizontal + " , " + positionJoueur1.vertical + ") explose: " + positionJoueur1.explose);
		}

		else if(variable.nom=="positionJoueur2")
		{
			positionJoueur2=variable.valeur;

			if(numeroJoueur==1)
				window.dispatchEvent(window.Evenement.joueur2EnAction);

			//tracer("position du joueur2 = (" + positionJoueur2.horizontal +" , " + positionJoueur2.vertical + ") explose: " + positionJoueur2.explose);
		}

		else if(variable.nom=="etat")
		{
			etat=variable.valeur;

			window.dispatchEvent(window.Evenement.changementEtatPartie);

			tracer("État de la partie: " + variable.valeur);
		}

		else
		{
			tracer(variable.nom + ": " + variable.valeur);
		}
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
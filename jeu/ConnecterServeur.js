var ConnecterServeur = function()
{
	var classeServeur = /*"smartfox"*/"node";
	
	this.initialiserServeur = function(nom)
	{
		
	}
	
	this.quitterSeveur = function()
	{
		
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

function changerVariablesServeur(noms, valeurs)
{
	
}

function tracer(message, alerte)
{
    console.log(message);
    if(!(alerte!=true)) alert(message);
}
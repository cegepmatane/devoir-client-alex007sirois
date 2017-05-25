var serveur=null;

var ConnecterServeur = function()
{
	var classeServeur = "smartfox"/*node smartfox*/;
	
	this.initialiserServeur = function(nom)
	{
		if(classeServeur=="node")
		{
			serveur = new CommuniquerServeurNode();
		}
		if(classeServeur=="smartfox")
		{
			serveur = new CommuniquerServeurSmartfox();
		}
		if(serveur!=null)
			serveur.initialiserServeur(nom);
	}
	
	this.quitterSeveur = function()
	{
		serveur.quitterSeveur();
	}
	
	this.getNomJoueur = function()
	{
		return serveur.getNomJoueur();
	}

	this.getNomAdversaire = function()
	{
		return serveur.getNomAdversaire();
	}

	this.getPositionAutreJoueur = function()
	{
		return serveur.getPositionAutreJoueur();
	}

	this.getEtat = function()
	{
		return serveur.getEtat();
	}

	this.getDeplacementBalle = function()
	{
		return serveur.getDeplacementBalle();
	}

	this.getNumeroJoueur = function()
	{
		return serveur.getNumeroJoueur();
	}

	this.getPositionBalle = function()
	{
		return serveur.getPositionBalle();
	}
}

function changerVariablesServeur(noms, valeurs)
{
	if(serveur!=null)
		serveur.changerVariablesServeur(noms, valeurs);
}

function tracer(message, alerte)
{
    console.log(message);
    if(!(alerte!=true)) alert(message);
}
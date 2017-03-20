//Rien est public...
var Joueur = function(scene, numero)
{
    var joueur = this;

	var cercle=null;
	var positionJoueur = {};

	var delais;
	var retirer;

	var peutExploser;
	var explose;
    
    //Constructeur parce qu'il est appel� inline � la fin...
    var initialiser = function()
    {
     	cercle = new createjs.Shape();

		if(numero==1)
			cercle.graphics.beginFill(Joueur.Configuration.couleurPret1).drawCircle(0,0, Joueur.Configuration.grosseur).endFill();
		else if(numero==2)
			cercle.graphics.beginFill(Joueur.Configuration.couleurPret2).drawCircle(0,0, Joueur.Configuration.grosseur).endFill();
		
		scene.addChild(cercle);

		explose=false;
		peutExploser=true;
	}
    
    //constructeur
    initialiser();

	this.envoyerCoordonneesAuServeur = function()
	{
		positionJoueur=joueur.getCoordonnees();
		
		if(numero==1)
			changerVariablesServeur('positionJoueur1', positionJoueur);
		else if(numero==2)
			changerVariablesServeur('positionJoueur2', positionJoueur);
	}

	this.delayerExplosion = function()
	{
		if(!explose)
		{
			clearTimeout(delais);
			peutExploser=true;
			if(numero==1)
				cercle.graphics.beginFill(Joueur.Configuration.couleurPret1).drawCircle(0,0, Joueur.Configuration.grosseur).endFill();
			else if(numero==2)
				cercle.graphics.clear().beginFill(Joueur.Configuration.couleurPret2).drawCircle(0, 0, Joueur.Configuration.grosseur).endFill();
		}
	}

	this.retirerExplosion = function()
	{
		if(explose)
		{
			clearTimeout(retirer);

			explose=false;

			if(numero==1)
				cercle.graphics.clear().beginFill(Joueur.Configuration.couleurAttente1).drawCircle(0, 0, Joueur.Configuration.grosseur).endFill();
			else if(numero==2)
				cercle.graphics.clear().beginFill(Joueur.Configuration.couleurAttente2).drawCircle(0, 0, Joueur.Configuration.grosseur).endFill();

			delais=setTimeout(joueur.delayerExplosion, Joueur.Configuration.delaisExplosion);

			joueur.envoyerCoordonneesAuServeur();
		}
	}

    //ICI c'est public
    this.bouger = function(evenement,ratioX,ratioY, informationCanevas)
    {	
		cercle.x = (evenement.clientX - informationCanevas.left)*ratioX;
		cercle.y =(evenement.clientY - informationCanevas.top)*ratioY;

		joueur.envoyerCoordonneesAuServeur();
	}

	this.exploser =  function()
    {
		if(peutExploser!=false)
		{
			peutExploser=false;
			explose=true;

			if(numero==1)
				cercle.graphics.clear().beginFill(Joueur.Configuration.couleurExplosion1).drawCircle(0, 0, Joueur.Configuration.grosseur*2).endFill();
			else if(numero==2)
				cercle.graphics.clear().beginFill(Joueur.Configuration.couleurExplosion2).drawCircle(0, 0, Joueur.Configuration.grosseur*2).endFill();

			retirer=setTimeout(joueur.retirerExplosion, Joueur.Configuration.dureeExplosion);

			joueur.envoyerCoordonneesAuServeur();
		}
	}

	this.getCoordonnees = function()
	{
		return {horizontal:Math.round(cercle.x), vertical:Math.round(cercle.y), explose:explose};
	}

	this.recevoirCoordonneesServeur = function(coordonnees)
	{
		cercle.x=coordonnees.horizontal;
		cercle.y=coordonnees.vertical;

		if(coordonnees.explose)
			joueur.exploser();
		else
			joueur.retirerExplosion();
	}
}

Joueur.Configuration =
{
	delaisExplosion:2000,
	dureeExplosion:800,
	couleurPret1:"#FF0000",
	couleurAttente1:"#FFFF00",
	couleurExplosion1:"#FF7F00",
	couleurPret2:"#0000FF",
	couleurAttente2:"#00FFFF",
	couleurExplosion2:"#007FFF",
	grosseur:25
}
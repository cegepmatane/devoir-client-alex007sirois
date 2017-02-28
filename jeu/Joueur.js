//Rien est public...
var Joueur = function(scene)
{
    var joueur = this;

	var cercle=null;

	var delais;
	var retirer;

	var peutExploser;
	var explose;
    
    //Constructeur parce qu'il est appel� inline � la fin...
    var initialiser = function()
    {
     	cercle = new createjs.Shape();

		cercle.graphics.beginFill(Joueur.Configuration.couleurPret).drawCircle(0,0, Joueur.Configuration.grosseur).endFill();
		
		scene.addChild(cercle);

		explose=false;
		peutExploser=true;
	}
    
    //constructeur
    initialiser();

	this.delayerExplosion = function()
	{
		if(!explose)
		{
			clearTimeout(delais);
			peutExploser=true;
			cercle.graphics.clear().beginFill(Joueur.Configuration.couleurPret).drawCircle(0, 0, Joueur.Configuration.grosseur).endFill();
		}
	}

	this.retirerExplosion = function()
	{
		if(explose)
		{
			clearTimeout(retirer);

			explose=false;

			cercle.graphics.clear().beginFill(Joueur.Configuration.couleurAttente).drawCircle(0, 0, Joueur.Configuration.grosseur).endFill();

			delais=setTimeout(joueur.delayerExplosion, Joueur.Configuration.delaisExplosion);
		}
	}

    //ICI c'est public
    this.bouger = function(evenement,ratioX,ratioY, informationCanevas)
    {	
		cercle.x = (evenement.clientX - informationCanevas.left)*ratioX;
		cercle.y =(evenement.clientY - informationCanevas.top)*ratioY;
	}

	this.exploser =  function()
    {
		if(peutExploser!=false)
		{
			peutExploser=false;
			explose=true;

			cercle.graphics.clear().beginFill(Joueur.Configuration.couleurExplosion).drawCircle(0, 0, Joueur.Configuration.grosseur*2).endFill();


			retirer=setTimeout(joueur.retirerExplosion, Joueur.Configuration.dureeExplosion);
		}
	}

	this.getCoordonnees = function()
	{
		return {x:cercle.x, y:cercle.y, modeExplosion:explose/*, modeGlace:false*/};
	}
}

Joueur.Configuration =
{
	delaisExplosion:2000,
	dureeExplosion:800,
	couleurPret:"Red",
	couleurAttente:"Yellow",
	couleurExplosion:"Orange",
	grosseur:25
}
//Rien est public...
var Joueur = function(scene, robot)
{
    var joueur = this;

	var cercle=null;

	var delais;
	var retirer;

	var peutExploser;
	var explose;

	delaisExplosion=2000;
	dureeExplosion=800;
    
    //Constructeur parce qu'il est appel� inline � la fin...
    var initialiser = function()
    {
     	cercle = new createjs.Shape();
		
		if(robot!=true)
		{
			cercle.graphics.beginFill("Red").drawCircle(0,0, 25).endFill();
		}
		else
		{
			cercle.graphics.beginFill("Purple").drawCircle(0,0, 25).endFill();

			cercle.x=canevas.width-100;
			cercle.y=canevas.height/2;
		}
		scene.addChild(cercle);

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
			cercle.graphics.clear().beginFill("Red").drawCircle(0, 0, 25).endFill();
		}
	}

	this.retirerExplosion = function()
	{
		if(explose)
		{
			clearTimeout(retirer);

			explose=false;

			cercle.graphics.clear().beginFill("Yellow").drawCircle(0, 0, 25).endFill();

			delais=setTimeout(joueur.delayerExplosion, delaisExplosion);
		}
	}

    //ICI c'est public
    this.rafraichirAnimation = function(evenement,ratioX,ratioY)
    {	
		if(robot!=true)
		{
			cercle.x = (evenement.clientX - canevas.offsetLeft)*ratioX;
			cercle.y =(evenement.clientY - canevas.offsetTop)*ratioY;
		}
		else
		{
			
		}
	}

	this.exploser =  function(evenement,ratioX,ratioY)
    {
		if(peutExploser!=false)
		{
			peutExploser=false;
			explose=true;

			cercle.graphics.clear().beginFill("Orange").drawCircle(0, 0, 50).endFill();


			retirer=setTimeout(joueur.retirerExplosion, dureeExplosion);
		}
	}

	this.getInformations = function()
	{
		return {x:cercle.x, y:cercle.y, modeExplosion:explose/*, modeGlace:false*/};
	}
}
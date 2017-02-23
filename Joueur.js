//Rien est public...
var Joueur = function(scene, robot)
{
    var joueur = this;

	var cercle=null;
	var explosion=null;

	var peutExploser;

	delaisExplosion=1800;
	dureeExplosion=750;
    
    //Constructeur parce qu'il est appel� inline � la fin...
    var initialiser = function()
    {
     	cercle = new createjs.Shape();
		
		if(robot!=true)
		{
			cercle.graphics.beginFill("Red").drawCircle(0,0, 25);
		}
		else
		{
			cercle.graphics.beginFill("Purple").drawCircle(0,0, 25);

			cercle.x=canevas.width-100;
			cercle.y=canevas.height/2;
		}
		scene.addChild(cercle);

		peutExploser=true;
	}
    
    //constructeur
    initialiser();

	this.retirerExplosion = function()
	{
		scene.removeChild(explosion);
		explosion=null;
		setTimeout(function(){ peutExploser=true; }, delaisExplosion);
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

		if(explosion!=null)
		{
			explosion.x = cercle.x;
			explosion.y = cercle.y;
		}
	}

	this.exploser =  function(evenement,ratioX,ratioY)
    {
		if(peutExploser!=false)
		{
			peutExploser=false;
			

			explosion = new createjs.Shape();
			explosion.graphics.beginFill("Orange").drawCircle(0, 0, 50);

			explosion.x = cercle.x;
			explosion.y = cercle.y;

			scene.addChild(explosion);

			setTimeout(joueur.retirerExplosion, dureeExplosion);
		}
	}

	this.getInformations = function()
	{
		return {x:cercle.x, y:cercle.y, modeExplosion:explosion!=null/*, modeGlace:false*/};
	}
}
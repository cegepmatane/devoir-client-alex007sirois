//Rien est public...
var Joueur = function(scene)
{
    var joueur = this;
	var cercle=null;
    
    //Constructeur parce qu'il est appel� inline � la fin...
    var initialiser = function()
    {
     	cercle = new createjs.Shape();
		cercle.graphics.beginFill("LightBlue").drawCircle(0, 0, 25);

		cercle.x = 0;
		cercle.y = canevas.height/2;

		scene.addChild(cercle);
	}
    
    //constructeur
    initialiser();
    
    //ICI c'est public
    this.rafraichirAnimation =  function(evenement,ratioX,ratioY)
    {
		cercle.x = (evenement.clientX*ratioX)-40;
		cercle.y =(evenement.clientY*ratioY)-10;
	}
}
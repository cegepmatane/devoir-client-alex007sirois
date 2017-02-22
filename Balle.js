//Rien est public...
var Balle = function(scene)
{
    var balle = this;
	var cercle=null;

	var vitesse=0;
	var angle=90;

	var deplacementX;
	var deplacementY;

	vitesseDepart = 5;
	acceleration = 2;
    
    //Constructeur parce qu'il est appel� inline � la fin...
    var initialiser = function()
    {
     	cercle = new createjs.Shape();
		cercle.graphics.beginFill("White").drawCircle(0, 0, 25);

		cercle.x = canevas.width/2;
		cercle.y = canevas.height/2;
        
		vitesse = vitesseDepart;
		angle = (Math.random() * Math.PI * 2);

		calculerDeplacements();

		scene.addChild(cercle);
	}     
    
	var calculerDeplacements = function()
	{
		deplacementX = vitesse*Math.cos(angle);
		deplacementY = vitesse*Math.sin(angle);
	}

	var calculerVecteur = function()
	{
		angle = Math.atan(deplacementY/deplacementX);
		vitesse = Math.sqrt(Math.pow(deplacementX,2) + Math.pow(deplacementY,2));
	}
    
    //constructeur
    initialiser();
    
    //ICI c'est public
    this.rafraichirAnimation =  function(evenement)
    {
        cercle.x += deplacementX;
		cercle.y -= deplacementY;

		if(cercle.y<=20 ||cercle.y >= canevas.height-20)
		{
			deplacementY *= -1;
		}
		if(cercle.x<=20 ||cercle.x >= canevas.width-20)
		{
			deplacementX *= -1;
		}
	}
}
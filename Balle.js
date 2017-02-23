//Rien est public...
var Balle = function(scene)
{
    var balle = this;
	var cercle=null;

	var vitesse;
	var angle;

	var deplacementX;
	var deplacementY;

	var immunisee;
	var vitesseHTML

	vitesseDepart = 5;
	acceleration = 3;

	tempsImmunite = 500;
	pi=Math.PI;
    
    //Constructeur parce qu'il est appel� inline � la fin...
    var initialiser = function()
    {
     	cercle = new createjs.Shape();
		cercle.graphics.beginFill("White").drawCircle(0, 0, 25);

		cercle.x = canevas.width/2;
		cercle.y = canevas.height/2;
        
		vitesse = vitesseDepart;
		angle = (Math.random() * pi * 2);

		immunisee=false;

		calculerDeplacements();

		scene.addChild(cercle);

		vitesseHTML=document.getElementById('vitesse');
		vitesseHTML.innerHTML = vitesse;
		window.dispatchEvent(window.Evenement.changementVitesse);
	}     
    
	var calculerDeplacements = function()
	{
		deplacementX = vitesse*Math.cos(angle);
		deplacementY = vitesse*Math.sin(angle);
	}

	
    
    //constructeur
    initialiser();
    
    //ICI c'est public
    this.rafraichirAnimation =  function(evenement)
    {
        cercle.x += deplacementX;
		cercle.y -= deplacementY;

		if(cercle.y<=25 ||cercle.y >= canevas.height-25)
		{
			deplacementY *= -1;
		}
		if(cercle.x<=25 ||cercle.x >= canevas.width-25)
		{
			deplacementX *= -1;
		}
	}

	this.exploser = function(x,y)
	{
		if(immunisee!=true)
		{
			immunisee=true;
			setTimeout(function(){ immunisee=false; }, tempsImmunite);

			angle=Math.atan(deplacementY/deplacementX);

			var angleHypothenus=Math.atan((cercle.y-y)/(cercle.x-x));

			if(x > cercle.x)
				angleHypothenus+=pi;
			
			angle=2*angleHypothenus+angle;

			if(angle>2*pi)
				angle-=2*pi;

			if(angle<0)
				angle+=pi;

			vitesse+=Math.floor(Math.pow(vitesse,1/acceleration)+1);

			vitesseHTML.innerHTML = vitesse;
			window.dispatchEvent(window.Evenement.changementVitesse);

			calculerDeplacements();
		}
	}

	this.getInformations = function()
	{
		return {x :cercle.x, y : cercle.y/*, vitesse: vitesse, angle: angle, deplacementX:deplacementX, deplacementY:deplacementY*/};
	}
}
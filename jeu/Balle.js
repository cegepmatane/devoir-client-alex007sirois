//Rien est public...
var Balle = function(scene)
{
    var balle = this;

	var spriteBalle=null;
    var animationBalle = null;
    var imageBalle = new Image();

	var vitesse;
	var angle;

	var deplacementX;
	var deplacementY;

	var immunisee;
	var vitesseHTML

	vitesseDepart = 5;
	acceleration = 1/2;

	tempsImmunite = 400;
	pi=Math.PI;

	
    
    //Constructeur parce qu'il est appel� inline � la fin...
    var initialiser = function()
    {
		var chargementCompletBalle = document.createEvent('Event');
		chargementCompletBalle.initEvent('chargementCompletBalle', true, true);
		var nombreImagesChargees=0;

		imageBalle.onload = function()
     	{        
			nombreImagesChargees++;
      	}

		imageBalle.src = 'ressource/sprite-balle1.png';
        
		vitesse = vitesseDepart;
		angle = (Math.random() * pi * 2);

		immunisee=false;

		calculerDeplacements();

		vitesseHTML=document.getElementById('vitesse');
		vitesseHTML.innerHTML = vitesse;
		window.dispatchEvent(window.Evenement.changementVitesse);

		var demarrerAnimation = function(evenemnt)
		{
			spriteBalle = new createjs.SpriteSheet(
			{
				images:[imageBalle],
				frames:{width:64,height:64},
				animations:
				{
					tourne:[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19]
				}
			});
			animationBalle = new createjs.Sprite(spriteBalle, "tourne");
        	animationBalle.framerate = 10;

			//animationBalle.scaleX = 50/64 ;
			//animationBalle.scaleY = 50/64;

			animationBalle.x = canevas.width/2;
			animationBalle.y = canevas.height/2;

			scene.addChild(animationBalle);
		}


		var validerChargementImage = function(evenement)
		{ 
			if(nombreImagesChargees == 1)
			{
			window.dispatchEvent(chargementCompletBalle); 
			createjs.Ticker.removeEventListener("tick", validerChargementImage);
			window.dispatchEvent(window.Evenement.balleFinChargement);
			}
		}
		
		window.addEventListener('chargementCompletBalle', demarrerAnimation, false);
		createjs.Ticker.addEventListener("tick", validerChargementImage);
	}     
    
	var calculerDeplacements = function()
	{
		deplacementX = vitesse*Math.cos(angle);
		deplacementY = vitesse*Math.sin(angle);
	}

	
    
    //constructeur
    initialiser();

	this.reinitialiser = function()
	{
		vitesse = vitesseDepart;
		angle = (Math.random() * pi * 2);

		calculerDeplacements();

		animationBalle.x = canevas.width/2;
		animationBalle.y = canevas.height/2;
	}
    
    //ICI c'est public
    this.rafraichirAnimation =  function(evenement)
    {
        animationBalle.x += deplacementX;
		animationBalle.y -= deplacementY;

		if(animationBalle.y<=0 ||animationBalle.y >= canevas.height-50)
		{
			deplacementY *= -1;
		}
		if(animationBalle.x<=0 ||animationBalle.x >= canevas.width-50)
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

			if(x < animationBalle.x)
				angle+=pi;

			var angleHypothenus=Math.atan((animationBalle.y-y)/(animationBalle.x-x));

			if(x < animationBalle.x)
				angleHypothenus+=pi;

			angleHypothenus=traiterAngle(angleHypothenus);
			angle=traiterAngle(angle);
			
			angle=2*angleHypothenus+angle;

			angle=traiterAngle(angle);

			vitesse+=Math.floor(Math.pow(vitesse,acceleration)+1);

			vitesseHTML.innerHTML = vitesse;
			window.dispatchEvent(window.Evenement.changementVitesse);

			calculerDeplacements();
		}
	}

	this.getInformations = function()
	{
		return {x :animationBalle.x+25, y : animationBalle.y+25/*, vitesse: vitesse, angle: angle, deplacementX:deplacementX, deplacementY:deplacementY/**/};
	}
}
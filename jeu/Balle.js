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
	var vitesseHTML;

	
    
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

		imageBalle.src = Balle.Configuration.sourceImage;
        
		vitesse = Balle.Configuration.vitesseDepart;
		angle = (Math.random() * Math.PI * 2);

		immunisee=false;

		calculerDeplacements();


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
        	animationBalle.framerate = Balle.Configuration.FPS;

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
			
				window.dispatchEvent(window.Evenement.changementVitesse);
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
		vitesse = Balle.Configuration.vitesseDepart;
		angle = (Math.random() * Math.PI * 2);

		calculerDeplacements();

		animationBalle.x = canevas.width/2;
		animationBalle.y = canevas.height/2;

		window.dispatchEvent(window.Evenement.changementVitesse);
	}
    
    //ICI c'est public
    this.rafraichirAnimation =  function(evenement)
    {
        animationBalle.x += deplacementX;
		animationBalle.y -= deplacementY;

		if(animationBalle.y<=0 ||animationBalle.y >= canevas.height-64)
		{
			deplacementY *= -1;
		}
		if(animationBalle.x<=0 ||animationBalle.x >= canevas.width-64)
		{
			deplacementX *= -1;
		}
	}

	this.exploser = function(x,y)
	{
		if(immunisee!=true)
		{
			immunisee=true;
			setTimeout(function(){ immunisee=false; }, Balle.Configuration.tempsImmunite);

			angle=Math.atan(deplacementY/deplacementX);

			if(x < animationBalle.x)
				angle+=Math.PI;

			var angleHypothenus=Math.atan((animationBalle.y-y)/(animationBalle.x-x));

			if(x < animationBalle.x)
				angleHypothenus+=Math.PI;

			angleHypothenus=traiterAngle(angleHypothenus);
			angle=traiterAngle(angle);


			angle=2*angleHypothenus+angle;

			angle=traiterAngle(angle);

			vitesse+=Math.floor(Math.pow(vitesse,Balle.Configuration.acceleration)+1);

			window.dispatchEvent(window.Evenement.changementVitesse);

			calculerDeplacements();
		}
	}

	this.getCoordonnees = function()
	{
		return {x :animationBalle.x+32, y : animationBalle.y+32/*, vitesse: vitesse, angle: angle, deplacementX:deplacementX, deplacementY:deplacementY/**/};
	}

	this.getVitesse = function()
	{
		return vitesse;
	}
}

Balle.Configuration =
{
	vitesseDepart :5,
	acceleration : 1/2,
 	sourceImage:'ressource/sprite-balle1.png',
	tempsImmunite : 400,
	FPS:10
}
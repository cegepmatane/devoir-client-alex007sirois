//Rien est public...
var Balle = function(scene)
{

    var balle = this;

	var spriteBalle=null;
    var animationBalle = null;
    var imageBalle = new Image();

	var nombreImagesChargees;
	var chargementCompletBalle;

	var vitesse;
	var angle;

	var deplacementX;
	var deplacementY;

	var immunisee;
	var vitesseHTML;

	var deplacementBalle = {};
	var positionBalle = {};

	var listeNomsVariables = [];
	var listeValeursVariables = [];	
    
    //Constructeur parce qu'il est appel� inline � la fin...
    var initialiser = function()
    {
		listeNomsVariables.push("positionBalle");
		listeNomsVariables.push("deplacementBalle");

		listeValeursVariables.push(positionBalle);
		listeValeursVariables.push(deplacementBalle);

		chargementCompletBalle = document.createEvent('Event');
		chargementCompletBalle.initEvent('chargementCompletBalle', true, true);
		nombreImagesChargees=0;

		imageBalle.src = Balle.Configuration.sourceImage;
        
		vitesse = 0;
		angle = 0;

		immunisee=false;

		calculerDeplacements();
		
		window.addEventListener('chargementCompletBalle', demarrerAnimation, false);
		createjs.Ticker.addEventListener("tick", validerChargementImage);
	}

	imageBalle.onload = function()
    {        
		nombreImagesChargees++;
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
    
	var calculerDeplacements = function()
	{
		deplacementX = vitesse*Math.cos(angle);
		deplacementY = vitesse*Math.sin(angle);
	}

	var calculerAngles = function()
	{
		vitesse=pythagore(deplacementX,deplacementY);
		vitesse=Math.floor(vitesse);

		angle=Math.acos(deplacementX/vitesse);

		if(deplacementY<0)
			angle*=-1;
		
		angle=traiterAngle(angle);
	}
	
	var demarrerAnimation = function(evenemnt)
	{
		spriteBalle = new createjs.SpriteSheet(
		{
			images:[imageBalle],
			frames:{width:Balle.Configuration.diametre,height:Balle.Configuration.diametre},
			animations:
			{
				tourne:[0,19]
			}
		});
		animationBalle = new createjs.Sprite(spriteBalle, "tourne");
       	animationBalle.framerate = Balle.Configuration.FPS;
		animationBalle.x = -scene.canvas.width;
		animationBalle.y = -scene.canvas.height;

		scene.addChild(animationBalle);
	}
    
    //constructeur
    initialiser();

	this.envoyerInformationsAuServeur = function()
	{
		deplacementBalle.horizontal=deplacementX;
		deplacementBalle.vertical=deplacementY;

		positionBalle.horizontal = animationBalle.x+Balle.Configuration.diametre/2;
		positionBalle.vertical = animationBalle.y+Balle.Configuration.diametre/2;

		changerVariablesServeur(listeNomsVariables,listeValeursVariables);
	}

	this.commencerMouvement = function()
	{
		vitesse = Balle.Configuration.vitesseDepart;
		angle = (Math.random() * Math.PI * 2);

		animationBalle.x = scene.canvas.width/2;
		animationBalle.y = scene.canvas.height/2;

		calculerDeplacements();

		balle.envoyerInformationsAuServeur();

		window.dispatchEvent(window.Evenement.changementVitesse);
	}
    
    //ICI c'est public
    this.rafraichirAnimation =  function(proportionDelais)
    {
		if(vitesse>0)
		{
			if(animationBalle.y<=0 ||animationBalle.y >= scene.canvas.height-Balle.Configuration.diametre)
			{
				deplacementY *= -1;

				if(animationBalle.y<=0)
					createjs.Tween.get(animationBalle).to({y:Math.abs(animationBalle.y)}, 15, createjs.Ease.backIn(1));
					//animationBalle.y=Math.abs(animationBalle.y);

				if(animationBalle.y >= scene.canvas.height-Balle.Configuration.diametre)
					createjs.Tween.get(animationBalle).to({y:2*(scene.canvas.height-Balle.Configuration.diametre)-animationBalle.y}, 15, createjs.Ease.backIn(1));
					//animationBalle.y=2*(scene.canvas.height-Balle.Configuration.diametre)-animationBalle.y;
			}
			if(animationBalle.x<=0 ||animationBalle.x >= scene.canvas.width-Balle.Configuration.diametre)
			{
				deplacementX *= -1;

				if(animationBalle.x<=0)
					createjs.Tween.get(animationBalle).to({x:Math.abs(animationBalle.x)}, 15, createjs.Ease.backIn(1));

				if(animationBalle.x >= scene.canvas.width-Balle.Configuration.diametre)
					createjs.Tween.get(animationBalle).to({x:2*(scene.canvas.width-Balle.Configuration.diametre)-animationBalle.x}, 15, createjs.Ease.backIn(1));
			}

			animationBalle.x += proportionDelais*deplacementX;
			animationBalle.y -= proportionDelais*deplacementY;
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
			angle = traiterAngle(angle);

			angle=2*angleHypothenus+angle;

			angle=arrondirAuDecimalVoulu(traiterAngle(angle),3);

			vitesse+=Math.round(Math.pow(vitesse,Balle.Configuration.acceleration)+1);

			window.dispatchEvent(window.Evenement.changementVitesse);

			calculerDeplacements();

			balle.envoyerInformationsAuServeur();
		}
	}

	this.recevoirCoordonneesServeur = function(deplacementBalle, positionBalle)
	{
		deplacementX=deplacementBalle.horizontal;
		deplacementY=deplacementBalle.vertical;

		animationBalle.x = positionBalle.horizontal-Balle.Configuration.diametre/2;
		animationBalle.y = 	positionBalle.vertical-Balle.Configuration.diametre/2;

		calculerAngles();

		window.dispatchEvent(window.Evenement.changementVitesse);
	}

	this.getCoordonnees = function()
	{
		return {x :Math.round(animationBalle.x+Balle.Configuration.diametre/2), y : Math.round(animationBalle.y+Balle.Configuration.diametre/2), immunisee:immunisee};
	}

	this.getVitesse = function()
	{
		return vitesse;
	}
}

Balle.Configuration =
{
	diametre:64,
	vitesseDepart :5,
	acceleration : 1/2,
 	sourceImage:'ressource/sprite-balle1.png',
	tempsImmunite: 800,
	FPS:10
}
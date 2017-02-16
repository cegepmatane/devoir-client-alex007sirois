//Rien est public...
var Oiseau = function(scene, ratioScene)
{
    var oiseau = this; //Est un proxy de closure...
    var spriteOiseauVole = null;
    var animationOiseauVole = null;
    var imageOiseauVole = new Image();
    
    //Cet événement ne peut pas être déclenché hors de cette fonction
    var chargementCompletOiseau = document.createEvent('Event');
    chargementCompletOiseau.initEvent('chargementCompletOiseau', true, true);
    
    var nombreImagesChargees = 0;
    var oiseauEnPause = false;
    
    //Constructeur parce qu'il est appelé inline à la fin...
    var initialiser = function()
    {
      //http://www.crockford.com/javascript/private.html
            
      imageOiseauVole.onload = function()
      {        
        nombreImagesChargees++;
      }
      imageOiseauVole.src = Oiseau.Configuration.images.imageOiseauVole;
      
      

      var demarrerAnimation = function (evenement)
      {

      spriteOiseauVole = new createjs.SpriteSheet(
            {
                images:[imageOiseauVole],
                frames:{width:712,height:541},
                animations:
                {
                    vole:[0,1]
                }
            }
        );
 
        animationOiseauVole = new createjs.Sprite(spriteOiseauVole, "vole");
        animationOiseauVole.framerate = 10;
        
        animationOiseauVole.scaleX = ratioScene.largeur * Oiseau.Configuration.ratioImageScene ;
        animationOiseauVole.scaleY = ratioScene.hauteur * Oiseau.Configuration.ratioImageScene;
        scene.addChild(animationOiseauVole);
      }
      
      var validerChargementImages = function(evenement)
      { 
        if(nombreImagesChargees == Object.keys(Oiseau.Configuration.images).length)
        {
          window.dispatchEvent(chargementCompletOiseau); 
          createjs.Ticker.removeEventListener("tick", validerChargementImages);
          window.dispatchEvent(window.Evenement.oiseauFinChargement);
        }
      }
      
      window.addEventListener('chargementCompletOiseau', demarrerAnimation, false);
      createjs.Ticker.addEventListener("tick", validerChargementImages);
    }
    
    //constructeur
    initialiser();
    
    //ICI c'est public
    
    this.rafraichirAnimation =  function(evenement)
    {
      
      if(!oiseauEnPause)
      {
        animationOiseauVole.play();
      }
      else
      {
        animationOiseauVole.stop();
      }
      
    }
    
    this.pauser = function(enPause)
    {
      oiseauEnPause = enPause;
    }
    
    this.estEnPause = function()
    {
      return oiseauEnPause;
    }
    
}

Oiseau.Configuration = 
{
  images : {
    imageOiseauVole : "oiseau-vole.png"
  },
  ratioImageScene : 0.15
}

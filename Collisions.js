//Rien est public...
var Collisions = function(Balle, Joueur1, Joueur2)
{
	var balle=null;
	var joueur1=null;
	var joueur2=null;
    
    //Constructeur parce qu'il est appel� inline � la fin...
    

	this.testerCollisions =  function()
    {	
		balle=Balle.getInformations();
		joueur1=Joueur1.getInformations();
		joueur2=Joueur2.getInformations();

		if(joueur1.modeExplosion!=true)
		{
			if(pythagore(joueur1.x-balle.x,joueur1.y-balle.y)<=50)
			{
				//alert('game over');
			}
		}
		else
		{
			if(pythagore(joueur1.x-balle.x,joueur1.y-balle.y)<=75)
			{
				Balle.exploser(joueur1.x, joueur1.y);
			}
		}

		if(joueur2.modeExplosion!=true)
		{
			if(pythagore(joueur2.x-balle.x,joueur2.y-balle.y)<=50)
			{
				//alert('game over');
			}
		}
		else
		{
			if(pythagore(joueur2.x-balle.x,joueur2.y-balle.y)<=75)
			{
				Balle.exploser(joueur1.x, joueur1.y);
			}
		}
	}
}
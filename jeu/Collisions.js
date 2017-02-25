//Rien est public...
var Collisions = function(jeu,Balle, Joueur1, Joueur2)
{
	var balle=null;
	var joueur1=null;
	var joueur2=null;
    
    //Constructeur parce qu'il est appel� inline � la fin...
    

	this.testerCollisions =  function(verifierB, verifierJ1, verifierJ2)
    {	
		if(verifierB==true)
			balle=Balle.getInformations();

		if(verifierJ1==true)
			joueur1=Joueur1.getInformations();

		if(verifierJ2==true)
			joueur2=Joueur2.getInformations();

		if(verifierB==true && verifierJ1==true)
		{
			if(joueur1.modeExplosion!=true)
			{
				if(pythagore(joueur1.x-balle.x,joueur1.y-balle.y)<=50)
				{
					jeu.partieTerminee();
				}
			}
			else
			{
				if(pythagore(joueur1.x-balle.x,joueur1.y-balle.y)<=75)
				{
					Balle.exploser(joueur1.x, joueur1.y);
				}
			}
		}

		if(verifierB==true && verifierJ2==true)
		{
			if(joueur2.modeExplosion!=true)
			{
				if(pythagore(joueur2.x-balle.x,joueur2.y-balle.y)<=50)
				{
					jeu.partieTerminee();
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
}
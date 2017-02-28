//Rien est public...
var Collisions = function()
{
	this.testerCollisions =  function(balle, joueur1, joueur2)
    {
		

		if(balle!=null && joueur1!=null)
		{
			if(joueur1.modeExplosion!=true)
			{
				if(pythagore(joueur1.x-balle.x,joueur1.y-balle.y)<=50)
				{
					window.dispatchEvent(window.Evenement.mortJoueur1);
				}
			}
			else
			{
				if(pythagore(joueur1.x-balle.x,joueur1.y-balle.y)<=75)
				{
					window.dispatchEvent(window.Evenement.explosionAvecJoueur1);
				}
			}
		}

		if(balle!=null && joueur2!=null)
		{
			if(joueur2.modeExplosion!=true)
			{
				if(pythagore(joueur2.x-balle.x,joueur2.y-balle.y)<=50)
				{
					//jeu.partieTerminee();
				}
			}
			else
			{
				if(pythagore(joueur2.x-balle.x,joueur2.y-balle.y)<=75)
				{
					//Balle.exploser(joueur1.x, joueur1.y);
				}
			}
		}
	}
}
//Rien est public...
var Collisions = function()
{
	this.testerCollisions =  function(balle, joueur1)
    {
		if(balle!=null && joueur1!=null)
		{
			if(joueur1.explose!=true)
			{
				if(pythagore(joueur1.horizontal-balle.x,joueur1.vertical-balle.y)<=50)
				{
					window.dispatchEvent(window.Evenement.mortJoueur);
				}
			}
			else if(balle.immunisee != true)
			{
				if(pythagore(joueur1.horizontal-balle.x,joueur1.vertical-balle.y)<=75)
				{
					window.dispatchEvent(window.Evenement.explosionAvecJoueur);
				}
			}
		}
	}
}
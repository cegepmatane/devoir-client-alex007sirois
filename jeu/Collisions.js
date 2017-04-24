function testerCollisions(coordonneesBalle, coordonneesJoueur)
{
	var constantes =
	{
		rayonBalle :32,
		rayonJoueur : 25
	}

	if(coordonneesBalle!=null && coordonneesJoueur!=null)
	{
		if(!coordonneesJoueur.explose)
		{
			if(Math.abs(coordonneesJoueur.horizontal-coordonneesBalle.x) <= (constantes.rayonBalle+constantes.rayonJoueur) && 
			Math.abs(coordonneesJoueur.vertical-coordonneesBalle.y) <= (constantes.rayonBalle+constantes.rayonJoueur))
			{
				window.dispatchEvent(window.Evenement.mortJoueur);
			}
		}
		else if(!coordonneesBalle.immunisee)
		{
			if(pythagore(coordonneesJoueur.horizontal-coordonneesBalle.x,coordonneesJoueur.vertical-coordonneesBalle.y)<=(constantes.rayonBalle+2*constantes.rayonJoueur))
			{
				window.dispatchEvent(window.Evenement.explosionAvecJoueur);
			}
		}
	}
}

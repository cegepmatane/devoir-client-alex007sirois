JeuVue = function()
{
	this.afficher = function()
  	{
		document.getElementsByTagName("body")[0].innerHTML = JeuVue.html;
		document.getElementById("animationFuseeSVG").innerHTML = JeuVue.svg;
  	}

  	this.modifierVitesse = function(vitesse)
  	{
		document.getElementById('vitesse').innerHTML = vitesse;
  	}
}

JeuVue.html = document.getElementById("page-jeu").innerHTML;
JeuVue.svg = document.getElementById("animationSVG").innerHTML;

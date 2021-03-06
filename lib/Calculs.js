function arrondirAuDecimalVoulu(chiffre, decimal)
{
	if(!(chiffre>=0 || chiffre<0))
	{
		return 0;
	}

    if(!(decimal>=0 || decimal<0))
	{
		decimal= 0;
	}

    return Math.round(Math.pow(10,decimal)*chiffre)/Math.pow(10,decimal);
}

function pythagore(a,b)
{
    if(!(a>=0 || a<0))
	{
		a=1;
	}

    if(!(b>=0 || b<0))
	{
		b=1;
	}
    
    c2=Math.pow(a,2)+Math.pow(b,2)
    c=Math.sqrt(c2);
    
    return c;
}

function traiterAngle(angle)
{
	while(angle>(2*Math.pi))
	{
		angle-=2*Math.pi;
	}

	while(angle<0)
	{
		angle+=2*Math.pi;
	}

	return angle;
}
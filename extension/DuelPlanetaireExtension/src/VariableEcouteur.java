
import java.util.Arrays;
import java.util.LinkedList;
import java.util.List;

import com.smartfoxserver.v2.annotations.Instantiation;
import com.smartfoxserver.v2.core.ISFSEvent;
import com.smartfoxserver.v2.core.SFSEventParam;
import com.smartfoxserver.v2.entities.Room;
import com.smartfoxserver.v2.entities.data.SFSObject;
import com.smartfoxserver.v2.entities.variables.RoomVariable;
import com.smartfoxserver.v2.entities.variables.SFSRoomVariable;
import com.smartfoxserver.v2.exceptions.SFSException;
import com.smartfoxserver.v2.extensions.BaseServerEventHandler;

@Instantiation(Instantiation.InstantiationMode.SINGLE_INSTANCE)
public class VariableEcouteur extends BaseServerEventHandler 
{
	/*float DELAIS = 1000/60;
	int LARGEUR = 2000;
	int HAUTEUR = 1000;
	int DIAMETRE = 64;*/
	
	Room salle;
	/*long date=0;
	long derniereSynchro;
	
	float balleX=0;
	float balleY=0;
	
	float deplacementX=0;
	float deplacementY=0;
	*/
	
	//int i=0;
	boolean initialisation=false;
	
	
	/*private void gererDeplacement()
	{
		long nouvelleDate = new Date().getTime();
		float multiple;
		
		if(date!=0)
			multiple = (nouvelleDate-date)/DELAIS;
		else
			multiple=1;
		
		date=nouvelleDate;
		
		if(balleY<=0 ||balleY >= HAUTEUR-DIAMETRE)
		{
			deplacementY *= -1;

			if(balleY<=0)
				balleY=Math.abs(balleY);

			if(balleY >= HAUTEUR-DIAMETRE)
				balleY=2*(HAUTEUR-DIAMETRE)-balleY;
		}
		if(balleX<=0 ||balleX >= LARGEUR-DIAMETRE)
		{
			deplacementX *= -1;

			if(balleX<=0)
				balleX=Math.abs(balleX);

			if(balleX >= LARGEUR-DIAMETRE)
				balleX=2*(HAUTEUR-DIAMETRE)-balleX;
		}
		
		balleX += deplacementX * multiple;
		balleY += deplacementY * multiple;
		
		//trace("balle: " + balleX + " " + balleY + "date: " + (date-derniereSynchro));
	}*/
	
	@SuppressWarnings("unchecked")
	@Override
	public void handleServerEvent(ISFSEvent evenement) throws SFSException 
	{
		salle = (Room)evenement.getParameter(SFSEventParam.ROOM);
		
		if(!initialisation)
		{
			this.changerEtat("");
			this.changerDeplacementBalle();
			initialisation=true;
			//derniereSynchro=new Date().getTime();
		}
		
		float balleX=0;
		float balleY=0;
		boolean test=false;
		
		List<RoomVariable> listeVariables = (List<RoomVariable>)evenement.getParameter(SFSEventParam.VARIABLES);
		
		/*if(deplacementX != 0 || deplacementY != 0 && salle.getUserList().size() == 2)
			gererDeplacement();*/
		
		for(int index = 0 ; index < listeVariables.size() ; index++)
		{
			RoomVariable variable = listeVariables.get(index);
			
			//trace(variable.getName());
			
			if(variable.getName().equals("positionBalle"))
			{
				SFSObject balle = (SFSObject) variable.getSFSObjectValue();
				
				balleX=balle.getFloat("horizontal");
				balleY=balle.getFloat("vertical");
				
				test=true;
				
				//trace("balle " + test);
				//trace("nouvelle balle x:" + balleX + " y:" + balleY);
			}
			/*else if(variable.getName().equals("deplacementBalle"))
			{
				//trace("deplacement :" + i++);
				
				SFSObject deplacementBalle = (SFSObject) variable.getSFSObjectValue();
				
				deplacementX=deplacementBalle.getFloat("horizontal");
				deplacementY=deplacementBalle.getFloat("vertical");
				
				//trace("deplacement x:" + deplacementX + " y:" + deplacementY);
			}*/
			/*else if(variable.getName().equals("positionJoueur1") || variable.getName().equals("positionJoueur2"));
			{
				SFSObject coordonneesJoueur = (SFSObject) variable.getSFSObjectValue();
				
				joueurX= coordonneesJoueur.getFloat("horizontal");
				joueurY=coordonneesJoueur.getFloat("vertical");
				joueurExplose=(boolean)coordonneesJoueur.getBool("explose");
				
				if(joueurExplose!=true)
					joueurExplose=false;
				
				joueurNom=variable.getName();
				
				//trace("joueur " + test);
				
				//trace("nouveau joueur x:" + joueurX + " y:" + joueurY);
			}*/
		}
		
		if(test && salle.getUserList().size()==2)
		{
			testerCollisions("positionJoueur1",balleX,balleY);
			testerCollisions("positionJoueur2",balleX,balleY);
		}
	}
	
	private void testerCollisions(String joueurNom, float balleX, float balleY)
	{
		SFSObject coordonneesJoueur = (SFSObject) salle.getVariable(joueurNom).getSFSObjectValue();
		
		float joueurX= coordonneesJoueur.getFloat("horizontal");
		float joueurY=coordonneesJoueur.getFloat("vertical");
		boolean joueurExplose=coordonneesJoueur.getBool("explose");
		
		if(joueurExplose!=true)
			joueurExplose=false;
		
		trace("test b x:" + balleX + " y:" + balleY + "j x:" + joueurX + " y:" + joueurY);
		
		if(pythagore(joueurX-balleX,joueurY-balleY) <= 57 && !joueurExplose)
		{
			if(joueurNom.equals("positionJoueur1"))
			{
				changerEtat("mort joueur 1");
			}
			else if(joueurNom.equals("positionJoueur2"))
			{
				changerEtat("mort joueur 2");
			}
		}
	}
	
	private static double pythagore(float f,float g)
	{
	    if(!(f>=0 || f<0))
		{
			f=1;
		}

	    if(!(g>=0 || g<0))
		{
			g=1;
		}
	    
	    double c2=Math.pow(f,2)+Math.pow(g,2);
	    double c=Math.sqrt(c2);
	    
	    return c;
	}
	
	private void changerEtat(String valeur)
	{
		RoomVariable rv = new SFSRoomVariable("etat", valeur);
		rv.setGlobal(true);
		List<RoomVariable> rvs = Arrays.asList(rv);
		getApi().setRoomVariables(null, salle, rvs, true, true, false);
		
		trace("etat = "+valeur);
	}
	
	private void changerDeplacementBalle()
	{
		SFSObject deplacementBalle = new SFSObject();
		SFSObject positionBalle = new SFSObject();
		
		positionBalle.putFloat("horizontal", 0);
		positionBalle.putFloat("vertical", 0);
		
		deplacementBalle.putFloat("horizontal", 0);
		deplacementBalle.putFloat("vertical", 0);
		
		List<RoomVariable> rvs = new LinkedList<RoomVariable>();
		
		RoomVariable rv = new SFSRoomVariable("positionBalle", positionBalle);
		rv.setGlobal(true);
		
		RoomVariable rv1 = new SFSRoomVariable("deplacementBalle", deplacementBalle);
		rv.setGlobal(true);
		
		rvs.add(rv1);
		rvs.add(rv);
		
		getApi().setRoomVariables(null, salle, rvs, true, true, false);
	}
}

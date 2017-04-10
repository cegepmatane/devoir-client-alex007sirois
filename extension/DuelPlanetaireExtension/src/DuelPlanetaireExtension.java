import com.smartfoxserver.v2.core.SFSEventType;
import com.smartfoxserver.v2.extensions.SFSExtension;

public class DuelPlanetaireExtension extends SFSExtension
{
	
	@Override
	public void init()
	{
		trace("Bonjour de DuelPlanetaireExtension 2.0");
		this.addEventHandler(SFSEventType.ROOM_VARIABLES_UPDATE, VariableEcouteur.class);
		this.addEventHandler(SFSEventType.USER_JOIN_ROOM, VariableEcouteur.class);
	}
	
	
}
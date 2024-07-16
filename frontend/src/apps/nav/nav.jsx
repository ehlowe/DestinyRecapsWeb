// Component for navigation buttons
import { useNavigate } from 'react-router-dom';
import "./nav.css";
function Navigation() {
    const navigate = useNavigate();
  
    return (
      <div className="base-button-div">
        <button className="home-button" onClick={() => navigate(`/`)}>Homepage</button>
        <button className="about-button" onClick={() => navigate(`/about`)}>About</button>
        <div className="discord-banner" dangerouslySetInnerHTML={{__html: `JOIN THE DISCORD! (for post stream recap messages) <a href= https://discord.gg/Bf8JgeFynz>https://discord.gg/Bf8JgeFynz</a>`}}>
        </div>
      </div>
    );
  }

export default Navigation;
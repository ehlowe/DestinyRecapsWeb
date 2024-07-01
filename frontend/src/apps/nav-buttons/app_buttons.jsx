// Component for navigation buttons
import { useNavigate } from 'react-router-dom';
import "./app_button.css";
function Navigation() {
    const navigate = useNavigate();
  
    return (
      <div className="base-button-div">
        <button className="home-button" onClick={() => navigate(`/`)}>Homepage</button>
        <button className="about-button" onClick={() => navigate(`/about`)}>About</button>
        <div className="discord-banner" dangerouslySetInnerHTML={{__html: `JOIN THE DISCORD! <a href=https://discord.gg/fQmwYQuR>https://discord.gg/fQmwYQuR</a>`}}>
        </div>
      </div>
    );
  }

export default Navigation;
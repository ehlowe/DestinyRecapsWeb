import { useNavigate } from 'react-router-dom';


function stream_recaps() {
    const navigate = useNavigate();
    return (
        <div>
            <button className="Destiny" onClick={() => navigate(`/stream_recaps/Destiny`)}>Destiny</button>
        </div>
    )

}

export default stream_recaps;
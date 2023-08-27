import { useLocation } from "react-router-dom";
import StarRateIcon from '@mui/icons-material/StarRate';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import './single.css';
const Single = () => {
    const location = useLocation();
    const { state } = location;
    const {
        address,
        cheapestPrice,
        city,
        desc,
        distance,
        featured,
        name,
        photos,
        rating,
        rooms,
        title,
        type,
    } = state;
    return (
        <>
            <div className="detail-page">
                <div className="container">
                    <div className="top-left">
                        <h1>{name}</h1>
                        <p style={{ textTransform: "capitalize" }}>({type})</p>
                        <p>{address}</p>
                        <p>
                            <span>{city}
                            </span>
                            <span>
                                <LocationOnIcon />
                            </span>
                        </p>
                        <p style={{ display: "flex", color: "#febb02" }}>
                            {[...Array(rating)].map(() => {
                                return (
                                    <StarRateIcon />
                                );
                            })}
                        </p>
                        <h2>{title}</h2>
                    </div>
                    <div className="top-right">
                        <p>Price: ${cheapestPrice}</p>
                        <p>{desc}</p>
                        <p>No. of Rooms: {rooms.length}</p>
                        <p>Distance: {distance}m from center</p>
                        <p>Featured: {featured ? 'Yes' : 'No'}</p>
                    </div>
                </div>
                <div className="images-container">
                    {photos.length > 0 ? photos.map((photo, index) => (
                        <img
                            key={index}
                            src={photo}
                            alt={`${index + 1}`}
                            className="rounded-image"
                        />
                    )) : <h1>No images</h1>}
                </div>
            </div>
        </>
    )
}

export default Single;
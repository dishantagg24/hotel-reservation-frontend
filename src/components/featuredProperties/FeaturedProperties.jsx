import useFetch from "../../hooks/useFetch";
import { Loader } from "../loader/loader";
import StarRateIcon from '@mui/icons-material/StarRate';
import "./featuredProperties.css";

const FeaturedProperties = () => {
  const { loading, data } = useFetch(`${process.env.REACT_APP_BACKEND_URL}/hotels?featured=true&limit=3`);
  return (
    <div className="fp">
      {loading ? <Loader /> : <>
        {data.length > 0 && data.map((item) => {
          return <div className="fpItem" key={item._id}>
            <img
              src={item.photos[0]}
              alt=""
              className="fpImg"
            />
            <span className="fpName">{item.name}</span>
            <span className="fpCity">{item.city}</span>
            <span className="fpPrice">Starting from ${item.cheapestPrice}</span>
            {item.rating &&
              <div className="fpRating">
                <div className="rating-container">
                  <button className="rating">{item.rating}</button>
                  <StarRateIcon style={{ color: "#febb02" }} />
                </div>
                <span>Excellent</span>
              </div>
            }
          </div>
        })}
      </>}
    </div>
  );
};

export default FeaturedProperties;

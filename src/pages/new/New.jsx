import "./new.css";
import { useState } from "react";
import axios from "axios";
import { userInputs } from "../../formSource";
import { useNavigate } from "react-router-dom";

const New = () => {
  const [info, setInfo] = useState({});
  const nav = useNavigate();
  const handleChange = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${process.env.REACT_APP_BACKEND_URL}/auth/register`, info);
      nav('/admin');
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="new">
      <div className="newContainer">
        <div className="top">
          <h1 style={{ margin: "0 auto" }}>Add New User</h1>
        </div>
        <div className="bottom">
          <div className="right">
            <form>
              {userInputs.map((input) => (
                <div className="formInput" key={input.id}>
                  <label>{input.label}</label>
                  <input
                    onChange={handleChange}
                    type={input.type}
                    placeholder={input.placeholder}
                    id={input.id}
                  />
                </div>
              ))}
              <button onClick={handleClick}>Send</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default New;

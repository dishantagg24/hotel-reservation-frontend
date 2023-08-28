import { useState } from "react"
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";

const Register = ({ setOpenRegisterModal }) => {
    const [credentials, setCredentials] = useState({ username: undefined, email: undefined, password: undefined })
    const navigate = useNavigate();
    const handleChange = (e) => {
        setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }))
    }

    const handleClick = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`${process.env.REACT_APP_BACKEND_URL}/auth/register`, credentials);
            setOpenRegisterModal(false);
            navigate('/');
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <div className="reserve" style={{ zIndex: 10 }}>
                <div className="rContainer">
                    <FontAwesomeIcon
                        icon={faCircleXmark}
                        className="rClose"
                        style={{ color: "black" }}
                        onClick={() => setOpenRegisterModal(false)}
                    />
                    <div className="login">
                        <div className="lContainer">
                            <input type="text" placeholder="username" id="username" onChange={handleChange} className="lInput" />
                            <input type="email" placeholder="email" id="email" onChange={handleChange} className="lInput" />
                            <input type="password" placeholder="password" id="password" onChange={handleChange} className="lInput" />
                            <button onClick={handleClick} className="lButton">Register</button>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default Register
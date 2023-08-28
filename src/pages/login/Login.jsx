import { useContext, useState } from "react"
import { AuthContext } from "../../context/AuthContext"
import axios from "axios";
import './login.css';
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";

const Login = ({ setOpenLoginModal, setOpenAdminLoginModal }) => {
    const [credentials, setCredentials] = useState({ username: undefined, password: undefined })
    const { loading, error, dispatch } = useContext(AuthContext);
    const navigate = useNavigate();
    const handleChange = (e) => {
        setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }))
    }

    const handleClick = async (e) => {
        e.preventDefault();
        dispatch({ type: "LOGIN_START" });
        try {
            const res = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/auth/login`, credentials);
            if (setOpenAdminLoginModal) {
                if (res.data.isAdmin) {
                    dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
                    navigate('/admin');
                    if (setOpenAdminLoginModal) {
                        setOpenAdminLoginModal(false);
                        dispatch({ type: "ERASE_ERROR" });
                    }
                } else {
                    dispatch({ type: "LOGIN_FAILURE", payload: "You are not authorized" });
                }
            } else {
                dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
                navigate('/');
            }
            if (setOpenLoginModal) {
                setOpenLoginModal(false);
                dispatch({ type: "ERASE_ERROR" });
            }
        } catch (error) {
            dispatch({ type: "LOGIN_FAILURE", payload: error.response.data });
        }
    }

    const handleClose = () => {
        if (setOpenAdminLoginModal) {
            setOpenAdminLoginModal(false);
        }
        if (setOpenLoginModal) {
            setOpenLoginModal(false);
        }
        dispatch({ type: "ERASE_ERROR" });
    }

    return (
        <>
            <div className="reserve" style={{ zIndex: 10, color: "black", textAlign: "center" }}>
                <div className="rContainer">
                    <FontAwesomeIcon
                        icon={faCircleXmark}
                        className="rClose"
                        onClick={handleClose}
                    />
                    <div className="login">
                        <div className="lContainer">
                            {setOpenAdminLoginModal && <h2 style={{ margin: 0 }}>Admin Login</h2>}
                            <input type="text" placeholder="username" id="username" onChange={handleChange} className="lInput" />
                            <input type="password" placeholder="password" id="password" onChange={handleChange} className="lInput" />
                            <button disabled={loading} onClick={handleClick} className="lButton">Login</button>
                            {error && <span>{error}</span>}
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default Login
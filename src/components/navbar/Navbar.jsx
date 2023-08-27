import { Link } from "react-router-dom"
import "./navbar.css"
import { useContext, useState } from "react"
import { AuthContext } from "../../context/AuthContext"
import Login from "../../pages/login/Login"
import Register from "../../pages/register/Register"

const Navbar = () => {
  const { user, dispatch } = useContext(AuthContext);

  const [openLoginModal, setOpenLoginModal] = useState(false);
  const [openAdminLoginModal, setOpenAdminLoginModal] = useState(false);
  const [openRegisterModal, setOpenRegisterModal] = useState(false);

  return (
    <div className="navbar">
      <div className="navContainer">
        <Link to="/" style={{ color: "inherit", textDecoration: "none" }}>
          <span className="logo">HeavenHub</span>
        </Link>
        {user ? <div className="navItems">
          {user.username}
          <button className="navButton" onClick={() => dispatch({ type: "LOGOUT" })}>Logout</button>
        </div> :
          <div className="navItems">
            <button className="navButton" onClick={() => setOpenRegisterModal(true)}>Register</button>
            <button className="navButton" onClick={() => setOpenLoginModal(true)}>Login</button>
            <button className="navButton" onClick={() => setOpenAdminLoginModal(true)}>Admin</button>
          </div>
        }
        {openLoginModal && <Login setOpenLoginModal={setOpenLoginModal} />}
        {openAdminLoginModal && <Login setOpenAdminLoginModal={setOpenAdminLoginModal} />}
        {openRegisterModal && <Register setOpenRegisterModal={setOpenRegisterModal} />}
      </div>
    </div>
  )
}

export default Navbar
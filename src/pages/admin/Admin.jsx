import { Link } from "react-router-dom";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import StoreIcon from "@mui/icons-material/Store";
import "./admin.css";

const Admin = () => {
    return (

        <div>
            <div className="top">
                <Link to="/admin" style={{ textDecoration: "none" }}>
                    <span className="logo">HHadmin</span>
                </Link>
            </div>
            <hr />
            <div className="center">
                <ul>
                    <Link to="/admin/users" style={{ textDecoration: "none" }}>
                        <li>
                            <PersonOutlineIcon className="icon" />
                            <span>Users</span>
                        </li>
                    </Link>
                    <Link to="/admin/hotels" style={{ textDecoration: "none" }}>
                        <li>
                            <StoreIcon className="icon" />
                            <span>Hotels</span>
                        </li>
                    </Link>
                    <Link to="/admin/rooms" style={{ textDecoration: "none" }}>
                        <li>
                            <CreditCardIcon className="icon" />
                            <span>Rooms</span>
                        </li>
                    </Link>
                </ul>
            </div>
        </div>
    )
}

export default Admin;
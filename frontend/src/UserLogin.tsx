import { Link } from "react-router-dom";
import "./styles/UserLogin.css";

export default function UserLogin(){

    return <div className="user--login">
        <Link to = "/login">
        <p className = "text-danger">🔒 Sign In</p>
        </Link>
    </div> 
    
}
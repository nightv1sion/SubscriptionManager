import axios from "axios";
import { useState } from "react";
import { responsivePropType } from "react-bootstrap/esm/createUtilityClasses";
import { useNavigate } from "react-router-dom";
import { setAuthToken } from "./Authentication";
import { UserForLoginDto, UserForRegisterDto } from "./Interfaces";
import Login from "./Login";
import Register from "./Register";
import "./styles/AuthPage.css";

export default function AuthPage(props: authPageProps){

    const [isRegistered, setIsRegistered] = useState<boolean>(true); 

    const navigate = useNavigate();

    return <>

        <div className = "authpage--textName"><a onClick = {(event) => { navigate("/"); event.preventDefault()}} href = "#">Subscription Manager</a></div>

        {(isRegistered ? <Login switchForm={() => setIsRegistered(false)}/> : 
            <Register switchForm = {() => setIsRegistered(true)} />)}
    </>
}

interface authPageProps {
}
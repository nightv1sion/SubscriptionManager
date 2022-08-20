import axios from "axios";
import { useState } from "react";
import { responsivePropType } from "react-bootstrap/esm/createUtilityClasses";
import { useNavigate } from "react-router-dom";
import { setAuthToken } from "./Authentication";
import { UserForLoginDto, UserForRegisterDto } from "./Interfaces";
import Login from "./Login";
import Register from "./Register";

export default function AuthPage(props: authPageProps){

    const [isRegistered, setIsRegistered] = useState<boolean>(true); 

    return <>

        {(isRegistered ? <Login switchForm={() => setIsRegistered(false)}/> : 
            <Register switchForm = {() => setIsRegistered(true)} />)}
    </>
}

interface authPageProps {
}
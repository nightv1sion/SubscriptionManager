import axios from "axios";
import { useState } from "react";
import { setAuthToken } from "./Authentication";
import { UserForLoginDto, UserForRegisterDto } from "./Interfaces";
import Login from "./Login";
import Register from "./Register";

export default function AuthPage(){
    

    const loginUser = async (user: UserForLoginDto) => {
        const uri = process.env.REACT_APP_API + "authentication/login";
        try {
            const response = await axios.post(uri, user);
            if(response.status != 200)
                throw new Error("Something went wrong when user authorizing");
            const token = response.data.token;
            console.log(token);
            localStorage.setItem("token", token);
            setAuthToken(token);
        }
        catch(err:any){
            console.log(err.message);
        }
    }

    const registerUser = async (user: UserForRegisterDto) => {
        const uri = process.env.REACT_APP_API + "authentication/register";
        try {
            const response = await axios.post(uri, user);
            if(response.status != 201)
                throw new Error("Something went wrong when registrating the user");
            
        }
        catch(err: any){
            console.log(err.message);
        }
    }
    
    const [isRegistered, setIsRegistered] = useState<boolean>(true); 

    return <>
        {isRegistered ? <Login switchForm={() => setIsRegistered(false)} handleLogin = {loginUser}/> : <Register switchForm = {() => setIsRegistered(true)} handleRegister = {registerUser}/>}
    </>
}
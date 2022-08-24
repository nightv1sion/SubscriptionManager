import axios from "axios";
import { ErrorMessage, useFormik } from "formik";
import { Button } from "react-bootstrap";
import * as Yup from "yup";
import { UserForLoginDto } from "./Interfaces";
import { useState } from "react";
import { setAuthToken } from "./Authentication";
import { useNavigate } from "react-router-dom";
export default function Login(props: loginProps){
    
    const navigate = useNavigate();
    
    const [errorMessages, setErrorMessages] = useState<string[]>([]);

    const loginUser = async (user: UserForLoginDto) => {
        const baseUrl: string = "" + process.env.REACT_APP_API;
        const uri = "authentication/login";
        try {
            const response = await axios({method: 'post', baseURL: baseUrl , url: uri, data: user});
            if(response.status != 200)
                throw new Error("Something went wrong when user authorizing");
            const token = response.data.token;
            localStorage.setItem("token", token);
            setAuthToken(token);
            navigate("/");
        }
        catch(err:any){
            const errors:string[] = [];
            errors.push("Login or Password is wrong");
            setErrorMessages(errors);
        }
    }

    const handleFormikSubmit = async (values: UserForLoginDto) => {
        await loginUser(values);
    }
    
    const formik = useFormik({initialValues: {username: "", password: ""}, onSubmit: handleFormikSubmit, 
    validationSchema: Yup.object().shape( {username: Yup.string().required(), password: Yup.string().required()} )});

    
    
    return <>
    <form onSubmit = {formik.handleSubmit} >
        <div style = {{width: "20%", margin: "auto", border: "1px solid blue", padding: "1% 1% 0.5% 1%", borderRadius: "5%", marginTop: "2%"}}>
            <div className = "text-center">
                <h3>Login</h3>
            </div>
            {errorMessages.length != 0 ? errorMessages.map((error, index) => <div key = {index} className = "text-center text-danger">{error}</div>) : <></>}
            {formik.errors.username ? <label htmlFor="username" className = "text-danger">Username is required</label> : <label htmlFor = "username">Username</label>} 
            <input id="username" name = "username" value={formik.values.username} onChange = {formik.handleChange} className = "form-control"/>

            {formik.errors.password ? <label htmlFor="password" className = "text-danger">Password is required</label> : <label htmlFor = "password">Password</label>}
            <input type = "password" id="password" name="password" value={formik.values.password} onChange = {formik.handleChange} className = "form-control"/>
            <div className = "text-center mt-3">
                <Button variant = "outline-primary" type="submit" disabled = {!formik.isValid}>Login</Button>
            </div>
            <div className = "text-center mt-3">
                <a href = "#" onClick = {(event) => { props.switchForm(); event.preventDefault()}} className="link-primary"><p>Don't have an account?</p></a>
            </div>
        </div>
    </form>

    </>
}
interface loginProps {
    switchForm: () => void;
}

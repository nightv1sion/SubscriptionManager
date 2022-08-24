import axios from "axios";
import { useFormik } from "formik";
import { Button } from "react-bootstrap";
import * as Yup from "yup";
import { UserForRegisterDto } from "./Interfaces";
import { useState } from "react";

export default function Register(props: registerProps){

    const [errorMessages, setErrorMessages] = useState<string[]>([]);

    const registerUser = async (user: UserForRegisterDto) => {
        const baseUrl: string = "" + process.env.REACT_APP_API;
        const uri = "authentication/register";
        try {
            const response = await axios({method: "post", baseURL: baseUrl, url: uri, data: user});
            if(response.status != 201)
                throw new Error("Something went wrong when registrating the user");
            props.switchForm();
        }
        catch(err: any){
            if(err.request){
                const response = JSON.parse(err.request.response);
                const errors:string[] = [];
                if(response["DuplicateEmail"])
                    errors.push(response["DuplicateEmail"][0]);
                if(response["DuplicateUserName"])
                    errors.push(response["DuplicateUserName"][0]);
                if(response["PasswordTooShort"])
                    errors.push(response["PasswordTooShort"][0]);
                if(response["PasswordRequiresNonAlphanumeric"])
                    errors.push(response["PasswordRequiresNonAlphanumeric"][0]);
                errors.push("Password and Confirmed Password must be the same");
                errors.push("Password must have one Uppercase letter, one LowerCase letter, one Number, one Non Alphanumeric symbol");
                setErrorMessages(errors)
            }
            else if(err.response){
                console.log("response:");
                console.log(err.response);
            }
            else if(err.message){
                console.log("message:");
                console.log(err.message);
            }
        }
    }

    const handleFormikSubmit = async (values: UserForRegisterDto) => {
        await registerUser(values);
    }

    const formik = useFormik({initialValues: {username: "", email: "", password: "", confirmPassword: ""}, validationSchema: Yup.object().shape({
        username: Yup.string().required(),
        email: Yup.string().required(),
        password: Yup.string().required(),
        confirmPassword: Yup.string().required()
    }), onSubmit: handleFormikSubmit});

    return <>
    <div style = {{width: "20%", margin: "auto", border: "1px solid blue", padding: "1% 1% 0.5% 1%", borderRadius: "5%", marginTop: "2%"}}>
        <form onSubmit = {formik.handleSubmit}>
            <div className = "text-center">
                <h3>Register</h3>
            </div>
            {errorMessages.length > 0 ? errorMessages.map((error, index) => <div key={index} className = "text-danger text-center">{error}</div>) : <></>}
            {formik.errors.username ? <label htmlFor = "username" className = "text-danger">Username is required</label> : <label htmlFor = "username">Username</label> }
            <input id = "username" name = "username" value = {formik.values.username} onChange = {formik.handleChange} className = "form-control"/>

            {formik.errors.email ? <label htmlFor = "email" className = "text-danger">Email is required</label> : <label htmlFor = "email">Email</label> }
            <input id = "email" name = "email" value = {formik.values.email} onChange = {formik.handleChange} className = "form-control"/>
            
            {formik.errors.password ? <label htmlFor = "password" className = "text-danger">Password is required</label> : <label htmlFor = "password">Password</label> }
            <input type = "password" id = "password" name = "password" value = {formik.values.password} onChange = {formik.handleChange} className = "form-control"/>

            {formik.errors.confirmPassword ? <label htmlFor = "confirmPassword" className = "text-danger">Confirm Password is required</label> : <label htmlFor = "confirmPassword">Confirm Password</label> }
            <input type = "password" id="confirmPassword" name = "confirmPassword" value = {formik.values.confirmPassword} onChange = {formik.handleChange} className = "form-control"/>
            <div className = "text-center mt-3">
                <Button variant = "outline-primary" type="submit">Register</Button>
            </div>
            <div className = "text-center mt-3">
                <a href = "#" onClick = {(event) => { props.switchForm(); event.preventDefault()}} className="link-primary"><p>Already have an account</p></a>
            </div>
        </form>
    </div>
</>
}

interface registerProps{
    switchForm: () => void;
}
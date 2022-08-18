import { useFormik } from "formik";
import { Button } from "react-bootstrap";
import * as Yup from "yup";
import { UserForRegisterDto } from "./Interfaces";

export default function Register(props: registerProps){

    const handleFormikSubmit = (values: UserForRegisterDto) => {
        props.handleRegister(values);
    }

    const formik = useFormik({initialValues: {username: "", email: "", password: "", confirmPassword: ""}, validationSchema: Yup.object().shape({
        username: Yup.string().required(),
        email: Yup.string().required(),
        password: Yup.string().required(),
        confirmPassword: Yup.string().required()
    }), onSubmit: handleFormikSubmit});

    return <>
    <div style = {{width: "20%", margin: "auto", border: "1px solid blue", padding: "1% 1% 0.5% 1%", borderRadius: "5%", marginTop: "5%"}}>
        <form onSubmit = {formik.handleSubmit}>
            <div className = "text-center">
                <h3>Register</h3>
            </div>
            {formik.errors.username ? <label htmlFor = "username" className = "text-danger">Username is required</label> : <label htmlFor = "username">Username</label> }
            <input id = "username" name = "username" value = {formik.values.username} onChange = {formik.handleChange} className = "form-control"/>

            {formik.errors.email ? <label htmlFor = "email" className = "text-danger">Email is required</label> : <label htmlFor = "email">Email</label> }
            <input id = "email" name = "email" value = {formik.values.email} onChange = {formik.handleChange} className = "form-control"/>
            
            {formik.errors.password ? <label htmlFor = "password" className = "text-danger">Password is required</label> : <label htmlFor = "password">Password</label> }
            <input id = "password" name = "password" value = {formik.values.password} onChange = {formik.handleChange} className = "form-control"/>

            {formik.errors.confirmPassword ? <label htmlFor = "confirmPassword" className = "text-danger">Confirm Password is required</label> : <label htmlFor = "confirmPassword">Confirm Password</label> }
            <input id="confirmPassword" name = "confirmPassword" value = {formik.values.confirmPassword} onChange = {formik.handleChange} className = "form-control"/>
            <div className = "text-center mt-3">
                <Button variant = "outline-primary" type="submit">Register</Button>
            </div>
            <div className = "text-center mt-3">
                <a href = "#" onClick = {() => props.switchForm()} className="link-primary"><p>Already have an account</p></a>
            </div>
        </form>
    </div>
</>
}

interface registerProps{
    switchForm: () => void;
    handleRegister: (user: UserForRegisterDto) => void;
}
import { useFormik } from "formik";
import { Button } from "react-bootstrap";
import * as Yup from "yup";
import { UserForLoginDto } from "./Interfaces";
export default function Login(props: loginProps){
    
    const handleFormikSubmit = async (values: UserForLoginDto) => {
        await props.handleLogin(values);
    }
    
    const formik = useFormik({initialValues: {username: "", password: ""}, onSubmit: handleFormikSubmit, 
    validationSchema: Yup.object().shape( {username: Yup.string().required(), password: Yup.string().required()} )});

    
    
    return <>
    <form onSubmit = {formik.handleSubmit} >
        <div style = {{width: "20%", margin: "auto", border: "1px solid blue", padding: "1% 1% 0.5% 1%", borderRadius: "5%", marginTop: "5%"}}>
            <div className = "text-center">
                <h3>Login</h3>
            </div>
            {formik.errors.username ? <label htmlFor="username" className = "text-danger">Username is required</label> : <label htmlFor = "username">Username</label>} 
            <input id="username" name = "username" value={formik.values.username} onChange = {formik.handleChange} className = "form-control"/>

            {formik.errors.password ? <label htmlFor="password" className = "text-danger">Password is required</label> : <label htmlFor = "password">Password</label>}
            <input id="password" name="password" value={formik.values.password} onChange = {formik.handleChange} className = "form-control"/>
            <div className = "text-center mt-3">
                <Button variant = "outline-primary" type="submit" disabled = {!formik.isValid}>Login</Button>
            </div>
            <div className = "text-center mt-3">
                <a href = "#" onClick = {() => props.switchForm()} className="link-primary"><p>Don't have an account?</p></a>
            </div>
        </div>
    </form>

    </>
}
interface loginProps {
    switchForm: () => void;
    handleLogin: (user: UserForLoginDto) => void;
}
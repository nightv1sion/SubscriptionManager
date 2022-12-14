import React, { useState } from "react";
import { FormControl } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./styles/FieldForCreation.css"

export default function FieldForCreation(props: fieldForCreationProps){

    const navigate = useNavigate();
    
    const [isInputVisible, setIsInputVisible] = useState<boolean>(false);

    const handleText = (event: React.ChangeEvent<HTMLInputElement>) => {
        props.handleText(event.target.value);
    }


    const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        console.log(event.key);
        if(event.key === "Enter")
        {
            props.handleCreation();
            setIsInputVisible(false);
        }
    }

    const handleBlurInput = () => {
        setIsInputVisible(false);
        props.breakCreation();
    }

    const handleClick = () => {
        if(props.userName)
            setIsInputVisible(true);
        else 
            navigate("/login");
    }

    return <>
        <div className = "create--category">
            {isInputVisible ? <div> 
                <input autoFocus onBlur = {() => handleBlurInput()} onChange = {handleText} className = "form-control" onKeyPress = {handleKeyPress} /> <Button type="submit" style =  {{"display": "none"}} ></Button></div>
                : <div  className = "create--category--field">
                    <a href="#" onClick={(event) => { handleClick(); event.preventDefault();}}>
                        <p style = {props.style} className = "create--category--text" >+ {props.placeholder}</p>
                    </a>
                </div>
            }
        </div>    
    </>
}

interface fieldForCreationProps {
    handleText: (text: string) => void;
    handleCreation: () => void;
    breakCreation: () => void;
    style?: object;
    placeholder: string;
    userName: string | undefined;
}
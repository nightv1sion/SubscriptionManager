import React, { useState } from "react";
import { FormControl } from "react-bootstrap";
import { Button } from "react-bootstrap";

export default function CreateCategoryField(props: createCategoryFieldProps){
    
    const [isInputVisible, setIsInputVisible] = useState<boolean>(false);

    const handleNewCategoryHandle = (event: React.ChangeEvent<HTMLInputElement>) => {
        props.handleNewCategoryText(event.target.value);
    }


    const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        console.log(event.key);
        if(event.key === "Enter")
        {
            props.handleCreateCategory();
            setIsInputVisible(false);
        }
    }

    const handleBlurInput = () => {
        setIsInputVisible(false);
        props.breakCreatingCategory();
    }

    return <>
        <div>
            {isInputVisible ? <div> 
                    <input autoFocus onBlur = {() => handleBlurInput()} onChange = {handleNewCategoryHandle} className = "form-control" onKeyPress = {handleKeyPress} /> <Button type="submit" style =  {{"display": "none"}} ></Button></div>
                    : <Button className = "w-100" variant = "outline-primary" onClick={() => setIsInputVisible(true)}>
                        Create Category
                    </Button>
            }
        </div>    
    </>
}

interface createCategoryFieldProps {
    handleNewCategoryText: (text: string) => void;
    handleCreateCategory: () => void;
    breakCreatingCategory: () => void;
}
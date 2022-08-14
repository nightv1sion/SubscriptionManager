import React, { useState } from "react";

export default function EditingCategory(props: editingCategoryProps){
    
    const [name, setName] = useState<string>(props.name);

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if(event.key === "Enter")
        {
            props.confirmEdit(name, props.index);
        }
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value);
    }

    const handleBlur = () => {
        props.breakEditing(props.index);
    }


    return <div>
        <input autoFocus style = {{"width": "67%", "marginTop": "3%"}} onBlur = {handleBlur} onChange = {handleChange} onKeyDown={handleKeyDown} defaultValue={props.name} className = "form-control"/>
    </div>
}
interface editingCategoryProps {
    name: string;
    index: number;
    breakEditing: (index: number) => void;
    confirmEdit: (name: string, index: number) => void;
}
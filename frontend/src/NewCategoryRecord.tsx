import { Button } from "react-bootstrap";
import "./styles/CategoryRecord.css";

export default function NewCategoryRecord(props: newCategoryRecordProps){
    return <div className = "category--record category--record--wo--operations">
            <Button variant = "outline-primary" className = "category--record--btn" >{props.categoryName}</Button>
        </div>
}

interface newCategoryRecordProps {
    categoryName: string;
}
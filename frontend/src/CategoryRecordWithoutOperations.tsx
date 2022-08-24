import { Button, Col, Container, Dropdown, Row, ToggleButton } from "react-bootstrap";
import "./styles/CategoryRecord.css";
export default function CategoryRecordWithoutOperations(props: categoryRecordWithOutOperationsProps){
    
    return <>
        <div className = "category--record category--record--wo--operations">
            <Button variant = {props.isSelected ? "secondary" : "outline-primary"} className = "category--record--btn" onClick = {(event) => { event.preventDefault(); props.setSelectedCategory(props.index) }} >{props.categoryName}</Button>
        </div>
    </>
}

interface categoryRecordWithOutOperationsProps{
    categoryName: string;
    setSelectedCategory: (index: number) => void;
    index: number;
    isSelected?: boolean;
}
import { Button, ButtonGroup, Col, Container, Dropdown, Row, ToggleButton } from "react-bootstrap";
import "./styles/CategoryRecord.css";
export default function CategoryRecord(props: categoryRecordProps){
    
    return <>
    <div className = "category--record">
        <Dropdown className = "category--record--dropdown" as={ButtonGroup}>
            <Button variant = {props.isSelected ? "secondary" : "outline-primary"} className = "category--record--btn" onClick = {(event) => { event.preventDefault(); props.setSelectedCategory(props.index) }} >{props.categoryName}</Button>
            <Dropdown.Toggle className = "category--record--toggle" split variant={props.isSelected ? "outline-secondary" : "outline-primary"} id="dropdown-basic" /> 
        <Dropdown.Menu>
            <Dropdown.Item onClick={() => props.handleEditCategory(props.index)}>Edit</Dropdown.Item>
            <Dropdown.Item onClick={() => props.handleDeleteCategory(props.index)}>Delete</Dropdown.Item>
        </Dropdown.Menu>
        </Dropdown>
    </div>
    </>
}

interface categoryRecordProps{
    categoryName: string;
    handleEditCategory: (index: number) => void;
    handleDeleteCategory: (index: number) => void;
    setSelectedCategory: (index: number) => void;
    index: number;
    isSelected?: boolean;
}
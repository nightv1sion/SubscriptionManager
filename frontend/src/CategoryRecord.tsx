import { Button, Col, Container, Row, ToggleButton } from "react-bootstrap";
import "./styles/CategoryRecord.css";
export default function CategoryRecord(props: categoryRecordProps){
    
    return <>
    {props.isSelected == true ? ( 
            <div className = "categoryrecord--box selected--category">
                <a href = "#" onClick = {(event) => { event.preventDefault(); props.setSelectedCategory(props.index) }}>
                    <div className = "category--name">
                        <p>{props.categoryName}</p>
                    </div>
                </a>
            </div>) : (
                <div className = "categoryrecord--box">
                    <a href = "#" onClick = {(event) => { event.preventDefault(); props.setSelectedCategory(props.index) }}>
                        <div className = "category--name">
                            <p>{props.categoryName}</p>
                        </div>
                    </a>
                </div>
            )
    }
    </>
}

interface categoryRecordProps{
    categoryName: string;
    handleEditCategory?: (index: number) => void;
    handleDeleteCategory?: (index: number) => void;
    setSelectedCategory: (index: number) => void;
    index: number;
    isSelected?: boolean;
}
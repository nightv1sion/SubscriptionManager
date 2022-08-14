import { Button, Col, Container, Row } from "react-bootstrap";

export default function CategoryRecord(props: categoryRecordProps){
    return <div>
                <Container className = "ml-0">
                    <Row className = "mt-3">
                        <Col md = {8} style = {{"padding": "0"}}>
                            <Button className = "w-100" variant = "outline-info" >
                                {props.categoryName}
                            </Button>
                        </Col>
                        <Col md = {2} style = {{"padding": "0", "margin": "0"}} className = "text-center" >
                            <Button style = {{"margin": "0"}} variant = "outline-dark" onClick = {() => props.handleEditCategory(props.index)}>&#128393;</Button>
                        </Col>
                        <Col md = {2} style = {{"padding": "0"}} className = "text-center">
                            <Button style = {{"marginRight": "45%"}}variant = "outline-danger" onClick = {() => props.handleDeleteCategory(props.index)}>&#10006;</Button>    
                        </Col>
                    </Row>
                </Container>
                
    </div>
}

interface categoryRecordProps{
    categoryName: string;
    handleEditCategory: (index: number) => void;
    handleDeleteCategory: (index: number) => void;
    index: number;
}
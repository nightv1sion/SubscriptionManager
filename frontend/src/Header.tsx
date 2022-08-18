import { Button, Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function Header(){
    
    return <Container fluid style = {{margin: 0, backgroundColor: "blue"}}>
            
        <Row>
            <Col sm={6}>
                <div style={{marginTop:"3%", marginBottom: "3%"}}>
                    <Link to="/">
                        <h1 style={{color: "white"}}>Subscription Manager</h1>
                    </Link>
                </div>
            </Col>
            <Col sm={6}>
                <div style = {{marginTop:"3%", marginBottom: "3%", textAlign: "end"}}>
                    <Link to="/login">
                        <Button variant = "success" style = {{ width: "10%", marginRight: "3%", marginTop:"1%"}}>Login</Button>
                    </Link>
                </div>                
            </Col>
        </Row>

    </Container>
} 
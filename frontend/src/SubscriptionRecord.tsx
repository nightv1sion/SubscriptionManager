import { useState } from "react";
import { Modal } from "react-bootstrap";
import { Container, Row, Col, Button } from "react-bootstrap";
import EditingSubscription from "./EditingSubscription";
import { Subscription } from "./Interfaces";

export default function SubscriptionRecord(props: subscriptionRecordProps){

    const DeleteSubscription = async () => {
        const uri = process.env.REACT_APP_API + "subscriptions/" + props.subscription.id;
        try {
            const response = await fetch(uri, {method: "DELETE", headers: {}});
            if(!response.ok)
                throw new Error("Something went wrong when deleting subscription");
        }
        catch(err:any) {
            console.log(err.message);
        }
    }

    const [showFormForCreating, setShowFormForCreating] = useState<boolean>(false);
    
    const handleOpenForm = () => {
        setShowFormForCreating(true);
    }

    const handleCloseForm = () => {
        setShowFormForCreating(false);
    }
    
    
    const handleSucceededSubscription = async () => {
        await DeleteSubscription();
        await props.getData();
    }


    return <>
        <div >
            <Container style = {{marginTop: "1%"}}>
                <Row>
                    <Col sm = {10}>
                        <div style={{width: "100%", borderColor: "purple", margin: "auto", fontSize: "16px"}} className = "form-control">
                            <Container>
                                <Row>
                                    <Col sm = {3}>
                                        <div>{props.subscription.name}</div>
                                    </Col>
                                    <Col sm = {3}>
                                        <div>{props.subscription.price}</div>
                                    </Col>
                                    <Col sm = {3}>
                                        {props.subscription.created ? <div>{props.subscription.created.toDateString()}</div> : <></>}
                                    </Col>
                                    <Col sm = {3}>
                                        {props.subscription.endsAt ? <div>{props.subscription.endsAt.toDateString()}</div> : <></>}
                                    </Col>
                                </Row>
                            </Container>
                        </div>
                    </Col>
                    <Col sm = {1} style = {{padding: "0", textAlign: "center"}}>
                        <Button variant="outline-success" style = {{paddingLeft: "15%", paddingRight: "15%"}} onClick = {handleSucceededSubscription}>&#10004;</Button>
                    </Col>
                    <Col sm = {1} style = {{padding: "0"}}>
                        <Button variant="outline-dark" style = {{marginLeft: "10%"}} onClick = {handleOpenForm}>&#128393;</Button>
                        { showFormForCreating ? <Modal show = {showFormForCreating} onHide = {handleCloseForm}>
                                <Modal.Header>
                                    <Modal.Title>New Subscription</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    <EditingSubscription subscription={props.subscription} closeForm={handleCloseForm} getData = {props.getData} />
                                </Modal.Body>
                            </Modal>: <></>
                        }
                    </Col>
                </Row>
            </Container>
            
            
        </div>
    </>
}

interface subscriptionRecordProps {
    subscription: Subscription;
    getData: () => void;
}
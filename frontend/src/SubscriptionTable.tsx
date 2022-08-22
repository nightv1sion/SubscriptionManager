import { Button, Container, Row, Col, Modal } from "react-bootstrap";
import { useEffect, useState } from "react";
import { Category, Subscription, SubscriptionDto } from "./Interfaces";
import SubscriptionRecord from "./SubscriptionRecord";
import CreatingSubscription from "./CreatingSubscription";
import axios from "axios";
import FieldForCreation from "./FieldForCreation";
import "./styles/SubscriptionTable.css";
import "./styles/SubscriptionRecord.css";
export default function SubscriptionTable(props: taskTableProps){
    
    const [nameOfNewSubscription, setNameOfNewSubscription] = useState<string | undefined>();

    const stringToDate = (date: string) => {
        if(date.includes("0001"))
          return undefined;
        let dateForReturn = new Date(date);
        return dateForReturn;
    }

    const PostNewSubscription = async () => {
        let uri:string = "" + process.env.REACT_APP_API + "subscriptions";
        let values = {name: nameOfNewSubscription, categoryId: props.category ? props.category.id : undefined};
        if(props.category)
        try {
          const response = await axios.post(uri, values);
          if(response.status != 201)
            throw new Error("Something went wrong when getting subscriptions from server");
          let data:SubscriptionDto[] = await response.data;
        }
        catch(error:any) {
          if(error.request)
              console.log(error.request)
          if(error.response)
              console.log(error.response);
          if(error.message)
              console.log(error.message);
        }
    }

    
    const handleCreate = async () => {
        await PostNewSubscription();
        setNameOfNewSubscription(undefined);
        await props.getDataSubscriptions();
    }

    const breakCreation = () => {
        setNameOfNewSubscription(undefined);
    }


    useEffect( () => { 
        const fetchData = async () => { await props.getDataSubscriptions() };
        fetchData();
     }, [props.category]);
    
    const [isInputVisible, setIsInputVisible] = useState<boolean>(false);
    
    return <>
    <div className = "subscription--table">

        <div className = "subscriptiontable--fieldforcreation">
        <FieldForCreation placeholder = {"Add a new subscription"} style = {{margin: "1% 1% 1% 1%"}} handleText={(value: string) => { setNameOfNewSubscription(value); } } handleCreation={handleCreate} breakCreation={breakCreation}/>
        </div>
        
        {nameOfNewSubscription ? <div className = "subscriptiontable--newsubscription">
            <div className = "subscription--record">
                <Container>
                    <Row>
                        <Col sm={2}></Col>
                        <Col sm={8}>
                            <div className = "subscription--info">
                                <div className = "subscription--name">{nameOfNewSubscription}</div>
                            </div>
                        </Col>
                        <Col sm={2}></Col>
                    </Row>
                </Container>     
            </div> 
        </div> : <></>}
        
        {props.subscriptions.length > 0 ? <div>
            {props.subscriptions.filter(s => s.endsAt == undefined || s.endsAt > new Date()).map((value, index) => {
                return <SubscriptionRecord index = {index} selectedSubscription={props.selectedSubscription && props.selectedSubscription == value ? true : false} setSelectedSubscription = {(subscription: Subscription | undefined) => {props.setSelectedSubscription(subscription);}} key = {index} subscription = {value} getData = {props.getDataSubscriptions}/>
            })}
        </div> : <div className="empty--image--div"><img src = "empty.png" className = "empty--image"/><div className = "empty--text">It is empty</div></div>}

        
        
        
        {props.subscriptions.filter(s => s.endsAt != undefined && s.endsAt < new Date()).length > 0 ? <div className="accordion accordion-flush" id="accordionFlushExample">
            <div className="accordion-item">
                <h2 className="accordion-header" id="flush-headingOne">
                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
                        Completed
                    </button>
                    </h2>
                    <div id="flush-collapseOne" className="accordion-collapse collapse" aria-labelledby="flush-headingOne" data-bs-parent="#accordionFlushExample">
                    <div className="accordion-body">
                    {props.subscriptions.filter(s => s.endsAt != undefined && s.endsAt < new Date()).map((value, index) => {
                        return <SubscriptionRecord index = {index} selectedSubscription={props.selectedSubscription == value ? true : false} setSelectedSubscription = {(subscription: Subscription | undefined) => { props.setSelectedSubscription(subscription); } }  key = {index} subscription = {value} getData = {props.getDataSubscriptions}/>
                    })}
                    </div>
            </div>
        </div>
        </div> : <></>}
    </div>
        
</>
}

interface taskTableProps {
    category?: Category;
    setSelectedSubscription: (subscription: Subscription | undefined) => void;
    selectedSubscription: Subscription | undefined;
    subscriptions: Subscription[];
    getDataSubscriptions: () => void;
}
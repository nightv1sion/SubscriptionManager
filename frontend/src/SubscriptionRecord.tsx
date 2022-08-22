import axios from "axios";
import { useState } from "react";
import { Modal } from "react-bootstrap";
import { Container, Row, Col, Button } from "react-bootstrap";
import EditingSubscription from "./EditingSubscription";
import { Subscription } from "./Interfaces";
import "./styles/SubscriptionRecord.css";

export default function SubscriptionRecord(props: subscriptionRecordProps){

     
    const dateToString = (date: Date) => {
        
        return `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`;
    }

    const differenceBetweenDates = (date: Date, date2: Date) => {
        let result = Math.trunc((date.getTime() - date2.getTime()) / (1000 * 60 * 60 * 24))
        return result < 0 ? 0 : result;
    }


    return <>
        <div onClick={() => props.setSelectedSubscription(props.subscription)} className = {props.selectedSubscription  ? "subscription--record subscription--selected--record" : "subscription--record"}>
            <Container fluid>
                <Row>
                    {props.subscription.created ? <Col sm = {2} className = "subscription--startdate">
                        <div className = "subscription--startdate-cont">
                            <div className = "subscription--title">START DATE</div>
                            <div className = "subscription--date">{dateToString(props.subscription.created)}</div>
                        </div>
                        </Col>
                        : <Col sm = {2}></Col> }
                    <Col sm = {8}>
                        <div className = "subscription--info">
                            <div className = "subscription--name">{props.subscription.name}</div>
                            <div className = "subscription--price"><span className = "dollar">$</span>{props.subscription.price}</div>
                            <div className = "subscription--additionalinfo">
                                <Row>
                                    {props.subscription.created ? <Col sm = {6}>
                                        <div className = "subscription--dayspassed">{differenceBetweenDates(new Date(Date.now()), props.subscription.created)} Days Passed</div>
                                    </Col> : <></>}
                                    {props.subscription.endsAt  ? <Col sm = {6}>
                                        <div className = "subscription-daysleft">{differenceBetweenDates(props.subscription.endsAt, new Date(Date.now()))} Days Left</div>
                                    </Col> : <></>}
                                </Row>
                            </div>
                        </div>
                    </Col>
                    
                            {props.subscription.endsAt ? <Col sm = {2} className = "subscription--enddate">
                                <div className = "subscription--enddate-cont">
                                    <div className = "subscription--title">END DATE</div>
                                    <div className = "subscription--date">{dateToString(props.subscription.endsAt)}</div>
                                </div>
                            </Col> : <></>}
                    
                </Row>
            </Container>
        </div>
    </>
}

interface subscriptionRecordProps {
    subscription: Subscription;
    getData: () => void;
    selectedSubscription: boolean;
    setSelectedSubscription: (subscription:Subscription | undefined) => void;
    index: number;
}
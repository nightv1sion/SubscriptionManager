import {Container, Row, Col} from "react-bootstrap";
import CategoryTable from "./CategoryTable";
import { Category, Subscription, SubscriptionDto } from "./Interfaces";
import SubscriptionTable from "./SubscriptionTable";
import "./styles/Main.css";
import MainLeftSide from "./MainLeftSide";
import MainContent from "./MainContent";
import { useState } from "react";
import EditingSubscription from "./EditingSubscription";
import axios from "axios";

export default function Main(props: homeProps){

    const [selectedSubscriptionForEdition, setSelectedSubscriptionForEdition] = useState<Subscription | undefined>(undefined);
    
    const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);

    const stringToDate = (date: string) => {
      if(date.includes("0001"))
        return undefined;
      let dateForReturn = new Date(date);
      return dateForReturn;
    }

    const dtoToSubscriptions = (dtos: SubscriptionDto[]) => {
      let subscriptions:Subscription[] = []; 
      for(let i = 0; i < dtos.length; i++){
        subscriptions.push({id: dtos[i].id, name: dtos[i].name, price: dtos[i].price, 
                            created: stringToDate(dtos[i].created), endsAt: stringToDate(dtos[i].endsAt), categoryId: dtos[i].categoryId});
      }
      return subscriptions;
    }

    const closeForm = () => setSelectedSubscriptionForEdition(undefined);

    const getDataSubscriptions = async () => {
        let uri:string = "" + process.env.REACT_APP_API;
        if(props.selectedCategory)
          uri += "categories/" + props.selectedCategory.id + "/subscriptions";
        else
          uri += "subscriptions";
        try {
          const response = await axios.get(uri);
          if(response.status != 200)
            throw new Error("Something went wrong when getting subscriptions from server");
          let data:SubscriptionDto[] = await response.data;
          setSubscriptions(dtoToSubscriptions(data));
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

    return <div className = "main--box">
      <Container fluid>
          <Row>
            <Col sm = {2} className = "main--leftside">
              <MainLeftSide selectedCategory = {props.selectedCategory} selectCategory = {props.selectCategory}/>
            </Col>
            <Col sm={selectedSubscriptionForEdition ? 8 : 10} className = "main--maincontent">
                <MainContent selectedSubscription={selectedSubscriptionForEdition} 
                getDataSubscriptions={getDataSubscriptions} subscriptions={subscriptions} 
                selectedCategory = {props.selectedCategory} setSelectedSubscription = {(subscription: Subscription | undefined) => { closeForm(); 
                setSelectedSubscriptionForEdition(subscription);}}/>
            </Col>
            {selectedSubscriptionForEdition ? <Col sm = {2}>
              <EditingSubscription subscription = {selectedSubscriptionForEdition} getData = {getDataSubscriptions} closeForm = {closeForm}/>
            </Col> : <></>}
          </Row>
        </Container>
    </div>
} 

interface homeProps {
    selectedCategory?: Category;
    selectCategory: (category?: Category) => void; 
}
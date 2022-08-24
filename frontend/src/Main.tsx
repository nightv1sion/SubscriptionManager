import {Container, Row, Col} from "react-bootstrap";
import CategoryTable from "./CategoryTable";
import { Category, Subscription, SubscriptionDto } from "./Interfaces";
import SubscriptionTable from "./SubscriptionTable";
import "./styles/Main.css";
import MainLeftSide from "./MainLeftSide";
import MainContent from "./MainContent";
import { useEffect, useState } from "react";
import EditingSubscription from "./EditingSubscription";
import axios from "axios";
import { useJwt } from "react-jwt";

const tokenNameId = `http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name`;

export default function Main(props: homeProps){
    
    let token = localStorage.getItem("token");

    const { decodedToken, isExpired, reEvaluateToken } = useJwt<any>(token !== null ? token : " ");

    const [selectedSubscriptionForEdition, setSelectedSubscriptionForEdition] = useState<Subscription | undefined>(undefined);
    
    const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
    
    const [categories, setCategories] = useState<Category[]>([]);


    console.log(decodedToken);

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
        if(isExpired)
          return;
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
            setSubscriptions([]);
        }
    }

    const getDataCategories = async () => {
      if(isExpired)
          return;
      const uri = process.env.REACT_APP_API + "categories";
  
      try {
          const response = await axios.get(uri);
          if(response.status != 200)
              throw new Error("Something went wrong when loading categories from server");
          let data = await response.data;
          
          setCategories(data);
  
      }
      catch(error: any) {
          console.log(error.message);
          setCategories([]);
      }
    }

    const updateAllData = async () => {
      closeForm();
      token = localStorage.getItem("token");
      reEvaluateToken(token !== null ? token : "");
    }

    useEffect(() => {
      const fetch = async () => {
        await getDataSubscriptions();
        await getDataCategories();
      }
      fetch();}, [decodedToken])

    return <div className = "main--box">
      <Container fluid>
          <Row>
            <Col sm = {2} className = "main--leftside">
              <MainLeftSide updateEverything = {updateAllData} categories = {categories} getData = {getDataCategories} userName = {isExpired == true ? undefined : (decodedToken ? decodedToken[tokenNameId] : undefined )} selectedCategory = {props.selectedCategory} selectCategory = {props.selectCategory}/>
            </Col>
            <Col sm={selectedSubscriptionForEdition ? 8 : 10} className = "main--maincontent">
                <MainContent userName = {isExpired == true ? undefined : (decodedToken ? decodedToken[tokenNameId] : undefined )} selectedSubscription={selectedSubscriptionForEdition} 
                getDataSubscriptions={getDataSubscriptions} subscriptions={subscriptions} 
                selectedCategory = {props.selectedCategory} setSelectedSubscription = {(subscription: Subscription | undefined) => { closeForm(); 
                setSelectedSubscriptionForEdition(subscription);}}/>
            </Col>
            {selectedSubscriptionForEdition ? <Col sm = {2} style = {{borderLeft: "1px solid rgba(0, 0, 0, 20%)"}}>
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
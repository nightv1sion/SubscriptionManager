import { Button, Modal } from "react-bootstrap";
import { useEffect, useState } from "react";
import { Category, Subscription, SubscriptionDto } from "./Interfaces";
import SubscriptionRecord from "./SubscriptionRecord";
import CreatingSubscription from "./CreatingSubscription";

export default function SubscriptionTable(props: taskTableProps){
    
    const [showFormForCreating, setShowFormForCreating] = useState<boolean>(false);
    
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

    const getDataSubscriptions = async () => {
        let uri:string = "" + process.env.REACT_APP_API;
        if(props.category)
          uri += "categories/" + props.category.id + "/subscriptions";
        else
          uri += "subscriptions";
        try {
          const response = await fetch(uri, {method: "GET", headers: {}});
          if(!response.ok)
            throw new Error("Something went wrong when getting subscriptions from server");
          let data:SubscriptionDto[] = await response.json();
          setSubscriptions(dtoToSubscriptions(data));
        }
        catch(err:any) {
          console.log(err.message);
        }
    }


    useEffect( () => { 
        const fetchData = async () => { await getDataSubscriptions() };
        fetchData();
     }, [props.category]);
    
    const handleOpenForm = () => {
        setShowFormForCreating(true);
    }

    const handleCloseForm = () => {
        setShowFormForCreating(false);
    }
    
    return <>
        <h3 style = {{"marginLeft": "40%"}}>Subscriptions ({props.category ? props.category.name : "All subscriptions"})</h3>
        <div style = {{height: "500px"}}>
        {subscriptions.map((value, index) => {
            return <SubscriptionRecord key = {index} subscription = {value} getData = {getDataSubscriptions}/>
        })}

        
        </div>
        { showFormForCreating ? <Modal show = {showFormForCreating} onHide = {handleCloseForm}>
                <Modal.Header>
                    <Modal.Title>New Subscription</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <CreatingSubscription category={props.category} closeForm={handleCloseForm} getData = {getDataSubscriptions} />
                </Modal.Body>
            </Modal>: <></>}
        <div style = {{margin: "auto", width: "25%"}}>
            <Button variant = "outline-primary" onClick = {handleOpenForm}>Create Subscription</Button>
        </div>
    </>
}

interface taskTableProps {
    category?: Category;
}
import { Category, Subscription } from "./Interfaces";
import "./styles/MainContent.css";
import SubscriptionTable from "./SubscriptionTable";
export default function MainContent(props: mainContentProps){
    return <>
        <div className = "maincontent">
            {props.selectedCategory ? <div className = "maincontent--selectedCategory">{props.selectedCategory.name}</div> : <div className = "maincontent--selectedCategory">Uncategorized</div>}
            <div className = "new--category"></div>
            <div>
                <SubscriptionTable selectedSubscription = {props.selectedSubscription} getDataSubscriptions={props.getDataSubscriptions}
                 subscriptions = {props.subscriptions} setSelectedSubscription = {(subscription: Subscription | undefined ) => props.setSelectedSubscription(subscription)} 
                 category = {props.selectedCategory}/>
            </div>  
        </div>
    </>
}

interface mainContentProps {
    selectedCategory?: Category;
    setSelectedSubscription: (subscription: Subscription | undefined) => void;
    subscriptions: Subscription[];
    getDataSubscriptions: () => void;
    selectedSubscription: Subscription | undefined;
}
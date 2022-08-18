import {Container, Row, Col} from "react-bootstrap";
import CategoryTable from "./CategoryTable";
import { Category } from "./Interfaces";
import SubscriptionTable from "./SubscriptionTable";
export default function Home(props: homeProps){
    return <Container fluid>
          <Row>
            <Col sm={9}><SubscriptionTable category = {props.selectedCategory ? props.selectedCategory : undefined}/></Col>
            <Col sm={3}><CategoryTable setSelectedCategory = {props.selectCategory} /></Col>
          </Row>
        </Container>
} 

interface homeProps {
    selectedCategory?: Category;
    selectCategory: (category?: Category) => void; 
}
import UserLogin from "./UserLogin";
import "./styles/MainLeftSide.css";
import CategoryTable from "./CategoryTable";
import { Category } from "./Interfaces";
import UserProfile from "./UserProfile";
export default function MainLeftSide(props: mainLeftSideProps){

    return (
        <>
            {props.userName ? <UserProfile updateEverything = {props.updateEverything} userName={props.userName} /> : <UserLogin /> }
            <div>
                <CategoryTable userName = {props.userName} getDataCategories = {props.getData} categories={props.categories} setSelectedCategory={props.selectCategory}/>
            </div>
        </>
    )
}

interface mainLeftSideProps {
    selectedCategory?: Category;
    selectCategory: (category?: Category) => void; 
    userName: string | undefined;
    categories: Category[];
    getData: () => void;
    updateEverything: () => void;
}
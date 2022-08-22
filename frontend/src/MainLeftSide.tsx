import UserProfile from "./UserProfile";
import "./styles/MainLeftSide.css";
import CategoryTable from "./CategoryTable";
import { Category } from "./Interfaces";
export default function MainLeftSide(props: mainLeftSideProps){
    return (
        <>
            <div className = "user--profile">
                <UserProfile /> 
            </div>
            <div>
                <CategoryTable setSelectedCategory={props.selectCategory}/>
            </div>
        </>
    )
}

interface mainLeftSideProps {
    selectedCategory?: Category;
    selectCategory: (category?: Category) => void; 
}
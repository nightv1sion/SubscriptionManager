import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import CategoryRecord from "./CategoryRecord";
import EditingCategory from "./EditingCategory";
import { Category } from "./Interfaces";
import NewCategoryRecord from "./NewCategoryRecord";
import "./styles/CategoryTable.css";
import FieldForCreation from "./FieldForCreation";
import CategoryRecordWithoutOperations from "./CategoryRecordWithoutOperations";

export default function CategoryTable(props: categoryTableProps){
    
    const [isCategoryEditing, setIsCategoryEditing] = useState<boolean[]>(new Array(props.categories.length).fill(false));

    const [isCategorySelected, setIsCategorySelected] = useState<boolean[]>(new Array(props.categories.length).fill(false));
    
    const [nameOfNewCategory, setNameOfNewCategory] = useState<string | undefined>(undefined);
    
    

    const PostNewCategory = async () => {
        const uri = process.env.REACT_APP_API + "categories";
        try {
            const response = await axios.post(uri, {name: nameOfNewCategory});
            if(response.status != 201)
                throw new Error("Something went wrong when posting new category to server");
            }
            catch(error:any){
                if(error.request)
                    console.log(error.request)
                if(error.response)
                    console.log(error.response);
                if(error.message)
                    console.log(error.message);
        }
    }

    const updateData = async (name: string, index: number) => {
        const uri = process.env.REACT_APP_API + "categories/" + props.categories[index].id;
        try {
            const response = await axios.put(uri, {id: props.categories[index].id, name: name});
            if(response.status != 204)
                throw new Error("Something went wrong when editing category");
        }
        catch(error: any){
            if(error.request)
                    console.log(error.request)
                if(error.response)
                    console.log(error.response);
                if(error.message)
                    console.log(error.message);
        }
    } 

    const DeleteData = async (index: number) => {
        const uri = process.env.REACT_APP_API + "categories/" + props.categories[index].id;
        try {
            const response = await axios.delete(uri);
            if(response.status != 204)
                throw new Error("Something went wrong when deleting category");
        }
        catch(error: any){
            if(error.request)
                    console.log(error.request)
                if(error.response)
                    console.log(error.response);
                if(error.message)
                    console.log(error.message);
        }
    }

    const handleCategoryText = (text: string) => {
        setNameOfNewCategory(text);
    }

    const handleCreateCategory = async () => {
        setNameOfNewCategory(undefined);
        await PostNewCategory();
        await props.getDataCategories();
    }

    const handleEditCategory = (index: number) => {
        let arr = new Array().fill(isCategoryEditing.length);
        arr[index] = true;
        setIsCategoryEditing(arr);
    }
            

    const confirmEditCategory = async (name: string, index: number) => {
        breakEditCategory(index);
        await updateData(name, index);
        await props.getDataCategories();
    }

    const breakEditCategory = (index: number) => {
        let array = new Array().fill(isCategoryEditing.length);
        array[index] = false;
        setIsCategoryEditing(array);
    }

    const breakCreatingCategory = () => {
        setNameOfNewCategory(undefined);
    }

    const handleDeleteCategory = async (index:number) => {
        await DeleteData(index);
        selectCategory(-1);
        await props.getDataCategories();
    }    

    const selectCategory = (index: number) => {
        
        const array = new Array(isCategorySelected.length).fill(false);
        if(index == -1)
        {
            setIsCategorySelected(array)
            props.setSelectedCategory(undefined);
            return;
        }
        array[index] = true; 
        setIsCategorySelected(array);
        props.setSelectedCategory(props.categories[index]);
    }

    useEffect(() => { 
        const fetchData = async() => { await props.getDataCategories()}; 
        fetchData();
    }, []);

    return <>
        <div>
            <FieldForCreation userName = {props.userName} placeholder = {"Add a new category"} handleCreation={handleCreateCategory} handleText={handleCategoryText} breakCreation = {breakCreatingCategory}/>
        </div>
        {props.userName ? 
        <div className = "category--table">
            
            <div className = "">
                {props.categories.map((c, index) => 
                    isCategoryEditing[index] ? <EditingCategory key = {index} confirmEdit={confirmEditCategory} name = {c.name} index = {index} breakEditing = {breakEditCategory}/> 
                    : isCategorySelected[index] == true ? 
                        <CategoryRecord isSelected = {true} setSelectedCategory={selectCategory} key = {index} index = {index} categoryName = {c.name} handleEditCategory = {handleEditCategory} handleDeleteCategory = {handleDeleteCategory}/>
                        : <CategoryRecord setSelectedCategory={selectCategory} key = {index} index = {index} categoryName = {c.name} handleEditCategory = {handleEditCategory} handleDeleteCategory = {handleDeleteCategory}/> 
                )}
            </div>
            
            <div>
                {isCategorySelected.findIndex(c => c == true) == -1 ?  
                    <CategoryRecordWithoutOperations isSelected = {true} setSelectedCategory={() => selectCategory(-1)} index = {-1} categoryName = {"Uncategorized"}/> :
                     <CategoryRecordWithoutOperations setSelectedCategory={() => selectCategory(-1)} index = {-1} categoryName = {"Uncategorized"}/>
                }
            </div>
            { nameOfNewCategory ? <NewCategoryRecord categoryName={nameOfNewCategory} /> : <></>}
        </div>
         : <div className="category--empty--image--div"><img src = "empty.png" className = "empty--image"/>
         <div className = "category--empty--text">It is empty</div><div className = "category--empty--text">Because you are not signed in</div></div> }

    </>
}

interface categoryTableProps {
    categories: Category[];
    getDataCategories: () => void;
    setSelectedCategory: (category: Category | undefined) => void;
    userName: string | undefined;
}
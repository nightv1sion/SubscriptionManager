import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import CategoryRecord from "./CategoryRecord";
import CreateCategoryField from "./CreateCategoryField";
import EditingCategory from "./EditingCategory";
import { Category } from "./Interfaces";
import SearchField from "./SearchField";

export default function CategoryTable(props: categoryTableProps){
    
    const [categories, setCategories] = useState<Category[]>([]);

    const [isCategoryEditing, setIsCategoryEditing] = useState<boolean[]>(new Array(categories.length).fill(false));

    const [isCategorySelected, setIsCategorySelected] = useState<boolean[]>(new Array(categories.length).fill(false));
    
    const [nameOfNewCategory, setNameOfNewCategory] = useState<string | undefined>(undefined);
    
    const getDataCategories = async () => {
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
        }
      }

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
        const uri = process.env.REACT_APP_API + "categories/" + categories[index].id;
        try {
            const response = await axios.put(uri, {id: categories[index].id, name: name});
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
        const uri = process.env.REACT_APP_API + "categories/" + categories[index].id;
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
        await getDataCategories();
    }

    const handleEditCategory = (index: number) => {
        let arr = new Array().fill(isCategoryEditing.length);
        arr[index] = true;
        setIsCategoryEditing(arr);
    }
            

    const confirmEditCategory = async (name: string, index: number) => {
        breakEditCategory(index);
        await updateData(name, index);
        await getDataCategories();
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
        await getDataCategories();
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
        props.setSelectedCategory(categories[index]);
    }

    useEffect(() => { 
        const fetchData = async() => { await getDataCategories()}; 
        fetchData();
    }, []);

    return <>
        <h3 style = {{"marginLeft": "20%"}}>Categories</h3>
        <div className = "w-100 m-auto text-center" style = {{"height": "500px"}}>
            <div className = "">
                {categories.map((c, index) => 
                    isCategoryEditing[index] ? <EditingCategory key = {index} confirmEdit={confirmEditCategory} name = {c.name} index = {index} breakEditing = {breakEditCategory}/> 
                    : isCategorySelected[index] == true ? 
                        <CategoryRecord style = {{backgroundColor: "#17a2b8", color: "white"}} setSelectedCategory={selectCategory} key = {index} index = {index} categoryName = {c.name} handleEditCategory = {handleEditCategory} handleDeleteCategory = {handleDeleteCategory}/>
                        : <CategoryRecord setSelectedCategory={selectCategory} key = {index} index = {index} categoryName = {c.name} handleEditCategory = {handleEditCategory} handleDeleteCategory = {handleDeleteCategory}/> 
                )}
            </div>
            
            <div style = {{"margin": "5% 0 0 0", "textAlign": "start"}}>
                {isCategorySelected.findIndex(c => c == true) == -1 ?  <Button  style = {{"width" : "67%", backgroundColor: "#ffc107", color: "white"}} variant = "outline-warning" onClick = {() => selectCategory(-1)}>
                    All subscriptions
                </Button> :  <Button  style = {{"width" : "67%"}} variant = "outline-warning" onClick = {() => selectCategory(-1)}>
                    All subscriptions
                </Button> }
                
            </div>
            
            { nameOfNewCategory ? <div style={{"margin": "5% 0 0 0", "textAlign": "start"}}><Button style = {{"width" : "67%"}} variant = "outline-success">{nameOfNewCategory}</Button></div> : <></>}
            
        </div>
        <div style={{"width": "68%"}}>
            <CreateCategoryField handleCreateCategory={handleCreateCategory} handleNewCategoryText={handleCategoryText} breakCreatingCategory = {breakCreatingCategory}/>
        </div>
    </>
}

interface categoryTableProps {
    setSelectedCategory: (category: Category | undefined) => void;
}
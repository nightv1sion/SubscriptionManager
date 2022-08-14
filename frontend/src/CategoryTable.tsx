import { useEffect, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import CategoryRecord from "./CategoryRecord";
import CreateCategoryField from "./CreateCategoryField";
import EditingCategory from "./EditingCategory";
import { Category } from "./Interfaces";
import SearchField from "./SearchField";

export default function CategoryTable(){
    
    const [categories, setCategories] = useState<Category[]>([]);

    const [isCategoryEditing, setIsCategoryEditing] = useState<boolean[]>([]);
    
    const [nameOfNewCategory, setNameOfNewCategory] = useState<string | undefined>(undefined);
    
    const getData = async () => {
        const uri = process.env.REACT_APP_API + "categories";

        try {
            const response = await fetch(uri, { method: "GET", headers: {} })
            if(!response.ok)
                throw new Error("Something went wrong when loading categories from server");
            let data = await response.json();
            setCategories(data);
        }
        catch(error: any) {
            console.log(error.message);
        }
        setIsCategoryEditing(new Array(categories.length).fill(false));
    }

    const PostNewCategory = async () => {
        const uri = process.env.REACT_APP_API + "categories";
        try {
            const response = await fetch(uri, {method: "POST", headers: {"Content-Type": "application/json"}, body: JSON.stringify({name: nameOfNewCategory})});
            if(!response.ok)
                throw new Error("Something went wrong when posting new category to server");
            }
            catch(error:any){
            console.log(error.message);
        }
    }

    const updateData = async (name: string, index: number) => {
        const uri = process.env.REACT_APP_API + "categories/" + categories[index].id;
        try {
            const response = await fetch(uri, {method: "PUT", headers: {"Content-Type": "application/json"}, body: JSON.stringify({id: categories[index].id, name: name})});
            if(!response.ok)
                throw new Error("Something went wrong when editing category");
        }
        catch(error: any){
            console.log(error.message);
        }
    } 

    const DeleteData = async (index: number) => {
        const uri = process.env.REACT_APP_API + "categories/" + categories[index].id;
        try {
            const response = await fetch(uri, {method: "DELETE", headers: {}});
            if(!response.ok)
                throw new Error("Something went wrong when deleting category");
        }
        catch(error: any){
            console.log(error.message);
        }
    }

    const handleCategoryText = (text: string) => {
        setNameOfNewCategory(text);
    }

    const handleCreateCategory = async () => {
        setNameOfNewCategory(undefined);
        await PostNewCategory();
        await getData();
    }

    const handleEditCategory = (index: number) => {
        let arr = new Array().fill(isCategoryEditing.length);
        arr[index] = true;
        setIsCategoryEditing(arr);
    }
            

    const confirmEditCategory = async (name: string, index: number) => {
        await updateData(name, index);
        await getData();
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
        await getData();
    }    


    useEffect(() => { getData(); }, []);

    return <>
        <h3 style = {{"marginLeft": "20%"}}>Categories</h3>
        <div className = "m-auto w-100">
            <SearchField style = {{"width" : "67%"}}/>
        </div>
        <div className = "w-100 m-auto text-center" style = {{"height": "500px"}}>
            <div className = "">
                {categories.map((c, index) => 
                    isCategoryEditing[index] ? <EditingCategory key = {index} confirmEdit={confirmEditCategory} name = {c.name} index = {index} breakEditing = {breakEditCategory}/> 
                    : <CategoryRecord key = {index} index = {index} categoryName = {c.name} handleEditCategory = {handleEditCategory} handleDeleteCategory = {handleDeleteCategory}/> 
                )}
            </div>
            
            <div style = {{"margin": "5% 0 0 0", "textAlign": "start"}}>
                <Button  style = {{"width" : "67%",}} variant = "outline-warning">
                    All tasks
                </Button>
            </div>
            
            { nameOfNewCategory ? <div style={{"margin": "5% 0 0 0", "textAlign": "start"}}><Button style = {{"width" : "67%"}} variant = "outline-success">{nameOfNewCategory}</Button></div> : <></>}
            
        </div>
        <div style={{"width": "68%"}}>
            <CreateCategoryField handleCreateCategory={handleCreateCategory} handleNewCategoryText={handleCategoryText} breakCreatingCategory = {breakCreatingCategory}/>
        </div>
    </>
}
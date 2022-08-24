import { Subscription, SubscriptionForEditDto } from "./Interfaces"
import * as Yup from "yup";
import { useFormik } from "formik";
import { Button } from "react-bootstrap";
import axios from "axios";
import { useEffect } from "react";
import "./styles/EditingSubscription.css"


export default function EditingCategory(props: editingCategoryProps){
    
    const handleOnSubmit = async (values: SubscriptionForEditDto) => {
        props.closeForm();
        let createdDate  = undefined;
        if(values.created)
        {
            createdDate = new Date(values.created);
        }

        let endsAt = undefined;
        if(values.endsAt)
        {
            endsAt = new Date(values.endsAt);
        }

        const result = { id: props.subscription.id, name: values.name, price: values.price, 
            created: createdDate, endsAt: endsAt, categoryId: props.subscription.categoryId}
        
        await putData(result);
        await props.getData();
    }

    const dateToString = (date: Date | undefined) => {
        if(date == undefined)
            return undefined;
        const year = date.getFullYear();
        const month = date.getMonth();
        const day = date.getDate();
        const strForReturn = `${year}-${("0" + (month + 1)).slice(-2)}-${("0" + (day)).slice(-2)}`;
        return strForReturn;
    }

    const validationSchema = Yup.object().shape({
        name: Yup.string().required(),
        price: Yup.number().required().test((value:any) => value >= 0)
    });

    let initialValues:SubscriptionForEditDto = { name: props.subscription.name, price: props.subscription.price, 
        created: dateToString(props.subscription.created), endsAt: dateToString(props.subscription.endsAt), categoryId: props.subscription.categoryId};


    const formik = useFormik({initialValues: initialValues, validationSchema: validationSchema, onSubmit: handleOnSubmit, enableReinitialize: true});

    const updateInitialValues = () => {
        formik.setValues({ name: props.subscription.name, price: props.subscription.price, 
            created: props.subscription.created ? dateToString(props.subscription.created) : undefined, endsAt: props.subscription.endsAt ? dateToString(props.subscription.endsAt) : undefined, categoryId: props.subscription.categoryId});

        if(!props.subscription.created)
            formik.values.created = undefined;
        if(!props.subscription.endsAt)
            formik.values.endsAt = undefined;

    }

    useEffect(() => {updateInitialValues();}, [props.subscription]);

    const putData = async (values:Subscription) => {
        const uri = process.env.REACT_APP_API + "subscriptions/" + props.subscription.id;
        try {
            const response = await axios.put(uri, values);
            if(response.status != 204)
                throw new Error("Something when wrong when updating subscription");
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

    const deleteSubscription = async () => {
        const uri = process.env.REACT_APP_API + "subscriptions/" + props.subscription.id;
        try {
            const response = await axios.delete(uri);
            if(response.status != 204)
                throw new Error("Something went wrong when deleting subscription");
        }
        catch(error:any) {
            if(error.request)
                console.log(error.request)
            if(error.response)
                console.log(error.response);
            if(error.message)
                console.log(error.message);
        }
        await props.getData();

    }

    const handleDelete = async () => {
        props.closeForm();
        await deleteSubscription();
        
    }



    return <>
            <div className = "edit--subscription--closemark"><a type="button" onClick = {props.closeForm}>❌</a></div>
            <div className = "edit--subscription--name">{props.subscription.name}</div>
        <div className = "edit--subscription">
            <form  onSubmit = {formik.handleSubmit}>
                <div className = "creating-form">
                    <div>
                        {formik.errors["name"] ? <label htmlFor = "name" className = "text-danger">Name is required</label> : <label htmlFor = "name">Name</label>}
                        <input id="name" name = "name" className = "form-control" placeholder = "Name" value = {formik.values.name} onChange = {formik.handleChange}/>
                    </div>
                    <div>
                        {formik.errors["price"] ? <label htmlFor = "price" className = "text-danger">Price is required</label> : <label htmlFor = "price">Price</label>}
                        <input id="price" name = "price" type = "number" className = "form-control" placeholder = "Price" value = {formik.values.price} onChange={formik.handleChange}/>
                    </div>
                    <div>
                        <label htmlFor = "Begins from">Begins From</label>
                        <input id="created" name="created" type="date" className = "form-control" placeholder = "Begins from" onChange = {formik.handleChange} value = {formik.values.created}/>
                    </div>
                    <div>
                        <label htmlFor = "Ends At">Ends At</label>
                        <input id="endsAt" name= "endsAt" type="date" className = "form-control" placeholder = "Ends at" value = {formik.values.endsAt} onChange = {formik.handleChange}/>
                    </div>
                </div>
                <div className = "text-center mt-2" >
                    <Button type="submit" variant = "outline-primary" disabled = {!formik.isValid}>Save</Button>
                    
                </div>
                <div className = "text-center mt-2">
                    <Button variant="outline-danger" onClick = {handleDelete}>Delete</Button>
                </div>
            </form>

        </div>
    </>
}

interface editingCategoryProps {
    subscription: Subscription;
    getData: () => void;
    closeForm: () => void;
}
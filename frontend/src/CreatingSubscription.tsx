import { useFormik } from "formik";
import { Button } from "react-bootstrap";
import './CreatingSubscription.css';
import * as Yup from "yup";
import React, { useState } from "react";
import { Category, SubscriptionForCreateDto } from "./Interfaces";
import axios from "axios";
export default function CreatingSubscription(props: creatingSubscriptionProps){
    
    const initialValues:SubscriptionForCreateDto = {name: "", price: 0, created: undefined, endsAt: undefined};

    const postData = async (subscription: SubscriptionForCreateDto) => {
        const uri = process.env.REACT_APP_API + "subscriptions";
        if(props.category)
            subscription.categoryId = props.category.id;
        try {
            const response = await axios.post(uri, subscription);
            if(response.status != 201)
                throw new Error("Something went wrong when creating a new subscription");
            
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



    const validationSchema = Yup.object().shape({
        name: Yup.string().required(),
        price: Yup.number().required().test((value:any) => value >= 0)
    });

    const handleCreatedDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        formik.values["created"] = new Date(event.target.value);
    }

    const handleEndsAtDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        formik.values["endsAt"] = new Date(event.target.value);
    }

    const handleOnSubmit = async (values: any) => {
        console.log(values);
        props.closeForm();
        await postData(values);
        await props.getData();
    }

    const formik = useFormik({initialValues: initialValues, onSubmit: handleOnSubmit, validationSchema: validationSchema}); 

    return <>
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
                        <input id="created" name="created" type="date" className = "form-control" placeholder = "Begins from" onChange={handleCreatedDateChange}/>
                    </div>
                    <div>
                        <label htmlFor = "Ends At">Ends At</label>
                        <input id="endsAt" name= "endsAt" type="date" className = "form-control" placeholder = "Ends at" onChange = {handleEndsAtDateChange}/>
                    </div>
                </div>
                <div className = "text-center mt-2" >
                    <Button type="submit" variant = "outline-primary" disabled = {!formik.isValid}>Create</Button>
                </div>
            </form>
        </>
}

interface creatingSubscriptionProps {
    getData: () => void;
    closeForm: () => void;
    category?: Category;
}
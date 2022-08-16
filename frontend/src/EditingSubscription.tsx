import { Subscription, SubscriptionForEditDto } from "./Interfaces"
import * as Yup from "yup";
import { useFormik } from "formik";
import { Button } from "react-bootstrap";
export default function EditingCategory(props: editingCategoryProps){
    

    const putData = async (values:SubscriptionForEditDto) => {
        const uri = process.env.REACT_APP_API + "subscriptions/" + props.subscription.id;
        console.log(values);
        try {
            const response = await fetch(uri, {method: "PUT", headers: {"Content-Type": "application/json"}, body: JSON.stringify(values)});
            if(!response.ok)
                throw new Error("Something when wrong when updating subscription");
        }
        catch(err:any){
            console.log(err.message);
        }
    }

    const initialValues:SubscriptionForEditDto = { name: props.subscription.name, price: props.subscription.price, 
        created: props.subscription.created, endsAt: props.subscription.endsAt, categoryId: props.subscription.categoryId};

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

    const dateToString = (date: Date | undefined) => {
        if(!date)
            return undefined;
        const year = date.getFullYear();
        const month = date.getMonth();
        const day = date.getDate();
        const strForReturn = `${date.getFullYear()}-${("0" + month).slice(-2)}-${("0" + day).slice(-2)}`;
        return strForReturn;
    }

    const handleOnSubmit = async (values: SubscriptionForEditDto) => {
        props.closeForm();
        await putData(values);
        await props.getData();
    }

    const formik = useFormik({initialValues: initialValues, validationSchema: validationSchema, onSubmit: handleOnSubmit});

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
                        <input id="created" name="created" type="date" className = "form-control" placeholder = "Begins from" onChange={handleCreatedDateChange} value = {dateToString(formik.values.created)}/>
                    </div>
                    <div>
                        <label htmlFor = "Ends At">Ends At</label>
                        <input id="endsAt" name= "endsAt" type="date" className = "form-control" placeholder = "Ends at" onChange = {handleEndsAtDateChange} value = {dateToString(formik.values.endsAt)}/>
                    </div>
                </div>
                <div className = "text-center mt-2" >
                    <Button type="submit" variant = "outline-primary" disabled = {!formik.isValid}>Edit</Button>
                </div>
            </form>
    </>
}

interface editingCategoryProps {
    subscription: Subscription;
    getData: () => void;
    closeForm: () => void;
}
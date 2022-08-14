export default function SearchField(props: searchFieldProps){
    return <>
        <input className = {"form-control " + props.className} style = {props.style} placeholder = "Search"/>
    </>
} 

interface searchFieldProps {
    className?: string;
    style?: object;
}
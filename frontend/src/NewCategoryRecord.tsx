import "./styles/CategoryRecord.css";

export default function NewCategoryRecord(props: newCategoryRecordProps){
    return <div className = "categoryrecord--box">
                <a href = "#" onClick = {(event) => event.preventDefault()}>
                    <div className = "category--name">
                        <p>{props.categoryName}</p>
                    </div>
                </a>
            </div>
}

interface newCategoryRecordProps {
    categoryName: string;
}
import { Dropdown } from "react-bootstrap";
import "./styles/UserProfile.css";
import { setAuthToken } from "./Authentication";

export default function UserProfile(props: userProfileProps){
    return <> 
        <div className = "user--profile--div">
            <Dropdown>
                <Dropdown.Toggle id="dropdown-basic" variant="none">
                    <span className = "user--profile">
                    👤 {props.userName}
                    </span>
                </Dropdown.Toggle>
                <Dropdown.Menu>
                    <Dropdown.Item onClick = {() => {setAuthToken(undefined); localStorage.setItem("token", " "); props.updateEverything();}}>
                        {/* <a >Sign Out</a> */}
                        Sign Out
                    </Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
        </div>
    </>
    
    
}

interface userProfileProps {
    userName: string;
    updateEverything: () => void; 
}
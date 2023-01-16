
import {Link} from "react-router-dom"
const Navigation=({userObj})=>{

    return (
        <nav>
            <ul>
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/Profile">{userObj.displayName}의 Profiledd</Link>
                </li>
            </ul>
            
        </nav>
    );
}

export default Navigation;
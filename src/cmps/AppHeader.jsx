import { Link } from "react-router-dom";

export default function AppHeader() {
    return (
        <Link to={'/'} className='header'>
            <h1 className="header-title">&lt;/&gt; ONLINE CODING APP</h1>
        </Link>
    );
}

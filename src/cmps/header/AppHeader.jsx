import { Link } from "react-router-dom";
import SearchBar from './SearchBar';

export default function AppHeader() {
    return (
        <header className='header'>
            <Link to={'/'} className='header-title'>
                &lt;/&gt; ONLINE CODING APP
            </Link>
            <div className="search-bar-container">
                <SearchBar />
            </div>
        </header>
    );
}
import { Link, useLocation } from "react-router-dom";
import SearchBar from './SearchBar';

export default function AppHeader() {
    const location = useLocation();
    const isHomePage = location.pathname === '/';

    return (
        <header className='header'>
            <Link to={'/'} className='header-title'>
                &lt;/&gt; ONLINE CODING APP
            </Link>
            {isHomePage && (
                <div className="search-bar-container">
                    <SearchBar />
                </div>
            )}
        </header>
    );
}
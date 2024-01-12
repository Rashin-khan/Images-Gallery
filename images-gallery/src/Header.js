import { useState } from 'react';
import './App.css';

const Header = () => {
    const [searchQuery, setSearchQuery] = useState('');

    const handleChange = (e) => {
        setSearchQuery(e.target.value);
    }

    return (
        <div className="">
            <header className="App-header">
                <div className='right-side'>Image Gallery</div>
            <div className='field'>
                <input type='text' placeholder='Enter your search query' value={searchQuery} onChange={handleChange}/>
            </div>
            </header>
        </div>
      );
}

export default Header;

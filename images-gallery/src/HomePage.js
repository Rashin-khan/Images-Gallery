import { useEffect, useState } from 'react';
import './App.css';
import getImagesList, { searchList } from './components/CallApi';

const HomePage = () => {
    const [listOfImages, setListOfImages] = useState([]);
    const [pageNo, setPageNo] = useState(1);
    const [loading, setLoading] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    const handleChange = (e) => {
        setSearchQuery(e.target.value);
    }

    const getList = async() => {
        setLoading(true);
        const res = await getImagesList(pageNo, searchQuery);
        setListOfImages(res);
        setLoading(false);
    }

    const handleSearch = async() => {
        setLoading(true);
        const res = await searchList(pageNo, searchQuery);
        setListOfImages(res);
        setLoading(false);
    }
    
    useEffect(() => {
        getList();
    },[pageNo])

    useEffect(() => {
        if(searchQuery && searchQuery !== '' && searchQuery!== null) {
            handleSearch();
        }
    }, [pageNo, searchQuery])

    const handleNextPage = (type) => {
        if(type === 'inc') {
            setPageNo((prevValue) => prevValue + 1); 
        } else if(pageNo > 1) {
            setPageNo((prevValue) => prevValue - 1); 
        } 
    }

    return (
        <div className="">
            <div className='field'>
                <input type='text' placeholder='Enter your search query' value={searchQuery} onChange={handleChange}/>
                <button className='button' onClick={() => {setPageNo(1);handleSearch()}}>Search</button>
            </div>
            {loading ? <div>Loading....</div> : null}
            {!loading && listOfImages?.map((items, index) => (
                <img src={items.urls.thumb} key={index}/>
            ))}
            <button onClick={() => handleNextPage('inc')}>Next</button>
            <button onClick={() => handleNextPage('dec')}>Preview</button>
        </div>
      );
}

export default HomePage;

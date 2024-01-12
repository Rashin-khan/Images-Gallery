import { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import getImagesList from './components/CallApi';

const HomePage = () => {
    const [listOfImages, setListOfImages] = useState([]);
    const [pageNo, setPageNo] = useState(1);
    const [loading, setLoading] = useState(false);

    const getList = async() => {
        setLoading(true);
        const res = await getImagesList(pageNo);
        setListOfImages(res);
        setLoading(false);
    }
    
    useEffect(() => {
        getList();
    }, [])

    const handleNextPage = () => {
        setPageNo(pageNo+1);
        getList(pageNo)
    }

    return (
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <p>
              Edit <code>src/App.js</code> and save to reload.
            </p>
            {loading ? <div>Loading....</div> : null}
            {!loading && listOfImages?.map((items, index) => (
                <img src={items.urls.thumb} key={index}/>
            ))}
            <button onClick={handleNextPage}>Next</button>
          </header>
        </div>
      );
}

export default HomePage;

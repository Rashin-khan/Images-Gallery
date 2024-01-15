import { useEffect, useState } from 'react';
import './App.css';
import getImagesList, { searchList, likePhoto } from './components/CallApi';
import { Grid, Box, Button, Flex, AspectRatio } from '@radix-ui/themes';

const HomePage = () => {
    const [listOfImages, setListOfImages] = useState([]);
    const [pageNo, setPageNo] = useState(1);
    const [loading, setLoading] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    const handleChange = (e) => {
        setSearchQuery(e.target.value);
    }

    const getList = async(type) => {
        setLoading(true);
        const res = type === 'search' ? await searchList(pageNo, searchQuery) : await getImagesList(pageNo, searchQuery);
        setListOfImages(res);
        setLoading(false);
    }

    const handleLike = async(id, likeUnlike) => {
        const apiMethod = likeUnlike ? 'delete' : 'post'
        await likePhoto(id, apiMethod);
        getList();
    }
    
    useEffect(() => {
        getList();
    },[pageNo])

    useEffect(() => {
        if(searchQuery && searchQuery !== '' && searchQuery!== null) {
            getList('search');
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
                <Flex align="center" gap="5" display="inline-flex" justify="center">
                    <Button size="3" className='button' onClick={() => {setPageNo(1);getList('search')}}>Search</Button>
                </Flex>
            </div>
            {loading ? <div>Loading....</div> : null}
            <Grid columns="4" gap="4" width="auto" display="inline-grid">
                {!loading && listOfImages?.map((items, index) => (
                    <Box display="inline-block">
                        <img src={items.urls.thumb} />
                        <button onClick={() => handleLike(items.id, items.liked_by_user)} className='btn'>{items.liked_by_user ? 'LIKE' : 'UNLIKE'}</button>
                    </Box>

                ))}
            </Grid>
            <div className='container'>
            <Flex align="center" gap="5" display="inline-flex" justify="center">
                <Button size="3" mb="3" onClick={() => handleNextPage('inc')}>Next</Button>
                <Button size="3" mb="3" onClick={() => handleNextPage('dec')}>Preview</Button>
            </Flex>
            </div>
        </div>
      );
}

export default HomePage;

import { useEffect, useState } from 'react';
import './App.css';
import getImagesList, { searchList, likePhoto } from './components/CallApi';
import { Grid, Button, Flex, Avatar, Em, Text } from '@radix-ui/themes';
import { MagnifyingGlassIcon } from '@radix-ui/react-icons'

const HomePage = ({isLikedPhotos, browserWidth}) => {
    const [listOfImages, setListOfImages] = useState([]);
    const [pageNo, setPageNo] = useState(1);
    const [loading, setLoading] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    const handleChange = (e) => {
        setSearchQuery(e.target.value);
        if(e.target.value === '') {
            getList();
        }
    }

    const getList = async(type) => {
        setLoading(true);
        const res = type === 'search' ? await searchList(pageNo, searchQuery) : await getImagesList(pageNo, isLikedPhotos);
        setListOfImages(res)
        setLoading(false);
    }

    const handleLike = async(id, likeUnlike) => {
        const apiMethod = likeUnlike ? 'delete' : 'post'
        await likePhoto(id, apiMethod);
        getList();
    }
    
    useEffect(() => {
        getList();
        return(() => {setListOfImages([])})
    },[pageNo])

    const handleNextPage = (type) => {
        if(type === 'inc' && listOfImages?.length === 8) {
            setPageNo((prevValue) => prevValue + 1); 
        } else if(pageNo > 1) {
            setPageNo((prevValue) => prevValue - 1); 
        } 
    }

    return (
        <div className="mb-2">
            {!isLikedPhotos && <div className='field'>
                <MagnifyingGlassIcon width="20" height="22" className='icon'/>
                <input type='text' placeholder='Enter your search query' value={searchQuery} onChange={handleChange}/>
                <Flex align="center" gap="5" display="inline-flex" justify="center">
                    <Button size="3" className='btn' onClick={() => {setPageNo(1);getList('search')}}>Search</Button>
                </Flex>
            </div>}

            {loading ? <div>Loading....</div> : null}

            <Grid columns={browserWidth >= 768 ? "4" : '2'} gap="4" width="auto" display="inline-grid" style={{'margin-top': '50px'}}>
                {!loading && listOfImages?.map((items, index) => (
                    isLikedPhotos ? items.liked_by_user ? 
                        <Flex position="relative" align="center" gap="4">
                            <Avatar
                                size="9"
                                src={items.urls.thumb}
                                fallback="Alt"
                            />
                        </Flex> : null :
                        <div class="gallery" key={index}>
                          <img src={items.urls.thumb} alt="Cinque Terre" width="600px" height="600" />
                          <button onClick={() => handleLike(items.id, items.liked_by_user)} className='btn'>{items.liked_by_user ? 'UNLIKE' : 'LIKE'}</button>
                      </div>
                ))
                }
            </Grid>
            {listOfImages?.length === 0 && <Text size="8" weight="bold" className="center">
                    <Em style={{'color': '#202020', 'padding': '4px 4px 0px 13px'}}>No Images Found! Try again later or Go back</Em>
                </Text>}

            {listOfImages?.length>0 && <div className='bottom-container'>
            <Flex align="center" gap="5" display="inline-flex" justify="center">
                <Button size="3" className='button' mb="3" onClick={() => handleNextPage('inc')}>Next</Button>
                <Button size="3" className='button' mb="3" onClick={() => handleNextPage('dec')}>Preview</Button>
            </Flex>
            </div>}
        </div>
      );
}

export default HomePage;

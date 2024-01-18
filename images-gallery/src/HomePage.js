import { useCallback, useEffect, useRef, useState } from 'react';
import './App.css';
import getImagesList, { searchList, likePhoto } from './components/CallApi';
import { Header } from './Header';
import { ContainerGrid } from './components/Grid';
import { useInfiniteScroll } from './utils/utils';
import data from './utils/data';
import { GlobalStyle } from "./styles/Global";
import { removeDulpicateImages } from "./utils/lib";

const HomePage = () => {
    const [listOfImages, setListOfImages] = useState([]);
    const [pageNo, setPageNo] = useState(1);
    const [searchQuery, setSearchQuery] = useState('');
    const infiniteLoadRef = useRef(null);
    let fetching = useRef(true);

    const resetData = useCallback(() => {
        setListOfImages([]);
        setSearchQuery(null);
        setPageNo(1);
      }, []);

    useEffect(() => {
    const getPhotos = async (searchText) => {
        let nextPhotos;
        if (searchText === null || searchText==='') {
        nextPhotos = await getImagesList(pageNo);
        } else {
        nextPhotos = await searchList(pageNo, searchText, false);
        }
        if (pageNo === 1) {
        if (nextPhotos && nextPhotos.length === 0) {
            setListOfImages([]);
            setListOfImages([]);
        } else {
        }
        setListOfImages(nextPhotos);
        window.scrollTo(0, 0);
        } else {
        setListOfImages((prevPhotos) =>
            removeDulpicateImages(prevPhotos, nextPhotos)
        );
        }

        fetching.current = false;
    };

    getPhotos(searchQuery);
    }, [pageNo, searchQuery]);

    const handleLike = async(id, likeUnlike) => {
        const apiMethod = likeUnlike ? 'delete' : 'post'
        await likePhoto(id, apiMethod);
        // getList();
    }

    const handleNextPage = () => {
        if (!fetching.current) {
            fetching.current = true;
            setPageNo((prevPage) => {
              return prevPage + 1;
            });
          }
    }

    useInfiniteScroll(infiniteLoadRef, handleNextPage);

    return (
        <>
            <Header
                height={data.HEADER_HEIGHT}
                resetData={resetData}
                searchCallback={(value) => {
                    setPageNo(1);
                    setSearchQuery(value);
                }}
            />
            <div style={{ height: data.HEADER_HEIGHT * 1.5 }}></div>
            <div style={{ minHeight: 1600 }}>
                <ContainerGrid
                    photosArray={listOfImages}
                    minColumns={1}
                    rowGap={data.ROW_GAP}
                    columnGap={data.COLUMN_GAP}
                    handleLike={handleLike}
                />
            </div>
            <div style={{ height: 10 }} ref={infiniteLoadRef}></div>
            <GlobalStyle />
        </>
    );
}

export default HomePage;

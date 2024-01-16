import './App.css';
import '@radix-ui/themes/styles.css';
import { Routes, Route, NavLink } from 'react-router-dom'
import { Grid, Flex, Text, Em, Avatar } from '@radix-ui/themes';
import HomePage from './HomePage';
import { useEffect, useState } from 'react';
import { DashboardIcon, HeartFilledIcon } from '@radix-ui/react-icons';
import { getRandomBackgroundPhoto } from './components/CallApi';

const App = () => {

  const [browserWidth, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    function handleResize() {
        setWidth(window.innerWidth)
      }
    window.addEventListener('resize', handleResize);
    return () => {
        window.removeEventListener('resize', handleResize);
    }
  }, []);

  useEffect(() => {
    const res = getRandomBackgroundPhoto();
    if(document && document.getElementById('App')) {
      document.getElementById('App').style.backgroundImage = `url(${res? res.urls.thumb : "https://source.unsplash.com/320x240/?sky"})`;
    }
  }, []);

  return (
    <div className="App">
       <header className="App-header">
          <Grid align="center" columns="2" gap="5" p="3">
          <Flex direction="column">
              <Text size="8" weight="bold">
                <DashboardIcon width="40" height="42" className="dashboard-icon" color='black'/>
                {browserWidth >= 768 ? <Em style={{'color': '#202020', 'padding': '4px 4px 0px 13px'}}>Your perfect Gallery..</Em> : null}
              </Text>
          </Flex>
          <Flex direction="column" gap="4">
              <Text size="5" weight="bold" align="right">
                <nav>
                  <NavLink to="/likedphotos" className="left-side">
                    <span className="tooltiptext">Tooltip text</span>
                    <HeartFilledIcon width="30" height="32"/>
                  </NavLink>
                </nav>
              </Text>
          </Flex>
          </Grid>
          </header>
        <Routes>
          <Route path="" element={<HomePage browserWidth={browserWidth}/>} />
          <Route path="/likedphotos" element={<HomePage isLikedPhotos={true} browserWidth={browserWidth}/>} />
      </Routes>
    </div>
  );
}

export default App;

import './App.css';
import '@radix-ui/themes/styles.css';
import { Routes, Route, NavLink } from 'react-router-dom'
import { Grid, Flex, Text, Em } from '@radix-ui/themes';
import HomePage from './HomePage';

const App = () => {
  return (
    <div className="App">
       <header className="App-header">
          <Grid align="center" columns="2" gap="5" p="3">
          <Flex direction="column">
              <Text size="8" weight="bold">
                <Em style={{'color': '#202020'}}>Your perfect Gallery..</Em>
              </Text>
          </Flex>
          <Flex direction="column">
              <Text size="5" weight="bold">
                <nav>
                  <NavLink to="/likedphotos" className="left-side">LIKED</NavLink>
                </nav>
              </Text>
          </Flex>
          </Grid>
          </header>
        <Routes>
          <Route path="" element={<HomePage />} />
          <Route path="/likedphotos" element={<HomePage isLikedPhotos={true}/>} />
      </Routes>
    </div>
  );
}

export default App;

import { useEffect } from 'react';
import './App.css';
import { Grid, Flex, Text } from '@radix-ui/themes';

const Header = () => {

    return (
        <div className="">
            <header className="App-header">
                <Grid align="center" columns="2" gap="5" p="3">
                <Flex direction="column">
                    <Text size="8" weight="bold">
                        Image Gallery
                    </Text>
                </Flex>
                <Flex direction="column">
                    <Text size="5" weight="bold">
                        <a href="/likedphotos" className='left-side'>Starred List</a> 
                    </Text>
                </Flex>
                </Grid>
            </header>
        </div>
      );
}

export default Header;

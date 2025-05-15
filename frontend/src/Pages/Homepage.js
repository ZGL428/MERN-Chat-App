import React from 'react';
import { Container, Box, Text, Tabs } from "@chakra-ui/react";
import Login from '../components/Authentication/Login';
import Signup from '../components/Authentication/Signup';

const Homepage = () => {
  return <Container maxW = 'xl' centerContent>
    <Box
      display = 'flex'
      justifyContent = 'center'
      alignItems = 'center'
      p = {3}
      bg ={"white"}
      w = "100%"
      m = "40px 0 15px 0"
      borderRadius = "lg"
      borderWidth = "1px"
    >
        <Text 
          fontSize = '4xl' 
          fontFamily = 'work sans' 
          color = 'black'
          fontWeight = 'extrabold'
        > 
        Herd 
        </Text>

    </Box>
    <Box
      bg = "white"
      w = "100%"
      p = {4}
      borderRadius = "lg"
      borderWidth = "1px"
      color = "black"
    >
        <Tabs.Root defaultValue="Login" variant="plain" fitted>
            <Tabs.List bg="bg.muted" rounded="l3" p="1">
                <Tabs.Trigger value="Login">
                     Login
                </Tabs.Trigger>
                <Tabs.Trigger value="Signup">
                    Signup
                </Tabs.Trigger>
                <Tabs.Indicator rounded="l2" />
            </Tabs.List>
            <Tabs.Content value="Login"><Login /></Tabs.Content>
            <Tabs.Content value="Signup"><Signup /></Tabs.Content>
        </Tabs.Root>

    </Box>
    </Container>;
};

export default Homepage;

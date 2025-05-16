import React, { useState } from 'react';
import { 
    VStack, 
    Input, 
    InputGroup,
    Field,
    Button
} from '@chakra-ui/react';
import { toaster } from "@/components/ui/toaster";
import axios from 'axios';
import { useHistory } from 'react-router-dom';

const Login = () => {
    const [show, setShow] = useState(false);
    const [email, setEmail] = useState();
    const [password, setPassword] = useState(); 
    const [loading, setLoading] = useState(false);

    const history = useHistory();
    const handleClick = () => setShow(!show);
    
    const submitHandler = async () => {
        setLoading(true);
        if (!email || !password) {
            toaster.create({ title: "Please fill all the fields", type: "warning", duration: 5000, isClosable: true, position: "bottom" });
            setLoading(false);
            return;
        }

        try {
            const config = {
                headers: {
                    "Content-Type": "application/json",
                },
            };

            const { data } = await axios.post(
                "/api/user/login",
                { email, password },
                config
            );

            toaster.create({ title: "Login Successful", type: "success", duration: 5000, isClosable: true, position: "bottom" });
            localStorage.setItem("userInfo", JSON.stringify(data));
            setLoading(false);
            history.push("/chats");
        }
        catch (error) {
            toaster.create({ title: "Error occurred", description: error.response.data.message, type: "error", duration: 5000, isClosable: true, position: "bottom" });
            setLoading(false);
        }

    };

  return <VStack spacing="5px" w="full">
              <Field.Root required>
                  <Field.Label>
                      Email <Field.RequiredIndicator />
                  </Field.Label>
                  <Input 
                      placeholder="Enter your email"
                      onChange={e => setEmail(e.target.value)}
                      isRequired
                      w="full"          // fills the whole label/box width
                      value = {email}
                  />
                  <Field.ErrorText>This field is required</Field.ErrorText>
              </Field.Root>
              <Field.Root required>
                  <Field.Label>
                      Password <Field.RequiredIndicator />
                  </Field.Label>
                  <InputGroup
                      endElement = {
                           <button
                              style={{ 
                                  background: 'none', 
                                  border: 'none', 
                                  color: 'gray.500', 
                                  cursor: 'pointer' 
                              }}
                              onClick={handleClick}
                          >
                          {show ? "Hide" : "Show"}
                          </button>
                      }
                      >
                      <Input
                          placeholder="Enter your password"
                          type = {show?"text" : "password"}
                          value = {password}
                          onChange={e => setPassword(e.target.value)}
                          isRequired
                          w="full"          // fills the whole label/box width
                      />
                  </InputGroup>
                  <Field.ErrorText>This field is required</Field.ErrorText>
              </Field.Root>
            
              <Button
                  colorPalette="teal"
                  variant = "solid"
                  width = "100%"
                  isLoading = {loading}
                  style = {{ marginTop: 15 }}
                  onClick = {submitHandler}
              >
                  Login
              </Button>
              <Button
                  colorPalette="teal"
                  variant = "solid"
                  width = "100%"
                  style = {{ marginTop: 15 }}
                  onClick = {() => {
                    setEmail("guest@example.com");
                    setPassword("123456");
                  }}
              >
                  Get Guest User Credentials
              </Button>
              </VStack>;
}

export default Login
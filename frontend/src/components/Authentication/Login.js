import React, { useState } from 'react';
import { 
    VStack, 
    Input, 
    InputGroup,
    Field,
    Button
} from '@chakra-ui/react';

const Login = () => {
    const [show, setShow] = useState(false);
    const [email, setEmail] = useState();
    const [password, setPassword] = useState(); 
    
    const handleClick = () => setShow(!show);
    
    const submitHandler = () => {};

  return <VStack spacing="5px" w="full">
              <Field.Root required>
                  <Field.Label>
                      Email <Field.RequiredIndicator />
                  </Field.Label>
                  <Input 
                      placeholder="Enter your email"
                      onChange={e => setEmail(e.target.value)}
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
                          placeholder="Set your password"
                          type = {show?"text" : "password"}
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
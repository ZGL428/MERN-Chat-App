import React, { useState } from 'react';
import { 
    VStack, 
    Input, 
    InputGroup,
    Field,
    Button
} from '@chakra-ui/react';

const Signup = () => {
    const[show, setShow] = useState(false);
    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [confirmPassword, setConfirmPassword] = useState();
    const [pic, setPic] = useState();

    const handleClick = () => setShow(!show);

    const postDetails = (pics) => {};

    const submitHandler = () => {};
 
    return <VStack spacing="5px" w="full">
            <Field.Root required>
                <Field.Label>
                    Name <Field.RequiredIndicator />
                </Field.Label>
                <Input 
                    placeholder="Enter your name"
                    onChange={e => setName(e.target.value)}
                />
                <Field.ErrorText>This field is required</Field.ErrorText>
            </Field.Root>
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
            <Field.Root required>
                <Field.Label>
                    Confirm Password <Field.RequiredIndicator />
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
                        placeholder="Confirm your password"
                        type = {show?"text" : "password"}
                        onChange={e => setConfirmPassword(e.target.value)}
                        isRequired
                        w="full"          // fills the whole label/box width
                    />
                </InputGroup>
                <Field.ErrorText>This field is required</Field.ErrorText>
            </Field.Root>
            <Field.Root id = "pic">
                <Field.Label>
                    Upload your picture <Field.RequiredIndicator />
                </Field.Label>
                <Input 
                    placeholder="Upload your picture"
                    type="file"
                    accept="image/*"
                    onChange={e => postDetails(e.target.files[0])}
                />
                <Field.ErrorText>This field is required</Field.ErrorText>
            </Field.Root>
            <Button
                colorPalette="teal"
                variant = "solid"
                width = "100%"
                style = {{ marginTop: 15 }}
                onClick = {submitHandler}
            >
                Sign Up
            </Button>
            </VStack>;

};

export default Signup;
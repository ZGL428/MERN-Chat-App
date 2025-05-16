import React, { useState } from 'react';
import { 
    VStack, 
    Input, 
    InputGroup,
    Field,
    Button,
} from '@chakra-ui/react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { toaster } from "@/components/ui/toaster"

const Signup = () => {
    const[show, setShow] = useState(false);
    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [confirmPassword, setConfirmPassword] = useState();
    const [pic, setPic] = useState();
    const [loading, setLoading] = useState(false);
    const history = useHistory();

    const handleClick = () => setShow(!show);

    const postDetails = (pics) => {
        setLoading(true);

        if (!pics) {
            toaster.create({ title: "Please select an image", status: "warning", duration: 5000, isClosable: true, position: "bottom" });
            setLoading(false);
            return;
        }

        if (["image/jpeg", "image/png"].includes(pics.type)) {
            const data = new FormData();
            data.append("file", pics);
            data.append("upload_preset", "herd-app"); 

            fetch("https://api.cloudinary.com/v1_1/dpy3h8zw0/image/upload", {
                method: "POST",
                body: data,
            }).then((res) => res.json())
                .then((data) => {
                    setPic(data.url.toString());
                    setLoading(false); 
                    if (data.error) {
                        toaster.create({ title: data.error.message, type: "error" });
                        return;
                    }
                })
            .catch(console.error)
            .finally(() => setLoading(false));
        } else {
            toaster.create({
                title: "Please select an image",
                type: "warning",
                duration: 5000,
                isClosable: true,
                position: "bottom"
            });
            setLoading(false);
            return;
        }

    };

    const submitHandler = async () => {
        setLoading(true);
        if (!name || !email || !password || !confirmPassword) {
            toaster.create({ title: "Please fill all the fields", type: "warning", duration: 5000, isClosable: true, position: "bottom" });
            setLoading(false);
            return;
        }
        if (password !== confirmPassword) {
            toaster.create({ title: "Passwords do not match", type: "warning", duration: 5000, isClosable: true, position: "bottom" });
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
                "/api/user",
                { name, email, password, pic },
                config
            );
            toaster.create({ title: "Registration successful", type: "success", duration: 5000, isClosable: true, position: "bottom" });
            localStorage.setItem("userInfo", JSON.stringify(data));
            setLoading(false);
            history.push("/chats");

        } catch (error) {
            toaster.create({ title: "Error occurred", description: error.response.data.message, type: "error", duration: 5000, isClosable: true, position: "bottom" });
            setLoading(false);
        }
    };
 
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
                isLoading ={loading}
            >
                Sign Up
            </Button>
            </VStack>;

};

export default Signup;
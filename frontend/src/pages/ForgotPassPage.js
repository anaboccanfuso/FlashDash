import React, { useRef, useState } from "react";
import { Card,
    CardHeader,
    CardBody,
    Center,
    Input,
    Link,
    Box,
    Text,
    Toast,
    useColorMode
   } from '@chakra-ui/react';
import Logo from "../components/Logo";
import ButtonComponent from "../components/ButtonComponent";

/*
   Purpose: Page for users to initiate the forgot password process. Users enter their email to have a One-time
   password sent to. The frontend does not check if the email is valid, but the backend does. So, if a user enters
   an email that does not have an account registered under it, the user will not be alerted. This can be useful for
   security.
*/
const ForgotPassPage = () => {
    const {colorMode, toggleColorMode} = useColorMode();
    const emailRef = useRef(null);
    const [email, setEmail] = useState('');

    //ref in return statement allows state to follow input from boxes.
    return(
        <Box>
            <Logo/>
            <Center>
            <Card marginTop="5%" borderRadius="25px" boxShadow="xl" width="470px">
            <CardHeader marginLeft="3%" marginRight="3%">
                <Text
                color="#8367C7"
                fontFamily="Inter"
                fontWeight="500"
                fontSize="40px"
                >
                Forgot Password
                </Text>
                <Text
                color="#9BA6C6"
                fontSize="23px"
                letterSpacing="-0.25px"
                lineHeight="28px"
                >
                Reset your password by entering your account email below.
                </Text>
            </CardHeader>
            <CardBody marginTop="0">
                <Center>
                    <Input 
                        ref={emailRef} 
                        onChange={()=>{setEmail(emailRef.current.value)}} 
                        type="text" 
                        borderRadius="10"
                        borderColor="#A1D1B3"
                        h="50px"
                        _placeholder={{
                            opacity:1,
                            color:'#A1D1B3',
                            fontSize: "23px",
                        }}
                        focusBorderColor="green.300"
                        placeholder="Email Address" 
                        _hover={{ borderColor: "green.300" }}
                        width="90%" 
                        marginBottom="4%"
                        fontSize="23"
                        maxLength='150'/>
                </Center>
                <Center>
                    <ButtonComponent 
                        buttonType="initiatePassChange" 
                        data={[email]} 
                        path="/home" 
                        children="Submit"
                        variant='solid'
                        bg={colorMode == 'light' ? '#5603AD': '#8367C7'}
                        color="#F0FFF1"
                        border="0px"
                        hover= {colorMode == 'light' ? {bg: '#8367C7'}:{bg: '#5603AD'}}
                        fontweight = "400"
                        width="390px"
                        height="50px"
                        borderRadius="30px"
                        marginBottom="5px"
                        fontsize = "23px"
                    />
                </Center>
            </CardBody>
        </Card>
        </Center>
        </Box>
    );
};

export default ForgotPassPage;
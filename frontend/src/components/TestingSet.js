/* 
  This Component is used to loop through the elements of the set that is being tested with, 
    and displaying the quiz and updating the users response
*/
import { CheckIcon, CloseIcon } from "@chakra-ui/icons";
import {
  Box,
  Divider,
  Flex,
  Input,
  Spacer,
  Text,
  useColorMode,
  Image,
  Center,
} from "@chakra-ui/react";
import React, { useState, useEffect } from "react";

const TestingSet = ({ ind, set, response, wrong, checked }) => {
  const [ans, setAns] = useState("");
  const [prevChecked, setPrevChecked] = useState(checked);
  const { colorMode, toggleColorMode } = useColorMode();
  //update the filled in answer by the user
  const handleChangeAns = (event) => {
    setAns(event.target.value);
  };

  //wipe answers if user retries quiz
  useEffect(() => {
    setPrevChecked(checked);

    if (prevChecked === true && checked === false) {
      setAns("");
    }
  }, [checked]);

  response[ind] = ans;
  //assign typed in answer to response (which ties to ans in TestingPage)

  //render the question number and corresponding prompt
  //as well as a input box with placeholder

  return (
    <Box marginBottom="3%">
      <Box
        marginLeft="10%"
        marginRight="10%"
        borderRadius="10"
        padding="3%"
        fontFamily="Inter"
        bg={colorMode == "light" ? "white" : "gray.700"}
      >
        <Flex align="center">
          <Box w="40%">
            <Text>{set.prompt}</Text>
            {set.image ? (
              <Center>
                <Image
                  src={`data:image/png;base64,${set.image}`}
                  maxH="150px"
                  marginTop="2%"
                />
              </Center>
            ) : null}
          </Box>
          <Divider
            orientation="vertical"
            borderWidth="1px"
            h="56px"
            marginRight="1%"
            marginLeft="3%"
          />
          {checked ? (
            <Text
              variant="flushed"
              marginLeft="3%"
              type="text"
              focusBorderColor="blue.200"
              width="80%"
            >
              {response[ind]}
            </Text>
          ) : (
            <Input
              variant="flushed"
              marginLeft="3%"
              type="text"
              onChange={handleChangeAns}
              placeholder="Type your answer here"
              focusBorderColor="blue.200"
              width="80%"
            />
          )}
          {wrong && checked ? (
            <>
              <Spacer />
              <CloseIcon marginLeft="5%" marginRight="2%" color="red" />
              {/* <div>Correct Answer: {set.answers.answer}</div> */}
            </>
          ) : null}
          {!wrong && checked ? (
            <>
              <Spacer />
              <CheckIcon marginLeft="5%" marginRight="2%" color="green" />
            </>
          ) : null}
        </Flex>
      </Box>
      {wrong && checked ? (
        <Center marginTop="10px" color="gray.600">
          Correct Answer: &nbsp;<b>{set.answers.answer}</b>
        </Center>
      ) : null}
    </Box>
  );
};

export default TestingSet;

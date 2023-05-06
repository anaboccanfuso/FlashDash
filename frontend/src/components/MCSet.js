/* 
  This Component is used to loop throught the elements of the set that is being tested with, 
    and displaying the quiz and updating the users response

*/
import React, { useEffect, useState } from "react";
import {
  Box,
  Flex,
  Radio,
  RadioGroup,
  Spacer,
  VStack,
  Text,
  Divider,
  useColorMode,
  Center,
  Image,
} from "@chakra-ui/react";
import { CheckIcon, CloseIcon } from "@chakra-ui/icons";

const MCSet = ({
  full,
  ind,
  set,
  response,
  random,
  boolean,
  wrong,
  checked,
}) => {
  const [value, setValue] = React.useState("");
  const [prevChecked, setPrevChecked] = useState(checked);

  const { colorMode, toggleColorMode } = useColorMode();
  //update the response value whenever user clicks radio button
  useEffect(() => {
    response[ind] = value;
  }, [value]);

  //reset answer is user retries quiz
  useEffect(() => {
    setPrevChecked(checked);

    if (prevChecked === true && checked === false) {
      setValue("");
    }
  }, [checked]);

  return (
    <Box
      marginLeft="10%"
      marginRight="10%"
      marginBottom="3%"
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
        <RadioGroup
          onChange={setValue}
          value={value}
          marginLeft="2%"
          width="80%"
        >
          {checked ? (
            boolean[ind] ? (
              <VStack align="start">
                <Radio value={full[random[ind]].answers.answer} isDisabled>
                  {full[random[ind]].answers.answer}
                </Radio>
                <Radio value={set.answers.answer} isDisabled>
                  {set.answers.answer}
                </Radio>
              </VStack>
            ) : (
              <VStack align="start">
                <Radio value={set.answers.answer} isDisabled>
                  {set.answers.answer}
                </Radio>
                <Radio value={full[random[ind]].answers.answer} isDisabled>
                  {full[random[ind]].answers.answer}
                </Radio>
              </VStack>
            )
          ) : boolean[ind] ? (
            <VStack align="start">
              <Radio value={full[random[ind]].answers.answer}>
                {full[random[ind]].answers.answer}
              </Radio>
              <Radio value={set.answers.answer}>{set.answers.answer}</Radio>
            </VStack>
          ) : (
            <VStack align="start">
              <Radio value={set.answers.answer}>{set.answers.answer}</Radio>
              <Radio value={full[random[ind]].answers.answer}>
                {full[random[ind]].answers.answer}
              </Radio>
            </VStack>
          )}
        </RadioGroup>
        {wrong && checked ? (
          <>
            <Spacer />
            <CloseIcon marginRight="2%" color="red" />
          </>
        ) : null}
        {!wrong && checked ? (
          <>
            <Spacer />
            <CheckIcon marginRight="2%" color="green" />
          </>
        ) : null}
      </Flex>
    </Box>
  );
};

export default MCSet;

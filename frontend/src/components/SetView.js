import React from "react";
import ButtonComponent from "./ButtonComponent";
import { Box, Heading, Text, Stack, Wrap,
  Flex, Spacer, IconButton, Center, Icon, Tag } from "@chakra-ui/react";
import { ChevronRightIcon } from "@chakra-ui/icons";

const SetView = ({ set, setID, description, length, school, subjects, identifier }) => {
  if (set) {
    return (
      <Box>
        <ButtonComponent
          path={`/sets/${setID}/`}
          marginBottom="10px"
          width="100%"
          height="auto"
        >
          <Flex
          minW='100%'
          paddingTop='2%'
          paddingBottom='2%'
          >
          <Stack
            direction="column"
            width="90%"
            textAlign="left"
            marginLeft="2%"
            marginBottom='0'
          >
            <Heading fontFamily="Inter" fontWeight="300" fontSize="30px" overflow='hidden' maxH='36px'>
              {set}
            </Heading>
            <Box overflowY='hidden' maxH='24px' flexWrap={false}>
              <Tag
            size="md"
            bg="gray.400"
            color="white"
            borderRadius='30'
            marginRight='5px'
            marginBottom='4px'
            >
              {length > 0 ? length + " Terms" : "No Terms"}
            </Tag>
            {school ? (
              <Tag
              size="md"
              bg="#8367C7"
              color="white"
              borderRadius='30'
              marginRight='5px'
              marginBottom='4px'
              >
                {school}
              </Tag>
            ):null}
            {identifier ? (
              <Tag
              size="md"
              bg="green.300"
              color="white"
              borderRadius='30'
              marginRight='5px'
              marginBottom='4px'
              >
                {identifier}
              </Tag>
            ):null}
            {subjects.map((sub, index) => (
              <Tag
              size="md"
              bg="blue.200"
              color="white"
              borderRadius='30'
              marginRight='5px'
              marginBottom='4px'
              key={index}
              >
                {sub}
              </Tag>
            ))}
            </Box>
            <Heading
              fontFamily="Inter"
              fontWeight="300"
              fontSize="20px"
              color="gray"
              overflowY="hidden"
              maxH="24px"
            >
              {description}
            </Heading>
          </Stack>
          <Spacer/>
          <Center>
          <Icon marginRight='20px'>{<ChevronRightIcon/>}</Icon>
          </Center>
          </Flex>
        </ButtonComponent>
      </Box>
    );
  }
};

export default SetView;

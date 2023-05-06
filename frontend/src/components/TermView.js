/*
  This component determines how the term and definitions are displayed in the set.
*/
import React from "react";
import { 
  Image,
  Tr,
  Td,
  Spacer,
  Flex,
  useColorMode
} from '@chakra-ui/react'
 
 const TermView = ({ set, i }) => {
  const { colorMode, toggleColorMode } = useColorMode()
  //Determines set image styling
  if((set.answers.image !== null && set.answers.image !== "") && (set.image !== null && set.image !== "")){
    return (
      <>
      {i !== 0 ? (
        <Tr>
          <Td></Td>
          <Td></Td>
        </Tr>
      ):null}
      {/* Styling and displaying set term */}
      <Tr bg={colorMode == 'light' ? 'gray.50' : '#FFFFFF14'}>
        <Td lineHeight="1.5vw" w='50%'>
          <Flex align="center">
            {set.prompt}
            <Spacer/>
            <Image src={`data:image/png;base64,${set.image}`} maxH="10vw" maxW="40%" marginLeft="4%"/>
          </Flex>
        </Td>
        {/* Styling and displaying set def */}
        <Td lineHeight="1.5vw" w='50%'>
          <Flex align="center">
            {set.answers.answer}
            <Spacer/>
            <Image src={`data:image/png;base64,${set.answers.image}`} maxH="10vw" maxW="40%" marginLeft="4%"/>
          </Flex>
        </Td>
      </Tr>
      </>
    );
  }
  else if((set.answers.image !== null && set.answers.image !== "") && (set.image === null || set.image === "")){
    return (
      <>
      {i !== 0 ? (
        <Tr>
          <Td></Td>
          <Td></Td>
        </Tr>
      ):null}
      <Tr bg={colorMode == 'light' ? 'gray.50' : '#FFFFFF14'}>
        <Td lineHeight="1.5vw" w='50%'>{set.prompt}</Td>
        <Td lineHeight="1.5vw" w='50%'>
          <Flex align="center">
            {set.answers.answer}
            <Spacer/>
            <Image src={`data:image/png;base64,${set.answers.image}`} maxH="10vw" maxW="40%"/>
          </Flex>
        </Td>
      </Tr>
      </>
    );
  }
  else if((set.answers.image === null || set.answers.image === "") && (set.image !== null && set.image !== "")){
    return (
      <>
      {i !== 0 ? (
        <Tr>
          <Td></Td>
          <Td></Td>
        </Tr>
      ):null}
      <Tr bg={colorMode == 'light' ? 'gray.50' : '#FFFFFF14'}>
        <Td lineHeight="1.5vw" w='50%'>
          <Flex align="center">
            {set.prompt}
            <Spacer/>
            <Image src={`data:image/png;base64,${set.image}`} maxH="10vw" maxW="40%"/>
          </Flex>
        </Td>
        <Td lineHeight="1.5vw">{set.answers.answer}</Td>
      </Tr>
      </>
    ); 
  }
  else {
    return (
      <>
      {i !== 0 ? (
        <Tr>
          <Td></Td>
          <Td></Td>
        </Tr>
      ):null}
      <Tr bg={colorMode == 'light' ? 'gray.50' : '#FFFFFF14'} fontSize='1.5vw'>
        <Td width="50%" lineHeight="1.5vw" w='50%'>{set.prompt}</Td>
        <Td width="50%" lineHeight="1.5vw" w='50%'>{set.answers.answer}</Td>
      </Tr>
      </>
    );
  }
}
export default TermView;

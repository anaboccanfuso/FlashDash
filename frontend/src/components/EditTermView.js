/*
  This components takes each term and definitions and styles it for display
*/
import React, { useRef, useState, useEffect } from "react";
import imageCompression from 'browser-image-compression';
import {
  Image,
  CloseButton,
  Input,
  Tr,
  Td,
  Flex,
  Spacer,
  Box,
  AspectRatio,
  BoxProps,
  Container,
  forwardRef,
  Heading,
  Stack,
  Text,
  Center,
  FormControl,
  FormHelperText,
  IconButton,
  useColorMode,
} from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";

const EditTermView = ({ id, set }) => {
  const { colorMode, toggleColorMode } = useColorMode();
  const [valTerm, setValTerm] = useState("");
  const [valDef, setValDef] = useState("");
  const [term, setTerm] = useState("");
  const [updatedTerm, setUpdatedTerm] = useState(valTerm);
  const [def, setDef] = useState("");
  const [updatedDef, setUpdatedDef] = useState(valDef);
  const [pair, setPair] = useState(set);
  const [quesFile, setQuesFile] = useState(set.image);
  const [defFile, setDefFile] = useState(set.answers.image);
  const [updater, setUpdater] = useState(false);
  const [newQFile, setNewQFile] = useState("");
  const [newAFile, setNewAFile] = useState("");
  const [changeTerm, setChangeTerm] = useState(false);
  const [changeDef, setChangeDef] = useState(false);
  
  //Compresses image so size is not too large (slows down page on render)
  const compressionOptions = {
    maxWidthOrHeight: 360,
    maxSizeMB: 0.5
  }

  async function convertBase64(file, cb) {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = function () {
      const base64String = fileReader.result;
      cb(base64String);
    };
    fileReader.onerror = function (error) {
      console.log(error);
    };
  } //https://stackoverflow.com/questions/47176280/how-to-convert-files-to-base64-in-react

  //Changes/Saves term value 
  const handleChangeTerm = (event) => {
    // console.log("change term");
    setValTerm(event.target.value);
    setChangeTerm(true);
  };
  //Changes/Saves def value 
  const handleChangeDef = (event) => {
    setValDef(event.target.value);
    setChangeDef(true);
  };

  //Uploads file
  const uploadHandler = async (event) => {
    console.log(`originalFile size ${event.target.files[0].size / 1024 / 1024} MB`);
    if (event.target.id === "question") {
      const tempQFile = await imageCompression(event.target.files[0], compressionOptions);
      //const tempQFile = event.target.files[0]
      console.log(`compressedFile size ${tempQFile.size / 1024 / 1024} MB`); // smaller than maxSizeMB

      const reader = new FileReader();
      reader.onloadend = () => {
        setNewQFile(reader.result);
      };
      if (tempQFile) {
        reader.readAsDataURL(tempQFile);
        setNewQFile(reader.result);
      }
      setQuesFile(event.target.files[0].name);
      convertBase64(tempQFile, (result) => {
        set.image = result;
      });
      setNewQFile(true);
    } else if (event.target.id === "definition") {
      const tempAFile = await imageCompression(event.target.files[0], compressionOptions);
      //const tempAFile = event.target.files[0]
      console.log(`compressedFile size ${tempAFile.size / 1024 / 1024} MB`); // smaller than maxSizeMB

      const reader = new FileReader();
      reader.onloadend = () => {
        setNewAFile(reader.result);
      };
      if (tempAFile) {
        reader.readAsDataURL(tempAFile);
        setNewAFile(reader.result);
      }
      setDefFile(event.target.files[0].name);
      convertBase64(tempAFile, (result) => {
        //console.log(set);
        set.answers.image = result;
      });
      setNewAFile(true);
    }
  };

  //Changes/Saves term value
  const handleClick = () => {
    // if (
    //   (valTerm == "" && (set.prompt == "" || set.prompt == "Term")) ||
    //   (valDef == "" &&
    //     (set.answers.answer == "" || set.answers.answer == "Definition"))
    // ) {
    //   alert("Each Term and Definition must be a pair.");
    // } else {
    if (changeTerm) {
      setUpdatedTerm(valTerm);
      set.prompt = valTerm;
    }
    if (changeDef) {
      setUpdatedDef(valDef);
      set.answers.answer = valDef;
    }
    // console.log(set.prompt);
    // }
  };
  // const handleUpdateTerm = () => {
  //   setUpdatedTerm(valTerm);
  //   set.prompt = valTerm;
  // }
  // const handleUpdateDef = () => {
  //   setUpdatedDef(valDef);
  //   set.answers.answer = valDef;
  // }

  //Deletes term and value
  const handleDelete = () => {
    setUpdatedTerm("");
    setUpdatedDef("");
    set.prompt = "";
    set.answers.answer = "";
    set.delete = true; //adds flag to term/def pair indicating that it is to be deleted
    setUpdater(!updater);
  };

  if (set.delete === true) {
    return <></>;
  } else {
    return (
      // {/* TODO: change update button to use "react offclick" */}
      <>
        {/* {console.log(id)}
            {console.log(set)} */}
        <Tr>
          <Td></Td>
          <Td></Td>
        </Tr>
        {/* Styling and error checking of the different term and definition elements */}
        <Tr bg={colorMode == "light" ? "gray.50" : "#FFFFFF14"} w="47%">
          <Td lineHeight="1.5vw">
            {quesFile ? (
              <Flex align="center">
                <FormControl>
                  <Input
                    variant="flushed"
                    fontSize="1.5vw"
                    id={"term" + id}
                    _placeholder={{ fontSize: "1.5vw" }}
                    placeholder="Enter term"
                    onChange={handleChangeTerm}
                    value={changeTerm ? valTerm : set.prompt}
                    onBlur={() => {
                      handleClick();
                    }}
                    maxLength="1800"
                    width="80%"
                    focusBorderColor="blue.200"
                  />
                  <FormHelperText fontSize="12px" color="gray.400">
                    TERM
                  </FormHelperText>
                </FormControl>
                <Spacer />
                <AspectRatio width="16" ratio={1}>
                  {newQFile ? (
                    <Box position="relative" float="left">
                      <IconButton
                        w="100%"
                        h="100%"
                        marginLeft="4%"
                        borderRadius="8"
                        backgroundImage={newQFile}
                        backgroundSize="cover"
                        _hover={{ opacity: 0.5 }}
                      />
                      <IconButton
                        w="100%"
                        h="100%"
                        marginLeft="4%"
                        onClick={() => {
                          set.image = "";
                          setQuesFile(set.image);
                        }}
                        icon={<DeleteIcon />}
                        position="absolute"
                        opacity="0"
                        _hover={{ opacity: "0.5" }}
                      />
                    </Box>
                  ) : (
                    <Box position="relative" float="left">
                      <IconButton
                        w="100%"
                        h="100%"
                        marginLeft="4%"
                        borderRadius="8"
                        backgroundImage={`data:image/*;base64,${set.image}`} //change here
                        backgroundSize="cover"
                        _hover={{ opacity: 0.5 }}
                      />
                      <IconButton
                        w="100%"
                        h="100%"
                        marginLeft="4%"
                        onClick={() => {
                          set.image = "";
                          setQuesFile(set.image);
                        }}
                        icon={<DeleteIcon />}
                        position="absolute"
                        opacity="0"
                        _hover={{ opacity: "0.5" }}
                      />
                    </Box>
                  )}
                </AspectRatio>
              </Flex>
            ) : (
              <Flex align="center">
                <FormControl>
                  <Input
                    variant="flushed"
                    id={"term" + id}
                    placeholder="Enter term"
                    onChange={handleChangeTerm}
                    value={changeTerm ? valTerm : set.prompt}
                    onBlur={() => {
                      handleClick();
                    }}
                    maxLength="1800"
                    width="80%"
                    fontSize="1.5vw"
                    focusBorderColor="blue.200"
                  />
                  <FormHelperText fontSize="12px" color="gray.400">
                    TERM
                  </FormHelperText>
                </FormControl>
                <Spacer />
                <AspectRatio width="16" ratio={1}>
                  <Box
                    borderColor="gray.300"
                    borderStyle="dashed"
                    borderWidth="2px"
                    rounded="md"
                    shadow="sm"
                    role="group"
                    transition="all 150ms ease-in-out"
                    _hover={{
                      shadow: "md",
                    }}
                  >
                    <Stack textAlign="center">
                      <Text
                        fontSize="16px"
                        fontWeight="light"
                        lineHeight="15px"
                      >
                        Add Image
                      </Text>
                    </Stack>
                    <Input
                      type="file"
                      position="absolute"
                      top="0"
                      left="0"
                      opacity="0"
                      aria-hidden="true"
                      accept="image/*"
                      onChange={uploadHandler}
                      id="question"
                      size="10"
                    />
                  </Box>
                </AspectRatio>
                {/* <input type="file" onChange={uploadHandler} id="question" size='10'/> */}
              </Flex>
            )}
          </Td>
          <Td lineHeight="1.5vw" width="47%%">
            {defFile ? (
              <Flex align="center">
                <FormControl>
                  <Input
                    variant="flushed"
                    id={"def" + id}
                    placeholder="Enter definition"
                    onChange={handleChangeDef}
                    value={changeDef ? valDef : set.answers.answer}
                    onBlur={() => {
                      handleClick();
                    }}
                    maxLength="1800"
                    fontSize="1.5vw"
                    w="80%"
                    focusBorderColor="blue.200"
                  />
                  <FormHelperText fontSize="12px" color="gray.400">
                    DEFINITION
                  </FormHelperText>
                </FormControl>
                <Spacer />
                <AspectRatio width="16" ratio={1}>
                  {newAFile ? (
                    <Box position="relative" float="left">
                      <IconButton
                        w="100%"
                        h="100%"
                        marginLeft="4%"
                        borderRadius="8"
                        backgroundImage={newAFile}
                        backgroundSize="cover"
                        _hover={{ opacity: 0.5 }}
                      />
                      <IconButton
                        w="100%"
                        h="100%"
                        marginLeft="4%"
                        onClick={() => {
                          set.answers.image = "";
                          setDefFile(set.answers.image);
                        }}
                        icon={<DeleteIcon />}
                        position="absolute"
                        opacity="0"
                        _hover={{ opacity: "0.5" }}
                      />
                    </Box>
                  ) : (
                    <Box position="relative" float="left">
                      <IconButton
                        w="100%"
                        h="100%"
                        marginLeft="4%"
                        borderRadius="8"
                        backgroundImage={`data:image/*;base64,${set.answers.image}`} //change here
                        backgroundSize="cover"
                        _hover={{ opacity: 0.5 }}
                      />
                      <IconButton
                        w="100%"
                        h="100%"
                        marginLeft="4%"
                        onClick={() => {
                          set.answers.image = "";
                          setDefFile(set.answers.image);
                        }}
                        icon={<DeleteIcon />}
                        position="absolute"
                        opacity="0"
                        _hover={{ opacity: "0.5" }}
                      />
                    </Box>
                  )}
                </AspectRatio>
              </Flex>
            ) : (
              <Flex align="center">
                <FormControl>
                  <Input
                    fontSize="1.5vw"
                    variant="flushed"
                    id={"def" + id}
                    placeholder="Enter definition"
                    onChange={handleChangeDef}
                    value={changeDef ? valDef : set.answers.answer}
                    onBlur={() => {
                      handleClick();
                    }}
                    maxLength="1800"
                    width="80%"
                    focusBorderColor="blue.200"
                  />
                  <FormHelperText fontSize="12px" color="gray.400">
                    DEFINITION
                  </FormHelperText>
                </FormControl>
                <Spacer />
                <AspectRatio width="16" ratio={1}>
                  <Box
                    borderColor="gray.300"
                    borderStyle="dashed"
                    borderWidth="2px"
                    rounded="md"
                    shadow="sm"
                    _hover={{
                      shadow: "md",
                    }}
                  >
                    <Stack textAlign="center">
                      <Text
                        fontSize="16px"
                        fontWeight="light"
                        lineHeight="15px"
                      >
                        Add Image
                      </Text>
                    </Stack>
                    <Input
                      type="file"
                      position="absolute"
                      top="0"
                      left="0"
                      opacity="0"
                      aria-hidden="true"
                      accept="image/*"
                      onChange={uploadHandler}
                      id="definition"
                      size="10"
                    />
                  </Box>
                </AspectRatio>
                {/*<input type="file" onChange={uploadHandler} id="question" size='10'/>*/}
              </Flex>
              // {/* <input type="file" onChange={uploadHandler} id="definition"/> */}
            )}
          </Td>
          <Td padding="0" w="6%">
            <Center>
              <CloseButton onClick={() => handleDelete()} />
            </Center>
          </Td>
        </Tr>
      </>
    );
  }
};
export default EditTermView;

/*
  This file is the flashcard page for FlashDash. It shows a card that on the front shows the set term,
    on the back it shows the definition, users can flip cards and move forward and back to the next term
*/
import React from "react";
import Logo from "../components/Logo";
import { useState, useEffect } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import {
  Box,
  Heading,
  Container,
  Flex,
  Button,
  Spacer,
  Center,
  IconButton,
  Stack,
  useColorMode,
  SimpleGrid,
  Image,
} from "@chakra-ui/react";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
const FlashCardPage = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  let setId = useParams(); // get id of set being rendered
  const navigate = useNavigate();
  const [title, setTitle] = useState([]);
  const [ques, setQues] = useState(["not ready"]); // set default value of ques to undefined
  const [length, setLength] = useState([]);
  const [ind, setIndex] = useState(0); // default index is 0
  const [flip, setFlip] = useState(0); // default flip boolean is 0
  const [pair, setPair] = useState(["null"]);

  useEffect(() => {
    fetchSet();
  }, []);

  // update the length of the set (ques) whenever it rerenders
  useEffect(() => {
    setLength(ques.length);
  }, [ques]);

  // backend call to get the full set based on the id of the set
  async function fetchSet() {
    try {
      if (setId.id === "new") return;
      const requestOptions = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      };
      const res = await fetch(
        `https://appstone-flashdash.herokuapp.com/sets/${setId.id}/`,
        requestOptions
      );
      const set_body = await res.json();
      setPair(set_body);
      setTitle(set_body.title); // title of set
      setQues(set_body.questions); // set object from backend, contains questions (.prompt) and answers (.answers.answer)
      setLength(ques.length);
      if (set_body.questions.length == 0) {
        // if the set is empty, can't do flashcards so navigate back to set page
        // should not ever hit this as we have early error checking so they can't access this page if empty
        navigate(`/sets/${setId.id}/`);
        setTimeout(
          () =>
            alert(
              "A set must have at least one term or definition to be able to do FlashCards"
            ),
          500
        );
        return;
      }
    } catch (error) {
      console.log(error);
    }
  }

  const [card, setCard] = useState(["Loading..."]); // default value for delayed rendering
  const [cardImg, setCardImg] = useState([]);

  // anytime the ques object, index, or flip boolean changes,
  // we want to set the card variable to either the term or definition at the specified index
  useEffect(() => {
    if (flip == 0) {
      if (pair === "null") {
        setCard("Loading...");
      } else if (ques === "not ready") {
        setCard("Loading...");
      } else {
        setCardImg(ques[ind].image);
        setCard(ques[ind].prompt);
      }
    } else {
      if (ques === "undefined") {
      } else {
        setCard(ques[ind].answers.answer);
        setCardImg(ques[ind].answers.image);
      }
    }
  }, [ques, ind, flip]);

  // handles the user pressing the back button, navigating to the proper pages
  const handleBackButton = () => {
    if (window.location.pathname.includes("sets")) {
      if (
        window.location.pathname.includes("/search") ||
        window.location.pathname.includes("/edit") ||
        window.location.pathname.includes("/my-set") ||
        !global.$token
      )
        navigate(-1);
      else navigate(-1); // navigate("/home");
    } else navigate(-1);
  };

  // if user clicks back button we need to update the index of array being displayed
  const handleBack = () => {
    if (ind === 0) {
      // if index is first element in array, set index to last element in array
      setIndex(length - 1);
    } else {
      // else index--
      setIndex(ind - 1);
    }
    setFlip(0);
  };

  // if user clicks forward button, update the index of the array being displayed
  const handleForward = () => {
    if (ind === length - 1) {
      // if index is at lest element in array, reset to 0
      setIndex(0);
    } else {
      // else, index++
      setIndex(ind + 1);
    }
    setFlip(0);
  };

  // if user "flips" card, set flip boolean to not flip
  const handleFlip = () => {
    setFlip(!flip);
  };

  return (
    <Box>
      <Logo />
      <Box marginLeft="5%" marginRight="5%" marginTop="3%">
        <Stack direction="row">
          <IconButton
            icon={<MdKeyboardArrowLeft />}
            onClick={() => {
              handleBackButton();
            }}
            variant="ghost"
            border="0"
            borderRadius="3xl"
            marginLeft="20px"
            size="lg"
          />
          <Heading fontWeight="300">{title}</Heading>
        </Stack>
        <Center marginTop="4%">
          <Center>
            <IconButton
              onClick={handleBack}
              icon={<MdKeyboardArrowLeft />}
              variant="ghost"
              border="0"
              borderRadius="3xl"
              size="lg"
              marginRight="70%"
            />
          </Center>
          <Center
            width="40vw"
            padding="5%"
            border="0px"
            height="22vw"
            boxShadow="xl"
            bg={colorMode == "light" ? "gray.50" : "gray.700"}
            onClick={handleFlip}
            fontFamily="Inter"
            fontSize="1.5vw"
          >
            <Stack align="center">
              {flip == 0 ? (
                <Box
                  fontFamily="Inter"
                  fontSize="1vw"
                  color="gray.400"
                  lineHeight="1vw"
                >
                  TERM
                </Box>
              ) : (
                <Box
                  fontFamily="Inter"
                  fontSize="1vw"
                  color="gray.400"
                  lineHeight="1vw"
                >
                  DEFINITION
                </Box>
              )}
              {cardImg ? (
                <Flex width="30vw" columns={2} marginTop="10%">
                  <Box w="50%">
                    <Center>
                      <Image
                        src={`data:image/*;base64,${cardImg}`}
                        maxH="10vw"
                      />
                    </Center>
                  </Box>
                  <Center
                    lineHeight="1.5vw"
                    minH="2vw"
                    maxH="11vw"
                    // maxW="20vw"
                    overflowY="hidden"
                    h="auto"
                    w="50%"
                  >
                    {card}
                  </Center>
                </Flex>
              ) : (
                <Box
                  lineHeight="1.5vw"
                  minH="2vw"
                  maxH="15vw"
                  maxW="35vw"
                  overflowY="auto"
                  textAlign="center"
                  h="auto"
                >
                  {card}
                </Box>
              )}
            </Stack>
          </Center>
          <Center>
            <IconButton
              onClick={handleForward}
              icon={<MdKeyboardArrowRight />}
              variant="ghost"
              border="0"
              borderRadius="3xl"
              marginLeft="70%"
              size="lg"
            />
          </Center>
        </Center>
      </Box>
    </Box>
  );
};
export default FlashCardPage;

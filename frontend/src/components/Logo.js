/*
  This is the navigation bar of our app
  It is displayed at the top of most pages, and allows user the ability to return to home/welcome page, search, 
  login/sign up, and use their dropdown menu (if logged in).
 */
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState, useRef } from "react";
import ButtonComponent from "./ButtonComponent";
import {
  Button,
  Flex,
  Spacer,
  ButtonGroup,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Box,
  Heading,
  Center,
  Input,
  InputGroup,
  InputLeftElement,
  useColorMode,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import { isExpired, clearUserStorage } from "../utils";

const Logo = ({ children }) => {
  const { colorMode, toggleColorMode } = useColorMode();
  const navigate = useNavigate();
  const queryRef = useRef(null);
  const [query, setQuery] = useState("");

  // sends post request to log user out if they select it from their menu dropdown
  async function handleLogout() {
    try {
      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Token " + localStorage.getItem("access_token"), //pass token to backend for authentication
        },
        body: JSON.stringify({ token: localStorage.getItem("access_token") }),
      };
      fetch(
        `https://appstone-flashdash.herokuapp.com/users/logout/`,
        requestOptions
      ).then(() => {
        global.$token = "";
        localStorage.removeItem("access_token");
        localStorage.removeItem("username");
        localStorage.removeItem("name");
        global.$name = "";
        global.$username = "";
        if (window.location.pathname.includes("/undefined/edit")) {
          navigate("/");
        } else if (window.location.pathname.includes("/edit")) {
          let path = window.location.pathname.split("/");
          navigate("/" + path[1] + "/" + path[2]);
        } else if (window.location.pathname.includes("/performance")) {
          navigate(
            window.location.pathname.substring(
              0,
              window.location.pathname.lastIndexOf("/")
            )
          );
        } else {
          navigate("/");
        }
      });
    } catch (error) {
      console.log(error);
    }
    if(colorMode !== 'light'){
      toggleColorMode();
    }
  }
  
  // check if user login is expired, if so clear user storage and navigate to welcome page
  useEffect(() => {
    if (isExpired() === true) {
      clearUserStorage();
      navigate("/");
    }
  }, []);

  return (
    <Box marginTop="10px">
      <Center>
        <Flex
          width="92%"
          minWidth="max-content"
          alignItems="center"
          gap="2"
          marginTop="40px"
        >
          <Button
            float="left"
            colorScheme="purple"
            variant="ghost"
            border="0px"
            _hover={{}}
            _active={{}}
            onClick={() => {
              localStorage.getItem("access_token")
                ? navigate("/home")
                : navigate("/"); // using tokens to verify authentication
            }}
          >
            <Heading
              fontFamily="Inter"
              fontSize="50px"
              color={colorMode == "light" ? "#5603AD" : "#8367C7"}
            >
              FlashDash
            </Heading>
          </Button>
          <Spacer />
          { 
          // navigation bar excludes search input on certain pages
          window.location.pathname !== "/home" &&
          window.location.pathname !== "/" &&
          window.location.pathname !== "/sign-in" &&
          window.location.pathname !== "/sign-up" ? (
            <Flex>
              <Center>
                <InputGroup>
                  <InputLeftElement
                    w="12"
                    h="12"
                    children={<SearchIcon color="#b3e9c7" />}
                  />
                  <Input
                    width="35vw"
                    borderRadius="10px"
                    height="50px"
                    focusBorderColor="white"
                    maxLength="255"
                    placeholder="Search for a set by keyword or author"
                    _placeholder={{ color: "gray.300", fontFamily: "Inter" }}
                    ref={queryRef}
                    onChange={() => {
                      setQuery(queryRef.current.value);
                    }}
                    type="text"
                    onKeyPress={(e) => {
                      // allows search on enter and replaces forward slash with unique string, 
                      // ignores back slash
                      if (
                        e.key === "Enter" &&
                        query !== null &&
                        query
                          .replace(/\//g, "9yjpiQ6NAJ")
                          .replace(/\\/g, " ")
                          .trim() !== ""
                      ) {
                        // navigate to page with given search input
                        navigate(
                          `/sets/search=${query
                            .replace(/\//g, "9yjpiQ6NAJ")
                            .replace(/\\/g, " ")
                            .trim()}`
                        );
                      } else if (e.key === "Enter") {
                        // no search input, navigate to all sets page
                        navigate(`/sets`);
                      }
                    }}
                  />
                </InputGroup>
              </Center>
            </Flex>
          ) : null}
          <Spacer />
          {localStorage.getItem("access_token") ? (
            <Flex>
              <ButtonComponent
                children="New Set"
                buttonType="addSet"
                data="untitled"
                path="/sets/new/edit"
                variant="ghost"
                border="2px"
                borderRadius="40"
                hover={
                  colorMode == "light" ? { bg: "#E8F8EE" } : { bg: "gray.600" }
                }
                color="#A1D1B3"
                fontsize="25px"
                fontweight="semibold"
                width="150px"
                height="50px"
              />
              <Menu>
                <MenuButton
                  p="3%"
                  variant="ghost"
                  m="auto"
                  as={Button}
                  color="white"
                  borderRadius="50px"
                  border="0px"
                  bg={colorMode == "light" ? "#5603AD" : "#8367C7"}
                  fontWeight="medium"
                  fontFamily="Inter"
                  fontSize="25px"
                  size="lg"
                  marginLeft="10px"
                  _hover={
                    colorMode == "light" ? { bg: "#8367C7" } : { bg: "#5603AD" }
                  }
                  _expanded={{ bg: "#8367C7" }}
                >
                  { // initial in menu dropdown
                  localStorage.getItem("name")
                    ? localStorage.getItem("name")[0].toUpperCase()
                    : null}
                </MenuButton>
                <MenuList
                  fontFamily="Inter"
                  fontSize="20px"
                  fontWeight="300"
                  color="gray.500"
                  padding="10px"
                >
                  <MenuItem
                    _hover={{ bg: "#f3fff8" }}
                    onClick={() => {
                      navigate(`/settings`);
                    }}
                  >
                    Dashboard
                  </MenuItem>
                  <MenuItem
                    _hover={{ bg: "#f3fff8" }}
                    onClick={() => {
                      navigate(`/my-sets`);
                    }}
                  >
                    My Sets
                  </MenuItem>
                  <MenuItem
                    _hover={{ bg: "#f3fff8" }}
                    onClick={() => {
                      navigate(`/my-saved-sets`);
                    }}
                  >
                    My Saved Sets
                  </MenuItem>
                  <MenuItem
                    _hover={{ bg: "#f3fff8" }}
                    onClick={() => {
                      navigate(`/recently-viewed`);
                    }}
                  >
                    Recently Viewed Sets
                  </MenuItem>
                  <MenuItem
                    _hover={{ bg: "#f3fff8" }}
                    onClick={() => {
                      handleLogout();
                    }}
                  >
                    Logout
                  </MenuItem>
                </MenuList>
              </Menu>
            </Flex>
          ) : null}
          {!localStorage.getItem("access_token") ? (
            <ButtonGroup gap="2">
              <ButtonComponent
                variant="ghost"
                border="0px"
                color="#A1D1B3"
                fontweight="semibold"
                hover={
                  colorMode == "light" ? { bg: "#E8F8EE" } : { bg: "gray.600" }
                }
                fontsize="25px"
                borderRadius="40"
                path="/sign-up"
                height="50px"
                width="150px"
                children="Join Now"
              />
              <ButtonComponent
                variant="outline"
                color={colorMode == "light" ? "#5603AD" : "#8367C7"}
                border="2px"
                fontsize="25px"
                hover={
                  colorMode == "light" ? { bg: "#DDCCEE" } : { bg: "gray.600" }
                }
                path="/sign-in"
                children="Sign In"
                height="50px"
                width="150px"
                borderRadius="40"
                buttonType="goToSignIn"
                data={window.location.pathname}
              />
            </ButtonGroup>
          ) : null}
        </Flex>
      </Center>
      {children}
    </Box>
  );
};

export default Logo;

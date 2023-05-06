/*
  This is the page of our app that shows users sets that they have saved.
  It is only accessible to logged-in users by:
    (1) clicking on their icon and navigating to the saved sets page or
    (2) viewing the saved sets tab on the dashboard
 */
import React from "react";
import SetView from "../components/SetView";
import Logo from "../components/Logo";
import { useState, useEffect } from "react";
import { Link, Box, Heading, Center, Text, Image } from "@chakra-ui/react";

const MySavedSetsPage = () => {
  const [title, setTitle] = useState([]);
  const [setID, setSetID] = useState([]);
  const [description, setDescription] = useState([]);
  const [setLength, setSetLength] = useState([]);
  const [empty, setEmpty] = useState(false);
  const [school, setSchool] = useState([]);
  const [identifier, setIdentifier] = useState([]);
  const [subjects, setSubjects] = useState([]);

  //call fetch saved sets funtion once on render
  useEffect(() => {
    fetchMySavedSets(); //in useEffect so it doesn't run infinitely
  }, []);

  //useEffect(() => {setEmpty()}, title);
  async function fetchMySavedSets() {
    try {
      let tempTitle = [];
      let tempID = [];
      let tempDescription = [];
      let tempLength = [];
      let tempSchool = [];
      let tempIdentifier = [];
      let tempSubjects = [];

      //1. Make Request
      const requestOptions = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Token " + localStorage.getItem("access_token"),
        },
        // body: JSON.stringify({ id: data[0], title: data[1], author: data[2] }),
      };
      const res = await fetch(
        `https://appstone-flashdash.herokuapp.com/users/sets/user=${localStorage.getItem(
          "username"
        )}/saved/`, //use stored username
        requestOptions
      )
        .then((response) => response.json())
        .then((data) => {
          if (data[0]) {
            setEmpty(false);
          } else {
            setEmpty(true);
          }
          //Save set display values
          setTitle(data[0].set.title);
          setSetID(data[0].set.id);
          setDescription(data[0].set.description);
          setSchool(data[0].set.school);
          setIdentifier(data[0].set.identifier);
          setSubjects(data[0].set.subjects);
          //setSetLength(data[0].set.setLength);
          //console.log(data[0].set.setLength);

          //1. Save each set value to a temporary local variable
          for (let i = 0; i < data.length; i++) {
            tempTitle.push(data[i].set.title);
            tempID.push(data[i].set.id);
            tempDescription.push(data[i].set.description);
            tempLength.push(data[i].set.setLength);
            tempSchool.push(data[i].set.school);
            tempIdentifier.push(data[i].set.identifier);
            tempSubjects.push(data[i].set.subjects);
          }
          //2. Save each set value to a permanent page variable
          setTitle(tempTitle);
          setSetID(tempID);
          setDescription(tempDescription);
          setSetLength(tempLength);
          setSchool(tempSchool);
          setIdentifier(tempIdentifier);
          setSubjects(tempSubjects);
        });
    } catch (error) {
      /*`https://appstone-flashdash.herokuapp.com/users/sets/author=${global.$username}/`*/
      console.log(error);
    }
  }

  return (
    <Box>
      <Logo />
      <Box marginLeft="10%" marginRight="10%" marginTop="3%" marginBottom='5%'>
        <Heading fontFamily="Inter" fontWeight="300" marginBottom="1%">My Saved Sets</Heading>
        {/* Display all sets in list format using set view component */}
        {!empty ? (
          title.map((name, index) => (
            <SetView
              key={index}
              set={name}
              setID={setID[index]}
              length={setLength[index]}
              description={description[index]}
              school={school[index]}
              identifier={identifier[index]}
              subjects={subjects[index]}
            />
          ))
        ) : (
          <>
          <Center marginTop="5%" fontSize="20px" fontFamily='Inter'>
            <Image src={require("./flashcards.png")} h='200px'/>
          </Center>
          <Center>
            <Heading fontWeight='500' fontSize='30px' color='gray.600'>You haven't saved any sets yet</Heading>
          </Center>
          <Center>
             <Text color='gray.500'>Begin by&nbsp; 
                <Link href="/home">searching</Link>&nbsp;for sets.
            </Text>
          </Center>
          </>
        )}
        {/* {title.map((name, index) => (
        <SetView key={index} set={name} setID={setID[index]} />
      ))} */}
      </Box>
    </Box>
  );
};
export default MySavedSetsPage;

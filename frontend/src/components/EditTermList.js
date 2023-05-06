/*
  Maps every item in a set and then displays result from edit term view component 
*/
import React, { useEffect, useState } from "react";
import EditTermView from "./EditTermView";
import { CloseButton } from "@chakra-ui/react";
import { removeFromArr } from "../utils";

const EditTermList = ({ set }) => {
  return (
    <>
      {set.map((q, index) => (
        <>
        <EditTermView key={q.answers.question} id={index} set={q} />
        </>
      ))}
      {/* {console.log(set)} */}
    </>
  );
};
export default EditTermList;

/*
    This component was initially created to display the list of subjects within a set. 
    This component is currently not being used.
*/
import React, { useRef, useState, useEffect } from "react";
const SubjectsList = ({ subjects }) => {
    const [subName, setSubName] = useState("");
    const subNameRef = useRef(null);
    return (
        <div>
            hi
            <input
                ref={subNameRef}
                onChange={() => {
                    setSubName(subNameRef.current.value);
                }}
                type="text"
                placeholder={subjects}
            />

            <button onClick={() => {subjects.push(subName)}}>✓</button>
        </div>
    );
};
export default SubjectsList;

/* 
  This component used to determine the functionality needed for various buttons throughout the application
*/
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button, ButtonGroup, useToast } from "@chakra-ui/react";
import { isExpired, clearUserStorage, fetchProfile } from "../utils";
import "./button.css";

const ButtonComponent = ({
  buttonType,
  path,
  children,
  data,
  variant,
  bg,
  border,
  color,
  hover,
  fontweight,
  fontsize,
  width,
  height,
  borderRadius,
  marginBottom,
  justifyContent,
  borderColor,
}) => {
  //use cookies to store user data
  const toast = useToast();
  const navigate = useNavigate();
  async function handleLogin() {
    try {
      localStorage.setItem("username", data[0]); //store username in brower's storage
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: data[0], password: data[1] }),
      };
      fetch(
        `https://appstone-flashdash.herokuapp.com/users/login/`,
        /*`http://127.0.0.1:8000/users/login/`,*/
        requestOptions
      )
        .then((response) => response.json())
        .then((data) => {
          if (data.expiry !== undefined) {
            //setUserCookie("user", {expiry: data.expiry, token: data.token}, {path: "/", httpOnly: false});
            localStorage.setItem("access_token", data.token); //store token in browser storage, may want expiration too
            localStorage.setItem("expiry", data.expiry);
            localStorage.setItem("username", data[0]);
          }
          if (!data.non_field_errors) {
            global.$token = data.token;
            global.$username = data[0];
            global.$password = data[1];
            let prevLoc = localStorage.getItem("signIn")
            localStorage.removeItem("signIn")
            if(prevLoc != "/")
              navigate(localStorage.getItem("signIn"))
              // localStorage.removeItem("signIn")
            else {
              navigate("/home")
              // localStorage.removeItem("signIn")
            }
          } else {
            alert(data.non_field_errors);
          }
        });
    } catch (error) {
      //clearUserStorage();
      console.log(error);
      // console.log(localStorage.getItem("access_token"));
    }
    fetchProfile();
  }

  //Logs user out and clears all local storage values
  async function handleLogout() {
    try {
      clearUserStorage();
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
        navigate("/");
      });
    } catch (error) {
      console.log(error);
    }
  }

  //Makes a put request to create a new set or update an existing set
  async function handleCreateSet() {
    try {
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          author: localStorage.getItem("username"),
          title: data,
        }),
      };
      fetch(
        /*`http://localhost:8000/sets/create/`*/ `https://appstone-flashdash.herokuapp.com/sets/updateCreate/`,
        requestOptions
      )
        .then((response) => response.json())
        .then((data) => {
          let setPath = "/sets/" + data.id + "/edit";
          navigate(setPath);
        });
    } catch (error) {
      console.log(error);
    }
  }

  //Makes a put request to edit an existing set
  async function handleEditSet() {
    //check if empty
    if (data[1] == null) {
      alert("Cannot have a set without a title.");
      return;
    }
    // if (
    //   data[3].length === 0 ||
    //   (data[3].length === 1 && data[3][0].prompt === "")
    // ) {
    for (let i = 0; i < data[3].length; i++) {
      if (data[3][i].prompt === "") {
        alert("Cannot have a set without questions.");
        return;
      }
    }
    //check if all questions are set to be deleted
    let emptyTotal = 0;
    for (let i = 0; i < data[3].length; i++) {
      if (data[3][i].delete === true) {
        emptyTotal++;
      }
    }
    if (emptyTotal === data[3].length) {
      alert("Cannot have a set without questions");
      return;
    }
    /*
    for(let i = 0; i < data[3].length; i++){
      if((data[3][i].prompt == "" || data[3][i].answers.answer == "") && data[3][i].answers.question != "DELETE"){
        alert(`Empty Question or Answer in Question/Answer Pair ${i+1}`);
        return;
      }
    }
    */

    try {
      const requestOptions = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Token " + localStorage.getItem("access_token"),
        },
        body: JSON.stringify({
          title: data[1],
          description: data[7],
          author: data[2],
          questions: data[3],
          school: data[4],
          subjects: data[6],
          identifier: data[5],
        }),
      };

      fetch(
        /*`http://localhost:8000/sets/${data[0]}/updateCreate`*/ `https://appstone-flashdash.herokuapp.com/sets/${data[0]}/updateCreate`,
        requestOptions
      )
        .then((response) => response.json())
        .then((data2) => {
          let navPath = "";
          // let navPath = "/sets/" + data[0] + "/";
          if (data[0] !== "undefined") navPath = "/sets/" + data[0] + "/";
          else navPath = "/my-sets";
          navigate(navPath);
        });
    } catch (error) {
      if (isExpired() === true) {
        handleLogout();
      } else {
        console.log(error);
      }
    }
  }

  //Makes a delete request to delete an existing set
  async function handleDeleteSet() {
    try {
      const requestOptions = {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Token " + localStorage.getItem("access_token"),
        },
        // body: JSON.stringify({ id: data[0], title: data[1], author: data[2] }),
        // body: JSON.stringify({
        //   id: data,
        // }),
      };

      fetch(
        /*`http://localhost:8000/sets/${data}/delete`*/ `https://appstone-flashdash.herokuapp.com/sets/${data}/delete`,
        requestOptions
      )
        .then((response) => response.json())
        .then((data2) => {
          //let navPath = "/sets/" + data + "/";
          navigate(path);
        });
    } catch (error) {
      if (isExpired() === true) {
        handleLogout();
      } else {
        console.log(error);
      }
    }
  }

  //Makes a post request to create a new user account
  async function handleCreateAccount() {
    try {
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: data[1],
          email: data[0],
          first_name: data[2],
          password: data[3],
          password2: data[3],
        }),
      };
      fetch(
        `https://appstone-flashdash.herokuapp.com/users/register/`, //`http://localhost:8000/users/register/`,
        requestOptions
      )
        .then((response) => response.json())
        .then((responseData) => {
          if (
            responseData.username === data[1] &&
            responseData.email === data[0] &&
            responseData.first_name === data[2]
          ) {
            data[0] = data[1];
            data[1] = data[3];
            handleLogin();
          } else {
            if (responseData.username) alert(responseData.username[0]);
            if (responseData.password) alert(responseData.password[0]);
            if (responseData.email) alert("Email field must be unique");
          }
        });
    } catch (error) {
      console.log(error);
    }
  }

  //Makes a post request to initiate a password change action
  function initiatePassChange() {
    try {
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: data[0] }),
      };
      fetch(
        /*`http://127.0.0.1:8000/requestPassChange`*/ "https://appstone-flashdash.herokuapp.com/users/requestPassChange",
        requestOptions
      )
        .then((response) => response.json())
        .then((data) => {
          localStorage.setItem("otp", data.otp);
          localStorage.setItem("otp_expiry", data.expiry);
          localStorage.setItem("otp_id", data.id);
        });
      navigate("/otp");
    } catch (error) {
      console.log(error);
    }
  }
  //Makes a put request to change a users saved password
  function changeUserPassword() {
    if (data[0] === data[1]) {
      //Do the call
      try {
        const requestOptions = {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            otpId: localStorage.getItem("otp_id"),
            password: data[0],
            otp_expiry: localStorage.getItem("otp_expiry"),
          }),
        };
        fetch(
          /*`http://127.0.0.1:8000/changeUserPassword`*/ "https://appstone-flashdash.herokuapp.com/users/changeUserPassword",
          requestOptions
        ).then((response) => {
          if (!response.ok) {
            //TODO: Throw error
            if(!toast.isActive('server-password')){
              toast({
                id: 'server-password',
                description: "Invalid Password.",
                status: 'error'
              })
            }
            throw new Error("Unsuccessful Password Change");

          } else {
            toast.closeAll()
            navigate("/");
          }
        });
      } catch (error) {
        console.log(error);
      }
    }
    else{
      if(!toast.isActive('password-match')){
        toast({
          id: 'password-match',
          description: "Passwords do not match.",
          status: 'error'
        })
      }
    }
  }

  //Determines what fetch request/actions needs to made/taken depending on the parameters passed in
  const handleClick = () => {
    if (data == null) {
      navigate(path);
    } else {
      if (buttonType === "signUp") {
        if (
          data[0] !== "" &&
          data[1] !== "" &&
          data[2] !== "" &&
          data[3] !== "" &&
          data.length === 5
        ) {
          handleCreateAccount();
        } else {
          alert("Please fill in all required fields");
        }
      } else if (buttonType === "signIn") {
        if (
          data !== null &&
          data.length === 2 &&
          data[0] !== "" &&
          data[1] !== ""
        ) {
          handleLogin();
        }
      } else if (buttonType === "searchQuery") {
        navigate(path);
      } else if (buttonType === "addSet") {
        handleCreateSet();
      } else if (buttonType === "editSet") {
        handleEditSet();
      } else if (buttonType === "addTermDef") {
        //handleCreateTermDef(); Missing from above function so commenting out
      } else if(buttonType == "goToSignIn") {
        localStorage.setItem("signIn", data);
        navigate(path)
      } else if (buttonType === "deleteSet") {
        handleDeleteSet();
      } else if (buttonType === "initiatePassChange") {
        toast({
          title: "Email sent.",
          description:
            "If an account exists with this email, you'll receive an email shortly.",
          bg: "blue.200",
        });
        initiatePassChange();
      } else if (buttonType === "changeUserPassword") {
        changeUserPassword();
      } // } else if (buttonType === "test") {
      //   handleTesting();
      // }
    }
  };
  return (
    // <ButtonGroup spacing="6">
    //Button Styling
    <Button
      variant={variant}
      bg={bg}
      border={border}
      borderRadius={borderRadius}
      borderColor={borderColor}
      color={color}
      fontSize={fontsize}
      fontWeight={fontweight}
      _hover={hover}
      width={width}
      height={height}
      marginBottom={marginBottom}
      onClick={() => {
        handleClick();
      }}
      fontFamily="Inter"
      whiteSpace="normal"
      wordwrap="break-word"
      justifyContent={justifyContent}
    >
      {children}
    </Button>
  );
};

export default ButtonComponent;

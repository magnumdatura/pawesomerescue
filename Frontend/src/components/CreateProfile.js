import React, { useContext } from "react";
import ReactContext from "../context/react-context";

const CreateProfile = () => {
  const reactCtx = useContext(ReactContext);

  const fetchReg = async (url) => {
    const bod = JSON.stringify({
      email: reactCtx.emailInput,
      password: reactCtx.passwordInput,
      password1: reactCtx.passwordInput,
      name: reactCtx.nameInput,
      profileType: reactCtx.profileTypeInput,
    });

    const options = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        authorization: "Bearer " + reactCtx.access,
      },
      body: bod,
    };

    try {
      const res = await fetch(url, options);
      console.log(res);
      console.log(options);

      if (res.status !== 200) {
        throw new Error("Something went wrong.");
      }

      const data = await res.json();
      // setData(data);
      console.log(data); // this returns both access and refresh tokens as part of the data object

      reactCtx.setEmailInput(data.email);
      reactCtx.setPasswordInput(data.password);
      reactCtx.setNameInput(data.name);
      reactCtx.setProfileTypeInput(data.profiletype);
    } catch (err) {
      // setError(err.message);
      console.log(err);
    }
  };

  function handleInput(event) {
    event.preventDefault();
    // console.log(event.target.id);
    if (event.target.id === "email") reactCtx.setEmailInput(event.target.value);
    if (event.target.id === "password")
      reactCtx.setPasswordInput(event.target.value);
    // if (event.target.id === "password1")
    //   reactCtx.setConfirmPassword(event.target.value);
    if (event.target.id === "name") reactCtx.setNameInput(event.target.value);
    if (event.target.id === "profiletype")
      reactCtx.setProfileTypeInput(event.target.value);
  }

  function handleRegister(event) {
    event.preventDefault();
    fetchReg("http://localhost:5001/users/register");
  }

  return (
    <>
      <h1>Registration Page</h1>
      <form>
        <div>
          Email:
          <input type="email" onChange={handleInput} id="email"></input>
        </div>
        <div>
          Password:
          <input type="password" onChange={handleInput} id="password"></input>
        </div>
        <div>
          Name:
          <input type="text" onChange={handleInput} id="name"></input>
        </div>
        <select id="profiletype" onChange={handleInput}>
          <option value="adopter">Adopting a pet!</option>
          <option value="poster">Posting an adoption!</option>
        </select>
      </form>
      <button onClick={handleRegister}>REGISTER</button>
    </>
  );
};

export default CreateProfile;

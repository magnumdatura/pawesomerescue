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
      contact: {
        address: reactCtx.addressInput,
        phone: reactCtx.phoneInput,
      },
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
      reactCtx.setAddressInput(data.contact?.address);
      reactCtx.setPhoneInput(data.contact?.phone);
      alert("profile created");
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
    if (event.target.id === "address")
      reactCtx.setAddressInput(event.target.value);
    if (event.target.id === "phone") reactCtx.setPhoneInput(event.target.value);
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
          <input
            type="email"
            placeholder="Required: Your Email Address"
            onChange={handleInput}
            id="email"
          ></input>
        </div>
        <div>
          <input
            type="password"
            placeholder="Required: Alphanumeric"
            onChange={handleInput}
            id="password"
          ></input>
        </div>
        <div>
          <input
            type="text"
            placeholder="Required: Your Name"
            onChange={handleInput}
            id="name"
          ></input>
        </div>
        <div>
          <div>
            <input
              type="text"
              placeholder="Optional: Your Address"
              onChange={handleInput}
              id="address"
            ></input>
          </div>
          <div>
            <input
              type="number"
              placeholder="Optional: Your Phone Number"
              onChange={handleInput}
              id="phone"
            ></input>
          </div>
        </div>
        <div>
          <br />
          <select id="profiletype" onChange={handleInput}>
            <option value="">Required: What are you doing here?</option>
            <option value="adopter">Adopting a pet!</option>
            <option value="poster">Posting an adoption!</option>
          </select>
        </div>
        <br />
        <button onClick={handleRegister} className="button">
          REGISTER
        </button>
      </form>
      <div></div>
    </>
  );
};

export default CreateProfile;

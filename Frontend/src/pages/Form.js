import React, { useContext } from "react";
import ReactContext from "../context/react-context";

const Form = () => {
  const reactCtx = useContext(ReactContext);

  const submitForm = async (url) => {
    const bod = JSON.stringify({
      title: reactCtx.titleInput,
      petName: reactCtx.petNameInput,
      species: reactCtx.speciesInput,
      breed: reactCtx.breedInput,
      sex: reactCtx.sexInput,
      size: reactCtx.sizeInput,
      age: reactCtx.ageInput,
      //need some help with this.
      ownerContact: {
        name: reactCtx.ownerNameInput,
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
      console.log(data);
      reactCtx.setTitleInput(data);
    } catch (err) {
      console.log(err);
    }
  };

  function handleChange(event) {
    event.preventDefault();
    if (event.target.id === "title") reactCtx.setTitleInput(event.target.value);
    if (event.target.id === "petName")
      reactCtx.setPetNameInput(event.target.value);
    if (event.target.id === "breed") reactCtx.setBreedInput(event.target.value);
    if (event.target.id === "species")
      reactCtx.setSpeciesInput(event.target.value);

    if (event.target.id === "sex") reactCtx.setSexInput(event.target.value);
    if (event.target.id === "size") reactCtx.setSizeInput(event.target.value);
    if (event.target.id === "age") reactCtx.setAgeInput(event.target.value);
    if (event.target.id === "medical")
      reactCtx.setMedicalInput(event.target.value);
    if (event.target.id === "ownerName")
      reactCtx.setOwnerNameInput(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (reactCtx.validEmail) {
      submitForm("http://localhost:5001/listings/create");
    } else {
      window.alert(`listing can't be created`);
    }
  }

  return (
    <>
      <form>
        <div>
          <input
            type="text"
            onChange={handleChange}
            placeholder="Title of Listing"
            id="title"
          ></input>
        </div>
        <div>
          <input
            type="text"
            onChange={handleChange}
            placeholder="Pet Name"
            id="petName"
          ></input>
        </div>
        <div>
          <input
            type="text"
            onChange={handleChange}
            placeholder="Species"
            id="species"
          ></input>
        </div>
        <div>
          <input
            type="text"
            onChange={handleChange}
            placeholder="Breed"
            id="breed"
          ></input>
        </div>
        <div>
          <input
            type="text"
            onChange={handleChange}
            placeholder="Sex"
            id="sex"
          ></input>
        </div>
        <div>
          <input
            type="text"
            onChange={handleChange}
            placeholder="Size"
            id="size"
          ></input>
        </div>
        <div>
          <input
            type="text"
            onChange={handleChange}
            placeholder="Age of Pet"
            id="age"
          ></input>
        </div>
        <div>
          <input
            type="text"
            onChange={handleChange}
            placeholder="Medical Conditions"
            id="medical"
          ></input>
          <div>Contact Details:</div>
          <input
            type="text"
            onChange={handleChange}
            placeholder="Owner's Name"
            id="ownerName"
          ></input>
        </div>
        <div>
          <button onClick={handleSubmit}>Submit Pet!</button>
        </div>
      </form>
    </>
  );
};

export default Form;

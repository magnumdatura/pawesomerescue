import React, { useContext, useState } from "react";
import ReactContext from "../context/react-context";

const Form = () => {
  const reactCtx = useContext(ReactContext);

  const [uploadImage, setUploadImage] = useState("");
  const [justSubmitted, setJustSubmitted] = useState(false);

  const submitForm = async (url) => {
    const formdata = new FormData();
    formdata.append("title", reactCtx.titleInput);
    formdata.append("image", uploadImage);

    formdata.append("petName", reactCtx.petNameInput);
    formdata.append("species", reactCtx.speciesInput);
    formdata.append("breed", reactCtx.breedInput);
    formdata.append("sex", reactCtx.sexInput);
    formdata.append("size", reactCtx.sizeInput);
    formdata.append("age", reactCtx.ageInput);
    formdata.append("medical", reactCtx.medicalInput);
    formdata.append("comments", reactCtx.commentsInput);

    formdata.append("ownerContactName", reactCtx.ownerNameInput);
    formdata.append("ownerContactEmail", reactCtx.ownerEmailInput);
    formdata.append("ownerContactPhone", reactCtx.ownerPhoneInput);
    formdata.append("ownerContactAddress", reactCtx.ownerAddressInput);

    const options = {
      method: "PUT",
      headers: {
        // "Content-Type": "multipart/form-data",
        authorization: "Bearer " + reactCtx.access,
      },
      body: formdata,
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
      window.alert("Listing created!");
      setJustSubmitted(true);
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
    if (event.target.id === "comments")
      reactCtx.setCommentsInput(event.target.value);
    if (event.target.id === "ownerName")
      reactCtx.setOwnerNameInput(event.target.value);
    if (event.target.id === "ownerEmail")
      reactCtx.setOwnerEmailInput(event.target.value);
    if (event.target.id === "ownerPhone")
      reactCtx.setOwnerPhoneInput(event.target.value);
    if (event.target.id === "ownerAddress")
      reactCtx.setOwnerAddressInput(event.target.value);
    if (event.target.id === "file") setUploadImage(event.target.files[0]);
  }

  function handleSubmit(event) {
    event.preventDefault();
    submitForm("http://localhost:5001/listings/create");
  }

  function clearInputFields(event) {
    event.preventDefault();
  }

  return (
    <>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div>
          <h3 className="text-center mx-auto m-2 w-1/3 block w-50 px-3 py-2">
            Submit An Adoption!
          </h3>
        </div>
        <div className="grid grid-cols-6 gap-2">
          <span className="col-start-1 col-end-4">
            <div>
              <input
                type="text"
                onChange={handleChange}
                placeholder="Title of Listing"
                id="title"
                value={reactCtx.titleInput}
                className="mx-auto m-2 w-2/3 block w-100 px-3 py-2 bg-white border-1 border-slate-300 rounded-md text-sm shadow-md placeholder-slate-400 capitalize
              focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 placeholder:italic"
              ></input>
            </div>
            <div>
              <input
                type="text"
                onChange={handleChange}
                placeholder="Pet Name"
                id="petName"
                value={reactCtx.petNameInput}
                className="mx-auto m-2 w-2/3 block w-50 px-3 py-2 bg-white border-1 border-slate-300 rounded-md text-sm shadow-md placeholder-slate-400 capitalize
              focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 placeholder:italic"
              ></input>
            </div>
            <div>
              <input
                type="text"
                onChange={handleChange}
                placeholder="Species"
                id="species"
                value={reactCtx.speciesInput}
                className="mx-auto m-2 w-2/3 block w-50 px-3 py-2 bg-white border-1 border-slate-300 rounded-md text-sm shadow-md placeholder-slate-400 capitalize
              focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 placeholder:italic"
              ></input>
            </div>
            <div>
              <input
                type="text"
                onChange={handleChange}
                placeholder="Breed"
                id="breed"
                value={reactCtx.breedInput}
                className="mx-auto m-2 w-2/3 block w-50 px-3 py-2 bg-white border-1 border-slate-300 rounded-md text-sm shadow-md placeholder-slate-400 capitalize
              focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 placeholder:italic"
              ></input>
            </div>
            <div>
              <input
                type="text"
                onChange={handleChange}
                placeholder="Sex"
                id="sex"
                value={reactCtx.sexInput}
                className="mx-auto m-2 w-2/3 block w-50 px-3 py-2 bg-white border-1 border-slate-300 rounded-md text-sm shadow-md placeholder-slate-400 capitalize
              focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 placeholder:italic"
              ></input>
            </div>
            <div>
              <input
                type="text"
                onChange={handleChange}
                placeholder="Size"
                id="size"
                value={reactCtx.sizeInput}
                className="mx-auto m-2 w-2/3 block w-50 px-3 py-2 bg-white border-1 border-slate-300 rounded-md text-sm shadow-md placeholder-slate-400 capitalize
              focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 placeholder:italic"
              ></input>
            </div>
            <div>
              <input
                type="text"
                onChange={handleChange}
                placeholder="Age of Pet"
                id="age"
                value={reactCtx.ageInput}
                className="mx-auto m-2 w-2/3 block w-50 px-3 py-2 bg-white border-1 border-slate-300 rounded-md text-sm shadow-md placeholder-slate-400 capitalize
              focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 placeholder:italic"
              ></input>
            </div>
            <div>
              <input
                type="text"
                onChange={handleChange}
                placeholder="Medical Conditions"
                id="medical"
                value={reactCtx.medicalInput}
                className="mx-auto m-2 w-2/3 block w-50 px-3 py-2 bg-white border-1 border-slate-300 rounded-md text-sm shadow-md placeholder-slate-400 capitalize
              focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 placeholder:italic"
              ></input>
            </div>
            <div>
              <input
                type="text"
                onChange={handleChange}
                placeholder="Comments"
                id="comments"
                value={reactCtx.commentsInput}
                className="mx-auto m-2 w-2/3 block w-50 px-3 py-2 bg-white border-1 border-slate-300 rounded-md text-sm shadow-md placeholder-slate-400 capitalize
              focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 placeholder:italic"
              ></input>
            </div>
          </span>
          <span className="col-end-7 col-span-3">
            <h3 className="text-center mx-auto m-2 w-1/3 block w-50 px-3">
              Contact Details:
            </h3>
            <div>
              <input
                type="text"
                onChange={handleChange}
                placeholder="Owner's Name"
                id="ownerName"
                value={reactCtx.ownerNameInput}
                className="mx-auto m-2 w-2/3 block w-50 px-3 py-2 bg-white border-1 border-slate-300 rounded-md text-sm shadow-md placeholder-slate-400 capitalize
              focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 placeholder:italic"
              ></input>
            </div>
            <div>
              <input
                type="text"
                onChange={handleChange}
                placeholder="Owner's Email"
                id="ownerEmail"
                value={reactCtx.ownerEmailInput}
                className="mx-auto m-2 w-2/3 block w-50 px-3 py-2 bg-white border-1 border-slate-300 rounded-md text-sm shadow-md placeholder-slate-400 capitalize
              focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 placeholder:italic"
              ></input>
            </div>
            <div>
              <input
                type="text"
                onChange={handleChange}
                placeholder="Owner's Phone"
                id="ownerPhone"
                value={reactCtx.ownerPhoneInput}
                className="mx-auto m-2 w-2/3 block w-50 px-3 py-2 bg-white border-1 border-slate-300 rounded-md text-sm shadow-md placeholder-slate-400 capitalize
              focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 placeholder:italic"
              ></input>
            </div>
            <div>
              <input
                type="text"
                onChange={handleChange}
                placeholder="Owner's Address"
                id="ownerAddress"
                value={reactCtx.ownerAddressInput}
                className="mx-auto m-2 w-2/3 block w-50 px-3 py-2 bg-white border-1 border-slate-300 rounded-md text-sm shadow-md placeholder-slate-400 capitalize
              focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 placeholder:italic"
              ></input>
            </div>
            <div className="text-center mx-auto m-2 w-1/3 block w-50 px-3 py-2">
              Cover Picture:
              <input
                type="file"
                accept=".png, .jpg, .jpeg"
                name="image"
                onChange={handleChange}
                placeholder="image"
                id="file"
                value={uploadImage}
              ></input>
            </div>
          </span>
        </div>

        {justSubmitted ? (
          <div>
            <button
              onClick={clearInputFields}
              className="text-center mx-auto m-2 w-1/3 block w-50 px-3 py-2 text-white font-semibold rounded-lg shadow-md bg-gradient-to-r from-indigo-500 to-pink-500 hover:from-pink-500 hover:to-yellow-500 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-opacity-75"
            >
              Clear form
            </button>
          </div>
        ) : (
          <div>
            <button
              onClick={handleSubmit}
              className="text-center mx-auto m-2 w-1/3 block w-50 px-3 py-2 text-white font-semibold rounded-lg shadow-md bg-gradient-to-r from-indigo-500 to-pink-500 hover:from-pink-500 hover:to-yellow-500 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-opacity-75"
            >
              Submit Pet!
            </button>
          </div>
        )}
      </form>
    </>
  );
};

export default Form;

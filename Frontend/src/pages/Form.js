import React from "react";

const Form = () => {
  return (
    <>
      <form>
        <div>
          <input type="text" placeholder="Title of Listing"></input>
        </div>
        <div>
          <input type="text" placeholder="Pet Name"></input>
        </div>
        <div>
          <input type="text" placeholder="Species"></input>
        </div>
        <div>
          <input type="text" placeholder="Breed"></input>
        </div>
        <div>
          <input type="text" placeholder="Sex"></input>
        </div>
        <div>
          <input type="text" placeholder="Size"></input>
        </div>
        <div>
          <input type="text" placeholder="Age of Pet"></input>
        </div>
        <div>
          <input type="text" placeholder="Medical Conditions"></input>
        </div>
        <div>
          <button>Submit Pet!</button>
        </div>
      </form>
    </>
  );
};

export default Form;

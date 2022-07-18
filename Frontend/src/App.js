import React, { Suspense, useState } from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import NavBar from "./components/NavBar";
import NavBar2 from "./components/NavBar2";
import ReactContext from "./context/react-context";

const Home = React.lazy(() => import("./pages/Home"));
const Favourite = React.lazy(() => import("./pages/Favourite"));
const Profile = React.lazy(() => import("./pages/Profile"));
const Archive = React.lazy(() => import("./pages/Archive"));
const Form = React.lazy(() => import("./pages/Form"));
const Dogs = React.lazy(() => import("./pages/Dogs"));
const Cats = React.lazy(() => import("./pages/Cats"));
const SmallAnimals = React.lazy(() => import("./pages/SmallAnimals"));
const CreateProfile = React.lazy(() => import("./components/CreateProfile"));

function App() {
  const [access, setAccess] = useState("");
  const [refresh, setRefresh] = useState("");
  //registration
  const [nameInput, setNameInput] = useState("");
  const [profileTypeInput, setProfileTypeInput] = useState("");
  const [addressInput, setAddressInput] = useState("");
  const [phoneInput, setPhoneInput] = useState("");

  //password1 for the sign up page
  //profile
  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [displayAll, setDisplayAll] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [validEmail, setValidEmail] = useState(false);

  //listing
  const [listing, setListing] = useState("");
  const [titleInput, setTitleInput] = useState("");
  const [petNameInput, setPetNameInput] = useState("");
  const [speciesInput, setSpeciesInput] = useState("");
  const [breedInput, setBreedInput] = useState("");
  const [sexInput, setSexInput] = useState("");
  const [sizeInput, setSizeInput] = useState("");
  const [ageInput, setAgeInput] = useState("");
  const [medicalInput, setMedicalInput] = useState("");
  const [ownerNameInput, setOwnerNameInput] = useState("");
  const [ownerEmailInput, setOwnerEmailInput] = useState("");
  const [ownerPhoneInput, setOwnerPhoneInput] = useState("");
  const [ownerAddressInput, setOwnerAddressInput] = useState("");

  return (
    <ReactContext.Provider
      // these are not mandatory, the "parent" can choose what data the "child" can access
      value={{
        phoneInput,
        setPhoneInput,
        addressInput,
        setAddressInput,
        profileTypeInput,
        setProfileTypeInput,
        nameInput,
        setNameInput,
        access,
        setAccess,
        refresh,
        setRefresh,
        emailInput,
        setEmailInput,
        passwordInput,
        setPasswordInput,
        displayAll,
        setDisplayAll,
        searchInput,
        setSearchInput,
        validEmail,
        setValidEmail,
        listing,
        setListing,
        titleInput,
        ageInput,
        setAgeInput,
        sizeInput,
        setSizeInput,
        sexInput,
        setSexInput,
        breedInput,
        setBreedInput,
        setTitleInput,
        petNameInput,
        medicalInput,
        setMedicalInput,
        setPetNameInput,
        speciesInput,
        setSpeciesInput,
        ownerNameInput,
        setOwnerNameInput,
        ownerEmailInput,
        setOwnerEmailInput,
        ownerPhoneInput,
        setOwnerPhoneInput,
        ownerAddressInput,
        setOwnerAddressInput,
      }}
    >
      <div className="container">
        <NavBar />
        <NavBar2 />
        <Suspense fallback={<p>loading...</p>}>
          <Switch>
            <Route exact path="/">
              <Redirect to="/home"></Redirect>
            </Route>
            <Route exact path="/home">
              <Home />
            </Route>
            <Route path="/Form">
              <Form />
            </Route>
            <Route path="/Archive">
              <Archive />
            </Route>
            <Route path="/favourite">
              <Favourite />
            </Route>
            <Route path="/profile">
              <Profile />
            </Route>
            <Route path="/register">
              <CreateProfile />
            </Route>
            <Route path="/dogs">
              <Dogs />
            </Route>
            <Route path="/cats">
              <Cats />
            </Route>
            <Route path="/smallanimals">
              <SmallAnimals />
            </Route>
          </Switch>
        </Suspense>
      </div>
    </ReactContext.Provider>
  );
}

export default App;

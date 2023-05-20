import { useState, useEffect, useReducer, useRef } from "react";

const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  phoneNumber: "",
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_FIRSTNAME":
      return { ...state, firstName: action.payload };
    case "SET_LASTNAME":
      return { ...state, lastName: action.payload };
    case "SET_EMAIL":
      return { ...state, email: action.payload };
    case "SET_PHONENUMBER":
      return { ...state, phoneNumber: action.payload };
    default:
      return state;
  }
};

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const firstNameRef = useRef();

  const handleInputChange = (e) => {
    dispatch({
      type: `SET_${e.target.name.toUpperCase()}`,
      payload: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    console.log({ state });
    // API call simulation
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setIsSubmitting(false);
  };

  useEffect(() => {
    firstNameRef.current.focus();
  }, []);

  return (
    <form onSubmit={handleSubmit}>
      <input
        ref={firstNameRef}
        type="text"
        name="firstName"
        placeholder="First Name"
        onChange={handleInputChange}
        value={state.firstName}
      />
      <input
        type="text"
        name="lastName"
        placeholder="Last Name"
        onChange={handleInputChange}
        value={state.lastName}
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        onChange={handleInputChange}
        value={state.email}
      />
      <input
        type="tel"
        name="phoneNumber"
        placeholder="Phone Number"
        onChange={handleInputChange}
        value={state.phoneNumber}
      />
      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Submitting" : "Register"}
      </button>
    </form>
  );
}

export default App;

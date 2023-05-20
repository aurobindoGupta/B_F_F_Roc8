import { useState, useEffect, useReducer, useRef, FormEvent } from "react";

interface StateType {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
}

type Action =
  | { type: "SET_FIRSTNAME"; payload: string }
  | { type: "SET_LASTNAME"; payload: string }
  | { type: "SET_EMAIL"; payload: string }
  | { type: "SET_PHONENUMBER"; payload: string };

const initialState: StateType = {
  firstName: "",
  lastName: "",
  email: "",
  phoneNumber: "",
};

const reducer = (state: StateType, action: Action): StateType => {
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

const App: React.FC = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const firstNameRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({
      // @ts-expect-error we cant pass this check video
      type: `SET_${e.target.name.toUpperCase()}`,
      payload: e.target.value,
    });
  };

const handleSubmit = async (e:FormEvent) => {
  e.preventDefault();
  setIsSubmitting(true);
  console.log({ state });
  // API call simulation
  await new Promise((resolve) => setTimeout(resolve, 2000));

  setIsSubmitting(false);
};
  useEffect(() => {
    firstNameRef.current?.focus();
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
};

export default App;

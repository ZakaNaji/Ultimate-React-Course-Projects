import ReactDOM from "react-dom/client";
import App from "./App";
//import "./index.css";
import StarRating from "./StarRating";
import { useState } from "react";

const Test = () => {
  const [rating, setRating] = useState(0);
  return (
    <div>
      <StarRating maxRating={10} onSetRating={setRating} />
      <p>YOU DID RATE THIS A : {rating}</p>
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Test />);

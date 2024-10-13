import { useDispatch } from "react-redux";
import Button from "../../ui/Button";
import { decreaseQuantity, increaseQuantity } from "./cartSlice";

export default function UpdateItemQuantity({ pizzaId, currentQuantity }) {
  const dispatch = useDispatch();
  const handleIncrease = () => dispatch(increaseQuantity(pizzaId));
  const handleDecrease = () => dispatch(decreaseQuantity(pizzaId));

  return (
    <div className="flex items-center gap-1 md:gap-3">
      <Button type="round" onClick={handleDecrease}>
        -
      </Button>
      <span>{currentQuantity}</span>
      <Button type="round" onClick={handleIncrease}>
        +
      </Button>
    </div>
  );
}

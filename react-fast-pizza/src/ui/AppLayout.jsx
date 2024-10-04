import { Outlet } from "react-router-dom";
import Header from "./Header";
import CartOverView from "../features/cart/CartOverview";
export default function AppLayout() {
  return (
    <div>
      <Header />
      <main>
        <Outlet />
      </main>
      <CartOverView />
    </div>
  );
}

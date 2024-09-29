import { useSelector } from "react-redux";

function formatCurrency(value) {
  return new Intl.NumberFormat("en", {
    style: "currency",
    currency: "USD",
  }).format(value);
}

function BalanceDisplay() {
  const account = useSelector((state) => state.account);

  return (
    <div className="balance">{formatCurrency(Number(account.amount))}</div>
  );
}

export default BalanceDisplay;

import { Money } from "./Money";
import { Products } from "./Products";
import { useState } from "react";

export const Container = () => {
  const [totalMoney, setTotalMoney] = useState(100000000000);
  return (
    <div className="container">
      <Money totalMoney={totalMoney} />
      <Products totalMoney={totalMoney} setTotalMoney={setTotalMoney} />
    </div>
  );
};

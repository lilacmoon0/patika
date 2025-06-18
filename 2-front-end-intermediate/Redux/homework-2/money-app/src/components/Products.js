import { useSelector } from "react-redux";
import { productsSelectors } from "../Redux/ProductsSlice/productsSlice";
import unslugify from "unslugify";
import { updateProducts } from "../Redux/ProductsSlice/productsSlice";
import { useDispatch } from "react-redux";
import { useState, useEffect } from "react";

export const Products = ({ setTotalMoney, totalMoney }) => {
  const products = useSelector(productsSelectors.selectAll);
  const dispatch = useDispatch();
  const [spentMoney, setSpentMoney] = useState(0);

  useEffect(() => {
    const spent = products
      .filter((product) => product.amount > 0)
      .reduce((acc, product) => acc + product.price * product.amount, 0);
    setSpentMoney(spent);
    setTotalMoney(100000000000 - spent);
  }, [products]);
  return (
    <>
      <div className="products">
        {products.map((product) => (
          <div key={product.id} className="productCard">
            <img src={product.img} alt={product.name} />
            <h2>{unslugify(product.name)}</h2>
            <p>${product.price.toLocaleString("de-DE")}</p>
            <button
              className="sellButton"
              disabled={product.amount <= 0}
              onClick={() => {
                if (product.amount > 0) {
                  dispatch(
                    updateProducts({
                      id: product.id,
                      changes: { amount: product.amount - 1 },
                    })
                  );
                }
              }}
            >
              Sell
            </button>
            <input
              max={product.amount + Math.floor(totalMoney / product.price)}
              min={0}
              disabled={product.price > totalMoney && product.amount === 0}
              value={product.amount ? product.amount : ""}
              type="number"
              placeholder={product.amount}
              onChange={(e) => {
                let value = Number(e.target.value);

                const maxValue =
                  product.amount + Math.floor(totalMoney / product.price);
                if (value > maxValue) value = maxValue;
                if (value < 0) value = 0;
                dispatch(
                  updateProducts({
                    id: product.id,
                    changes: { amount: value },
                  })
                );
              }}
            ></input>
            <button
              disabled={product.price > totalMoney}
              onClick={() => {
                if (totalMoney >= product.price) {
                  dispatch(
                    updateProducts({
                      id: product.id,
                      changes: { amount: product.amount + 1 },
                    })
                  );
                } else {
                  alert("Not enough money to buy this product!");
                }
              }}
            >
              Buy
            </button>
          </div>
        ))}
      </div>
      <div>
        <div>
          {spentMoney > 0 && (
            <>
              <h1>Your Receipt</h1>
              {products
                .filter((product) => product.amount > 0)
                .map((product) => (
                  <div key={product.id} className="receiptCard">
                    <h5 className="name">{unslugify(product.name)}</h5>
                    <p className="x">x{product.amount}</p>
                    <p className="price">
                      $
                      {(product.price * product.amount).toLocaleString("de-DE")}
                    </p>
                  </div>
                ))}
              <h2>Total Spent: ${spentMoney.toLocaleString("de-DE")}</h2>
            </>
          )}
        </div>
      </div>
    </>
  );
};

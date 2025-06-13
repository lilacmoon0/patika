import { useEffect, useRef, useState } from "react";

export const Money = ({ totalMoney }) => {
  const [displayMoney, setDisplayMoney] = useState(Number(totalMoney) || 0);
  const raf = useRef();

  useEffect(() => {
    const duration = 600; // ms
    const start = displayMoney;
    const end = Number(totalMoney) || 0;
    const startTime = performance.now();

    const animate = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const value = Math.round(start + (end - start) * progress);
      setDisplayMoney(value);
      if (progress < 1) {
        raf.current = requestAnimationFrame(animate);
      }
    };

    cancelAnimationFrame(raf.current);
    raf.current = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(raf.current);
    // eslint-disable-next-line
  }, [totalMoney]);

  return (
    <div className="money">
      <img src="/billgates.jpg" alt="Bill Gates" />
      <h1>Spend Bill Gates' Money</h1>
      <h2>${displayMoney.toLocaleString("de-DE")}</h2>
    </div>
  );
};

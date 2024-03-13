import { useState, useEffect } from "react";
import "../styles/styles.css";

const COUNTDOWN_TARGET = new Date("2024-03-29T23:59:59");

const getTimeLeft = () => {
  const totalTimeLeft = COUNTDOWN_TARGET - new Date();
  const giorni = Math.floor(totalTimeLeft / (1000 * 60 * 60 * 24));
  const ore = Math.floor((totalTimeLeft / (1000 * 60 * 60)) % 24);
  const minuti = Math.floor((totalTimeLeft / (1000 * 60)) % 60);
  const secondi = Math.floor((totalTimeLeft / 1000) % 60);
  return { giorni, ore, minuti, secondi };
};

const Countdown = () => {
  const [timeLeft, setTimeLeft] = useState(() => getTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(getTimeLeft());
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <div className="countdown pb-2">
      <div className="content">
        {Object.entries(timeLeft).map((el) => {
          const label = el[0];
          const value = el[1];
          return (
            <div className="box" key={label}>
              <div className="value">
                <span>{value}</span>
              </div>
              <span className="label"> {label} </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Countdown;

import { useEffect, useState } from "react";
import Confetti from "react-dom-confetti";

import { SquareDesc } from "../lib/squares";
import sfxConfetti from "./media/confetti.mp3";
import { Square } from "./Square";

import "./Card.scss";

type Props = {
  squares: SquareDesc[];
};

const confettiProps = {
  angle: 90,
  spread: 131,
  startVelocity: 47,
  elementCount: 87,
  dragFriction: 0.21,
  duration: 3200,
  stagger: 0,
  width: "16px",
  height: "10px",
  perspective: "500px",
  colors: ["#a864fd", "#29cdff", "#78ff44", "#ff718d", "#fdff6a"],
};

const Star = () => (
  <svg className="tb-star" viewBox="0 0 128 128">
    <path
      className="tb-star__glyph"
      d="M64 28L77.5849 45.302L98.238 52.8754L85.9808 71.142L85.1603 93.1246L64 87.112L42.8397 93.1246L42.0192 71.142L29.762 52.8754L50.4151 45.302L64 28Z"
    />
  </svg>
);

export const Card = ({ squares }: Props) => {
  const [picks, setPicks] = useState<Array<number>>(new Array(25).fill(0));
  const [isWin, setIsWin] = useState(false);

  const setSquare = (setId: number) => {
    setPicks(
      picks.map((square, id) => (id === setId ? (square + 1) % 2 : square))
    );
  };

  useEffect(() => {
    const checkRow = (row: number) => {
      const r = picks.slice(row * 5, row * 5 + 5);
      return r.every((p) => p === 1);
    };

    const checkCol = (col: number) => {
      const c = picks.filter((p, id) => id % 5 === col);
      return c.every((p) => p === 1);
    };

    const hasWin = Array.from(Array(5).keys()).find((index) => {
      const hasRow = checkRow(index);
      const hasCol = checkCol(index);
      return hasRow || hasCol;
    });
    setIsWin(hasWin !== undefined);
  }, [picks]);

  useEffect(() => {
    if (isWin === true) {
      new Audio(sfxConfetti).play();
    }
  }, [isWin]);

  return (
    <div className="tb-playfield">
      <div className="tb-card">
        {squares.map((square, id) => {
          return (
            <Square
              key={id}
              set={picks[id] === 1}
              onClick={() => setSquare(id)}
            >
              {id === 12 ? <Star /> : square.title}
            </Square>
          );
        })}
      </div>

      {isWin && <h1 className="tb-playfield__message">Pro-Level Win</h1>}
      <div className="tb-playfield__confetti">
        <Confetti config={confettiProps} active={isWin} />
      </div>
    </div>
  );
};

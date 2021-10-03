import classnames from "classnames";
import { PropsWithChildren } from "react";

import "./Square.scss";

type SquareProps = {
  label?: string;
  set?: boolean;
  onClick?: () => void;
};

export const Square = ({
  label,
  set,
  onClick,
  children,
}: PropsWithChildren<SquareProps>) => {
  const classes = classnames({
    "tb-square": true,
    "tb-square--is-highlighted": set,
  });
  return (
    <div className={classes} onClick={onClick}>
      <div className="tb-square__text">{label || children}</div>
    </div>
  );
};

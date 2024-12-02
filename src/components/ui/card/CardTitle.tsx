"use client";
import { type FC } from "react";

interface CardTitleWithIconProps {
  icon?: React.ReactNode;
  text: string;
  className?: string;
  classNameTitle?: string;
  classNameIcon?: string;
}

export const CardTitle: FC<CardTitleWithIconProps> = ({
  icon,
  text,
  className = "",
  classNameIcon = "",
  classNameTitle = "",
}) => {
  return (
    <div className={className}>
      {icon && <div className={classNameIcon}>{icon}</div>}
      <div className={classNameTitle}>{text}</div>
    </div>
  );
};

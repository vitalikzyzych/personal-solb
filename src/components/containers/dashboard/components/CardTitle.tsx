"use client";
import React from "react";

interface CardTitleWithIconProps {
  icon?: React.ReactNode;
  text: string;
  className?: string;
  classNameTitle?: string;
  classNameIcon?: string;
}

const CardTitle: React.FC<CardTitleWithIconProps> = ({
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

export default CardTitle;

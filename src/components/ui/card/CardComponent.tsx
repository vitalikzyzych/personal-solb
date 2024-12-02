"use client";
import { Card, type CardProps } from "primereact/card";
import { Button } from "primereact/button";
import { type FC } from "react";

interface CardComponentProps {
  title: React.ReactNode;
  subTitle?: React.ReactNode;
  content: React.ReactNode;
  footer?: React.ReactNode;
  onButtonClick?: () => void;
  cardProps?: CardProps;
  buttonLabel?: string;
  className?: string; // Add className prop
}

export const CardComponent: FC<CardComponentProps> = ({
  title,
  subTitle,
  content,
  footer,
  onButtonClick,
  buttonLabel,
  className = "",
  cardProps,
}) => {
  return (
    <Card
      title={title}
      subTitle={subTitle}
      footer={footer}
      className={`h-full ${className}`}
      {...cardProps}
    >
      {content}
      {onButtonClick && buttonLabel && (
        <Button label={buttonLabel} onClick={onButtonClick} />
      )}
    </Card>
  );
};

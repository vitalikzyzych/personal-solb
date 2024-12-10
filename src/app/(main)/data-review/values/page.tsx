"use client";
import { Values } from "@/screens";
import { useEffect } from "react";
import { type Page } from "types";

const ValuesPage: Page = () => {
  useEffect(() => {
    console.log("TESSSST");
  }, []);
  return <Values />;
};

export default ValuesPage;

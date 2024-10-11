"use client";

import { useEffect } from "react";
import { helloInConsole } from "@/helpers";

export const ConsoleLog = () => {
  useEffect(() => {
    helloInConsole();
  }, []);

  return null;
};

"use client";

import { useEffect, useState } from "react";

const DateDisplay = () => {
  const [date, setDate] = useState("");

  useEffect(() => {
    setDate(
      new Date().toLocaleDateString("bn-BD", {
        dateStyle: "full",
      }),
    );
  }, []);

  return (
    <p className="text-xs text-gray-500 font-normal mt-0.5">
      {date}
    </p>
  );
};

export default DateDisplay;

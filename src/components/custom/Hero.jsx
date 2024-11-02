import React from "react";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";
import backgroundImage from "/heroSection.jpg"; 

function Hero() {
  return (
    <div
      className="flex flex-col items-center justify-start pt-16 gap-9 h-screen w-full bg-cover bg-center"
      style={{
        backgroundImage: `url(${backgroundImage})`,
      }}
    >
      <h1 className="font-extrabold text-[50px] text-[white] text-center mt-16">
        Your Next Journey, Optimized
      </h1>

      <p className="text-xl font-semibold text-center w-[700px] mx-auto  ">
        Build, personalize, and optimize your itineraries with our free AI trip planner. Designed for vacations and everyday adventures.
      </p>

      <Link to={"/create-trip"}>
        <Button className="rounded-full mt-[20px] w-[200px] h-[60px] text-md">Get started, it's free</Button>
      </Link>
    </div>
  );
}

export default Hero;

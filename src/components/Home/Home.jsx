import React, { useEffect, useState } from "react";
import Style from "./Home.module.css";
import axios from "axios";
import RecentProduct from "../RecentProduct/RecentProduct";
import CategorySlider from "../CategorySlider/CategorySlider";
import MainSlider from "../MainSlider/MainSlider";

export default function Home() {
  useEffect(() => {
    const hasReloaded = sessionStorage.getItem("hasReloaded");
    if (!hasReloaded) {
      sessionStorage.setItem("hasReloaded", "true");
      window.location.reload();
    }
  }, []);
  return (
    <>
      <MainSlider />
      <CategorySlider />
      <RecentProduct />
    </>
  );
}

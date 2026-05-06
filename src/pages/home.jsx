import CarouselComponent from "../components/crousel";
import Tabs from "../components/tabs";
import { useEffect } from "react";
import axios from "axios";
import Banner from "../components/banner";


function Home() {
  

  return (
    <main className="mt-5">
      <Banner/>
      <Tabs />
      <CarouselComponent />
    </main>
  );
}

export default Home;

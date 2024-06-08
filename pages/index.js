import Background from "./components/Background";
import TestNav from "./components/TestNav";
import Information from "./components/Information";
import Search from "./components/Search";

import { BackgroundProvider } from "@/context/BackgroundContext";
import { WeatherProvider } from "@/context/WeatherContext";

export default function Home() {

  return (
    
      <BackgroundProvider>
        <WeatherProvider>
          <Background />
          <TestNav />
          <Search />
          <Information />
        </WeatherProvider>
      </BackgroundProvider>
  );

}

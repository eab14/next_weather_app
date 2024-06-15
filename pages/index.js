import Background from "./components/Background";
import Information from "./components/Information";
import Search from "./components/Search";
import CardSpacer from "./components/CardSpacer";
import Utilities from "./components/Utilities";

import { BackgroundProvider } from "@/context/BackgroundContext";
import { WeatherProvider } from "@/context/WeatherContext";

export default function Home() {

  return (
    
      <BackgroundProvider>
        <WeatherProvider>
          <Background />
          <Search />
          <Information />
          <CardSpacer />
          <Utilities />
        </WeatherProvider>
      </BackgroundProvider>
  );

}

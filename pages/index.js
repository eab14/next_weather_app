import Background from "./components/Background";
import Forecast from "./components/Forecast";
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
          <Forecast />
          <CardSpacer />
          <Utilities />
        </WeatherProvider>
      </BackgroundProvider>
  );

}

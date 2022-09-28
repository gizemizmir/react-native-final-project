import { StatusBar } from "expo-status-bar";

import { Provider } from "react-redux";

import MainStackNavigation from "./src/navigations/mainStackNavigation";
import { store } from "./src/store";
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function App() {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <NavigationContainer>
          <StatusBar style="auto" />
          <MainStackNavigation />
        </NavigationContainer>
      </SafeAreaProvider>
    </Provider>
  );
}

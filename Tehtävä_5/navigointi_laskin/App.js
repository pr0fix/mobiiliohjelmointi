import { StatusBar } from "expo-status-bar";
import Calculator from "./screens/Calculator";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useState } from "react";
import History from "./screens/History";

const Stack = createNativeStackNavigator();

export default function App() {
  const [results, setResults] = useState([]);

  return (
    <>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Calculator" options={{ title: "Calculator" }}>
            {(props) => (
              <Calculator
                {...props}
                results={results}
                setResults={setResults}
              />
            )}
          </Stack.Screen>
          <Stack.Screen
            name="History"
            options={{title: "History"}}
          >
            {(props) => <History {...props} results={results}/>}
          </Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>

      <StatusBar style="auto" />
    </>
  );
}

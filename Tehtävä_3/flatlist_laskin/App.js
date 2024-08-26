import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import {
  Text,
  Button,
  StyleSheet,
  View,
  TextInput,
  FlatList,
} from "react-native";

export default function App() {
  const [firstNumber, setFirstNumber] = useState("");
  const [secondNumber, setSecondNumber] = useState("");
  const [result, setResult] = useState(0);
  const [results, setResults] = useState([]);

  const listEmptyComponent = () => {
    return <Text>No data available...</Text>;
  };

  const showResult = (type) => {
    const num1 = parseFloat(firstNumber);
    const num2 = parseFloat(secondNumber);
    let calculation = 0;
    let operator = "";

    if (type === "plus") {
      calculation = num1 + num2;
      operator = "+";
    } else if (type === "minus") {
      calculation = num1 - num2;
      operator = "-";
    }
    const equation = `${num1} ${operator} ${num2} = ${calculation}`;
    setResult(calculation);
    setResults([...results, { key: equation }]);
  };
  return (
    <View style={styles.container}>
      <Text>Result: {result}</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        onChangeText={(number) => setFirstNumber(number)}
      />
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        onChangeText={(number) => setSecondNumber(number)}
      />
      <View style={styles.buttons}>
        <Button title="+" onPress={() => showResult("plus")} />
        <Button title="-" onPress={() => showResult("minus")} />
      </View>
      <View style={styles.list}>
        <Text>History</Text>
        <FlatList
          ListEmptyComponent={listEmptyComponent}
          data={results}
          renderItem={({ item }) => <Text>{item.key}</Text>}
        ></FlatList>
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    height: 40,
    width: "50%",
    borderColor: "#000",
    borderWidth: 1,
  },
  buttons: {
    flexDirection: "row",
    gap: 20,
    margin: 20,
  },
  list: {
    margin: 50,
    width: "50%",
    alignItems: "center",
  },
});

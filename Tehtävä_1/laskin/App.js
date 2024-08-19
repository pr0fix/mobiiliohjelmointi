import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { Text, Button, StyleSheet, View, TextInput } from "react-native";

export default function App() {
  const [firstNumber, setFirstNumber] = useState("");
  const [secondNumber, setSecondNumber] = useState("");
  const [result, setResult] = useState(0);

  const showResult = (type) => {
    const num1 = parseFloat(firstNumber);
    const num2 = parseFloat(secondNumber);
    if (type === "plus") {
      setResult(num1 + num2);
    } else if (type === "minus") {
      setResult(num1 - num2);
    }
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
});

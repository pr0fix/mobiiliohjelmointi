import { StatusBar } from "expo-status-bar";
import { useRef, useState } from "react";
import { StyleSheet, Text, View, TextInput, Button, Alert } from "react-native";

export default function App() {
  const [randomNum, setRandomNum] = useState(
    Math.floor(Math.random() * 100) - 1
  );
  const [text, setText] = useState("Guess a number between 1-100");
  const [guess, setGuess] = useState("");
  const [guesses, setGuesses] = useState(0);

  const handlePress = () => {
    const parsedGuess = parseInt(guess);
    setGuesses((prevGuesses) => prevGuesses + 1);

    if (parsedGuess === randomNum) {
      Alert.alert(`You guessed the number in ${guesses + 1} guesses`);
      setText("Guess a number between 1-100");
      setGuess("");
      setGuesses(0);
      setRandomNum(Math.floor(Math.random() * 100) + 1);
    } else if (parsedGuess > randomNum) {
      setText(`Your guess ${guess} is too high`);
    } else if (parsedGuess < randomNum) {
      setText(`Your guess ${guess} is too low`);
    }
  };

  return (
    <View style={styles.container}>
      <Text>{text}</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={guess}
        onChangeText={(text) => setGuess(text)}
      ></TextInput>
      <Button title="MAKE GUESS" onPress={handlePress} />
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
    gap: 20,
  },
  input: {
    height: 40,
    width: "15%",
    borderColor: "#000",
    borderWidth: 1,
  },
});

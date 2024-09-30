import { useState } from "react";
import { Button, StyleSheet, TextInput, View } from "react-native";
import * as Speech from "expo-speech";

export default function App() {
  const [prompt, setPrompt] = useState("");

  const textToSpeech = () => {
    Speech.speak(prompt);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.inputField}
        placeholder="type"
        onChangeText={(text) => setPrompt(text)}
      />
      <Button title="press to hear text" onPress={textToSpeech} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },
  inputField: {
    borderWidth: 1,
    width: 300,
    height: 80,
    padding: 5,
    justifyContent: "center",
    alignItems: "center",
  },
});

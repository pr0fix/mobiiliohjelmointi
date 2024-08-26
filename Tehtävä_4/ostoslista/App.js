import { StatusBar } from "expo-status-bar";
import { useRef, useState } from "react";
import {
  Button,
  FlatList,
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

export default function App() {
  const [listItem, setListItem] = useState("");
  const [listItems, setListItems] = useState([]);
  const inputRef = useRef(null);

  const addItem = () => {
    if (listItem.trim()) {
      setListItems([listItem, ...listItems]);
      setListItem("");
      Keyboard.dismiss();
    }
  };

  const clearItem = () => {
    setListItems([]);
  };

  return (
    <View style={styles.container}>
      <View style={styles.input}>
        <TextInput
          style={styles.inputField}
          placeholder="Enter a new item..."
          onChangeText={(text) => setListItem(text)}
          keyboardType="default"
          ref={inputRef}
          value={listItem}
        ></TextInput>
        <View style={styles.buttons}>
          <Button title="ADD" onPress={addItem}></Button>
          <Button title="CLEAR" onPress={clearItem}></Button>
        </View>
      </View>
      <View style={styles.list}>
        <Text style={styles.listTitle}>Shopping List</Text>
        <FlatList
          data={listItems}
          renderItem={({ item }) => (
            <View style={styles.listItem}>
              <Text style={styles.normalTextStyle}>{item}</Text>
            </View>
          )}
        ></FlatList>
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 150,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  normalTextStyle: {
    fontSize: 15,
  },
  inputField: {
    borderWidth: 1,
    width: 200,
    padding: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  listTitle: {
    fontSize: 25,
    color: "blue",
  },
  buttons: {
    flexDirection: "row",
    marginTop: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  list: {
    marginTop: 30,
  },
  listItem: {
    padding: 5,
    justifyContent: "center",
    alignItems: "center",
  },
});

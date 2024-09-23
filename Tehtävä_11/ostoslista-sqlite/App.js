import { StatusBar } from "expo-status-bar";
import { useEffect, useRef, useState } from "react";
import {
  Button,
  FlatList,
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import * as SQLite from "expo-sqlite";

export default function App() {
  const [product, setProduct] = useState("");
  const [amount, setAmount] = useState("");
  const [listItems, setListItems] = useState([]);
  const db = SQLite.openDatabaseSync("shoppinglistdb");
  const inputRef = useRef(null);

  const initializeDB = async () => {
    try {
      await db.execAsync(
        `CREATE TABLE IF NOT EXISTS shoppinglist (id INTEGER PRIMARY KEY NOT NULL UNIQUE, product TEXT, amount TEXT)`
      );
    } catch (error) {
      console.error("Could not open database", error);
    }
  };

  useEffect(() => {
    initializeDB();
  }, []);

  const saveProduct = async () => {
    try {
      await db.runAsync(
        "INSERT INTO shoppinglist VALUES(?,?,?)",
        null,
        product,
        amount
      );
      updateList();
    } catch (error) {
      console.error("Could not add item", error);
    }
  };

  const updateList = async () => {
    try {
      const list = db.getAllSync("SELECT * FROM shoppinglist");
      setListItems(list);
    } catch (error) {
      console.error("Could not get items", error);
    }
  };

  const deleteItem = async (id) => {
    try {
      await db.runAsync("DELETE FROM shoppinglist WHERE id=?", id);
      await updateList();
    } catch (error) {
      console.error("Could not delete item", id);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.input}>
        <TextInput
          style={styles.inputField}
          placeholder="Product"
          onChangeText={(text) => setProduct(text)}
          keyboardType="default"
          ref={inputRef}
          value={product}
        />
        <TextInput
          style={styles.inputField}
          placeholder="Amount"
          onChangeText={(text) => setAmount(text)}
          keyboardType="default"
          ref={inputRef}
          value={amount}
        />
        <View style={styles.buttons}>
          <Button title="SAVE" onPress={saveProduct}></Button>
        </View>
      </View>
      <View style={styles.list}>
        <Text style={styles.listTitle}>Shopping List</Text>
        <FlatList
          keyExtractor={(item) => item.id.toString()}
          data={listItems}
          renderItem={({ item }) => (
            <View style={styles.listItem}>
              <Text style={styles.normalTextStyle}>
                {item.product}, {item.amount}{" "}
                <Text
                  style={{ color: "blue" }}
                  onPress={() => deleteItem(item.id)}
                >
                  bought
                </Text>
              </Text>
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

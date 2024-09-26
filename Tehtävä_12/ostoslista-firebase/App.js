import { StatusBar } from "expo-status-bar";
import { useRef, useState, useEffect } from "react";
import {
  Button,
  FlatList,
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  View,
  Alert,
} from "react-native";
import { app } from "./firebaseConfig";
import { getDatabase, ref, push, onValue, remove } from "firebase/database";

const db = getDatabase(app);

export default function App() {
  const [product, setProduct] = useState({
    title: "",
    amount: "",
  });
  const [products, setProducts] = useState([]);
  const inputRef = useRef(null);

  useEffect(() => {
    const itemsRef = ref(db, "/items");

    onValue(itemsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const productList = Object.keys(data).map((key) => ({
          id: key,
          ...data[key],
        }));
        setProducts(productList);
      } else {
        setProducts([]);
      }
    });
  }, []);

  const saveProduct = async () => {
    try {
      push(ref(db, "/items"), product);
      Keyboard.dismiss();
    } catch (error) {
      Alert.alert("Adding product failed.");
    } finally {
      setProduct({ title: "", amount: "" });
    }
  };

  const deleteItem = async (id) => {
    try {
      await remove(ref(db, `/items/${id}`));
    } catch (error) {
      Alert.alert("Deleting product failed.");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.input}>
        <TextInput
          style={styles.inputField}
          placeholder="Product"
          onChangeText={(text) => setProduct({ ...product, title: text })}
          keyboardType="default"
          ref={inputRef}
          value={product.title}
        />
        <TextInput
          style={styles.inputField}
          placeholder="Amount"
          onChangeText={(text) => setProduct({ ...product, amount: text })}
          keyboardType="default"
          ref={inputRef}
          value={product.amount}
        />
        <View style={styles.buttons}>
          <Button title="SAVE" onPress={saveProduct}></Button>
        </View>
      </View>
      <View style={styles.list}>
        <Text style={styles.listTitle}>Shopping List</Text>
        <FlatList
          data={products}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.listItem}>
              <Text style={styles.normalTextStyle}>
                {item.title}, {item.amount}{" "}
                <Text
                  style={{ color: "blue" }}
                  onPress={() => deleteItem(item.id)}
                >
                  delete
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

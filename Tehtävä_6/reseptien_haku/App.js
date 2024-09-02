import { StatusBar } from "expo-status-bar";
import {
  ActivityIndicator,
  Button,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { useState } from "react";
import axios from "axios";

export default function App() {
  const [keyword, setKeyword] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleFetch = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `https://www.themealdb.com/api/json/v1/1/filter.php?i=${keyword}`
      );
      setRecipes(res.data.meals);
      setKeyword("");
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <View style={{ marginBottom: 30 }}>
        <TextInput
          style={{ fontSize: 18, width: 200 }}
          placeholder="Type in ingredient..."
          value={keyword}
          onChangeText={(text) => setKeyword(text)}
        />
        <Button title="Find" onPress={handleFetch} />
      </View>

      {loading && <ActivityIndicator size="large" />}

      <FlatList
        data={recipes}
        keyExtractor={(item) => item.idMeal}
        renderItem={({ item }) => (
          <View style={styles.recipeContainer}>
            <Text style={{ fontSize: 18 }}>{item.strMeal}</Text>
            <Image
              style={styles.recipeImage}
              source={{ uri: `${item.strMealThumb}` }}
            />
          </View>
        )}
        style={{ width: 300, height: "100%" }}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      ></FlatList>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 70,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  recipeContainer: {
    marginBottom: 20,
    alignItems: "center",
  },
  recipeImage: {
    alignItems: "flex-start",
    width: 100,
    height: 100,
  },
  separator: {
    height: 1,
    width: "100%",
    backgroundColor: "#CED0CE",
    marginVertical: 10,
  },
});

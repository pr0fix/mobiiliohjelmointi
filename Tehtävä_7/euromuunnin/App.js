import { Button, View, StyleSheet, TextInput, Text, Image } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useEffect, useState } from "react";
import axios from "axios";
import { API_KEY } from "@env";

const coinImage = require("./assets/coins.jpg");

export default function App() {
  const [amount, setAmount] = useState(0);
  const [currencies, setCurrencies] = useState({});
  const [selectedCurrency, setSelectedCurrency] = useState();
  const [convertedAmount, setConvertedAmount] = useState(null);

  const handleConvert = () => {
    if (amount && selectedCurrency && currencies[selectedCurrency]) {
      const rate = currencies[selectedCurrency];
      const result = parseFloat(amount) / rate;
      setConvertedAmount(result.toFixed(2));
    } else {
      setConvertedAmount(null);
    }
  };

  useEffect(() => {
    const handleFetch = async () => {
      try {
        const res = await axios.get(
          "https://api.apilayer.com/exchangerates_data/latest?base=EUR",
          {
            headers: {
              apikey: API_KEY,
            },
          }
        );
        setCurrencies(res.data.rates);
      } catch (error) {
        console.error(error.message);
      }
    };

    handleFetch();
  }, []);

  return (
    <View style={styles.container}>
      <View>
        <Image source={coinImage} style={styles.image}></Image>
        {convertedAmount !== null && (
          <Text
            style={{
              fontSize: 18,
              margin: 20,
              fontWeight: "bold",
              textAlign: "center",
            }}
          >
            {convertedAmount} €
          </Text>
        )}
      </View>

      <View style={styles.inputFields}>
        <TextInput
          style={styles.input}
          placeholder="Enter amount"
          keyboardType="numeric"
          value={amount}
          onChangeText={(text) => setAmount(text)}
        ></TextInput>
        <Picker
          style={styles.picker}
          selectedValue={selectedCurrency}
          onValueChange={(itemValue, itemIndex) =>
            setSelectedCurrency(itemValue)
          }
        >
          {Object.keys(currencies).map((currency) => (
            <Picker.Item
              key={currency}
              label={currency}
              value={currency}
            ></Picker.Item>
          ))}
        </Picker>
      </View>
      <Button title="CONVERT" onPress={handleConvert}></Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 70,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: 150,
    height: 150,
  },

  inputFields: {
    flexDirection: "row",
    alignItems: "center",
    width: 270,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    fontSize: 18,
    padding: 10,
    marginRight: 10,
    flex: 1,
  },
  picker: {
    height: 50,
    width: 120,
  },
});

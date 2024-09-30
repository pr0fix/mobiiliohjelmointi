import { StyleSheet, Text, View, FlatList, Alert, Button } from "react-native";
import * as Contacts from "expo-contacts";
import { useState } from "react";

export default function App() {
  const [contacts, setContacts] = useState([]);

  const getContacts = async () => {
    const { status } = await Contacts.requestPermissionsAsync();
    if (status === "granted") {
      const { data } = await Contacts.getContactsAsync();
      setContacts(data);
    } else {
      Alert.alert("Error fetching contacts", "There was an error");
    }
  };
  return (
    <View style={styles.container}>
      <FlatList
        style={styles.list}
        data={contacts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.listItem}>
            <Text style={styles.normalTextStyle}>
              {item.firstName} {item.lastName} {item.phoneNumbers[0]?.number}
            </Text>
          </View>
        )}
      ></FlatList>
      <View style={styles.buttons}>
        <Button onPress={getContacts} title="get contacts"></Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  normalTextStyle: {
    fontSize: 15,
  },
  buttons: {
    marginBottom: 20,
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

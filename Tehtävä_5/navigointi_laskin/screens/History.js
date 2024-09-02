import {View, Text, FlatList,StyleSheet } from "react-native"

export default function History({ results }) {
  const listEmptyComponent = () => {
    return <Text>No data available...</Text>;
  };
  return (
    <View style={styles.list}>
      <Text>History</Text>
      <FlatList
        ListEmptyComponent={listEmptyComponent}
        data={results}
        renderItem={({ item }) => <Text>{item.key}</Text>}
      ></FlatList>
    </View>
  );
}

const styles = StyleSheet.create({
  list: {
    margin: 20,
    alignItems: "center",
  },
});

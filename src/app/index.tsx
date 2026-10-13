import { Pressable, StyleSheet, Text, View } from "react-native";

type SquareValue = "X" | "O" | null;

type SquareProps = {
  value: SquareValue;
  onSquareClick: () => void;
};

function Square({ value, onSquareClick }: SquareProps) {
  return (
    <Pressable style={styles.square} onPress={onSquareClick}>
      <Text style={styles.squareText}>{value}</Text>
    </Pressable>
  );
}

function Board() {
  return (
    <View style={styles.board}>
      {[0, 1, 2].map((row) => (
        <View key={row} style={styles.row}>
          {[0, 1, 2].map((col) => (
            <Square key={col} value={null} onSquareClick={() => {}} />
          ))}
        </View>
      ))}
    </View>
  );
}

export default function Game() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tic-Tac-Toe</Text>
      <Board />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 24,
  },
  board: {
    gap: 4,
  },
  row: {
    flexDirection: "row",
    gap: 4,
  },
  square: {
    width: 90,
    height: 90,
    borderWidth: 2,
    borderColor: "#222222",
    backgroundColor: "#f5f5f5",
    alignItems: "center",
    justifyContent: "center",
  },
  squareText: {
    fontSize: 38,
    fontWeight: "bold",
  },
});

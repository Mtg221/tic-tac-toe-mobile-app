import { useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { useTheme } from "../context/ThemeContext";

type SquareValue = "X" | "O" | null;

type SquareProps = {
  value: SquareValue;
  onSquareClick: () => void;
  isWinningSquare?: boolean;
};

function Square({ value, onSquareClick, isWinningSquare }: SquareProps) {
  const { colors } = useTheme();

  const squareBgColor = isWinningSquare
    ? colors.winningSquareBackground
    : colors.card;

  const squareTextColor = isWinningSquare
    ? colors.winningSquareText
    : value === "X"
    ? colors.playerX
    : colors.playerO;

  return (
    <Pressable
      style={[
        styles.square,
        {
          borderColor: isWinningSquare ? colors.primary : colors.border,
          backgroundColor: squareBgColor,
        },
      ]}
      onPress={onSquareClick}
      accessibilityRole="button"
      accessibilityLabel={value ? `Square ${value}` : "Empty square"}
    >
      <Text style={[styles.squareText, { color: squareTextColor }]}>
        {value}
      </Text>
    </Pressable>
  );
}

type WinResult = {
  winner: SquareValue;
  line: number[];
} | null;

function calculateWinner(squares: SquareValue[]): WinResult {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (const [a, b, c] of lines) {
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return { winner: squares[a], line: [a, b, c] };
    }
  }

  return null;
}

function Board({
  xIsNext,
  squares,
  onPlay,
}: {
  xIsNext: boolean;
  squares: SquareValue[];
  onPlay: (nextSquares: SquareValue[]) => void;
}) {
  const { colors } = useTheme();

  const winResult = calculateWinner(squares);
  const winner = winResult?.winner ?? null;
  const winningLine = winResult?.line ?? [];

  function handleClick(i: number) {
    if (squares[i] || winner) {
      return;
    }

    const nextSquares = [...squares];
    nextSquares[i] = xIsNext ? "X" : "O";
    onPlay(nextSquares);
  }

  const isDraw = !winner && squares.every((square) => square !== null);

  let status = `Next player: ${xIsNext ? "X" : "O"}`;

  if (winner) {
    status = `Winner: ${winner}`;
  } else if (isDraw) {
    status = "Draw!";
  }

  return (
    <View style={styles.board}>
      <Text style={[styles.status, { color: colors.text }]}>{status}</Text>

      {[0, 1, 2].map((row) => (
        <View key={row} style={styles.row}>
          {[0, 1, 2].map((col) => {
            const i = row * 3 + col;

            return (
              <Square
                key={i}
                value={squares[i]}
                isWinningSquare={winningLine.includes(i)}
                onSquareClick={() => handleClick(i)}
              />
            );
          })}
        </View>
      ))}
    </View>
  );
}

export default function Game() {
  const { colors } = useTheme();
  const [history, setHistory] = useState<SquareValue[][]>([
    Array(9).fill(null),
  ]);
  const [currentMove, setCurrentMove] = useState(0);

  const currentSquares = history[currentMove];
  const xIsNext = currentMove % 2 === 0;

  function handlePlay(nextSquares: SquareValue[]) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];

    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function jumpTo(nextMove: number) {
    setCurrentMove(nextMove);
  }

  const moves = history.map((squares, move) => {
    const description = move === 0 ? "Go to game start" : `Go to move #${move}`;

    return {
      move,
      description,
      squares,
    };
  });

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      style={{ backgroundColor: colors.background }}
    >
      <Text style={[styles.title, { color: colors.text }]}>Tic-Tac-Toe</Text>

      <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />

      <View style={styles.history}>
        <Text style={[styles.historyTitle, { color: colors.text }]}>
          Game History
        </Text>

        {moves.map(({ move, description }) => {
          const isCurrent = move === currentMove;

          return (
            <Pressable
              key={move}
              style={[
                styles.moveButton,
                {
                  borderColor: isCurrent ? colors.primary : colors.border,
                  backgroundColor: isCurrent
                    ? colors.currentMoveBackground
                    : colors.card,
                },
              ]}
              onPress={() => jumpTo(move)}
              accessibilityRole="button"
            >
              <Text
                style={[
                  styles.moveText,
                  {
                    color: isCurrent ? colors.primary : colors.text,
                    fontWeight: isCurrent ? "700" : "500",
                  },
                ]}
              >
                {move === currentMove
                  ? `Current position: ${description}`
                  : description}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: "center",
    padding: 20,
    paddingTop: 30,
    paddingBottom: 40,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 24,
  },
  board: {
    alignItems: "center",
    gap: 8,
  },
  status: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 12,
  },
  row: {
    flexDirection: "row",
    gap: 4,
  },
  square: {
    width: 90,
    height: 90,
    borderWidth: 2,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  squareText: {
    fontSize: 38,
    fontWeight: "bold",
  },
  history: {
    width: "100%",
    maxWidth: 300,
    marginTop: 28,
    gap: 8,
  },
  historyTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 4,
  },
  moveButton: {
    padding: 12,
    borderWidth: 1,
    borderRadius: 6,
  },
  moveText: {
    fontSize: 16,
  },
});

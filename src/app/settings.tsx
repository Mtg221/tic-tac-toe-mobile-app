import { StyleSheet, Switch, Text, View } from "react-native";
import { useTheme } from "../context/ThemeContext";

export default function SettingsScreen() {
  const { isDark, toggleTheme, colors } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View
        style={[
          styles.card,
          {
            backgroundColor: colors.card,
            borderColor: colors.border,
          },
        ]}
      >
        <Text style={[styles.title, { color: colors.text }]}>Settings</Text>

        <View style={styles.settingRow}>
          <View style={styles.labelContainer}>
            <Text style={[styles.settingLabel, { color: colors.text }]}>
              Dark Theme
            </Text>
            <Text
              style={[
                styles.settingDescription,
                { color: colors.textSecondary },
              ]}
            >
              {isDark ? "Dark theme enabled" : "Dark theme disabled"}
            </Text>
          </View>
          <Switch
            value={isDark}
            onValueChange={toggleTheme}
            trackColor={{ false: colors.border, true: colors.primary }}
            thumbColor={colors.card}
            accessibilityLabel="Toggle dark theme"
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  card: {
    width: "100%",
    maxWidth: 400,
    padding: 24,
    borderRadius: 12,
    borderWidth: 1,
    marginTop: 20,
    gap: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
  },
  settingRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  labelContainer: {
    flex: 1,
    marginRight: 16,
    gap: 4,
  },
  settingLabel: {
    fontSize: 18,
    fontWeight: "600",
  },
  settingDescription: {
    fontSize: 14,
  },
});

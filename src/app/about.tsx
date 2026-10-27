import { StyleSheet, Text, View } from "react-native";
import appConfig from "../../app.json";
import { useTheme } from "../context/ThemeContext";

export default function AboutScreen() {
  const { colors } = useTheme();

  const applicationName = appConfig.expo.name;
  const version = appConfig.expo.version;
  const authorName = "Makhemout";

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
        <Text style={[styles.title, { color: colors.text }]}>About</Text>

        <View style={styles.infoRow}>
          <Text style={[styles.label, { color: colors.textSecondary }]}>
            Application Name
          </Text>
          <Text style={[styles.value, { color: colors.text }]}>
            {applicationName}
          </Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={[styles.label, { color: colors.textSecondary }]}>
            Version
          </Text>
          <Text style={[styles.value, { color: colors.text }]}>{version}</Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={[styles.label, { color: colors.textSecondary }]}>
            Developer
          </Text>
          <Text style={[styles.value, { color: colors.text }]}>
            {authorName}
          </Text>
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
  infoRow: {
    gap: 4,
  },
  label: {
    fontSize: 14,
    fontWeight: "500",
  },
  value: {
    fontSize: 18,
    fontWeight: "600",
  },
});

import { StyleSheet, Text } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Drawer } from "expo-router/drawer";
import { StatusBar } from "expo-status-bar";
import { ThemeProvider, useTheme } from "../context/ThemeContext";

function DrawerLayout() {
  const { colors } = useTheme();

  return (
    <>
      <StatusBar style={colors.statusBarStyle} />
      <Drawer
        screenOptions={{
          headerStyle: {
            backgroundColor: colors.headerBackground,
          },
          headerTintColor: colors.headerText,
          headerTitleStyle: {
            color: colors.headerText,
            fontWeight: "bold",
          },
          drawerStyle: {
            backgroundColor: colors.drawerBackground,
          },
          drawerActiveBackgroundColor: colors.drawerActiveBackground,
          drawerActiveTintColor: colors.drawerActiveTint,
          drawerInactiveTintColor: colors.drawerInactiveTint,
          drawerLabelStyle: {
            fontSize: 16,
            fontWeight: "600",
          },
          sceneStyle: {
            backgroundColor: colors.background,
          },
          swipeEdgeWidth: 100,
        }}
      >
        <Drawer.Screen
          name="index"
          options={{
            drawerLabel: "Game",
            title: "Game",
            drawerIcon: ({ color }) => (
              <Text style={[styles.drawerIcon, { color }]}>🎮</Text>
            ),
          }}
        />
        <Drawer.Screen
          name="settings"
          options={{
            drawerLabel: "Settings",
            title: "Settings",
            drawerIcon: ({ color }) => (
              <Text style={[styles.drawerIcon, { color }]}>⚙️</Text>
            ),
          }}
        />
        <Drawer.Screen
          name="about"
          options={{
            drawerLabel: "About",
            title: "About",
            drawerIcon: ({ color }) => (
              <Text style={[styles.drawerIcon, { color }]}>ℹ️</Text>
            ),
          }}
        />
      </Drawer>
    </>
  );
}

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={styles.root}>
      <ThemeProvider>
        <DrawerLayout />
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  drawerIcon: {
    fontSize: 20,
  },
});

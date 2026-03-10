import { useEffect } from "react";
import { Tabs } from "expo-router";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { StyleSheet, View } from "react-native";
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";
import { Radius } from "@/constants/design";
import { useAppTheme } from "@/providers/AppThemeProvider";

type TabIconName =
  | "view-dashboard-variant-outline"
  | "account-group-outline"
  | "file-document-outline";

function AnimatedTabIcon({
  name,
  color,
  size,
  focused,
  primary,
}: {
  name: TabIconName;
  color: string;
  size: number;
  focused: boolean;
  primary: string;
}) {
  const progress = useSharedValue(focused ? 1 : 0);

  useEffect(() => {
    progress.value = withTiming(focused ? 1 : 0, { duration: 200 });
  }, [focused, progress]);

  const capsuleStyle = useAnimatedStyle(() => ({
    opacity: progress.value * 0.18,
    transform: [{ scale: 0.88 + progress.value * 0.12 }],
  }));

  const iconStyle = useAnimatedStyle(() => ({
    transform: [{ scale: 1 + progress.value * 0.06 }],
  }));

  return (
    <View style={styles.iconWrap}>
      <Animated.View style={[styles.activeCapsule, { backgroundColor: primary }, capsuleStyle]} />
      <Animated.View style={iconStyle}>
        <MaterialCommunityIcons name={name} size={size} color={focused ? primary : color} />
      </Animated.View>
    </View>
  );
}

export default function TabsLayout() {
  const { colors } = useAppTheme();

  const renderTabIcon =
    (name: TabIconName) =>
    ({ color, size, focused }: { color: string; size: number; focused: boolean }) =>
      <AnimatedTabIcon name={name} color={color} size={size} focused={focused} primary={colors.primary} />;

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: true,
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: "700",
          marginTop: 2,
          marginBottom: 6,
          textAlign: "center",
        },
        tabBarItemStyle: {
          justifyContent: "center",
          alignItems: "center",
          paddingTop: 2,
        },
        tabBarStyle: {
          position: "absolute",
          left: 14,
          right: 14,
          bottom: 12,
          height: 82,
          borderTopWidth: 0,
          borderRadius: Radius.xl,
          backgroundColor: "transparent",
          elevation: 0,
        },
        tabBarBackground: () => (
          <View
            style={{
              flex: 1,
              borderRadius: Radius.xl,
              backgroundColor: colors.tabBg,
              borderWidth: 1,
              borderColor: colors.border,
              shadowColor: colors.shadow,
              shadowOpacity: 0.24,
              shadowRadius: 16,
              shadowOffset: { width: 0, height: 8 },
            }}
          />
        ),
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textMuted,
      }}
    >
      <Tabs.Screen
        name="dashboard"
        options={{
          title: "Dashboard",
          tabBarIcon: renderTabIcon("view-dashboard-variant-outline"),
        }}
      />
      <Tabs.Screen
        name="clients"
        options={{
          title: "Clients",
          tabBarIcon: renderTabIcon("account-group-outline"),
        }}
      />
      <Tabs.Screen
        name="invoices"
        options={{
          title: "Factures",
          tabBarIcon: renderTabIcon("file-document-outline"),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  iconWrap: {
    width: 36,
    height: 34,
    alignItems: "center",
    justifyContent: "center",
  },
  activeCapsule: {
    position: "absolute",
    width: 34,
    height: 28,
    borderRadius: 14,
  },
});

import { StyleSheet, TextInput, TextInputProps, View } from "react-native";
import { Radius, Spacing } from "@/constants/design";
import { useAppTheme } from "@/providers/AppThemeProvider";

export default function AppInput(props: TextInputProps) {
  const { colors } = useAppTheme();

  return (
    <View style={[styles.wrapper, { borderColor: colors.border, backgroundColor: colors.glassStrong }]}>
      <TextInput
        placeholderTextColor={colors.textMuted}
        style={[styles.input, { color: colors.text }]}
        {...props}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    borderWidth: 1,
    borderRadius: Radius.md,
    marginTop: Spacing.sm,
  },
  input: {
    paddingHorizontal: 12,
    paddingVertical: 11,
    fontSize: 15,
  },
});

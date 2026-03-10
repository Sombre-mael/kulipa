import AppButton from "@/components/ui/AppButton";

interface Props {
  title: string;
  onPress: () => void;
}

export default function PrimaryButton({ title, onPress }: Props) {
  return <AppButton title={title} onPress={onPress} style={{ marginTop: 20 }} />;
}

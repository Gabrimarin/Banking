import { MaterialIcons } from "@expo/vector-icons";
import { TransactionButtonContainer, TransactionButtonText } from "./style";
import { useNavigation } from "@react-navigation/native";

export function TransactionButton({
  color,
  icon,
  text,
  onPress,
}: {
  color: string;
  icon: string;
  text: string;
  onPress: () => void;
}) {
  const navigation = useNavigation();
  return (
    <TransactionButtonContainer onPress={onPress} color={color}>
      <MaterialIcons name={icon as any} size={24} color={color} />
      <TransactionButtonText color={color}>{text}</TransactionButtonText>
    </TransactionButtonContainer>
  );
}

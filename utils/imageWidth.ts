import { useWindowDimensions } from "react-native";

export const useImageWidth = (): number => {
  const { width: screenWidth } = useWindowDimensions();
  const maxImageWidth = screenWidth > 768 ? 600 : screenWidth - 10;
  return maxImageWidth;
};

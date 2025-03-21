import { TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';

export function ThemeToggle() {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <TouchableOpacity
      onPress={toggleTheme}
      className="absolute top-4 right-4 z-50"
    >
      <Ionicons
        name={isDarkMode ? "sunny" : "moon"}
        size={24}
        color={isDarkMode ? "#FDB813" : "#6B7280"}
      />
    </TouchableOpacity>
  );
} 
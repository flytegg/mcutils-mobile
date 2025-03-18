import { Stack } from 'expo-router';
import { View } from 'react-native';
import { Text } from '@/components/Text';

// Define Minecraft color codes
const colorCodes = [
  { code: '§0', name: 'Black', hex: '#000000' },
  { code: '§1', name: 'Dark Blue', hex: '#0000AA' },
  { code: '§2', name: 'Dark Green', hex: '#00AA00' },
  { code: '§3', name: 'Dark Aqua', hex: '#00AAAA' },
  { code: '§4', name: 'Dark Red', hex: '#AA0000' },
  { code: '§5', name: 'Dark Purple', hex: '#AA00AA' },
  { code: '§6', name: 'Gold', hex: '#FFAA00' },
  { code: '§7', name: 'Gray', hex: '#AAAAAA' },
  { code: '§8', name: 'Dark Gray', hex: '#555555' },
  { code: '§9', name: 'Blue', hex: '#5555FF' },
  { code: '§a', name: 'Green', hex: '#55FF55' },
  { code: '§b', name: 'Aqua', hex: '#55FFFF' },
  { code: '§c', name: 'Red', hex: '#FF5555' },
  { code: '§d', name: 'Light Purple', hex: '#FF55FF' },
  { code: '§e', name: 'Yellow', hex: '#FFFF55' },
  { code: '§f', name: 'White', hex: '#FFFFFF' },
];

// Define formatting codes
const formatCodes = [
  { code: '§k', name: 'Obfuscated', description: 'Makes text randomized' },
  { code: '§l', name: 'Bold', description: 'Makes text bold' },
  { code: '§m', name: 'Strikethrough', description: 'Adds a line through text' },
  { code: '§n', name: 'Underline', description: 'Adds an underline to text' },
  { code: '§o', name: 'Italic', description: 'Makes text italic' },
  { code: '§r', name: 'Reset', description: 'Resets all formatting' },
];

export default function ColorCodes() {
  return (
    <View className="flex-1 p-4">
      <Stack.Screen options={{ title: 'Color Codes' }} />

      <Text className="mb-6 text-center text-lg font-medium text-white">
        Minecraft Color & Formatting Codes
      </Text>

      <View className="mb-6">
        <Text className="mb-2 text-sm font-medium text-neutral-400">COLORS</Text>
        <View className="divide-y divide-neutral-800 rounded-lg border border-neutral-800 bg-neutral-900">
          {colorCodes.map((color) => (
            <View key={color.code} className="flex-row items-center p-3">
              <View style={{ backgroundColor: color.hex }} className="mr-3 h-6 w-6 rounded" />
              <View className="flex-1">
                <Text className="font-medium text-white">{color.name}</Text>
                <Text className="text-neutral-400">{color.code}</Text>
              </View>
              <Text className="text-neutral-400">{color.hex}</Text>
            </View>
          ))}
        </View>
      </View>

      <View>
        <Text className="mb-2 text-sm font-medium text-neutral-400">FORMATTING</Text>
        <View className="divide-y divide-neutral-800 rounded-lg border border-neutral-800 bg-neutral-900">
          {formatCodes.map((format) => (
            <View key={format.code} className="p-3">
              <View className="flex-row items-center">
                <Text className="font-medium text-white">{format.name}</Text>
                <Text className="ml-2 text-neutral-400">{format.code}</Text>
              </View>
              <Text className="mt-1 text-sm text-neutral-400">{format.description}</Text>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
}

import { Stack } from 'expo-router';
import { View, FlatList } from 'react-native';
import { Text } from '@/components/Text';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import { useEffect } from 'react';

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

const formatCodes = [
  { code: '§k', name: 'Magic', description: 'Makes text randomized', className: 'obfuscated' },
  { code: '§l', name: 'Bold', description: 'Makes text bold', className: 'font-bold' },
  {
    code: '§m',
    name: 'Strikethrough',
    description: 'Adds a line through text',
    className: 'line-through',
  },
  {
    code: '§n',
    name: 'Underline',
    description: 'Adds an underline to text',
    className: 'underline',
  },
  { code: '§o', name: 'Italic', description: 'Makes text italic', className: 'italic' },
  { code: '§r', name: 'Reset', description: 'Resets all formatting', className: '' },
];

let obfuscated = 'MCUtils';

function getRandomLetter() {
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
  const randomIndex = Math.floor(Math.random() * alphabet.length);
  return alphabet[randomIndex];
}

function getObfuscatedString() {
  let newString = '';
  for (let i = 0; i < obfuscated.length; i++) {
    const char = obfuscated[i];
    if (char !== ' ') {
      newString += getRandomLetter();
    } else {
      newString += ' ';
    }
  }

  return newString;
}

export const ObfuscatedText = () => {
  const [text, setText] = useState('MCUtils');

  useEffect(() => {
    const interval = setInterval(() => {
      setText(getObfuscatedString());
    }, 80);
    return () => clearInterval(interval);
  }, []);

  return <Text className="text-neutral-400">{text}</Text>;
};

export default function ColorCodes() {
  const renderColorItem = ({ item }: { item: (typeof colorCodes)[number] }) => (
    <View className="flex-row items-center border-b border-neutral-800 p-3">
      <View style={{ backgroundColor: item.hex }} className="mr-3 h-6 w-6 rounded" />
      <View className="flex-1">
        <Text className="font-medium text-white">{item.name}</Text>
        <Text className="text-neutral-400">{item.code}</Text>
      </View>
      <Text className="text-neutral-400">{item.hex}</Text>
    </View>
  );

  const renderFormatItem = ({ item }: { item: (typeof formatCodes)[number] }) => (
    <View className="flex-row items-center border-b border-neutral-800 p-3">
      <View className="flex-1">
        <View className="flex-row items-center">
          <Text className="font-medium text-white">{item.name}</Text>
          <Text className="ml-2 text-neutral-400">{item.code}</Text>
        </View>
        <Text className="mt-1 text-sm text-neutral-400">{item.description}</Text>
      </View>

      {item.className === 'obfuscated' ? (
        <ObfuscatedText />
      ) : (
        <Text className={cn('text-neutral-400', item.className)}>MCUtils</Text>
      )}
    </View>
  );

  return (
    <View className="p-4">
      <Stack.Screen options={{ title: 'Color Codes' }} />

      <Text className="mb-6 text-center text-lg font-medium text-white">
        Minecraft Color & Formatting Codes
      </Text>

      <Text className="mb-2 text-sm font-medium text-neutral-400">COLORS</Text>
      <FlatList
        data={colorCodes}
        renderItem={renderColorItem}
        keyExtractor={(item) => item.code}
        className="mb-6 h-[40%] rounded-lg border border-neutral-800 bg-neutral-900"
      />

      <Text className="mb-2 text-sm font-medium text-neutral-400">FORMATTING</Text>
      <FlatList
        data={formatCodes}
        renderItem={renderFormatItem}
        keyExtractor={(item) => item.code}
        className="h-[35%] rounded-lg border border-neutral-800 bg-neutral-900"
      />
    </View>
  );
}

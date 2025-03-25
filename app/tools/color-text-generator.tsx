import React, { useState, useEffect } from 'react';
import { ScrollView, TouchableOpacity, View } from 'react-native';
import { BOOK, KICK, LORE, SIGN, MOTD, NAME, TextType } from '../_constants/text-generator';
import { Text } from '@/components/Text';
import colorCodes, { formatCodes } from '../_constants/chatcolors';
import { Input } from '@/components/Input';
import { alphabet, cn } from '@/lib/utils';
import { Ionicons } from '@expo/vector-icons';
import * as Clipboard from 'expo-clipboard';
import { Picker } from '@react-native-picker/picker';
import { SvgXml } from 'react-native-svg';

function getRandomLetter() {
  const randomIndex = Math.floor(Math.random() * alphabet.length);
  return alphabet[randomIndex];
}

const ObfuscatedText = ({ text }: { text: string }) => {
  const [obfuscatedText, setObfuscatedText] = useState(text);

  useEffect(() => {
    const interval = setInterval(() => {
      let newString = '';
      for (let i = 0; i < text.length; i++) {
        const char = text[i];
        if (char !== ' ') {
          newString += getRandomLetter();
        } else {
          newString += ' ';
        }
      }
      setObfuscatedText(newString);
    }, 80);
    return () => clearInterval(interval);
  }, [text]);

  return <Text style={{ color: 'white' }}>{obfuscatedText}</Text>;
};

export default function ColorText() {
  const [text, setText] = useState<string>('')
  const [copied, setCopied] = useState<boolean>(false);
  const [selectedType, setSelectedType] = useState<TextType>(BOOK);

  const textTypes: TextType[] = [SIGN, BOOK, KICK, MOTD, NAME, LORE];

  const appeandChatColor = (colorcode: string) => {
    setText(text + colorcode)
  }

  const copyToClipboard = async () => {
    if (text) {
      await Clipboard.setStringAsync(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }

  const renderFormattedText = (text: string) => {
    const parts = text.split(/(§[0-9a-fklmnor])/);
    let currentColor = '#ffffff';
    let currentStyle = '';
    let isObfuscated = false;
    
    return parts.filter(part => part).map((part, index) => {
      if (part.startsWith('§')) {
        const code = part;
        const colorMatch = colorCodes.find(c => c.code === code);
        if (colorMatch) {
          currentColor = colorMatch.hex;
          return null;
        }
        const formatMatch = formatCodes.find(f => f.code === code);
        if (formatMatch) {
          if (code === '§k') {
            isObfuscated = true;
          } else if (code === '§r') {
            currentColor = '#ffffff';
            currentStyle = '';
            isObfuscated = false;
          } else {
            currentStyle = formatMatch.className;
          }
          return null;
        }
        return null;
      }
      
      return part && (
        isObfuscated ? (
          <ObfuscatedText key={index} text={part} />
        ) : (
          <Text 
            key={index} 
            className={cn('', currentStyle)}
            style={{ 
              color: currentColor,
            }}
          >
            {part}
          </Text>
        )
      );
    }).filter(Boolean);
  };

  return (
    <ScrollView>
      <View className="flex items-center">
        <Text className='text-white text-3xl font-bold uppercase px-8 pt-8 pb-4 text-center'>Color Text Generator</Text>
      </View>

      <View className="p-4">
        <Text className='text-zinc-300 ml-5 mb-2'>Select the style you prefer.</Text>
        <View className="flex flex-row items-center justify-center flex-wrap gap-2">
          {colorCodes && colorCodes.map((color: {code: string, name: string, hex: string}) => (
              <TouchableOpacity onPress={() => appeandChatColor(color.code)} key={color.code} style={{ backgroundColor: color.hex }} className="rounded-md w-10 h-10 items-center justify-center">
                <Text className='text-zinc-300 text-center'>{color.code}</Text>
              </TouchableOpacity>
            ))}
        </View>
      </View>

      <View className="p-4">
        <Text className='text-zinc-300 ml-5 mb-2'>Select the format.</Text>
        <View className="flex flex-row items-center justify-center flex-wrap gap-2">
          {formatCodes && formatCodes.map((formatCode) => (
              <TouchableOpacity 
                onPress={() => appeandChatColor(formatCode.code)} 
                key={formatCode.code} 
                className="rounded-md bg-neutral-800 border border-neutral-700 p-2 w-[28.5%]"
              >
                <Text className={cn('text-zinc-300 min-w-20 text-center', formatCode.className)}>
                  {formatCode.name}
                </Text>
              </TouchableOpacity>
            ))}
        </View>
      </View>
      
      <View className='flex justify-center items-center'>
        <View className="p-4 w-[90%]">
          <Text className='text-zinc-300 mb-2'>Converted Text for {selectedType.name}</Text>
          <View className="flex-row relative">
            <View className="flex-1 overflow-hidden">
              <Input
                value={text}
                onChangeText={setText}
                placeholder="Enter the text to convert..."
                className="bg-black text-white h-[40px] flex-1 pr-12"
                style={{ 
                  textAlignVertical: 'center',
                }}
                multiline={false}
                numberOfLines={1}
                textAlignVertical="center"
                scrollEnabled={true}
                maxLength={500}
                blurOnSubmit={false}
                selectTextOnFocus={true}
              />
            </View>
            <TouchableOpacity 
              onPress={copyToClipboard} 
              className="absolute right-20 top-[8px]"
              disabled={!text}
            >
              <Ionicons 
                name={copied ? "checkmark" : "copy-outline"} 
                size={24} 
                color={text ? "#60a5fa" : "#9ca3af"} 
              />
            </TouchableOpacity>
            <TouchableOpacity 
              onPress={() => setText('')} 
              className="bg-red-800 rounded-md h-[40px] ml-2 px-3 justify-center"
            >
              <Text className="text-white">Clear</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <View className="flex justify-center items-center">
        <SvgXml 
          xml={selectedType.image} 
          width="80%" 
          height={150} 
        />
        <View className="absolute">
          <View className="flex-row flex-wrap">
            {renderFormattedText(text)}
          </View>
        </View>
      </View>

      
      <View className="p-4">
        <View className="rounded-lg">
          <Picker
            selectedValue={selectedType.id}
            onValueChange={(itemValue: string) => {
              const selected = textTypes.find(type => type.id === itemValue);
              if (selected) {
                setSelectedType(selected);
              }
            }}
            style={{ color: 'white' }}
          >
            {textTypes.map((type) => (
              <Picker.Item
                key={type.id}
                label={type.name}
                value={type.id}
                color='white'
              />
            ))}
          </Picker>
        </View>
      </View>
    </ScrollView>
  )
}
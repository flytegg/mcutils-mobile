import React, { useState, useEffect } from 'react';
import { ScrollView, TouchableOpacity, View } from 'react-native';
import { BOOK, KICK, LORE, SIGN, MOTD, NAME, TextType } from '../_constants/text-generator';
import { Text } from '@/components/Text';
import colorCodes, { formatCodes } from '../_constants/chatcolors';
import { Input } from '@/components/Input';
import { cn } from '@/lib/utils';
import { Ionicons } from '@expo/vector-icons';
import * as Clipboard from 'expo-clipboard';
import { Picker } from '@react-native-picker/picker';
import { SvgXml } from 'react-native-svg';

function getRandomLetter() {
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
  const randomIndex = Math.floor(Math.random() * alphabet.length);
  return alphabet[randomIndex];
}

function getObfuscatedString(text: string) {
  let newString = '';
  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    if (char !== ' ') {
      newString += getRandomLetter();
    } else {
      newString += ' ';
    }
  }
  return newString;
}

const ObfuscatedText = ({ text, color }: { text: string, color: string }) => {
  const [obfuscatedText, setObfuscatedText] = useState(text);

  useEffect(() => {
    const interval = setInterval(() => {
      setObfuscatedText(getObfuscatedString(text));
    }, 80);
    return () => clearInterval(interval);
  }, [text]);

  return <Text style={{ color }}>{obfuscatedText}</Text>;
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
    let currentColor = '#ffffff';
    let isBold = false;
    let isItalic = false;
    let isUnderline = false;
    let isStrikethrough = false;
    let isObfuscated = false;
    let currentText = '';
    const result: React.ReactNode[] = [];

    const applyText = () => {
      if (!currentText) return;
      result.push(
        isObfuscated ? (
          <ObfuscatedText key={result.length} text={currentText} color={currentColor} />
        ) : (
          <Text 
            key={result.length}
            className={selectedType.textStyle}
            style={{ 
              color: currentColor,
              fontWeight: isBold ? 'bold' : 'normal',
              fontStyle: isItalic ? 'italic' : 'normal',
              textDecorationLine: isUnderline 
                ? isStrikethrough 
                  ? 'underline line-through'
                  : 'underline'
                : isStrikethrough 
                  ? 'line-through'
                  : 'none'
            }}
          >
            {currentText}
          </Text>
        )
      );
      currentText = '';
    };

    for (let i = 0; i < text.length; i++) {
      if (text[i] === '§' && i + 1 < text.length) {
        applyText();
        const code = text[i + 1];
        const formatCode = '§' + code;
        
        const colorMatch = colorCodes.find(c => c.code === formatCode);
        if (colorMatch) {
          currentColor = colorMatch.hex;
          i++;
          continue;
        }

        switch (formatCode) {
          case '§l': isBold = true; break;
          case '§o': isItalic = true; break;
          case '§n': isUnderline = true; break;
          case '§m': isStrikethrough = true; break;
          case '§k': isObfuscated = true; break;
          case '§r':
            currentColor = '#ffffff';
            isBold = isItalic = isUnderline = isStrikethrough = isObfuscated = false;
            break;
        }
        i++;
      } else {
        currentText += text[i];
      }
    }

    applyText();

    return (
      <View style={{ flexDirection: 'row' }} className={selectedType.textStyle}>
        {result}
      </View>
    );
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
          {renderFormattedText(text)}
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
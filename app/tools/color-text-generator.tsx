import { useState, useEffect } from 'react';
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

function getObfuscatedString(text: string): string {
  return text.split('').map(char => 
    char === ' ' ? ' ' : getRandomLetter()
  ).join('');
}

const ObfuscatedText = ({ text, color }: { text: string, color: string }) => {
  const [obfuscatedText, setObfuscatedText] = useState(text);

  useEffect(() => {
    const interval = setInterval(() => {
      setObfuscatedText(getObfuscatedString(text));
    }, 80);
    return () => clearInterval(interval);
  }, [text]);

  return <Text style={{ color, fontFamily: 'Minecraft' }}>{obfuscatedText}</Text>;
};

export default function ColorText() {
  const [text, setText] = useState<string>('')
  const [copied, setCopied] = useState<boolean>(false);
  const [selectedType, setSelectedType] = useState<TextType>(SIGN);

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
    interface TextSegment {
      text: string;
      color: string;
      bold: boolean;
      italic: boolean;
      underline: boolean;
      strikethrough: boolean;
      obfuscated: boolean;
    }

    const createDefaultSegment = (): TextSegment => ({
      text: '',
      color: '#ffffff',
      bold: false,
      italic: false,
      underline: false,
      strikethrough: false,
      obfuscated: false
    });

    const segments: TextSegment[] = [];
    let currentSegment = createDefaultSegment();

    for (let i = 0; i < text.length; i++) {
      if (text[i] === '§' && i + 1 < text.length) {
        const formatCode = '§' + text[i + 1];
        
        if (currentSegment.text) {
          segments.push({...currentSegment});
          currentSegment.text = '';
        }

        const colorMatch = colorCodes.find(c => c.code === formatCode);
        if (colorMatch) {
          currentSegment.color = colorMatch.hex;
        } else {
          switch (formatCode) {
            case '§l': currentSegment.bold = true; break;
            case '§o': currentSegment.italic = true; break;
            case '§n': currentSegment.underline = true; break;
            case '§m': currentSegment.strikethrough = true; break;
            case '§k': currentSegment.obfuscated = true; break;
            case '§r': currentSegment = createDefaultSegment(); break;
          }
        }
        i++;
        continue;
      }
      currentSegment.text += text[i];
    }

    if (currentSegment.text) segments.push(currentSegment);

    return (
      <View className={selectedType.textStyle}>
        <Text 
          className={selectedType.textStyle}
          style={{ 
            fontFamily: 'minecraft',
            fontSize: 12,
            textAlign: 'center'
          }}
        >
          {segments.map((segment, index) => 
            segment.obfuscated ? (
              <ObfuscatedText key={index} text={segment.text} color={segment.color} />
            ) : (
              <Text 
                key={index}
                style={{ 
                  color: segment.color,
                  fontWeight: segment.bold ? 'bold' : 'normal',
                  fontStyle: segment.italic ? 'italic' : 'normal',
                  textDecorationLine: segment.underline 
                    ? segment.strikethrough 
                      ? 'underline line-through'
                      : 'underline'
                    : segment.strikethrough 
                      ? 'line-through'
                      : 'none',
                  fontFamily: 'minecraft',
                  fontSize: 12,
                  textShadowColor: segment.bold ? segment.color : 'transparent',
                  textShadowOffset: segment.bold ? { width: 0.5, height: 0 } : { width: 0, height: 0 },
                  textShadowRadius: segment.bold ? 0.5 : 0
                }}
              >
                {segment.text}
              </Text>
            )
          )}
        </Text>
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
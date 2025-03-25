import React, { useState } from 'react';
import { ScrollView, TouchableOpacity, View, Image } from 'react-native';
import { BOOK, KICK, LORE, SIGN, MOTD, NAME } from '../_constants/text-generator';
import { Text } from '@/components/Text';
import colorCodes, { formatCodes } from '../_constants/chatcolors';
import { Input } from '@/components/Input';
import { cn } from '@/lib/utils';
import { Ionicons } from '@expo/vector-icons';
import * as Clipboard from 'expo-clipboard';
import { Picker } from '@react-native-picker/picker';
import { SvgXml } from 'react-native-svg';


export default function ColorText() {

  const textTypes = [
    { id: 'sign', name: 'Sign', image: SIGN },
    { id: 'book', name: 'Book', image: BOOK },
    { id: 'kick', name: 'Kick', image: KICK },
    { id: 'motd', name: 'MOTD', image: MOTD },
    { id: 'name', name: 'Name', image: NAME },
    { id: 'lore', name: 'Lore', image: LORE },
  ];

  const [text, setText] = useState<string>('')
  const [copied, setCopied] = useState<boolean>(false);
  const [selectedType, setSelectedType] = useState(textTypes[0]);

  const appeandChatColor = (colorcode: string) => {
    setText(text + colorcode)
  }

  const copyToClipboard = async (value: any) => {
    if (value) {
      await Clipboard.setStringAsync(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }

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
          <Text className='text-zinc-300 mb-2'>Converted Text</Text>
          <View className="flex-row relative">
            <Input
              value={text}
              onChangeText={setText}
              placeholder="Enter the text to convert..."
              className="bg-black text-white h-[40px] flex-1 pr-12"
              style={{ textAlignVertical: 'center' }}
              multiline={false}
              textAlignVertical="center"
              scrollEnabled={true}
            />
            <TouchableOpacity 
              onPress={copyToClipboard} 
              className="absolute left-64 top-[8px]"
              disabled={!text}
            >
              <Ionicons 
                name={copied ? "checkmark-circle" : "copy-outline"} 
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
      <View className="p-4 mt-2 mb-10 flex flex-row justify-start">
        <SvgXml 
          xml={selectedType?.image || ''} 
          width="100%" 
          height={250} 
        />
        <View className="rounded-md p-2 w-full">
          <Picker
            selectedValue={selectedType.id}
            onValueChange={(itemValue) => {
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
                color="white"
              />
            ))}
          </Picker>
        </View>
      </View>
    </ScrollView>
  )
}
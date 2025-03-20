import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import * as Clipboard from 'expo-clipboard';
import { useState } from 'react'
import { Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function smalltext() {

  const [text, setText] = useState<string>('');
  const [convertedText, setConvertedText] = useState<string>('');
  const [copied, setCopied] = useState<boolean>(false);

  const convertText = () => {
    const normalAlphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZĞŞÇÜİÖĄĆĘŁŃÓŚŹŻ';
    const smallTextAlphabet = 'ᴀʙᴄᴅᴇꜰɢʜɪᴊᴋʟᴍɴᴏᴘǫʀѕᴛᴜᴠᴡxʏᴢğşçüiöąćęłńóśźż';

    const uppercaseText = text.toUpperCase();
    let finalText = '';

    for (let i = 0; i < uppercaseText.length; i++) {
      const char = uppercaseText[i];
      const index = normalAlphabet.indexOf(char);

      if (index !== -1) {
        finalText += smallTextAlphabet[index];
      } else {
        finalText += char;
      }
    }

    setConvertedText(finalText);
  }
  
  const copyToClipboard = async () => {
    if (convertedText) {
      await Clipboard.setStringAsync(convertedText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }
  
  return (
    <ScrollView>
      <View className='flex flex-col justify-center items-center mt-4'>
        <Text className='text-white text-3xl font-bold uppercase p-8'>Small Text Converter</Text>
        <Text className='text-gray-200 text-xs w-80 text-center mb-12'>Convert your text to a smaller one supported by Minecraft.</Text>
        
        <View className="w-80 mb-24">
          <Input
            value={text}
            onChangeText={setText}
            placeholder="Enter the text to convert"
            className="bg-black text-white min-h-[100px] pr-2"
            multiline={true}
            textAlignVertical="top"
            scrollEnabled={true}
          />
        </View>
        
        <View className="w-80 mb-24 relative">
          <Input
            value={convertedText}
            editable={false}
            placeholder="Converted text will appear here"
            className="bg-black text-white min-h-[100px] pr-16"
            multiline={true}
            textAlignVertical="top"
            scrollEnabled={true}
          />
          <TouchableOpacity 
            onPress={copyToClipboard} 
            className="absolute right-3 top-3"
            disabled={!convertedText}
          >
            <Ionicons 
              name={copied ? "checkmark-circle" : "copy-outline"} 
              size={24} 
              color={convertedText ? "#60a5fa" : "#9ca3af"} 
            />
          </TouchableOpacity>
        </View>
        
        <View className='flex-row justify-between w-80 gap-2'>
          <Button
            onPress={() => convertText()}
            className="rounded bg-white flex-1"
          >
            <Text className="text-black font-semibold text-center">Convert Text</Text>
          </Button>
        </View>
      </View>
    </ScrollView>
  )
}
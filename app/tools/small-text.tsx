import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import * as Clipboard from 'expo-clipboard';
import {useState} from 'react'
import { Text, View, ScrollView, Alert} from 'react-native';

export default function smalltext() {

  const [text, setText] = useState<string>('');
  const [convertedText, setConvertedText] = useState<string>('');

  const convertText = () => {
    const normalAlphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZĞŞÇÜİÖĄĆĘŁŃÓŚŹŻ';
    const smallTextAlphabet = 'ᴀʙᴄᴅᴇꜰɢʜɪᴊᴋʟᴍɴᴏᴘǫʀѕᴛᴜᴠᴡxʏᴢğşçüiöᴀᴄ́ᴌśᴏ́ᴢ̇ᴢ́';

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
  
  const copyToClipboard = () => {
    if (convertedText) {
      Clipboard.setStringAsync(convertedText);
      Alert.alert('Copied', 'Text copied to clipboard!');
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
            className="bg-black text-white min-h-[100px]"
            multiline={true}
            textAlignVertical="top"
            scrollEnabled={true}
          />
        </View>
        
        <View className="w-80 mb-24">
          <Input
            value={convertedText}
            editable={false}
            placeholder="Converted text will appear here"
            className="bg-black text-white min-h-[100px]"
            multiline={true}
            textAlignVertical="top"
            scrollEnabled={true}
          />
        </View>
        
        <View className='flex-row justify-between w-80 gap-2'>
          <Button
            onPress={() => convertText()}
            className="rounded bg-white flex-1"
          >
            <Text className="text-black font-semibold text-center">Convert Text</Text>
          </Button>
          <Button
            onPress={copyToClipboard}
            className="rounded bg-blue-200 flex-1"
          >
            <Text className="text-black font-semibold text-center">Copy Text</Text>
          </Button>
        </View>
      </View>
    </ScrollView>
  )
}
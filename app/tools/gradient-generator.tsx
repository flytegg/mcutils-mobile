import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import * as Clipboard from 'expo-clipboard';
import { useState } from 'react';
import { Text, View, ScrollView, TouchableOpacity, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import ColorPicker from 'react-native-wheel-color-picker';

export default function gradientgenerator() {
  const [firstColor, setFirstColor] = useState<string>('#FF5733');
  const [secondColor, setSecondColor] = useState<string>('#3366FF');
  const [gradient, setGradient] = useState<string>('');
  const [gradientMini, setGradientMini] = useState<string>('');
  const [copied, setCopied] = useState<boolean>(false);
  const [copiedMini, setCopiedMini] = useState<boolean>(false);
  const [showFirstPicker, setShowFirstPicker] = useState<boolean>(false);
  const [showSecondPicker, setShowSecondPicker] = useState<boolean>(false);

  const copyGradientMini = async () => {
    if (gradientMini) {
      await Clipboard.setStringAsync(gradientMini);
      setCopiedMini(true);
      setTimeout(() => setCopiedMini(false), 2000);
    }
  }

  const copyGradient = async () => {
    if (gradient) {
      await Clipboard.setStringAsync(gradient);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const calculateGradient = () => {
    const text = "MCUtils";
    const output = text
      .split('')
      .map((char, index) => {
        if (char.match(/[a-z]/i)) {
          const hexColor = index % 2 === 0 ? firstColor : secondColor;
          return `&${hexColor}${char}`;
        }
        return char;
      })
      .join('');
  
    setGradient(output);
    setGradientMini(`<gradient:${firstColor}:${secondColor}>${text}</gradient>`);
  };
  
  return (
    <ScrollView>
      <View className='flex-1 p-8'>
        <Text className='text-white text-3xl font-bold uppercase text-center p-4'>Gradient Generator</Text>
        <Text className='text-gray-200 text-xs text-center mb-5'>
          Generate gradient colors for your Minecraft server.
        </Text>

        <View className="flex-row justify-center gap-4">
          <View className="items-center">
            <Button
              onPress={() => setShowFirstPicker(true)}
              className='w-12 h-12 rounded-md shadow-md mb-2'
              style={{ backgroundColor: firstColor || '#ccc' }}
            />
            <Text className='text-white text-xs'>{firstColor}</Text>
          </View>

          <View className="items-center">
            <Button
              onPress={() => setShowSecondPicker(true)}
              className='w-12 h-12 rounded-md shadow-md mb-2'
              style={{ backgroundColor: secondColor || '#ccc' }}
            />
            <Text className='text-white text-xs'>{secondColor}</Text>
          </View>
        </View>

        <View className=" relative mt-6">
          <Text className='text-white text-xs mb-2'>Chat Message</Text>
          <Input
            value={gradient}
            editable={false}
            placeholder="Minecraft Chat Message..."
            className="bg-black text-white min-h-[30px] pr-12 px-4"
            multiline={true}
            textAlignVertical="center"
            scrollEnabled={true}
          />
          <TouchableOpacity
            onPress={copyGradient}
            className="absolute right-3 top-9"
            disabled={!gradient}
          >
            <Ionicons
              name={copied ? "checkmark-circle" : "copy-outline"}
              size={24}
              color={gradient ? "#60a5fa" : "#9ca3af"}
            />
          </TouchableOpacity>
        </View>
        <View className='mt-2'>
          <Text className='text-white text-xs mb-2'>MiniMessage</Text>
          <Input
            value={gradientMini}
            editable={false}
            placeholder="MiniMessage equivalent..."
            className="bg-black text-white min-h-[30px] pr-12 px-4"
            multiline={true}
            textAlignVertical="center"
            scrollEnabled={true}
          />
          <TouchableOpacity
            onPress={copyGradientMini}
            className="absolute right-3 top-9"
            disabled={!gradientMini}
          >
            <Ionicons
              name={copiedMini ? "checkmark-circle" : "copy-outline"}
              size={24}
              color={gradientMini ? "#60a5fa" : "#9ca3af"}
            />
          </TouchableOpacity>
        </View>

        <View className='flex-row my-4'>
          <Button
            onPress={calculateGradient}
            className="rounded bg-white flex-1"
          >
            <Text className="text-black font-semibold text-center">Calculate Gradient</Text>
          </Button>
        </View>

        <Modal
          visible={showFirstPicker}
          transparent={true}
          animationType="fade"
          onRequestClose={() => setShowFirstPicker(false)}
        >
          <View className='flex-1 justify-center mt-44 bg-none'>
            <View className='p-3 rounded-t-lg'>
              <ColorPicker
                color={firstColor}
                onColorChangeComplete={setFirstColor}
                thumbSize={10}
                sliderSize={5}
                noSnap={true}
                row={false}
              />
            </View>
          </View>
          <View className='flex-row justify-center mt-[-90px]'>
            <Button
              onPress={() => setShowFirstPicker(false)}
              className='py-2 rounded-md w-64 items-center mb-6'
            >
              <Text className='text-white font-bold'>Done</Text>
            </Button>
          </View>
        </Modal>

        <Modal
          visible={showSecondPicker}
          transparent={true}
          animationType="fade"
          onRequestClose={() => setShowSecondPicker(false)}
        >
          <View className='flex-1 justify-center mt-44 bg-none'>
            <View className='p-3 rounded-t-lg'>
              <ColorPicker
                color={secondColor}
                onColorChangeComplete={setSecondColor}
                thumbSize={10}
                sliderSize={5}
                noSnap={true}
                row={false}
              />
            </View>
          </View>
          <View className='flex-row justify-center mt-[-90px]'>
            <Button
              onPress={() => setShowSecondPicker(false)}
              className='py-2 rounded-md w-64 items-center mb-6'
            >
              <Text className='text-white font-bold'>Done</Text>
            </Button>
          </View>
        </Modal>
      </View>
    </ScrollView>
  );
}
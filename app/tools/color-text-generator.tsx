import React from 'react';
import { ScrollView, View } from 'react-native';
import { BOOK, DIRT, KICK, LORE, SIGN, MOTD, NAME } from '../_constants/text-generator';
import { colorCodes } from '../_constants/chatcolors';
import { Text } from '@/components/Text';

type TextGeneratorType = typeof BOOK | typeof DIRT | typeof KICK | 
  typeof LORE | typeof SIGN | typeof MOTD | typeof NAME

interface TextPreview {
  name: string,
  image: TextGeneratorType,
  height: number,
  width: number
}

const ColorText = () => {
  return (
    <ScrollView>
      <View className="grid grid-cols-4 gap-2 p-4 text-white">
        {colorCodes && colorCodes.map((color) => (
          <Text key={color.code}>{color.name}</Text>
        ))}
      </View>
    </ScrollView>
  )
}

export default ColorText

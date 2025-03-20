import { View, ScrollView } from 'react-native';
import { Text } from '@/components/Text';
import { Input } from '@/components/Input';
import { useState } from 'react';

export default function gradientgenerator(){

  const [gradient, setGradient] = useState<string>('');

  return (
    <ScrollView>
      <View className='p-4 flex flex-col'>
        <Text className='text-white text-3xl font-bold uppercase p-8'>Gradient Generator</Text>
        <View className='flex flex-row'>
          <Input
              value={gradient}
              editable={false}
              placeholder="Gradient value"
              className="bg-black/10 text-white min-h-[20px]"
              multiline={true}
              textAlignVertical="top"
              scrollEnabled={true}
            />
        </View>
      </View>
    </ScrollView>
  )
}

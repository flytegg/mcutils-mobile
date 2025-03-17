import { Stack } from 'expo-router';
import { useState } from 'react';
import { FlatList, Image, TextInput, View } from 'react-native';
import { useDebounce } from 'use-debounce';

import { Text } from '@/components/Text';
import useServerInfo from '@/app/_hooks/use-server-info';
import { Input } from '@/components/Input';

export default function Home() {
  const [ip, setIp] = useState('');
  const [value] = useDebounce(ip, 100);

  const { data, isLoading, error } = useServerInfo(value);

  return (
    <>
      <Stack.Screen options={{ title: 'Server Info' }} />
      <Text className="text-white">Enter your server IP</Text>
      <Input
        className="bg-neutral-800 text-white"
        autoCorrect={false}
        autoCapitalize="none"
        spellCheck={false}
        placeholder="hypixel.net"
        onChangeText={(text) => {
          setIp(text);
        }}
        value={ip}
      />

      {data?.icon && (
        <View className="flex-row gap-2 pt-2">
          <Image
            source={{ uri: data.icon }}
            style={{ width: 100, height: 100 }}
            className="rounded-md border-2"
          />

          <FlatList
            data={data.motd?.clean}
            renderItem={({ item }) => <Text className="text-white">{item}</Text>}
            className="m-2 flex-1 rounded-lg border-2 border-white"
            contentContainerClassName="flex-1 justify-center"
          />
        </View>
      )}
    </>
  );
}

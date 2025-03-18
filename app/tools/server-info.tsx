import { Stack } from 'expo-router';
import { useState } from 'react';
import { FlatList, Image, TextInput, View } from 'react-native';
import { useDebounce } from 'use-debounce';

import { Text } from '@/components/Text';
import useServerInfo from '@/app/_hooks/use-server-info';
import { Input } from '@/components/Input';
import { SearchIcon } from 'lucide-react-native';

export default function Home() {
  const [ip, setIp] = useState('');
  const [value] = useDebounce(ip, 100);

  const { data, isLoading, error } = useServerInfo(value);

  return (
    <View className="flex-1 p-4">
      <Stack.Screen options={{ title: 'Server Info' }} />

      <View className="mb-6">
        <Text className="mb-2 text-center text-lg font-medium text-white">
          Ping an address to get live server data
        </Text>
        <View className="flex-row items-center gap-2 rounded-lg border border-neutral-800 bg-neutral-900 p-3">
          <SearchIcon className="text-neutral-400" size={20} />
          <Input
            keyboardAppearance="dark"
            className="flex-1 border-none bg-transparent text-white ring-transparent"
            autoCorrect={false}
            autoCapitalize="none"
            spellCheck={false}
            placeholder="hypixel.net"
            placeholderTextColor="#71717a"
            onChangeText={setIp}
            value={ip}
          />
        </View>
      </View>

      {data?.icon ? (
        <View className="rounded-lg border border-neutral-800 bg-neutral-900 p-4">
          <View className="flex-row gap-4">
            <Image
              source={{ uri: data.icon }}
              style={{ width: 64, height: 64 }}
              className="rounded-md"
            />
            <View className="flex-1 justify-center">
              <Text className="text-lg font-medium text-white">{data.hostname || ip}</Text>
              <Text className="text-sm text-neutral-400">
                {data.players?.online || 0} / {data.players?.max || 0} players
              </Text>
            </View>
          </View>

          {data.motd?.clean && data.motd.clean.length > 0 && (
            <View className="mt-4">
              <Text className="mb-2 text-sm font-medium text-neutral-400">MOTD</Text>
              <View className="rounded-md bg-neutral-800 p-3">
                {data.motd.clean.map((line, index) => (
                  <Text key={index} className="text-white">
                    {line}
                  </Text>
                ))}
              </View>
            </View>
          )}
        </View>
      ) : (
        <View className="rounded-lg border border-neutral-800 bg-neutral-900 p-4">
          <Text className="text-center text-neutral-400">No data found</Text>
        </View>
      )}
    </View>
  );
}

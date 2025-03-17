import { Stack } from 'expo-router';
import { useState } from 'react';
import { FlatList, Image, Text, TextInput, View } from 'react-native';
import { useDebounce } from 'use-debounce';

import useServerInfo from '~/app/_hooks/use-server-info';
import { Container } from '~/components/Container';
import { Input, InputField } from '~/components/ui/input';

export default function Home() {
  const [ip, setIp] = useState('');
  const [value] = useDebounce(ip, 100);

  const { data, isLoading, error } = useServerInfo(value);

  return (
    <>
      <Stack.Screen options={{ title: 'Home' }} />
      <Container>
        <Text>Enter your server IP</Text>
        <Input>
          <InputField
            autoCorrect={false}
            autoCapitalize="none"
            spellCheck={false}
            placeholder="hypixel.net"
            onChangeText={(text) => {
              setIp(text);
            }}
            value={ip}
          />
        </Input>

        {data?.icon && (
          <View className="gap-2 pt-2">
            <Image
              source={{ uri: data.icon }}
              style={{ width: 100, height: 100 }}
              className="rounded-md border-2"
            />

            <FlatList
              data={data.motd?.clean}
              renderItem={({ item }) => <Text>{item}</Text>}
              className="border-2"
            />
          </View>
        )}

        {/* <ScreenContent path="app/index.tsx" title="Home" /> */}
        {/* <Link href={{ pathname: '/details', params: { name: 'Dan' } }} asChild>
          <Button title="Show Details" />
        </Link> */}
      </Container>
    </>
  );
}

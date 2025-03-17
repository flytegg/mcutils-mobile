import { Stack } from 'expo-router';
import { useState } from 'react';
import { Image, Text, TextInput, View } from 'react-native';

import useServerInfo from '~/app/_hooks/use-server-info';
import { Container } from '~/components/Container';

export default function Home() {
  const [ip, setIp] = useState('');
  const { data, isLoading, error } = useServerInfo(ip);

  return (
    <>
      <Stack.Screen options={{ title: 'Home' }} />
      <Container>
        <Text>Enter your server IP</Text>
        <TextInput
          placeholder="192.168.1.1"
          onChangeText={(text) => {
            setIp(text);
          }}
          value={ip}
        />

        {data && (
          <View>
            <Image
              source={{ uri: data.icon }}
              style={{ width: 100, height: 100 }}
            />
            <Text>{data.motd?.clean}</Text>
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

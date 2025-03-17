import { Stack, useLocalSearchParams } from 'expo-router';

export default function Details() {
  const { name } = useLocalSearchParams();

  return (
    <>
      <Stack.Screen options={{ title: 'Details' }} />
    </>
  );
}

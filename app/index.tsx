import { Button } from '@/components/Button';
import { Text } from '@/components/Text';
import { Link, Stack } from 'expo-router';
import { View } from 'react-native';

export default function Home() {
  return (
    <View className="flex-1">
      <Stack.Screen options={{ title: 'Home' }} />

      <Link href={{ pathname: 'https://discord.gg/flyte' }} asChild>
        <Button variant="link">
          <Text className="text-white">Discord</Text>
        </Button>
      </Link>

      <Link href={{ pathname: '/tools/server-info' }} asChild>
        <Button>
          <Text>Server Info</Text>
        </Button>
      </Link>
      <Link href={{ pathname: '/tools/item-ids' }} asChild>
        <Button>
          <Text>Item IDs</Text>
        </Button>
      </Link>
    </View>
  );
}

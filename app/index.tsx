import { ITEM_IDS_ICON, SERVER_INFO_ICON } from '@/app/_constants/icons';
import { Button } from '@/components/Button';
import { Logo } from '@/components/Logo';
import { Text } from '@/components/Text';
import { Link, Stack } from 'expo-router';
import { FlatList, View } from 'react-native';
import { SvgXml } from 'react-native-svg';

const utils = [
  {
    name: 'Server Info',
    description: 'Ping server for info',
    href: '/tools/server-info' as const,
    icon: SERVER_INFO_ICON,
  },
  {
    name: 'Item IDs',
    description: 'Modern & legacy item IDs',
    href: '/tools/item-ids' as const,
    icon: ITEM_IDS_ICON,
  },
];

export default function Home() {
  return (
    <View className="flex-1">
      <Stack.Screen options={{ title: 'Home' }} />

      <View className="flex items-center justify-center">
        <Logo height={100} width={250} />
        <Text className="mb-8 w-[80%] text-center text-lg text-neutral-400">
          Community powered Minecraft utilities for developers, builders and players.
        </Text>
      </View>

      <FlatList
        className="mx-auto w-[80%]"
        contentContainerClassName="gap-2"
        data={utils}
        renderItem={({ item }) => (
          <Link href={{ pathname: item.href }} key={item.name} asChild>
            <Button className="flex-row items-center gap-2">
              <SvgXml xml={item.icon} width={24} height={24} />
              <Text>{item.name}</Text>
            </Button>
          </Link>
        )}
      />
    </View>
  );
}

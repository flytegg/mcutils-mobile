import { COLOR_CODES_ICON, ITEM_IDS_ICON, SERVER_INFO_ICON, CAPE_STEALER_ICON, SMALL_TEXT_CONVERTER_ICON } from '@/app/_constants/icons';
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
  {
    name: 'Color Codes',
    description: 'Color codes for Minecraft',
    href: '/tools/color-codes' as const,
    icon: COLOR_CODES_ICON,
  },
  {
    name: 'Inventory Slots',
    description: 'Slot numbers for every inventory type',
    href: '/tools/inventory-slots' as const,
    icon: COLOR_CODES_ICON,
  },
  {
    name: 'Cape Stealer',
    description: "Steal people's cape and use it yourself",
    href: '/tools/cape-stealer' as const,
    icon: CAPE_STEALER_ICON,
  },
  {
    name: 'Small Text',
    description: 'Convert your text to a smaller one supported by Minecraft.',
    href: '/tools/smalltext' as const,
    icon: SMALL_TEXT_CONVERTER_ICON,
  }
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

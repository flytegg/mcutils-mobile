import { Stack } from 'expo-router';
import { useState } from 'react';
import { View, Image, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Text } from '@/components/Text';

interface Inventory {
  name: string;
  img: string;
}

const inventories: Inventory[] = [
  { name: 'Anvil', img: 'anvil' },
  { name: 'Beacon', img: 'beacon' },
  { name: 'Blast Furnace', img: 'blast-furnace' },
  { name: 'Brewing Stand', img: 'brewing-stand' },
  { name: 'Cartography Table', img: 'cartography-table' },
  { name: 'Chest (Large)', img: 'chest-large' },
  { name: 'Chest (Small)', img: 'chest-small' },
  { name: 'Crafting Table', img: 'crafting-table' },
  { name: 'Dispenser', img: 'dispenser' },
  { name: 'Donkey', img: 'donkey' },
  { name: 'Dropper', img: 'dropper' },
  { name: 'Enchanting Table', img: 'enchanting-table' },
  { name: 'Furnace', img: 'furnace' },
  { name: 'Grindstone', img: 'grindstone' },
  { name: 'Hopper', img: 'hopper' },
  { name: 'Horse', img: 'horse' },
  { name: 'Llama', img: 'llama' },
  { name: 'Loom', img: 'loom' },
  { name: 'Player', img: 'player' },
  { name: 'Shulker Box', img: 'shulker-box' },
  { name: 'Smithing Table', img: 'smithing-table' },
  { name: 'Smoker', img: 'smoker' },
  { name: 'Stonecutter', img: 'stonecutter' },
  { name: 'Villager', img: 'villager' },
];

const inventoryImages = {
  anvil: require('@/assets/inventory/anvil.png'),
  beacon: require('@/assets/inventory/beacon.png'),
  'blast-furnace': require('@/assets/inventory/blast-furnace.png'),
  'brewing-stand': require('@/assets/inventory/brewing-stand.png'),
  'cartography-table': require('@/assets/inventory/cartography-table.png'),
  'chest-large': require('@/assets/inventory/chest-large.png'),
  'chest-small': require('@/assets/inventory/chest-small.png'),
  'crafting-table': require('@/assets/inventory/crafting-table.png'),
  dispenser: require('@/assets/inventory/dispenser.png'),
  donkey: require('@/assets/inventory/donkey.png'),
  dropper: require('@/assets/inventory/dropper.png'),
  'enchanting-table': require('@/assets/inventory/enchanting-table.png'),
  furnace: require('@/assets/inventory/furnace.png'),
  grindstone: require('@/assets/inventory/grindstone.png'),
  hopper: require('@/assets/inventory/hopper.png'),
  horse: require('@/assets/inventory/horse.png'),
  llama: require('@/assets/inventory/llama.png'),
  loom: require('@/assets/inventory/loom.png'),
  player: require('@/assets/inventory/player.png'),
  'shulker-box': require('@/assets/inventory/shulker-box.png'),
  'smithing-table': require('@/assets/inventory/smithing-table.png'),
  smoker: require('@/assets/inventory/smoker.png'),
  stonecutter: require('@/assets/inventory/stonecutter.png'),
  villager: require('@/assets/inventory/villager.png'),
};

export default function InventorySlots() {
  const [selectedType, setSelectedType] = useState('Chest (Large)');

  const selectedInventory = inventories.find((item) => item.name === selectedType);
  const imageSource = selectedInventory ? inventoryImages[selectedInventory.img as keyof typeof inventoryImages] : null;

  return (
    <>
      <Stack.Screen options={{ title: 'Inventory Slots' }} />
      <ScrollView className="flex-1 bg-neutral-900">
        <View className="flex-1 items-center gap-9 p-4">
          <View className="w-full">
            <Text className="mb-2 text-left text-lg font-medium text-white">Container Type</Text>
            <View className="rounded-lg border border-neutral-800 bg-neutral-800">
              <Picker
                selectedValue={selectedType}
                onValueChange={(itemValue: string) => setSelectedType(itemValue)}
                style={{ color: 'white' }}
                dropdownIconColor="white"
              >
                {inventories.map((inventory) => (
                  <Picker.Item
                    key={inventory.name}
                    label={inventory.name}
                    value={inventory.name}
                    color="white"
                  />
                ))}
              </Picker>
            </View>
          </View>

          {imageSource && (
            <Image
              source={imageSource}
              className="w-full px-3 lg:w-[450px]"
              style={{ height: 300 }}
              resizeMode="contain"
            />
          )}
        </View>
      </ScrollView>
    </>
  );
} 
import { Stack } from 'expo-router';
import { useState, useCallback } from 'react';
import { View, FlatList, Text, TextInput, Image } from 'react-native';
import itemsData from '@/app/data/items.json';

interface MinecraftItem {
  newID: string;
  legacyID?: string | number;
  name: string;
  stackSize: number;
  texture?: string;
}

export default function ItemIds() {
  const [searchResults, setSearchResults] = useState<MinecraftItem[]>(itemsData);

  const updateSearch = useCallback((query: string) => {
    const lowercase = query.toLowerCase();
    setSearchResults(
      itemsData.filter((item) => item.name.toLowerCase().replace(' ', '').includes(lowercase))
    );
  }, []);

  const renderItem = ({ item }: { item: MinecraftItem }) => (
    <View className="flex-row items-center border-b border-[#232324] py-2">
      <View className="w-8 items-center justify-center px-1">
        {item.texture && (
          <Image source={{ uri: item.texture }} className="h-5 w-5" alt={`${item.name} Icon`} />
        )}
      </View>
      <View className="flex-1 px-2">
        <Text className="text-[#cecece]">{item.name}</Text>
      </View>
      <View className="flex-1 px-2">
        <Text className="break-all text-[#cecece]">{item.newID}</Text>
      </View>
      <View className="w-[24%] px-2">
        <Text className="text-[#cecece]">{item.legacyID || ''}</Text>
      </View>
      <View className="w-[15%] px-2">
        <Text className="text-[#cecece]">{item.stackSize}</Text>
      </View>
    </View>
  );

  const ListHeader = () => (
    <View className="flex-row items-center border-b-[1.5px] border-[#232324] bg-neutral-900 py-2">
      <View className="w-8 px-1" />
      <View className="flex-1 px-2">
        <Text className="font-medium text-[#9d9d9e]">Display Name</Text>
      </View>
      <View className="flex-1 px-2">
        <Text className="font-medium text-[#9d9d9e]">ID (1.13+)</Text>
      </View>
      <View className="w-[24%] px-2">
        <Text className="font-medium text-[#9d9d9e]">Legacy ID (1.12-)</Text>
      </View>
      <View className="w-[15%] px-2">
        <Text className="font-medium text-[#9d9d9e]">Stack Size</Text>
      </View>
    </View>
  );

  return (
    <>
      <Stack.Screen options={{ title: 'Item IDs' }} />
      <View className="flex-1 bg-neutral-900 px-4">
        <View className="py-4">
          <TextInput
            className="h-12 w-full rounded-md border border-neutral-700 bg-neutral-800 px-3 text-white"
            placeholder="Enter item name..."
            keyboardAppearance="dark"
            placeholderTextColor="#666"
            onChangeText={updateSearch}
            autoCorrect={false}
            autoCapitalize="none"
          />
        </View>

        <FlatList<MinecraftItem>
          data={searchResults}
          renderItem={renderItem}
          keyExtractor={(item: MinecraftItem) => item.newID}
          className="flex-1"
          ListHeaderComponent={ListHeader}
          stickyHeaderIndices={[0]}
          initialNumToRender={20}
          maxToRenderPerBatch={20}
          windowSize={5}
        />
      </View>
    </>
  );
}

import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import { Picker } from '@react-native-picker/picker';
import { useState, useEffect } from 'react';
import { Text, View, Image, ScrollView, Alert, Share, Platform, PermissionsAndroid } from 'react-native';
import * as FileSystem from 'expo-file-system';

interface Cape {
  exists: boolean;
  imageUrls: {
    base: {
      front: string;
    }
  };
  width: number;
  height: number;
  extension: string;
}

export default function CapeStealer() {
  const [username, setUsername] = useState('');
  const [title, setTitle] = useState('Cape Stealer');
  const [capes, setCapes] = useState<{ [key: string]: Cape }>({});
  const [selectedCapeType, setSelectedCapeType] = useState('');
  const [loading, setLoading] = useState(false);
  const [sharing, setSharing] = useState(false);

  const shareCape = async (cape: Cape) => {
    if (!cape || !cape.exists) return;
    
    setSharing(true);
    try {
      const imageUrl = cape.imageUrls.base.front;
      
      await Share.share({
        url: imageUrl,
        message: `I got this cape from MCUtils-Mobile, you should check it out!`,
        title: 'Check out this cape i got from MCUtils-Mobile!'
      });
      
    } catch (error) {
      console.error('Sharing error:', error);
      Alert.alert('Error', 'An error occurred while sharing the cape');
    } finally {
      setSharing(false);
    }
  };

  const stealCape = async (username: string) => {
    if (!username.trim()) {
      setTitle('Invalid username!');
      setCapes({});
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`https://api.capes.dev/load/${username}`, {
        headers: {
          'User-Agent': 'CapeStealer/v1.0'
        }
      });
      if (response.ok) {
        const jsonResponse = await response.json();
        setCapes(jsonResponse);

        const availableCapeTypes = Object.keys(jsonResponse).filter(
          (type) => jsonResponse[type]?.exists
        );

        if (availableCapeTypes.length > 0) {
          setSelectedCapeType(availableCapeTypes[0]);
          setTitle(`${username}'s Capes`);
          return;
        }
        setTitle('No capes found for this user!');
        setCapes({});
        return;
      }
      setTitle('Invalid username!');
      setCapes({});
    } finally {
      setLoading(false);
    }
  };

  const availableCapeTypes = Object.keys(capes).filter(
    (type) => capes[type]?.exists === true
  );

  return (
    <ScrollView>
      <View className="p-4">
        <Text className="text-center text-3xl font-bold text-white my-7 uppercase">
          {title}
        </Text>

        <View className="flex-row mb-5 justify-center">
          <Input
            value={username}
            onChangeText={setUsername}
            placeholder="Enter a username"
            className="mr-2 bg-black text-white"
          />
          <Button
            onPress={() => stealCape(username)}
            disabled={loading}
            className="p-2 rounded bg-white"
          >
            <Text className="text-black font-semibold">{loading ? 'Loading...' : 'Steal Cape'}</Text>
          </Button>
        </View>

        {availableCapeTypes.length > 0 && (
          <View>
            <Text className="font-bold text-white text-center mt-2">Select Cape Type:</Text>
            <View className="">
              <Picker
                selectedValue={selectedCapeType}
                onValueChange={(itemValue) => setSelectedCapeType(itemValue)}
              >
                {availableCapeTypes.map((type) => (
                  <Picker.Item
                    key={type}
                    label={type.charAt(0).toUpperCase() + type.slice(1)}
                    value={type}
                    color='white'
                  />
                ))}
              </Picker>
            </View>
          </View>
        )}

        {selectedCapeType && capes[selectedCapeType]?.exists && (
          <View className="items-center">
            <Text className="font-bold mb-8 text-white text-3xl">Cape Preview:</Text>
            <View className="items-center">
            <Image
              source={{ uri: capes[selectedCapeType].imageUrls.base.front }}
              style={{
                height: 162,
                width: 100,
              }}
              resizeMode="cover"
              fadeDuration={0}
            />
              <Text className="text-center mt-2 text-white">
                {selectedCapeType.charAt(0).toUpperCase() + selectedCapeType.slice(1)} Cape
              </Text>
            </View>
            <View className="flex-row mt-5 space-x-3">
              <Button
                onPress={() => shareCape(capes[selectedCapeType])}
                disabled={sharing}
                className="p-2 rounded bg-green-200"
              >
                <Text className="text-black font-semibold">
                  {sharing ? 'Opening...' : 'Share Cape'}
                </Text>
              </Button>
            </View>
          </View>
        )}
      </View>
    </ScrollView>
  );
}
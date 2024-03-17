import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Alert} from 'react-native';
import Animated, {
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';
import { Text } from 'react-native-rapi-ui';
import { useNavigation } from '@react-navigation/native';


const FloatingButton = () => {
    const navigation = useNavigation();
  const [isOpen, setIsOpen] = useState(false);

  const firstButtonStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: withSpring(isOpen ? -60 : 0) }],
      opacity: withSpring(isOpen ? 1 : 0),
    };
  });

  const secondButtonStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: withSpring(isOpen ? -120 : 0) }],
      opacity: withSpring(isOpen ? 1 : 0),
    };
  });
  return (
    <View style={styles.container}>
      <Animated.View style={[styles.fabContainer, firstButtonStyle]}>
        <TouchableOpacity style={styles.fab} onPress={() => {
            setIsOpen(!isOpen);
            Alert.alert('Da li se slažete?', 'Da se vaši podaci prikazuju drugim korisnicima', [
                {
                  text: 'Ne',
                  onPress: () => console.log('Cancel Pressed'),
                  style: 'cancel',
                },
                {text: 'Da', onPress: () => console.log('OK Pressed')},
              ]);
        }}>
          <Ionicons name='accessibility' size={24} color='white' />
        </TouchableOpacity>
      </Animated.View>

      <Animated.View style={[styles.fabContainer, secondButtonStyle]}>
        <TouchableOpacity style={styles.fab} onPress={() => {
            setIsOpen(!isOpen);
            navigation.navigate('AddNewAd');
        }}>
          <Ionicons name='business-outline' size={24} color='white' />
        </TouchableOpacity>
      </Animated.View>

      <TouchableOpacity
        style={styles.fab}
        onPress={() => {
          setIsOpen(!isOpen);
        }}
      >
        <Ionicons name='add' size={24} color='white' />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    padding: 20,
    position: 'absolute',
    bottom: 0,
    right: 0,
  },
  fab: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#5067FF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 4,
    elevation: 5,
  },
  fabContainer: {
    position: 'absolute',
    bottom: 80,
    right: 20,
    flexDirection: 'row',
    textAlign: 'center',
  },
});

export default FloatingButton;

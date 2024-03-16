import React from 'react';
import { View, StyleSheet } from 'react-native';
import { CheckBox, Text } from 'react-native-rapi-ui';

const CheckBoxButton = ({ label, isSelected, onCheckboxChange }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <CheckBox
        value={isSelected}
        onValueChange={onCheckboxChange}
        style={styles.checkbox}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  label: {
    margin: 8,
    fontSize: 18,
  },
  checkbox: {
    alignSelf: 'center',
  },
});

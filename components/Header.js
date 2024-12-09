// components/Header.js
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export const Header = ({ onFilterPress }) => (
  <View style={styles.header}>
    <Text style={styles.logo}>PowerMatch.</Text>
    {/* Filter Button */}
    {onFilterPress && (
      <TouchableOpacity style={styles.filterButton} onPress={onFilterPress}>
        <Text style={styles.filterButtonText}>🔍</Text> {/* Filter Icon inside Text component */}
      </TouchableOpacity>
    )}
  </View>
);

const styles = StyleSheet.create({
  header: {
    height: 60,
    alignItems: 'center',
    backgroundColor: '#4CAF50', // Background color of the header
    width: '100%',
    flexDirection: 'row', // Arrange logo and button horizontally
    justifyContent: 'space-between', // Space between logo and filter button
    paddingHorizontal: 20, // Optional, for some padding on left/right
  },
  logo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff', // White color for logo text
  },
  filterButton: {
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 30,
    elevation: 5,
  },
  filterButtonText: {
    fontSize: 24,
    color: '#333',
  },
});

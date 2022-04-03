import React from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';

export default function Card(props) {
  return (
    <TouchableOpacity style={styles.card}>
      <View style={styles.cardContent}>
        { props.children }
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 6,
    elevation: 3,
    backgroundColor: '#fff',
    shadowOffset: { width: 1, height: 1 },
    shadowColor: '#333',
    shadowOpacity: 0.9,
    shadowRadius: 2,
  },
  cardContent: {
    marginHorizontal: 10,
    marginVertical: 10,
  }
});
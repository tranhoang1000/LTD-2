import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import { colors, radii } from '../constants/theme';

export default function CategoryCard({ item, active, onPress }) {
  return <TouchableOpacity onPress={onPress} style={[styles.card, active && styles.active]} activeOpacity={0.85}>
    <Text style={styles.icon}>{item.icon}</Text>
    <Text style={[styles.text, active && styles.activeText]}>{item.name}</Text>
  </TouchableOpacity>;
}

const styles = StyleSheet.create({
  card: { width: 92, height: 96, borderRadius: radii.medium, backgroundColor: colors.surface, alignItems: 'center', justifyContent: 'center', marginRight: 10 },
  active: { backgroundColor: colors.primary },
  icon: { fontSize: 25, marginBottom: 7 },
  text: { color: colors.muted, fontSize: 12, fontWeight: '800' },
  activeText: { color: colors.surface },
});

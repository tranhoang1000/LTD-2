import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { useEvents } from '../context/EventContext';
import EventCard from '../components/EventCard';
import { colors } from '../constants/theme';

export default function FavoriteScreen({ navigation }) {
  const { events, favorites } = useEvents();
  const list = events.filter((event) => favorites.includes(event.id));
  return <ScrollView style={styles.background} contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
    <Text style={styles.kicker}>YOUR COLLECTION</Text><Text style={styles.title}>Saved events</Text><Text style={styles.subtitle}>Keep the experiences you do not want to miss.</Text>
    {list.length ? list.map((event) => <EventCard key={event.id} event={event} onPress={() => navigation.navigate('EventDetail', { event })} />) : <View style={styles.empty}><Text style={styles.emptyIcon}>♡</Text><Text style={styles.emptyTitle}>Nothing saved yet</Text><Text style={styles.emptyText}>Tap the heart on an event to save it here.</Text></View>}
  </ScrollView>;
}

const styles = StyleSheet.create({ background: { flex: 1, backgroundColor: colors.background }, container: { padding: 20, paddingTop: 28, paddingBottom: 30 }, kicker: { color: colors.primary, fontSize: 11, fontWeight: '900', letterSpacing: 2 }, title: { color: colors.ink, fontSize: 32, fontWeight: '900', marginTop: 8 }, subtitle: { color: colors.muted, fontSize: 14, lineHeight: 21, marginTop: 7, marginBottom: 25 }, empty: { alignItems: 'center', marginTop: 100, paddingHorizontal: 28 }, emptyIcon: { color: colors.primary, fontSize: 70, lineHeight: 76 }, emptyTitle: { color: colors.ink, fontSize: 20, fontWeight: '900', marginTop: 12 }, emptyText: { color: colors.muted, textAlign: 'center', lineHeight: 21, marginTop: 8 } });

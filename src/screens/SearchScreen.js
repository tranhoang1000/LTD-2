import React, { useState } from 'react';
import { View, Text, TextInput, ScrollView, StyleSheet } from 'react-native';
import { useEvents } from '../context/EventContext';
import EventCard from '../components/EventCard';
import { colors, radii } from '../constants/theme';

export default function SearchScreen({ navigation }) {
  const [query, setQuery] = useState('');
  const { events } = useEvents();
  const list = events.filter((event) => `${event.title} ${event.category} ${event.location}`.toLowerCase().includes(query.toLowerCase()));
  return <View style={styles.background}><View style={styles.header}><Text style={styles.kicker}>DISCOVER</Text><Text style={styles.title}>Search events</Text></View><View style={styles.inputWrap}><Text style={styles.icon}>⌕</Text><TextInput autoFocus placeholder="Event, city or category" placeholderTextColor={colors.muted} value={query} onChangeText={setQuery} style={styles.input} /></View><ScrollView contentContainerStyle={styles.results} showsVerticalScrollIndicator={false}>{query ? <Text style={styles.result}>{list.length} {list.length === 1 ? 'event' : 'events'} found</Text> : <Text style={styles.hint}>Try “music”, “workshop” or “Da Nang”</Text>}{list.map((event) => <EventCard key={event.id} event={event} onPress={() => navigation.navigate('EventDetail', { event })} />)}</ScrollView></View>;
}

const styles = StyleSheet.create({ background: { flex: 1, backgroundColor: colors.background }, header: { padding: 28, paddingBottom: 20 }, kicker: { color: colors.primary, fontSize: 11, fontWeight: '900', letterSpacing: 2 }, title: { color: colors.ink, fontSize: 31, fontWeight: '900', marginTop: 8 }, inputWrap: { height: 56, marginHorizontal: 20, paddingHorizontal: 16, flexDirection: 'row', alignItems: 'center', backgroundColor: colors.surface, borderRadius: radii.medium }, icon: { color: colors.primary, fontSize: 28, marginRight: 9 }, input: { flex: 1, color: colors.ink, fontSize: 14 }, results: { padding: 20, paddingTop: 20, paddingBottom: 30 }, result: { color: colors.ink, fontSize: 14, fontWeight: '800', marginBottom: 15 }, hint: { color: colors.muted, fontSize: 14, marginBottom: 18 } });

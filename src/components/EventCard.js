import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useEvents } from '../context/EventContext';
import { colors, radii } from '../constants/theme';

export default function EventCard({ event, onPress }) {
	const { favorites, toggleFavorite } = useEvents();
	const favorite = favorites.includes(event.id);

	return (
		<TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.9}>
			<Image source={{ uri: event.image }} style={styles.image} />
			<TouchableOpacity style={styles.favorite} onPress={() => toggleFavorite(event.id)}>
				<Text style={styles.favoriteText}>{favorite ? '♥' : '♡'}</Text>
			</TouchableOpacity>
			<View style={styles.content}>
				<View style={styles.topline}>
					<Text style={styles.category}>{event.category}</Text>
					<Text style={styles.price}>{event.price ? `${event.price.toLocaleString('vi-VN')} đ` : 'Miễn phí'}</Text>
				</View>
				<Text style={styles.title} numberOfLines={1}>{event.title}</Text>
				<Text style={styles.meta}>◷  {event.date}  ·  {event.time}</Text>
				<Text style={styles.meta} numberOfLines={1}>⌖  {event.location}</Text>
			</View>
		</TouchableOpacity>
	);
}

const styles = StyleSheet.create({
	card: { backgroundColor: colors.surface, borderRadius: radii.large, marginBottom: 16, overflow: 'hidden', elevation: 2 },
	image: { width: '100%', height: 174 },
	favorite: { position: 'absolute', top: 12, right: 12, width: 42, height: 42, borderRadius: 21, backgroundColor: 'rgba(255,255,255,0.95)', alignItems: 'center', justifyContent: 'center' },
	favoriteText: { color: colors.primary, fontSize: 27, lineHeight: 30 },
	content: { padding: 15 },
	topline: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
	category: { color: colors.primary, fontSize: 12, fontWeight: '900' },
	price: { color: colors.ink, fontSize: 13, fontWeight: '900' },
	title: { color: colors.ink, fontSize: 19, fontWeight: '900', marginTop: 7 },
	meta: { color: colors.muted, fontSize: 13, marginTop: 8 },
});

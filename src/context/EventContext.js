import React,{createContext,useContext,useEffect,useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {events} from '../data/events';
const EventContext=createContext();
export function EventProvider({children}){
 const [favorites,setFavorites]=useState([]),[tickets,setTickets]=useState([]);
 useEffect(()=>{(async()=>{setFavorites(JSON.parse(await AsyncStorage.getItem('favorites')||'[]'));setTickets(JSON.parse(await AsyncStorage.getItem('tickets')||'[]'))})()},[]);
 const toggleFavorite=async id=>{const n=favorites.includes(id)?favorites.filter(x=>x!==id):[...favorites,id];setFavorites(n);await AsyncStorage.setItem('favorites',JSON.stringify(n))};
 const buyTicket=async event=>{if(tickets.some(x=>x.id===event.id))return false;const n=[...tickets,event];setTickets(n);await AsyncStorage.setItem('tickets',JSON.stringify(n));return true};
 return <EventContext.Provider value={{events,favorites,tickets,toggleFavorite,buyTicket}}>{children}</EventContext.Provider>
}
export const useEvents=()=>useContext(EventContext);

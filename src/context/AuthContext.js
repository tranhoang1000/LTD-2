import React,{createContext,useContext,useEffect,useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
const AuthContext=createContext();
export function AuthProvider({children}){
 const [user,setUser]=useState(null),[loading,setLoading]=useState(true);
 useEffect(()=>{AsyncStorage.getItem('eventhub_user').then(x=>setUser(x?JSON.parse(x):null)).finally(()=>setLoading(false))},[]);
 const login=async(email,password)=>{if(!email||!password)throw Error('Vui lòng nhập đầy đủ thông tin'); const u={name:email.split('@')[0],email};setUser(u);await AsyncStorage.setItem('eventhub_user',JSON.stringify(u));};
 const register=async(name,email,password)=>{if(!name||!email||!password)throw Error('Vui lòng nhập đầy đủ thông tin');const u={name,email};setUser(u);await AsyncStorage.setItem('eventhub_user',JSON.stringify(u));};
 const logout=async()=>{setUser(null);await AsyncStorage.removeItem('eventhub_user')};
 return <AuthContext.Provider value={{user,loading,login,register,logout}}>{children}</AuthContext.Provider>
}
export const useAuth=()=>useContext(AuthContext);

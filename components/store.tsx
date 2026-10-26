"use client";
import React,{createContext,useContext,useEffect,useState} from "react";
import {Product,products,initialOrders} from "@/lib/data";
type Order=typeof initialOrders[number];
type State={items:{id:number;qty:number}[];wishlist:number[];products:Product[];orders:Order[];add:(id:number)=>void;remove:(id:number)=>void;quantity:(id:number,qty:number)=>void;toggleWish:(id:number)=>void;setProducts:React.Dispatch<React.SetStateAction<Product[]>>;setOrders:React.Dispatch<React.SetStateAction<Order[]>>;clear:()=>void};
const C=createContext<State|null>(null);
export function StoreProvider({children}:{children:React.ReactNode}){const [items,setItems]=useState<State["items"]>([]),[wishlist,setWishlist]=useState<number[]>([]),[catalog,setProducts]=useState<Product[]>(products),[orders,setOrders]=useState<Order[]>(initialOrders);const [ready,setReady]=useState(false);
useEffect(()=>{try{const v=localStorage.getItem("kruger-demo");if(v){const d=JSON.parse(v);setItems(d.items||[]);setWishlist(d.wishlist||[]);setProducts(d.catalog||products);setOrders(d.orders||initialOrders)}}catch{}setReady(true)},[]);
useEffect(()=>{if(ready)localStorage.setItem("kruger-demo",JSON.stringify({items,wishlist,catalog,orders}))},[ready,items,wishlist,catalog,orders]);
const add=(id:number)=>setItems(v=>{const found=v.find(x=>x.id===id);return found?v.map(x=>x.id===id?{...x,qty:x.qty+1}:x):[...v,{id,qty:1}]});
const quantity=(id:number,qty:number)=>setItems(v=>qty<=0?v.filter(x=>x.id!==id):v.map(x=>x.id===id?{...x,qty}:x));
const remove=(id:number)=>setItems(v=>v.filter(x=>x.id!==id));const toggleWish=(id:number)=>setWishlist(v=>v.includes(id)?v.filter(x=>x!==id):[...v,id]);
return <C.Provider value={{items,wishlist,products:catalog,orders,add,remove,quantity,toggleWish,setProducts,setOrders,clear:()=>setItems([])}}>{children}</C.Provider>}
export const useStore=()=>{const c=useContext(C);if(!c)throw Error("Store provider missing");return c};

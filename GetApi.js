import React, { useEffect, useState } from "react";
import { CUSTOMER_LIST, DELETE_CUSTOMER } from "./Utility";
import axios from "axios";
import { Alert, FlatList, Text, TouchableOpacity, View } from "react-native";
import { Style } from "./Style";

export const UI = () => {
    const API_CALL = CUSTOMER_LIST;
    const [userlist, setuserlist] = useState([])
    useEffect(() => {
        getUsers()
    },[])
    const getUsers=()=>{
        axios.get(API_CALL)
        .then((response) => {
            // console.log(response.data)
            setuserlist(response.data)
        })
        .catch((error)=>console.log("Failed To Get Data :",error))
    }
    const handleDelete = (id)=>{
        axios.delete(DELETE_CUSTOMER+id+"/")
        .then((response)=>{
            Alert.alert("Customer Deleted Sussessfully !!")
            getUsers()
        })
        .catch((error)=>console.log("Failed To Delete Cuatomer :",error))
    }
    return (
        <View style={{marginHorizontal:10,marginVertical:5}}>
            <FlatList
                data={userlist}
                key={(item) => item.id}
                renderItem={({ item, index }) => <View>
                    <Text style={Style.title}>Name : {item.name}</Text>
                    <Text style={Style.title}>Email : {item.email}</Text>
                    <Text style={Style.title}>Balance : {item.balance}</Text>
                    <TouchableOpacity
                    onPress={()=>handleDelete(item.id)}
                    >
                        <Text style={Style.btnDelete}>
                            Delete
                        </Text>
                    </TouchableOpacity>
                </View>}
            >

            </FlatList>
        </View>
    )
}
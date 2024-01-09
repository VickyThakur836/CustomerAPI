import React, { useEffect, useState } from "react";
import { View,Text, TextInput, TouchableOpacity, Alert, ScrollView, ActivityIndicator } from "react-native";
import { Style } from "./Style";
import { RadioButton } from "react-native-paper";
import ReactNativeSegmentedControlTab from "react-native-segmented-control-tab";
import axios from "axios";
import { SINGLE_RECORD, UPDATE_CUSTOMER } from "./Utility";

export const Update=({route,navigation})=>{
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [gender, setGender] = useState("")
    const [account_no, setAccountNo] = useState("")
    const [balance,setBalance]=useState("")
    const [accounttype, setAccounttype]= useState("Saving")
    const [list,setList]=useState(["Saving","Current"])
    const [selectedIndex,setSelectedIndex]=useState(0)

    const [loading, setLoading] = useState(false)
    // console.log(route.params.id)
    useEffect(()=>{
        // console.log("Use Effect")
        setLoading(true)
            getData()

    },[])
    const handleSubmit  =()=>{
        const obj = {
            "name":name,
            "gender":gender,
            "accounttype":accounttype,
            "balance":parseInt(balance),
            "account_no":parseInt(account_no),
            "email":email,
            "password":password
        }
        axios.put(UPDATE_CUSTOMER + route.params?.id + "/",obj)
        .then((response)=>{
            Alert.alert("Customer Record Updated Successfull !!")
            // console.log("Response :",response.data)
            navigation.navigate("Home")
        })
        .catch((e)=>{
            console.log(e)
            alert(e)
        })      
    }
    const getData=()=>{
        axios.get(SINGLE_RECORD + route.params?.id +"/")
        .then((response)=>{
            // console.log("Use Effect :"+response.data)
            const {name,email,account_no,password,accounttype,balance,gender} = response?.data
            setName(name)
            setEmail(email)
            setAccountNo(account_no)
            setBalance(balance)
            setPassword(password)
            setAccounttype(accounttype)
            setGender(gender)
            setLoading(false)
        })
        .catch((error)=>{
            console.log(error)
        })
     }
    return(
        <View style={{justifyContent:"center",marginHorizontal:"5%"}}>
            <ScrollView>
            <TextInput
            placeholder="Enter Name "
            style={Style.form}
            value={name}
            onChangeText={(event)=>setName(event)}
            />
            <TextInput
            placeholder="Enter Email"
            style={Style.form}
            value={email}
            onChangeText={(event)=>setEmail(event)}
            />
            <TextInput
            placeholder="Enter Password"
            style={Style.form}
            value={password}
            secureTextEntry={true}
            onChangeText={(event)=>setPassword(event)}
            />
            {loading ?
            <View style={{display:"flex",alignItems:"center",justifyContent:"center",flex:1,...Style.centerView}}>
            <ActivityIndicator size={"large"}
            color={"red"}
            ></ActivityIndicator>
            <Text style={Style.radioTitle}>Loading ...</Text>
            </View>:null}
            <TextInput
            placeholder="Enter Account No."
            style={Style.form}
            keyboardType="numeric"
            value={account_no.toString()}
            onChangeText={(event)=>setAccountNo(event)}
            />
            <TextInput
            placeholder="Enter Balance "
            style={Style.form}
            keyboardType="numeric"
            value={balance.toString()}
            onChangeText={(event)=>setBalance(event)}
            />
            <ReactNativeSegmentedControlTab
            values={list}
            selectedIndex={selectedIndex}
            onTabPress={(index)=>{
                setSelectedIndex(index)
                setAccounttype(list[index])
              }
            }
            tabStyle={{borderColor:"red",borderWidth:2}}
            tabTextStyle={{color:"red",fontWeight:"bold"}}
            tabsContainerStyle={{marginVertical:10,height:40}}
            
            activeTabStyle={{backgroundColor:"red",borderWidth:2}}
            
            />
            <View style={{flexDirection:"row",alignItems:"center",justifyContent:"center",padding:8,marginBottom:20,...Style.form}}>
                <Text style={Style.radioTitle}>Gender :</Text>
                <RadioButton 
                color="red"
                onPress={()=>setGender("Male")}
                status={gender == "Male"||gender =="male" ? "checked" :"unchecked"}
                />
                <Text style={Style.radio}>Male</Text>
                <RadioButton 
                color="red"
                onPress={()=>setGender("Female")}
                status={gender == "Female"||gender =="female" ? "checked" :"unchecked"}
                />
                <Text style={Style.radio}>Female</Text>
                
                <RadioButton 
                color="red"
                onPress={()=>setGender("Other")}
                status={gender == "Other" ? "checked" :"unchecked"}
                />
                <Text style={Style.radio}>Other</Text>
            </View>
            
            <TouchableOpacity
            activeOpacity={0.5}
            onPress={handleSubmit}
            >
            <Text style={Style.btnBlack}>
                Submit
            </Text>
            </TouchableOpacity>
            </ScrollView>
        </View>
    )
}
import React, { useState } from "react";
import { View,Text, TextInput, TouchableOpacity, Alert, ScrollView } from "react-native";
import { Style } from "./Style";
import { RadioButton } from "react-native-paper";
import ReactNativeSegmentedControlTab from "react-native-segmented-control-tab";
import axios from "axios";
import { REGISTER_URL } from "./Utility";

export const Signup=()=>{
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [gender, setGender] = useState("Male")
    const [account_no, setAccountNo] = useState("")
    const [balance,setBalance]=useState("")
    const [accounttype, setAccounttype]= useState("Saving")
    const [list,setList]=useState(["Saving","Current"])
    const [selectedIndex,setSelectedIndex]=useState(0)
    const handleSubmit  =()=>{
        const obj = {
            "name":name,
            "balance":parseInt(balance),
            "gender":gender,
            "account_no":parseInt(account_no),
            "accounttype":accounttype,
            "email":email,
            "password":password
        }
        axios.post(REGISTER_URL,obj)
        .then((response)=>{
            Alert.alert("Register Successfull !!")
            console.log("Response :",response.data)

        })
        .catch((e)=>{
            console.log(e)
            alert(e)
        })

        
    }
    return(
        <View style={Style.centerView}>
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
            <TextInput
            placeholder="Enter Account No."
            style={Style.form}
            keyboardType="numeric"
            value={account_no}
            onChangeText={(event)=>setAccountNo(event)}
            />
            <TextInput
            placeholder="Enter Balance "
            style={Style.form}
            keyboardType="numeric"
            value={balance}
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
            <View style={{flexDirection:"row",justifyContent:"center",padding:8,marginBottom:20,alignItems:"center",...Style.form}}>
                <Text style={Style.radioTitle}>Gender :</Text>
                <RadioButton 
                color="red"
                onPress={()=>setGender("Male")}
                status={gender == "Male" ? "checked" :"unchecked"}
                />
                <Text style={Style.radio}>Male</Text>
                <RadioButton 
                color="red"
                onPress={()=>setGender("Female")}
                status={gender == "Female" ? "checked" :"unchecked"}
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
import React, { Image, TextInput } from "react-native";
import { View,Text,TouchableOpacity} from "react-native";
import { Style } from "./Style";
import { useState } from "react";
import axios from "axios";
import { LOGIN_URL } from "./Utility";
import LinearGradient from "react-native-linear-gradient";
export const Login = ({navigation})=>{
    const [email, setemail] = useState("")
    const [password, setpassword] = useState("")

    const handleSubmit =()=>{
        const obj = {
            email:email,
            password:password
        }
        axios.post(LOGIN_URL,obj)
        .then((response)=>{
            console.log("Response :",response.data)
            console.log("Message :",response.data.message)
            if(response.data.message==undefined){
                alert("Login Successfully !!")
                navigation.navigate("Home",{
                    email:email
                })
            }
            else{
                alert("Invalid Username Or Password !!")
                console.log("Invalid Username Or Password !!")
            }
        })
        .catch((error)=>alert(error))
    }
    return(
        // <LinearGradient
        //     style={{flex:1}}
        //     colors={["rgb(155,81,224)","#ECC5FB"]}
        //     >
        <View style={{backgroundColor:"white",...Style.centerView,marginHorizontal:0,}}>
            <Text style={{textAlign:"center",fontSize:25,color:"#272829",fontWeight:"bold",fontFamily:"sans-serif"}}>
                Welcome Back !!
            </Text>
            <Image
             source={{uri:"https://img.freepik.com/free-vector/access-control-system-abstract-concept_335657-3180.jpg"}}
             style={{height:"45%"}}
            />
            <TextInput
            placeholder="Enter Email"
            style={{marginHorizontal:10,...Style.form}}
            
            onChangeText={(event)=>setemail(event)}
            />
            <TextInput
            placeholder="Password"
            style={{marginHorizontal:10,...Style.form}}
            
            secureTextEntry={true}
            onChangeText={(event)=>setpassword(event)}
            />
            <TouchableOpacity
            activeOpacity={0.5}
            onPress={handleSubmit}
            >
                <Text style={{marginHorizontal:10,...Style.btnBlue}}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity
            activeOpacity={0.5}
            onPress={()=>navigation.navigate("Signup")}
            >
                <Text style={{marginHorizontal:10,...Style.btnBlack}}>Sign Up</Text>
            </TouchableOpacity>
        </View>
        // </LinearGradient>
        
    )
}

import { View,Text, FlatList, TouchableOpacity, ImageBackground,Alert, ActivityIndicator, TextInput } from "react-native";
import { Style } from "./Style";
import { useEffect,useRef,useState } from "react";
import axios from "axios";
import { APP_NAME, CUSTOMER_LIST, DELETE_CUSTOMER } from "./Utility";
import LinearGradient from "react-native-linear-gradient";
import Icon from "react-native-vector-icons/Ionicons"
export const Home =({navigation,route})=>{
    const [user_list, setuser_list] = useState([])
    const [search_list, setSearch_list] = useState([])
    const [loading, setLoading] = useState(false)
    const search = useRef();
    useEffect(()=>{
        // console.log("Hii")
        //     getUsers()
        navigation.addListener("focus",()=>{
            setLoading(true)
            getUsers()
        })   
    },[])

    const getUsers=()=>{
        axios.get(CUSTOMER_LIST)
        .then((response)=>{
            setuser_list(response.data)
            setSearch_list(response.data)
            // console.log(response.data)
            setLoading(false)
        })
        .catch((error)=>{
            console.log(error)
        })
    }
    const handleDelete=(id)=>{
        axios.delete(DELETE_CUSTOMER + id+ "/")
        .then((response)=>{
            alert("Customer Deleted Successfully !!")
            console.log(response.data)
            getUsers()
        })
        .catch((error)=>{
            console.log(error)
        })
    }
    const handleAlert= (id)=>{
        if(route.params?.email=="vicky@gmail.com")
        {
        Alert.alert(APP_NAME,"Are You Sure To Delete Customer !!",[
            {
                text:"cancel",
                onPress:()=>console.log("cancel !")
            },
            {
                text:"Delete",
                onPress:()=>handleDelete(id)
            }
        ])
        }
        else{
            Alert.alert("Only Admin Can Delete Users !!.")
        }
    }
    const handleSearch =(e)=>{
        search.current.valueOf().value = e
        const value = search.current.valueOf().value
        if(value != ""){
            const newData = search_list.filter((user)=>{
            //    console.log(Object.values(user).join(" ")) 
               return Object.values(user).join(" ").includes(value)
            })
            setuser_list(newData)
        }
        else{
            setuser_list(search_list)
        }
    }
    return(
        // <ImageBackground source={require("../controller/Images/loginVector.jpg")}>
        <View style={{flex:1}}>
            <LinearGradient
            colors={["rgb(155,81,224)","rgba(6,147,227,1)"]}
            >
            {/* <ImageBackground
            // source={{uri:"https://img.freepik.com/free-vector/gradient-blur-abstract-phone-wallpaper-vector_53876-136694.jpg"}}
            source={{uri:"https://img.freepik.com/free-vector/gradient-blur-abstract-phone-wallpaper-vector_53876-136694.jpg"}}
            > */}
        <View style={{justifyContent:"space-between",flexDirection:"row",...Style.title,backgroundColor:"transparent",borderWidth:2,borderRadius:10,margin:5,marginHorizontal:13,borderColor:"white"}}>
            <Text style={{fontSize:18,fontWeight:"bold",color:"white"}}> Home</Text>
            <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={()=>navigation.popToTop()}
            >
            <View style={{flexDirection:"row"}}>
                    <Text style={{fontSize:18,fontWeight:"bold",color:"white"}}>
                        Logout
                    </Text>
                    <Icon 
                    name="log-out"
                    size={25}
                    color="white"
                    />
                    </View> 
                </TouchableOpacity>
        </View>
        <View style={{flexDirection:"row",justifyContent:"center",alignItems:"center",borderWidth:2,borderColor:"white",height:50,marginVertical:5,marginHorizontal:25,borderRadius:5}}>
        <TextInput
        placeholder="Search User"
        placeholderTextColor={"rgba(255,255,255,0.7)"}
        style={{...Style.form,borderColor:"white",fontSize:18,margin:10,color:"white",width:"50%",height:48,borderWidth:0}}
        ref={search}
        onChangeText={(e)=>handleSearch(e)}
        />
        <Icon
        name={"search"}
        size={30}
        color={"white"}
        />
        </View>
        {user_list.length > 0 ? <FlatList
        data={user_list}
        key={(item)=>item.id}
        renderItem={({item,index})=>{
            return(
                    <View style={{alignItems:"center",borderColor:"#F3F8FF",borderRadius:15,padding:5,borderWidth:2,margin:5,backgroundColor:"rgba(255,255,255,0.2)",...Style.centerView}}>
                        <Text style={Style.listStyle}>Name : {item.name}</Text>
                        <Text style={Style.listStyle}>Email : {item.email}</Text>
                        <Text style={Style.listStyle}>Account No. : {item.account_no}</Text>
                        <Text style={Style.listStyle}>Account Type : {item.accounttype}</Text>
                        <Text style={Style.listStyle}>Balance : {item.balance}</Text>
                        <Text style={Style.listStyle}>Gender : {item.gender}</Text>
                        <View style={{flexDirection:"row",alignItems:"center",justifyContent:"space-between"}}>
                            <TouchableOpacity 
                            onPress={()=>handleAlert(item.id)}
                            >
                                <Text style={{...Style.btnDelete,margin:8}}>Delete</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                            onPress={()=>{
                               // if(item.email==route.params.email||route.params.email=="vicky@gmail.com"){
                                    navigation.navigate("Update",{
                                        id:item.id
                                        })
                                // }
                                // else{
                                //     Alert.alert("Only Admin Can Edit Others Data ")
                                // }
                               
                            }
                            } 
                            >
                                <Text style={{...Style.btnBlue,margin:8}}>Update</Text>
                            </TouchableOpacity>
                        </View>
                </View>
            )
        }}
        >

</FlatList>:<Text style={{textAlign:"center",margin:10,...Style.btnBlue}}>No Record Found !!</Text>}
{loading ?
        <View style={{display:"flex",alignItems:"center",justifyContent:"center",flex:1,...Style.centerView}}>
            <ActivityIndicator size={"large"}
            color={"red"}
            ></ActivityIndicator>
            <Text style={Style.radioTitle}>Loading ...</Text>
            </View>:null}
        </LinearGradient>
        {/* </ImageBackground> */}
        </View>
        
        // </ImageBackground>
    )
}
import React, { useState } from "react";
import {
  Box,
  Button,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  useToast,
} from "@chakra-ui/react";
import axios from "axios"
import { useNavigate } from "react-router-dom";



const AdminSignup = () => {
  const toast = useToast()
  const [show1, setshow1] = useState(false);
  const [show2, setshow2] = useState(false);
  const [loading,setloading] = useState(false)
  const [list,setlist] = useState({
    name:"",
    email:"",
    password1:"",
    password2:"",
    pic:""
  })
  const nav = useNavigate()


  const submitHandler = async () => {

    if(list.password1 != list.password2){
      toast({
        title:"Password does not match",
        duration:5000,
        status:"error",
        position:"bottom",
        isClosable:true
      })
      return ;
    }

    let options;

    if(list.pic == "" && list.password1 == list.password2){
       options = {
        url:"https://shoe-ecommerce-website.herokuapp.com/admin/adminsignup",
        headers:{
          "content-type":"application/json"
        },
        data:{
          name:list.name,
          email:list.email,
          password:list.password1,
        },
        method:"POST"
      }
    }
   
   
    if(list.pic != "" && list.password1 == list.password2){
       options = {
        url:"https://shoe-ecommerce-website.herokuapp.com/admin/adminsignup",
        headers:{
          "content-type":"application/json"
        },
        data:{
          name:list.name,
          email:list.email,
          password:list.password1,
          pic:list.pic
        },
        method:"POST"
      }
    }


    try{
      setloading(true)
      let response = await axios(options)
      console.log(response.data)
      localStorage.setItem("shoeDetails", JSON.stringify(response.data.result))
      localStorage.setItem("shoetocken",response.data.tocken)
      if(response.data.message == "SignUp SuccessFull"){
        nav("/AdminDashboard")
      }
      setloading(false)
    }catch(error){
      toast({
        title:"Unable to SignUp Try Again Later",
        duration:5000,
        status:"error",
        position:"bottom",
        isClosable:true
      })
    }
    setloading(false)
  } 


  const handleClick1 = () => {
    setshow1(!show1);
  };
  const handleClick2 = () => {
    setshow2(!show2);
  };

  const inputChangeHandler = (e) => {
    setlist({...list,[e.target.name]:e.target.value})
  }

  const fileHandler = async (e) => {

    let data;

    if(e.target.files[0].type == "image/png" || e.target.files[0].type == "image/jpeg" || e.target.files[0].type == "image/jpg"){
       data = new FormData();
      data.append("file", e.target.files[0]);
      data.append("upload_preset", "random chat");
      data.append("cloud_name", "duoyghpxn");
    }

      try{
        setloading(true)
        let response = await axios.post(
          "https://api.cloudinary.com/v1_1/duoyghpxn/image/upload",
          data
          );
          setlist({...list,[e.target.name]:response.data.url})
          setloading(false)
        
      }catch(error){
        toast({
          title:"Unable to Upload the Image",
          duration:5000,
          status:"error",
          position:"bottom",
          isClosable:true
        })
      }

  }

  return (
    <Box d="flex" flexDir={"column"} justifyContent="space-between" padding={2}>
      <FormLabel>Name</FormLabel>
      <Input placeholder="Enter Name" size="md" type={"email"} name="name" value={list.name} onChange={inputChangeHandler} />
      <FormLabel>Email Id</FormLabel>
      <Input placeholder="Enter Email Id" size="md" type={"email"} name="email" value={list.email} onChange={inputChangeHandler}/>
      <FormLabel>New Password</FormLabel>
      <InputGroup size="md">
        <Input
          pr="4.5rem"
          type={show1 ? "text" : "password"}
          placeholder="Enter password"
          name="password1" value={list.password1} onChange={inputChangeHandler}
        />
        <InputRightElement width="4.5rem">
          <Button h="1.75rem" size="sm" onClick={handleClick1}>
            {show1 ? "Hide" : "Show"}
          </Button>
        </InputRightElement>
      </InputGroup>
      <FormLabel>Confirm Password</FormLabel>
      <InputGroup size="md">
        <Input
          pr="4.5rem"
          type={show2 ? "text" : "password"}
          placeholder="Enter password"
          name="password2" value={list.password2} onChange={inputChangeHandler}
        />
        <InputRightElement width="4.5rem">
          <Button h="1.75rem" size="sm" onClick={handleClick2}>
            {show2 ? "Hide" : "Show"}
          </Button>
        </InputRightElement>
      </InputGroup>
      <FormLabel>Upload Pic</FormLabel>
      <Input type={"file"} placeholder="Upload Profile Pic" onChange={fileHandler} name="pic" />
      <br />
      <Button colorScheme="blue" variant="solid" onClick={submitHandler} isLoading={loading}>
        SignUp
      </Button>
    </Box>
  );
};

export default AdminSignup;

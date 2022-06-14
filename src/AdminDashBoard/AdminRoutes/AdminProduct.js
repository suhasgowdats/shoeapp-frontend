import { Box, Button, FormControl, FormLabel, Input, list, useToast } from "@chakra-ui/react";
import axios from "axios";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MainContext } from "../../context/context";
import Header from "../AdComponents/Header";
import AdFooter from "../AdFooter";

const AdminProduct = () => {
  const nav = useNavigate();
  const toast = useToast()
  const {user, } = useContext(MainContext)

  const [list,setlist] = useState({
    shoeName:"",
    shoeCompany:"",
    shoePrice:"",
    shoe_available:"",
    shoetitle:"",
    shoeDescription:"",
    shoewImage:""
  })


  const inputChangeHandler = (e) => {
    setlist({...list,[e.target.name]:e.target.value})
  }


  const submitHandler = async () => {
    const tocken=localStorage.getItem("shoetocken")
    list.uniqueId = list.shoeCompany+list.shoeName+(list.shoe_available/10)+((Math.random()*100).toFixed(0))
    let options = {
      url:"https://shoe-ecommerce-website.herokuapp.com/admin/adminproduct",
      method:"POST",
      headers:{
        "content-type":"application/json",
        Authorization : `Bearer ${tocken}`
      },
      data:list
    }

    try{
      console.log(options)
      console.log(tocken)
      let response = await axios(options)
      console.log(response.data)
      if(response.data.message == "Unable to add product"){
        toast({
          title:"Unable to Add Product",
          duration:5000,
          position:"bottom",
          status:"error",
          isClosable:true
        })
      }else{
        toast({
          title:"Product Added SuccessFully",
          duration:5000,
          position:"bottom",
          status:"success",
          isClosable:true
        })

        // nav("/AdminDashboard")
      }
    }catch(error){
      toast({
        title:"Unable to Add Product",
        duration:5000,
        position:"bottom",
        status:"error",
        isClosable:true
      })
    }
  }

  return (
    <Box
    d="flex"
    flexDir={"column"}
    justifyContent="space-between"
    alignItems={"center"}
    >
      <Header>
        <Button
          colorScheme="teal"
          size="md"
          onClick={() => nav("/AdminDashboard")}
        >
          Home
        </Button>
      </Header>
      <FormControl
      d="flex"
      flexDir={"column"}
      alignItems="center"
    justifyContent={"space-between"}
    width="600px"
    p={5}
    margin="70px auto 0px auto"
    boxShadow={"0px 1px 11px 1px grey"}
      >
        <FormLabel>Shoe Name</FormLabel>
        <Input placeholder="Shoe Name" size="lg" type={"text"} value={list.shoeName} onChange={inputChangeHandler} name="shoeName"/>
        <br />
        <FormLabel>Shoe Company</FormLabel>
        <Input placeholder="Shoe Company" size="lg" type={"text"} value={list.shoeCompany} onChange={inputChangeHandler} name="shoeCompany"/>
        <br />
        <FormLabel>Shoe Price</FormLabel>
        <Input placeholder="Shoe Price" size="lg" type={"number"} value={list.shoePrice} onChange={inputChangeHandler} name="shoePrice"/>
        <br />
        <FormLabel>Shoe Image</FormLabel>
        <Input placeholder="Shoe Image" size="lg" type={"text"} value={list.shoewImage} onChange={inputChangeHandler} name="shoewImage"/>
        <br />
        <FormLabel>Number Of Shoes Available</FormLabel>
        <Input placeholder="Shoe Available" size="lg" type={"number"} value={list.shoe_available} onChange={inputChangeHandler} name="shoe_available"/>
        <br />
        <FormLabel>Shoe Title</FormLabel>
        <Input placeholder="Shoe Title" size="lg" type={"text"} value={list.shoetitle} onChange={inputChangeHandler} name="shoetitle"/>
        <br />
        <FormLabel>Shoe Descriptions</FormLabel>
        <Input placeholder="Shoe Description" size="lg" type={"text"} value={list.shoeDescription} onChange={inputChangeHandler} name="shoeDescription"/>
        <br />
        <br />
        <Button
          colorScheme="blue"
          size="md"
          onClick={submitHandler}
        >
          Add Product
        </Button>
      </FormControl>
      <AdFooter />
    </Box>
  );
};

export default AdminProduct;

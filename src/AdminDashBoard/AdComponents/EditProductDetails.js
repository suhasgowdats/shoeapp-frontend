import { Box, Button, FormControl, FormLabel, Input, toast, useToast } from '@chakra-ui/react'
import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { MainContext } from '../../context/context'
import Header from './Header'

const EditProductDetails = () => {
  const toast = useToast()
    const nav = useNavigate()
    const {id} = useParams()
    const {tocken} = useContext(MainContext)

  const [list,setlist] = useState({
    shoeDescription:"",
    shoetitle:"",
    shoe_available:"",
    shoewImage:"",
    shoePrice:"",
    shoeCompany:"",
    shoeName:""
  })


  const inputChangeHandler = (e) => {
    setlist({...list,[e.target.name]:e.target.value})
}


  const submitHandler = async () => {
    const tocken=localStorage.getItem("shoetocken")
    let options = {
      url:"https://shoe-app-back-end-2022.herokuapp.com/fetch/updateProduct",
      headers:{
        "content-type":"application/json",
        Authorization:`Bearer ${tocken}`
      },
      method:"POST",
      data:list
    }

    try{
      let response = await axios(options)
      console.log(response.data)
      if(response.data.message == "Product Updated"){
        toast({
          title:"Product Updated",
          duration:5000,
          position:"bottom",
          isClosable:true,
          status:"success"
        })
      }else{
        toast({
          title:"unable to Update The Details",
          duration:5000,
          position:"bottom",
          isClosable:true,
          status:"error"
        })
      }
      nav("/AdminDashboard")
    }catch(error){
      toast({
        title:"unable to Update The Details",
        duration:5000,
        position:"bottom",
        isClosable:true,
        status:"error"
      })
    }

  }

  const fetchSingProductDetails = async () => {
    const tocken=localStorage.getItem("shoetocken")
    let options = {
      url:`https://shoe-app-back-end-2022.herokuapp.com/fetch/singleProduct/${id}`,
      method:"GET",
      headers:{
        "content-type":"application/json",
        Authorization:`Bearer ${tocken}`
      },
    }

    try{
      let response = await axios(options)
      console.log(response.data)
      let value = response.data.result[0]
      setlist({...list,...value})
    }catch(error){
      toast({
        title:"unable to get The Details",
        duration:5000,
        position:"bottom",
        isClosable:true,
        status:"error"
      })
    }

  }


useEffect(()=>{
  fetchSingProductDetails()
},[])


  return (
    <Box>
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
    width="300px"
    margin="70px auto 0px auto"
      >
        <FormLabel>Shoe Name</FormLabel>
        <Input placeholder="large size" size="lg" type={"text"} value={list.shoeName} onChange={inputChangeHandler} name="shoeName"/>
        <br />
        <FormLabel>Shoe Company</FormLabel>
        <Input placeholder="large size" size="lg" type={"text"} value={list.shoeCompany} onChange={inputChangeHandler} name="shoeCompany"/>
        <br />
        <FormLabel>Shoe Price</FormLabel>
        <Input placeholder="large size" size="lg" type={"number"} value={list.shoePrice} onChange={inputChangeHandler} name="shoePrice"/>
        <br />
        <FormLabel>Shoe Image</FormLabel>
        <Input placeholder="large size" size="lg" type={"text"} value={list.shoewImage} onChange={inputChangeHandler} name="shoewImage"/>
        <br />
        <FormLabel>Number Of Shoes Available</FormLabel>
        <Input placeholder="large size" size="lg" type={"number"} value={list.shoe_available} onChange={inputChangeHandler} name="shoe_available"/>
        <br />
        <FormLabel>Shoe Title</FormLabel>
        <Input placeholder="large size" size="lg" type={"text"} value={list.shoetitle} onChange={inputChangeHandler} name="shoetitle"/>
        <br />
        <FormLabel>Shoe Descriptions</FormLabel>
        <Input placeholder="large size" size="lg" type={"text"} value={list.shoeDescription} onChange={inputChangeHandler} name="shoeDescription"/>
        <br />
        <br />
        <Button
          colorScheme="teal"
          size="md"
          onClick={submitHandler}
        >
          Update
        </Button>
      </FormControl>
    </Box>
  )
}

export default EditProductDetails
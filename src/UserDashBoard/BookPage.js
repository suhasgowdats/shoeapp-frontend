import { Box, Button, FormControl, FormLabel, Image, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper, Text, useToast } from '@chakra-ui/react'
import axios from 'axios';
import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import { MainContext } from '../context/context';
import UHeader from './UHeader'

const BookPage = () => {
    const toast = useToast()
    const { selectedProduct, address, tocken, setselectedProduct, setcartItem, cartItem, setAddress } = useContext(MainContext);
    const nav = useNavigate()



    const bookProduct = async() => {
        let options1 = {
          url:"https://shoe-ecommerce-website.herokuapp.com/user/purchase",
          headers:{
            "content-type":"application/json",
            Authorization:`Bearer ${tocken}`,
            value:"user"
          },
          data:selectedProduct,
          method:"POST"
        }
        
        
        
        let options2 = {
          url:"https://shoe-ecommerce-website.herokuapp.com/fetch/updateProduct",
          headers:{
            "content-type":"application/json",
            Authorization:`Bearer ${tocken}`,
            value:"user"
          },
          data:{
            _id:selectedProduct._id,
            shoe_available:selectedProduct.shoe_available
          },
          method:"POST"
        }

        let filterItems

        try{
          let response = await axios(options1)
          if(response.data.message == "SuccessFully Updated"){
             filterItems = cartItem.filter(list => list._id != selectedProduct._id)
             toast({
              title:"Payment SuccessFull",
              position:"bottom",
              duration:5000,
              isClosable:true,
              status:"success"
            })
          }else{
            toast({
              title:"Unable to Purchase the Product",
              position:"bottom",
              duration:5000,
              isClosable:true,
              status:"error"
            })
          }
        }catch(error){
          toast({
            title:"Unable to Purchase the Product",
            position:"bottom",
            duration:5000,
            isClosable:true,
            status:"error"
          })
        }


          // update product quantity in the database
          try{
            let response = await axios(options2)
            console.log(response.data)
          }catch(error){
            toast({
              title:"Unable To Update Product Quantity",
              duration:5000,
              position:"bottom",
              status:"error",
              isClosable:true
            })
          }
        
          setcartItem(filterItems)
          setselectedProduct("")
          setAddress("")
          nav("/dashboard")

    }

  return (
    <Box>
      <UHeader>
        <Button colorScheme="teal" size="md">
          Home
        </Button>
      </UHeader>
      {selectedProduct == "" ? (
        <Text>Please Select A Product</Text>
      ) : (
        <>
          <Box
            d="flex"
            flexDir={"row"}
            alignItems="flex-start"
            justifyContent={"flex-start"}
            fontSize={25}
            padding={"15px"}
            boxShadow="0px 1px 11px 11px #C8C0BE"
            bg={"#F0F9D1"}
            mt={10}
            mb={10}
            mr={10}
            ml={10}
          >
            <Image
              src={`${selectedProduct.shoewImage}`}
              alt="Shoe Image"
              maxW={"400px"}
              maxHeight={"300px"}
              minW={"400px"}
              minHeight={"300px"}
              mr={10}
            />
            <Box
              mt={"4"}
              d="flex"
              flexDirection={"column"}
              alignItems={"flex-start"}
              justifyContent="space-around"
            >
              <Text>Name : {selectedProduct.shoeName}</Text>
              <Text>Company Name : {selectedProduct.shoeCompany}</Text>
              <Text>Quantity : {selectedProduct.qty}</Text>
              <Text>Price : {selectedProduct.shoePrice * selectedProduct.qty}</Text>
              <Text>Street : {address.street}</Text>
              <Text>LandMark : {address.landmark}</Text>
              <Text>City : {address.city}</Text>
              <Text>State : {address.state}</Text>
              <Text>Country : {address.country}</Text>

              <Box mt={4}>
                <Button colorScheme="blue" size="md" mr={4} 
                onClick={bookProduct}
                >
                  Book
                </Button>
                <Button colorScheme="red" size="md" mr={4} onClick={()=>nav("/dashboard")}>
                  Cancel
                </Button>
              </Box>
            </Box>
          </Box>
        </>
      )}
      </Box>
  )
}

export default BookPage
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



    // const bookProduct = async() => {
    //   const tocken = localStorage.getItem("shoetocken")
    //     let options1 = {
    //       url:"https://shoe-ecommerce-website.herokuapp.com/user/purchase",
    //       headers:{
    //         "content-type":"application/json",
    //         Authorization:`Bearer ${tocken}`,
    //         value:"user"
    //       },
    //       data:selectedProduct,
    //       method:"POST"
    //     }
        
        
        
    //     let options2 = {
    //       url:"https://shoe-ecommerce-website.herokuapp.com/fetch/updateProduct",
    //       headers:{
    //         "content-type":"application/json",
    //         Authorization:`Bearer ${tocken}`,
    //         value:"user"
    //       },
    //       data:{
    //         _id:selectedProduct._id,
    //         shoe_available:selectedProduct.shoe_available
    //       },
    //       method:"POST"
    //     }

    //     let filterItems

    //     try{
    //       let response = await axios(options1)
    //       console.log(response)
    //       if(response.data.message == "SuccessFully Updated"){
    //          filterItems = cartItem.filter(list => list._id != selectedProduct._id)
    //          toast({
    //           title:"Payment SuccessFull",
    //           position:"bottom",
    //           duration:5000,
    //           isClosable:true,
    //           status:"success"
    //         })
    //       }else{
    //         toast({
    //           title:"Unable to Purchase the Product",
    //           position:"bottom",
    //           duration:5000,
    //           isClosable:true,
    //           status:"error"
    //         })
    //       }
    //     }catch(error){
    //       toast({
    //         title:"Unable to Purchase the Product",
    //         position:"bottom",
    //         duration:5000,
    //         isClosable:true,
    //         status:"error"
    //       })
    //     }


    //       // update product quantity in the database
    //       try{
    //         let response = await axios(options2)
    //         console.log(response.data)
    //       }catch(error){
    //         toast({
    //           title:"Unable To Update Product Quantity",
    //           duration:5000,
    //           position:"bottom",
    //           status:"error",
    //           isClosable:true
    //         })
    //       }
        
    //       // setcartItem(filterItems)
    //       setselectedProduct("")
    //       setAddress("")
    //       nav("/dashboard")

    // }


    const initPayment = (data) => {
      const options = {
        key: "rzp_test_WDciMXfQmSouR9",
        amount: data.amount,
        currency: data.currency,
        name: selectedProduct.shoeName,
        description: "Test Transaction",
        image: selectedProduct.shoewImage,
        order_id: data.id,
        handler: async (response) => {
          try {
            let userlist = JSON.parse(localStorage.getItem("shoeDetails"))
            const serverData = {
              response,
              userProduct:selectedProduct,
              updateProduct:{
                _id:selectedProduct._id,
                shoe_available:selectedProduct.shoe_available
              },
              user_id:userlist._id
            }
            const verifyUrl = "https://shoe-ecommerce-website.herokuapp.com/api/payment/verify";
            const { data } = await axios.post(verifyUrl, serverData);
            if(data.message == "Payment verified successfully"){
              toast({
                title:"Product purchase successfull",
                duration:4000,
                status:"success",
                isClosable:true,
                position:"bottom"
              })
              nav("/dashboard")
              // const removeFromCart = async () => {
              //   const tocken = localStorage.getItem("shoetocken")
              //   let options = {
              //     url:`https://shoe-ecommerce-website.herokuapp.com/user/removeCartItem/${selectedProduct._id}`,
              //     headers:{
              //       "contnet-type":"application/json",
              //       Authorization:`Bearer ${tocken}`,
              //       value:"user"
              //     },
              //     method:"PUT",
              //   }
                
                
              //   try{
              //     let response = await axios(options)
              //     console.log(response)
              //   }catch(err){
              //     console.log(err)
              //   }
              // }


              // removeFromCart()
            }else{
              toast({
                title:"Unable To Purchase The Product Try Again",
                duration:4000,
                status:"error",
                isClosable:true,
                position:"bottom"
              })
              nav("/dashboard")
            }
          } catch (error) {
            console.log(error);
            nav("/dashboard")
          }
        },
        theme: {
          color: "#3399cc",
        },
      };
      const rzp1 = new window.Razorpay(options);
      rzp1.open();
    };
  
    const handlePayment = async () => {
      try {
        const orderUrl = "https://shoe-ecommerce-website.herokuapp.com/api/payment/orders";
        // const orderUrl = "https://shoe-ecommerce-website.herokuapp.com/api/payment/orders";
        const { data } = await axios.post(orderUrl, { amount: selectedProduct.shoePrice * selectedProduct.qty });
        initPayment(data.data);
      } catch (error) {
        console.log(error);
      }
    };



    const DoubleBook = () => {
      // bookProduct()
      handlePayment()
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
            display={"flex"}
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
              display={"flex"}
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
                onClick={DoubleBook}
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
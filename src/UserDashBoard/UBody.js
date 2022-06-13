import { Box, Button, Image, Text, useToast } from "@chakra-ui/react";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { MainContext } from "../context/context";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useNavigate } from "react-router-dom";



const UBody = () => {
    const toast = useToast()
    const nav = useNavigate()
    const [products,setproducts] = useState("")

    const {tocken, cartItem, setcartItem, setselectedProduct, settocken} = useContext(MainContext)

    const fetchAllProducts = async () => {
        const tocken = localStorage.getItem("shoetocken")
        settocken(tocken)
        let options = {
            url:"https://shoe-app-back-end-2022.herokuapp.com/fetch",
            headers:{
                "content-type":"application/json",
                Authorization:`Bearer ${tocken}`
            },
            method:"GET",
        }

        try{
          console.log(options)
            let response = await axios(options)
            console.log(response.data)
            let filterProducts = response.data.result.filter(list => list.shoe_available != 0)
            setproducts(filterProducts)
        }catch(error){
            toast({
                title:"Unable to Get the Details",
                duration:5000,
                position:"bottom",
                status:"error",
                isClosable:true
            })
        }
    }

    useEffect(() => {
        fetchAllProducts()
    },[])


    const cartProduct = (item) => {
        let value = cartItem.filter(list => list._id == item._id)
        console.log("value",value)
        if(value.length){
            return ;
        }else{
            setcartItem([...cartItem,item])
        } 
        
}

  const userPaymentPage = (item) => {
    setselectedProduct(item)
    nav("/userPayment")
  }


  return (
    <Box>
      <Box display='flex' justifyContent='space-between' p='3px'>
        <Button colorScheme="teal" size="md" width='33%'>
          Home
        </Button>
        <Button colorScheme="teal" size="md" width='33%' onClick={()=> nav("/cart")}>
          Cart
        </Button>
        <Button colorScheme="teal" size="md" width='33%' onClick={() => nav("/myOrdres")}>
          Orders
        </Button>
      </Box>
      <Box 
      d="flex"
      alignItems={"center"}
      justifyContent="space-evenly"
      mt={8}
      flexWrap="wrap"
      rowGap={10}
      >
            {
                products !="" ? 
                products.map((item,index) => {
                    return <Box key={index}
                    d="flex"
                    flexDir={"column"}
                    alignItems="flex-start"
                    justifyContent={"space-between"}
                    // border="2px solid black"
                    padding={"15px"}
                    boxShadow="0px 1px 11px 11px #C8C0BE"
                    bg={"#F0F9D1"}
                    // onClick={()=>userPaymentPage(item)}
                    >
                      <Image src={`${item.shoewImage}`} alt='Shoe Image' 
                      maxW={"400px"} 
                      maxHeight={"300px"}
                      minW={"400px"} 
                      minHeight={"300px"}
                      
                      />
                      <Box
                      mt={"4"}
                      d="flex"
                      flexDirection={"column"}
                      alignItems={"flex-start"}
                      justifyContent="space-around"
    
                      >
                        <Text>
                          Name : {item.shoeName}
                        </Text>
                        <Text>
                          Company Name : {item.shoeCompany}
                        </Text>
                        <Text>
                          Price : {item.shoePrice}
                        </Text>
                        <Text>
                          Qty Available : {item.shoe_available}
                        </Text>
                        <Box
                        d="flex"
                        flexDir={"row"}
                        alignItems="center"
                        justifyContent={"flex-start"}
                        mt="12px"
                        onClick={()=>cartProduct(item)}
                        _hover={{
                          cursor:"pointer"
                        }}
                        >
                        <Text mr="12px">Add To Cart</Text>
                        <ShoppingCartIcon />
                            </Box>
                      </Box>
                    </Box>
                })
                : <Text>
                    No Products To display
                </Text>
            }

      </Box>
    </Box>
  );
};

export default UBody

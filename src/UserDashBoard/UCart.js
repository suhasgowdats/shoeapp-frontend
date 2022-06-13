import React, { useContext } from "react";
import { Box, Button, Image, Text } from "@chakra-ui/react";
import UHeader from "./UHeader";
import { MainContext } from "../context/context";
import { useNavigate } from "react-router-dom";

const UCart = () => {


  const { cartItem, setcartItem, selectedProduct, setselectedProduct } = useContext(MainContext);
  const nav = useNavigate()


  const removeFromCart = (product) => {
    let filterProducts = cartItem.filter(list => list._id != product._id)
    setcartItem(filterProducts)
  } 

  return (
    <Box>
      <UHeader>
        <Button colorScheme="teal" size="md">
          Home
        </Button>
      </UHeader>

      <Box>
        {cartItem.length ? (
          cartItem.map((item, index) => {
            return (
              <Box
                key={index}
                d="flex"
                flexDir={"row"}
                alignItems="flex-start"
                justifyContent={"flex-start"}
                fontSize={25}
                // border="2px solid black"
                padding={"15px"}
                boxShadow="0px 1px 11px 11px #C8C0BE"
                bg={"#F0F9D1"}
                mt={10}
                mb={10}
                mr={10}
                ml={10}
              >
                <Image
                  src={`${item.shoewImage}`}
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
                  <Text>Name : {item.shoeName}</Text>
                  <Text>Company Name : {item.shoeCompany}</Text>
                  <Text>Price : {item.shoePrice}</Text>
                  <Text>Qty Available : {item.shoe_available}</Text>
                  <Box
                  mt={4}
                  >
                    <Button colorScheme="blue" size="md" mr={4}
                    onClick={()=>{nav(`/userPayment`); setselectedProduct(item) }}
                    >
                      Book Now
                    </Button>
                    <Button colorScheme="red" size="md"
                    onClick={() => removeFromCart(item)}
                    >
                      Remove
                    </Button>
                  </Box>
                </Box>
              </Box>
            );
          })
        ) : (
          <Text
          fontSize={50}
          textAlign={"center"}
          mt={40}
          >
            Add Items To Display
          </Text>
        )}
      </Box>
    </Box>
  );
};

export default UCart;

import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Image,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Input,
  useToast,
} from "@chakra-ui/react";

import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MainContext } from "../context/context";
import UHeader from "./UHeader";

const UPaymentPage = () => {
  const nav = useNavigate()
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { selectedProduct, setselectedProduct } = useContext(MainContext);
  const [amount, setamount] = useState(0)
  const [addressList, setaddressList] = useState({
    country: "",
    city: "",
    landmark: "",
    street: "",
    state: "",
  });

  const { address, setAddress } = useContext(MainContext);

  const TotalAmount = (e) => {
    // if(amount < e){
    //   setselectedProduct({...selectedProduct, qty: e,total_price:e*selectedProduct.shoePrice,shoe_available:selectedProduct.shoe_available-1})
    // }else{
    //   setselectedProduct({...selectedProduct, qty: e,total_price:e*selectedProduct.shoePrice,shoe_available:selectedProduct.shoe_available+1})
    // }
    setamount(e)
  };

  const AddressInputHandler = (e) => {
    setaddressList({ ...addressList, [e.target.name]: e.target.value });
  };

  const AddressFunction = () => {
    

    if (
      addressList.country == "" ||
      addressList.state == "" ||
      addressList.street == "" ||
      addressList.landmark == "" ||
      addressList.city == ""
    ) {
      toast({
        title: "Please Fill All The Fields",
        position: "bottom",
        duration: 5000,
        status: "error",
        isClosable: true,
      });

      return;
    }
      setselectedProduct({...selectedProduct, qty: amount,total_price:amount*selectedProduct.shoePrice,shoe_available:selectedProduct.shoe_available-amount})
    setAddress(addressList);
    onClose();
    nav("/bookproduct")
  };



  const FillAddressFunction = () => {
    if(amount == 0){
      toast({
        title:"Select Atleast One Product",
        duration:5000,
        position:"bottom",
        isClosable:true,
        status:"error"
      })

      return ;
    }
    onOpen()
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
              <Text>Price : {selectedProduct.shoePrice}</Text>
              <Text>Qty Available : {selectedProduct.shoe_available}</Text>
              <FormControl mt={4}>
                <FormLabel htmlFor="amount">Amount</FormLabel>
                <NumberInput
                  max={selectedProduct.shoe_available}
                  min={1}
                  value={amount}
                  onChange={(e) => TotalAmount(e)}
                  name="amount"
                >
                  <NumberInputField id="amount" />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
              </FormControl>
              <Box mt={4}>
                <Button colorScheme="blue" size="md" mr={4} onClick={FillAddressFunction}>
                  Address
                </Button>
              </Box>
            </Box>
          </Box>
          <Text ml={10} fontSize={40}>
            {selectedProduct.shoetitle}
          </Text>
          <Text ml={10} fontSize={30}>
            {selectedProduct.shoeDescription}
          </Text>
        </>
      )}

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader textAlign={"center"} fontSize={30}>
            Add Address
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            Street :{" "}
            <Input
              placeholder="PLease Enter Street"
              size="md"
              name="street"
              onChange={AddressInputHandler}
              value={addressList.street}
            />
            <br />
            <br />
            LandMark :{" "}
            <Input
              placeholder="PLease Enter LandMark"
              size="md"
              name="landmark"
              value={addressList.landmark}
              onChange={AddressInputHandler}
            />
            <br />
            <br />
            City :{" "}
            <Input
              placeholder="PLease Enter City"
              size="md"
              name="city"
              value={addressList.city}
              onChange={AddressInputHandler}
            />
            <br />
            <br />
            State :{" "}
            <Input
              placeholder="PLease Enter State"
              size="md"
              name="state"
              value={addressList.state}
              onChange={AddressInputHandler}
            />
            <br />
            <br />
            Country :{" "}
            <Input
              placeholder="PLease Enter Country"
              size="md"
              name="country"
              value={addressList.country}
              onChange={AddressInputHandler}
            />
            <br />
            <br />
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={AddressFunction}>
              Book Now
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default UPaymentPage;

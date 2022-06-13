import { Box, Button, Image, list, Text, useToast } from "@chakra-ui/react";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MainContext } from "../../context/context";
import Rating from '@mui/material/Rating';
import { Typography } from "@mui/material";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";


const AdminBody = () => {
  const nav = useNavigate();

  const toast = useToast();
  const [data,setdata] = useState([])

  const { tocken } = useContext(MainContext);

  const fetchAllProducts = async () => {
    let options = {
      url: "https://shoe-app-back-end-2022.herokuapp.com/fetch",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${tocken}`,
      },
      method: "GET",
    };

    try {
      let response = await axios(options);
      console.log(response.data);
      setdata(response.data.result)
    } catch (error) {
      toast({
        title: "Unable to Display Product",
        duration: 5000,
        position: "bottom",
        status: "error",
        isClosable: true,
      });
    }
  };

  useEffect(() => {
    fetchAllProducts();
  }, []);

  const editProductDetails = (item) => {
    nav(`/editproduct/${item._id}`)
}


  const deleteProductdetails = async (item) => {

    let options = {
      url:`https://shoe-app-back-end-2022.herokuapp.com/fetch/deleteProduct/${item._id}`,
      method:"DELETE",
      headers:{
        "content-type":"application/json",
        Authorization:`Bearer ${tocken}`
      },
    }

    try{
      let response = await axios(options)
      console.log(response.data)
      fetchAllProducts()
    }catch(error){
      toast({
        title:"unable to Delete The Details",
        duration:5000,
        position:"bottom",
        isClosable:true,
        status:"error"
      })
    }

  }


  return (
    <Box>
      <Box p='10px'>
      <Button
        colorScheme="teal"
        size="md"
        onClick={() => nav("/AdminDashboard")}
        p='2'
        width='32%'
      >
        Home
      </Button>
      <Button
        colorScheme="teal"
        size="md"
        onClick={() => nav("/AdminProductAdd")}
        p='2'
        m='2'
        width='32%'
      >
        Add Product
      </Button>
      <Button colorScheme="teal" size="md"
      p='2'
      m='2'
      width='32%'
      onClick={()=>nav("/FullUsers")}
      >
        Users
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
          data ? 
        <>
        
            {
              data.map((item,index) => {
                return  <Box key={index}
                d="flex"
                flexDir={"column"}
                alignItems="flex-start"
                justifyContent={"space-between"}
                border="2px solid black"
                padding={"15px"}
                boxShadow="0px 1px 11px 11px #C8C0BE"
                bg={"#F0F9D1"}
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
                    mt={4}
                    d="flex"
                    flexDir={"row"}
                    justifyContent="center"
                    >
                    <EditIcon fontSize={30} mr={5} onClick={() => editProductDetails(item)}/>
                    <DeleteIcon fontSize={30} onClick={()=>deleteProductdetails(item)}/>
                    </Box>
                  </Box>
                </Box>
              })
            }
        </>
          : <h1>No Data to Display</h1>
        }
        </Box>
    </Box>
  );
};

export default AdminBody;

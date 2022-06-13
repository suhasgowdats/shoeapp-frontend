import { Box, Image, Text, useCounter, useToast } from "@chakra-ui/react";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import Header from "../AdminDashBoard/AdComponents/Header";
import { MainContext } from "../context/context";
import UHeader from "./UHeader";

const MyOrdresPgae = () => {
  const toast = useToast();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const { tocken } = useContext(MainContext);

  const fetchUserOrders = async () => {
    let options = {
      url: "https://shoe-app-back-end-2022.herokuapp.com/user/userOrdres",
      methos: "GET",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${tocken}`,
        value: "user",
      },
    };

    try {
      let response = await axios(options);
      setData(response.data.result.orders);
      setLoading(false)
    } catch (error) {
      toast({
        title: "Unable To Get The Data",
        duration: 4000,
        isClosable: true,
        position: "bottom",
        status: "error",
      });
    }
  };

  useEffect(() => {
    fetchUserOrders();
  }, []);
  return (
    <Box>
      <UHeader>
        <button>Home</button>
      </UHeader>
      <Box>{loading ? <Text>No Data To Display</Text> : 
      data.length == 0 ? <Text>No Items Purchased</Text>
      :  <Box
      d="flex"
      flexDirection={"column"}
      rowGap={5}
      >
        {
          data.map((item, index) => {
            return <Box
            d="flex"
            flexDirection={"row"}
            border={"2px solid black"}
            justifyContent={"flex-start"}
            ml={"5%"}
            mr={"5%"}
            mt={"2%"}
            mb={"2%"}
            p={10}
            boxShadow={"dark-lg"}
            >
              <Image boxSize='200px' src={item.shoewImage} alt='Shoe Image' mr={"5%"}/>
              <Box
              d="flex"
              flexDirection={"column"}
              alignItems={"flex-start"}
              rowGap={5}
              fontSize={30}
              >
                <Text>Shoe Name : {item.shoeName}</Text>
                <Text>Shoe Quantity : {item.qty}</Text>
                <Text>Toatl Amount : {item.total_price}</Text>
                </Box>
            </Box>
          })
        }
      </Box>
      }
      </Box>
    </Box>
  );
};

export default MyOrdresPgae;

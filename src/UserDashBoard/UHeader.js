import {
  Avatar,
  Box,
  Button,
  Image,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import React from "react";
import ShoeLogo from "../images/ShoeLogo.jpg";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";
import UProfileModel from "./UProfileModel";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';


const UHeader = ({ children }) => {
  const nav = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const logOutFunction = () => {
    localStorage.removeItem("shoeDetails");
    localStorage.removeItem("shoetocken");
    nav("/");
  };

  return (
    <>
      <Box
        bg="teal"
        w="100%"
        p={4}
        color="black"
        d="flex"
        flexDir={"row"}
        alignItems="center"
        justifyContent={"space-between"}
      >
        <Image boxSize="50px" src={ShoeLogo} alt="Dan Abramov" />
        <Text fontSize='4xl'>SHOE SHOP</Text>
        <Box
          bg="white"
          w="fit-content"
          p={4}
          color="black"
          d="flex"
          flexDir={"row"}
          alignItems={"center"}
          justifyContent="center"
        >
          {children ? (
            <Button
              colorScheme="teal"
              size="md"
              mr={3}
              onClick={() => nav("/dashboard")}
            >
              Home
            </Button>
          ) : null}
         
          
          <Menu>
            <MenuButton rightIcon={<ChevronDownIcon />}>
              <Avatar
                name="Kola Tioluwani"
                src="https://bit.ly/tioluwani-kolawole"
              />
            </MenuButton>
            <MenuList>
              <UProfileModel>
                <MenuItem>Profile</MenuItem>
              </UProfileModel>
              <MenuItem onClick={logOutFunction}>LogOut</MenuItem>
            </MenuList>
          </Menu>
        </Box>
      </Box>
    </>
  );
};



export default UHeader;

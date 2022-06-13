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
    useDisclosure,
  } from "@chakra-ui/react";
  import React from "react";
  import ShoeLogo from "../../images/ShoeLogo.jpg";
  import { ChevronDownIcon } from "@chakra-ui/icons";
  import { useNavigate } from "react-router-dom";
  import ADProfileModal from "./ADProfileModal";
  
  const Header = ({children}) => {
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
          bg="tomato"
          w="100%"
          p={4}
          color="black"
          d="flex"
          flexDir={"row"}
          alignItems="center"
          justifyContent={"space-between"}
        >
          <Image boxSize="50px" src={ShoeLogo} alt="Dan Abramov" />
          <Box bg="white" w="fit-content" p={4} color="black"
          d="flex"
          flexDir={"row"}
          alignItems={"center"}
          justifyContent="center"
          >
            {
              children ?  <Button colorScheme='teal' size='md'  mr={3} onClick={()=>nav("/dashboard")}>
              Home
            </Button>
            : null
            }
            <Menu>
              <MenuButton rightIcon={<ChevronDownIcon />}>
                <Avatar
                  name="Kola Tioluwani"
                  src="https://bit.ly/tioluwani-kolawole"
                />
              </MenuButton>
              <MenuList>
                  <ADProfileModal>
                  <MenuItem>Profile</MenuItem>
  
                  </ADProfileModal>
                <MenuItem onClick={logOutFunction}>LogOut</MenuItem>
              </MenuList>
            </Menu>
            
          </Box>
        </Box>
       
      </>
    );
  };
  
  export default Header;
  
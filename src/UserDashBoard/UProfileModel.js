import {
  Button,
  Image,
  MenuItem,
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
import React, { useContext } from "react";
import { MainContext } from "../context/context";

const UProfileModel = ({ children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  let user = JSON.parse(localStorage.getItem("shoeDetails"))
  return (
    <div>
      {children ? <MenuItem onClick={onOpen}>Profile</MenuItem> : null}

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader
          d="flex"
          alignItems={"center"}
          justifyContent="center"
          fontSize={"40px"}
          >
            <Text>{user.name}</Text>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody
          d="flex"
          flexDir={"column"}
          alignItems="center"
          justifyContent={"center"}
          >
            <Image
              borderRadius="full"
              boxSize="150px"
              src={user.pic}
              alt="user pic"
            />
            <Text>{user.email}</Text>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default UProfileModel;

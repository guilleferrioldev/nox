import { Avatar, Box, Flex, Icon, Input, InputGroup, InputRightElement } from "@chakra-ui/react"
import { IoIosSearch } from "react-icons/io"
import { IoSettingsOutline } from "react-icons/io5";
import { TfiWorld } from "react-icons/tfi";

export const Header = () => {
    return (
      <Flex 
        w="full" 
        h="full"
        padding={4}
        gap={3}
        alignItems="center"
        justifyContent="end" 
      >
        <InputGroup size="md" 
          maxW="300px" 
          borderRadius="20px" 
        >
          <InputRightElement>
            <Icon as={IoIosSearch} size="sm" />
          </InputRightElement>
          <Input
            placeholder="Find Cliente"
            width="100%" 
            borderRadius="20px"
            _focus={{
              borderRadius: "20px", 
              boxShadow: "none", 
            }}
          />
        </InputGroup>
        <Box
            rounded="full"
            bg="gray.100"
            p={2}
            w={8}
            h={8}
        >
            <Icon as={TfiWorld} 
                  size="sm" 
                  display="flex"
                  alignItems="center"
                  justifyContent="center"/>
        </Box>

        <Box
            rounded="full"
            bg="gray.100"
            p={2}
            w={8}
            h={8}
        >
            <Icon as={IoSettingsOutline} 
                size="md" 
                display="flex"
                alignItems="center"
                justifyContent="center"/>
        </Box>
        <Avatar name='Dan Abrahmov' src='https://bit.ly/dan-abramov' size='sm'/>
      </Flex>
    );
  };
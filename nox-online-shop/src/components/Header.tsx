"use client"

import { useDetails } from "@/context";
import { ChevronRightIcon } from "@chakra-ui/icons";
import { Avatar, Box, Breadcrumb, BreadcrumbItem, BreadcrumbLink, Flex, Icon, Input, InputGroup, InputRightElement } from "@chakra-ui/react"
import { IoIosSearch } from "react-icons/io"
import { IoSettingsOutline } from "react-icons/io5";
import { TfiWorld } from "react-icons/tfi";

export const Header = () => {
    const { isDetails, toggleDetails} = useDetails();

    return (
      <Flex 
        w="full" 
        h="full"
        padding={4}
        alignItems="center"
        justifyContent="space-between" 
      >
        <Flex 
          w="20%"
        >
          <Breadcrumb spacing='8px' separator={<ChevronRightIcon color='#2D3748' />}>
            <BreadcrumbItem>
             <BreadcrumbLink color="#718096">Orders</BreadcrumbLink>
            </BreadcrumbItem>

            <BreadcrumbItem>
              <BreadcrumbLink color='#2D3748' onClick={isDetails ? toggleDetails: () => {}}>Orders</BreadcrumbLink>
          </BreadcrumbItem>
          {isDetails &&
            <BreadcrumbItem>
              <BreadcrumbLink color='#2D3748'>Details</BreadcrumbLink>
          </BreadcrumbItem>
          }
        </Breadcrumb>
        </Flex>
        
        <Flex
          w="80%"
          justifyContent="end" 
          gap={3}
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
            bg="#EDF2F7"
            p={2}
            w={8}
            h={8}
        >
            <Icon as={TfiWorld} 
                  size="sm" 
                  color="#68CCE0"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"/>
        </Box>

        <Box
            rounded="full"
            bg="#EDF2F7"
            p={2}
            w={8}
            h={8}
        >
            <Icon as={IoSettingsOutline} 
                size="md" 
                display="flex"
                color="#718EBF"
                alignItems="center"
                justifyContent="center"/>
        </Box>
        <Avatar name='Dan Abrahmov' src='https://bit.ly/dan-abramov' size='sm'/>
        </Flex>
      </Flex>
    );
  };
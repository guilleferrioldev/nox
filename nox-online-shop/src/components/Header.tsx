"use client";

import { useDetails } from "@/context";
import { ChevronRightIcon } from "@chakra-ui/icons";
import { Avatar, Box, Breadcrumb, BreadcrumbItem, BreadcrumbLink, Flex, Icon, Input, InputGroup, InputRightElement, useBreakpointValue } from "@chakra-ui/react";
import { IoIosSearch } from "react-icons/io";
import { IoSettingsOutline } from "react-icons/io5";
import { TfiWorld } from "react-icons/tfi";

export const Header = () => {
  const { isDetails, toggleDetails } = useDetails();

  const isMobile = useBreakpointValue({ base: true, md: false });

  return (
    <Flex
      w="full"
      h={{ base: "120px", md: "60px" }}
      padding={4}
      alignItems="center"
      justifyContent="space-between"
      direction={isMobile ? "column" : "row"} 
      gap={isMobile ? 4 : 0} 
    >
      <Flex
        w={isMobile ? "full" : "20%"} 
        alignItems="center"
        justifyContent={isMobile ? "end" : "start"} 
        gap={isMobile ? "10px" : ""}
      >
        <Breadcrumb spacing="8px" separator={<ChevronRightIcon color="#2D3748" />}>
          <BreadcrumbItem>
            <BreadcrumbLink color="#718096">Orders</BreadcrumbLink>
          </BreadcrumbItem>

          <BreadcrumbItem>
            <BreadcrumbLink
              color="#2D3748"
              onClick={isDetails ? toggleDetails : () => {}}
            >
              Orders
            </BreadcrumbLink>
          </BreadcrumbItem>

          {isDetails && (
            <BreadcrumbItem>
              <BreadcrumbLink color="#2D3748">Details</BreadcrumbLink>
            </BreadcrumbItem>
          )}
        </Breadcrumb>

        {isMobile && (
          <Flex gap={3}>
            <Box rounded="full" bg="#EDF2F7" p={2} w={8} h={8}>
              <Icon
                as={TfiWorld}
                size="sm"
                color="#68CCE0"
                display="flex"
                alignItems="center"
                justifyContent="center"
              />
            </Box>

            <Box rounded="full" bg="#EDF2F7" p={2} w={8} h={8}>
              <Icon
                as={IoSettingsOutline}
                size="md"
                display="flex"
                color="#718EBF"
                alignItems="center"
                justifyContent="center"
              />
            </Box>

            <Avatar
              name="Dan Abrahmov"
              src="https://bit.ly/dan-abramov"
              size="sm"
            />
          </Flex>
        )}
      </Flex>
      
      <Flex
        w={isMobile ? "full" : "80%"}
        justifyContent={isMobile ? "start" : "end"}
        alignItems={isMobile ? "flex-start" : "center"}
        direction={isMobile ? "column" : "row"} 
        gap={3}
      >
        {!isMobile && (
          <>
            <Box rounded="full" bg="#EDF2F7" p={2} w={8} h={8}>
              <Icon
                as={TfiWorld}
                size="sm"
                color="#68CCE0"
                display="flex"
                alignItems="center"
                justifyContent="center"
              />
            </Box>

            <Box rounded="full" bg="#EDF2F7" p={2} w={8} h={8}>
              <Icon
                as={IoSettingsOutline}
                size="md"
                display="flex"
                color="#718EBF"
                alignItems="center"
                justifyContent="center"
              />
            </Box>

            <Avatar
              name="Dan Abrahmov"
              src="https://bit.ly/dan-abramov"
              size="sm"
            />
          </>
        )}

        <InputGroup
          size="md"
          maxW="300px"
          borderRadius="20px"
          w={isMobile ? "full" : "auto"}
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
      </Flex>
    </Flex>
  );
};

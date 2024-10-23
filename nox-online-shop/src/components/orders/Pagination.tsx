"use client"

import { Flex, Button, ButtonGroup } from "@chakra-ui/react";
import { ArrowBackIcon, ArrowForwardIcon } from "@chakra-ui/icons";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const Pagination = ({ currentPage, totalPages, onPageChange }: PaginationProps) => {
  return (
    <Flex w="full" h="5%" mt={2} pb={0} justifyContent="space-between" position="relative" bottom="0px">
        <Button
          bg="#FFFFFF"
          color="#FF7500"
          onClick={() => onPageChange(currentPage - 1)}
          isDisabled={currentPage === 1}
          leftIcon={<ArrowBackIcon />}
        >
          Previous
        </Button>

        <ButtonGroup display={{ base: 'none', md: 'flex' }}>
          {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
            <Button
              key={page}
              onClick={() => onPageChange(page)}
              variant="solid"
              bg={page === currentPage ? "#FF7500" : "#FFFFFF"} 
              color={page === currentPage ? "#FFFFFF" : "#FF7500"} 
            >
              {page}
            </Button>
          ))}
        </ButtonGroup>

        <Button
          bg="#FFFFFF"
          color="#FF7500"
          onClick={() => onPageChange(currentPage + 1)}
          isDisabled={currentPage === totalPages}
          rightIcon={<ArrowForwardIcon />}
        >
          Next
        </Button>
    </Flex>
  );
};


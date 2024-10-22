import { Flex, Button,  Stack, ButtonGroup } from "@chakra-ui/react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const Pagination = ({ currentPage, totalPages, onPageChange }: PaginationProps) => {
  return (
    <Flex justifyContent="center" mt={4} w="full">
      <Stack direction="row" spacing={4} w="full" justifyContent="space-between" padding={4}>
        <Button
          onClick={() => onPageChange(currentPage - 1)}
          isDisabled={currentPage === 1}
        >
          Previous
        </Button>

        <ButtonGroup>
        {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
          <Button
            key={page}
            onClick={() => onPageChange(page)}
            variant={page === currentPage ? "solid" : "outline"}
          >
            {page}
          </Button>
        ))}
        </ButtonGroup>

        <Button
          onClick={() => onPageChange(currentPage + 1)}
          isDisabled={currentPage === totalPages}
        >
          Next
        </Button>
      </Stack>
    </Flex>
  );
};
import React from 'react';
import { Box, Table, Thead, Tbody, Tr, Th, Td, Badge } from '@chakra-ui/react';
import { colorScheme, colorText, Status } from '@/types';

interface Column {
  Header: string;
  accessor: string | Status; 
}

interface CustomTableProps {
  data: Array<Record<string, string | number>>; 
  columns: Column[]; 
}

const CustomTable: React.FC<CustomTableProps> = ({ data, columns }) => {
  return (
    <Box overflowX="auto" w="full" p={6} pt={0}>
      <Table variant="striped">
        <Thead>
          <Tr>
            {columns.map((column) => (
              <Th key={column.accessor}>{column.Header}</Th>
            ))}
          </Tr>
        </Thead>
        <Tbody>
            {data.map((row, index) => (
            <Tr key={index}>
              {columns.map((column) => (
                <Td key={column.accessor}>
                  {column.Header === "STATUS" ? (
                    <Badge
                      variant="solid"
                      bg={colorScheme[row[column.accessor] as Status]}
                      color={colorText[row[column.accessor] as Status]}
                    >
                      {row[column.accessor]}
                    </Badge>
                  ) : (
                    row[column.accessor]
                  )}
                </Td>
              ))}
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};

export default CustomTable;

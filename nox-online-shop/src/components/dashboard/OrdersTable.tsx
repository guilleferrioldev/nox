import { colorScheme, colorText, IOrder } from "@/types"
import { Avatar, Badge, Button, Flex, Select, Table, TableContainer, Tbody, Td, Th, Tr } from "@chakra-ui/react";
import { Pagination } from "..";

interface Props {
    orders: IOrder[]
}

export const OrdersTable = ({orders}: Props) => {
    return (
        <Flex
            w="full"
            h="full"
            flexDirection="column" 
            p={6}
            gap={4}
        >

        <Flex
            h="20%"
            flexDirection="column"
            gap={4}
        >
            <Select placeholder='Select option'>
            {Array.from({ length: 10 }, (_, i) => i + 1).map((number) => (
                <option key={number} value={number}>
                    {number}
                </option>
            ))}
            </Select>
            
        </Flex >

        <TableContainer h="80%">
        <Table variant="simple" >
          <thead>
            <tr>
              <Th>ORDER ID</Th>
              <Th>NAME</Th>
              <Th>PRODUCTS</Th>
              <Th>EMAIL/PHONE</Th>
              <Th>STATUS</Th>
              <Th></Th>
            </tr>
          </thead>
          <Tbody>
            {orders.map((order, index) => (
              <Tr key={order.id} bg={index % 2 !== 0 ? "#FFFFFF" : "#EDF2F7"}>
                <Td color="#718096">
                    {order.id}
                </Td>
                <Td color="#718096">
                    <Flex align="center"> 
                        <Avatar name={order.name} src={order.src} size="sm" />
                        <span style={{ marginLeft: "8px" }}> 
                            {order.name}
                        </span>
                    </Flex>
                </Td>
                <Td color="#718096">
                    {order.products.map((product, index) => (
                    <div key={product} style={index !== 0 ? { marginTop: "8px" } : {}}>{product}</div>
                    ))}
                </Td>
                <Td color="#718096">
                    <div> 
                        {order.email}
                    </div>
                    <div style={{ marginTop: "8px" }}> 
                        {order.phone}
                    </div>
                </Td>
                <Td color="#718096">
                    <Badge
                        key={order.status}
                        variant="solid"
                        bg={colorScheme[order.status]}
                        color={colorText[order.status]}
                        >
                        {order.status}
                    </Badge>
                </Td>
                <Td>
                    <Button variant="solid" borderRadius="20px" bg="#FF7500"  color="white" h={7}>
                        Assing
                    </Button>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
        </TableContainer>

        <Pagination
            currentPage={1}
            totalPages={3}
            onPageChange={() => {}}
        />
        </Flex>
      );
}
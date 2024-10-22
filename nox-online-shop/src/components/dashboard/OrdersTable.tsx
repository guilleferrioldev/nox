import { colorScheme, colorText, IOrder } from "@/types"
import { Avatar, Badge, Button, Flex, Table, TableContainer, Tbody, Td, Th, Tr } from "@chakra-ui/react";
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
        <TableContainer>
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
              <Tr key={order.id} bg={index % 2 !== 0 ? "white" : "gray.200"}>
                <Td>{order.id}</Td>
                <Td>
                    <Flex align="center"> 
                        <Avatar name={order.name} src={order.src} size="sm" />
                        <span style={{ marginLeft: "8px" }}> 
                            {order.name}
                        </span>
                    </Flex>
                </Td>
                <Td>
                    {order.products.map((product, index) => (
                    <div key={product} style={index !== 0 ? { marginTop: "8px" } : {}}>{product}</div>
                    ))}
                </Td>
                <Td>
                    <div> 
                        {order.email}
                    </div>
                    <div style={{ marginTop: "8px" }}> 
                        {order.phone}
                    </div>
                </Td>
                <Td>
                    <Badge
                        key={order.status}
                        variant="solid"
                        colorScheme={colorScheme[order.status]}
                        color={colorText[order.status]}
                        >
                        {order.status}
                    </Badge>
                </Td>
                <Td>
                    <Button variant="solid" borderRadius="20px" bg="orange"  color="white" h={7}>
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
            totalPages={2}
            onPageChange={() => {}}
        />
        </Flex>
      );
}
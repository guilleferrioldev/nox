import { colorScheme, colorText, IOrder } from "@/types"
import { Avatar, Badge, Button, Flex, Heading, Input, Select, Table, TableContainer, Tbody, Td, Th, Tr } from "@chakra-ui/react";
import { Pagination } from "..";

interface Props {
    orders: IOrder[]
}

export const OrdersTable = ({orders}: Props) => {
    return (
        <Flex
            w="full"
            h="90%"
            flexDirection="column" 
            p={6}
            gap={4}
            mb={2}
        >
        <Flex
            w="full"
            h="10px"
            mb={3}
            flexDirection="column"
            gap={4}
        >
            <Flex w="full" alignItems="center" justifyContent="space-between">
                <Flex w="40%" h="full" alignItems="center" gap="20px">
                    <Select gap="20px" w="20%" color="#737791">
                        {Array.from({ length: 5 }, (_, i) => i + 1).map((number) => (
                            <option key={number} value={number}>
                                {number}
                            </option>
                        ))}
                    </Select>
                    <Heading w="60%" as="h2" size="sm" color="#737791" fontWeight="medium">
                        Entries per page
                    </Heading>
                </Flex>

                <Flex w="40%" h="full" alignItems="center" gap="20px">
                    <Heading as="h2" size="sm" color="#737791" fontWeight="medium">
                        Search
                    </Heading>
                    <Input/>
                </Flex>
            </Flex>
        </Flex >

        <TableContainer h="80%" mt={2} mb={1}>
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
                <Td color="#718096" fontSize="sm">
                    {order.id}
                </Td>
                <Td color="#718096" fontSize="sm">
                    <Flex align="center"> 
                        <Avatar name={order.name} src={order.src} size="sm" />
                        <span style={{ marginLeft: "8px" }}> 
                            {order.name}
                        </span>
                    </Flex>
                </Td>
                <Td color="#718096" fontSize="sm">
                    {order.products.map((product, index) => (
                    <div key={product} style={index !== 0 ? { marginTop: "8px" } : {}}>{product}</div>
                    ))}
                </Td>
                <Td color="#718096" fontSize="sm">
                    <div> 
                        {order.email}
                    </div>
                    <div style={{ marginTop: "8px" }}> 
                        {order.phone}
                    </div>
                </Td>
                <Td color="#718096" fontSize="sm">
                    <Badge
                        key={order.status}
                        variant="solid"
                        bg={order.status !== "PENDING" ? colorScheme[order.status]: ""}
                        color={colorText[order.status]}
                        >
                        {order.status}
                    </Badge>
                </Td>
                <Td>
                    <Button variant="solid" borderRadius="20px" bg="#FF7500"  color="white" h={7} fontSize="sm">
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
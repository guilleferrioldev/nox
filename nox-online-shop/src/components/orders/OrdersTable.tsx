import { colorScheme, colorText, IOrder } from "@/types"
import { Avatar, Badge, Box, Button, Flex, Heading, Input, Select, Table, Tbody, Td, Th, Tr } from "@chakra-ui/react";
import { Pagination } from "..";

interface Props {
    orders: IOrder[]
}

export const OrdersTable = ({ orders }: Props) => {
    return (
        <Flex
            w="full"
            h="full"
            flexDirection="column"
            p={5}
        >
            <Flex
                w="full"
                flexDirection="column"
                gap={4}
            >
                <Flex w="full" alignItems={{ base: "start", md: "center" }} justifyContent="space-between" flexDirection={{ base: "column", md: "row" }} gap={"10px"} mb={2}>
                    <Flex w="80%" h="full" alignItems="center" gap="20px">
                        <Select gap="20px" w="20%" color="#737791">
                            {Array.from({ length: 5 }, (_, i) => i + 1).map((number) => (
                                <option key={number} value={number}>
                                    {number}
                                </option>
                            ))}
                        </Select>
                        <Heading w="60%" as="h2" size="sm" color="#737791" fontWeight="medium" fontSize="sm">
                            Entries per page
                        </Heading>
                    </Flex>

                    <Flex w="80%" h="full" alignItems="center" gap="20px">
                        <Heading as="h2" size="sm" color="#737791" fontWeight="medium" fontSize="sm">
                            Search
                        </Heading>
                        <Input w={{ base: "60%", md: "80%" }} />
                    </Flex>
                </Flex>
            </Flex>

            <Box overflowX="scroll" w="full" p={6} h="full">
                <Table variant="simple" w="full">
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
                                        bg={order.status !== "PENDING" ? colorScheme[order.status] : ""}
                                        color={colorText[order.status]}
                                    >
                                        {order.status}
                                    </Badge>
                                </Td>
                                <Td>
                                    <Button variant="solid" borderRadius="20px" bg="#FF7500" color="white" h={7} fontSize="sm">
                                        Assign
                                    </Button>
                                </Td>
                            </Tr>
                        ))}
                    </Tbody>
                </Table>
            </Box>

            <Pagination
                currentPage={1}
                totalPages={3}
                onPageChange={() => { }}
            />
        </Flex>
    );
}

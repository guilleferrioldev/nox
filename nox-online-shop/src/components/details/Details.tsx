"use client"

import { useLocation } from "@/context";
import { Grid, GridItem, Stack, Textarea } from "@chakra-ui/react";
import CustomTable from "../ui/CustomTable";
import { MarkerLocation, Status } from "@/types";
import { FlexWrapper, FormDetails } from "..";
import { useMemo } from "react";
import dynamic from "next/dynamic";
import { LatLngExpression } from "leaflet";

const dataProducts = [
  { product: 'OLLA REINA ROYAL 6L', price: 28 },
  { product: 'LICUADORA MILEXUS CON JARRA DE VIDRIO 550W', price: 34 },
];

const columnsProducts = [
  { Header: 'PRODUCT', accessor: 'product' },
  { Header: 'PRICE', accessor: 'price' },
];

const dataStatus = [
  { date: '16/10/2024 10:45:20', status: Status.PENDING },
  { date: '15/10/2024 08:30:13', status: Status.DELIVERED },
];

const columnsStatus = [
  { Header: 'DATE', accessor: 'date' },
  { Header: 'STATUS', accessor: 'status' },
];

export const Details = () => {
  const Mapear = useMemo(() => dynamic(
    async () => (await import("@/components/orders/Map")).default,
    { ssr: false }
  ), []);

  const { location } = useLocation();

  return (
    <Grid
      w="80%" // Use full width
      h="80%"
      templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(6, 1fr)" }} // Responsive columns
      gap={6}
    >
      <GridItem colSpan={{ base: 1, md: 4 }}>
        <FlexWrapper name="Order User" subname="User creating the order">
          <FormDetails />
        </FlexWrapper>
      </GridItem>
      <GridItem colSpan={{ base: 1, md: 2 }}>
        <FlexWrapper name="Shipping Address" subname="Order Shipping Address" buttonName="Assign">
          <Stack w="full" p={{ base: 4, md: 6 }} spacing={1} pt={0}>
            <Mapear posix={location?.position as LatLngExpression} markerLocations={[location as MarkerLocation]} marketsWithButtons={false} height={"200px"} />
            <Textarea placeholder={location?.direction} isDisabled resize="none" color="black" />
          </Stack>
        </FlexWrapper>
      </GridItem>

      <GridItem colSpan={{ base: 1, md: 3 }}>
        <FlexWrapper name="Products" subname="Order products">
          <CustomTable data={dataProducts} columns={columnsProducts} />
        </FlexWrapper>
      </GridItem>
      <GridItem colSpan={{ base: 1, md: 3 }}>
        <FlexWrapper name="Status" subname="Status Orders" buttonName="Change Status">
          <CustomTable data={dataStatus} columns={columnsStatus} />
        </FlexWrapper>
      </GridItem>
    </Grid>
  );
}

import { useLocation } from "@/context";
import { Grid, GridItem} from "@chakra-ui/react";
import CustomTable from "../ui/CustomTable";
import { Status } from "@/types";
import { FlexWrapper, FormDetails } from "..";

const dataProducts = [
  { product: 'OLLA REINA ROYAL 6L', price: 28},
  { product: 'LICUADORA MILEXUS CON JARRA DE VIDRIO 550W', price: 34},
];

const columnsProducts = [
  { Header: 'PRODUCT', accessor: 'product' },
  { Header: 'PRICE', accessor: 'price' },
];


const dataStatus = [
  { date: '16/10/2024 10:45:20', status: Status.PENDING},
  { date: '15/10/2024 08:30:13', status: Status.DELIVERED},
];

const columnsStatus = [
  { Header: 'DATE', accessor: 'date' },
  { Header: 'STATUS', accessor: 'status' },
];



export const Details = () => {
  const { location } = useLocation();

  console.log(location);
  return (
    <Grid
      w="80%"
      h="80%"
      templateColumns="repeat(6, 1fr)"
      gap={6} 
    >
      <GridItem colSpan={4}>
        <FlexWrapper name="Order User" subname="User creating the order" >
          <FormDetails/>
        </FlexWrapper>
      </GridItem>
      <GridItem colSpan={2}>
        <FlexWrapper name="Shipping Address" subname="Order Shipping Address" buttonName="Assign">
          <></>
        </FlexWrapper>
      </GridItem>

      <GridItem colSpan={3}>
        <FlexWrapper name="Products" subname="Order products" >
          <CustomTable data={dataProducts} columns={columnsProducts} />
        </FlexWrapper>
      </GridItem>
      <GridItem colSpan={3}>
        <FlexWrapper name="Status" subname="Status Orders" buttonName="Change Status">
          <CustomTable data={dataStatus} columns={columnsStatus} />
        </FlexWrapper>
      </GridItem>
    </Grid>
  );
}

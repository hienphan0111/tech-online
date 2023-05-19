import {
  TableContainer,
  Stack,
  Spinner,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Table,
  Th,
  Tbody,
  Tr,
  Td,
  Thead,
  Button,
  ListItem,
  UnorderedList,
  Wrap,
  List,
} from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserOrders } from '../redux/actions/userActions';
import { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const YourOrdersPage = () => {
  const dispatch = useDispatch();
  const location = useLocation();

  const user = useSelector(state => state.user);
  const { loading, error, orders, userInfo } = user;

  useEffect(() => {
    if (userInfo) {
      dispatch(getUserOrders());
    }
  }, [dispatch]);

  return (
    userInfo ? (
      <>
      {
        loading ? (
          <Wrap justify="center" direction="column" align="center" mt="20px" minH="100vh" >
            <Stack direction='row' spacing={4}>
              <Spinner mt={20} thickness='2px' speed='0.65s' emptyColor='gray.200' />
            </Stack>
          </Wrap>
        )
        : error ? (
          <Stack direction='row' spacing={4}>
            <Alert status='error'>
              <AlertIcon />
              <AlertTitle>We are sorry!</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          </Stack>)
        : orders && (
          <TableContainer minHeight="100vh">
            <Table variant="striped">
              <Thead>
                <Tr>
                  <Th>Order Id</Th>
                  <Th>Order Date</Th>
                  <Th>Paid total</Th>
                  <Th>Items</Th>
                  <Th>Print Reciept</Th>
                </Tr>
              </Thead>
              <Tbody>
                {orders.map((order) => {
                  <Tr key={order._id}>
                    <Td>{order.id}</Td>
                    <Td>{new Date(order.createdAt).toDateString}</Td>
                    <Td>${order.totalPrice}</Td>
                    <Td>{order.orderItems.map(item => {
                      <UnorderedList key={item._id}>
                        <ListItem>
                          {item.qty} x {item.name} (${item.price})
                        </ListItem>
                      </UnorderedList>
                      })}
                    </Td>
                    <Td variant="outline">
                      <Button>
                        Reciept
                      </Button> 
                    </Td>
                  </Tr>
                  })
                }
              </Tbody>
            </Table>
          </TableContainer>
        )
      }
      </>
    ) : (<Navigate to='login' replace={true} state={{ from: location }} />)
  )
}

export default YourOrdersPage

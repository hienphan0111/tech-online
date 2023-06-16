import {
  Box,
  TableContainer,
  Th,
  Tr,
  Table,
  Td,
  Thead,
  Tbody,
  Button,
  useDisclosure,
  Alert,
  Stack,
  Spinner,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Wrap,
  useToast,
  Flex,
  Text,
} from '@chakra-ui/react';
import { CheckCircleIcon, DeleteIcon } from '@chakra-ui/icons';
import { TbTruckDelivery } from 'react-icons/tb';
import { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllOrders, deleteOrder, setDelivedred, resetErrorAndRemoval } from '../redux/actions/adminActions';
import ConfirmRemovalAlert from './ConfirmRemovalAlert';

const UsersTab = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef();
  const [ orderToDelete, setOrderToDelete ] = useState('');
  const dispatch = useDispatch();
  const admin = useSelector(state => state.admin);

  const { error, loading, orderRemoval, ordersList, deliveredFlag } = admin;
  const toast = useToast();

  console.log(ordersList);
  useEffect(() => {
    dispatch(getAllOrders());
    dispatch(resetErrorAndRemoval());
    if (orderRemoval) {
      toast({ discription: 'Order has been removed', status: 'success', isClosable: true})
    }
    
    if (deliveredFlag) {
      toast({ discription: 'Order has been set to delivered', status: 'success', isClosable: true})
    }
  }, [orderRemoval, dispatch, toast, deliveredFlag]);

  const openDeleteConfirmBox = (order) => {
    setOrderToDelete(order);
    onOpen();
  }

  const onSetToDelivered = (orderId) => {
    dispatch(resetErrorAndRemoval());
    dispatch(setDelivedred(orderId));
  }

  return (
    <Box>
      {
        error && (
          <Alert status="error">
            <AlertIcon />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )
      }
      {
        loading ? (<Wrap justify="center">
          <Stack direction="row" spacing="4">
            <Spinner mt="20" thickness="2px" speed="0.65s" emptyColor="gray.200" color="orange.500" size="xl" />
          </Stack>
        </Wrap>) : (
          <Box>
            <TableContainer>
              <Table variant="simple">
                <Thead>
                  <Tr>
                    <Th>Date</Th>
                    <Th>Name</Th>
                    <Th>Email</Th>
                    <Th>Shipping Info</Th>
                    <Th>Items Ordered</Th>
                    <Th>Payment method</Th>
                    <Th>Shipping Price</Th>
                    <Th>Total</Th>
                    <Th>Delivered</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {
                    ordersList && ordersList.map(({_id, name, createdAt, username, email, shippingAddress, orderItems, paymentMethod, shippingPrice, totalPrice, isDelivered }) => (
                      <Tr key={_id}>
                        <Td>{new Date(createdAt).toDateString()}</Td>
                        <Td>{username}</Td>
                        <Td>{email}</Td>
                        <Td>
                          <Text>
                            <i>Address: {shippingAddress.address}</i>
                          </Text>
                          <Text>
                            <i>City: {shippingAddress.postalCode} {shippingAddress.city}</i>
                          </Text>
                          <Text>
                            <i>Country: {shippingAddress.country}</i>
                          </Text>
                        </Td>
                        <Td>
                          {
                            orderItems.map((item) => (
                              <Text>
                                {item.qty} x {item.name}
                              </Text>
                            ))
                          }
                        </Td>
                        <Td>{paymentMethod}</Td>
                        <Td>{shippingPrice}</Td>
                        <Td>{totalPrice}</Td>
                        <Td>{isDelivered ? <CheckCircleIcon /> : 'Pending'}</Td>
                        <Td>
                          <Flex direction="column">
                            <Button variant="outline" onClick={() => openDeleteConfirmBox}>
                              <DeleteIcon mr="5px" />
                            </Button>
                            {
                              !isDelivered && (
                                <Button mt="4px" variant="outline" onClick={() => onSetToDelivered(_id)}>
                                  <TbTruckDelivery />
                                  <Text ml="5px">Delivered</Text>
                                </Button>
                              )
                            }
                          </Flex>
                        </Td>
                      </Tr>
                    ))
                  }
                </Tbody>
              </Table>
            </TableContainer>
            <ConfirmRemovalAlert isOpen={isOpen} onOpen={onOpen} onClose={onClose} cancelRef={cancelRef} itemToDelete={orderToDelete} deleteAction={deleteOrder}></ConfirmRemovalAlert>
          </Box>
        )
      } 
    </Box>

  )
}

export default UsersTab;

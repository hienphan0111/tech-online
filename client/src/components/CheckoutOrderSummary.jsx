import { useEffect, useState, useCallback } from 'react';
import {
  Flex,
  Heading,
  Stack,
  Text,
  useColorModeValue as mode,
  Badge,
  Box,
  Link,
  Divider,
  useDisclosure,
} from '@chakra-ui/react';
import { Link as ReactLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { PhoneIcon, EmailIcon, ChatIcon } from '@chakra-ui/icons';
import { createOrder } from '../redux/actions/orderActions.js';
import CheckOutItem from './CheckOutItem.jsx';
import PayPalButton from './PaypalButton.jsx';

const CheckoutOrderSummary = () => {
  const colorMode = mode('gray.600', 'gray.400');
  const cartItems = useSelector((state) => state.cart);
  const { cart, subtotal, expressShipping } = cartItems;

  const user = useSelector((state) => state.user);
  const { userInfo } = user;

  const shippingInfo = useSelector((state) => state.order);
  const { shippingAddress, error } = shippingInfo;

  const [buttonDisable, setButtonDisable] = useState(false);

  const dispatch = useDispatch();

  const shipping = useCallback(
    () => (expressShipping === 'true' ? 14.90 : subtotal <= 1000 ? 4.99 : 0),
    [expressShipping, subtotal]
  );

  const total = useCallback(
    () => Number(shipping() === 0 ? Number(subtotal) : Number(subtotal) + shipping()).toFixed(2),
    [shipping, subtotal]
  );

  const onPaymentError = () => {
    alert('order error');
  }

  const onPaymentSuccess = () => {
    alert('order success');
  }

  return (
    <Stack spacing='8' rounded='xl' padding='8' width='full'>
      <Heading size='md'>
        Order Summary
      </Heading>
      {
        cart.map((item) => <CheckOutItem cartItem={item} key={item.id} />)
      }

      <Stack spacing='6'>
        <Flex justify='space-between'>
          <Text fontWeight='medium' color={colorMode}>
            Subtotal
          </Text>
          <Text fontWeight='medium' color={colorMode}>
            {subtotal}
          </Text>
        </Flex>
        <Flex justify='space-between'>
          <Text fontWeight='medium' color={colorMode}>
            Shipping
          </Text>
          <Text fontWeight='medium' color={colorMode}>
            {
              shipping() === 0 ? (
                <Badge rounded='full' px='2' fontSize='0.8em' colorScheme='green'>Free</Badge>
              ) : (
                `$${shipping()}`
              )
            }
          </Text>
        </Flex>
        <Flex justify='space-between'>
          <Text fontSize='lg' fontWeight='semibold'>
            Total
          </Text>
          <Text fontWeight='extrabold' fontSize='xl'>
            ${Number(total())}
          </Text>
        </Flex>
      </Stack>
      <PayPalButton />
      <Box align='center'>
        <Text fontSize='sm'>Have questions? or need help to complete your order?</Text>
        <Flex justifyContent='center' color={mode('orange.500', 'orange.100')} >
          <Flex align='center' m='4' >
            <ChatIcon />
            <Text m='2'>Live chat</Text>
          </Flex>
          <Flex align='center' m='4' >
            <PhoneIcon />
            <Text m='2' m='4' >Phone</Text>
          </Flex>
          <Flex align='center' m='4'>
            <EmailIcon />
            <Text m='2'>Email</Text>
          </Flex>
        </Flex>
      </Box>
      <Divider bg={mode('gray.400', 'gary.800')} />
      <Flex justifyContent='center' my='6' fontWeight='semibold'>
        <p>or</p>
        <Link as={ReactLink} to='/products' ml='1' >Continue shopping</Link>
      </Flex>
    </Stack>
  )
}

export default CheckoutOrderSummary;

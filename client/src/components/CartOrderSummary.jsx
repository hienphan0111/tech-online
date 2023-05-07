import { Button,Badge, Flex, Heading, Stack, Text, useColorModeValue as mode, Bagde } from'@chakra-ui/react';
import { useState } from 'react';
import { FaArrowRight } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { Link as ReactLink, useNavigate } from 'react-router-dom';
import cart from '../redux/slices/cart';

const CartOrderSummary = () => {
  const [buttonLoading, setButtonLoading] = useState();
  const standardShipping = Number(4.99).toFixed(2);
  const cartItems = useSelector((state) => state.cart);

  const { subTotal } = cartItems;

  const navigate = useNavigate;

  const checkoutHandler = () => {
    setButtonLoading(true);
    navigate('/checkout');

  };

  return (
    <Stack spacing='8' borderWidth='1px' rounded='lg' padding='8' w='full'>
      <Heading size='md' >
        Order Summary
      </Heading>
      <Stack spacing='6'>
        <Flex justify='space-between'>
          <Text fontWeight='medium' color={mode('gray.600', 'gray.400')}>
            Subtotal:
          </Text>
          <Text fontWeight='medium' color={mode('gray.600', 'gray.400')}>
            {subTotal}
          </Text>
        </Flex>
        <Flex justify='space-between'>
          <Text fontWeight='medium' color={mode('gray.600','gray.400')} >
            Shipping
          </Text>
          <Text fontWeight='medium'>
            {
              subTotal <=1000 ? (
                standardShipping
              ) : (
                <Badge rounded='full' px='2' fontSize='0.8em' colorScheme='green'>Free</Badge>
              )
            }
          </Text>
        </Flex>
        <Flex fontSize='lg' fontWeight='semibold' justify='space-between'>
          <Text >Total</Text>
          {
            subTotal <= 1000 ? Number(subTotal) + Number(standardShipping) : subTotal
          }
        </Flex>
      </Stack>
      <Button as={ReactLink} to='/checkout' colorScheme='orange' size='lg' fontSize='md' rightIcon={<FaArrowRight />} isLoading={buttonLoading} onClick={() => checkoutHandler()}>
        Checkout
      </Button>
    </Stack>
  )
}

export default CartOrderSummary;

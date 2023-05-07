import { Box, Flex, Heading, HStack, Link, Stack, useColorModeValue as mode, Spinner, Alert, AlertIcon, AlertTitle, AlertDescription, Wrap } from '@chakra-ui/react';
import { Link as ReactLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import CartItem from '../components/CartItem';
import CartOrderSummary from '../components/CartOrderSummary';

const CartPage = () => {
  const dispatch = useDispatch();

  const { loading, error, cart } = useSelector((state) => state.cart);

  return (
    <Wrap spacing='30px' justify='center' minHeight='100vh'>
      {
        loading ? (
          <Stack direction='row' spacing={4}>
            <Spinner mt={20} thickness='2px' speed='0.65s' emptyColor='gray.200' />
          </Stack>
        )
        : error ? (
          <Stack direction='row' spacing={4}>
            <Alert status='error'>
              <AlertIcon />
              <AlertTitle>We are sorry!</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          </Stack>)
        : cart.length <= 0 ?
        (
          <Alert status='warning'>
            <AlertIcon />
            <AlertTitle>Cart is empty!</AlertTitle>
            <AlertDescription>
              <Link as={ReactLink} to='/products'>Click here to see our products</Link>
            </AlertDescription>
          </Alert>
        )
        : (
          <Box maxW={{ base: '3x1', lg: '7x1' }} mx='auto' px={{ base: '4', md: '8', lg: '12'}} py={{ base: '6', md: '8', lg: '12'}}>
            <Stack direction={{base: 'column', lg: 'row'}} align={{ lg: 'flex-start'}} spacing={{ base: '8', md: '16'}}>
              <Stack spacing={{ base: '8', md: '10'}} flex='2'>
                <Heading fontSize='2x1' fontWeight='extrabold'>
                  Shopping Cart
                </Heading>
                <Stack spacing='6'>
                  {
                    cart.map((cartItem) => 
                      <CartItem key={cartItem.id} cartItem={cartItem} />
                    )
                  }
                </Stack>
              </Stack>
              <Flex direction='column' align='center' flex='1'>
                <CartOrderSummary />
                <HStack mt='6' fontWeight='semibold'>
                  <Link as={ReactLink} to='/products' color={mode('orange', 'white')}>Continue shopping</Link>
                </HStack>
              </Flex>
            </Stack>
          </Box>
        )
      }
    </Wrap>
  )
}

export default CartPage;
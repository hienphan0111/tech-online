import {
  Box,
  Heading,
  Stack,
  Flex,
} from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import CheckoutOrderSummary from '../components/CheckoutOrderSummary';
import ShippingInfomation from '../components/ShippingInfomation';

const CheckoutPage = () => {

  const user = useSelector((state) => state.user);
  const { userInfo } = user;
  const location = useLocation();

  return userInfo ? (
    <Box minH='80vh' maxX={{base: '3xl', lg: '5xl' }} mx='auto' px={{ base: '4', md: '8', lg: '20'}} py={{ base: '4', md: '8', lg: '20'}}>
      <Stack direction = {{ base: 'column', lg: 'row' }} align={{ lg: 'flex-start '}}>
        <Stack spacing={{ base: '8', md: '20' }} flex="1.5" mb={{ base: '12', md: 'none'}}>
          <Heading fontSize='2xl' fontWeight='extrabold'>
            Shipping Infomation
          </Heading>
          <Stack spacing='6'>
            <ShippingInfomation />
          </Stack>
        </Stack>
        <Flex direction='column' align='center' flex='1' spacing="6">
          <CheckoutOrderSummary />
        </Flex>
      </Stack>
    </Box>
  ) : (
    <Navigate to='/login' replace={true} state={{ from: location }} />
  )
}

export default CheckoutPage

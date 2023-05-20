import {
    Flex,
    Circle,
    Box,
    Image,
    Badge,
    useColorModeValue,
    Icon,
    Button,
    Tooltip,
    Stack,
    Link,
    HStack,
    Text,
    useToast
} from '@chakra-ui/react';
import { FiShoppingCart } from 'react-icons/fi';
import { Link as ReactLink } from 'react-router-dom';
import { StarIcon } from '@chakra-ui/icons';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addCartItem } from '../redux/actions/cartActions';
import Rating from './Rating';

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const toast = useToast();

  const cartInfo = useSelector((state) => state.cart);
  const { cart } = cartInfo;

  const addItem = (id) => {
    if (cart.some((cartItem) => cartItem.id === id)) {
      toast({
        description: 'This item already in your card. Go to your cart to change the quantity',
        status: 'error',
        isClosable: true,
    });
    } else {
      dispatch(addCartItem(id, 1));
      toast({description: 'Item has been added', status: 'success', isClosable: true});
    }
  }

  const { _id, isNew, stock, image, name, price, rating, numberOfReviews } = product;
  return (
    <Stack
      p='2'
      spacing='3px'
      bg={useColorModeValue('white', 'gray.800')}
      minW='240px'
      h='450px'
      borderWidth='1px'
      rounded='lg'
      shadow='lg'
      position='relative'
    >
      {isNew && <Circle size='10px' position='absolute' top={2} right={2} bg='green.300' />}
      {(stock <= 0) && <Circle size='10px' position='absolute' top={2} right={2} bg='red.300' />}
      <Image src={image} alt={name} roundedTop='lg' />
      <Box flex='1' maxH='5' alignItems='baseline'>
        {
          stock <=0 && (
            <Badge rounded='full' px='2' fontSize='0.8em' colorScheme='green'>
              Sold out
            </Badge>
          )
        }
        { 
          isNew && (
            <Badge rounded='full' px='2' fontSize='0.8em' colorScheme='green'>
              New product
            </Badge>
          )
        }
      </Box>
      <Flex mt='1' justifyContent='space-between' alignContent='center'>
        <Link as={ReactLink} to={`/product/${_id}`} pt='2' cursor='pointer'>
          <Box fontSize='2x1' fontWeight='semeBold' lineHeight='tight'>
            {name}
          </Box>
        </Link>
      </Flex>
      <Flex justifyContent='space-between' alignContent='center' py='2'>
        <Rating numOfStar={rating} />
      </Flex>
      <Flex justify='space-between' >
        <Box fontSize='2x1' color={useColorModeValue('gray.800', 'white')} pl='2' fontWeight='bold'>
          <Box as='span' color='gray.600' fontSize='lg'>$</Box>
          {price}
        </Box>
        <Tooltip label='Add to cart' bg='white' placement='top' color='gray.800' fontSize='1.2em'>
          <Button variant='ghost' display='flex' isDisabled={stock <= 0} onClick={() => addItem(_id)}>
            <Icon as={FiShoppingCart} h={7} w={7} alignSelf='center' />
          </Button>
        </Tooltip>
      </Flex>
    </Stack>
  );
}

export default ProductCard;

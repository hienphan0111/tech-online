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
    Text
} from '@chakra-ui/react';
import { FiShoppingCart } from 'react-icons/fi';
import { Link as ReactLink } from 'react-router-dom';
import { StarIcon } from '@chakra-ui/icons';
import { useState } from 'react';

const Rating = ({ rating, numReviews }) => {
  const [iconSize, setIconSize] = useState('14px');
  return (
    <Flex justifyContent='space-between'>
      <HStack spacing='2px'>
        <StarIcon size={iconSize} w='14px' color='orange.500' />
        <StarIcon size={iconSize} w='14px' color={rating >= 2 ? 'orange.500' : 'gray.300'} />
        <StarIcon size={iconSize} w='14px' color={rating >= 3 ? 'orange.500' : 'gray.300'} />
        <StarIcon size={iconSize} w='14px' color={rating >= 4 ? 'orange.500' : 'gray.300'} />
        <StarIcon size={iconSize} w='14px' color={rating >= 5 ? 'orange.500' : 'gray.300'} />
      </HStack>
      <Text>{numReviews} {numReviews > 1 ? 'Reviews' : 'Review'}</Text>
    </Flex>
  )
}

const ProductCard = ({ product }) => {
  const { id, isNew, stock, image, name, price, rating, numReviews } = product;
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
              Sold out
            </Badge>
          )
        }
      </Box>
      <Flex mt='1' justifyContent='space-between' alignContent='center'>
        <Link as={ReactLink} to={`/product${id}`} pt='2' cursor='pointer'>
          <Box fontSize='2x1' fontWeight='semeBold' lineHeight='tight'>
            {name}
          </Box>
        </Link>
      </Flex>
      <Flex justifyContent='space-between' alignContent='center' py='2'>
        <Rating rating={rating} numReviews={numReviews} />
      </Flex>
      <Flex justify='space-between' >
        <Box fontSize='2x1' color={useColorModeValue('gray.800', 'white')} pl='2' fontWeight='bold'>
          <Box as='span' color='gray.600' fontSize='lg'>$</Box>
          {price.toFixed(2)}
        </Box>
        <Tooltip label='Add to cart' bg='white' placement='top' color='gray.800' fontSize='1.2em'>
          <Button variant='ghost' display='flex' disable={stock <=0}>
            <Icon as={FiShoppingCart} h={7} w={7} alignSelf='center' />
          </Button>
        </Tooltip>
      </Flex>
    </Stack>
  );
}

export default ProductCard;

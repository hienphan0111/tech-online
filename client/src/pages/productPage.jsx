import { useParams } from 'react-router-dom';
import { Box,
  Image,
  Text,
  Wrap,
  Stack,
  Spinner,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Flex,
  Badge,
  Heading,
  HStack,
  Button,
  SimpleGrid,
  useToast,
  Tooltip,
  Input,
  Textarea,
} from '@chakra-ui/react';
import { MinusIcon, StarIcon, SmallAddIcon } from '@chakra-ui/icons';
import { BiPackage, BiCheckShield, BiSupport, BiPlus } from 'react-icons/bi';
import { useDispatch, useSelector } from 'react-redux';
import { createProductReview, getProduct, resetProductError } from '../redux/actions/productActions';
import { addCartItem } from '../redux/actions/cartActions';
import { useEffect, useState } from 'react';
import Rating from '../components/Rating';

const ProductPage = () => {

  const [amount, setAmount] = useState(0);
  let { id } = useParams();
  const toast = useToast();

  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(1);
  const [title, setTitle] = useState('');
  const [reviewBoxOpen, setReviewBoxOpen] = useState(false);


  const dispatch = useDispatch();

  const productsState = useSelector((state) => state.products);
  const { loading, error, product, reviewSend } = productsState;

  const cartContent = useSelector((state) => state.cart);
  const { cart } = cartContent;

  const user = useSelector(state => state.user );
  const { userInfo } = user;

  useEffect(() => {
    dispatch(getProduct(id));

    if (reviewSend) {
      toast({ description: 'Product review saved', status: 'success', isClosable: true});
      dispatch(resetProductError());
      setReviewBoxOpen(false);
    }
  }, [dispatch, id, cart, reviewSend]);

  const changeAmount = (input) => {
    if (input === 'plus') {
      setAmount(amount + 1);
    }
    if (input === 'minus') {
      setAmount(amount -1 );
    }
  }

  const hasUserReviewed = () => product.reviews.some((item) => item.user === userInfo._id);

  const addItem = () => {
    dispatch(addCartItem(product._id, amount));
    toast({description: 'The product has added successufuly', status: 'success'})
  }

  const onSubmit = () => {
    dispatch(createProductReview(product._id, userInfo._id, comment, rating, title));
  }

  return (
    <Wrap spacing='30px' justify='center' minHeight='100vh'>
      {
        loading ? (
          <Stack direction='row' spacing={4}>
            <Spinner mt={20} thickness='2px' speed='0.66s' emptyColor='gray.200' color='orange.500' size='zl' />
          </Stack>
        ) : error ? (
          <Alert status='error'>
            <AlertIcon />
            <AlertTitle>We are sorry!</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        ) : product && (
          <Box
            maxW={{ base: '3xl', lg: '5xl' }}
            mx='auto'
            px={{ base: '4', md: '8', lg: '12'}}
            py={{ base: '4', md: '8', lg: '12'}}
          >
            <Stack direction={{ base: 'column', lg: 'row', }} align={{ lg: 'flex-start' }}>
              <Stack
                pr={{ base: '0', md: '12' }}
                spacing={{ base: '8', md: '4' }}
                flex='1.5'
                mb={{ base: '12', md: 'none' }}>
                  {
                    product.productIsNew && (
                      <Badge rounded='full' w='40px' fontSize='0.8em' colorScheme='green'>
                        New
                      </Badge>
                    )
                  }
                  <Heading fontSize='2x1' fontWeight='semibold'>
                    {product.name}
                  </Heading>
                  <Stack spacing='5'>
                    <Box>
                      <Text fontSize='xl'>${product.price}</Text>
                      <Flex>
                        <Rating numOfStar={rating} />
                        <Text fontSize='md' fontWeight='bold' ml='4px'>
                          {product.numberOfReviews} Reviews
                        </Text>
                      </Flex>
                    </Box>
                    <Text>{product.description}</Text>
                    <Text fontWeight={'bold'}>Quantity</Text>
                    <Flex w='170px' p='5px' border='1px' borderColor='gray.200' alignItems='center' justify='space-between'>
                      <Button isDisabled= { amount <= 0 } onClick={() => changeAmount('minus')}>
                        <MinusIcon />
                      </Button>
                      <Text>{amount}</Text>
                      <Button isDisabled={ amount >= product.stock } onClick={() => changeAmount('plus')}>
                        <SmallAddIcon w='20px' h='25px' />
                      </Button>
                    </Flex>
                    {
                      product.stock > 0 ? (<Button colorScheme='orange' onClick={() => addItem()}>
                      Add to Cart
                      </Button>) : <Text color='red.300'>Sold out</Text>
                    }
                    <Stack width='270px'>
                      <Flex alignItems='center'>
                        <BiPackage size='20px' />
                        <Text fontWeight='medium' fontSize='sm' ml='2'>
                          Free Shipping if order is above $1000
                        </Text>
                      </Flex>
                      <Flex alignItems='center'>
                        <BiCheckShield size='20px' />
                        <Text fontWeight='medium' fontSize='sm' ml='2'>
                          2 year extended warranty
                        </Text>
                      </Flex>
                      <Flex alignItems='center'>
                        <BiSupport size='20px' />
                        <Text fontWeight='medium' fontSize='sm' ml='2'>
                          We here for you 24/4
                        </Text>
                      </Flex>
                    </Stack>
                  </Stack>
                </Stack>
                <Flex direction='column' align='center' flex='1' _dark={{ bg: 'gray.900' }}>
                  <Image mb='30px' src={product.image} alt={product.name} />
                </Flex>
            </Stack>
            {
              userInfo && (
                <>
                  <Tooltip label={hasUserReviewed() ? 'You have already reviewed this product' : ''} fontSize="md">
                    <Button isDisabled={hasUserReviewed()} my="20px" w="140px" colorScheme="orange" onClick={()=> setReviewBoxOpen(!reviewBoxOpen)}>Write a review</Button>
                  </Tooltip>
                  {reviewBoxOpen && (
                    <Stack mb="20px">
                      <Wrap>
                        <HStack spacing="2px">
                          <Button cariant="outline" onClick={() => setRating(1)}>
                            <StarIcon color="orange.500" />
                          </Button>
                          <Button variant="outline" onClick={() => setRating(2)}>
                            <StarIcon color={ rating >=2 ? "orange.500" : "gray.200"}  />
                          </Button>
                          <Button variant="outline" onClick={() => setRating(3)}>
                            <StarIcon color={ rating >=3 ? "orange.500" : "gray.200"}  />
                          </Button>
                          <Button variant="outline" onClick={() => setRating(4)}>
                            <StarIcon color={ rating >=4 ? "orange.500" : "gray.200"}  />
                          </Button>
                          <Button variant="outline" onClick={() => setRating(5)}>
                            <StarIcon color={ rating >=5 ? "orange.500" : "gray.200"}  />
                          </Button>
                        </HStack>
                      </Wrap>
                      <Input onChange={(e) => setTitle(e.target.value)} placeholder="ReviewTitle" />
                      <Textarea
                        onChange={(e) => {
                          setComment(e.target.value);
                        }}
                        placeholder={`The ${product.name} is...`}
                      />
                      <Button w="140px" colorScheme='orange' onClick={() => onSubmit()}>Pushlish review</Button>
                    </Stack>
                  )}
                </>
              )
            }
            <Stack>
              <Text fontSize='xl' fontWeight='bold'>Reviews</Text>
              <SimpleGrid minChildWild='300px' spacinY='20px'>
                {
                  product.reviews.map((item) => (
                    <Box key={item._id}>
                      <Flex spacing alignItems='center'>
                        <Rating numOfStar={item.rating} />
                        <Text fontWeight='semibold' ml='4px'>
                          {item.title && item.title}
                        </Text>
                      </Flex>
                      <Box py='12px'>{item.comment}</Box>
                      <Text fontSize='sm' color='gray.400'>
                        by {item.name}, { new Date(item.createdAt).toDateString()}
                      </Text>
                    </Box>
                  ))
                }
              </SimpleGrid>
            </Stack>
          </Box>
        )
      }
    </Wrap>
  )
}

export default ProductPage;


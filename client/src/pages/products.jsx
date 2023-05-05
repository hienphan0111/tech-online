import { Center, Wrap, WrapItem } from '@chakra-ui/react';
import { products } from '../products';

const ProductsPage = () => {
  return (
    <Wrap spacing='30px' justify='center' minHeight='100vh'>
      {
        products.map(({ id, name}) => (
          <WrapItem key={id}>
            <Center w='250px' h='550px'>
              {name}
            </Center>
          </WrapItem>
        ))
      }
    </Wrap>
  )
}

export default ProductsPage;

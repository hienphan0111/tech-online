import { HStack } from '@chakra-ui/react';
import { StarIcon } from '@chakra-ui/icons';

const Rating = ({numOfStar}) => {

  return (
    <HStack spacing='2px'>
      {
        [...Array(5).keys()].map((i) => (
          <StarIcon key={i} color={numOfStar >= i + 1 ? 'orange.500' : 'gray.200'} />
        ))
      }
    </HStack>
  )
}

export default Rating;

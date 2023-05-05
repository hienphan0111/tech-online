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
import { StartIcon } from '@chakra-ui/icons';
import { useState } from 'react';

const ProductCard = () => {
    return (
        <Stack
            p='2'
            spacing='3px'
            bg={useColorModeValue('white', 'gray.800')}
            
    );
}

export default ProductCard;

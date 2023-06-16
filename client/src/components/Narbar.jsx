import {
  Box,
  Flex,
  HStack,
  Link,
  IconButton,
  Icon,
  Text,
  useDisclosure,
  Button,
  Stack,
  useColorModeValue,
  useColorMode,
  useToast,
  MenuButton,
  Menu,
  MenuList,
  MenuItem,
  MenuDivider,
  Image
} from '@chakra-ui/react';
import { Link as ReactLink, useNavigate } from 'react-router-dom';
import { HamburgerIcon, CloseIcon, MoonIcon, SunIcon, ChevronDownIcon } from '@chakra-ui/icons';
import { GiTechnoHeart } from 'react-icons/gi';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../redux/actions/userActions';
import { MdLocalShipping, MdLogout, MdOutlineAdminPanelSettings } from 'react-icons/md';
import { CgProfile } from 'react-icons/cg'
import React from 'react';
import { FiShoppingCart } from 'react-icons/fi';

const ShoppingCardIcon = () => {
  const cartInfo = useSelector(state => state.cart);
  const { cart } = cartInfo;

  return (
    <Flex>
      <Text fontStyle='italic' as='sub' fontSize='xs'>
        {cart.length}
      </Text>
      <Icon ml='-1.5' as={FiShoppingCart} h='4' w='7' alignSelf='center' />
      <Text>Cart</Text>
    </Flex>
  )
}

const links = [
  { linkName: 'Products', path: './products'},
  { linkName: <ShoppingCardIcon />, path: './cart'}
];

const NavLink = ({ path, children }) => (
  <Link
    as={ReactLink}
    to={path}
    px={2}
    py={2}
    rounded='md'
    _hover={{ textDecoration: 'none', bg: useColorModeValue('gray.200', 'gray.700')}}
  >
    {children}
  </Link>
)

const Navbar = () => {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const { colorMode, toggleColorMode } = useColorMode();
  const user = useSelector((state) => state.user);
  const { userInfo } = user;
  const dispatch = useDispatch();
  const toast = useToast();
  const navigate = useNavigate();

  const logoutHandler = () => {
    dispatch(logout());
    toast({ description: 'You have been logout', status: 'success', isClosable: true})
    navigate('/products');
  }

  return (
    <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4}>
      <Flex h={16} alignItems='center' justifyContent='space-between' >
        <IconButton size='md' icon={isOpen ? <CloseIcon /> : <HamburgerIcon />} display={{ md: 'none'}} onClick={isOpen ? onClose : onOpen} />
        <HStack>
          <Link as={ReactLink} to=''>
            <Flex alignItems='center'>
              <Image src="/favicon.png" h={6} w={6} color='orange.400' />
              <Text fontWeight='extrabold'>New Tech</Text>
            </Flex>
          </Link>
          <HStack as='nav' display={{ base: 'none', md: 'flex'}}>
            {
              links.map((link) => (
                <NavLink key={link.linkName} path={link.path}>{link.linkName}</NavLink>
              ))
            }
          </HStack>
        </HStack>
        <Flex alignItems='center'>
          <NavLink>
            <Icon
              as={colorMode === 'light' ? MoonIcon : SunIcon}
              alignSelf='center'
              onClick={() => toggleColorMode()}
            />
          </NavLink>
          {
            userInfo ? (
              <Menu>
                <MenuButton px='4' py='2' transition='all 0.3s' as={Button}>
                  {userInfo.name} <ChevronDownIcon />
                </MenuButton>
                <MenuList>
                  <MenuItem as={ReactLink} to='/profile'>
                    <CgProfile />
                    <Text ml='2'>Profile</Text>
                  </MenuItem>
                  <MenuItem as={ReactLink} to='/your-orders'>
                    <MdLocalShipping />
                    <Text ml='2'>Your orders</Text>
                  </MenuItem>
                  {
                    userInfo.isAdmin && (
                      <>
                        <MenuDivider />
                        <MenuItem as={ReactLink} to={'/admin-console'}>
                          <MdOutlineAdminPanelSettings />
                          <Text ml='2'>Admin Console</Text>
                        </MenuItem>
                      </>
                    )
                  }
                  <MenuDivider />
                  <MenuItem onClick={logoutHandler}>
                    <MdLogout />
                    <Text ml='2'>Logout</Text>
                  </MenuItem>
                </MenuList>
              </Menu>
            ) : (
              <>
                <Button as={ReactLink} to='/login' p={2} fontSize='sm' fontWeight={400} variant='link'>Sign In</Button>
                <Button
                  as={ReactLink}
                  to='/registration'
                  m={2}
                  display={{ base: 'none', md: 'inline-flex'}}
                  fontSize='sm'
                  fontWeight={600}
                  _hover={{bg: 'orange.400'}}
                  bg='orange.500'
                >Sign Up</Button>
              </>
            )
          }
        </Flex>
      </Flex>
        {
          isOpen ? (
            <Box pd={4} display={{ md: 'none'}}>
              <Stack as='nav' spacing={4}>
                {
                  links.map((link) => (
                    <NavLink key={link.linkName} path={link.path}>{link.linkName}</NavLink>
                  ))
                }
                <NavLink key='sign up' path='/registration' width='100%'>Sign up</NavLink>
              </Stack>
            </Box>
          ): null
        }
    </Box>
  )
}

export default Navbar;

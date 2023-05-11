import {
  Box,
  Button,
  Container,
  FormControl,
  Heading,
  HStack,
  Stack,
  Text,
  useBreakpointValue,
  useColorModeValue as mode,
  AlertIcon,
  AlertTitle,
  Alert,
  AlertDescription,
  useToast
} from '@chakra-ui/react';
import TextField from '../components/TextField';
import PasswordTextField from '../components/PasswordTextField';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useNavigate, Link as ReactLink, useLocation } from 'react-router-dom';
import { register } from '../redux/actions/userActions';

const RegistrationPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const redirect = '/products';
  const toast = useToast();

  const headingBR = useBreakpointValue({ base: 'xs', md: 'sm'});
  const boxBR = useBreakpointValue({ base: 'transparent', md: 'sm'})
  const user = useSelector((state) => state.user);
  const { error, loading, userInfo } = user;

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
      toast({ description: 'Account create successfully', status: 'success', isClosable: true});
    }
  }, [userInfo, redirect, error, navigate, toast]);

  return (
    <Formik
      initialValues={{name: '', email: '', password: ''}}
      validationSchema={
        Yup.object({
          name: Yup.string().required('A name is required'),
          email: Yup.string().email('Invalid email.').required('Email is required'),
          password: Yup.string().min(5, 'Password is too short - must be at least 5').required('Password is required'),
          confirmPassword: Yup.string()
            .required('Password is required')
            .oneOf([Yup.ref('password'), null], 'Password must match'),
        })
      }
      onSubmit={(values) => {
        dispatch(register(values.name, values.email, values.password ))
      }}
    >
      {
        (formik) => (
          <Container maxW='lg' py={{ base: '12', md: '24'}} px={{ base: '0', md: '8' }} minH='4xl'>
            <Stack spacing='8'>
              <Stack spacing='8'>
                <Stack spacing={{base: '2', md: '3'}} textAlign='center'>
                  <Heading size={headingBR}>Create an account</Heading>
                  <HStack spacing='1' justify='center'>
                    <Text color='muted'>Already have account</Text>
                    <Button as={ReactLink} to='/registration' variant='link' colorScheme='orange'>
                      Sign in
                    </Button>
                  </HStack>
                </Stack>
              </Stack>
              <Box
                py={{ base: '0', md: '8'}}
                px={{ base: '4', md: '10'}}
                pg={boxBR}
              >
                <Stack spacing='6' as='form' onSubmit={formik.handleSubmit}>
                  {
                    error && (
                      <Alert status='error' flexDirection='column' alignItems='center' textAlign='center'>
                        <AlertIcon />
                        <AlertTitle>We are sorry!</AlertTitle>
                        <AlertDescription>{error}</AlertDescription>
                      </Alert>
                    )
                  }
                  <Stack spacing='5'>
                    <FormControl>
                    <TextField type="text" name="name" placeholder="Your name" label="Email" />
                      <TextField type="text" name="email" placeholder="you@email.com" label="Email" />
                      <PasswordTextField type="password" name="password" placeholder="your password" label="Password" />
                      <PasswordTextField type="password" name="confirmPassword" placeholder="confirm your password" label="Confirm Password" />
                    </FormControl>
                  </Stack>
                  <Stack spacing='5'>
                    <Button colorScheme="orange" size="lg" fontSize="md" isLoading={loading} type="submit">
                      Sign up
                    </Button>
                  </Stack>
                </Stack>
              </Box>
            </Stack>
          </Container>
        )
      }
    </Formik>
  )
}

export default RegistrationPage;

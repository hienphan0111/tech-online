import {
  Box,
  Button,
  FormControl,
  Heading,
  HStack,
  Stack,
  Text,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Flex,
  Card,
  CardHeader,
  CardBody,
  StackDivider,
  useToast,
} from '@chakra-ui/react';
import TextField from '../components/TextField';
import PasswordTextField from '../components/PasswordTextField';
import { useEffect, useState } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { updateProfile, resetUpdateSuccess } from '../redux/actions/userActions';
import { useLocation } from 'react-router';
import { Navigate } from 'react-router-dom';

const ProfilePage = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const { userInfo, loading, error, updateSuccess } = user;
  const location = useLocation();
  const toast = useToast();

  useEffect(() => {
    if (updateSuccess) {
      toast({description: 'Profile saved', status: 'success', isClosable: true});
      dispatch(resetUpdateSuccess());
    }
  }, [toast, updateSuccess]);

  return userInfo ? (
    <Formik
      initialValues={{name: userInfo.name, email: userInfo.email, password: '', confirmPassword: userInfo.confirmPassword}}
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
        dispatch(updateProfile(userInfo._id, values.name, values.email, values.password))
      }}
    >
      {
        (formik) => <Box minH='100vh' maxW={{base: '3xl', lg: '7xl'}} mx='auto' px={{ base: '4', md: '8', lg: '12'}} px={{ base: '4', md: '8', lg: '12'}}>
          <Stack spacing='10' direction={{ base: 'column', lg: 'row' }} align={{lg: 'flex-start'}}>
            <Stack flex='1.5' mb={{base: '2xl', md: 'none'}}>
              <Heading fontsize='2xl' fontWeight='extrabold'>Profile</Heading>
              <Stack spacing='6'>
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
                      <TextField type='text' name='name' placeholder="Your first name and last name" label="Fullname" />
                      <TextField type="text" name="email" placeholder="you@email.com" label="Email" />
                      <PasswordTextField type="password" name="password" placeholder="your password" label="Password" />
                      <PasswordTextField type="password" name="confirmPassword" placeholder="confirm your password" label="Confirm Password" />
                    </FormControl>
                  </Stack>
                  <Stack spacing='6'>
                    <Button bgColor='orange' color='white' size='lg' fontSize='md' isLoading={loading} type='submit'>
                      Save
                    </Button>
                  </Stack>
                </Stack>
              </Stack>
            </Stack>
            <Card spacing='6'>
              <Flex direction='column' align='center' flex='1' _dark={{ bg: 'gray.900'}}>
                <Heading size='md'>User Report</Heading>
                <CardBody>
                  <Stack divider={<StackDivider />} spacing='4'>
                    <Box pt='2' fontSize='sm'>
                      Register on {new Date(userInfo.createdAt).toDateString()}
                    </Box>
                  </Stack>
                </CardBody>
              </Flex>
            </Card>
          </Stack>
        </Box>
      }
    </Formik>
  ) : (
    <Navigate to='/login' replace={true} state={{from: location}} />
  )
}

export default ProfilePage

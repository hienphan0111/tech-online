import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalFooter,
  ModalBody,
  Button,
  Alert,
  AlertTitle,
  AlertDescription,
  AlertIcon,
  Wrap,
  useToast,
  Stack,
} from '@chakra-ui/react';
import { Link as ReactLink, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../redux/actions/userActions';

const PaymentSuccessModal = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const toast = useToast();
  const logoutHandler = () => {
    dispatch(logout());
    toast({ description: 'You have been loged out', status: 'success', isClosable: true });
    navigate('/products');
  }
  return (
    <>
      <Modal size='full' isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalBody>
            <Wrap justify='center' direction='column' align='center' st='20px'>
              <Alert
                status="success"
                variant="subtle"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                textAlign="center"
                height="auto">
                  <AlertIcon boxSize="55px" />
                  <AlertTitle pt='3px' fontSize="xl" >
                    Payment successfull
                  </AlertTitle>
                  <AlertDescription>From here, you can go to: </AlertDescription>
                  <Stack mt='20px' minW="200">
                    <Button colorScheme='teal' variant="outline" as={ReactLink} to='/your-orders' >
                    Your oder
                    </Button>
                    <Button colorScheme='teal' variant="outline" as={ReactLink} to='/products' >
                    Products
                    </Button>
                    <Button colorScheme='teal' variant="outline" onClick={logoutHandler} >
                      Log Out
                    </Button>
                  </Stack>
                </Alert>
            </Wrap>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}

export default PaymentSuccessModal;

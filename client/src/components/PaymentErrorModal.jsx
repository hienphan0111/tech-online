import {
  Modal,
  ModalOverlay,
  ModalContent,
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

const PaymentErrorModal = ({ isOpen, onClose }) => {
  return (
    <>
      <Modal size='full' isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalBody>
            <Wrap justify='center' direction='column' align='center' st='20px'>
              <Alert
                status="error"
                variant="subtle"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                textAlign="center"
                height="auto">
                  <AlertIcon boxSize="55px" />
                  <AlertTitle pt='3px' fontSize="xl" >
                    Payment failed!
                  </AlertTitle>
                  <AlertDescription>We couldn't process your payment: </AlertDescription>
                </Alert>
            </Wrap>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}

export default PaymentErrorModal;

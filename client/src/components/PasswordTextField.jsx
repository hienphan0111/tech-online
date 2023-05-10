import { FormControl, FormErrorMessage, FormLabel } from '@chakra-ui/form-control';
import { Input } from '@chakra-ui/input';
import { Field, useField } from 'formik';
import { useState } from 'react';
import { InputRightElement, Button, InputGroup } from '@chakra-ui/react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';

const PasswordTextField = ({ label, type, name, placeholder }) => {
  const [field, meta] = useField({type, name, placeholder});
  const [showPassword, setShowPassword] = useState(false);

  return (
    <FormControl isInvalid={meta.error && meta.touched } md='6'>
      <FormLabel noOfLine={1}>{label}</FormLabel>
      <Field as={Input} {...field} type={type} name={name} placeholder={placeholder} />
      <InputGroup>
        <InputRightElement h='full' alignItems="center">
          <Button variant='ghost' onClick={()=> setShowPassword(!showPassword)}>
            {showPassword ? <ViewIcon /> : <ViewOffIcon />}
          </Button>
        </InputRightElement>
      </InputGroup>
      <FormErrorMessage>Password is required</FormErrorMessage>
    </FormControl>
  )
}

export default PasswordTextField;

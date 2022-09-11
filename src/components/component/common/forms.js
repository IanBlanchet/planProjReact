import React from 'react';
import { useField } from 'formik';
import { Input, Select, Checkbox, Text, Switch , Box, HStack, Table, Tr, Td} from '@chakra-ui/react';

 
 export const MyTextInput = ({ label, ...props }) => {
   // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
   // which we can spread on <input>. We can use field meta to show an error
   // message if the field is invalid and it has been touched (i.e. visited)
   const [field, meta] = useField(props);
   return (
     <Box margin='10px' >
        <HStack>
       <label htmlFor={props.id || props.name} style={{fontFamily:'fantasy'}}>{label}</label>
       <Input className="text-input" {...field} {...props} />
       {meta.touched && meta.error ? (
         <div className="error"><Text color='red.500'>{meta.error}</Text></div>
       ) : null}
       </HStack>
     </Box>
   );
 };

 export const MyRatingInput = ({ label, ...props }) => {
  // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
  // which we can spread on <input>. We can use field meta to show an error
  // message if the field is invalid and it has been touched (i.e. visited)
  const [field, meta] = useField(props);
  return (
    <Box margin='3px' >
       <Table size='md'>
      <Tr>
      <Td><label htmlFor={props.id || props.name} style={{fontFamily:'serif'}}>{label}</label></Td>
      <Td><Input className="text-input" {...field} {...props} />
      {meta.touched && meta.error ? (
        <div className="error"><Text color='red.500'>{meta.error}</Text></div>
      ) : null}</Td>
      </Tr>
      </Table>
      
    </Box>
  );
};

 
 export const MySwitch = ({ children, ...props }) => {
   // React treats radios and checkbox inputs differently other input types, select, and textarea.
   // Formik does this too! When you specify `type` to useField(), it will
   // return the correct bag of props for you -- a `checked` prop will be included
   // in `field` alongside `name`, `value`, `onChange`, and `onBlur`
   const [field, meta] = useField({ ...props, type: 'checkbox' });
   return (
     <Box margin='10px'>
       <label className="checkbox-input" style={{fontFamily:'fantasy'}}>
         <Switch  {...field} {...props} />
         {children}
       </label>
       {meta.touched && meta.error ? (
         <div className="error"><Text color='red.500'>{meta.error}</Text></div>
       ) : null}
     </Box>
   );
 };
 
 export const MySelect = ({ label, ...props }) => {
   const [field, meta] = useField(props);
   return (
     <Box margin='10px'>
       <label htmlFor={props.id || props.name} style={{fontFamily:'fantasy'}} >{label}</label>
       <Select {...field} {...props} />
       {meta.touched && meta.error ? (
         <div className="error"><Text color='red.500'>{meta.error}</Text></div>
       ) : null}
     </Box>
   );
 };

 export const MyCheckbox = ({ children, ...props }) => {
  // React treats radios and checkbox inputs differently other input types, select, and textarea.
  // Formik does this too! When you specify `type` to useField(), it will
  // return the correct bag of props for you -- a `checked` prop will be included
  // in `field` alongside `name`, `value`, `onChange`, and `onBlur`
  const [field, meta] = useField({ ...props, type: 'checkbox' });
  return (
    <Box margin='10px'>
      <label className="checkbox-input" style={{fontFamily:'fantasy'}}>
        <Checkbox {...field} {...props} />
        {children}
      </label>
      {meta.touched && meta.error ? (
        <div className="error"><Text color='red.500'>{meta.error}</Text></div>
      ) : null}
    </Box>
  );
};

 
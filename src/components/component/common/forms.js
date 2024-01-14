import React from 'react';
import { useField } from 'formik';
import { Input, Select, Checkbox, Text, Textarea, Switch , Box, HStack, Radio, RadioGroup,  Stack, GridItem, Grid, Tooltip } from '@chakra-ui/react';
import  SearchSelect from 'react-select'

 
 export const MyTextInput = ({ label, ...props }) => {
   // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
   // which we can spread on <input>. We can use field meta to show an error
   // message if the field is invalid and it has been touched (i.e. visited)
   const [field, meta] = useField(props);
   return (
     <Box margin='10px'>
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

 export const MyNumberInput = ({ label, ...props }) => {
  // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
  // which we can spread on <input>. We can use field meta to show an error
  // message if the field is invalid and it has been touched (i.e. visited)
  const [field, meta] = useField(props);
  return (
    <Box margin='10px'>
       <HStack>
      <label htmlFor={props.id || props.name} style={{fontFamily:'fantasy'}}>{label}</label>
      <Input className="number-input" {...field} {...props} />
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
    <Box margin='5px' >
       
      
      <Grid templateRows='1fr' templateColumns='3fr 1fr' >
      <GridItem margin='3'><label htmlFor={props.id || props.name} style={{fontFamily:'serif'}}>
                              <Tooltip label={props.description} placement='left-start' >
                                  {label}
                              </Tooltip>
                          </label>
      </GridItem>
      <GridItem><Input className="text-input" {...field} {...props} />
      {meta.touched && meta.error ? (
        <div className="error"><Text color='red.500'>{meta.error}</Text></div>
      ) : null}</GridItem>
      </Grid>
      
      
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
      <HStack>
       <label htmlFor={props.id || props.name} style={{fontFamily:'fantasy'}} >{label}</label>
       <Select {...field} {...props} />
       {meta.touched && meta.error ? (
         <div className="error"><Text color='red.500'>{meta.error}</Text></div>
       ) : null}
       </HStack>
     </Box >
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

export const MyDateInput = ({ label, ...props }) => {
  // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
  // which we can spread on <input>. We can use field meta to show an error
  // message if the field is invalid and it has been touched (i.e. visited)
  const [field, meta] = useField(props);
  return (
    <Box margin='10px' >
       <HStack>
      <label htmlFor={props.id || props.name} style={{fontFamily:'fantasy'}}>{label}</label>
      <Input type='date' className="date-input" {...field} {...props} />
      {meta.touched && meta.error ? (
        <div className="error"><Text color='red.500'>{meta.error}</Text></div>
      ) : null}
      </HStack>
    </Box>
  );
};

export const MyTextAreaInput = ({ label, ...props }) => {
  // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
  // which we can spread on <input>. We can use field meta to show an error
  // message if the field is invalid and it has been touched (i.e. visited)
  const [field, meta] = useField(props);
  return (
    <Box margin='10px' >
       <HStack>
      <label htmlFor={props.id || props.name} style={{fontFamily:'fantasy'}}>{label}</label>
      <Textarea  className="date-input" {...field} {...props} />
      {meta.touched && meta.error ? (
        <div className="error"><Text color='red.500'>{meta.error}</Text></div>
      ) : null}
      </HStack>
    </Box>
  );
};

export const MyRadioInput = ({ label, ...props }) => {
  // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
  // which we can spread on <input>. We can use field meta to show an error
  // message if the field is invalid and it has been touched (i.e. visited)
  const [field, meta] = useField(props);
  return (
    <Box margin='10px' >
       <HStack>
      <label htmlFor={props.id || props.name} style={{fontFamily:'fantasy'}}>{label}</label>
      <input className="field-input" {...field} {...props} />
      {meta.touched && meta.error ? (
        <div className="error"><Text color='red.500'>{meta.error}</Text></div>
      ) : null}
      </HStack>
    </Box>
  );
};
 
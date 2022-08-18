import { useState, useEffect} from 'react';
import { useFormik, Formik, Form,  } from 'formik';
import { Button } from '@chakra-ui/react';
import * as Yup from 'yup';
import { MyTextInput, MySelect, MyCheckbox } from '../common/forms';

const fields = [['no_projet','text'], ['desc','text'], 
                ['cat','text'], ['immo','checkbox'], ['affectation','text'], 
                ['charge', 'num']]

export function NewProjet() {

      
      return (
        <>
        <h1>Nouveau projet</h1>
        <Formik
          initialValues={{            
            no_projet: '',
            desc: '', 
            cat:'',           
            immo: false, // added for our checkbox
            affectation:'',//select            
            charge:''

          }}
          validationSchema={Yup.object({
            no_projet: Yup.string()
              .max(20, 'Must be 20 characters or less')
              .required('Required'),
            desc: Yup.string()
              .max(100, 'Must be 100 characters or less')
              .required('Required'),
            immo: Yup.boolean()
              .required('Required')
              .oneOf([true], 'You must accept the terms and conditions.'),
            statut: Yup.string()
              .oneOf(
                ['Actif', 'fermé', 'en projet'],
                'Invalid Job Type',
              )
              .required('Required'),
            affectation: Yup.string()
              .oneOf(
                ['Actif', 'fermé', 'en projet'],
                'Invalid Job Type',
              )
              .required('Required'),
            prev_courante: Yup.number()
              .max(15, 'Must be 15 characters or less')
              .required('Required'),
            nature: Yup.string()
              .max(100, 'Must be 100 characters or less')
              .required('Required'),
            charge: Yup.string()
            .max(100, 'Must be 100 characters or less')
            .required('Required'),            
          })}
          onSubmit={(values, { setSubmitting }) => {
            setTimeout(() => {
              alert(JSON.stringify(values, null, 2));
              setSubmitting(false);
            }, 400);
          }}
        >
          <Form>
            {fields.map(item => <MyTextInput
                label={item[0]}
                name={item[0]}
                type={item[1]}
               
            />)}
            
  
            <MySelect label="Job Type" name="jobType">
              <option value="">Select a job type</option>
              <option value="designer">Designer</option>
              <option value="development">Developer</option>
              <option value="product">Product Manager</option>
              <option value="other">Other</option>
            </MySelect>
  
            <MyCheckbox name="acceptedTerms">
              I accept the terms and conditions
            </MyCheckbox>
  
            <Button type="submit">Submit</Button>
          </Form>
        </Formik>
      </>
          )     

}
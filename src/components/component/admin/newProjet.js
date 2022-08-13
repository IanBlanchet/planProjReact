import { useState, useEffect} from 'react';
import { useFormik } from 'formik';


const fields = [('id','num'), ('no_projet','text'), ('desc','text'), 
                ('cat','text'), ('immo','checkbox'), ('reglA','text'), 
                ('reglB','text'), ('statut','text'), ('affectation','text'), 
                ('prev_courante', 'num'), ('nature','text'), ('charge', 'num')]

export function NewProjet() {

    const formik = useFormik({
        initialValues: {
          email: '',
        },
        onSubmit: values => {
          alert(JSON.stringify(values, null, 2));
        },
      });
      //a travailler selon le site de Formik pour éviter la rétition
      return (
        <form onSubmit={formik.handleSubmit}>
          <label htmlFor="nouveauProjet">Nouveau Projet</label>
          { fields.forEach( item => {
               <input
               id={item[0]}
               name={item[0]}
               type={item[1]}
               onChange={formik.handleChange}
               value={formik.values.email}
             />
            }
          )
       
        }
    
          <button type="submit">Submit</button>
        </form>
      );
}
"use client"
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from './page.module.css'

import * as Yup from 'yup';

import React from 'react';
 import { Formik, Form, Field, ErrorMessage } from 'formik';
 import validateDate from './functions/validateDate';

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <Formik
       initialValues ={{ day: '', month: '', year: '', date: "32/09/2022" }}
       validate={values => {
         const errors = { email: ""}; // atribuição
         const resultado = validateDate(values.date)
         console.log(resultado)
         if (!values.day) { errors.email = 'Day required'; }
         return errors;
       }}
       onSubmit={(values, { setSubmitting }) => {
         setTimeout(() => {
           alert(JSON.stringify(values, null, 2));
           setSubmitting(false);
         }, 400);
       }}
     >
       {
       () => (
         <Form>
           <Field type="email" name="email" />
           <ErrorMessage name="email" component="div" />
           <Field type="password" name="password" />
           <ErrorMessage name="password" component="div" />
           <button type="submit">
             Submit
           </button>
         </Form>
       )
       }
     </Formik>   
    </>
  )
}

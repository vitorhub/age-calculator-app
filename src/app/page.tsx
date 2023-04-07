"use client"
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from './page.module.css'

import * as Yup from 'yup';

import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import valDate from './functions/validateDate';

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <Formik
        initialValues={{ dia: '', mes: '', ano: '', date: "30/09/1900" }}
        validate={values => {
          const junta = { concat: `${values.dia}/${values.mes}/${values.ano}` };
          const resultado = valDate(junta.concat)
          console.log(resultado + "@@")
          const errors = { dia: ``, mes: ``, ano: `` }; // atribuição
          if (!values.dia) { errors.dia = 'Falta dia'; }
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
              <Field type="number" name="dia" />
              <ErrorMessage name="dia" component="div" />
              <Field type="number" name="mes" />
              <ErrorMessage name="mes" component="div" />
              <Field type="number" name="ano" />
              <ErrorMessage name="ano" component="div" />
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

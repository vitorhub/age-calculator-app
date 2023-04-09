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
          console.log(resultado[0])
          const errors = { dia: ``, mes: ``, ano: `` }; // atribuição
          if (resultado[0] != "OK") { errors.dia = resultado[0]; }
          if (resultado[1] != "OK") { errors.mes = resultado[1]; }
          if (resultado[2] != "OK") { errors.ano = resultado[2]; }
          return errors;
        }}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
          }, 1000);
        }}
      >
        {
          () => (
            <>
            <Form>
            <label htmlFor="dia">Dia</label>
              <Field type="number" name="dia" />
              <ErrorMessage name="dia" component="div" />
            <label htmlFor="mes">Mes</label>
              <Field type="number" name="mes" />
              <ErrorMessage name="mes" component="div" />
            <label htmlFor="ano">Ano</label>
              <Field type="number" name="ano" />
              <ErrorMessage name="ano" component="div" />
              <button type="submit">
                Submit
              </button>
            </Form>
            </>
          )
        }
      </Formik>
    </>
  )
}

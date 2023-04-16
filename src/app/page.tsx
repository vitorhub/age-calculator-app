"use client"
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from './page.module.css'

import * as Yup from 'yup';

import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import valDate from './functions/validateDate';

const inter = Inter({ subsets: ['latin'] })


export default function Home() {
  const [anos , setAnos ] = useState<string | number>("-");
  const [meses , setMeses ] = useState<string | number>("-");
  const [dias , setDias ] = useState<string | number>("-");

  
  function exibeResult(dia:any, mes:any, ano:any){
    console.log(dia)
    const hoje = new Date();
    const antesYear = ano; // 1982
    const currentYear = hoje.getFullYear(); // 2023
//    const diaantes = dia; // 27
    const today = hoje.getDate();
    const antesMonth = mes // 08
    const currentMonth = hoje.getMonth()+1  // 4
//    const dataatual = `${today}/${currentMonth}/${currentYear}`;
    
    let exibe = +(currentMonth+(12*currentYear))-(antesMonth+(12*antesYear)); // 488
    let anos =  Math.trunc( exibe / 12 ) // 40 anos
    setAnos(anos)
    let meses = exibe - (anos * 12)   // 8 meses
    let dias = today
    
    console.log( meses + " MODULO ")
    // (mes2+12*ano2)-(mes1+12*ano1);
  }

  return (
    <>
      <Formik
        initialValues={{ dia: '', mes: '', ano: '', date: "30/09/1900" }}
        validate={values => {
          const junta = { concat: `${values.dia}/${values.mes}/${values.ano}` };
          const resultado = valDate(junta.concat)
//          { exibeResult(values.dia, values.mes, values.ano) }
          const errors = { dia: ``, mes: ``, ano: `` }; // atribuição
          if (resultado[0] != "OK") { errors.dia = resultado[0]; }
          if (resultado[1] != "OK") { errors.mes = resultado[1]; }
          if (resultado[2] != "OK") { errors.ano = resultado[2]; }
          return errors;
        }}

        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            // alert(JSON.stringify(values, null, 2));
           exibeResult(values.dia, values.mes, values.ano) 
            setSubmitting(false);
          }, 1000);
        }}
      >
        {
          () => (
            <>
              <Form >
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

        <h2>{anos} Years</h2>
    </>
  )
}

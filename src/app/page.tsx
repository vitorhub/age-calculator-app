"use client"
import Image from 'next/image'
import arrow from '/icon-arrow.svg'
import './page.module.css'
import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import valDate from './functions/validateDate';

export default function Home() {
  const [anos , setAnos ] = useState<string | number>("- -");
  const [meses , setMeses ] = useState<string | number>("- -");
  const [dias , setDias ] = useState<string | number>("- -");
  const [d, setD] = useState<number| string>(0)
  const [m, setM] = useState<number| string>(0)
  const [a, setA] = useState<number| string>(0)
  
  function exibeResult(dia:any, mes:any, ano:any){
    const hoje = new Date();
    const antesYear = ano;
    const currentYear = hoje.getFullYear();
    const today = hoje.getDate();
    const antesMonth = mes // 08
    const currentMonth = hoje.getMonth()+1

    let calcmes = +(currentMonth+(12*currentYear))-(antesMonth+(12*antesYear));
    let anos =  Math.trunc( calcmes / 12 )
    let meses = calcmes - (anos * 12)
    let dias = today
    setAnos(anos)
    setMeses(meses)
    setDias(dias)
  }

  function executa(e: any){
    e.preventDefault();
    exibeResult(d, m, a);
  }

  return (
    <>
      <Formik
        initialValues={{ dia: '', mes: '', ano: '', date: "30/09/1900" }}
        validate={values => {
          const junta = { concat: `${values.dia}/${values.mes}/${values.ano}` };
          const resultado = valDate(junta.concat)
          /* { exibeResult(values.dia, values.mes, values.ano) } */
          setD(values.dia);
          setM(values.mes);
          setA(values.ano);
          const errors = { dia: ``, mes: ``, ano: `` };
          if (resultado[0] != "OK") { errors.dia = resultado[0]; }
          if (resultado[1] != "OK") { errors.mes = resultado[1]; }
          if (resultado[2] != "OK") { errors.ano = resultado[2]; }
          return errors;
        }} 

        onSubmit={(values)=>{
          /* aqui supostamente eu pegaria os valores de values */
        }}
      >
        {
          () => (
            <>
              <Form onSubmit={ (e)=> {executa(e)} } >
                <label htmlFor="dia">Dia</label>
                <Field type="number" name="dia" />
                <ErrorMessage name="dia" component="div" />
                <label htmlFor="mes">Mes</label>
                <Field type="number" name="mes" />
                <ErrorMessage name="mes" component="div" />
                <label htmlFor="ano">Ano</label>
                <Field type="number" name="ano" />
                <ErrorMessage name="ano" component="div" />
                <button type="submit" className='botao'>
                  <img className='arrow' src="/icon-arrow.svg" alt="arrow" />
                </button>
              </Form>
            </>
          )
        }
      </Formik>

        <h2>{anos} Years</h2>
        <h2>{meses} Months</h2>
        <h2>{dias} Days </h2>
    </>
  )
}
// https://mohamed806h.github.io/Age-calculator-app-main/
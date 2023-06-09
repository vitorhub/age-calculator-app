"use client"
import './globals.css'
import styles from './page.module.css'
import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import valDate from './functions/validateDate';

export default function Home() {
  const [anos, setAnos] = useState<string | number>("- -");
  const [meses, setMeses] = useState<string | number>("- -");
  const [dias, setDias] = useState<string | number>("- -");
  const [d, setD] = useState<number | string>(0)
  const [m, setM] = useState<number | string>(0)
  const [a, setA] = useState<number | string>(0)
  const [dayRed, setDayRed] = useState(false)
  const [monthRed, setMonthRed] = useState(false)
  const [yearRed, setYearRed] = useState(false)

  function exibeResult(dia: any, mes: any, ano: any) {
    const hoje = new Date();
    const antesYear = ano;
    const currentYear = hoje.getFullYear();
    const today = hoje.getDate();
    const antesMonth = mes // 08
    const currentMonth = hoje.getMonth() + 1

    let calcmes = +(currentMonth + (12 * currentYear)) - (antesMonth + (12 * antesYear));
    let anos = Math.trunc(calcmes / 12)
    let meses = calcmes - (anos * 12)
    let dias = today
      setAnos(anos)
      setMeses(meses)
      setDias(dias)
  }

  function executa(e: any) {
    e.preventDefault();
    exibeResult(d, m, a);
  }

  return (
    <div className={styles.container} >
      <Formik
        initialValues={{ dia: '', mes: '', ano: '' }}
        validate={values => {
          const junta = { concat: `${values.dia}/${values.mes}/${values.ano}` };
          const resultado = valDate(junta.concat)
          setD(values.dia);
          setM(values.mes);
          setA(values.ano);
          const errors = { dia: "", mes: "", ano: "" };
          if (resultado[0] === "OK" || resultado[0] === undefined) {
            setDayRed(false)
          } else { errors.dia = resultado[0]; setDayRed(true) }
          if (resultado[1] === "OK" || resultado[1] === undefined) {
            setMonthRed(false)
          } else { errors.mes = resultado[1]; setMonthRed(true) }
          if (resultado[2] === "OK" || resultado[2] === undefined) {
            setYearRed(false)
          } else { errors.ano = resultado[2]; setYearRed(true) }

          return errors;
        }}
        onSubmit={(values) => {
          console.log("Não funciona")
        }}

      >
        {
          () => (
            <>
              <Form onSubmit={(e) => { executa(e) }} id={styles.mainForm} >
                <div className={styles.campos}>
                  <div className={styles.day}>
                    <label htmlFor="dia" className={dayRed ? (styles.mudaLabelDia) : ''}>Dia</label>
                    <Field type="number" name="dia" 
                    className={dayRed ? (styles.mudaInputDia) : styles.mudaInput} placeholder="DD" />
                    <ErrorMessage name="dia" component="div" className={styles.erro} />
                  </div>
                  <div className={styles.month}>
                    <label htmlFor="mes" className={monthRed ? (styles.mudaLabelMes) : ''} >Mes</label>
                    <Field type="number" name="mes" 
                    className={monthRed ? (styles.mudaInputMes) : ''} placeholder="MM" />
                    <ErrorMessage name="mes" component="div" className={styles.erro} />
                  </div>
                  <div className={styles.year}>
                    <label htmlFor="ano" className={yearRed ? (styles.mudaLabelAno) : ''} >Ano</label>
                    <Field type="number" name="ano" 
                    className={yearRed ? (styles.mudaInputAno) : ''} placeholder="YYYY" />
                    <ErrorMessage name="ano" component="div" className={styles.erro} />
                  </div>
                </div>
                <button type="submit" className={styles.botao}>
                  <img className={styles.arrow} src="/icon-arrow.svg" alt="arrow" />
                </button>
              </Form>
            </>
          )
        }
      </Formik>
      <div className={styles.result}>
        <h2><span>{anos}</span> years</h2>
        <h2><span>{meses}</span> months</h2>
        <h2><span>{dias}</span> days </h2>
      </div>
    </div>
  )
}
// https://mohamed806h.github.io/Age-calculator-app-main/
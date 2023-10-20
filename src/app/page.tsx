"use client";
import { yupResolver } from "@hookform/resolvers/yup";
import { randomUUID } from "crypto";
import Image from "next/image";
import { use, useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import * as yup from "yup";
import { schema } from "./schema";
import { DatePicker } from "@mui/x-date-pickers";
import { Box, Button, Stack, TextField, css } from "@mui/material";
import dayjs from "dayjs";

interface TransationProp {
  description: string;
  date: string;
  value_in: number;
  value_out: number;
}
export default function Home() {
  const [transactions, setTransactions] = useState<TransationProp[]>([]);
 useEffect(() => {
    const transactions = localStorage.getItem("transactions");
    if (transactions) {
      setTransactions(JSON.parse(transactions));
    }
  },[]
 )
 useEffect(()=>console.debug(transactions),[transactions])
  const form = useForm({
    defaultValues: {
      description: "",
      date: dayjs(),
      value_in: 0,
      value_out: 0,
    },
    resolver: yupResolver(schema),
  });
  const {
    reset,
    handleSubmit,
    formState: { errors },
    register,
    watch,
    setValue
  } = form;

  const onSubmit = async (transaction: TransationProp) => {
    console.log("teste");

    console.log(transaction);
    const newTransaction = {
      description: transaction.description,
      date: transaction.date,
      value_in: transaction.value_in,
      value_out: transaction.value_out
    };
    const newTransactions = transactions.concat([newTransaction])
    setTransactions(newTransactions)
    reset();

    await localStorage.setItem("transactions", JSON.stringify(newTransactions));
  };

  return (
    <div>
      <h1 style={css({  textAlign: "center" })}>Gestão de dados financeiros</h1>

      <ul>
        {transactions.map((transaction) => (
          <li key={crypto.randomUUID()}>
            {transaction.name} - {transaction.description} -{" "}
            {transaction.value_in}- {transaction.value_out}
          </li>
        ))}
      </ul>

      <FormProvider {...form}>
        <Stack justifyContent="center" alignItems="center"  gap= "20px" 
        sx={{          
          backgroundColor: "Gainsboro",        
          border: 2.5,
          borderColor: "DarkGrey",
          padding: "10px",
          borderRadius: "10px",
          width: "250px",
          }} >
          <>
          Data
            <DatePicker
              sx={{
                border: 2.5,
                borderColor: "DarkGrey",
                height: 55,
                width: 250,
                backgroundColor: "white",
                borderRadius: 2 ,
              }}
              format="DD/MM/YYYY"
              slotProps={{
                textField: {
                  helperText: errors.date?.message,
                  error: !!errors.date,
                  placeholder: "DD/MM/AAAA",
              }}}
              value={watch("date")??""}
              onChange={(value)=>setValue("date",value)}
            />
            <>
            Descrição 
              <TextField
                sx={{
                  border: 2.5,
                  borderColor: "DarkGrey",
                  height: 55,
                  width: 250,
                  borderRadius: 2 ,
                  backgroundColor: "white",
                }}
                placeholder="Descrição da transação"
                helperText={errors.description?.message}
                error={!!errors.description}
                {...register("description")}
              />
            </>
            <>
            Entrada
              <TextField
                sx={{
                  border: 2.5,
                  borderColor: "DarkGrey",
                  height: 55,
                  width: 250,
                  borderRadius: 2 ,
                  backgroundColor: "white",
                }}
                placeholder="0"
                helperText={errors.value_in?.message}
                error={!!errors.value_in}
                {...register("value_in")}
              />
            </>
            <>
            Saída
              <TextField
                sx={{
                  border: 2.5,
                  borderColor: "DarkGrey",
                  height: 55,
                  width: 250,
                  borderRadius: 2 ,
                  backgroundColor: "white",
                }}
                placeholder="0"
                helperText={errors.value_out?.message}
                error={!!errors.value_out}
                {...register("value_out")}
              />
            </>
            </>
          <Button
            onClick={handleSubmit(onSubmit)}
            sx={{
              border: 2.5,
              borderColor: "MediumSeaGreen",
              width: "250px",
              backgroundColor: "#00ff00",
              color: "#292929",
              '&:hover':{
                backgroundColor: "#007a00",
                borderColor: "#004a00"
              }
            }}
          >
            Salvar
          </Button>
        </Stack>
      </FormProvider>
    </div>
  );
}

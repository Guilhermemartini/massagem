"use client";
import { yupResolver } from "@hookform/resolvers/yup";
import { randomUUID } from "crypto";
import Image from "next/image";
import { use, useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import * as yup from "yup";
import { schema } from "./schema";
import { DatePicker } from "@mui/x-date-pickers";
import { Button, Stack, TextField } from "@mui/material";
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
      <h1>Gestão de dados financeiros</h1>

      <ul>
        {transactions.map((transaction) => (
          <li key={crypto.randomUUID()}>
            {transaction.name} - {transaction.description} -{" "}
            {transaction.value_in}- {transaction.value_out}
          </li>
        ))}
      </ul>

      <FormProvider {...form}>
        <Stack gap={3}>
          <>
            <DatePicker
              sx={{
                borderColor: "gray",
                height: 50,
                width: 250,
                borderRadius: "15px",
              }}
              format="DD/MM/YYYY"
              slotProps={{
                textField: {
                  helperText: errors.date?.message,
                  error: !!errors.date,
                  placeholder: "Data",
              }}}
              value={watch("date")??""}
              onChange={(value)=>setValue("date",value)}
            />
            <>
              <TextField
                sx={{
                  borderColor: "gray",
                  height: 50,
                  width: 250,
                  borderRadius: "15px",
                }}
                placeholder="Descrição da transação"
                helperText={errors.description?.message}
                error={!!errors.description}
                {...register("description")}
              />
            </>
            <>
              <TextField
                sx={{
                  borderColor: "gray",
                  height: 50,
                  width: 250,
                  borderRadius: "15px",
                }}
                placeholder="Entrada"
                helperText={errors.value_in?.message}
                error={!!errors.value_in}
                {...register("value_in")}
              />
            </>
            <>
              <TextField
                sx={{
                  borderColor: "gray",
                  height: 50,
                  width: 250,
                  borderRadius: "15px",
                }}
                placeholder="Saída"
                helperText={errors.value_out?.message}
                error={!!errors.value_out}
                {...register("value_out")}
              />
            </>
          </>
          <Button
            onClick={handleSubmit(onSubmit)}
            style={{ width: "250px", borderRadius: "15px" }}
          >
            Salvar
          </Button>
        </Stack>
      </FormProvider>
    </div>
  );
}

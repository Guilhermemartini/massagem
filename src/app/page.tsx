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
import { TransactionProps } from "./type";
import { Table } from "./components/table";

export default function Home() {
  const [transactions, setTransactions] = useState<TransactionProps[]>([]);
  useEffect(() => {
    const transactions = localStorage.getItem("transactions");
    if (transactions) {
      setTransactions(JSON.parse(transactions));
    }
  }, []);
  useEffect(() => console.debug(transactions), [transactions]);
  const form = useForm({
    defaultValues: {
      description: "",
      date: dayjs(),
      value_in:"",
      value_out:""
    },
    resolver: yupResolver(schema),
  });
  const {
    reset,
    handleSubmit,
    formState: { errors },
    register,
    watch,
    setValue,
  } = form;

  const onSubmit = async (transaction: TransactionProps) => {
    console.log("teste");

    console.log(transaction);
    const newTransaction = {
      description: transaction.description,
      date: transaction.date,
      value_in: transaction.value_in,
      value_out: transaction.value_out,
      id: crypto.randomUUID(),
    };
    const newTransactions = transactions.concat([newTransaction]);
    setTransactions(newTransactions);
    reset();

    localStorage.setItem("transactions", JSON.stringify(newTransactions));
  };

  return (
    <Stack gap={2.5}>
      <h1 style={{ textAlign: "center" }}>Gestão de dados financeiros</h1>

      <Stack width="100%" alignItems="center">
        <FormProvider {...form}>
          <Stack
            justifyContent="center"
            alignItems="center"
            gap="20px"
            sx={{
              backgroundColor: "Gainsboro",
              border: 2.5,
              borderColor: "DarkGrey",
              padding: "10px",
              borderRadius: "10px",
              width: "250px",
            }}
          >
            <DatePicker
              sx={{
                border: 2.5,
                borderColor: "DarkGrey",
                height: 55,
                width: 250,
                backgroundColor: "white",
                borderRadius: 2,
              }}
              format="DD/MM/YYYY"
              slotProps={{
                textField: {
                  helperText: errors.date?.message,
                  error: !!errors.date,
                  placeholder: "DD/MM/AAAA",
                  variant: "filled",
                  label: "Data",
                },
              }}
              value={watch("date") ?? ""}
              onChange={(value) => setValue("date", value)}
            />

            <TextField
              sx={{
                border: 2.5,
                borderColor: "DarkGrey",
                height: 55,
                width: 250,
                borderRadius: 2,
                backgroundColor: "white",
              }}
              variant="filled"
              label="Descrição"
              placeholder="Adicione uma descrição"
              helperText={errors.description?.message}
              error={!!errors.description}
              {...register("description")}
            />
            <TextField
              sx={{
                border: 2.5,
                borderColor: "DarkGrey",
                height: 55,
                width: 250,
                borderRadius: 2,
                backgroundColor: "white",
              }}
              variant="filled"
              label="Entrada"
              InputProps={{ inputProps: { min: 0, inputMode: "numeric" } }}
              type="number"
              placeholder="0"
              helperText={errors.value_in?.message}
              error={!!errors.value_in}
              {...register("value_in")}
            />

            <TextField
              sx={{
                border: 2.5,
                borderColor: "DarkGrey",
                height: 55,
                width: 250,
                borderRadius: 2,
                backgroundColor: "white",
              }}
              variant="filled"
              label="Saída"
              inputProps={{ min: 0, inputMode: "numeric" }}
              type="number"
              placeholder="0"
              helperText={errors.value_out?.message}
              error={!!errors.value_out}
              {...register("value_out")}
            />
            <Button
              onClick={handleSubmit(onSubmit)}
              sx={{
                border: 2.5,
                borderColor: "#0e0cff",
                width: "250px",
                backgroundColor: "#2f41ff",
                color: "black",
                "&:hover": {
                  backgroundColor: "#0606cd",
                  borderColor: "#10149f",
                },
              }}
            >
              SALVAR
            </Button>
          </Stack>
        </FormProvider>
      </Stack>

      <Table values={transactions } />
    </Stack>
  );
}

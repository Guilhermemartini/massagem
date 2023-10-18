'use client'
import { Button, Input, Stack, TextField } from '@mui/joy';
import { randomUUID } from 'crypto';
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form';


interface TransationProp{
  name: string;
  description: string;
  date: string;
  value_in: number;
  value_out: number;

}
export default function Home() {
  const [transactions, setTransactions] = useState<TransationProp[]>([]);

  const form =useForm({ defaultValues: {
    name: "",
    description: "",
    date: new Date(),
    value_in: 0,
    value_out: 0
  }});
  const {reset,handleSubmit,watch,register}= form

  const onSubmit = async (transaction:TransationProp) => {
    console.log('teste');

    console.log(transaction);
    // const newTransaction = {
    //   name: transaction.name,
    //   description: transaction.description,
    //   date: transaction.date,
    //   value_in: transaction.value_in,
    //   value_out: transaction.value_out
    // };
    // await localStorage.setItem("transactions", JSON.stringify(transactions.concat([newTransaction])));
  };

  return (
    
      <div>
        <h1>Gestão de dados financeiros</h1>

        <ul>
          {transactions.map((transaction) => (
            <li key={crypto.randomUUID()}>
              {transaction.name} - {transaction.description} - {transaction.value_in}
              - {transaction.value_out}
            </li>
          ))}
        </ul>

      
        <FormProvider {...form}>
<Stack gap = {3}>
          <>
          <Input
           sx={{
            borderColor: 'red',
            height:  50,
            width: 250,

           
          }} 
          placeholder="DD/MM/AAAA"
          {...register('name')}
          />
          <>
          <Input
           sx={{
            borderColor: 'red',
            height:  50,
            width: 250,
          
          
          }} 
            placeholder="Descrição da transação"
            {...register('description')}
          />
          </>
          <>
                    <Input
                sx={{
                      borderColor: 'red',
                      height:  50,
                      width: 250,
                    }}  
            placeholder="Entrada"
            {...register('description')}
          />
          </>
          <>
                    <Input
                    sx={{
                      borderColor: 'red',
                      height:  50,
                      width: 250,
                    }}  
            placeholder="Saída"
            {...register('description')}
          />
          </>
          </>
          <Button onClick={handleSubmit(onsubmit)}width={24}>Salvar</Button>
          </Stack>
      </FormProvider>
      
      </div>

  );
};

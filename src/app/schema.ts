import * as yup from 'yup';

export const schema=yup.object().shape({
    description: yup.string().required('Descrição é obrigatória'),
    date: yup.date().required('Data é obrigatória'),

      })
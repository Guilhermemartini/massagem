import * as yup from 'yup';

export const schema=yup.object().shape({
    description: yup.string().required('Descrição é obrigatória'),
    date: yup.date().required('Data é obrigatória'),
    value_in: yup.number().min(0,'O valor deve ser maior que R$0').required(),
    value_out: yup.number().min(0,'O valor deve ser maior que R$0').required()
      })
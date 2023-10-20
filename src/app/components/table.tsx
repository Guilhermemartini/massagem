import { DataGrid } from "@mui/x-data-grid";
import { TransactionProps } from "../type";
import { FC, useState } from "react";
import dayjs from "dayjs";
import {
  Button,
  ButtonGroup,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";

interface Props {
  values: TransactionProps[];
}
export const Table: FC<Props> = ({ values }) => {
  const months = [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro",
  ];

  const [monthActual, setMonthActual] = useState(0);

  return (
    <Stack alignItems="center" width="100%" gap={1}>
      <ToggleButtonGroup
        value={monthActual}
        exclusive
        onChange={(newValue) => setMonthActual(newValue)}
      >
        {months.map((month, index) => (
          <ToggleButton value={index} key={index}>
            {month}
          </ToggleButton>
        ))}
      </ToggleButtonGroup>

      <DataGrid
        style={{ height: 400, width: "100%" }}
        rows={
          values?.filter(
            (value) => dayjs(value.date)?.month() === monthActual
          ) ?? []
        }
        columns={[
          {
            headerName: "Descrição",
            field: "description",
            flex: 1,
            minWidth: 200,
          },
          {
            headerName: "Data",
            field: "date",
            flex: 1,
            minWidth: 125,
            valueFormatter: (params) =>
              dayjs(params.value).format("DD/MM/YYYY"),
          },
          {
            headerName: "Entrada",
            field: "value_in",
            flex: 1,
            minWidth: 75,
          },
          {
            headerName: "Saída",
            field: "value_out",
            flex: 1,
            minWidth: 75,
          },
        ]}
      />
    </Stack>
  );
};

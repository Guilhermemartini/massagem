import { DataGrid, GridOverlay } from "@mui/x-data-grid";
import { TransactionProps } from "../../type";
import { FC, useEffect, useState } from "react";
import dayjs from "dayjs";
import {
  Button,
  ButtonGroup,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";

interface Props {
  values: TransactionProps[];
  loading: boolean;
}
export const Table: FC<Props> = ({ values, loading }) => {
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
    "TODOS",
  ];

  const [monthActual, setMonthActual] = useState(12);

  return (
    <Stack alignItems="center" width="100%" gap={1}>
      <ToggleButtonGroup
        value={monthActual}
        exclusive
        onChange={(_, newValue) => setMonthActual(newValue)}
      >
        {months.map((month, index) => (
          <ToggleButton value={index} key={index}>
            {month}
          </ToggleButton>
        ))}
      </ToggleButtonGroup>

      <Button sx={{}}></Button>

      <DataGrid
        initialState={{
          pagination: { paginationModel: { pageSize: 25 } },
        }}
        loading={loading}
        localeText={{ noRowsLabel: "Não há registros" }}
        sx={{
          width: "60%",
          ".MuiDataGrid-overlay": {
            height: "auto !important",
          },
        }}
        rows={
          values?.filter((value) => {
            if (monthActual === 12) return true;
            else return dayjs(value.date).month() === monthActual;
          }) ?? []
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

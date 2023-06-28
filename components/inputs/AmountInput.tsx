import { TextField } from "@mui/material";
import React from "react";
import { NumericFormat, NumericFormatProps } from "react-number-format";

interface CustomProps {
  onChange: (event: { target: { name: string; value: string } }) => void;
  name: string;
}

const NumericFormatCustom = React.forwardRef<NumericFormatProps, CustomProps>(
  function NumericFormatCustom(props, ref) {
    const { onChange, ...other } = props;

    return (
      <NumericFormat
        {...other}
        getInputRef={ref}
        onValueChange={(values) => {
          onChange({
            target: {
              name: props.name,
              value: values.value,
            },
          });
        }}
        valueIsNumericString
      />
    );
  }
);
interface Props {
  error?: boolean;
  label: string;
  value: string;
  onChange: (newAmount: string) => void;
}

const AmountInput = (props: Props) => {
  return (
    <TextField
      InputProps={{
        inputComponent: NumericFormatCustom as any,
        style: {
          color: "white",
        },
      }}
      fullWidth
      placeholder="0"
      label={props.label}
      focused
      color="info"
      value={props.value}
      onChange={(event) => {
        props.onChange(event.target.value);
      }}
      error={props.error}
    />
  );
};

export default AmountInput;

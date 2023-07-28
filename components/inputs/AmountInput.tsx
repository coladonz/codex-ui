import { TextField, Typography } from "@mui/material";
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
        style={{
          padding: "0px",
        }}
      />
    );
  }
);
interface Props {
  error?: boolean;
  value: string;
  max?: string;
  onChange: (newAmount: string) => void;
}

const AmountInput = (props: Props) => {
  return (
    <TextField
      className="codex-amount-input"
      InputProps={{
        inputComponent: NumericFormatCustom as any,
        className: "border border-gray-400 p-4",
        endAdornment: props.max ? (
          <Typography
            className="text-purple-500 text-sm cursor-pointer"
            onClick={() => {
              props.onChange(props.max || "0");
            }}
          >
            Max
          </Typography>
        ) : null,
        autoComplete: undefined,
      }}
      fullWidth
      placeholder="0"
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

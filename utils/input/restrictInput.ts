import { validateInput } from "./validateInput";

export const restrictInput = (
  event:
    | React.ChangeEvent<HTMLInputElement>
    | React.ClipboardEvent<HTMLInputElement>,
  setter: React.Dispatch<React.SetStateAction<string>>,
  type: "address" | "amount" | "percent" | "any" = "any"
) => {
  const value =
    "clipboardData" in event
      ? event.clipboardData.getData("text/plain")
      : event.currentTarget.value;

  if (!validateInput(value, type)) return;
  else setter(value);
};

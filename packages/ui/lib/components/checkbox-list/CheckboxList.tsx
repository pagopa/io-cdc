import {
  Box,
  Checkbox,
  FormControlLabel,
  Link,
  Typography,
} from "@mui/material";
import { ReactNode, useCallback } from "react";

interface CheckboxOption<T> {
  disabled?: boolean;
  label: string;
  rightComponent?: ReactNode;
  value: T;
}

interface CheckboxListBase<T> {
  options: CheckboxOption<T>[];
  title: string;
}

interface CheckboxListMultiple<T> extends CheckboxListBase<T> {
  buttonLabel: string;
  disableSelectAll?: boolean;
  multiple: true;
  onChange: (newValue: T[]) => void;
  value: T[];
}

interface CheckboxListSingle<T> extends CheckboxListBase<T> {
  buttonLabel?: undefined;
  disableSelectAll?: true;
  multiple?: false;
  onChange: (newValue?: T) => void;
  value?: T;
}

export type CheckboxListProps<T> =
  | CheckboxListMultiple<T>
  | CheckboxListSingle<T>;

export function CheckboxList<T>({
  buttonLabel,
  disableSelectAll,
  multiple,
  onChange,
  options,
  title,
  value,
}: CheckboxListProps<T>) {
  const checkIsItemSelected = useCallback(
    (itemValue: T) =>
      multiple ? (value as T[]).includes(itemValue) : value === itemValue,
    [multiple, value],
  );

  const handleOnChange = useCallback(
    (itemValue: T, checked: boolean) => {
      if (multiple) {
        onChange(
          checked
            ? [...(value as T[]), itemValue]
            : (value as T[]).filter((item) => item !== itemValue),
        );
        return;
      }
      onChange(checked ? itemValue : undefined);
    },
    [multiple, value],
  );

  const onSelectAll = useCallback(() => {
    if (multiple) {
      const selectedAll = options.length === (value as T[]).length;
      onChange(selectedAll ? [] : options.map(({ value }) => value));
    }
  }, [onChange, multiple, options, value]);

  return (
    <Box display="flex" flex={1} flexDirection="column">
      <Box alignItems="center" display="flex" justifyContent="space-between">
        <Typography fontSize={14} fontWeight="bold">
          {title}
        </Typography>
        {multiple && !disableSelectAll && (
          <Link
            fontSize={16}
            fontWeight={600}
            onClick={onSelectAll}
            sx={{
              textDecoration: "none",
            }}
          >
            {buttonLabel}
          </Link>
        )}
      </Box>
      {options.map(
        ({ disabled, label, rightComponent, value: optionValue }) => (
          <Box
            alignItems="center"
            columnGap="8px"
            display="flex"
            key={label}
            px="9px"
            py={0.5}
          >
            <FormControlLabel
              control={
                <Checkbox
                  checked={checkIsItemSelected(optionValue)}
                  disabled={disabled}
                  onChange={(_, checked) =>
                    handleOnChange(optionValue, checked)
                  }
                />
              }
              label={
                <Typography color="#17324D" fontSize={16}>
                  {label}
                </Typography>
              }
            />
            {rightComponent}
          </Box>
        ),
      )}
    </Box>
  );
}

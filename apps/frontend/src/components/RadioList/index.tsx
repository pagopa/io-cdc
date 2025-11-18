import { Box, Button, Divider, Radio, RadioGroup, Stack, Typography } from '@mui/material';

type RadioListItemsProps = {
  label: string;
  subLabel?: string;
  value: string;
  id: string;
};

type RadioListProps = {
  title: string;
  subTitle: string;
  options: RadioListItemsProps[];
  value?: string;
  onSelect: (value: string) => void;
  onSubmit: () => void;
};

const TEXT_COLOR = '#5C6F82';

export const RadioList = ({
  title,
  subTitle,
  options,
  onSelect,
  onSubmit,
  value,
}: RadioListProps) => {
  return (
    <Box display="flex" flexDirection="column" justifyContent="space-between" flex={1}>
      <Stack gap={2}>
        <Stack gap={2}>
          <Typography variant="h2">{title}</Typography>
          <Typography color={TEXT_COLOR} fontSize={16}>
            {subTitle}
          </Typography>
        </Stack>
        <Stack>
          <RadioGroup>
            {options.map(({ label, subLabel, value: dataValue, id }) => (
              <Box key={id}>
                <Stack direction="row">
                  <Radio checked={value === dataValue} onChange={() => onSelect(dataValue)} />
                  <Stack onClick={() => null} gap={0.5} paddingX={1.25} paddingY={2}>
                    <Typography fontSize={16} fontWeight={600}>
                      {label}
                    </Typography>
                    {subLabel && (
                      <Typography fontSize={14} color={TEXT_COLOR}>
                        {subLabel}
                      </Typography>
                    )}
                  </Stack>
                </Stack>
                <Divider />
              </Box>
            ))}
          </RadioGroup>
        </Stack>
      </Stack>
      <Stack width="100%" justifySelf="end">
        <Button variant="contained" onClick={onSubmit}>
          Continua
        </Button>
      </Stack>
    </Box>
  );
};

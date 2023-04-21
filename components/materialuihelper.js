import { Controller } from "react-hook-form";
import { TextField, Select, MenuItem, InputLabel, Hidden } from "@mui/material";

function TextMolecule({ fieldName, label, control, error, helperText }) {
  return (
    <div className="form-group py-3">
      <Controller
        name={fieldName}
        control={control}
        rules={{ required: true }}
        render={({ field }) => (
          <TextField
            {...field}
            label={label}
            fullWidth
            error={error}
            helperText={helperText}
          />
        )}
      />
    </div>
  );
}
function NumberMolecule({ fieldName, label, control, error, helperText }) {
  return (
    <div className="form-group py-3">
      <Controller
        name={fieldName}
        control={control}
        rules={{ required: true }}
        render={({ field }) => (
          <TextField
            {...field}
            label={label}
            type="number"
            fullWidth
            error={error}
            helperText={helperText}
          />
        )}
      />
    </div>
  );
}
function SelectMolecule({
  fieldName,
  label,
  control,
  defaultValue,
  options,
  error,
  helperText,
}) {
  return (
    <div className="form-group py-3">
      <InputLabel id={`${fieldName}-label`}>{label}</InputLabel>
      <Controller
        name={fieldName}
        control={control}
        defaultValue={defaultValue}
        render={({ field }) => (
          <Select
            labelId={`${fieldName}-label`}
            id={fieldName}
            {...field}
            fullWidth
            error={error}
          >
            {options.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        )}
      />
    </div>
  );
}

function HiddenMolecule({ fieldName, control }) {
  return (
    <div className="form-group py-3">
      <Controller
        name={fieldName}
        control={control}
        rules={{ required: true }}
        render={() => <Hidden />}
      />
    </div>
  );
}

export { SelectMolecule, TextMolecule, NumberMolecule, HiddenMolecule };

import { SelectHTMLAttributes } from "react";
import { clsx } from "clsx";

export interface SelectOption {
  value: string;
  label: string;
}

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options: SelectOption[];
  helperText?: string;
  error?: boolean;
  placeholder?: string;
  hideEmptyOption?: boolean;
}

export default function Select({
  id,
  name,
  label,
  value,
  onChange,
  options,
  required = false,
  disabled = false,
  className = "",
  helperText,
  error = false,
  placeholder,
  hideEmptyOption = false,
  ...props
}: SelectProps) {
  return (
    <div className="flex flex-col gap-1 space-y-2">
      {label && (
        <label htmlFor={id} className="text-sm font-medium text-pm-foreground">
          {label} {required && <span className="text-pm-error">*</span>}
        </label>
      )}
      <select
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        disabled={disabled}
        className={clsx(
          "select-pm",
          {
            "input-error": error,
          },
          disabled && "text-pm-muted cursor-default",
          className
        )}
        {...props}
      >
        {!hideEmptyOption && (
          <option value="" className="text-pm-muted bg-pm-background py-2">
            {placeholder || `All ${label || ""}`}
          </option>
        )}
        {options.map((option) => (
          <option key={option.value} value={option.value} className="option-pm">
            {option.label}
          </option>
        ))}
      </select>
      {helperText && (
        <p
          className={clsx("text-sm", error ? "text-pm-error" : "text-pm-muted")}
        >
          {helperText}
        </p>
      )}
    </div>
  );
}

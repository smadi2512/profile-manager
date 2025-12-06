import { forwardRef, InputHTMLAttributes, ReactNode } from "react";
import clsx from "clsx";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  helperText?: string;
  error?: string;
  startIcon?: ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      type,
      id,
      name,
      label,
      value,
      className,
      required = false,
      helperText,
      error,
      startIcon,
      ...props
    },
    ref
  ) => {
    const inputValue = value ?? "";
    const hasStartIcon = !!startIcon;
    return (
      <div className={clsx("flex flex-col gap-1 space-y-2", className)}>
        {label && (
          <label
            htmlFor={id}
            className="text-sm font-medium text-pm-foreground"
          >
            {label} {required && <span className="text-pm-error">*</span>}
          </label>
        )}
        <div className="relative">
          {hasStartIcon && (
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-pm-muted pointer-events-none">
              {startIcon}
            </div>
          )}
          <input
            type={type || "text"}
            id={id}
            name={name}
            ref={ref}
            value={inputValue}
            className={clsx(
              "input w-full transition-colors duration-200",
              error && "input-error",
              hasStartIcon && "pl-10"
            )}
            {...props}
          />
        </div>

        {error && <p className="text-sm text-pm-error">{error}</p>}
        {!error && helperText && (
          <p className="text-sm text-pm-muted">{helperText}</p>
        )}
      </div>
    );
  }
);

export default Input;

import { Input } from "@/shared/components/ui";
import { FilterConfigItem } from "@/shared/types";

interface CheckboxFilterProps {
  filterKey: string;
  config: FilterConfigItem;
  value: string[];
  onChange: (key: string, value: string[]) => void;
  className?: string;
}

export default function CheckboxFilter({
  filterKey,
  config,
  value = [],
  onChange,
  className = "",
}: CheckboxFilterProps) {
  const handleCheckboxChange = (optionValue: string, isChecked: boolean) => {
    const newValues = isChecked
      ? [...value, optionValue]
      : value.filter((v) => v !== optionValue);
    onChange(filterKey, newValues);
  };

  return (
    <div className={`space-y-2 ${className}`}>
      <div className="block text-sm font-medium text-pm-foreground">
        {config.label || filterKey.toString()}
      </div>
      <div id={filterKey} className="flex items-center gap-4">
        {config.options.map((option, index) => {
          const optionValue = String(option);
          const isChecked = value.includes(optionValue);

          return (
            <label
              key={index}
              htmlFor={optionValue}
              className="flex items-center gap-2 cursor-pointer"
            >
              <Input
                type="checkbox"
                id={optionValue}
                name={optionValue}
                checked={isChecked}
                onChange={(e) =>
                  handleCheckboxChange(optionValue, e.target.checked)
                }
                className="rounded border-pm-border text-pm-primary focus:ring-pm-primary"
              />
              <span className="text-sm text-pm-foreground">{optionValue}</span>
            </label>
          );
        })}
      </div>
    </div>
  );
}

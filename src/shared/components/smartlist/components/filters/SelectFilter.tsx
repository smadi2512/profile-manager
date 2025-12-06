import { Select } from "@/shared/components/ui";
import { FilterConfigItem } from "@/shared/types";

interface SelectFilterProps {
  filterKey: string;
  config: FilterConfigItem;
  value: string[];
  onChange: (key: string, value: string[]) => void;
  className?: string;
}

export default function SelectFilter({
  filterKey,
  config,
  value,
  onChange,
  className = "",
}: SelectFilterProps) {
  const selectedValue = value?.[0] || "";

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newValue = event.target.value;
    onChange(filterKey, newValue ? [newValue] : []);
  };

  const options = config.options.map((option) => ({
    value: String(option),
    label: String(option),
  }));

  return (
    <Select
      id={filterKey}
      name={filterKey}
      options={options}
      label={config.label || filterKey.toString()}
      value={selectedValue}
      onChange={handleChange}
      placeholder={
        config.placeholder || `All ${config.label || filterKey.toString()}`
      }
      className={className}
    />
  );
}

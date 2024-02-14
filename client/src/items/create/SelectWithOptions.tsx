interface SelectWithOptionsProps {
  title?: string;
  options: Array<string>;
  onSelect: (arg0: string, arg1: string) => void;
  name: string;
}

const SelectWithOptions: React.FC<SelectWithOptionsProps> = ({
  options,
  onSelect,
  name,
}) => {
  return (
    <select
      defaultValue={options[0]}
      onChange={(e) => onSelect(name, e.target.value)}
      className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
    >
      {options.map((option, index) => (
        <option key={index} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
};

export default SelectWithOptions;

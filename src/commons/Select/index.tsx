const Select = ({ ariaLabel, options }: SelectProps): JSX.Element => {
  const renderOptions = options.map((option) => <option key={option}>{option}</option>);

  return <select aria-label={ariaLabel}>{renderOptions}</select>;
};

export type SelectProps = {
  ariaLabel?: string;
  options: string[];
};

export default Select;

const Select = ({ ariaLabel, options }: Props): JSX.Element => {
  const renderOptions = options.map((option) => <option key={option}>{option}</option>);

  return <select aria-label={ariaLabel}>{renderOptions}</select>;
};

type Props = {
  ariaLabel?: string;
  options: string[];
};

export default Select;

import React from 'react';
import classes from './Select.module.scss';
import Dropdown from 'react-bootstrap/Dropdown';

const Select = (props: SelectProps): JSX.Element => {
  const {
    labelType,
    options,
    activeOptionIndex,
    label = options[0],
    icon = '',
    ariaLabel = '',
  } = props;

  const renderOptions = options.map((option, index) => {
    const isActive = activeOptionIndex === index;
    const isLastElement = index === options.length - 1;

    return (
      <React.Fragment key={option}>
        <Dropdown.Item active={isActive} eventKey={index}>
          {option}
        </Dropdown.Item>
        {!isLastElement && <Dropdown.Divider />}
      </React.Fragment>
    );
  });

  return (
    <Dropdown>
      <Dropdown.Toggle className={classes.toggleButton} variant="outline-main">
        {labelType === 'text' ? (
          label
        ) : (
          <img src={icon} className={classes.toggleButtonIcon} alt={ariaLabel} />
        )}
      </Dropdown.Toggle>
      <Dropdown.Menu>{renderOptions}</Dropdown.Menu>
    </Dropdown>
  );
};

export type SelectProps = {
  labelType: 'icon' | 'text';
  options: string[];
  activeOptionIndex: number;
  icon?: string;
  ariaLabel?: string;
  label?: string;
};

export default Select;

import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import { Form } from 'react-bootstrap';
import classNames from 'classnames';

export const EditInPlace = (props: EditInPlaceProp): JSX.Element => {
  const { inputClassNames, titleClassNames, value, setValue } = props;

  const [isEdited, setIsEdited] = useState(false);
  const classes = classNames(...inputClassNames);
  const titleClasses = classNames(...titleClassNames);
  const inputRef = useRef<HTMLInputElement>(null);
  const save = () => {
    setIsEdited(false);
    setValue(inputRef.current?.value as string);
  };

  const edit = () => {
    setIsEdited(true);
  };

  const onKeyDown = ({ key }: React.KeyboardEvent) => {
    if (key === 'Enter') {
      save();
    }
  };

  useEffect(() => {
    if (isEdited) {
      inputRef.current?.focus();
    }
  }, [isEdited]);

  if (isEdited) {
    return (
      <Form.Control
        ref={inputRef}
        className={classes}
        onBlur={save}
        onKeyDown={onKeyDown}
        defaultValue={value}
      ></Form.Control>
    );
  }

  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions
    <h4 className={titleClasses} onClick={edit}>
      {value}
    </h4>
  );
};

type EditInPlaceProp = {
  inputClassNames: string[];
  value: string;
  titleClassNames: string[];
  setValue: Dispatch<SetStateAction<string>>;
};

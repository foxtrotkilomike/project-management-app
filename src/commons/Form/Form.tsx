import classes from './Form.module.scss';
import classNames from 'classnames';
import { useForm } from 'react-hook-form';
import { ElementType } from 'react';
import { FormInputNames, IFormField } from '../../config/types';
import { Button, Form as BootstrapForm } from 'react-bootstrap';
import { buttonsText as buttonsTextDefault } from '../../config/data';

export const Form = (props: IFormProps) => {
  const { fields, onSubmit, onCancel, buttonsText, fullPage = false } = props;
  const controlClassName = classNames(classes.control, {
    [classes.control_fullWidth]: fullPage,
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInputNames>();

  const getControlProps = (field: IFormField) => {
    const { type, name, placeholder, registerOptions, rows } = field;
    return type === 'textarea'
      ? {
          as: 'textarea' as ElementType,
          rows,
          placeholder,
          isInvalid: !!errors[name],
          ...register(name, registerOptions),
        }
      : {
          type: type,
          placeholder,
          isInvalid: !!errors[name],
          ...register(name, registerOptions),
        };
  };

  const renderFields = fields.map((field) => {
    return (
      <div className={controlClassName} key={field.name}>
        <BootstrapForm.Control {...getControlProps(field)} />
        <BootstrapForm.Control.Feedback type="invalid" className={classes.error}>
          {errors[field.name]?.message}
        </BootstrapForm.Control.Feedback>
      </div>
    );
  });

  return (
    <div className={classes.formWrapper}>
      <BootstrapForm onSubmit={handleSubmit((data) => onSubmit(data))}>
        {renderFields}
        <div className={classes.buttons}>
          <Button variant="danger" className={classes.cancel} onClick={onCancel}>
            {buttonsText?.cancel || buttonsTextDefault.cancel}
          </Button>
          <Button variant="success" type="submit" className={classes.submit}>
            {buttonsText?.submit || buttonsTextDefault.submit}
          </Button>
        </div>
      </BootstrapForm>
    </div>
  );
};

interface IFormProps {
  fields: IFormField[];
  onSubmit: (data: FormInputNames) => void;
  onCancel: () => void;
  buttonsText?: {
    cancel: string;
    submit: string;
  };
  fullPage?: boolean;
}

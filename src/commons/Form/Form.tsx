import classes from './Form.module.scss';
import { useForm } from 'react-hook-form';
import { IFormField, FormType, ModalForm } from '../../config/types';
import { Button, Form as BootstrapForm } from 'react-bootstrap';
import { buttonsText } from '../../config/data';
import { ElementType } from 'react';

export const Form = (props: IFormProps) => {
  const { fields, onSubmit, onCancel } = props;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ModalForm>();

  const getControlProps = (field: IFormField) => {
    const { type, name, placeholder, registerOptions, rows } = field;
    if (type === 'textarea') {
      return {
        as: 'textarea' as ElementType,
        rows,
        placeholder,
        isInvalid: !!errors[name],
        ...register(name, registerOptions),
      };
    } else {
      return {
        type: type,
        placeholder,
        isInvalid: !!errors[name],
        ...register(name, registerOptions),
      };
    }
  };

  const renderFields = fields.map((field) => {
    return (
      <div className={classes.control} key={field.name}>
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
            {buttonsText.cancel}
          </Button>
          <Button variant="success" type="submit" className={classes.submit}>
            {buttonsText.submit}
          </Button>
        </div>
      </BootstrapForm>
    </div>
  );
};

interface IFormProps {
  fields: IFormField[];
  type: FormType;
  onSubmit: (data: ModalForm) => void;
  onCancel: () => void;
}

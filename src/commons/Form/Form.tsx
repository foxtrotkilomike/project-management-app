import classes from './Form.module.scss';
import { useForm } from 'react-hook-form';
import { IFormField } from '../../config/types';
import { Button, Form as BootstrapForm } from 'react-bootstrap';
import { buttonsText } from '../../config/data';
import { ElementType } from 'react';

export const Form = (props: IFormProps) => {
  const { fields, onFormSubmit } = props;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ModalForm>();

  const onSubmit = (data: ModalForm) => {
    //TODO: implement onSubmit
    console.log(data);

    onFormSubmit();
  };

  const getControlProps = (field: IFormField) => {
    const { type, name, placeholder, registerOptions } = field;
    if (type === 'textarea') {
      return {
        as: 'textarea' as ElementType,
        rows: 6,
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
          <Button variant="danger" className={classes.cancel}>
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
  onFormSubmit: () => void;
}

type FormType = 'column' | 'task' | 'board';

type ModalForm = {
  title: string;
  description?: string;
};
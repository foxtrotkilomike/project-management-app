import classes from './Form.module.scss';
import { useForm } from 'react-hook-form';
import { IFormField } from '../../config/types';
import { Button, Form as BootstrapForm } from 'react-bootstrap';
import { buttonsText } from '../../config/data';

export const Form = (props: IFormProps) => {
  const { fields, type: formType, onFormSubmit } = props;

  const getType = () => {
    switch (formType) {
      case 'column':
        return { title: '' };
      case 'task':
        return { title: '', description: '' };
    }
  };

  const returned = getType();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<typeof returned>();

  const onSubmit = (data: typeof returned) => {
    //TODO: implement onSubmit
    console.log(data);

    onFormSubmit();
  };

  const renderFields = fields.map((field) => {
    const { type, name, placeholder, registerOptions } = field;
    return (
      <div className={classes.control} key={name}>
        <BootstrapForm.Control
          as={type === 'textarea' ? 'textarea' : undefined}
          rows={type === 'textarea' ? 6 : undefined}
          type={type !== 'textarea' ? type : undefined}
          placeholder={placeholder}
          isInvalid={!!errors[name]}
          {...register(name, registerOptions)}
        />
        <BootstrapForm.Control.Feedback type="invalid" className={classes.error}>
          {errors[name]?.message}
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
  type: 'column' | 'task';
  onFormSubmit: () => void;
}

import Form from '../Form';
import { creationFormData } from '../../config/data';

export const ColumnCreateForm = () => {
  return <Form {...creationFormData['column']} />;
};

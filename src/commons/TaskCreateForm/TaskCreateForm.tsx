import Form from '../Form';
import { creationFormData } from '../../config/data';

export const TaskCreateForm = () => {
  return <Form {...creationFormData['task']} />;
};

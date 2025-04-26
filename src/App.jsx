import "./App.css";
import { Formik, Form as FormikForm, Field, ErrorMessage, useFormikContext } from 'formik';
import styled from "styled-components";
import * as Yup from 'yup';

const Form = styled(FormikForm)`
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 300px;ls
  margin: 50px auto;
  padding: 24px;
  border: 1px solid #ccc;
  border-radius: 12px;
  background-color: #f9f9f9;
`;

const Input = styled(Field)`
  padding: 12px;
  border: 1px solid #bbb;
  border-radius: 8px;
  font-size: 16px;
`;

const ErrorText = styled.div`
  color: red;
  font-size: 14px;
  margin-top: -8px;
  margin-bottom: 8px;
`;

const Button = styled.button`
  padding: 12px;
  border: none;
  border-radius: 8px;
  background-color: #007bff;
  color: white;
  font-size: 16px;
`;

function MyForm() {
  const { handleReset } = useFormikContext();

  return (
    <Form>
      <Input name="name" type="text" placeholder="Enter your name" />
      <ErrorMessage name="name" component={ErrorText} />
      
      <Input name="phone" type="text" placeholder="Enter your phone number" />
      <ErrorMessage name="phone" component={ErrorText} />
      
      <Button type="submit">Register</Button>
      <Button type="button" onClick={handleReset} style={{ backgroundColor: '#6c757d', marginTop: '8px' }}>
        Reset
      </Button>
    </Form>
  );
}

function App() {
  const validationSchema = Yup.object({
    name: Yup.string()
      .required('Name is required')
      .min(2, 'Name must be at least 2 characters'),
    phone: Yup.string()
      .required('Phone number is required')
      .matches(/^[0-9]{10}$/, 'Phone number must be exactly 10 digits'),
  });

  return (
    <Formik
      initialValues={{ name: '', phone: '' }}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        console.log(values);
        alert(`Registered Name: ${values.name}, Phone: ${values.phone}`);
      }}
    >
      <MyForm />
    </Formik>
  );
}

export default App;

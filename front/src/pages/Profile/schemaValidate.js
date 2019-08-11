import * as Yup from 'yup';

const schema = Yup.object().shape({
  name: Yup.string()
    .min(3, 'It should have at least 3 characters.')
    .max(100, 'What a long name, we only support 100 characters')
    .required('Your full name is very important for the account creation.'),
  email: Yup.string()
    .email('Is this e-mail right?')
    .required('You need to tell us your e-mail, so that we can contact you.'),
  state: Yup.string().required('We need to know your state'),
  oldPassword: Yup.string().when('password', (password, field) =>
    password
      ? field.required('You need to tell your actual password before change')
      : field
  ),
  password: Yup.string(),
  confirmPassword: Yup.string().when('password', (password, field) =>
    password
      ? field.oneOf(
          [Yup.ref('password')],
          'It seems the passwords are different.'
        )
      : field
  ),
});

export default function schemaValidate(params) {
  return schema.validate(params, { abortEarly: false });
}

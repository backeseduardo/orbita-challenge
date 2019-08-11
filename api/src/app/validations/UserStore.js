import * as Yup from 'yup';

export default async (req, res, next) => {
  try {
    const schema = Yup.object().shape({
      name: Yup.string()
        .min(3)
        .max(100)
        .required(),
      email: Yup.string()
        .email()
        .required(),
      state: Yup.string()
        .min(2)
        .max(2)
        .required(),
      password: Yup.string()
        .min(8)
        .max(16)
        .required(),
      confirmPassword: Yup.string()
        .required()
        .oneOf(
          [Yup.ref('password')],
          'confirmationPassword different than password'
        ),
    });

    await schema.validate(req.body, { abortEarly: false });

    return next();
  } catch (err) {
    return res.status(400).json({
      error: 'validation_fails',
      message: err.inner.map(error => error.message).join(', '),
    });
  }
};

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
      oldPassword: Yup.string().min(6),
      password: Yup.string()
        .min(8)
        .max(16)
        .when('oldPassword', (oldPassword, field) =>
          oldPassword ? field.required() : field
        ),
      confirmPassword: Yup.string().when('password', (password, field) =>
        password ? field.required().oneOf([Yup.ref('password')]) : field
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

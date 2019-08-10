import * as Yup from 'yup';

export default async (req, res, next) => {
  try {
    const schema = Yup.object().shape({
      page: Yup.number().required(),
    });

    await schema.validate(req.query, { abortEarly: false });

    return next();
  } catch (err) {
    return res.status(400).json({
      error: 'validation_fails',
      message: err.inner.map(error => error.message).join(', '),
    });
  }
};

import Installation from '../models/Installation';

class InstallationController {
  async index(req, res) {
    const limit = 20;
    const { page } = req.query;

    const installations = await Installation.findAndCountAll({
      where: {
        state: req.userState,
      },
      offset: (page - 1) * limit,
      limit,
    });

    const numPages = Math.ceil(installations.count / limit);

    return res.json({
      limit,
      numPages,
      ...installations,
    });
  }
}

export default new InstallationController();

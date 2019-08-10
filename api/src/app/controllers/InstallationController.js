import Database from '../../database';
import Installation from '../models/Installation';

class InstallationController {
  async index(req, res) {
    const limit = 20;
    const { page } = req.query;
    const { userState } = req;

    const installations = await Installation.findAndCountAll({
      where: {
        state: userState,
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

  async indexCount(req, res) {
    const { userState } = req;

    const count = await Installation.count({
      where: {
        state: userState,
      },
    });

    return res.json({ count, state: userState });
  }

  async indexMostExpensive(req, res) {
    const { userState } = req;

    const data = await Installation.findOne({
      where: {
        state: userState,
      },
      order: [['cost', 'desc']],
      raw: true,
    });

    return res.json(data);
  }

  async indexTopMonths(req, res) {
    const sequelize = Database.getConnection();

    const response = await sequelize.query(
      `select to_char(date, 'YYYY') as year,
        to_char(date, 'MM') as month,
        count(*) as count
      from installations
      where state like '${req.userState}'
      group by 1, 2
      order by 3 desc
      fetch next 3 rows only`,
      {
        type: sequelize.QueryTypes.SELECT,
        raw: true,
      }
    );

    return res.json(
      response.map(row => ({
        ...row,
        count: parseInt(row.count, 10),
      }))
    );
  }
}

export default new InstallationController();

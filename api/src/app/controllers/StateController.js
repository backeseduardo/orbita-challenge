import Installation from '../models/Installation';

class StateController {
  async index(req, res) {
    const distinct = await Installation.aggregate('state', 'DISTINCT', {
      plain: false,
    });

    const states = distinct.map(item => item.DISTINCT).sort();

    return res.json(states);
  }
}

export default new StateController();

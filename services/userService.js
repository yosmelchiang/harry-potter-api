class User {
  constructor(db) {
    this.user = db.models.User;
  }

  async get(name) {
    try {
      return await this.user.findOne({
        where: {
          name
        }
      });
    } catch (err) {
      throw err;
    }
  }
}

module.exports = new User(require('../models'));

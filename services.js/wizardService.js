class Wizard {
  constructor(db) {
    this.wizard = db.models.Wizard;
  }

  //GET
  async getAll() {
    try {
      return await this.wizard.findAll();
    } catch (err) {
      console.error(err);
      throw err;
    }
  }

  //POST
  async create(name, houseId) {
    try {
      return await this.wizard.create({ name, HouseId: houseId });
    } catch (err) {
      throw err;
    }
  }

  //PUT
  async update(id, name, houseId) {
    try {
      await this.wizard.update(
        { name, HouseId: houseId },
        {
          where: {
            id
          }
        }
      );
      const updatedWizard = await this.wizard.findOne({ where: { id } })

      if(!updatedWizard) throw new Error('Wizard not found')
      return updatedWizard
    } catch (err) {
      throw err;
    }
  }

  //DELETE
  async remove(id) {
    try {
      const deletedWizard = await this.wizard.destroy({where: { id }})
      if(!deletedWizard) throw new Error('Wizard not found')
      return deletedWizard
    } catch(err) {
      throw err
    }
  }
}

module.exports = new Wizard(require('../models'));

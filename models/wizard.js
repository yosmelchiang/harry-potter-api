module.exports = (db, DataTypes) => {
  const Wizard = db.define('Wizard', {
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
      validate: {
        notEmpty: { msg: 'Name is required'}
      }
    },
    gender: {
      type: DataTypes.STRING(10),
      allowNull: false
    },
    ancestry: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    patronus: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    isDarkWizard: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },

  }, {
    timestamps: false
  })

  Wizard.associate = (models) => {
    Wizard.belongsTo(models.House)
    Wizard.belongsToMany(models.Spell, { through: 'wizard_spell', timestamps: false})
  }

  return Wizard
}
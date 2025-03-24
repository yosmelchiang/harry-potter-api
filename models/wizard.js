module.exports = (db, DataTypes) => {
  const Wizard = db.define('Wizard', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    gender: {
      type: DataTypes.STRING,
      allowNull: false
    },
    ancestry: {
      type: DataTypes.STRING,
      allowNull: false
    },
    patronus: {
      type: DataTypes.STRING,
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
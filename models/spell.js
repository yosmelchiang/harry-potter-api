module.exports = (db, DataTypes) => {
  const Spell = db.define('Spell', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    timestamps: false
  })

  Spell.associate = (models) => {
    Spell.belongsToMany(models.Wizard, { through: 'wizard_spell', timestamps: false})
  }
  return Spell
}
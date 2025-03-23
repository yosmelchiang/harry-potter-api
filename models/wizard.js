module.exports = (db, DataTypes) => {
  const Wizard = db.define('Wizard', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    timestamps: false
  })

  Wizard.associate = (models) => {
    Wizard.belongsTo(models.House)
  }

  return Wizard
}
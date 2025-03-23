module.exports = (db, DataTypes) => {
  const House = db.define('House', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    timestamps: false
  })

  House.associate = (models) => {
    House.hasOne(models.Wizard)
  }

  return House
}
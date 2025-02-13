module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      role: {
        type: DataTypes.STRING,
        defaultValue: "Employee",
      },
      ptoBalance: {
        type: DataTypes.INTEGER,
        defaultValue: 15,
      },
      sickLeaveBalance: {
        type: DataTypes.INTEGER,
        defaultValue: 10,
      },
    },
    {
      timestamps: true,
    }
  );

  // Define associations here
  User.associate = (models) => {
    User.hasMany(models.PTORequest, { foreignKey: "userId", as: "ptoRequests" });
  };

  return User;
};
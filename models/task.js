'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Task extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Task.belongsTo(models.User, {foreignKey: "UserId"})
    }
  };
  Task.init({
    title: {
      type: DataTypes.STRING,
    validate: {
      notEmpty: {
        args: true,
        msg: "Title cannot be empty"
      }
    }},
    description: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: "Description cannot be empty"
        }
    }},
    category: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Task',
  })
  Task.beforeCreate((task, option) => {
    if(!task.category) task.category = "Backlog"
  });
  return Task;
};
'use strict';
const {
  Model
} = require('sequelize');
const { hashPassword } = require('../helpers/bcrypt')
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Task, {foreignKey: "UserId"})
    }
  };
  User.init({
    name:{
      type: DataTypes.STRING,
      unique: true,
      validate: {
        notEmpty: {
         args: true,
         msg: 'Please write your name'
       }
      }
     },
    email:{
      type: DataTypes.STRING,
      unique: true,
      validate: {
        isEmail: {
          args: true,
          msg: "Invalid email format"
        },
        notEmpty: {
         args: true,
         msg: 'Email is required'
       }
      }
     },
     password: {
       type: DataTypes.STRING,
       unique: true,
       validate: {
         notEmpty: {
           args: true,
           msg: "Password is require"
         }
       }}
  }, {
    sequelize,
    modelName: 'User',
  })
  User.beforeCreate((user, option) => {
    user.password = hashPassword(user.password)
  });
  return User;
};
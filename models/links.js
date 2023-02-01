'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class links extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  links.init({
    long_url: DataTypes.STRING,
    short_url: DataTypes.STRING,
    num_access: DataTypes.INTEGER,
    last_time_visited: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'links',
  });
  return links;
};
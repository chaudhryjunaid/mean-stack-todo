'use strict';

module.exports = function(sequelize, DataTypes) {

	var Todo = sequelize.define('Todo', {
			item: { type:DataTypes.STRING, allowNull:false }
		},
		{
			associate: function(models){
				Todo.belongsTo(models.User);
			}
		}
	);

	return Todo;
};

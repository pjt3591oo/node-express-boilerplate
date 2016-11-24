"use strict";

module.exports = function(sequelize, DataTypes) {
    var user = sequelize.define("user", {
        userName :   DataTypes.STRING

    }, {
        classMethods: {
            associate: function(models) {

            }
        }
    })
    ;

    return user;
};

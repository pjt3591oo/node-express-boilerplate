"use strict";

module.exports = function(sequelize, DataTypes) {
    var play = sequelize.define("play", {
        playName :   DataTypes.STRING

    }, {
        classMethods: {
            associate: function(models) {

            }
        }
    })
    ;

    return play;
};

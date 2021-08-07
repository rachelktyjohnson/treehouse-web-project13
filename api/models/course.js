const {Model, DataTypes} = require('sequelize');

module.exports = (sequelize) => {
    class Course extends Model{}

    //create the course structure!
    Course.init({
        title: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: "title cannot be empty",
                },
                notNull: {
                    msg: "title field must exist"
                }
            }
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: "description cannot be empty",
                },
                notNull: {
                    msg: "description field must exist"
                }
            }
        },
        estimatedTime: DataTypes.STRING,
        materialsNeeded: DataTypes.STRING
    }, {sequelize})

    //this links Course up to Person
    //a Course belongs to a Person
    //and it matches up at userId
    Course.associate = (models) => {
        Course.belongsTo(models.User, {
            as: 'teacher',
            foreignKey: {
                fieldName: 'userId'
            }
        })
    }

    return Course;
}

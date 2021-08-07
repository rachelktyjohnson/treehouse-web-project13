const express = require('express');
let router = express.Router();

const {User, Course} = require('./models');
const {asyncHandler} = require('./middleware/async-handler');
const {authenticateUser} = require("./middleware/auth-user");

////////////////////// USER ROUTES //////////////////////

//GET the current user and returns a full Object including courses. Must come with AUth.
router.get('/users', authenticateUser, asyncHandler( async (req, res)=>{
    const user = req.currentUser;

    res.status(200).json({
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        emailAddress: user.emailAddress,
        teacher: user.teacher
    });
}))

//CREATE a new User. Will make sure the email doesn't already exist.
router.post('/users', asyncHandler( async (req,res) => {
    try{
        await User.create(req.body);
        res.status(201).location('/').end();
    } catch (error) {
        if (error.name === 'SequelizeValidationError' || error.name === 'SequelizeUniqueConstraintError') {
            const errors = error.errors.map(err => err.message);
            res.status(400).json({ errors });
        } else {
            throw error;
        }
    }

}))


////////////////////// COURSE ROUTES //////////////////////

//GET a list of all Courses, excluding the 2 time fields, including the teacher that the course belongs to.
router.get('/courses', asyncHandler(async(req,res)=>{
    let courses = await Course.findAll({
        include:[
            {
                model: User,
                as: 'teacher',
                attributes: ['firstName', 'lastName', 'emailAddress']
            }
        ],
        attributes: {
            exclude: ['createdAt', 'updatedAt']
        }
    });
    res.status(200).json(courses);
}))

//GET a single, particular course by ID. Excludes 2 time fields. Includes teacher/User
router.get('/courses/:id', asyncHandler(async(req,res)=>{
    let course = await Course.findByPk(req.params.id, {
        include: [
            {
                model: User,
                as: 'teacher',
                attributes: ['firstName', 'lastName', 'emailAddress']
            }
        ],
        attributes: {
            exclude: ['createdAt', 'updatedAt']
        }
    });
    res.status(200).json(course);
}))

//CREATE a course. Must be Authenticated/logged in
router.post('/courses', authenticateUser, asyncHandler(async (req,res)=> {
    try{
        let course = await Course.create(req.body);
        res.status(201)
            .location(`/courses/${course.id}`)
            .end()
    } catch (error) {
        if (error.name === 'SequelizeValidationError' || error.name === 'SequelizeUniqueConstraintError') {
            const errors = error.errors.map(err => err.message);
            res.status(400).json({ errors });
        } else {
            throw error;
        }
    }
}))

//UPDATES a course. Must be authenticated/logged in
router.put('/courses/:id', authenticateUser, asyncHandler( async (req,res) => {
    let course = await Course.findByPk(req.params.id);
    const user = req.currentUser;
    if (course.userId !== user.id){
        res.status(403).json({
            error: "User is not the owner of the course"
        })
    } else {
        try {
            await course.update(req.body);
            res.status(204).end();
        } catch (error) {
            if (error.name === 'SequelizeValidationError' || error.name === 'SequelizeUniqueConstraintError') {
                const errors = error.errors.map(err => err.message);
                res.status(400).json({ errors });
            } else {
                throw error;
            }
        }
    }

}))

//DELETE a course by ID. Must be authenticated/logged-in
router.delete('/courses/:id', authenticateUser, asyncHandler(async (req,res,)=>{
    let course = await Course.findByPk(req.params.id);
    const user = req.currentUser;
    if (course.userId !== user.id){
        res.status(403).json({
            error: "User is not the owner of the course"
        })
    } else {
        await course.destroy();
        res.status(204).end()
    }
}))



module.exports = router;

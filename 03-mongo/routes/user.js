const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");
const { User, Course } = require("../db");

// User Routes
router.post('/signup', async (req, res) => {
    // Implement user signup logic
    const username = req.body.username;
    const password = req.body.password;
    await User.create({
        username,
        password,
        purchases : []
    })
    res.send("user created successfully")
});

router.get('/courses',async (req, res) => {
    // Implement listing all courses logic
    const response = await Course.find({
        
    })
    res.send({response})
});

router.post('/courses/:courseId', userMiddleware, async (req, res) => {
    // Implement course purchase logic
    const courseId = req.params.courseId;
    const username = req.headers.username;
    await User.updateOne({
        username : username
    },
    {
        "$push":{
            purchases : courseId
        }
    })
    return res.json({
        msg : "Purchase Completed!!!"
    })
});
router.get('/purchasedCourses', userMiddleware, async (req, res) => {
    // Implement fetching purchased courses logic
    const userId = req.headers.username;
    const response = await User.find({username : username}).populate("purchases")
    return {
        "courseList" : response
    }
});

module.exports = router
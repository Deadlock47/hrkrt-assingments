const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const router = Router();
const {Admin, Course} = require("../db")

// Admin Routes
router.post('/signup',async (req, res) => {
    // Implement admin signup logic
    const username = req.body.username;
    const password = req.body.password;

    await Admin.create({
        username,
        password
    })

    return res.send("User created Successfully")


});

router.post('/courses', adminMiddleware, async (req, res) => {
    // Implement course creation logic
    try {
        const title = req.body.title;
        const description = req.body.description;
        const price = req.body.price;
        console.log("sdfdsfsdfsdf")
        const newCourse = await Course.create({
            title,
            description,
            price
        })
        return res.send({msg : "New Course Added Successfully" , course_id : newCourse._id})
    } catch (err) {
        return res.send({msg : err.message})
    }

});

router.get('/courses', adminMiddleware, async(req, res) => {
    // Implement fetching all courses logic
    const courses = await Course.find({});
    return res.json({
        courses 
    })

});

module.exports = router;
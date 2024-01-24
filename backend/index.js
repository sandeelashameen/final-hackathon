const express = require('express')
const PORT = 8080
const app = express()
const path = require('path')
const mongoose = require('mongoose');
const cors = require("cors");
const User = require('./userSchema');
const postModel = require("./titleSchema");
const bcrypt = require('bcryptjs');
mongoose.connect('mongodb+srv://admin:admin@sandeela.qpbwdqa.mongodb.net/myFirstDatabase?retryWrites=true&w=majority');



app.use(cors(["localhost:5000", "localhost:3000"]))
app.use(express.json())
app.use('/', express.static(path.join(__dirname, 'web/build')))
app.use('/signup', express.static(path.join(__dirname, 'web/build')))
app.use('/dashboard', express.static(path.join(__dirname, 'web/build')))


app.get("/", (req, res, next) => {
    // res.sendFile(path.join(__dirname, "./web/build/index.html"))
    res.redirect("/")
})
app.post('/api/v1/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            // console.log("required field missing");
            return res.status(403).json("required field missing");
        }

        // console.log("req.body: ", req.body);
        const userLogin = await User.findOne({ email: email });

        if (userLogin) {
            const isMatch = await bcrypt.compare(password, userLogin.password)
            if (!isMatch) {
                res.status(400).json({ error: "Invalid Credientials" })

            } else {
                res.json({ message: 'user login successfully' })
            }
        } else {
            res.status(400).json({ error: "Invalid Credientials" })
        }


    } catch (err) {
        console.log(err);
    }

})
app.post('/api/v1/signup', async (req, res) => {
    try {
        const { name, address, email, password } = req.body;

        if (!email ||
            !password ||
            !name || !address) {
            console.log("required field missing");
            return res.status(403).json({ error: "required field missing" });
        }

        const userExit = await User.findOne({ email: email });
        if (userExit) {
            return res.status(420).json({ error: "Email Already exists" });
        }

        const user = new User({ name, address, email, password })

        // await user.save();
        await user.save(() => {
            console.log("data saved")
            // res.send('profile created')
        })
        res.status(201).json({ message: "user registered successfully" });


    } catch (err) {
        console.log(err);
    }

})

app.post('/api/v1/profile', (req, res) => {
    const email = req.body.email;
    User.find({ email: email }, (err, data) => {
        if (err) {
            res.send('status 500, error in getting data base')
        }
        else {
            res.send(data)
        }
    })
});


app.post("/api/v1/create", (request, response) => {
    try {
        const body = request.body;
        postModel.create(body, (error, data) => {
            if (error) {
                throw error;
            } else {
                console.log(data);
                response.send(data);
            }
        });
    } catch (error) {
        response.send(`Got an error `, error.message);
    }
});

// app.get("/api/v1/posts", (request, response) => {
//     try {
//         const { title } = request.headers;
//         const query = {};
//         if (title) {
//             query.title = title;
//         }
//         postModel.find(query, (error, data) => {
//             if (error) {
//                 throw error;
//             } else {
//                 response.send(JSON.stringify(data));
//             }
//         });
//     } catch (error) {
//         response.send(`Got an error during get posts `, error.message);
//     }
// });
app.delete('/api/v1/profile', (req, res) => {
    res.send('profile deleted')
})
app.put('/api/v1/profile', (req, res) => {
    res.send('profile updated')
})

router.post('/add_project', async (req, res) => {
    try {
        const newProjects = new Projects({

            Projectname: req.body.Projectname,
            ProjectImage: req.body.ProjectImage,
            ProjectDescription: req.body.ProjectDescription,
            ProjectURL: req.body.ProjectURL,
            DeveloperName: Strireq.body.DeveloperName,

        });
        await newProjects.save();
        console.log("Data Saved");
        res.send('Project created');
    } catch (error) {
        console.error("Error saving user:", error);
        res.status(500).send('Internal Server Error');
    }
});
router.get('/api/v1/project', async (req, res) => {
    try {
        const data = await Projets.find({});
        res.send(data);
    } catch (error) {
        console.error("Error fetching data:", error);
        res.status(500).send("Internal Server Error");
    }
});
router.get('/api/v1/project', async (req, res) => {
    try {
        const data = await Projets.find({});
        res.send(data);
    } catch (error) {
        console.error("Error fetching data:", error);
        res.status(500).send("Internal Server Error");
    }
});

app.listen(PORT, () => {
    console.log(`Example app listening at http://localhost:${PORT}`)
})
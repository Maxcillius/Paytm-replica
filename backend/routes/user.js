const express = require("express");
const zod = require("zod");
const jwt = require("jsonwebtoken");
const { scryptSync, randomBytes, timingSafeEqual } = require("crypto");
const router = express.Router();
const { User, Account } = require("../db");
const JWT_TOKEN = require("../config");
const { authMiddleware } = require("../middleware");

const signupSchema = zod.object({
    username: zod.string().email(),
    password: zod.string(),
    firstname: zod.string(),
    lastname: zod.string(),
});

const signinSchema = zod.object({
    username: zod.string(),
    password: zod.string(),
});

const updateData = zod.object({
    password: zod.string().optional(),
    firstname: zod.string().optional(),
    lastname: zod.string().optional(),
});

function Hash(password) {
    const salt = randomBytes(16).toString("hex");
    const hashedPassword = scryptSync(password, salt, 64).toString("hex");

    return salt + ":" + hashedPassword;
}

router.post("/signup", async (req, res) => {
    const body = req.body;
    const { success } = signupSchema.safeParse(body);
    if (!success) {
        return res.json({
            msg: "Email already taken / Incorrect inputes",
        });
    }

    const user = await User.findOne({
        username: body.username,
    });

    if (user) {
        return res.json({
            msg: "Email already taken",
        });
    }

    const hased = Hash(body.password);

    const dbUser = await User.create({
        username: body.username,
        password: hased,
        firstname: body.firstname,
        lastname: body.lastname,
    });

    const userId = dbUser._id;

    const account = await Account.create({
        userId,
        balance: 1 + Math.random() * 10000,
    });

    const token = jwt.sign(
        {
            userId: dbUser._id,
        },
        JWT_TOKEN
    );
    res.json({
        msg: "User created successfully",
        token: token,
    });
});

router.post("/signin", async (req, res) => {
    body = req.body;

    const { success } = signinSchema.safeParse(body);
    if (!success) {
        res.json({
            msg: "Enter a valid inputs",
        });
    }

    const user = await User.findOne({
        username: body.username,
    });

    if (!user) {
        return res.status(404).json({
            msg: "User with this username not found",
        });
    }

    const [salt, key] = user.password.split(":");
    const hashedBuffer = scryptSync(body.password, salt, 64);
    const keyBuffer = Buffer.from(key, "hex");
    const match = timingSafeEqual(hashedBuffer, keyBuffer);

    if (!match) {
        return res.status(401).json({
            msg: "Error while logging in",
        });
    }

    const token = jwt.sign(
        {
            userId: user._id,
        },
        JWT_TOKEN
    );

    res.status(200).json({
        token: token,
    });
});

router.put("/", authMiddleware, async (req, res) => {
    const body = req.body;
    const { success } = updateData.safeParse(body);
    if (!success) {
        return res.status(411).json({
            msg: "Error while updating information",
        });
    }

    await User.updateOne(body, {
        _id: body.userId,
    });

    res.json({
        msg: "Updated successfully",
    });
});

router.get("/bulk", async (req, res) => {
    const filter = req.query.filter || "";

    const users = await User.find({
        $or: [
            {
                firstname: {
                    $regex: filter,
                },
            },
            {
                lastname: {
                    $regex: filter,
                },
            },
        ],
    });

    res.json({
        user: users.map((user) => ({
            username: user.username,
            firstname: user.firstName,
            lastname: user.lastName,
            _id: user._id,
        })),
    });
});

module.exports = router;

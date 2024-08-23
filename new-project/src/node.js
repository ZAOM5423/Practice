import express from "express"
import mongoose from "mongoose"
import cors from "cors"
import crypto from "crypto"
import jwt from "jsonwebtoken"
import md5 from "js-md5"
import { v4 as uuidv4 } from 'uuid'

const app = express();

app.use(cors());

app.use(express.json()); // 解析JSON请求体

app.use(express.urlencoded({ extended: false })); // 解析URL编码的请求体

const url = "mongodb://localhost:27017";

// 生成256位的密钥（32字节）
const secretKey = crypto.randomBytes(32).toString('hex');

mongoose.connect(url);

mongoose.connection.on("open", () => {
    console.log("数据库连接成功");
})

mongoose.connection.on("error", () => {
    console.log("数据库连接失败");
})

const userSchema = new mongoose.Schema({
    id: String,
    phone: String,
    password: String
})

const user = mongoose.model("user", userSchema);

const salt = "3160c983de13029ce6101ba26fc71563";

app.post("/api/login", async (req, res) => {
    const { phone, password, verify } = req.body;
    if (verify === md5("zaom" + salt)) {
        // 检查请求体中是否包含手机号和密码
        if (!phone || !password) {
            return res.send({
                status: 400,
                success: false,
                message: '缺少手机号或密码'
            });
        }
        try {
            // 在数据库中查找用户
            const findUser = await user.findOne({ phone, password });

            if (findUser) {
                // 用户找到，返回登录成功的信息
                const token = jwt.sign(
                    { phone: findUser.phone },
                    secretKey,
                    {
                        algorithm: 'HS256',
                        expiresIn: "1h"
                    }
                )
                res.send({
                    status: 200,
                    success: true,
                    message: "登录成功",
                    user: {
                        phone: findUser.phone,
                        token: token
                    }
                });
            } else {
                // 用户未找到，返回认证失败的信息
                res.send({
                    status: 401,
                    success: false,
                    message: "手机号或密码错误"
                });
            }
        } catch (error) {
            console.error('查询数据时出错:', error);
            // 服务器错误，返回相应的信息
            res.send({
                status: 500,
                success: false,
                message: '服务器内部错误'
            });
        }
    }
});

app.post("/api/register",async (req, res) => {
    const { phone,password } = req.body;
    try {
        const insertUser = await user.create({
            id: uuidv4(),
            phone: phone,
            password: password
        });
        if(insertUser){
            res.send({
                status: 200,
                success: true,
                message: "注册成功"
            })
        }else{
            res.send({
                status: 401,
                success: false,
                message: "注册失败"
            })
        }
    }catch(error){
        console.error('插入数据时出错:', error);
        // 服务器错误，返回相应的信息
        res.send({
            status: 500,
            success: false,
            message: "服务器内部错误"
        })
    }
})

app.listen(6699, () => {
    console.log("端口开启成功");
})
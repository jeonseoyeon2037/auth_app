/**
 * authController.js
 * 사용자 회원가입 컨트롤러
 */

const path = require("path");
const database = require("../database/database");
const bcrypt = require("bcrypt");
const {v4:uuidv4} = require("uuid");
const fs = require("fs");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
    const { username, email, password } = req.body;
    const profileImage = req.file;

    // console.log(profileImage);

    try {
        const rows = await database.query(
        "SELECT * FROM users WHERE email = $1",
        [email]
        );

        if (rows.rows.length > 0) {
        return res
            .status(200)
            .json({ msg: "이미 존재하는 이메일 입니다.", success: false });
        }

        const hashedPassword = await  bcrypt.hash(password, 10);
        // console.log(hashedPassword);

        // 프로필 이미지 저장 경로 생성
        let profileImagePath = null;
        if (profileImage) {
            const imageExtension = path.extname(profileImage.originalname);
            const imageFileName = uuidv4() + imageExtension;

            profileImagePath = `${process.env.ROOT_URL}/${imageFileName}`;

            fs.writeFileSync(
                // __dirname: 현재 파일 경로
                path.join(__dirname, '..', 'public', imageFileName),
                profileImage.buffer // 이미지 버퍼 저장
            )
        }

        // console.log(profileImagePath);
        console.log(username, email, hashedPassword, profileImagePath);

        await database.query(
            "INSERT INTO users (username, email, password, profile_image) VALUES ($1, $2, $3, $4)", 
            [username, email, hashedPassword, profileImagePath]
        );

        return res
            .status(201)
            .json({ msg: "데이터 입력되었습니다."});

    } catch (error) {
        return res
        .status(500)
        .json({ msg: "데이터 입력 오류: ", error });
    }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
//   console.log(email, password);

    try {
        const rows = await database.query("SELECT * FROM users WHERE email = $1", [
            email
        ]);

        console.log(rows.rows);

        if (rows.rows.length === 0) {
            return res
                .status(200)
                .json({ msg: "존재하지 않는 사용자입니다.", success: false});
        }

        const isMatch = await bcrypt.compare(password, rows.rows[0].password);

        if (!isMatch) {
            return res.status(200).json({msg: "비밀번호가 일치하지 않습니다.", success: false})
        }

        const token = jwt.sign({
            id: rows.rows[0].id,
            username: rows.rows[0].username,
            email: rows.rows[0].email,
            profile_image: rows.rows[0].profile_image,
        }, process.env.JWT_SECRET, 
        {expiresIn: '3h'});

        return res
            .status(201)
            .json({ token });

    } catch (error) {
        return res
            .status(500)
            .json({ msg: "로그인 에러: ", error });
    }
};
import jwt from 'jsonwebtoken';

const maxAgeDay = 15;
const timeDayToHour = 24;
const timeHourToSecond = 3600;
const timeSecondToMilisecond = 1000;

export const generateTokenAndSetCookie = (userId,res) => {
    const token = jwt.sign({userId},process.env.JWT_SECRET,{
        expiresIn: '15d'
    })

    res.cookie("jwt", token, {
        maxAge: maxAgeDay*timeDayToHour*timeHourToSecond*timeSecondToMilisecond,
        httpOnly: true,
        sameSite: "strict",
        secure: process.env.NODE_ENV !== 'development'
    })
}
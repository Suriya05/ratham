import Session from "../models/Session.js";
import User from "../models/User.js";

export const getAllSessions = async (req, res) => {
    try{
        let currentTimeStamp = new Date();
        const sessions = await Session.find({ 
            isBooked: false, 
            slotStartTimeStamp: {$gt: currentTimeStamp} 
        });
        res.status(200).json(sessions);
    }
    catch(err){
        res.status(500).json({error: err.message});
    }
};

export const getPendingSessions = async (req, res) => {
    try{
        const universityId = req?.user.universityId;
        const deanId = universityId;
        
        let currentTimeStamp = new Date();

        const user = await User.findOne({ universityId: universityId });
        if(!user){
            return res.status(400).json({ message: "User does not exist." });
        }
        if(user && user.role === "dean"){
            const sessions = await Session.find({ 
                deanId,
                isBooked: true, 
                slotEndTimeStamp: {$gt: currentTimeStamp} 
            });
            res.status(200).json(sessions);
        }
        else{
            return res.status(403).json({ error: "Forbidden. Access not allowed." });
        }
    }
    catch(err){
        res.status(500).json({error: err.message});
    }
};

export const createSession = async (req, res) => {
    try{
        const universityId = req?.user.universityId;
        const deanId = universityId;
        const slotStartTimeStamp = new Date(req.body.slotStartTimeStamp);
        const slotEndTimeStamp = new Date(slotStartTimeStamp);
        slotEndTimeStamp.setHours(slotEndTimeStamp.getHours() + 1);

        const user = await User.findOne({ universityId: universityId });
        if(!user){
            return res.status(403).json({ error: "Forbidden. Access not allowed." });
        }
        if(user && user.role === "dean"){
            const sessionExist = await Session.findOne({deanId, slotStartTimeStamp});
            if(sessionExist){
                return res.status(409).json({ error: "Duplicate creation of session." });
            }
            const slotName = await generateSlotName(slotStartTimeStamp, user);
            const newSession = new Session({
                slotName,
                deanId,
                slotStartTimeStamp,
                slotEndTimeStamp
            });
            const savedSession = await newSession.save();
            res.status(201).json(savedSession);
        }
        else{
            return res.status(403).json({ error: "Forbidden. Access not allowed." });
        }
    }
    catch(err){
        res.status(500).json({error: err.message});
    }
}

export const bookSession = async (req, res) => {
    try{
        const universityId = req?.user.universityId;
        const studentId = universityId;
        const { sessionId } = req.body;
        const user = await User.findOne({ universityId: universityId });
        const studentName = user.name;
        if(!user){
            return res.status(403).json({ error: "Forbidden. Access not allowed." });
        }
        if(user && user.role === "student"){
            const bookSession = await Session.findOneAndUpdate({_id: sessionId}, {studentId, studentName, isBooked: true});
            const savedSession = await bookSession.save();
            res.status(200).json(savedSession);
        }
        else{
            res.status(403).json({ error: "Forbidden. Access not allowed." });
        }
    }   
    catch(err){
        res.status(500).json({error: err.message});
    }
};

const generateSlotName = (slotStartTimeStamp, dean) => {
    const daysArray = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    const day = slotStartTimeStamp.getDay();
    const date = slotStartTimeStamp.getDate();
    const month = slotStartTimeStamp.getMonth() + 1;
    const year = slotStartTimeStamp.getFullYear();
    const name = dean.name;

    const slotName = `${name} - ${daysArray[day]}, ${date}/${month}/${year}`;
    return slotName;
    
}
import mongoose from "mongoose";

const SessionSchema = new mongoose.Schema(
    {   
        slotName: {
            type: String,
        },
        studentName: {
            type: String,
        },
        studentId: {
            type: String,
            default: null,
        },
        deanId: {
            type: String,
            required: true,
        },
        isBooked:{
            type: Boolean,
            default: false,
        },
        slotStartTimeStamp: {
            type: Date,
            default: null,
        },
        slotEndTimeStamp: {
            type: Date,
            default: null,
        }   
    },
    {timeStamps: true}
);

const Session = mongoose.model("Session", SessionSchema);
export default Session;
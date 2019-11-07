import mongoose from "mongoose";

mongoose.connect("mongodb://127.0.0.1:27017/node-typescript", {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log("mongodb connected "))
    .catch(error => console.log('error >>>>', error))
import { Response } from "express";

export default {
    error(res:Response, message:any = "Not Found", code:Number = 404){
        res.json({
            "error":true,
            "code":code,
            "data":message
        })
    },
    success(res:Response, message:any = ""){
        res.json({
            "error":false,
            "code":200,
            "data":message
        })
    }
}
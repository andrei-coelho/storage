import { Request, Response } from "express";
import fs from 'fs'
import response from "./response";
import Config from "./config";

const root = Config.instance().json().root[0] == "." 
           ? Config.instance().json().root.replace("./", __dirname+"/")
           : Config.instance().json().root

const fsPromises = fs.promises
const forbiden = ['$RECYCLE.BIN', 'System Volume Information']

export default {

    async list(req:Request, res:Response){
        try {
            let path = req.body.path == null ? root : root+req.body.path
            console.log(path);
            
            let files = (await fsPromises.readdir(path)).filter(f => f.substring(f.length, f.length -4) != "temp" && !forbiden.includes(f))
            response.success(res, files)
        } catch (err) {
            response.error(res, "Diretório não existe")
        }
    },

    download(req:Request, res:Response){
        try {
            res.download(root+req.body.file);
        } catch (err){
            response.error(res, "Arquivo não existe")
        }
    },

    async create(req:Request, res:Response){
        try {
            let path = req.body.path == null ? root : root+req.body.path
            let file = path+req.body.file+".temp";
            await fsPromises.writeFile(file, "", { flag: 'a', encoding:'utf8' })
            response.success(res)
        } catch (error) {
            console.log(error);
            response.error(res, "Não foi possível criar o arquivo")
        }
    },

    async append(req:Request, res:Response){
        try {
            let path = req.body.path == null ? root : root+req.body.path
            let file = path+req.body.file+".temp";
            var dataUtf8 = Buffer.from(req.body.data, 'base64').toString('utf8');
            await fsPromises.writeFile(file, dataUtf8, { flag: 'a', encoding:'utf8' })
            response.success(res)
        } catch (error) {
            response.error(res, "Não foi possível salvar dados no arquivo")
        }
    },

    async commit(req:Request, res:Response){
        try {
            let path = req.body.path == null ? root : root+req.body.path
            let newf = path+req.body.file;
            let oldf = newf+".temp";
            await fsPromises.rename(oldf, newf)
            response.success(res)
        } catch (error) {
            response.error(res, "Não fechar o arquivo")
        }
    }

}

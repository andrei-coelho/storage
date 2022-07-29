import { Router, Request, Response } from 'express'
import files from './files'

const router = Router()

export default ():Router => {
    
    router.use('/list', files.list)
    router.use('/download', files.download)
    router.use('/create', files.create)
    router.use('/append', files.append)
    router.use('/commit', files.commit)
    router.use('/', (req:Request, res:Response) => { res.sendFile(__dirname+'/public/index.html') })
    
    return router;

}
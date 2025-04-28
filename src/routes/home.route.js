import express from 'express';

const homeRouter = express.Router();
homeRouter.get('/home', async(req, res)=>{
  res.render('home/index');
});

export default homeRouter;
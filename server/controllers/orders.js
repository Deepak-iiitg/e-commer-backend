const db = require('../models/database').conn;
function addOrder(req,res){
   try{
    db.connect(err=>{
        if(err){
            return res.status(500).json({
                message:'internal server error'
            })
        }
        const prod = req.body.product;
        const sql = 'insert into orders(product,price,image,quantity,total_cost,payment_status) values?';
        db.query(sql,[[[prod.name,prod.price,prod.image,prod.quantity,prod.price*prod.quantity]]],(err,result)=>{
            if(err){
                return res.status(500).json({
                    message:'internal server error'
                })
            }
            return res.status(201).json({
                message:'ordered success'
            })
        })
    })
   }
   catch(e){
    return res.status(500).json({
        message:'internal server error'
    })
   }
}
//this will call ,weather order delivered successfully or cancled by user.
function deleteOrder(req,res){
     try{
        db.connect(err=>{
            return res.status(500).json({
                message:'internal server error'
            })
            const id = req.body.product.id;
            const sql = 'delete from orders where id=?';
            db.query(sql,[[id]],(err,result)=>{
               if(err){
                return res.status(500).json({
                    message:'internal server error'
                })
               }
               return res.status(201).json({
                message:'order deleteed successfully'
               })
            })
        })

     }catch(e){
        return res.status(500).json({
            message:'internal server error'
        })
     }
}
module.exports = {addOrder,deleteOrder};
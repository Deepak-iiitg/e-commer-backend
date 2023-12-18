const db = require('../models/database').conn;
function addCart(req,res){
    try{
        const product = req.body.product;
        db,connect((err)=>{
            return res.status(500).json({
                message:'internal server error'
            })
            const sql = 'insert into cart(name,image,price,count,total_cost) values?';
            db.query(sql,[[[product.name,product.image,product.price,product.count,
            product.count*product.price]]],(err,result)=>{
                if(err){
                    return res.status(500).json({
                        message:'internal server error'
                    })
                }
                return res.status(201).json({
                    message:'product add in cart successfully'
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
function deleteFromCart(req,res){
    try{
        const id = req.body.product.id;
        db.connect(err=>{
            if(err){
                return res.status(500).json({
                    message:'internal server error'
                })
            }
            const sql = 'delete from cart where id=?';

            db.query(sql,[[id]],(err,result)=>{
                if(err){
                    return res.status(500).json({
                        message:'internal server error'
                    })
                }
                return res.status(201).json({
                    message:'delete successfully'
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
function updateQuantity(req,res){
      try{
         const Quantity = req.body.product;
         db.connect(err=>{
            if(err){
                return res.status(500).json({
                    message:'internal server error'
                })
            }
            const sql = 'update cart set count=?,total_cost=? where id=?';
            db.query(sql,[[Quantity.count,Quantity.count*Quantityprice]],(err,result)=>{
                if(err){
                    return res.status(500).json({
                        message:'internal server error'
                    })
                }
                return res.status(201).json({
                    message:'update successfully'
                })
            })
         })
      }catch(e){
        return res.status(500).json({
            message:'internal server error'
        })
      }
}

module.exports = {addCart,deleteFromCart,updateQuantity};
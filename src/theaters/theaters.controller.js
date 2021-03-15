const service = require('./theaters.services');
const treeize = require('../utils/treeize')


async function list (req,res,next)  {
    let list = await service.getAllTheaters()
    list = treeize(list)
    res.json({data:list})
   }





module.exports = {
list: [list]
};
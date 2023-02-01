const { v4: uuid } = require('uuid');
const { links } = require('../models');

const postMain = async(req, res) => {
    const { long_url } = req.body;
    const new_link = uuid().split('-')[1];
    
    const [ link, created ] = await links.findOrCreate({
        where: {short_url: new_link},
        defaults:{
            long_url:long_url,
            short_url:new_link,
            num_access:0,
            last_time_visited: new Date(),
            createdAt: new Date(),
            updatedAt: new Date()
        }
    })
    if(!created){
        const new_link = uuid().split('-')[1];
        const foundLink = await links.findOne({where: { short_url: new_link }});
        if(!foundLink){
            await links.create({
                long_url:long_url,
                short_url:new_link,
                num_access:0,
                last_time_visited: new Date(),
                createdAt: new Date(),
                updatedAt: new Date()
            })
            await links.save();
            created = true;
        }
    }
    res.status(200).json({message: `link created: http://localhost:${PORT}/${new_link}`});
}

module.exports = postMain;
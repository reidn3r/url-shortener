const { links } = require('../models');

const getId =  async(req, res) => {
    const { id } = req.params;
    
    const foundLink = await links.findOne({where: {short_url: id}});
    if(!foundLink) return res.json({message: "link not found"});

    await links.update({ 
        last_time_visited: new Date(),
        num_access: foundLink.num_access + 1    
    },
        { where: {short_url: id}
        });

    await links.save;
    res.status(200).redirect(foundLink.long_url);
}

module.exports = getId;
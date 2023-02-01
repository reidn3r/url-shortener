require('dotenv').config();
const morgan = require('morgan');
const express = require('express');
const app = express();
const PORT = process.env.PORT || 8080;
const { v4: uuid } = require('uuid');
const path = require('path');
const { links } = require('./models');

//body-parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//log requests
app.use(morgan('dev'));

app.get('/', (req, res) => {
    res.status(200).json({PORT: `${PORT}`});
})

app.post('/', async(req, res) => {
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
})

app.get('/:id', async(req, res) => {
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
})

app.listen(PORT, () => console.log(`running at: http://localhost:${PORT}`));
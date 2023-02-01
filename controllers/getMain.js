const PORT = process.env.PORT || 8080;

const getMain = (req, res) => {
    res.status(200).json({PORT: `${PORT}`});
}

module.exports = getMain;
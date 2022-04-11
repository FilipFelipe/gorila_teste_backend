module.exports = (app) => {

    const init = async (req, res) => {
        return res.send('it works :)')
    };
    return { init };
}
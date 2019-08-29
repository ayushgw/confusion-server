const mongoose = require('mongoose')
const Leader = require('../../src/models/leader')

const leaderOneId = new mongoose.Types.ObjectId()
const leaderOne = {
    _id: leaderOneId,
    name: "Agumbe Tang",
    image: "images/alberto.png",
    designation: "Chief Taste Officer",
    abbr: "CTO",
    description: "Blessed with the most discerning gustatory sense, Agumbe, our CFO, personally ensures that every dish that we serve meets his exacting tastes. Our chefs dread the tongue lashing that ensues if their dish does not meet his exacting standards. He lives by his motto, You click only if you survive my lick."
}

const leaderTwo = {
    name: "Demo Leader",
    image: "images/demo.png",
    designation: "Demo Taste Officer",
    abbr: "DEMO",
    description: "Demo descrption for someone who doesn't exist."
}

const setupLeaders = async () => {
    await Leader.deleteMany()
    await new Leader(leaderOne).save()
    await new Leader(leaderTwo).save()
}

module.exports = {
    leaderOneId,
    setupLeaders
}
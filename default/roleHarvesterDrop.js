var roleHarvesterDrop = {
    run: function (creep, source) {
        // Harvests from its assigned source continuously. Energy is dropped on the ground to be picked up by other creeps
        if (creep.harvest(source) == ERR_NOT_IN_RANGE)
            creep.moveTo(source);
    }
};

module.exports = roleHarvesterDrop;
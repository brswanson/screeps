var roleHarvester = {

    /** @param {Creep} creep **/
    run: function (creep, spawn) {
        // TODO: update to use 'withdraw' on spawn instead of gathering
        if (creep.carry.energy < creep.carryCapacity) {
            // TODO: Creeps currently grab the closest source instead of a combination of least in use and proximity. May not be needed if we withdraw instead of harvest.
            var source = creep.pos.findClosestByRange(FIND_SOURCES);
            if (creep.harvest(source) == ERR_NOT_IN_RANGE)
                creep.moveTo(source);
        }
        else {
            if (creep.transfer(spawn, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE)
                creep.moveTo(spawn);
        }
    }
};

module.exports = roleHarvester;
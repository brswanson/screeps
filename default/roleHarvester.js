var roleHarvester = {

    /** @param {Creep} creep **/
    run: function (creep, spawn) {
        if (creep.carry.energy < creep.carryCapacity) {
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
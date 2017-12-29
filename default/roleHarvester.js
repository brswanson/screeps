var roleHarvester = {
    run: function (creep, source) {
        // Harvests from its assigned source
        if (creep.carry.energy < creep.carryCapacity) {
            if (creep.harvest(source) == ERR_NOT_IN_RANGE)
                creep.moveTo(source);
        }
        // Delivers to the nearest Spawn or Extension which is below capacity
        else {
            var destination = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                filter: function (s) {
                    // Deliver to the nearest Spawn > Extension > Container > Storage
                    return (s.structureType == STRUCTURE_SPAWN || s.structureType == STRUCTURE_EXTENSION & (s.energy < s.energyCapacity))
                        || (s.structureType == STRUCTURE_CONTAINER && s.store[RESOURCE_ENERGY] < s.storeCapacity)
                        || (s.structureType == STRUCTURE_STORAGE && s.store[RESOURCE_ENERGY] < s.storeCapacity)
                }
            });
        }

        var transferResult = creep.transfer(destination, RESOURCE_ENERGY);
        if (transferResult == ERR_NOT_IN_RANGE) {
            creep.moveTo(destination);
        }
    }
};

module.exports = roleHarvester;
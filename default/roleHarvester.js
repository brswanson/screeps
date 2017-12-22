var roleHarvester = {

    /** @param {Creep} creep **/
    run: function (creep) {
        if (creep.memory.job === null || creep.memory.job === undefined)
            creep.memory.job = 'harvester';

        // Harvests from the nearest source
        // TODO: Load balancing by active miners on the source
        if (creep.carry.energy < creep.carryCapacity) {
            var source = creep.pos.findClosestByRange(FIND_SOURCES, {
                filter: function (s) { return s.energy > 0 }
            });

            if (creep.harvest(source) == ERR_NOT_IN_RANGE)
                creep.moveTo(source);
        }
        // Delivers to the nearest Spawn or Extension which is below capacity
        // TODO: Load balance by screeps with same destination
        else {
            var destination = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                filter: function (s) { return s.energy < s.energyCapacity && (s.structureType == STRUCTURE_SPAWN || s.structureType == STRUCTURE_EXTENSION) }
            });

            if (creep.transfer(destination, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE)
                creep.moveTo(destination);
        }
    }
};

module.exports = roleHarvester;
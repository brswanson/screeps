var roleBuilder = {
    run: function (creep) {
        if (creep.carry.energy === 0)
            creep.memory.doWork = false;

        if (creep.carry.energy === creep.carryCapacity)
            creep.memory.doWork = true;

        if (creep.memory.doWork) {
            // Look for a friendly construction site
            let closestSite = creep.pos.findClosestByPath(FIND_MY_CONSTRUCTION_SITES);
            if (closestSite) {
                if (creep.build(closestSite) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(closestSite);
                }
            }
            else {
                // If nothing needs to be  built, look for a friendly structure to repair
                let closestRepair = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                    filter: function (s) {
                        return (s.structureType === STRUCTURE_CONTAINER
                            || s.structureType === STRUCTURE_ROAD
                            || s.structureType === STRUCTURE_RAMPART
                            || s.structureType === STRUCTURE_WALL)
                            && (s.hits < s.hitsMax);
                    }
                });

                // Last, try to repair wounded creeps
                if (!closestRepair)
                    closestRepair = creep.pos.findClosestByPath(FIND_MY_CREEPS, {
                        filter: function (s) { return s.hits < s.hitsMax; }
                    });

                if (closestRepair) {
                    if (creep.repair(closestRepair) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(closestRepair);
                    }
                }
            }
        }
        else {
            let source = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                filter: function (s) {
                    return (s.structureType == STRUCTURE_CONTAINER && s.store[RESOURCE_ENERGY] > 0)
                        || (s.structureType == STRUCTURE_SPAWN && s.energy > 0)
                }
            });

            if (creep.withdraw(source, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE)
                creep.moveTo(source);
        }
    }
};

module.exports = roleBuilder;
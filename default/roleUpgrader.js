var roleUpgrader = {
    run: function (creep) {
        if (creep.isEmpty())
            creep.memory.doWork = false;

        if (creep.isFull())
            creep.memory.doWork = true;

        if (creep.memory.doWork) {
            if (creep.room.controller) {
                if (creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE)
                    creep.moveTo(creep.room.controller);
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

module.exports = roleUpgrader;
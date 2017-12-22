var roleUpgrader = {

    /** @param {Creep} creep **/
    run: function (creep) {
        if (creep.memory.job === null || creep.memory.job === undefined)
        creep.memory.job = 'upgrader';

        if (creep.memory === null || creep.memory === undefined)
            creep.memory.doWork = false;

        if (creep.carry.energy === 0)
            creep.memory.doWork = false;

        if (creep.carry.energy === creep.carryCapacity)
            creep.memory.doWork = true;

        if (creep.memory.doWork) {
            if (creep.room.controller) {
                if (creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE)
                    creep.moveTo(creep.room.controller);
            }
        }
        else {
            var source = creep.pos.findClosestByRange(FIND_MY_SPAWNS);
            if (creep.withdraw(source, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE)
                creep.moveTo(source);
        }
    }
};

module.exports = roleUpgrader;
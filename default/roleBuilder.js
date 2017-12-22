var roleBuilder = {

    /** @param {Creep} creep **/
    run: function (creep) {
        if (creep.memory.job === null || creep.memory.job === undefined)
        creep.memory.job = 'builder';

        if (creep.memory === null || creep.memory === undefined)
            creep.memory.doWork = false;

        if (creep.carry.energy === 0)
            creep.memory.doWork = false;

        if (creep.carry.energy === creep.carryCapacity)
            creep.memory.doWork = true;

        const target = creep.pos.findClosestByRange(FIND_CONSTRUCTION_SITES);
        if (creep.memory.doWork) {
            if (target) {
                if (creep.build(target) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target);
                }
            }
        }
        else {
            var source = creep.pos.findClosestByRange(FIND_MY_SPAWNS);
            if (creep.withdraw(source, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE)
                creep.moveTo(source);
        }
    }
};

module.exports = roleBuilder;
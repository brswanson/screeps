var roleBuilder = {

    /** @param {Creep} creep **/
    run: function (creep) {
        const target = creep.pos.findClosestByRange(FIND_CONSTRUCTION_SITES);

        if (creep.memory === null || creep.memory === undefined)
            creep.memory.doWork = false;

        if (creep.carry.energy === 0)
            creep.memory.doWork = false;

        if (creep.carry.energy === creep.carryCapacity)
            creep.memory.doWork = true;

        if (creep.memory.doWork) {
            if (target) {
                if (creep.build(target) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target);
                }
            }
        }
        // TODO: Creeps currently grab the closest source instead of a combination of least in use and proximity.
        else {
            var source = creep.pos.findClosestByRange(FIND_MY_SPAWNS);
            if (creep.withdraw(source, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE)
                creep.moveTo(source);
        }
    }
};

module.exports = roleBuilder;
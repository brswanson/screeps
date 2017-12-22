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
        else {
            var sources = creep.room.find(FIND_SOURCES);
            if (creep.harvest(sources[0]) == ERR_NOT_IN_RANGE)
                creep.moveTo(sources[0]);
        }
    }
};

module.exports = roleBuilder;
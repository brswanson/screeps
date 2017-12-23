var roleBuilder = {

    /** @param {Creep} creep **/
    run: function (creep) {
        if (creep.memory.job === null || creep.memory.job === undefined)
            creep.memory.job = 'builder';

        if (creep.memory === null || creep.memory === undefined || creep.carry.energy === 0)
            creep.memory.doWork = false;

        if (creep.carry.energy === creep.carryCapacity)
            creep.memory.doWork = true;
            
        if (creep.memory.doWork) {
            const target = creep.pos.findClosestByPath(FIND_MY_CONSTRUCTION_SITES);
            if (target) {
                if (creep.build(target) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target);
                }
            }
        }
        else {
            var source = creep.pos.findClosestByPath(FIND_STRUCTURES, {
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
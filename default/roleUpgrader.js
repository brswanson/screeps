var roleUpgrader = {
    run: function (creep) {
        if (creep.isEmpty())
            creep.memory.doWork = false;

        if (creep.isFull())
            creep.memory.doWork = true;

        if (creep.memory.doWork) {
            if (creep.room.controller) {
                if (creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE)
                    creep.travelTo(creep.room.controller);
            }
        }
        else
            creep.recharge();
    }
};

module.exports = roleUpgrader;
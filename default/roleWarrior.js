var roleWarrior = {
    run: function (creep) {
        if (creep.memory.job === undefined || creep.memory.job === null)
            creep.memory.job = 'warrior';

        creep.memory.fight = true;

        // TODO: Retreat if below 20% health
        if (creep.hits <= creep.hitsMax * .2)
            creep.memory.wounded = true;

        if (creep.memory.fight) {
            // Attack the nearest Creep. If there are none, attack the nearest Spawn
            var enemy = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
            if (!enemy)
                enemy = creep.pos.findClosestByRange(FIND_HOSTILE_SPAWNS);

            // Only attempt to attack if a target exists
            if (enemy) {
                if (creep.attack(enemy) == ERR_NOT_IN_RANGE)
                    creep.moveTo(enemy);
            }
            else {
                // Rally near the center of the room
                var destination = new RoomPosition(25, 25, creep.pos.roomName);
                creep.moveTo(destination);
            }
        }
    }
};

module.exports = roleWarrior;
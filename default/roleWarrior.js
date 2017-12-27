var roleWarrior = {
    run: function (creep) {
        // TODO: Retreat if below 20% health
        // if (creep.hits <= creep.hitsMax * .2)
        //     creep.memory.wounded = true;

        // TODO: Implement a more advanced algorithm for determining a target. Prioritize close hostiles such as offensive Creeps and Towers.
        // Attack the nearest Creep. If there are none, attack the nearest strucutre prioritizing Towers
        var enemy = creep.pos.findClosestByPath(FIND_HOSTILE_CREEPS);
        if (!enemy) {
            var enemyStructures = creep.room.find(FIND_HOSTILE_STRUCTURES);
            enemy = enemyStructures.filter(s => s.structureType === STRUCTURE_TOWER)
            // Only attempt to engage Towers you can reach
            if (!enemy || !creep.pos.findClosestByPath(enemy))
                enemy = creep.pos.findClosestByPath(enemyStructures);
        }

        // Only attempt to attack if a target exists
        if (enemy) {
            var attackResult = creep.attack(enemy);
            if (attackResult === ERR_NOT_IN_RANGE)
                creep.moveTo(enemy);
        }
        else {
            // Rally near the center of the room
            var destination = new RoomPosition(25, 25, creep.room.name);
            creep.moveTo(destination);
        }
    }
};

module.exports = roleWarrior;
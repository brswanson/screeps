// Preventing creeps from attacking Source Keepers for now
const SOURCE_KEEPER_OWNER_NAME = 'Source Keeper';

var roleWarrior = {
    run: function (creep, flag) {
        // TODO: Retreat if below 20% health
        // if (creep.hits <= creep.hitsMax * .2)
        //     creep.memory.wounded = true;

        // TODO: Implement a more advanced algorithm for determining a target. Prioritize close hostiles such as offensive Creeps and Towers.
        var enemy = creep.pos.findClosestByPath(FIND_HOSTILE_CREEPS, { filter: function (e) { return e.owner.username !== SOURCE_KEEPER_OWNER_NAME } });

        if (!enemy) {
            var enemyStructures = creep.room.find(FIND_HOSTILE_STRUCTURES, { filter: function (s) { return s.owner.username !== SOURCE_KEEPER_OWNER_NAME } });
            var enemyTowers = enemyStructures.filter(s => s.structureType === STRUCTURE_TOWER);

            // Prioritize Towers if they exist
            enemy = creep.pos.findClosestByPath(enemyTowers);
            if (!enemy)
                enemy = creep.pos.findClosestByPath(enemyStructures);
        }

        // Only attempt to attack if an enemy exists
        if (enemy) {
            var attackResult = creep.attack(enemy);
            if (attackResult === ERR_NOT_IN_RANGE)
                creep.moveTo(enemy);
        }
        else if (flag !== undefined) {
            creep.moveTo(flag);
        }
        else {
            // Rally near the center of the room if no enemies or flags exist
            var destination = new RoomPosition(25, 25, creep.room.name);
            creep.moveTo(destination);
        }
    }
};

module.exports = roleWarrior;
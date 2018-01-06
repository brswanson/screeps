// Preventing creeps from attacking Source Keepers for now
const SOURCE_KEEPER_OWNER_NAME = 'Source Keeper';

var roleWarrior = {
    run: function (creep, flag) {
        // TODO: Implement a more advanced algorithm for determining a target. Prioritize close hostiles such as offensive Creeps and Towers.
        let enemy = creep.pos.findClosestByPath(FIND_HOSTILE_CREEPS, { filter: function (e) { return e.owner.username !== SOURCE_KEEPER_OWNER_NAME } });
        if (!enemy) {
            let enemyStructures = creep.room.find(FIND_HOSTILE_STRUCTURES, { filter: function (s) { return s.owner.username !== SOURCE_KEEPER_OWNER_NAME } });
            let enemyTowers = enemyStructures.filter(s => s.structureType === STRUCTURE_TOWER);

            // Prioritize Towers if they exist
            enemy = creep.pos.findClosestByPath(enemyTowers);
            if (!enemy)
                enemy = creep.pos.findClosestByPath(enemyStructures);
        }

        // Only attempt to attack if an enemy exists
        if (enemy) {
            let attackResult = creep.attack(enemy);
            if (attackResult === ERR_NOT_IN_RANGE)
                creep.travelTo(enemy);
        }
        else if (flag !== undefined) {
            creep.travelTo(flag);
        }
        else {
            // Rally near the center of the room if no enemies or flags exist
            let destination = new RoomPosition(25, 25, creep.room.name);
            creep.travelTo(destination);
        }
    }
};

module.exports = roleWarrior;
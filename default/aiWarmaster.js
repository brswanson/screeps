// Arbitrary large integer to force prioritization of defense of owned rooms over attack of foreign rooms
const DEFENSE_MODIFIER = 1000;
const WAR_FLAG_COLOR = COLOR_RED;

var aiWarmaster = {
    getTarget: function () {
        // TODO: Targets should be prioritized by distance from the current room and/or threat to the room posd. Right now, it takes the highest value flag.
        // TODO: Target  choice is also vulnerable to small numbers of Creeps moving back and forth between rooms; that will trigger a defensive response when no real threat is present.
        let flags = _.filter(Game.flags, function (flag) { return flag.color === WAR_FLAG_COLOR });

        // Return the highest value/priority flag, or nothing. This value resides in the flag's name
        return ((flags.length)
            ? _.max(flags, function (flag) { return flag.name; })
            : null);
    },

    assignTargets: function (room) {
        let roomFlags = _.filter(Game.flags, function (flag) { return flag.color === WAR_FLAG_COLOR && flag.room.name === room.name });
        let flag = _.first(roomFlags);
        let enemyCount = room.find(FIND_HOSTILE_CREEPS).length;

        // Update existing flag
        if (flag) {
            if (enemyCount === 0) {
                flag.remove();
                return;
            }

            flag.name = calculateFlagValue(room, enemyCount);
        }
        // Create a new flag
        else {
            if (enemyCount === 0)
                return;

            // Create the flag
            var result = room.createFlag(room.controller.pos.x, room.controller.pos.y, calculateFlagValue(room, enemyCount), WAR_FLAG_COLOR, WAR_FLAG_COLOR);
            console.log(result);
        }
    }
}

function calculateFlagValue(room, enemyCount) {
    let flagVlaue = 0;

    // Apply defensive value
    if (room.controller.my)
        flagVlaue += DEFENSE_MODIFIER;

    // Apply enemy combatant count
    flagVlaue += enemyCount;

    return flagVlaue;
}

module.exports = aiWarmaster;
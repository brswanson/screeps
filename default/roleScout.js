var roleScout = {
    run: function (creep) {
        const roomExits = [FIND_EXIT_TOP, FIND_EXIT_RIGHT, FIND_EXIT_BOTTOM, FIND_EXIT_LEFT];

        // Default to scouting the top exit
        if (creep.memory.scoutIndex === undefined) {
            creep.memory.doWork = true
            creep.memory.scoutIndex = 0;
        }

        // After entering a foreign room to scout, immediately return to the previous room
        if (creep.memory.room !== creep.room.name) {
            creep.memory.doWork = false;
            creep.memory.scoutIndex++;
        }
        else
            creep.memory.doWork = true;

        // If working, scout. Otherwise, return home
        if (creep.memory.doWork) {
            let target = creep.pos.findClosestByPath(roomExits[creep.memory.scoutIndex]);
            if (target !== null)
                creep.travelTo(target);
        }
        else {
            // Wait for a tick. By not moving, the engine will push the Scout back into the previous room
            creep.memory.doWork = true;
            if (creep.memory.scoutIndex >= roomExits.length)
                creep.memory.scoutIndex = 0;
        }
    }
};

module.exports = roleScout;
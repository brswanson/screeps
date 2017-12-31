var roleCarrier = {
    run: function (creep, source) {
        // Pick up any Energy dropped near the Source
        if (creep.carry.energy < creep.carryCapacity) {
            // Check all the potential Energy drop locations for the assigned Source
            for (let i in source.harvestingLocations) {
                let pos = source.harvestingLocations[i];
                location = new RoomPosition(pos.x, pos.y, pos.roomName);

                let energy = _.first(creep.room.lookForAt(RESOURCE_ENERGY, location));
                if (energy) {
                    let tryPickup = creep.pickup(energy);
                    if (tryPickup == ERR_NOT_IN_RANGE)
                        creep.moveTo(energy);

                    break;
                }
            }
        }
        // Deliver to a nearby location
        else {
            let destination = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                filter: function (s) {
                    // Deliver to the nearest Spawn > Extension > Container > Storage
                    return (s.structureType == STRUCTURE_SPAWN || s.structureType == STRUCTURE_EXTENSION & (s.energy < s.energyCapacity))
                        || (s.structureType == STRUCTURE_CONTAINER && s.store[RESOURCE_ENERGY] < s.storeCapacity)
                        || (s.structureType == STRUCTURE_STORAGE && s.store[RESOURCE_ENERGY] < s.storeCapacity)
                }
            });

            let transferResult = creep.transfer(destination, RESOURCE_ENERGY);
            if (transferResult == ERR_NOT_IN_RANGE) {
                creep.moveTo(destination);
            }
        }
    }
};

module.exports = roleCarrier;
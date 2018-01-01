var roleCarrier = {
    run: function (creep, source) {
        // Pick up the largest Energy Resource dropped near the Source
        if (!creep.isFull()) {
            let energyLocations = [];
            for (let i in source.harvestingLocations) {
                let location = new RoomPosition(source.harvestingLocations[i].x, source.harvestingLocations[i].y, source.harvestingLocations[i].roomName);

                let energy = _.first(creep.room.lookForAt(RESOURCE_ENERGY, location));
                if (energy)
                    energyLocations.push(energy);
            }
            if (energyLocations.length) {
                let maxEnergy = _.max(energyLocations, function (e) { return e.amount; });
                let tryPickup = creep.pickup(maxEnergy);

                if (tryPickup == ERR_NOT_IN_RANGE)
                    creep.travelTo(maxEnergy);
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
            if (transferResult == ERR_NOT_IN_RANGE)
                creep.travelTo(destination);
            else if (transferResult == ERR_FULL)
                creep.fleeFrom(destination);
        }
    }
};

module.exports = roleCarrier;
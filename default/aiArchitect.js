var aiArchitect = {
    run: function (room, spawn) {
        var sources = Memory.rooms[room.name].sources;
        var controller = Memory.rooms[room.name].controller;

        for (var i in sources) {
            var source = sources[i];

            laySourceRoads(room, source);
        }

        // TODO: Implement checking if roads have been constructed for all tiles. This will also allow the creation of new roads if they decay or are destroyed
        // Delay setting up roads to the Upgrader until we've ascended once.
        // This gives the creeps time to build the the roads to the Sources without checking if they've all been constructed already
        if (controller !== undefined && room.controller.level >= 2)
            layRoomControllerRoads(room, controller);

        // TODO: Implement laying of Extensions. Needs the ability to check if roads have been constructed first;
        //          we should wait to create Extensions until at least the Source roads are built.
        // if (!(global.HeartBeat % 5)) {
        //     layExtension(room);
        // }
    }
}

function laySourceRoads(room, source) {
    if (source.roadBlueprint === undefined) {
        // Lay roads along the path to the Source
        for (var i in source.pathToSpawn)
            Game.rooms[room.name].createConstructionSite(source.pathToSpawn[i].x, source.pathToSpawn[i].y, STRUCTURE_ROAD);

        // Lay roads on all harvesting locations adjacent to the Source
        for (var i in source.harvestingLocations)
            Game.rooms[room.name].createConstructionSite(source.harvestingLocations[i].x, source.harvestingLocations[i].y, STRUCTURE_ROAD);

        source.roadBlueprint = true;
    }
}

function layRoomControllerRoads(room, controller) {
    if (controller.roadBlueprint === undefined) {
        // Lay roads along the path to the Source
        for (var i in controller.pathToSpawn)
            Game.rooms[room.name].createConstructionSite(controller.pathToSpawn[i].x, controller.pathToSpawn[i].y, STRUCTURE_ROAD);

        controller.roadBlueprint = true;
    }
}

function layExtension(room) {
    var memory = Memory.rooms[room.name];

    // TODO: Create an Extension if Extension capacity is <= the number of Extensions and no Extension blueprints exist
    //          We only want one Extension to be built at a time since their cost is significant
}

module.exports = aiArchitect;
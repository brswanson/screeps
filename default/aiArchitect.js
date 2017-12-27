var aiArchitect = {
    run: function (room, spawn) {
        // Iterate over all Sources in the room, assigning a direct path from them to the Spawner as we go
        var sources = Memory.rooms[room.name].sources;

        for (var i in sources) {
            var source = sources[i];

            // Save the path to memory in case we need to rebuild the road at some point
            // Ignore creeps and treat swamps the same as plains when laying roads
            if (source.pathToSpawn === undefined) {
                source.pathToSpawn = PathFinder.search(
                    new RoomPosition(source.pos.x, source.pos.y, source.pos.roomName)
                    , new RoomPosition(spawn.pos.x, spawn.pos.y, spawn.pos.roomName)
                    , { swampCost: 1, plainCost: 1 })
                    .path;

                // Lay roads along the path to the Source
                for (var i in source.pathToSpawn) {
                    var pos = source.pathToSpawn[i];

                    Game.rooms[room.name].createConstructionSite(pos.x, pos.y, STRUCTURE_ROAD);
                }

                // Lay roads on all mining locations adjacent to the Source
                var tilesAdjacentSource = global.Utilities.findAvailableMiningLocations(source);
                for (var i in tilesAdjacentSource) {
                    // TODO: Should create a function which returns only viable locations instead of every location. But, this is a small optimisation.
                    Game.rooms[room.name].createConstructionSite(tilesAdjacentSource[i].x, tilesAdjacentSource[i].y, STRUCTURE_ROAD);
                }
            }
        }
    }
}

module.exports = aiArchitect;
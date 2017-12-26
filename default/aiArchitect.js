var aiArchitect = {
    run: function (room, spawn) {
        // Iterate over all Sources in the room, assigning a direct path from them to the Spawner as we go
        var sources = Memory.rooms[room.name].sources;
        for (var i in sources) {
            var source = sources[i];
            // Save the path to memory in case we need to rebuild the road at some point
            // Ignoring creeps and swamp/tile cost when laying roads
            // TODO: Path isn't ignoring swamp terrain correctly. Setting 'heuristicWeight' is supposed to fix this. Will have to look into it
            if (source.pathToSpawn === undefined) {
                source.pathToSpawn = Game.rooms[room.name].findPath(
                    new RoomPosition(source.pos.x, source.pos.y, source.pos.roomName)
                    , new RoomPosition(spawn.pos.x, spawn.pos.y, spawn.pos.roomName)
                    , { ignoreCreeps: true, heuristicWeight: 1000, });

                // Lay roads along the path to the Source
                for (var i in source.pathToSpawn) {
                    Game.rooms[room.name].createConstructionSite(source.pathToSpawn[i].x, source.pathToSpawn[i].y, STRUCTURE_ROAD);
                }

                // Lay roads on all mining locations adjacent to the Source
                var tilesAdjacentSource = global.Utilities.getAdjacentSourceTiles(source);
                for (var i in tilesAdjacentSource) {
                    // TODO: Should create a function which returns only viable locations instead of every location. But, this is a small optimisation.
                    Game.rooms[room.name].createConstructionSite(tilesAdjacentSource[i].x, tilesAdjacentSource[i].y, STRUCTURE_ROAD);
                }
            }
        }
    }
}

module.exports = aiArchitect;
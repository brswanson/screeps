global.Utilities = require('utilities');

global.AIHarvester = require('aiHarvester');
global.AIUpgrader = require('aiUpgrader');
global.AIBuilder = require('aiBuilder');
global.AISpawner = require('aiSpawner');
global.GarbageCollector = require('garbageCollector');

global.Debug = true;

module.exports.loop = function () {
    // Iterate over all existing spawns/rooms
    // TODO: Will need to select unique rooms in the future but for now we only have one spawn per room so this works
    for (var i in Game.spawns) {
        var spawn = Game.spawns[i];
        var room = spawn.room;

        // TODO: Add a load balance to allocate workers appropriately amongst the different AI
        AIHarvester.run(room, 8);
        AIUpgrader.run(room, 4);
        AIBuilder.run(room, 4);
        AISpawner.run(room, spawn, 16);
    }

    GarbageCollector.run(Memory, Game);
}
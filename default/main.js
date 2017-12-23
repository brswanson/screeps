module.exports.loop = function () {
    const Utilities = require('utilities');

    const AIHarvester = require('aiHarvester');
    const AIUpgrader = require('aiUpgrader');
    const AIBuilder = require('aiBuilder');
    const AISpawner = require('aiSpawner');
    const GarbageCollector = require('garbageCollector');

    for (var i in Game.creeps) {
        var creep = Game.creeps[i];
        creep.memory.job = undefined;
    }

    // Iterate over all existing spawns/rooms
    // TODO: Will need to select unique rooms in the future but for now we only have one spawn per room so this works
    for (var i in Game.spawns) {
        var spawn = Game.spawns[i];
        var room = spawn.room;

        AIHarvester.run(room, 12);
        AIUpgrader.run(room, 6);
        AIBuilder.run(room, 6);
        AISpawner.run(room, spawn, 20);
    }

    GarbageCollector.run(Memory, Game);
}
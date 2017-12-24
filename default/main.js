global.Utilities = require('utilities');

const Harvester = require('aiRoleHarvesterAssigned');
const Upgrader = require('aiRoleUpgrader');
const Builder = require('aiRoleBuilder');
const Spawner = require('aiSpawner');
const GarbageCollector = require('garbageCollector');

global.Debug = true;
// global.Utilities.layoff(Game.creeps);

module.exports.loop = function () {
    // Iterate over all existing spawns/rooms
    // TODO: Will need to select unique rooms in the future but for now we only have one spawn per room so this works
    for (var i in Game.spawns) {
        var spawn = Game.spawns[i];
        var room = spawn.room;

        // TODO: Add a load balancer to allocate workers appropriately amongst the different AI
        Harvester.run(room);
        Upgrader.run(room, 4);
        Builder.run(room, 4);
        Spawner.run(room, spawn, 16);
    }

    GarbageCollector.run(Memory, Game);
}
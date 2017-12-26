global.Utilities = require('utilities');
global.ClassWarrior = 'warrior';
global.ClassCivilain = 'civilain';

const Harvester = require('aiRoleHarvesterAssigned');
const Upgrader = require('aiRoleUpgrader');
const Builder = require('aiRoleBuilder');
const Warrior = require('aiRoleWarrior');
const Spawner = require('aiSpawner');
const Architect = require('aiArchitect');
const GarbageCollector = require('garbageCollector');

global.Debug = true;
// global.Utilities.layoff(Game.creeps);

module.exports.loop = function () {
    // Iterate over all existing rooms. As creeps enter new rooms, they will appear in the array
    for (var i in Game.rooms) {
        var room = Game.rooms[i];
        var spawn = room.find(FIND_MY_SPAWNS)[0];

        // TODO: Add a load balancer to allocate workers appropriately amongst the different AI

        // Only execute infrastructure tasks in rooms we own
        if (spawn !== undefined) {
            Harvester.run(room);
            Upgrader.run(room, 2);
            Builder.run(room, 2);
            Spawner.run(room, spawn, 11, 40);
            Architect.run(room, spawn);
        }

        Warrior.run(room, 20);
    }

    GarbageCollector.run(Memory, Game);
}
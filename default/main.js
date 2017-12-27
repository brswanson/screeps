global.Utilities = require('utilities');
global.ClassWarrior = 'warrior';
global.ClassCivilain = 'civilain';

global.RoleHarveser = 'harvester';
global.RoleBuilder = 'builder';
global.RoleUpgrader = 'upgrader';
global.RoleWarrior = 'warrior';

const Harvester = require('aiRoleHarvesterAssigned');
const Upgrader = require('aiRoleUpgrader');
const Builder = require('aiRoleBuilder');
const Warrior = require('aiRoleWarrior');
const Spawner = require('aiSpawner');
const Architect = require('aiArchitect');
const GarbageCollector = require('garbageCollector');

global.Debug = true;
// global.Utilities.cull(Game.creeps);

module.exports.loop = function () {
    // Iterate over all existing rooms. As creeps enter new rooms, they will appear in the array
    for (var i in Game.rooms) {
        var room = Game.rooms[i];
        // TODO: Once the AI is able to generate multiple spawns per room, this will need to be updated
        var spawn = room.find(FIND_MY_SPAWNS)[0];

        // TODO: Add a load balancer to allocate workers appropriately amongst the different AI
        // Only execute infrastructure tasks in rooms we own
        if (spawn !== undefined) {
            var maxMiners = Harvester.run(room);
            Builder.run(room);
            Upgrader.run(room);
            Spawner.run(room, spawn, maxMiners, 3, 3, 40);
            Architect.run(room, spawn);
        }

        Warrior.run(room);
    }

    GarbageCollector.run(Memory, Game);
}
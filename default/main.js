global.Utilities = require('utilities');
global.ClassWarrior = 'warrior';
global.ClassCivilain = 'civilain';

global.RoleHarveser = 'harvester';
global.RoleBuilder = 'builder';
global.RoleUpgrader = 'upgrader';
global.RoleWarrior = 'warrior';

const Harvester = require('aiRoleHarvester');
const Upgrader = require('aiRoleUpgrader');
const Builder = require('aiRoleBuilder');
const Warrior = require('aiRoleWarrior');
const Spawner = require('aiSpawner');

const RoomSurveyor = require('aiRoomSurveyor');
const Architect = require('aiArchitect');
const GarbageCollector = require('garbageCollector');

global.Debug = true;
// global.Utilities.cull(Game.creeps);

module.exports.loop = function () {
    // Iterate over all existing rooms. As creeps enter new rooms, they will appear in the array
    for (var i in Game.rooms) {
        var room = Game.rooms[i];
        var spawn = RoomSurveyor.run(room);

        // TODO: Add a load balancer to allocate workers appropriately amongst the different AI
        // Only execute infrastructure tasks in rooms we own
        if (spawn !== undefined) {
            var maxMiners = Harvester.run(room);
            var maxBuilders = 3;
            var maxUpgraders = 2;
            var maxWarriors = 40;

            Builder.run(room);
            Upgrader.run(room);
            Spawner.run(room, spawn, maxMiners, maxBuilders, maxUpgraders, maxWarriors);
            Architect.run(room, spawn);
        }

        // Execute warrior AI last so if tasks are dropped due to CPU constraints it won't affect the economy as much
        Warrior.run(room);
    }

    GarbageCollector.run(Memory, Game);
}
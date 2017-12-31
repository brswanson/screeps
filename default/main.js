require('prototypes');

global.Utilities = require('utilities');
global.ClassWarrior = 'warrior';
global.ClassCivilain = 'civilain';

global.RoleHarvester = 'harvester';
global.RoleCarrier = 'carrier';
global.RoleBuilder = 'builder';
global.RoleUpgrader = 'upgrader';
global.RoleWarrior = 'warrior';

// const Harvester = require('aiRoleHarvester');
const Harvester = require('aiRoleHarvesterDrop');
const Carrier = require('aiRoleCarrier');
const Upgrader = require('aiRoleUpgrader');
const Builder = require('aiRoleBuilder');
const Warrior = require('aiRoleWarrior');

const Spawner = require('aiSpawner');
const RoomSurveyor = require('aiRoomSurveyor');
const Architect = require('aiArchitect');
const Warmaster = require('aiWarmaster');
const GarbageCollector = require('garbageCollector');

global.HeartBeat = 0;
global.Debug = true;
// for (let i in Game.creeps) Game.creeps[i].die();

module.exports.loop = function () {
    // Iterate over all existing rooms. As creeps enter new rooms, they will appear in the array
    for (let i in Game.rooms) {
        let room = Game.rooms[i];
        let spawn = RoomSurveyor.run(room);

        let militaryTarget = Warmaster.run();

        // TODO: Add a load balancer to allocate workers appropriately amongst the different AI
        // Only execute infrastructure tasks in rooms we own
        if (spawn !== undefined) {
            let maxHarvesters = Harvester.run(room);
            let maxCarriers = Carrier.run(room);
            let maxBuilders = 3;
            let maxUpgraders = 2;
            // TODO: Only spend CPU & Energy on warmaking if a Flag exists. This may become a liability and need to be updated at some point.
            let maxWarriors = ((militaryTarget !== undefined) ? 40 : 0);

            Builder.run(room);
            Upgrader.run(room);
            Spawner.run(room, spawn, maxHarvesters, maxCarriers, maxBuilders, maxUpgraders, maxWarriors);
            Architect.run(room, spawn);
        }

        // TODO: Only spend CPU & Energy on warmaking if a Flag exists. This may become a liability and need to be updated at some point.
        if (militaryTarget)
            Warrior.run(room, militaryTarget);
    }

    GarbageCollector.run(Memory, Game);

    // Increment the heartbeat. Some conditions are only checked at fixed intervals of the heart beat to conserve CPU
    global.HeartBeat++;
}
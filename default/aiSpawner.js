var aiSpawner = {
    run: function (room, spawn, maxHarvesters, maxCarriers, maxBuilders, maxUpgraders, maxWarriors) {
        // const PayloadHarvester = [WORK, WORK, MOVE, CARRY]; // 300 cost, 400 hits
        const PayloadDropHarvester = [WORK, WORK, MOVE]; // 250 cost, 300 hits
        const PayloadUtility = [MOVE, MOVE, WORK, CARRY]; // 250 cost, 400 hits
        const PayloadWarrior = [TOUGH, MOVE, MOVE, ATTACK]; // 190 cost, 400 hits

        let creeps = _.filter(Memory.creeps, function (creep) { return creep.room === room.name });
        let totalHarvesters = creeps.filter(c => c.job === global.RoleHarvester).length;
        let totalCarriers = creeps.filter(c => c.job === global.RoleCarrier).length;
        let totalBuilders = creeps.filter(c => c.job === global.RoleBuilder).length;
        let totalUpgraders = creeps.filter(c => c.job === global.RoleUpgrader).length;
        let totalWarriors = creeps.filter(c => c.job === global.RoleWarrior).length;

        // console.log('Harvesters ' + totalHarvesters + '/' + maxHarvesters);
        // console.log('Carriers ' + totalCarriers + '/' + maxCarriers);
        // console.log('Builders ' + totalBuilders + '/' + maxBuilders);
        // console.log('Upgraders ' + totalUpgraders + '/' + maxUpgraders);
        // console.log('Warriors ' + totalWarriors + '/' + maxWarriors);

        // Harvesters & Carriers
        if (totalHarvesters < maxHarvesters || totalCarriers < maxCarriers) {
            // Saturate each Harvester with at least one Carrier before spawning more Harvesters
            if (totalCarriers < totalHarvesters)
                spawnCreepWithProperties(totalCarriers, maxCarriers, PayloadUtility, global.ClassCivilain, global.RoleCarrier, room, spawn);
            else if (totalHarvesters < maxHarvesters)
                spawnCreepWithProperties(totalHarvesters, maxHarvesters, PayloadDropHarvester, global.ClassCivilain, global.RoleHarvester, room, spawn);
            else if (totalCarriers < maxCarriers)
                spawnCreepWithProperties(totalCarriers, maxCarriers, PayloadUtility, global.ClassCivilain, global.RoleCarrier, room, spawn);
        }
        // Builders
        else if (totalBuilders < maxBuilders) {
            spawnCreepWithProperties(totalBuilders, maxBuilders, PayloadUtility, global.ClassCivilain, global.RoleBuilder, room, spawn);
        }
        // Upgraders
        else if (totalUpgraders < maxUpgraders) {
            spawnCreepWithProperties(totalUpgraders, maxUpgraders, PayloadUtility, global.ClassCivilain, global.RoleUpgrader, room, spawn);
        }
        // Warriors
        else if (totalWarriors < maxWarriors) {
            spawnCreepWithProperties(totalWarriors, maxWarriors, PayloadWarrior, global.ClassWarrior, global.RoleWarrior, room, spawn);
        }
    }
}

function spawnCreepWithProperties(total, max, payload, className, roleName, room, spawn) {
    if (total <= max) {
        // No reason to check any further if the Spawner is occupied
        if (spawn.spawning)
            return 0;

        /*  TODO: Ideally we would wait until we have enough Energy to support the highest quality creep.
                    However, using the current Energy available prevents us from halting all spawning when no Energy is coming in.

            TODO: Harvesters only need 5 WORK bodies to optimally drop-harvest a Source. After that, CARRY would be better to reduce energy waste.
        */
        // Dynamically upgrade the passed in payload by duplicating it as much as the room's current energy available  can support
        let payloadCost = global.Utilities.creepCost(payload);
        let maxPayloadCopies = Math.floor(room.energyAvailable / payloadCost);

        // Not enough Energy to spawn any instances of the payload
        if (!maxPayloadCopies)
            return 0;

        if (room.energyAvailable >= payloadCost) {
            // Re-build the payload as needed
            if (maxPayloadCopies > 1) {
                let originalPayload = payload.splice(0);

                for (let i = 0; i < maxPayloadCopies; i++)
                    payload.push.apply(payload, originalPayload);
            }

            let creepName = room.name + '_' + roleName + '_' + global.Utilities.newGuid();
            let success = spawn.spawnCreep(payload, creepName, { memory: { room: room.name, class: className, job: roleName } });

            if (success >= 0)
                console.log('[' + room.name + '] spawned ' + className + ' creep [' + (total + 1) + '/' + max + '] ' + creepName);
            else
                console.log('[' + room.name + '] FAILED to spawn ' + className + ' creep [' + (total + 1) + '/' + max + '] ');
        }
    }
}

module.exports = aiSpawner;
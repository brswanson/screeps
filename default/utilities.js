var utilities = {
    newGuid: function () {
        function s4() {
            return Math.floor((1 + Math.random()) * 0x10000)
                .toString(16)
                .substring(1);
        }
        return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
    },

    hashTotal: function(creepHash) {
        return Object.keys(creepHash).length + 1;
    },

    creepCost: function(body) {
        return body.reduce(function (cost, part) {
            return cost + BODYPART_COST[part];
        }, 0);
    },
    
    roomEnergyAvailable: function(room) {
        return Game.rooms[room].energyAvailable;
    },
    
    isEnergyMax: function(spawn) {
        return spawn.energy === spawn.energyCapacity;
    },
    
    cull: function(creeps, minParts) {
        for (var i in creeps) {
            if (creeps[i].body.length < minParts) {
                console.log(creeps[i].name + ': Goodbye o7');
                creeps[i].suicide();
            }
        }
    },
};

module.exports = utilities;

// Links to screeps documentation
// http://docs.screeps.com/api/#
// http://docs.screeps.com/global-objects.html
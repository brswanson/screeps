var utilities = {
    newGuid: function () {
        function s4() {
            return Math.floor((1 + Math.random()) * 0x10000)
                .toString(16)
                .substring(1);
        }
        return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
    },

    hashLength: function (creepHash) {
        return Object.keys(creepHash).length;
    },

    creepCost: function (body) {
        return body.reduce(function (cost, part) {
            return cost + BODYPART_COST[part];
        }, 0);
    },

    roomEnergyAvailable: function (room) {
        return Game.rooms[room].energyAvailable;
    },

    isEnergyMax: function (spawn) {
        return spawn.energy === spawn.energyCapacity;
    },

    cull: function (creeps, minParts) {
        for (var i in creeps)
            this.die(creeps[i]);
    },

    die: function (creep) {
        console.log('[' + creep.name + ']: RIP ⚰');
        creep.suicide();
    },

    // TODO: Add this to the Creep prototype
    unemploy: function (creep) {
        creep.memory.job = undefined;
        creep.memory.sourceId = undefined;
    },

    layoff: function (creeps) {
        for (var i in creeps)
            this.unemploy(creeps[i]);
    },

    // TODO: Add this to the Source prototype
    findAvailableHarvestingLocations: function (source) {
        var pos = source.pos;
        var nw = new RoomPosition(pos.x - 1, pos.y + 1, pos.roomName);
        var n = new RoomPosition(pos.x, pos.y + 1, pos.roomName);
        var ne = new RoomPosition(pos.x + 1, pos.y + 1, pos.roomName);
        var w = new RoomPosition(pos.x - 1, pos.y, pos.roomName);
        var e = new RoomPosition(pos.x + 1, pos.y, pos.roomName);
        var sw = new RoomPosition(pos.x - 1, pos.y - 1, pos.roomName);
        var s = new RoomPosition(pos.x, pos.y - 1, pos.roomName);
        var se = new RoomPosition(pos.x + 1, pos.y - 1, pos.roomName);

        // Return any tile which is not an obstacle
        return [nw, n, ne, w, e, sw, s, se].filter(space => !OBSTACLE_OBJECT_TYPES.includes(Game.map.getTerrainAt(space)));
    },
};

module.exports = utilities;

/*
Links to screeps documentation
http://docs.screeps.com/api/#
http://docs.screeps.com/global-objects.html
Screeps body calc
https://codepen.io/findoff/full/RPmqOd/

Potential future emojis for debugging:
🔨
⛏
🛠
🗡
⚔
🔫
🏹
🛡
🔧
⚖
🔗
⛓
💉
💊
⚕
🛒
⚗
*/
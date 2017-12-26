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
            if (creeps[i].body.length < minParts)
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
    findAvailableMiningLocations: function (source) {
        var pos = source.pos;
        var nw = Game.map.getTerrainAt(new RoomPosition(pos.x - 1, pos.y + 1, pos.roomName));
        var n = Game.map.getTerrainAt(new RoomPosition(pos.x, pos.y + 1, pos.roomName));
        var ne = Game.map.getTerrainAt(new RoomPosition(pos.x + 1, pos.y + 1, pos.roomName));
        var w = Game.map.getTerrainAt(new RoomPosition(pos.x - 1, pos.y, pos.roomName));
        var e = Game.map.getTerrainAt(new RoomPosition(pos.x + 1, pos.y, pos.roomName));
        var sw = Game.map.getTerrainAt(new RoomPosition(pos.x - 1, pos.y - 1, pos.roomName));
        var s = Game.map.getTerrainAt(new RoomPosition(pos.x, pos.y - 1, pos.roomName));
        var se = Game.map.getTerrainAt(new RoomPosition(pos.x + 1, pos.y - 1, pos.roomName));

        return [nw, n, ne, w, e, sw, s, se].filter(space => !OBSTACLE_OBJECT_TYPES.includes(space));
    },
    
    getAdjacentSourceTiles: function (source) {
        var pos = source.pos;
        var nw = new RoomPosition(pos.x - 1, pos.y + 1, pos.roomName);
        var n = new RoomPosition(pos.x, pos.y + 1, pos.roomName);
        var ne = new RoomPosition(pos.x + 1, pos.y + 1, pos.roomName);
        var w = new RoomPosition(pos.x - 1, pos.y, pos.roomName);
        var e = new RoomPosition(pos.x + 1, pos.y, pos.roomName);
        var sw = new RoomPosition(pos.x - 1, pos.y - 1, pos.roomName);
        var s = new RoomPosition(pos.x, pos.y - 1, pos.roomName);
        var se = new RoomPosition(pos.x + 1, pos.y - 1, pos.roomName);

        return [nw, n, ne, w, e, sw, s, se];
    },
};

module.exports = utilities;

/*
Links to screeps documentation
http://docs.screeps.com/api/#
http://docs.screeps.com/global-objects.html

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
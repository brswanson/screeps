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

    // TODO: Add this to the Source prototype
    findAvailableHarvestingLocations: function (source) {
        let pos = source.pos;
        let nw = new RoomPosition(pos.x - 1, pos.y + 1, pos.roomName);
        let n = new RoomPosition(pos.x, pos.y + 1, pos.roomName);
        let ne = new RoomPosition(pos.x + 1, pos.y + 1, pos.roomName);
        let w = new RoomPosition(pos.x - 1, pos.y, pos.roomName);
        let e = new RoomPosition(pos.x + 1, pos.y, pos.roomName);
        let sw = new RoomPosition(pos.x - 1, pos.y - 1, pos.roomName);
        let s = new RoomPosition(pos.x, pos.y - 1, pos.roomName);
        let se = new RoomPosition(pos.x + 1, pos.y - 1, pos.roomName);

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
🔭
*/
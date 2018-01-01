// TODO: Will need to differentiate between this and mineral capacity in the future
Creep.prototype.isFull = function () {
    return this.carry.energy === this.carryCapacity;
};

// TODO: Will need to differentiate between this and mineral capacity in the future
Creep.prototype.isEmpty = function () {
    return this.carry.energy === 0;
};

Creep.prototype.recharge = function () {
    // Look for the closest allowed Energy: Containers, then Spawns
    let source = this.pos.findClosestByPath(FIND_STRUCTURES, {
        filter: function (s) {
            return (s.structureType == STRUCTURE_CONTAINER && s.store[RESOURCE_ENERGY] > 0)
                || (s.structureType == STRUCTURE_SPAWN && s.energy > 0)
        }
    });

    let transferResult = this.withdraw(source, RESOURCE_ENERGY);
    if (transferResult == ERR_NOT_IN_RANGE)
        this.travelTo(source);
    else if (transferResult == ERR_NOT_ENOUGH_RESOURCES)
        this.fleeFrom(destination);
};


Creep.prototype.cost = function () {
    return global.Utilities.creepCost(this.body);
};

Creep.prototype.isWounded = function () {
    return this.hits <= this.hitsMax * .2
};

Creep.prototype.die = function () {
    console.log('[' + this.name + ']: RIP ⚰');
    this.suicide();
};

Creep.prototype.unemploy = function () {
    this.memory.job = undefined;
    this.memory.sourceId = undefined;
};

Creep.prototype.fleeFrom = function (pursuer) {
    var xAdd = this.pos.x - pursuer.pos.x;
    var yAdd = this.pos.y - pursuer.pos.y;

    // Intentionally not using TravelTo since this should always be a small distance
    this.moveTo(this.pos.x + xAdd, this.pos.y + yAdd, { ignoreCreeps: true });
};
// TODO: Will need to differentiate between this and mineral capacity in the future
Creep.prototype.isFull = function () {
    return this.carry.energy === this.carryCapacity;
};

// TODO: Will need to differentiate between this and mineral capacity in the future
Creep.prototype.isEmpty = function () {
    return this.carry.energy === 0;
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
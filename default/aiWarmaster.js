var aiWarmaster = {
    run: function () {
        // TODO: Implement a Scout AI to enter nearby unclaimed rooms. Scouts will allow attack/defend flags to be placed in response to revealed information.
        // Get the first war flag if it exists. War flags are any flag containing the word 'war' in their name. These flags must be manually created by a User for now.
        var flags = Game.flags;
        for (var i in flags)
            if (flags[i].name.match((/war/i)))
                return flags[i];
    }
}

module.exports = aiWarmaster;
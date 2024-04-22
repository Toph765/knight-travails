const node = (value = null, neighbors = [], distance = null, pred = null) => {
    return {
        value,
        neighbors,
        distance,
        pred
    };
};

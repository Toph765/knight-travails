const node = (value = null, neighbors = [], distance = null, pred = null) => {
    return {
        value,
        neighbors,
        distance,
        pred
    };
};

const makeBoard = (n) => {
    let board = [];

    for (let x = 0; x < n; x++) {
        for (let y = 0; y < n; y++) {
            board[x][y] = [x, y];
        };
    };
};

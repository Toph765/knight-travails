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

const adjacencyList = (board) => {
    let list = [];
    let moves = [
        [2, 1], [2, -1],
        [-2, 1], [-2, -1],
        [1, 2], [1, -2],
        [-1, 2], [-1, -2]
    ];

    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board.length; j++) {
            let x = board[i][j][0];
            let y = board[i][j][1];
            let sourceNode = node(board[i][j]);

            moves.forEach(square => {
                let pair = [x + square[0], y + square[1]];
                if (pair[0] < 8 && pair[0] >= 0 && pair[1] < 8 && pair[1] >= 0) {
                    sourceNode.neighbors.push(pair);
                };
            });

            list.push(sourceNode);
        };
    };
    return list;
}
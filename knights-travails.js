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

const findPaths = (arr) => {
    let adjList = adjacencyList(makeBoard(8));
    let index = adjList.findIndex(node => {
        return node.value[0] === arr[0] && node.value[1] === arr[1];
    });
    adjList[index].distance = 0;
    adjList[index].pred = "N/A";

    let queue = [adjList[index]];
    let visitedNode = [];
    distance = 0;

    while (queue.length !== 0) {
        if (queue[0].distance === null) queue[0].distance = distance;

        visitedNode.push(queue[0]);

        queue[0].neighbors.forEach(pair => {
            let index = adjList.findIndex(node => {
                return node.value[0] === pair[0] && node.value[1] === pair[1];
            });
            let temp = adjList[index];

            if (temp.distance === null && temp.pred === null) {
                queue.push(temp);
            };

            if (temp.distance === null) temp.distance = visitedNode[visitedNode.length - 1].distance + 1;

            if (temp.pred === null) temp.pred = visitedNode[visitedNode.length - 1].value;
        });

        distance += 1;
        queue.shift();
    };

    return adjList;
};

const shortestPath = (arr, adjList) => {
    const index = adjList.findIndex(node => {
        node.value[0] === arr[0] && node.value[1] === arr[1];
    });
    const arrNode = adjList[index];
    let currentNode = arrNode;
    let pathsArray = [];

    while (currentNode.distance !== 0) {
        let pred = currentNode.pred;
        let predIndex = adjList.findIndex(node => {
            node.value[0] === pred[0] && node.value[1] === pred[1];
        });
        let nextNode = adjList[predIndex];
        pathsArray.push(currentNode.value);
        currentNode = nextNode;
    };

    pathsArray.push(currentNode.value);
    return pathsArray;
};


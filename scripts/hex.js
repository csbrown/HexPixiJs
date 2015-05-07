/// <reference path="vend/pixi.dev.js" />
/// <reference path="hexpixi.js" />
(function (window) {
    'use strict';

    var MAPSIZE = 14,
        TILESIZE = 20,
        BORDERWIDTH = 4,
        MAPWIDTH = MAPSIZE * 2 - 1,
        MAPHEIGHT = MAPSIZE;

    var colors = {"blue" : 0,
                  "yellow" : 1,
                  "white" : 2
    };

    var turn = "blue";

    var hp = window.HexPixi = window.HexPixi || {},
        map = null,
        stage = new PIXI.Stage(0xe0e0e0),
        stageWidth = MAPWIDTH * (TILESIZE * 1.53),
        stageHeight = MAPHEIGHT * (TILESIZE*1.81),
        renderer = new PIXI.autoDetectRenderer(stageWidth, stageHeight, {
            antialiasing: false,
            transparent: false,
            resolution: 1
        });

    var setupHexGameMap = function() {
        var howManyWhite = 1 + 2*(map.options.mapHeight % 2);
        var afterHalfway = 1;
        var colorLeft = colors["yellow"];
        var colorRight = colors["blue"];
        for (var row = 0; row < map.options.mapHeight; row++) {
            map.cells.push([]);
            //Halfway, so change some shit
            if (row == Math.floor(map.options.mapHeight/2)) {
                colorLeft = colors["blue"];
                colorRight = colors["yellow"];
                afterHalfway = -1;
                howManyWhite -= 2;
            }
            var howManyNonWhite = Math.floor((map.options.mapWidth - howManyWhite)/2);
            for (var col = 0; col < map.options.mapWidth; col++) {
                var color = (col < howManyNonWhite) ? colorLeft : (col < howManyNonWhite + howManyWhite) ? colors["white"] : colorRight;
                var cell = new hp.Cell(row, col, color);
                map.cells[row].push(cell);
            }

            howManyWhite += afterHalfway * 4;
        }

        map.createSceneGraph();
    };

    var onHexClick = function(cell, data) {
        console.log("blah!");
        if (cell.terrainIndex == colors["white"]) {
            var newCell = new hp.Cell(cell.row, cell.column, colors[turn])
            turn = (turn == "blue") ? "yellow" : "blue";
            map.hexes.removeChild(cell)
            map.hexes.addChild(map.createInteractiveCell(newCell));
            //map.createSceneGraph();
        }
    }

    function animate() {
        requestAnimFrame(animate);
        // render the stage
        renderer.render(stage);
    }

    function getOptions() {
        return {
            mapWidth: MAPWIDTH,
            mapHeight: MAPHEIGHT,
            coordinateSystem: 1,
            hexLineWidth: BORDERWIDTH,
            hexSize: TILESIZE,
            showCoordinates: false,
            onHexClick: onHexClick,
            terrainTypes: [
                { name: "blue", color: 0x0000FF },
                { name: "yellow", color: 0xFFFF00 },
                { name: "white", color: 0x000000 }
            ],
            onAssetsLoaded: function () { requestAnimFrame(animate); }
        }
    }

    function setupPixiJs() {
        // add the renderer view element to the DOM
        var div = document.getElementById('stage');
        div.appendChild(renderer.view);

        //requestAnimFrame(animate);
        map = new hp.Map(stage, getOptions());
    }


    function initPage() {
        setupPixiJs();
        setupHexGameMap();
    }

    initPage();

}(window));

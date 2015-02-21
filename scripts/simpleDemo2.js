/// <reference path="vend/pixi.dev.js" />
/// <reference path="hexpixi.js" />
(function (window) {
    'use strict';
    var hp = window.HexPixi = window.HexPixi || {},
        map = null,
        stage = new PIXI.Stage(0xe0e0e0),
        renderer = new PIXI.autoDetectRenderer(800, 600, {
            antialiasing: false,
            transparent: false,
            resolution: 1
        });

    function onHexClick(cell, data) {
        map.setCellTerrainType(cell, 0);
        //map.camera.position(-cell.center.x+30, -cell.center.y+30);
        //console.log(map.camera.position());
    }

    function animate() {
        requestAnimFrame(animate);
        // render the stage
        renderer.render(stage);
    }

    function getOptions() {
        return {
            mapWidth: 30,
            mapHeight: 30,
            coordinateSystem: 2,
            hexLineWidth: 2,
            hexLineColor: 0xd0d0d0,
            hexWidth: 65,
            hexHeight: 65,
            hexBottomPad: 24,
            onHexClick: onHexClick,
            textures: [
                "images/game/tile/tileGrass.png",
                "images/game/tile/tileSand.png",
                "images/game/tile/tileDirt.png",
                "images/game/tile/tileRock.png",
                "images/game/tile/tileSnow.png",
                "images/game/tile/tileWater.png"
            ],
            terrainTypes: [
                { name: "empty", color: 0xffffff, isEmpty: true },
                { name: "grass", tileIndex: 0, color: 0x10fa10 },
                { name: "sand", tileIndex: 1, color: 0xdBd588 },
                { name: "dirt", tileIndex: 2, color: 0x9B5523 },
                { name: "rock", tileIndex: 3, color: 0x808080 },
                { name: "snow", tileIndex: 4, color: 0xe2e2fa },
                { name: "water", tileIndex: 5, color: 0x4060fa }
            ],
            onAssetsLoaded: function () { requestAnimFrame(animate); }
        }
    }

    function setupPixiJs() {
        // add the renderer view element to the DOM
        var div = document.getElementById('stage');
        div.appendChild(renderer.view);

        map = new hp.Map(stage, getOptions());
    }

    function initPage() {
        setupPixiJs();
        map.generateRandomMap();
    }

    initPage();
}(window));
import React, { useState, useEffect } from "react";
import * as Constants from '../constants';

// Components
import EditTray from '../Components/EditTray';
import TokenDrawer from '../Components/TokenDrawer';
import MapDrawer from '../Components/MapDrawer';
import OptionTray from '../Components/OptionTray';
import Canvas from "../Components/Canvas";
import TokenInfo from "../Components/TokenInfo";

// Backend Imports
import s3Upload from "../libs/s3Bucket";
import s3Get from '../libs/s3Get';
import postFiles from '../libs/postFiles';
import getFiles from '../libs/getFiles';
import updateFile from '../libs/updateFile';
import deleteFiles from '../libs/deleteFiles';

import testToken1 from '../Data/tokens/dax.jpg';
import testToken2 from '../Data/tokens/pop.jpg';

function MapPage(props) {
    // List of game states
    const [gameList, setGameList] = useState(null);

    // Current game state
    const [gameState, SetGameState] = useState({ gameId: null, mapKeys: [], tokenKeys: [] });

    // User interface variables
    const [TokenDrawerState, setTokenDrawerState] = useState("drawerClosed");
    const [MapDrawerState, setMapDrawerState] = useState("drawerClosed");
    const [optionTrayState, setOptionTrayState] = useState(false);

    // Canvas state variables
    const [mapList, setMapList] = useState([]);
    const [tokenList, setTokenList] = useState([]);
    const [currentMap, setCurrentMap] = useState(null);
    const [mapScale, setMapScale] = useState(1);
    const [gridScale, setGridScale] = useState(50);
    const [selectedToken, setSelectedToken] = useState(false)

    useEffect(() => {
        if (props.isTest)
            prepareTest();

        loadDB();
    }, []);


    // This function creates an initial board state so none-users can try out the application.
    function prepareTest() {

        let img = new Image();
        let img2 = new Image();
        let array = new Array();

        img.src = testToken1;
        img2.src = testToken2;
        console.log(img.src)
        let newToken = {
            img: img,
            key: "testToken1",
            name: "Dax"
        }

        let newToken2 = {
            img: img2,
            key: "testToken2",
            name: "Pop"
        }

        array.push(newToken);
        array.push(newToken2);

        setTokenList(array);
    }

    // State object function. Returns an object with the correct attributes to match schema for backend.
    function boardState(maps, tokens) {
        const state = {
            content: {
                maps: maps,
                tokens: tokens
            }
        }
        return state;
    }

    // Backend file upload functions

    // Fetches information from DB using the libs hook getFiles.
    async function loadDB() {
        if (props.isTest)
            return;

        try {
            // getFiles is a lib function that queries backend for content
            const games = await getFiles();

            if (games[0]) {
                // Stores information
                setGameList(games);

                // parses out that information into state
                gameState.gameId = games[0].gameid;
                gameState.mapKeys = games[0].content.maps;
                gameState.tokenKeys = games[0].content.tokens

                // Fetches assets from backend and populates local data structures
                for (let i = 0; i < gameState.mapKeys.length; ++i) {
                    let file = await s3Get(gameState.mapKeys[i]);
                    let img = new Image();
                    img.src = file;

                    let newMap = {
                        img: img,
                        key: gameState.mapKeys[i]
                    }

                    setMapList(mapList => [...mapList, newMap]);
                }

                for (let i = 0; i < gameState.tokenKeys.length; ++i) {
                    let file = await s3Get(gameState.tokenKeys[i]);
                    let img = new Image();
                    img.src = file;

                    let newToken = {
                        img: img,
                        key: gameState.tokenKeys[i]
                    }

                    setTokenList(tokenList => [...tokenList, newToken]);
                }
            }
        } catch (e) {
            console.log(e)
        }
    }

    // onClick handler for map removal
    async function deleteMap(newList, key) {
        if (props.isTest) {
            setMapList(newList);
            return;
        }
        try {
            let index = gameState.mapKeys.indexOf(key + "map");
            if (index > -1) {
                gameState.mapKeys.splice(index, 1);
                // Array needs to be copied so when setMapList is called, the app rerenders.
                newList.splice(index, 1);
                setMapList(newList);
            }
            const newState = boardState(gameState.mapKeys, gameState.tokenKeys);
            await deleteFiles(gameState.gameId, newState, key);
        } catch (e) {
            console.log(e);
        }
    }

    // onClick handler for token removal
    async function deleteToken(key) {

        // If not logged in, delete works locally only.
        if (props.isTest) {
            let newList = new Array();
            for (let i = 0; i < tokenList.length; i++) {
                if (tokenList[i].key !== key) {
                    newList.push(tokenList[i]);
                }
            }
            setTokenList(newList);
            return;
        }

        // If logged in, delete needs update DB
        try {
            let index = gameState.tokenKeys.indexOf(key);
            if (index > -1) {
                gameState.tokenKeys.splice(index, 1);

                // Array needs to be copied so when setMapList is called, the app rerenders.
                let newList = [...tokenList];
                newList.splice(index, 1);
                setTokenList(newList);
            }

            const newState = boardState(gameState.mapKeys, gameState.tokenKeys);
            await deleteFiles(gameState.gameId, newState, key);
        } catch (e) {
            alert(e);
        }
    }

    // User interface functions

    function tokenInformationHandler(target) {

        let size = tokenList.length;
        let index = -1;
        for (let i = 0; i < size; ++i) {
            if (tokenList[i].key === target)
                index = i;
        }

        if (index === -1)
            return;

        if (tokenList[index].key === selectedToken.key)
            setSelectedToken(false);
        else
            setSelectedToken(tokenList[index])
    }

    function updateTokenInfoHandler(newInfo) {
        console.log(newInfo)
        let newList = [...tokenList];
        let size = newList.length;
        for (let i = 0; i < size; ++i) {
            if (newList[i].key === newInfo.key)
                newList[i] = newInfo;
        }

        setTokenList(newList);
    }

    function toggleOptionTray() {
        setOptionTrayState(!optionTrayState);
    }

    // sets all visible panels to hidden.
    function closeAll() {
        setOptionTrayState(false);
        setSelectedToken(false);
        setTokenDrawerState("drawerClosed");
        setMapDrawerState("drawerClosed");
    }

    // Toggles visibility of token tray panel
    function toggleTokenTray() {

        if (MapDrawerState === "drawerOpen")
            toggleMaps();

        if (TokenDrawerState === "drawerClosed")
            setTokenDrawerState("drawerDocked")
        else
            setTokenDrawerState("drawerClosed")
    }

    // Toggles visibility of map tray panel
    function toggleMaps() {

        if (TokenDrawerState === "drawerDocked")
            toggleTokenTray();

        if (MapDrawerState === "drawerClosed")
            setMapDrawerState("drawerOpen")
        else
            setMapDrawerState("drawerClosed")
    }


    // Canvas variable functions
    function changeMap(event) {
        let newMap = mapList[event.target.id[0]]
        setCurrentMap(newMap.img);
    }

    // function called on slider change in optionTray. Uses slider value to define map scale
    function scaleMap(event) {
        let scale = event.target.value / 50;
        setMapScale(scale);
    }

    // function called on slider change in optionTray. Uses slider value to define grid scale.
    function scaleGrid(event) {
        let scale = parseInt(event.target.value);
        setGridScale(scale);
    }


    // Fetch file from user functions
    async function uploadBackground(event) {

        let reader = new FileReader();

        const imageFiles = event.target.files;
        let file = imageFiles[0];

        // checkMapSize fails if file is too large 
        if (!checkMapSize(file))
            return;

        if (mapList.length > 4) {
            alert("You cannot have more than 5 maps uploaded during this stage of development.");
            return;
        }


        let fileKey;
        let gameId;

        if (!gameList && !props.isTest) {
            try {
                fileKey = await s3Upload(file, file.type, "map");
                gameId = await postFiles(boardState(gameState.mapKeys, gameState.tokenKeys));
                gameState.gameId = gameId.gameid;
                gameState.mapKeys = [fileKey]
            } catch (e) {
                alert(e);
            }
        } else {
            if (!props.isTest) {
                try {
                    fileKey = await s3Upload(file, file.type, "map");
                    let list = gameState.mapKeys;
                    gameState.mapKeys = [...list, fileKey];
                    await updateFile(boardState(gameState.mapKeys, gameState.tokenKeys), gameState.gameId);
                } catch (e) {
                    alert(e);
                }
            }
        }


        // This should only happen when props.isTesting is true
        if (fileKey === undefined) {
            let date = new Date();
            fileKey = date.getTime();
        }

        reader.onload = () => {
            let img = new Image();
            img.src = reader.result;

            let newMap = {
                img: img,
                key: fileKey
            }

            setMapList(mapList => [...mapList, newMap]);
        }

        reader.readAsDataURL(file);
    }

    async function uploadTokenHandler(event) {

        const imageFiles = event.target.files;

        let reader = new FileReader();
        let file = imageFiles[0];

        // checkTokenSize fails if file is too large 
        if (!checkTokenSize(file))
            return;

        if (tokenList.length > 9) {
            alert("You cannot have more than 10 tokens uploaded during this stage of development.");
            return;
        }

        let fileKey;
        let gameId;

        if (!gameList && !props.isTest) {
            try {
                fileKey = await s3Upload(file, file.type, "token");
                gameId = await postFiles(boardState(gameState.mapKeys, gameState.tokenKeys));
                gameState.gameId = gameId.gameid;
                gameState.tokenKeys = [fileKey]
            } catch (e) {
                alert(e);
            }
        } else {
            if (!props.isTest) {
                try {
                    fileKey = await s3Upload(file, file.type, "token");
                    let list = gameState.tokenKeys;
                    gameState.tokenKeys = [...list, fileKey];
                    await updateFile(boardState(gameState.mapKeys, gameState.tokenKeys), gameState.gameId);
                } catch (e) {
                    alert(e);
                }
            }
        }

        // This should only happen when props.isTesting is true
        if (fileKey === undefined) {
            let date = new Date();
            fileKey = date.getTime();
        }

        reader.onload = () => {
            let img = new Image();
            img.src = reader.result;
            let newToken = {
                img: img,
                key: fileKey,
                name: ""
            }
            setTokenList(tokenList => [...tokenList, newToken]);
        }

        reader.readAsDataURL(file);
    }

    function checkMapSize(file) {
        if (file && file.size > Constants.MAX_MAP_SIZE) {
            alert(
                `Please pick a file smaller than ${Constants.MAX_MAP_SIZE / 1000000
                } MB.`
            );
            return 0;
        }
        return 1;
    }

    function checkTokenSize(file) {
        if (file && file.size > Constants.MAX_TOKEN_SIZE) {
            alert(
                `Please pick a file smaller than ${Constants.MAX_TOKEN_SIZE / 8000
                } kb.`
            );
            return 0;
        }
        return 1;
    }


    return (
        <div >
            <Canvas
                mode={props.mode}
                gridScale={gridScale}
                currentMap={currentMap}
                mapScale={mapScale}
            />
            <OptionTray
                mode={props.mode}
                scaleGrid={scaleGrid}
                scaleMap={scaleMap}
                toggleMode={props.toggleMode}
                handleLogout={props.handleLogout}
                state={optionTrayState}
            />
            <EditTray
                mode={props.mode}
                toggleTokens={toggleTokenTray}
                toggleMaps={toggleMaps}
                toggleOptions={toggleOptionTray}
                close={closeAll}
            />
            <TokenDrawer
                mode={props.mode}
                state={TokenDrawerState}
                getToken={uploadTokenHandler}
                tokens={tokenList}
                deleteToken={deleteToken}
                tokenInformation={tokenInformationHandler}
            />
            <MapDrawer
                mode={props.mode}
                state={MapDrawerState}
                getMap={uploadBackground}
                maps={mapList} changeMap={changeMap}
                deleteMap={deleteMap}
            />
            <TokenInfo
                mode={props.mode}
                selected={selectedToken}
                updateTokenInfo={updateTokenInfoHandler}
            />
        </div>
    );
}

export default MapPage;
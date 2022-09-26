var fetch = require('node-fetch');
const HttpsProxyAgent = require('https-proxy-agent');

const buildAddUserDevice = require('./add-userdevice/src/add-userdevice');
const buildCreateAddUserDeviceRequest = require('./add-userdevice/src/create-add-userdevice-request');

const buildEditUserDevicePermission = require('./edit-userdevice-permission/src/edit-userdevice-permission');
const buildCreateEditUserDevicePermissionRequest = require('./edit-userdevice-permission/src/create-edit-userdevice-permisson-request');

const buildCreateDeleteUserDeviceRequest = require('./delete-userdevice/src/create-delete-userdevice-request');
const buildDeleteUserDevice = require('./delete-userdevice/src/delete-userdevice');

const buildCreateGetAllUserDeviceByDeviceRequest = require('./getAll-userdevice-by-device/src/create-getAll-userdevice-by-device-request');
const buildTranslateGetAllUserDeviceByDeviceResponse = require('./getAll-userdevice-by-device/src/translate-getAll-userdevice-by-device-response');
const buildGetAllUserDeviceByDevice = require('./getAll-userdevice-by-device/src/getAll-userdevice-by-device');

const buildCreateGetAllUserDeviceByUserRequest = require('./getAll-userdevice-by-user/src/create-getAll-userdevice-by-user-request');
const buildGetAllUserDeviceByUser = require('./getAll-userdevice-by-user/src/getAll-userdevice-by-user');
const buildTranslateGetAllUserDeviceByUserResponse = require('./getAll-userdevice-by-user/src/translate-getAll-userdevice-by-user-response');

const buildCreateGetUserDeviceByDeviceAndUserRequest = require('./get-userdevice-by-device-and-user/src/create-get-userdevice-by-device-and-user-request');
const buildTranslateGetUserDeviceByDeviceAndUserResponse = require('./get-userdevice-by-device-and-user/src/translate-get-userdevice-by-device-and-user-response');
const buildGetUserDeviceByDeviceAndUser = require('./get-userdevice-by-device-and-user/src/get-userdevice-by-device-and-user');

const buildCreateEditUserDeviceTitleRequest = require('./edit-userdevice-title/src/create-edit-userdevice-title-request');
const buildEditUserDeviceTitle = require('./edit-userdevice-title/src/edit-userdevice-title');

module.exports  = function(APPID, APIKEY, proxyUrl){

    if(!APPID){
        throw new Error("MongoDB Data Api must have an APPID");
    }

    if(!APIKEY){
        throw new Error("MongoDB Data Api must have an APIKEY");
    }

    let proxyAgent = undefined;
    if(proxyUrl){
        proxyAgent = new HttpsProxyAgent(proxyUrl);
    }

    const createAddUserDeviceRequest = buildCreateAddUserDeviceRequest(APIKEY,proxyAgent);
    const addUserDevice = buildAddUserDevice(APPID,fetch, createAddUserDeviceRequest);

    const createEditUserDevicePermissionRequest = buildCreateEditUserDevicePermissionRequest(APIKEY, proxyAgent);
    const editUserDevicePermission = buildEditUserDevicePermission(APPID,fetch, createEditUserDevicePermissionRequest);

    const createDeleteUserDeviceRequest = buildCreateDeleteUserDeviceRequest(APIKEY, proxyAgent);
    const deleteUserDevice = buildDeleteUserDevice(APPID,fetch, createDeleteUserDeviceRequest);

    const createGetAllUserDeviceByDeviceRequest = buildCreateGetAllUserDeviceByDeviceRequest(APIKEY, proxyAgent);
    const translateGetAllUserDeviceByDeviceResponse = buildTranslateGetAllUserDeviceByDeviceResponse();
    const getAllUserDeviceByDevice = buildGetAllUserDeviceByDevice(
        APPID,
        fetch,
        createGetAllUserDeviceByDeviceRequest,
        translateGetAllUserDeviceByDeviceResponse)

    const createGetAllUserDeviceByUserRequest = buildCreateGetAllUserDeviceByUserRequest(APIKEY, proxyAgent);
    const translateGetAllUserDeviceByUserResponse = buildTranslateGetAllUserDeviceByUserResponse();
    const getAllUserDeviceByUser = buildGetAllUserDeviceByUser(APPID,fetch,createGetAllUserDeviceByUserRequest,translateGetAllUserDeviceByUserResponse)

    const createGetUserDeviceByDeviceAndUserRequest = buildCreateGetUserDeviceByDeviceAndUserRequest(APIKEY, proxyAgent);
    const translateGetUserDeviceByDeviceAndUserResponse = buildTranslateGetUserDeviceByDeviceAndUserResponse();
    const getUserDeviceByDeviceAndUser = buildGetUserDeviceByDeviceAndUser(
        APPID,
        fetch,
        createGetUserDeviceByDeviceAndUserRequest,
        translateGetUserDeviceByDeviceAndUserResponse
        );

    const createEditUserDeviceTitleRequest = buildCreateEditUserDeviceTitleRequest(APIKEY, proxyAgent);
    const editUserDeviceTitle = buildEditUserDeviceTitle(APPID,fetch, createEditUserDeviceTitleRequest);

    return Object.freeze(
        {
            addUserDevice,
            editUserDevicePermission,
            deleteUserDevice,
            getAllUserDeviceByDevice,
            getAllUserDeviceByUser,
            getUserDeviceByDeviceAndUser,
            editUserDeviceTitle
        }
    );
}
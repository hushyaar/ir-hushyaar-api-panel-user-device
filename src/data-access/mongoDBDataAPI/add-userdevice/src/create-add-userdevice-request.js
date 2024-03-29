module.exports =  function buildCreateAddUserDeviceRequest(apikey ,proxyAgent){
    return function createAddUserDeviceRequest(userDevice){
        

        var options= {
            method:"POST",
            headers:
                {
                    "api-key": apikey,
                    "content-type":"application/json"
                },
            body: JSON.stringify(
                {
                    collection:"userdevices",
                    database:"homeSecurity",
                    dataSource:"Cluster0",
                    document: userDevice.toBson()
                }
            )
        };


        if(proxyAgent){
            options.agent = proxyAgent;
        }

        return options;
    }
}
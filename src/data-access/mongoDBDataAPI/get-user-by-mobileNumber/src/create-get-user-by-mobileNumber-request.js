module.exports = function buildCreateGetUserByMobileNumberRequest(
    apikey,
    proxyAgent
)
    {
        return function createGetUserByMobileNumberRequest(
            mobileNumber
        )
            {
                const query = {
                    "mobileNumber": mobileNumber 
                };

                const headers = {
                    "api-key": apikey,
                    "content-type":"application/json"
                };

                const body = JSON.stringify(
                    {
                        collection:"users",
                        database:"homeSecurity",
                        dataSource:"Cluster0",
                        filter: query
                    }
                );
        
                var options= {
                    method:"POST",
                    headers:headers,
                    body: body
                };
        
                if(proxyAgent){
                    options.agent = proxyAgent;
                }
        
        
                return options;
            }
    }

var getAPI = require('./getAPI')
var fs = require('fs')



var input = JSON.parse(fs.readFileSync('input.txt').toString())

async function getParm(){
    tax_rate = await getAPI.getAPI("treasury/tax_rate")
    luna_tax_cap = await getAPI.getAPI("treasury/tax_cap/uluna")
    lp_commission = 0.003
    gas = 0 //where can i get this?
    token = input.token
    amount = input.amount
    if (token == "luna"){
        console.log("\nswap " + amount + " LUNA to bLUNA\n")
        uamount = amount * 1000000
        opptoken = "bluna"
    }else{
        console.log("\nswap " + amount + " bLUNA to LUNA\n")
        uamount = amount * 1000000
        opptoken = "luna"
    }

}



function blunaLeftover(amount){
    return 'wasm/contracts/terra1jxazgm67et0ce260kvrpfv50acuushpjsz2y0p/store?query_msg={"simulation":{"offer_asset":{"info":{"token":{"contract_addr":"terra1kc87mu460fwkqte29rquh4hc20m54fxwtsx7gp"}},"amount":"'+amount+'"}}}'
}
function lunaLeftover(amount){
    return 'wasm/contracts/terra1jxazgm67et0ce260kvrpfv50acuushpjsz2y0p/store?query_msg={"simulation":{"offer_asset":{"info":{"native_token":{"denom":"uluna"}},"amount":"'+amount+'"}}}'
}


async function processFunc(){
    await getParm()
    if (token == "luna"){
        a = await getAPI.getAPI(lunaLeftover(uamount))
        
    }else {
        a = await getAPI.getAPI(blunaLeftover(uamount))
    }
    tax = 0
    raw_receive = a.result.return_amount/1000000
    
    if (token == "bluna"){
        tax = Math.round(raw_receive*tax_rate.result*1000000)/1000000
        if (tax>1){
            tax=1
        }
    }
    receive = raw_receive - tax
    console.log("you will receive: " + receive + " " + opptoken + "\t(" + Math.round((receive-amount)/amount*10000)/100 + "%)") 
    
}

processFunc()



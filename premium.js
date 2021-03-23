
var getAPI = require('./getAPI')




leftover = 'wasm/contracts/terra1jxazgm67et0ce260kvrpfv50acuushpjsz2y0p/store?query_msg={%22pool%22:{}}'

perLUNA = 0

//make initial bLUNA/LUNA to 0
bLUNA = 0
LUNA = 1

processFunc = async function() {
    

    a = await getAPI.getAPI(leftover)
    if (a){
        bLUNA = a.result.assets[0].amount
        LUNA = a.result.assets[1].amount
    }
    
    if (perLUNA != bLUNA/LUNA){
        perLUNA = bLUNA/LUNA
        console.log("\007")
        console.log("Changed price!")
        
        console.log("1LUNA = " + Math.round(bLUNA/LUNA*10000)/10000 + "bLUNA  ("  + Math.round((bLUNA/LUNA-1)*10000)/100 + "%)\t" +  "1bLUNA = " + Math.round(LUNA/bLUNA*10000)/10000 + "LUNA  ("  + Math.round((LUNA/bLUNA-1)*10000)/100 + "%)")
    }

}
processFunc() // initial start
setInterval(processFunc,10000)
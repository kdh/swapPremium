
var getAPI = require('./getAPI')
var fs = require('fs')
var soundOption = JSON.parse(fs.readFileSync('soundOption.txt').toString())

function makesound(){
    console.log("\007")
}

above = Number(soundOption.warn_above)
below = Number(soundOption.warn_below)

function sound(perLUNA){
    if (soundOption.sound=="off"){
        console.log("")
    }else{
        if (soundOption.update =="on"){
            makesound()
        }
        else{
            console.log("")
            
        }
    

        if (soundOption.warn == "on" && (perLUNA >= 1 + above/100 || perLUNA <= 1 + below/100)){
            if(soundOption.update == "off"){
                makesound()
            }
            setTimeout(makesound, 1000)
            setTimeout(makesound, 2000)


        }
    }

}


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
        sound(perLUNA)
        console.log("Changed price!")
        
        console.log("1LUNA = " + Math.round(bLUNA/LUNA*10000)/10000 + "bLUNA  ("  + Math.round((bLUNA/LUNA-1)*10000)/100 + "%)\t" +  "1bLUNA = " + Math.round(LUNA/bLUNA*10000)/10000 + "LUNA  ("  + Math.round((LUNA/bLUNA-1)*10000)/100 + "%)")
    }

}
processFunc() // initial start
setInterval(processFunc,10000)
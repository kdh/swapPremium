//API 불러 오는 함수 모듈

var fetch = require('node-fetch');


exports.getAPI = async function (leftover){
    if (leftover){
        try{
            a = await fetch('https://lcd.terra.dev/' + leftover, {
                headers: {
                    'accept': 'application/json'
                }
            }).then(response=>{
                return response.json();
            }).catch();
            return a
        } catch(error){
            console.log("Error!")
            return false //API 불러오기 오류 시 false 반환
        }
    }else{
        return false   
    }
}
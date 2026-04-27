function createUniqueName(image) {
    return Date.now()+Math.floor(Math.random()*10000)+"_"+image
}


module.exports={createUniqueName};
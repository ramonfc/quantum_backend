function formatDate(){
    const date = new Date();
    console.log('fecha: ',date)
    return (date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate());
}

const dateNow = ()=>{
    return new Date()
}

module.exports= {formatDate, dateNow};
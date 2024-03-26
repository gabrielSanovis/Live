export const formatTime = (_date: Date) => {
    let date = new Date(_date);
    const hours = date.getUTCHours();
    const minutes = date.getUTCMinutes();
    const secondes = date.getUTCSeconds();
    const mili = date.getUTCMilliseconds();
    let formattedDate = hours < 10 ? `0${hours}:` : `${hours}:` ;
    formattedDate += minutes < 10 ? `0${minutes}:` : `${minutes}:` 
    formattedDate += secondes < 10 ? `0${secondes}:` : `${secondes}:`
    formattedDate += mili
    return formattedDate;
}
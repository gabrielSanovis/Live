export const formatTime = (_date: Date) => {
    let date = new Date(_date);
    const hours = date.getUTCHours();
    const minutes = date.getUTCMinutes();
    let formattedDate = hours < 9 ? `0${hours}:` : `${hours}:` ;
    formattedDate += minutes < 9 ? `0${minutes}` : `${minutes}` 
    return formattedDate;
}
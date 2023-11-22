export const formatDateToString = (providedDate)=>{
    const date = new Date(providedDate)
const options = { day: 'numeric', month: 'long', year: 'numeric' };
return date?.toLocaleDateString('en-US', options);

}


export  const hourlyDate = (date)=>{
const mongodbDate = new Date(date);
const options = { hour: 'numeric',minute:'numeric', second:'numeric', day: 'numeric', month: 'numeric' };
const formattedDate = mongodbDate.toLocaleString('en-US', options);


return formattedDate
}
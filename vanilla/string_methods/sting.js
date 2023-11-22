export const strToArr = (str,reg)=>{
    const arr = str?.split(reg)
    return arr
}

export function formatObjectKey(input) {
    return input
      ?.replace(/([a-z])([A-Z])/g, '$1 $2') // Add space between lowercase and uppercase
      ?.toLowerCase(); // Convert the whole string to lowercase
  }
export function toIso(d){
    let dt = d.split('/')
    return dt[2]+"-"+dt[0]+"-"+dt[1]
}
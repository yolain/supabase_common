/**
 * time 获取当前时间
 * @return {timestamp}
 */
export const time = type => type == 'date' ? new Date() : parseInt(new Date().getTime()/1000)
/**
 * isEmpty 参数是否为空
 * @param {String} str
 * @return {Boolean}
 */
export const isEmpty = str => {
    if(str === null || str === '' || str === undefined) return true
    else return false
}
/**
 * accAdd 高精度加法
 * @param {Number} arg1
 * @param {Number} arg2
 * @return {Number}
 */
export const accAdd = (arg1:number, arg2:number) => {
    let r1, r2, s1, s2,max;
    s1 = arg1
    s2 = arg2
    try { r1 = s1.split(".")[1].length } catch (e) { r1 = 0 }
    try { r2 = s2.split(".")[1].length } catch (e) { r2 = 0 }
    max = Math.pow(10, Math.max(r1, r2))
    return (arg1 * max + arg2 * max) / max
}
/**
 * accSub 高精度减法
 * @since 1.0.0
 * @param {Number} arg1
 * @param {Number} arg2
 * @return {Number}
 */
export const accSub = (arg1:number, arg2:number)  =>{
    let r1, r2, max, min,s1,s2;
    s1 = arg1
    s2 = arg2
    try { r1 = s1.split(".")[1].length } catch (e) { r1 = 0 }
    try { r2 = s2.split(".")[1].length } catch (e) { r2 = 0 }
    max = Math.pow(10, Math.max(r1, r2));
    //动态控制精度长度
    min = (r1 >= r2) ? r1 : r2;
    return ((arg1 * max - arg2 * max) / max).toFixed(min)
}
/**
 * accMul 高精度乘法
 * @param {Number} arg1
 * @param {Number} arg2
 * @return {Number}
 */
export const accMul = (arg1:number, arg2:number) => {
    let max = 0, s1 =  arg1, s2 = arg2;
    try { max += s1.split(".")[1].length } catch (e) { }
    try { max += s2.split(".")[1].length } catch (e) { }
    return Number(s1.replace(".", "")) * Number(s2.replace(".", "")) / Math.pow(10, max)
}
/**
 * accDiv 高精度除法
 * @param {Number} arg1
 * @param {Number} arg2
 * @return {Number}
 */
export const accDiv = (arg1:number, arg2:number)=> {
    let t1 = 0, t2 = 0, r1, r2,s1 =  arg1, s2 = arg2;
    try { t1 = s1.split(".")[1].length } catch (e) { }
    try { t2 = s2.split(".")[1].length } catch (e) { }
    r1 = Number(s1.replace(".", ""))
    r2 = Number(s2.replace(".", ""))
    return (r1 / r2) * Math.pow(10, t2 - t1)
}
Number.prototype.div = function (arg) {
    return accDiv(this, arg);
}

/**
 * rand 随机数
 * @param {Number} minNum
 * @param {Number} maxNum
 * @param {Number} decimalNum
 * @return {Number}
 */
export const rand = (minNum:number,maxNum:number,decimalNum:number) => {
    let max:number = 0, min:number = 0;
    minNum <= maxNum ? (min = minNum, max = maxNum) : (min = maxNum, max = minNum);
    const args:number[] = [minNum,maxNum,decimalNum]
    switch (args.length) {
        case 1:
            return Math.floor(Math.random() * (max + 1));
        case 2:
            return Math.floor(Math.random() * (max - min + 1) + min);
        case 3:
            return (Math.random() * (max - min) + min).toFixed(decimalNum);
        default:
            return Math.random();
    }
}

/**
 * convertToTree 将扁平数据转换为树形数据
 * @param flatData
 * @param topKey
 * @param parent_id
 * @param id
 */
export function convertToTree(flatData,topKey = 'hot',parent_id='parent_id',id='id') {
    let treeData = [];
    let map = new Map();
    let outputObj, pid;
    for (let i = 0; i < flatData.length; i++) {
        pid = flatData[i][parent_id];
        if (map.has(pid)) {
            if (!map.get(pid).children)
                map.get(pid).children = [];
            let obj = new Object(flatData[i]);
            map.get(pid).children.push(obj);
            map.set(flatData[i][id], obj);
            map.get(pid).children.sort((a, b) => b[topKey]-a[topKey]);
        } else  {
            // '&& pid === 0' 判断条件是为了只将 pid 为 0 作为根节点，其它值不作为根节点。
            // 如需将其它值也作为根节点，可将 'else if (!map.has(pid) && pid === 0)' 改为 'else'
            outputObj = new Object(flatData[i]);
            delete outputObj[parent_id]
            treeData.push(outputObj);
            map.set(flatData[i][id],outputObj);
        }
    }
    return treeData;
}

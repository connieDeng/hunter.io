const insertSort = (ans, num) => {
    if (ans.length <= 0 || num <= ans[(ans.length)-1]){
        ans.push(num)
        return ans
    } else if(num >= ans[0]){
        ans.unshift(num)
        return ans
    } else {
        let pos = -1;
        for (let i = 1; i < ans.length; i++) {
            if(ans[i-1] >= num && ans[i] < num){
                pos = i
            }
        }
        ans.splice(pos, 0, num);
        return ans

    }
}

const sortStream = (arr, N) => {
    let ans = []
    for (let i = 0; i < N; i++) {
        insertSort(ans, arr[i])
    
        for (let i = 0; i < ans.length; i++) {
            console.log(ans[i]);
        }
        console.log('\n')
    }
}

let arr = [4, 1, 7, 6, 2, 2, 6, 1, 10, 7, 7, 7, 0 ];
let N = arr.length;

sortStream(arr, N);
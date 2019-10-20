let result = []

const a = [1,3,3]
result =[4,5,6]
result = [...result, ...a]

result.forEach(item => {
    console.log(item)
})

console.log(result)
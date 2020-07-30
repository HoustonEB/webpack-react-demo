interface func {
    (name: string, age: number): number;
}
let demo: func;
demo = function(name, age) {
    console.log(name, age, 'd')
    return 1
}

demo('张三', 2)
// actions.push([
//     {
//         type: 'add',
//         path: 'src/{{name}}/',
//         templateFile: 'plop/plop-templates/single/'
//     }
// ])
module.exports = function (plop) {
    // create your generators here
    plop.setGenerator('basics', {
        description: 'this is a skeleton plopfile',
        prompts: [
            {
                type: 'list',
                name: 'compType',
                message: 'What pizza toppings do you like?',
                choices: [
                    {name: '单组件', value: 'single'},
                    {name: 'VM', value: 'multiple'}
                ]
            },
            {
                type: 'input',
                name: 'compName',
                message: '请输入组件名'
            }],
        actions: function (data) {
            var actions = [];
            switch (data.compType) {
                case 'single':
                    actions.push(
                        {
                            type: "addMany",
                            destination: "src/components/{{compName}}",
                            base: 'plop/plop-templates/single/', // base 解决生成模板时带入模板路径的问题.
                            templateFiles: 'plop/plop-templates/single/'
                        }
                    )
                    break;
                case 'multiple':
                    actions.push(
                        {
                            type: "addMany",
                            destination: "src/{{compName}}",
                            base: 'plop/plop-templates/VM/',
                            templateFiles: 'plop/plop-templates/VM/'
                        }
                    )
                    break;
            }
            console.log(data.compType, 'data', data, actions);
            // console.log("src/{{compName}}", '======')
            return actions;
        }
    });
};
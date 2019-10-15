const path = require('path');

module.exports = function (plop) {
    const currentPath = path.resolve('.');
    const plopPath = path.resolve(__dirname);
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
            let actions = [];
            const {compType, compName} = data;
            const templatePath = plopPath + '/plop/plop-templates/';
            switch (compType) {
                case 'single':
                    actions.push(
                        {
                            type: "addMany",
                            destination: `${currentPath}/{{compName}}`,
                            base: templatePath + 'single/', // base 解决生成模板时带入模板路径的问题.
                            templateFiles: templatePath + 'single/'
                        }
                    );
                    break;
                case 'multiple':
                    actions.push(
                        {
                            type: "addMany",
                            destination: `${currentPath}/{{compName}}`,
                            base: templatePath + 'VM/',
                            templateFiles: templatePath + 'VM/'
                        }
                    );
                    break;
            }
            console.log(actions);
            return actions;
        }
    });
};
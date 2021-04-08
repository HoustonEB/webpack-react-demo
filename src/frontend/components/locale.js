import moment from 'moment';

moment.updateLocale('zh-cn', {
    week: {
        dow: 0 // 星期的第一天是星期日
    }
});
console.log('----------------------------------')
export const ui = 1;
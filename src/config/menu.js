export const menuData = [
  {
    name: '班级列表',
    icon: 'dashboard',
    path: 'classroom',
    breadcrumbName: '首页',
    children: [
      {
        name: '分析页',
        path: 'analysis',
      },
      {
        name: '监控页',
        path: 'monitor',
      },
      {
        name: '工作台',
        path: 'workplace',
      },
    ],
  },
  {
    name: '测评',
    icon: 'book',
    path: 'examination',
  },
  {
    name: '备课区',
    icon: 'book',
    path: 'prepare-course',
  },
  {
    name: '考勤',
    icon: 'pie-chart',
    path: 'attendance',
  },
  {
    name: '代码相似度检测',
    icon: 'code-o',
    path: 'code-detective'
  },
  {
    name: '个人页',
    icon: 'user-o',
    path: 'me'
  }
];


// export const BasicMenuData = [
//     {
//         name: '班级列表',
//         icon: 'user',
//         path: '/classroom',
//     },
//     {
//         name: '备课区',
//         icon: 'book',
//         path: '/prepare-course'
//     }
// ]

/* eslint no-useless-escape:0 */
const reg = /(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/g;

export function isUrl(path) {
  return reg.test(path);
}


function formatter(data, parentPath = '/', parentAuthority) {
  return data.map(item => {
    let { path } = item;
    if (!isUrl(path)) {
      path = parentPath + item.path;
    }
    const result = {
      ...item,
      path,
      authority: item.authority || parentAuthority,
    };
    if (item.children) {
      result.children = formatter(item.children, `${parentPath}${item.path}/`, item.authority);
    }
    return result;
  });
}

export const getMenuData = () => formatter(menuData);
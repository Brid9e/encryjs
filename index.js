const esprima = require('esprima');
const estraverse = require('estraverse');
const escodegen = require('escodegen');
const ast_types = require('ast-types');
const fs = require('fs');

let num = 0;
let index;
const strings = [];
const string_indexes = [];
const string_map_identifier = ast_types.builders.identifier('__SYNJONES__');

//将所有的方法名抽象出来放入strings中存储，备用
function add_string(string) {
  if (!(string in string_indexes)) {
    string_indexes[ string ] = strings.push(string) - 1;
  }
  return string_indexes[ string ];
}

//重组语法树的具体实现
function add_wrap_with_life(ast_body, string_map_name, stringMap) {
  const wrapper_function_body = ast_types.builders.blockStatement(ast_body);
  const wrapperFunction = ast_types.builders.functionExpression(
    null,
    [ string_map_name ],
    wrapper_function_body
  );
  const iife = ast_types.builders.expressionStatement(
    ast_types.builders.callExpression(
      ast_types.builders.memberExpression(
        wrapperFunction,
        ast_types.builders.identifier('call'),
        false
      ),
      [ ast_types.builders.identifier('this'), stringMap ]
    )
  );
  return [ iife ];
}

const dir = './input';
files = fs.readdirSync(dir);

//生成示例代码code的抽象语法树
const JsToAst = (files) => {
  for (let files_item of files) {
    fs.readFile(`./input/${files_item}`, 'utf8', (err, data) => {
      // console.log(data);
      const ast = esprima.parseScript(data);
      initAST(ast, files_item);
    });
  }
};

JsToAst(files);

// 获取语法树的节点，所有的代码混淆等一系列操作都在此执行
let _catchNode;
async function initAST(ast, fileName) {
  console.log('🎉 正在压缩加密————————————', fileName)
  estraverse.replace(ast, {
    enter: function (node) {
      // if (node.type === esprima.Syntax.MemberExpression) {
      //     node.computed = true
      //     if (node.property.name) {
      //         node.property.name = `${str_to_hex(node.property.name)}`
      //     }
      // }
      if (node.key) {
        _catchNode = node.key.name || node.key.value || node.key.raw;
      }
      if (
        node.type === 'Literal' &&
        typeof node.value === 'string' &&
        node.type !== esprima.Syntax.MemberExpression
      ) {
        if (node.value === _catchNode) {
          return;
        }
        index = add_string(node.value);
        if (typeof index !== 'function') {
          return ast_types.builders.memberExpression(
            string_map_identifier,
            ast_types.builders.literal(index),
            true
          );
        }
      }
      if (node.type === 'MemberExpression' && node.property.name) {
        const name_to_hex = node?.property.name;
        index = add_string(name_to_hex);
        if (typeof index !== 'function') {
          return ast_types.builders.memberExpression(
            node.object,
            ast_types.builders.memberExpression(
              string_map_identifier,
              ast_types.builders.literal(index),
              true
            ),
            true
          );
        }
      }
    },
  });

  // 抽象语法树重组
  ast.body = add_wrap_with_life(
    ast.body,
    string_map_identifier,
    ast_types.builders.arrayExpression(strings.map(ast_types.builders.literal))
  );

  const transformcode = escodegen.generate(ast);
  fs.writeFile(`./output_dist/${fileName}`, transformcode, () => { });

  // //转16进制
  // function str_to_hex(inStr) {
  //   // console.log(str)
  //   // return str.replace(/(\w)\g/, (_, $1) => {
  //   //     console.log(_)
  //   //     return '\\x' + $1.charCodeAt(0).toString(16);
  //   // });
  //   const str = inStr;
  //   const val = '';
  //   for (const i = 0; i < str.length; i++) {
  //     if (val == '') val = str.charCodeAt(i).toString(16);
  //     else val += '/' + str.charCodeAt(i).toString(16);
  //   }
  //   return `\/${val}`;
  // }
}

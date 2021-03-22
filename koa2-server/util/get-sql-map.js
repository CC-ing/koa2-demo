const fs = require('fs')
const path = require('path')

const getSqlMap = () => {
  const targetPath = path.resolve(__dirname, '../sql')
  const dirs = fs.readdirSync(targetPath)
  console.log('dirs', dirs);

  return dirs.reduce((pre, cur) => {
     pre[cur] = path.join(targetPath, cur)
     return pre
  }, {})
}
console.log('getSqlMap', getSqlMap());
module.exports = getSqlMap

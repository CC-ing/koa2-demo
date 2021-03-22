const fs = require('fs')
const { query } = require('./util/db-util')
const getSqlMap = require('./util/get-sql-map')

const sqlMap = getSqlMap()

const eventLog = (err, sqlFile, index) => {
	if (err) {
		console.log(`[error] ${sqlFile} 文件  第${index}行执行失败`);
	} else {
		console.log(`[success] ${sqlFile} 文件  第${index}行执行成功`);
	}
}

const run = async (sqlMap) => {
	for (let [key, sqlPath] of Object.entries(sqlMap)) {
		const sql = fs.readFileSync(sqlPath, 'binary');
		const shells = sql.split(';')

		for (let [i, shell] of shells.entries()) {
			if (shell.trim()) {
				const result = await query(shell)
				if (result.serverStatus * 1 === 2) {
					eventLog(null, key, i)

				} else {
					eventLog(true, key, i)
				}
			}
		}

		// 使用foreach会产生乱序执行问题
		// shells.forEach(async (shell, index) => { })

		console.log("请使用ctrl + c 进行退出");
	}
}

run(sqlMap)

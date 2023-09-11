const db = require('../database/db');

exports.update_car = async (user_id, car, props) => {
  for (let i in props)
    await db.execute(/*SQL */ `

			UPDATE \`sql_cars\`.\`cars\`
			SET \`${i}\` = '${props[i]}'
			WHERE
				\`posted_by\` = '${user_id}'
			AND \`name\` = '${car}';
		
	`);
};

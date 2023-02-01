import DBUsers from "./entities/DBUsers";

export default class DB {
	DB = []
	users = new DBUsers()

	constructor() {
		this.addData = this.addData.bind(this)
	}

	async addData(data) {
		const user = await this.users.create(data)
		console.log(user)
		return this.DB.push(user)
	}

	getAll() {
		return this.DB
	}
}
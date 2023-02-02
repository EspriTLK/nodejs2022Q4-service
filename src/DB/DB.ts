import { Injectable } from "@nestjs/common";
import DBUsers from "./entities/DBUsers";

@Injectable()
export default class DB {
	DB = []
	users = new DBUsers()

	constructor() {
		this.addData = this.addData.bind(this)
	}

	async addData(data) {
		const user = await this.users.create(data)
		if (user) {
			this.DB.push(user)
			return user
		} else {
			return new Error('AAAA')
		}
	}

	async getAll() {
		return await this.DB
	}

	async getById(id) {
		return await this.DB.find(u => u.id === id)
	}
}

export const db = new DB()
import { Injectable } from "@nestjs/common";
import { findIndex } from "rxjs";
import DBUsers from "./entities/DBUsers";

@Injectable()
export default class DB {
	DB = { users: [], albums: [], artists: [], tracks: [], favorites: [] }
	users = new DBUsers()

	constructor() {
		// this.createUser = this.createUser.bind(this)
	}

	async createUser(data) {
		const user = await this.users.create(data)
		if (user) {
			this.DB.users.push(user)
			return user
		}
	}

	async getAllUsers() {
		return await this.DB.users
	}

	async getUserById(id) {
		return await this.DB.users.find(u => u.id === id)
	}

	async updateUserPassword(id, data) {
		const changedUser = await this.getUserById(id)
		if (changedUser && changedUser.password === data.oldPassword) {
			const newUser = await this.users.update(data, changedUser)
			changedUser.password = data.newPassword
			changedUser.version = newUser.version
			changedUser.updatedAt = newUser.updatedAt
			// this.users.update(data, changedUser)
			return 'update succesfully'
		}
	}

	async removeUser(id) {
		await this.getUserById(id)
		// console.log(await this.DB.users.findIndex(u => u.id === id))
		this.DB.users.splice(await this.DB.users.findIndex(user => user.id === id, 1))
	}
}

export const db = new DB()
const db = require("../data/db-config")

module.exports = {
    add,
    getAll,
    findBy,
    update
}

function add(strain) {
    return db("saved_strains").insert(strain)
}

function getAll(){
    return db("saved_strains")
}

function findBy(filter) {
	return db("saved_strains")
		.select("id", "user_id", "strain_name", "type", "rating", "effects", "flavors", "description")
		.where(filter)
}

function update(id, changes) {
    return db("projects")
      .where("id", id)
      .update(changes)
  }
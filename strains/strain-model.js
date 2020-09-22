const db = require("../data/db-config")

module.exports = {
    add,
    getAll,
    findBy,
    update,
    remove
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
    return db("saved_strains")
      .where("id", id)
      .update(changes)
  }

  function remove(id) {
    return db("saved_strains")
      .where("id", id)
      .del();
  }
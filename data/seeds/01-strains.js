
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('saved_strains').del()
    .then(function () {
      // Inserts seed entries
      return knex('saved_strains').insert([
        {
          user_id: 1,
          strain_name: "Blue Dream",
          type: "Hybrid",
          rating: 4,
          effects: "Energetic,relaxed",
          flavors: "lemon zesty",
          description: "very good bud, A+"
        }
      ]);
    });
};

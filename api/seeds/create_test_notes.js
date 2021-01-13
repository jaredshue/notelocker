exports.seed = function(knex) {
    return knex("notes").del()
        .then(function () {
            return knex("notes").insert([
                {
                    guid: "bdc048c0-551d-11eb-8291-7733037ea32b",
                    hash: "a33cafc31ec1985bc9b9df0f58a744c1e905c296331e5b5a6f2f4244240606c3",
                    note: "ae1a824fe857f86a7e7e777c210e2c673abfba3ac8ae3fdd3bbcf51110f5c98c"
                }
            ]);
        });
};

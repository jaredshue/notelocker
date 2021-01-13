
exports.seed = function(knex) {
    return knex("notes").del()
        .then(function () {
            return knex("notes").insert([
            { 
                guid: "bdc048c0-551d-11eb-8291-7733037ea32b", 
                note: "ae1a824fe857f86a7e7e777c210e2c673abfba3ac8ae3fdd3bbcf51110f5c98c" ,
                isRead: false,
                Deleted: false,
            },
            ]);
        });
};

//POSTGRES
/*module.exports = {
    categoryWithChildren: `
        WITH RECURSIVE subcategories (id) AS (
            SELECT id FROM categories WHERE id = 1
            UNION ALL
            SELECT c.id FROM subcategories, categories c
                WHERE "parentId" = subcategories.id
        )
        SELECT id FROM subcategories
    `
}*/

//MYSQL
module.exports = {
    categoryWithChildren: `
    select  id, parentId
    from (select * from categories
    order by parentId, id) categories_sorted,
    (select @pv := ?) initialisation
    where (find_in_set(parentId , @pv)
    and length(@pv := concat(@pv, ',', id)))
    or id = @pv
    `
}



//This is an auxiliar validation file
//Consign will also load this functions

module.exports = app => {

    //Check if error exists
    function existsOrError(value, msg) {
        if (!value) throw msg
        if (Array.isArray(value) && value.length === 0) throw msg
        if (typeof value === 'string' && !value.trim()) throw msg
    }

    //Check if error dont exists
    function notExistsOrError(value, msg) {
        try {
            existsOrError(value, msg)
        } catch (msg) {
            return
        }
        throw msg
    }

    //Check if values match
    function equalsOrError(valueA, valueB, msg) {
        if (valueA !== valueB) throw msg
    }

    return { existsOrError, notExistsOrError, equalsOrError }

}



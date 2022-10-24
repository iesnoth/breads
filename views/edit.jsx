const React = require(`react`)
const Default = require(`./layouts/default`)

function Edit () {
    return(
        <Default>
            <h2>Edit a bread</h2>
            <form>
                <label htmlFor="name">Name</label>
                <input
                    type="text"
                    name="name"
                    id="name"
                    required
                />
                <label htmlFor="image">Image</label>
                <input
                    type="text"
                    name="name"
                    id="image"
                />
                <label htmlFor="hasGluten">Has Gluten?</label>
                <input
                    type="checkbox"
                    name="hasGluten"
                    id="hasGluten"
                    defaultchecked
                />
                <br />
                <input type="submit"/>
            </form>
        </Default>
    )
}

module.exports = Edit
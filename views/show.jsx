const React = require(`react`)
const Default = require(`./layouts/default`)

function Show({ bread,bakersBreads }) {
    let bakersList = bakersBreads.map((bread) => {
            return (
                <li>{bread.name}</li>
            )
        })
    return (
        <Default>
            <h2>Show Page</h2>
            <h3>{bread.name}</h3>
            <p>
                and it
                {
                    bread.hasGluten
                        ? <span> does </span>
                        : <span> does NOT </span>
                }
                have gluten.
            </p>
            <img src={bread.image} alt={bread.name} />
            <p>{bread.getBakedBy()}</p>
            <div>
            <h4>Other Breads by this Baker:</h4> 
            <ul>{bakersList}</ul> 
            </div>
            <a href="/breads"><button>To Home</button></a>
            <a href={`/breads/${bread.id}/edit`}><button>Edit</button></a>
            <form action={`/breads/${bread.id}?_method=DELETE`} method="POST" >
                <input type='submit' value="DELETE" />
            </form>
        </Default>
    )
}

module.exports = Show
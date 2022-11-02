const React = require(`react`)
const Default = require(`./layouts/default`)

// let placesFormatted = data.places.map((place) => {
//     return (
//       <div className='col-sm-6'>
//         <h2>
//           <a href={`/places/${place.id}`}>{place.name}</a>
//         </h2>
//         <p className='text-center'>
//           {place.cuisines}
//         </p>
//         <img src={place.pic} alt={place.name} />
//         <p className='text-center'>
//           Located in {place.city}, {place.state}
//         </p>
//       </div>
//     )

function Show({ bread,bakersBreads }) {
    //call whatever I got from the static AHHH i don't know the term
    //to be able to list the baker's other accomplishments
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
const React = require('react')
const Default = require('./layouts/Default')

function Show({ baker }) {
    return (
        <Default>
            <h3>{baker.name}</h3>
            <p>{baker.name} has been baking with us since {baker.startDate.getFullYear()}</p>
            <p>About {baker.name}: {baker.bio}</p>
            <h3>Breads {baker.name} has baked</h3>
            <ul>
                {
                    baker.breads.map((bread) => {
                        return (
                            <li key={bread.id}>{bread.name}</li>
                        )
                    })
                }
            </ul>
            <a href="/breads"><button>To Home</button></a>
            <form action={`/bakers/${baker.id}?_method=DELETE`} method="POST">
                <input type="submit" value="delete">
                </input></form>
        </Default>
    )
}

module.exports = Show


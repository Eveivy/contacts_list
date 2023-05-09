
export default function ContactList({ contacts }) {
    // console.log(contacts)
    // const list =
    return (
        <div className="border-purple p-3 list">
            {
                contacts.length === 0 ? <div>
                    <p className="text-center text-danger">Contact list is empty</p>
                </div> :  contacts.map((el) => {
                    return <div key={el.id}>
                        <span>{el.name}</span> <br /> <br />
                        <span>{el.number}</span>
                    </div>
                })
            }
        </div>
    )
}
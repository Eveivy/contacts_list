
export default function ContactList({ contacts }) {
    // console.log(contacts)
    const list = contacts.map((el) => {
        console.log(el)
        return <div>
            <span>{el.name}</span> <br /> <br />
            <span>{el.number}</span>
        </div>
    })
    return (
        <div className="border-purple p-3 list">
            {
              list
            }
        </div>
    )
}
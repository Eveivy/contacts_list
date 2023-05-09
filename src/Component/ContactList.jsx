import { LevelContext } from "../App";
import { useContext } from "react";

export default function ContactList() { 
    const componentData = useContext(LevelContext)
    const contacts = componentData[0]
    const handleDelete = componentData[1]
    // console.log(handleDelete)

    const list = contacts.map((el, idx) => {
        const bgs = ['#ebedf0', '#f6f8fa'];
        const selectedVariant = bgs[idx % bgs.length];
        const bgColors = ['bg-primary', 'bg-warning', 'bg-info', 'bg-success', 'bg-danger']
        const selectedBg = bgColors[idx % bgColors.length];

        const initials = el.name.split(" ").map((word) => word.charAt(0)).join("");

        return <div key={el.id} className="d-flex align-items-center p-2 justify-content-between" style={{ backgroundColor: selectedVariant }}>
            <div className="d-flex align-items-center">
                <div className="me-2">
                    <div className={`${selectedBg} text-uppercase bg-primary px-3 py-2 text-dark bg-opacity-25 rounded-circle`}>
                        <span className="d-flex align-items-center text-center pt-1">{initials.slice(0, 1)}</span>
                    </div>
                </div>
                <div className="d-flex flex-column">
                    <span>{el.name}</span>
                    <small className="text-muted">{el.number}</small>
                </div>
            </div>
            <div className="d-flex align-items-center">
                <span className="mx-2 pointer"><box-icon type='solid' name='edit-alt' color="purple"></box-icon></span>
                <span className="mx-2 pointer" onClick={(ev) => handleDelete(ev, el.id)}><box-icon name='x' color="red"></box-icon></span>
            </div>
        </div>
    })
    return (
        <div className="border-purple list">
            {
                contacts.length === 0 ? <div>
                    <p className="text-center text-danger">Contact list is empty</p>
                </div> : list
            }
        </div>
    )
}
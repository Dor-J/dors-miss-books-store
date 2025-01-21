const { Fragment } = React


export function Modal({ children, isOpen = false, onClose = () => { } }) {
    console.log('children:', children)
    if (!isOpen) return null
    return (
        <Fragment>
            <section onClick={onClose} className='modal-backdrop'></section>
            <section className='modal-content'>
                {children}
                <button className='close-btn' onClick={onClose}>X</button>
            </section>
        </Fragment>
    )
}


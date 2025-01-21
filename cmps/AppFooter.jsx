import { ColorInput } from "./dynamic-inputs/ColorInput.jsx";
import { FontsizeInput } from "./dynamic-inputs/FontsizeInput.jsx";

const { useState } = React

export function AppFooter() {

    const [cmpType, setCmpType] = useState('fontSize')

    const [footerStyle, setFooterStyle] = useState({
        backgroundColor: '#101010',
        fontSize: '16px'
    })

    function onSetFooterStyle(footerStyle) { //
        setFooterStyle(prevFooterStyle => ({ ...prevFooterStyle, ...footerStyle }))
    }

    return (
        <footer style={footerStyle} className="app-footer full main-layout">
            <section >
                <DynamicCmp {...footerStyle} onSetFooterStyle={onSetFooterStyle} name="Baba" cmpType={cmpType} />
                <select value={cmpType} onChange={(ev) => setCmpType(ev.target.value)}>
                    <option value="color">Color</option>
                    <option value="fontSize">Font size</option>
                </select>
            </section>
        </footer>
    )
}

function DynamicCmp(props) {
    // console.log('props:', props)
    switch (props.cmpType) {
        case 'color':
            return <ColorInput {...props} />
        case 'fontSize':
            return <FontsizeInput {...props} />
    }
}

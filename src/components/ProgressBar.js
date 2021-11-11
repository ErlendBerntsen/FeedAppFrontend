import React from 'react'

const ProgressBar = ({ bgcolor, progress, height, label, votes }) => {

    const Parentdiv = {
        height: height,
        width: '20%',
        backgroundColor: 'whitesmoke',
        borderRadius: 40,
        margin: 50,
        display: "block",
        marginLeft: "auto",
        marginRight: "auto"
    }

    const Childdiv = {
        height: '100%',
        width: `${progress}%`,
        backgroundColor: bgcolor,
        borderRadius: 40,
        textAlign: 'right'
    }

    const div3 = {
        textAlign: 'right',
        margin: 20
    }

    const progresstext = {
        padding: 10,
        color: 'black',
        fontWeight: 900
    }

    return (
        <div>
            <div style={Parentdiv}>
                <div style={Childdiv}>
                    <span style={progresstext}>{`${progress}%`}</span>
                    <div style={div3}>
                        <h3>{label + ":" + votes}</h3>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProgressBar;
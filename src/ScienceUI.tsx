interface ScienceUIProps {
    close: () => void,
    science: number,
    setScience: React.Dispatch<React.SetStateAction<number>>,
    pointsMultiplier: number,
    setPointsMultiplier: React.Dispatch<React.SetStateAction<number>>,
    goldPropability: number,
    setGoldPropability: React.Dispatch<React.SetStateAction<number>>,
    firePropability: number,
    setFirePropability: React.Dispatch<React.SetStateAction<number>>,
    sciencePropability: number,
    setSciencePropability: React.Dispatch<React.SetStateAction<number>>,
    fireRange: number,
    setFireRange: React.Dispatch<React.SetStateAction<number>>,
}

export const ScienceUI = (props: ScienceUIProps) => {
    const divStyle: React.CSSProperties = {
        display: "flex",
        gap: "10px",
    }
    const divStyle2: React.CSSProperties = {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    }

    return <div style={{
        width: '100vw',
        height: '100vh',
        position: 'absolute',
        top: 0,
        left: 0,
        backgroundColor: 'rgba(0,0,0,0.5)',
    }}>
        <div style={{
            width: "100%",
            maxWidth: "500px",
            maxHeight: "100%",
            // display: "inline-block",
            // height: "100%",
            // overflow: "scroll",
            margin: "auto",
            backgroundColor: "white",
            // scrollbarWidth: "none",
            // backgroundColor: "lightblue",
        }}>
            <div style={{
                padding: "20px",
            }}>
                <div style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                }}>
                    <h3 className="science-color">SciencePoints: {props.science}</h3>
                    <button style={{
                        backgroundColor: "transparent",
                        fontSize: "30px",
                        padding: "10px",
                    }}
                        onClick={props.close}
                    >X</button>
                </div>

                {[{
                    name: "Points Multiplier",
                    techs: [
                        { name: "x1", cost: 1, check: (props: ScienceUIProps) => props.pointsMultiplier >= 1, activate: (props: ScienceUIProps) => { props.setPointsMultiplier(1); props.setScience(s => s - 1) } },
                        { name: "x2", cost: 1, check: (props: ScienceUIProps) => props.pointsMultiplier >= 2, activate: (props: ScienceUIProps) => { props.setPointsMultiplier(2); props.setScience(s => s - 1) } },
                        { name: "x3", cost: 2, check: (props: ScienceUIProps) => props.pointsMultiplier >= 3, activate: (props: ScienceUIProps) => { props.setPointsMultiplier(3); props.setScience(s => s - 2) } },
                        { name: "x4", cost: 2, check: (props: ScienceUIProps) => props.pointsMultiplier >= 4, activate: (props: ScienceUIProps) => { props.setPointsMultiplier(4); props.setScience(s => s - 2) } },
                    ]
                }, {
                    name: "Gold Propability",
                    techs: [
                        { name: "5%", cost: 1, check: (props: ScienceUIProps) => props.goldPropability >= 0.05, activate: (props: ScienceUIProps) => { props.setGoldPropability(0.05); props.setScience(s => s - 1) } },
                        { name: "10%", cost: 1, check: (props: ScienceUIProps) => props.goldPropability >= 0.1, activate: (props: ScienceUIProps) => { props.setGoldPropability(0.1); props.setScience(s => s - 1) } },
                        { name: "20%", cost: 2, check: (props: ScienceUIProps) => props.goldPropability >= 0.2, activate: (props: ScienceUIProps) => { props.setGoldPropability(0.2); props.setScience(s => s - 2) } },
                        { name: "50%", cost: 3, check: (props: ScienceUIProps) => props.goldPropability >= 0.5, activate: (props: ScienceUIProps) => { props.setGoldPropability(0.5); props.setScience(s => s - 3) } },
                    ]
                }, {
                    name: "Fire Propability",
                    techs: [
                        { name: "1%", cost: 1, check: (props: ScienceUIProps) => props.firePropability >= 0.01, activate: (props: ScienceUIProps) => { props.setFirePropability(0.01) } },
                        { name: "2%", cost: 1, check: (props: ScienceUIProps) => props.firePropability >= 0.02, activate: (props: ScienceUIProps) => { props.setFirePropability(0.02) } },
                        { name: "5%", cost: 2, check: (props: ScienceUIProps) => props.firePropability >= 0.05, activate: (props: ScienceUIProps) => { props.setFirePropability(0.05) } },
                    ]
                }, {
                    name: "Fire Range",
                    techs: [
                        { name: "100px", cost: 1, check: (props: ScienceUIProps) => props.fireRange >= 100, activate: (props: ScienceUIProps) => { props.setFireRange(100) } },
                        { name: "150px", cost: 2, check: (props: ScienceUIProps) => props.fireRange >= 150, activate: (props: ScienceUIProps) => { props.setFireRange(150) } },
                        { name: "200px", cost: 3, check: (props: ScienceUIProps) => props.fireRange >= 200, activate: (props: ScienceUIProps) => { props.setFireRange(200) } },
                        { name: "400px", cost: 5, check: (props: ScienceUIProps) => props.fireRange >= 400, activate: (props: ScienceUIProps) => { props.setFireRange(400) } },
                    ]
                }, {
                    name: "Science Propability",
                    techs: [
                        { name: "0.5%", cost: 1, check: (props: ScienceUIProps) => props.sciencePropability >= 0.005, activate: (props: ScienceUIProps) => { props.setSciencePropability(0.005) } },
                        { name: "1%", cost: 2, check: (props: ScienceUIProps) => props.sciencePropability >= 0.01, activate: (props: ScienceUIProps) => { props.setSciencePropability(0.01) } },
                        { name: "2%", cost: 2, check: (props: ScienceUIProps) => props.sciencePropability >= 0.02, activate: (props: ScienceUIProps) => { props.setSciencePropability(0.02) } },
                    ]
                }].map(x => {
                    const nextTech = x.techs.find(y => !y.check(props))
                    return <>
                        <h3>{x.name}</h3>
                        <div style={divStyle}>
                            {x.techs.map(y =>
                                <div style={divStyle2}>
                                    <button
                                        onClick={() => y.activate(props)}
                                        disabled={y.check(props) || y != nextTech || props.science < y.cost}
                                        className={"tech-btn" + (y.check(props) ? ' tech-btn-active' : y == nextTech ? ' tech-btn-next' : ' tech-btn-inactive')}>
                                        {y.name}
                                    </button>
                                    <h3 className="science-color" style={{
                                        margin: 0,
                                    }}>{!y.check(props) ? y.cost : " "}</h3>
                                </div>
                            )}
                        </div>
                    </>
                }
                )}
            </div>
        </div>
    </div>
}
import { useEffect, useState } from 'react'
import './App.css'
import { Intro } from './Intro'
import { ScienceUI } from './ScienceUI'

enum BtnType {
  FIRST,
  NORMAL,
  GOLD,
  FIRE,
  SCIENCE,
}

interface BtnProps {
  id: number
  x: number
  y: number
  type: BtnType
  life: number
  lifeMax: number
  hitCount: number
}

let id = 0

function App() {
  // intro
  const [showIntro, setShowIntro] = useState(true)

  //science
  const [knowsAboutScience, setKnowsAboutScience] = useState(false)
  const [scienceMode, setScienceMode] = useState(false)

  // stats
  const [points, setPoints] = useState(0)
  const [science, setScience] = useState(0)
  const [visibleButtons, setVisibleButtons] = useState(0)
  // const [maxBtnCount, setMaxBtnCount] = useState(0)

  // parameters
  const [goldPropability, setGoldPropability] = useState(0.05)
  const [firePropability, setFirePropability] = useState(0.01)
  const [sciencePropability, setSciencePropability] = useState(0.005)
  const [fireRange, setFireRange] = useState(100)
  const [pointsMultiplier, setPointsMultiplier] = useState(1)

  // buttons
  const [btns, setBtns] = useState<BtnProps[]>([])

  // life handling
  const [lifeInterval, setLifeInterval] = useState<number | null>(null);
  const startLifeInterval = () => {
    setLifeInterval(setInterval(() => {
      updateLife()
    }, 1000));
  };
  const pauseLifeInterval = () => {
    if (lifeInterval) {
      clearInterval(lifeInterval);
    }
  };
  const updateLife = () => {
    setBtns(btns => {
      return btns
        .map(btn => {
          btn.life -= 1
          return btn
        })
        .filter(btn => btn.life > 0)
    })
  };

  // science
  useEffect(() => {
    if (science > 0 && !scienceMode) {
      pauseLifeInterval()
      if (!knowsAboutScience) {
        setScienceMode(true)
        setKnowsAboutScience(true)
      }
    }
  }, [science, knowsAboutScience])

  const createBtn = (): BtnProps => {
    var hitCount = Math.round(Math.random() * 3) + 2;
    var life = Math.round(Math.random() * 3) + 3;
    var typeRandomValue = Math.random();
    var btnType = BtnType.NORMAL;

    if (typeRandomValue > (1 - goldPropability)) {
      btnType = BtnType.GOLD;
    } else if (typeRandomValue > (1 - goldPropability - firePropability)) {
      btnType = BtnType.FIRE;
    } else if (typeRandomValue > (1 - goldPropability - firePropability - sciencePropability)) {
      console.log('science');
      btnType = BtnType.SCIENCE;
      hitCount = 1;
    }

    const btnWidth = 150
    const btnHeight = 50
    const topSpace = 60

    return {
      id: id++,
      x: Math.random() * (window.innerWidth - btnWidth - topSpace) + btnWidth / 2 + topSpace,
      y: Math.random() * (window.innerHeight - btnHeight - topSpace) + btnHeight / 2 + topSpace,
      type: btnType,
      hitCount: hitCount,
      life: life,
      lifeMax: life,
    }
  }

  const clickGenerateNewBtn = (btn: BtnProps, isFire: boolean): { points: number, sciencePoints: number, newBtns: BtnProps[] } => {
    let newBtns: BtnProps[] = []
    let points = 0
    let sciencePoints = 0
    btn.hitCount = btn.hitCount - 1
    if (btn.type == BtnType.GOLD) {
      points = 10 * pointsMultiplier
      for (let i = 0; i < 10; i++) {
        newBtns.push(createBtn())
      }
    } else if (btn.type == BtnType.FIRE) {
      points = 1 * pointsMultiplier
      if (!isFire) {
        newBtns = [createBtn()]
        let fireSpawnedBtns = btns
          .filter(b => b.x > btn.x - fireRange
            && b.x < btn.x + fireRange
            && b.y > btn.y - fireRange
            && b.y < btn.y + fireRange
            && b != btn)
          .map(b => clickGenerateNewBtn(b, true))
        points += fireSpawnedBtns.map(x => x.points).reduce((acc, val) => acc + val, 0)
        sciencePoints += fireSpawnedBtns.map(x => x.sciencePoints).reduce((acc, val) => acc + val, 0)
        newBtns = fireSpawnedBtns.map(x => x.newBtns).reduce((acc, val) => [...acc, ...val], [])
      }
    } else if (btn.type == BtnType.SCIENCE) {
      points = 1 * pointsMultiplier
      sciencePoints = 1
    }
    else {
      points = 1 * pointsMultiplier
      newBtns = [createBtn()]
      if (btn.type == BtnType.FIRST && showIntro) {
        startLifeInterval()
        setShowIntro(false)
      }
    }
    return { points, sciencePoints, newBtns };
  }

  const clickBtn = (btn: BtnProps) => {
    var { points: addPoints, sciencePoints: addSciencePoints, newBtns } = clickGenerateNewBtn(btn, false)
    newBtns = [...btns, ...newBtns]
    newBtns = [...newBtns.filter(x => x != btn), btn]
    newBtns = newBtns.filter(btn => btn.hitCount > 0)
    setBtns(newBtns)
    setVisibleButtons(newBtns.length)
    setPoints(points + addPoints)
    setScience(science + addSciencePoints)
  }

  const introFinished = () => {
    setBtns([{
      id: id++,
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
      type: BtnType.FIRST,
      hitCount: 10,
      life: 10,
      lifeMax: 10,
    }])
  }

  const mouseOver = (btn: BtnProps) => {
    setBtns([...btns.filter(x => x != btn), btn])
  }

  return (
    <>
      {showIntro && <Intro triggerFinished={introFinished} />}
      {btns.map((btn) => (
        <button
          className={'btn-base btn-' + (btn.type == BtnType.GOLD ? 'gold' : btn.type == BtnType.FIRE ? 'fire' : btn.type == BtnType.SCIENCE ? 'science' : 'normal')}
          key={btn.id}
          style={
            {
              left: btn.x,
              top: btn.y,
              opacity: btn.life / btn.lifeMax,
            }
          }
          onClick={() => clickBtn(btn)}
          onMouseOver={() => mouseOver(btn)}
        >
          Click me ({btn.hitCount})
        </button>
      ))}
      {showIntro ? <Intro triggerFinished={introFinished} /> : <>

        <div style={{
          display: 'flex',
          gap: '40px',
          alignItems: 'center',
        }}>
          <h2>Points: {points}</h2>
          <h2>Visible Buttons: {visibleButtons}</h2>
          {knowsAboutScience && <button
            onClick={() => setScienceMode(true)}
            style={{
              border: '3px solid #0455BF',
            }}
          >Upgrades</button>}
        </div>

      </>}
      {scienceMode && <ScienceUI
        close={() => { setScienceMode(false); startLifeInterval() }}
        science={science}
        firePropability={firePropability}
        fireRange={fireRange}
        goldPropability={goldPropability}
        pointsMultiplier={pointsMultiplier}
        sciencePropability={sciencePropability}
        setFirePropability={setFirePropability}
        setFireRange={setFireRange}
        setGoldPropability={setGoldPropability}
        setPointsMultiplier={setPointsMultiplier}
        setScience={setScience}
        setSciencePropability={setSciencePropability}
      />}
    </>
  )
}

export default App

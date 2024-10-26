// import normalPiece from "../../image/piece.png"
// import damaPiece from "../../image/dama.png"

export type moveProps = {
    moveHandler?: ( pos: {x: number, y: number}, newPos: {x: number, y: number}, team: "black" | "white" ) => void,
    team?: "black" | "white",
    kill?: boolean,
    type: "normal" | "dama" | "move",
    pos: {
        x: number,
        y: number
    }
    newPos: {
        x: number,
        y: number
    }
}

// add side

export const Move = ( { moveHandler, pos, newPos, type, team, kill }: moveProps ) => {

    const clickHandler = () => {        
        moveHandler &&
        moveHandler(pos, newPos, team!);
    }
 
    return (
        <div
            onClick={() => clickHandler()}
            className="move-tile"
            key={pos.x + pos.y + Math.random()}
        >
        </div>
    )
}
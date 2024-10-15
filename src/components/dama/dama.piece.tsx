// import normalPiece from "../../image/piece.png"
// import damaPiece from "../../image/dama.png"

export type pieceProps = {
    setMove( pos: {x: number, y: number} ): void,
    team?: "white" | "black",
    type: "normal" | "dama" | "move",
    pos: {
        x: number,
        y: number
    }
}

export const Piece = ( { setMove, pos, type }: pieceProps ) => {

    const moveHandler = () => {
        setMove &&
        setMove(pos);
    }
 
    return (
        <div
            onClick={() => moveHandler()}
            className="dama-tile"
            key={pos.x + pos.y + Math.random()}
        >
            <p 
                // src="#" 
                // alt="piece" 
                className="temp-piece"
                style={pos.x > 4 ? {backgroundColor: "darkgray", outline: "3px solid black"} : {backgroundColor: "lightblue", outline: "3px solid black"}}
            />   
        </div>
    )
}
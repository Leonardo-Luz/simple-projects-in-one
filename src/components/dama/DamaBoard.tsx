import { useEffect, useState } from "react"
import { Piece, pieceProps } from "./dama.piece"

import "./dama.style.css"
import { Move, moveProps } from "./move.tile"

export const DamaBoard = () => {

    const [ board, setBoard ] = useState<((pieceProps) | (moveProps) | undefined)[][]>([])

    const mapSize = {
        x: 8, 
        y: 8
    }

    const setMove = ( pos: {x: number, y: number} ) => {
        setBoard( prev => {

            prev.forEach((column, index) => {
                prev[index] = column.map((tile) => tile?.type == "move" ? undefined : tile )
            })            

            for(let i = 0; i < 4; i++)
            {
                let target = {
                    x: 1,
                    y: 1
                }

                switch(i) 
                {
                    case 0:
                        target = {
                            x: 1,
                            y: 1
                        }
                        break;
                    case 1:
                        target = {
                            x: - 1,
                            y: 1
                        }
                        break;
                    case 2:
                        target = {
                            x: 1,
                            y: - 1
                        }
                        break;
                    case 3:
                        target = {
                            x: - 1,
                            y: - 1
                        }
                        break;                        
                }
                
                if(
                    !((pos.x + target.x) > 7 || (pos.y + target.y) > 7) && 
                    !((pos.x + target.x) < 0 || (pos.y + target.y) < 0) &&
                    prev[pos.x + target.x][pos.y + target.y] == undefined 
                )
                    prev[pos.x + target.x][pos.y + target.y] = { pos: pos, newPos: {x: pos.x + target.x, y: pos.y + target.y}, type: "move", setMap: moveHandler} as moveProps
                else if(
                    !((pos.y + (target.y * 2)) > 7 || (pos.x + (target.x * 2)) > 7) && 
                    !((pos.y + (target.y * 2)) < 0 || (pos.x + (target.x * 2)) < 0) &&
                    prev[pos.x + target.x][pos.y + target.y] != undefined && 
                    prev[pos.x + (target.x * 2)][pos.y + (target.y * 2)] == undefined 
                ){
                    prev[pos.x + (target.x * 2)][pos.y + (target.y * 2)] = { pos: pos, newPos: {x: pos.x + (target.x * 2), y: pos.y + (target.y * 2)}, type: "move", setMap: moveHandler} as moveProps
                }
            }

            return prev.slice();
        })    
    }

    const moveHandler = ( pos: {x: number, y: number}, newPos: {x: number, y: number} ) => {
        setBoard( prev => {
            prev[newPos.x][newPos.y] = { pos: {x: newPos.x, y: newPos.y}, type: "normal", setMove: setMove} as pieceProps

            if(Math.abs(pos.x - newPos.x) > 1){
                prev[newPos.x + ((pos.x - newPos.x) / 2)][newPos.y + ((pos.y - newPos.y) / 2)] = undefined
            }

            prev[pos.x][pos.y] = undefined

            prev.forEach((column, index) => {
                prev[index] = column.map((tile) => tile?.type == "move" ? undefined : tile )
            })

            return prev.slice();
        })
    }

    useEffect(() => { 
        
        for(let i = 0; i < mapSize.x; i++)
        {
            let aux = [];
        
            if(i != 3 && i != 4 )
            for(let j = 0; j < mapSize.y; j++)
                ((i % 2) == 0 ? ((j % 2) == 0 ? aux.push(undefined) : aux.push({ setMove: setMove, type: "normal", pos: { x: i, y: j } } as pieceProps)) : ((j % 2) == 0 ? aux.push({ setMove: setMove, type: "normal" , pos: { x: i, y: j } } as pieceProps) : aux.push(undefined)))
            else
                aux = [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined]
        
            setBoard(prev => [...prev, aux])
        }
    }, [])

    return (
        <div className="dama-container">
            {       
                board.map((column, index) => 
                    <div className="dama-row" key={index}>
                    {
                        column.map(tile => 
                            tile ?  
                                tile.type == "move" ? 
                                    <Move pos={(tile as moveProps).pos} newPos={(tile as moveProps).newPos} type="move" moveHandler={moveHandler} key={tile.pos.x + tile.pos.y + Math.random()} />
                                :
                                    <Piece key={tile.pos.x + tile.pos.y + Math.random()} setMove={setMove} pos={tile.pos} type={tile.type} />

                            : <div key={Math.random()} className="dama-tile">Tile</div>
                        )
                    }
                    </div>
                )
            }
        </div>
    )
}
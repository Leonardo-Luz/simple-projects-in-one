import { useEffect, useState } from "react"
import { Piece, pieceProps } from "./dama.piece"

import "./cartesian-dama.style.css"
import { Move, moveProps } from "./move.tile"

type CartesianTileProps = {
    setCartesian: React.Dispatch<React.SetStateAction<{
        x?: number;
        y?: number;
    } | undefined>>,
    cartesian: {
        x?: number,
        y?: number
    }
}

const CartesianTile = ( { setCartesian, cartesian }: CartesianTileProps) => {


    const clickHander = () => {
        cartesian.x ?
            setCartesian(prev => {return {...prev, x: cartesian.x}})
        :
            setCartesian(prev => {return {...prev, y: cartesian.y}})
    }

    return(
        <button
            onClick={() => clickHander()}
        >
        {
            cartesian.x != undefined ? 
                cartesian.x
            :
                cartesian.y != undefined ? cartesian.y 
                    : "Erro"
        }
        </button>
    )
}

export const CartesianDamaBoard = () => {

    const [ board, setBoard ] = useState<((pieceProps) | (moveProps) | undefined)[][]>([])
    const [ cartesian, setCartesian ] = useState<{
        x?: number,
        y?: number
    }>()

    const [ team, setTeam ] = useState<"black" | "white">("white")

    const [ moving, setMoving ] = useState<pieceProps>()

    const mapSize = {
        x: 8, 
        y: 8
    }

    const won = () => {

        if(board.length < 1)
            return false

        let white = false;
        let black = false;

        board.forEach(column =>
            column.forEach(tile => tile?.team == "black" ? black = true : tile?.team == "white" ? white = true : "foda")
        )

        if(white && black)
            return false;
        
        return true;
    }

    const canAttack = ( pos: {x: number, y: number }) => {
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
                !((pos.y + (target.y * 2)) > 7 || (pos.x + (target.x * 2)) > 7) && // Verifica se a posição alvo é valida
                !((pos.y + (target.y * 2)) < 0 || (pos.x + (target.x * 2)) < 0) && // Verifica se a posição alvo é valida
                board[pos.x + target.x][pos.y + target.y] != undefined && // Verifica se há alguma peça na posição de ataque
                board[pos.x + target.x][pos.y + target.y]?.team != team && // Verifica se a peça na posiçaõ de ataque é do time inimigo
                board[pos.x + (target.x * 2)][pos.y + (target.y * 2)] == undefined // Verifica se a posição alvo esta vazia
            ){
                return true
            }
        }

        return false
    }

    const moveHandler = ( pos: {x: number, y: number}, newPos: {x: number, y: number}, team: "black" | "white", kill?: boolean ) => {
        setBoard( prev => {
            prev[newPos.x][newPos.y] = { team: team, pos: {x: newPos.x, y: newPos.y}, type: "normal", setMove: setMove} as pieceProps

            if(Math.abs(pos.x - newPos.x) > 1){
                prev[newPos.x + ((pos.x - newPos.x) / 2)][newPos.y + ((pos.y - newPos.y) / 2)] = undefined
            }

            prev[pos.x][pos.y] = undefined

            prev.forEach((column, index) => {
                prev[index] = column.map((tile) => tile?.type == "move" ? undefined : tile )
            })

            if(kill && canAttack({x: newPos.x, y: newPos.y})){
                
                moveTiles(true);
            }
            else{
                setMoving(undefined)
                setTeam(prev => prev == "white" ? "black" : "white")
            }
    

            return prev.slice();
        })
    }

    const setMove = () => {}

    //useless
    const moveTiles = ( kill?: boolean ) => {
        if(moving)
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
                    !((moving.pos.x + target.x) > 7 || (moving.pos.y + target.y) > 7) && // Verifica se a posição alvo é valida
                    !((moving.pos.x + target.x) < 0 || (moving.pos.y + target.y) < 0) && // Verifica se a posição alvo é valida
                    prev[moving.pos.x + target.x][moving.pos.y + target.y] == undefined &&   // Verifica se não há algo na posição alvo
                    !kill
                )
                    prev[moving.pos.x + target.x][moving.pos.y + target.y] = { 
                        pos: moving.pos, 
                        newPos: {
                            x: moving.pos.x + target.x, 
                            y: moving.pos.y + target.y
                        }, 
                        type: "move", 
                        setMap: moveHandler
                    } as moveProps
                else if(
                    !((moving.pos.y + (target.y * 2)) > 7 || (moving.pos.x + (target.x * 2)) > 7) && // Verifica se a posição alvo é valida
                    !((moving.pos.y + (target.y * 2)) < 0 || (moving.pos.x + (target.x * 2)) < 0) && // Verifica se a posição alvo é valida
                    prev[moving.pos.x + target.x][moving.pos.y + target.y] != undefined && // Verifica se há alguma peça na posição de ataque
                    prev[moving.pos.x + target.x][moving.pos.y + target.y]?.team != moving.team && // Verifica se a peça na posiçaõ de ataque é do time inimigo
                    prev[moving.pos.x + (target.x * 2)][moving.pos.y + (target.y * 2)] == undefined // Verifica se a posição alvo esta vazia
                ){
                    prev[moving.pos.x + (target.x * 2)][moving.pos.y + (target.y * 2)] = { 
                        kill: true,
                        pos: moving.pos, 
                        newPos: {
                            x: moving.pos.x + (target.x * 2), 
                            y: moving.pos.y + (target.y * 2)
                        }, 
                        type: "move", 
                        setMap: moveHandler
                    } as moveProps
                }
            }

            return prev.slice();
        })
        else
            setBoard( prev => {
                prev.forEach((column, index) => {
                    prev[index] = column.map((tile) => tile?.type == "move" ? undefined : tile )

                })
                
                return prev.slice()
            })
    }

    const startBoard = () => {        
        for(let i = 0; i < mapSize.x; i++)
        {
            let aux = [];
        
            if(i != 3 && i != 4 )
                if(i > 3)
                    for(let j = 0; j < mapSize.y; j++)
                    (
                        (i % 2) == 0 ? 
                        (
                            (j % 2) == 0 ? 
                                aux.push(undefined) : 
                                aux.push({ team: "white", setMove: setMove, type: "normal", pos: { x: i, y: j } } as pieceProps)
                        ) : 
                        (
                            (j % 2) == 0 ? 
                                aux.push({ team: "white", setMove: setMove, type: "normal" , pos: { x: i, y: j } } as pieceProps) : 
                                aux.push(undefined)
                        )
                    )
                else 
                    for(let j = 0; j < mapSize.y; j++)
                    (
                        (i % 2) == 0 ? 
                        (
                            (j % 2) == 0 ? 
                                aux.push(undefined) : 
                                aux.push({ team: "black", setMove: setMove, type: "normal", pos: { x: i, y: j } } as pieceProps)
                        ) : 
                        (
                            (j % 2) == 0 ? 
                                aux.push({ team: "black", setMove: setMove, type: "normal" , pos: { x: i, y: j } } as pieceProps) : 
                                aux.push(undefined)
                        )
                    )
            else
                aux = [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined]
        
            setBoard(prev => [...prev, aux])
        }
    }

    useEffect(() => {
        if(
            cartesian &&
                cartesian.x &&
                    cartesian.y &&
                        moving  == undefined &&
                            board[cartesian.y - 1][cartesian.x - 1] != undefined && 
                                board[cartesian.y - 1][cartesian.x - 1]?.team == team
        ){
            setMoving(board[cartesian.y - 1][cartesian.x - 1] as pieceProps)    
            setCartesian(undefined)
        }
        else if(
            cartesian &&
                cartesian.x &&
                    cartesian.y &&
                        moving
        ){
            if(
                board[cartesian.y - 1][cartesian.x - 1]?.type == "move"
            ){
                if((board[cartesian.y - 1][cartesian.x - 1] as moveProps).kill)
                    moveHandler(moving.pos, {x: cartesian.y - 1, y: cartesian.x - 1}, moving.team!, true)
                else{
                    moveHandler(moving.pos, {x: cartesian.y - 1, y: cartesian.x - 1}, moving.team!)
                    setMoving(undefined)
                }
            }else{
                setMoving(undefined)
            }

            setCartesian(undefined)
        }else if(
            cartesian &&
                cartesian.x &&
                    cartesian.y
        ){
            setCartesian(undefined)
        }
    }, [cartesian])

    useEffect(() => {
        moveTiles()
    }, [moving])

    useEffect(() => {
        if(won()){
            setBoard([])
            startBoard()
        }
    }, [board])

    useEffect(() => { 
        startBoard()
    }, [])

    return (
        <div>
            <h2>{team} Plays</h2>
            <div className="cartesian-dama-container">
                <CartesianTile setCartesian={setCartesian} cartesian={{x: 0}} />
                <CartesianTile setCartesian={setCartesian} cartesian={{x: 1}} />
                <CartesianTile setCartesian={setCartesian} cartesian={{x: 2}} />
                <CartesianTile setCartesian={setCartesian} cartesian={{x: 3}} />
                <CartesianTile setCartesian={setCartesian} cartesian={{x: 4}} />
                <CartesianTile setCartesian={setCartesian} cartesian={{x: 5}} />
                <CartesianTile setCartesian={setCartesian} cartesian={{x: 6}} />
                <CartesianTile setCartesian={setCartesian} cartesian={{x: 7}} />
                <CartesianTile setCartesian={setCartesian} cartesian={{x: 8}} />
                {
                    board.map((column, y) => 
                        <div className="cartesian-dama-row" key={y}>
                        {
                            <CartesianTile setCartesian={setCartesian} cartesian={{y: y + 1}} />
                        }
                        {
                            column.map((tile, x) => 
                                tile != undefined ?  
                                    tile.type == "move" ? 
                                        <Move team={tile.team} pos={(tile as moveProps).pos} newPos={(tile as moveProps).newPos} type="move" moveHandler={moveHandler} key={tile.pos.x + tile.pos.y + Math.random()} />
                                    :
                                        <Piece team={tile.team} key={tile.pos.x + tile.pos.y + Math.random()} setMove={setMove} pos={tile.pos} type={tile.type} />
                                : 
                                (
                                    (y % 2) == 0 ? 
                                    (
                                        (x % 2) == 0 ? 
                                        <div key={Math.random()} className="useless-tile"></div> :
                                            <div key={Math.random()} className="cartesian-dama-tile"></div>
                                    ) : 
                                    (
                                        (x % 2) == 0 ?
                                        <div key={Math.random()} className="cartesian-dama-tile"></div> :
                                        <div key={Math.random()} className="useless-tile"></div>                                
                                    )
                                )
                            )
                        }
                        </div>
                    )
                }
            </div>
        </div>
    )
}
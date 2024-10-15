
import { useState } from 'react'
import './calculadora.style.css'

type calculadora = {
    result?: number,
    first: number,
    second: number,
    operator?: string
}

export const Calculadora = () => {
    const [ calc, setCalc ] = useState<calculadora>({
        first: 0,
        second: 0
    });

    const numHandler = ( val: number ) =>
        setCalc(prev => prev.operator ? {...prev, second: parseInt(prev.second.toString() + val.toString())} : {...prev, first: parseInt(prev.first.toString() + val.toString())})

    const calcHandler = () => {
        switch(calc.operator){
            case '+':
                return calc.first + calc.second
            case '-':
                return calc.first - calc.second
            case '/':
                return calc.first / calc.second 
            case '*':
                return calc.first * calc.second
        }

        return 0;
    }

    const operatorHandler = ( op: string ) => {
        setCalc(prev => {return {...prev, result: undefined,second: 0, operator: op}})
    }

    const removeHandler = () => 
        setCalc(prev => prev.operator ? {...prev, result: undefined, second: (prev.second == 0 || prev.second < 10) ? 0 : parseInt(prev.second.toString().slice(0, prev.second.toString().length - 1))} : {...prev, result: undefined, first: (prev.first == 0 || prev.first < 10) ? 0 : parseInt(prev.first.toString().slice(0, prev.first.toString().length - 1))})

    const resetHandler = () =>
        setCalc({
            first: 0,
            second: 0
        });

    return(
        <div className='calculator-container'>
            <div className='calculator-header'>
                <h3 className='calculator-result'>
                    {calc.result ? calc.result : calc.operator ? calc.second : calc.first}
                </h3>
                <button onClick={() => resetHandler()} className='calculator-reset'>reset</button>
            </div>
            <div className='calculator-buttons'>
                    <button onClick={() => numHandler(7)} className="calculator-number">7</button>
                    <button onClick={() => numHandler(8)} className="calculator-number">8</button>
                    <button onClick={() => numHandler(9)} className="calculator-number">9</button>
                    <button onClick={() => removeHandler()} className="calculator-action">C</button>
                    <button onClick={() => numHandler(4)} className="calculator-number">4</button>
                    <button onClick={() => numHandler(5)} className="calculator-number">5</button>
                    <button onClick={() => numHandler(6)} className="calculator-number">6</button>
                    <button onClick={() => operatorHandler('/')} className="calculator-action">/</button>
                    <button onClick={() => numHandler(1)} className="calculator-number">1</button>
                    <button onClick={() => numHandler(2)} className="calculator-number">2</button>
                    <button onClick={() => numHandler(3)} className="calculator-number">3</button>
                    <button onClick={() => operatorHandler('*')} className="calculator-action">*</button>
                    <button onClick={() => numHandler(0)} className="calculator-number">0</button>
                    <button className="calculator-action">.</button>
                    <button onClick={() => operatorHandler('-')} className="calculator-action">-</button>
                    <button onClick={() => operatorHandler('+')} className="calculator-action">+</button>
                    <button onClick={() => setCalc(prev => {return {result: calcHandler(), first: calcHandler(), second: prev.second, operator: prev.operator ? prev.operator : undefined}})} className="calculator-action">=</button>
            </div>
        </div>
    )
}
import React, { useState } from 'react';
import Calculator from './components/Calculator/Calculator';
import ButtonWrap from './components/ButtonWrap/ButtonWrap';
import Output from './components/Output/Output';
import {numberList, operatorList} from "./components/ButtonWrap/ButtonArray";
import {extractNumFromString, extractOperatorFromString} from "./components/Utility/Utility";

export const CalculatorApp = () => {
  const [outputString, setOutputString] = useState('');
  const [outputResult, setOutputResult] = useState(0);

  const saveKeyPressed = (keyValue, keyCategory) => {
    keyCategory = Number(keyCategory);
    
    if(!outputString && outputResult){
      setOutputResult(0); //Reset Output Result to zero after a computation has been completed & displayed
    }

    let lastCharCategory = outputStrLastCharCategory();
    
    if(keyCategory === 1){
      // NUMBERS
      keyValue = Number(keyValue);
      
      if(outputString){
        if(keyCategory === lastCharCategory){
          appendToOutputString(keyValue);
        }
        else{
          appendToOutputString(' '+keyValue);
        }        
      }
      else{
          if(keyValue === 0){
            return;
          }
          else{
            appendToOutputString(keyValue);
          }
      }
    }
    else {
      if(outputString.length === 0){
        return; // Number must come first for every computation
      }

      if(keyCategory === 2){
        // OPERATORS
        if(keyCategory === lastCharCategory){
          return;
        }
        else{
          if(lastCharCategory === 1){
            const outputExtracted = outputStringExtraction(2);
            if(outputExtracted){
              if(outputExtracted.length === 1){
                const computedValue = computeHandler();
                setOutputString(computedValue+' '+keyValue);
              }
            }
            else{
              appendToOutputString(' '+keyValue);
            }
          }
          else{
            appendToOutputString(' '+keyValue);
          }        
        }    
      }
      else if(keyCategory === 3){
        //EQUAL SIGN
          if(lastCharCategory === 1){
            const outputExtracted = outputStringExtraction(2);
            if(outputExtracted){
              if(outputExtracted.length === 1){
                computeHandler();
                setOutputString('');
              }
            }
            else{
              return;
            }
          }
          else{
            return;
          }
      }
      else if(keyCategory === 4){
        // AC : CLEAR
        setOutputString('');
        setOutputResult(0);
      }
      else if(keyCategory === 5){
        // . DOT
        
      }
    }
  }
  
  const computeHandler = () => {
    let computed = 0;    
    if(outputString.length !== 0){
      const operands = outputStringExtraction(1);
      const operator = outputStringExtraction(2);
      const num1 = Number(operands[0]);
      const num2 = Number(operands[1]);

      if(operator[0] === '+'){
        computed = num1 + num2;
      }
      else if(operator[0] === '-'){
          computed = num1 - num2;
      }
      else if(operator[0] === 'x'){
          computed = num1 * num2;
      }
      else if(operator[0] === '/'){
          computed = num1 / num2;
      }

      setOutputResult(computed);
    }
    return computed;
  }

  const outputStringExtraction = (toExtract) => {
    if(outputString.length !== 0){
      const outputStr = outputString;
      if(toExtract === 1){
        return extractNumFromString(outputStr);
      }
      else{
        return extractOperatorFromString(outputStr);
      }
    }
    return;
  }
  
  const appendToOutputString = (keyValue) => {
    let outputChar = outputString;
    outputChar += keyValue;
    setOutputString(outputChar);
  }
  
  const outputStrLastCharCategory = () => {
    if(outputString.length === 0){
      return;
    }
    else{
      let outputStrLastChar = outputString.at(-1);
      let outputStrLastCharNum = Number(outputStrLastChar);
      
      if(outputStrLastChar === 'AC'){
        return 4;
      }
      else if(outputStrLastChar === '.'){
        return 5;
      }
      else if(outputStrLastChar === '='){
        return 3;
      }
      else if( operatorList.includes(outputStrLastChar) ){
        return 2;
      }
      else if( numberList.includes(outputStrLastCharNum) ){
        return 1;
      }
      else{
        return;
      }
    }    
  }
  
  return (
    <div className="App">
      <Calculator>
          <Output outputString={outputString} outputResult={outputResult} />
          <ButtonWrap onKeyPress={saveKeyPressed} />
      </Calculator>
    </div>
  );
}
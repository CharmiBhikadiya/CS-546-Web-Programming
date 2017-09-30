function checkNum(numLines){
if(numLines == null || numLines == undefined){
throw "Entered number is not valid number!";
}
if(typeof numLines !== 'number'){
throw "Entered value is not numeric!";
}
}

module.exports = {
    
    triangleShape: function(numLines){
        checkNum(numLines);
        var i, spc, j, pattern;
        for(i=1; i<=numLines; i++){
          pattern = "";
            for(spc=numLines; spc>=i; spc--){
                pattern += " ";
            }
            pattern += "\/";
            for(j=1; j<=(2*i)-2; j++){
                if(i === numLines){
                    pattern += "-";
                }else{
                    pattern +=" ";
                }
            }
            pattern += "\\";
           console.log(pattern);
        }
        console.log('\n');
    },
    
    squareShape: function(numLines){
        checkNum(numLines);
        var i, j, pattern;
        
        for (i = 1; i <= numLines; i++) {
            pattern = "";
            pattern += "|";
            for(j=1; j<= numLines; j++){
                if(i === 1 || i === numLines){
                   pattern += "-";
                }else{
                    pattern += " ";
                }
            }
            pattern += "|";
            console.log(pattern);
            
        }
    console.log('\n');
    },
    
    rhombusShape: function(numLines){
        checkNum(numLines);
        if(numLines < 2){
            throw "Enetr number should be greater than or equal to 2";
        }
        if(numLines % 2 !== 0){
            throw "For making Rhombus, number should be even";
        }
        var i, spc, j, pattern;
        for(i=1; i<=numLines/2; i++){
          pattern = "";
            for(spc=numLines; spc>=i; spc--){
                pattern += " ";
            }
            pattern += "\/";
            if(i === 1){
                pattern += "-";
            }else{
                for(j=1; j< (2*i); j++ ){
                    pattern += " ";
                }
            }
            pattern += "\\";
           console.log(pattern);
        }
        for(i=numLines/2; i>=1; i--){
            pattern = "";
            for(spc=numLines; spc>=i; spc--){
                pattern += " ";
            }
            pattern += "\\";
            if(i === 1){
                pattern += "-";
            }
            else{
                for(j= (2*i - 1); j >= 1; j--){
                    pattern += " ";
                }
            }
            pattern += "\/";
            console.log(pattern);
        }
        console.log('\n');
    }
    };
    
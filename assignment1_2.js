let input = [1,2,3,4,5,6,7,8,9,10];

remove_odd(input);
sum(input);

//using modulus to find even numbers and creating new array with desired numbers
function remove_odd(arr) {
    var evenArr = [];
    for(var i = 0; i < arr.length; i++){
        if(arr[i]%2 == 0){
            evenArr.push(arr[i]);
        }
    }
    document.write(evenArr);
    document.write("<br>");
}

//using modulus to get even numbers and adding them to sum
function sum(arr){
    var sum = 0;
    
    for(var i = 0 ; i < arr.length; i++){
        if(arr[i]%2 == 0){
            sum += arr[i];
        }
    }
    document.write(sum);
}
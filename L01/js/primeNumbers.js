

printAllPrimeNumbersUpTo(100) //=> 2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, ...

function printAllPrimeNumbersUpTo(number) {

    // create an empty array to store the prime numbers
    const primeNumbers = [];

    // loop all numbers from first primenumber to the number variable.
    for (let i = 2; i <= number; i++) {
        // loop all numbers from first primenumber to the number variable.
        let isPrime = true;
        for (let j = 2; j < i; j++) {
            // number modulos j == 0, then its not a prime number
            if (i % j == 0) {
                // is not a prime number
                isPrime = false;
                break
            }
        }
        // reach here, then its a prime number
        if (isPrime) {
            primeNumbers.push(i);
        }
    }

    // print the prime numbers
    console.log(primeNumbers.toString());
}
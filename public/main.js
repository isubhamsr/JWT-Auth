var num1 = Math.floor(Math.random() * 100 + 1)
var num2 = Math.floor(Math.random() * 100 + 1)

var sum = num1 + num2
console.log(sum);


document.getElementById("question").innerHTML = `${num1} + ${num2}`

fire = () => {
    var result = document.getElementById("answer").value
    console.log(result);
    if (result == sum) {
        alert("Right Answare")
    } else { alert("Wrong Answare: Correct Answare is: " + sum + " Try Again!") }

    document.getElementById("answer").value = ""
    num1 = Math.floor(Math.random() * 100 + 1)
    num2 = Math.floor(Math.random() * 100 + 1)
    document.getElementById("question").innerHTML = `${num1} + ${num2}`
    sum = num1 + num2
    console.log(sum);


    
}
logout = () => {
    localStorage.removeItem("token");
    window.location.replace("/signin");
    console.log("Delete click");
    
}
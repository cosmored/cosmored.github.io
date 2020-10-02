let startbtn = document.querySelector("#startBtn");
startbtn.addEventListener("click", guesser);

function guesser() {
    const low = 1;
    const high = 20;

    const correct_ans = Math.floor((Math.random() * 10) + 1);
    console.log(correct_ans);

    let success = false;

    for (let i = 1; i < 4; i++) {
        let input = parseInt(prompt(`Guess the number! \n hint: it is between ${low} and ${high}`));
        if (input == correct_ans) {
            success = true;
            alert("You win");
            break;
        } else if (input < correct_ans) {
            alert("Correct answer is greater!");
        } else if (input > correct_ans) {
            alert("Correct answer is smaller!");
        }
    }

    if (success === false) {
        alert("You lose!");
    }
}
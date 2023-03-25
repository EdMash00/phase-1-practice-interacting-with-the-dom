document.addEventListener("DOMContentLoaded", function() {

    //initial counter value
    let counterValue = 0;
  
    // get DOM elements
    const counter = document.querySelector("#counter");
    const plusBtn = document.querySelector("#plus");
    const minusBtn = document.querySelector("#minus");
    const heartBtn = document.querySelector("#heart");
    const pauseBtn = document.querySelector("#pause");
    const likesList = document.querySelector(".likes");
    const commentForm = document.querySelector("#comment-form");
    const commentInput = document.querySelector("#comment-input");
    const commentsList = document.querySelector("#list");
  
    // increment counter every second
    const intervalId = setInterval(() => {
      counterValue++;
      counter.textContent = counterValue;
    }, 1000);
  
    // manually increment and decrement counter value
    plusBtn.addEventListener("click", () => {
      counterValue++;
      counter.textContent = counterValue;
    });
  
    minusBtn.addEventListener("click", () => {
      counterValue--;
      counter.textContent = counterValue;
    });
  
    // like an individual number of the counter
    let likesCount = {};
  
    heartBtn.addEventListener("click", () => {
      if (!likesCount[counterValue]) {
        likesCount[counterValue] = 1;
      } else {
        likesCount[counterValue]++;
      }
      // clear likes list and rebuild it
      likesList.innerHTML = "";
      for (let [num, count] of Object.entries(likesCount)) {
        const li = document.createElement("li");
        li.textContent = `${num} has ${count} likes`;
        likesList.appendChild(li);
      }
    });
  
    // pause the counter
    let isPaused = false;
  
    pauseBtn.addEventListener("click", () => {
      isPaused = !isPaused;
      if (isPaused) {
        clearInterval(intervalId);
        plusBtn.disabled = true;
        minusBtn.disabled = true;
        heartBtn.disabled = true;
        pauseBtn.textContent = "resume";
      } else {
        intervalId = setInterval(() => {
          counterValue++;
          counter.textContent = counterValue;
        }, 1000);
        plusBtn.disabled = false;
        minusBtn.disabled = false;
        heartBtn.disabled = false;
        pauseBtn.textContent = "pause";
      }
    });
  
    // restart the counter and enable buttons
    const restartCounter = () => {
      counterValue = 0;
      counter.textContent = counterValue;
      likesCount = {};
      likesList.innerHTML = "";
      plusBtn.disabled = false;
      minusBtn.disabled = false;
      heartBtn.disabled = false;
      pauseBtn.textContent = "pause";
    };
  
    // handle form submit to add comment
    commentForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const comment = commentInput.value.trim();
      if (comment !== "") {
        const p = document.createElement("p");
        p.textContent = comment;
        commentsList.appendChild(p);
        commentInput.value = "";
      }
    });
  
  });
  

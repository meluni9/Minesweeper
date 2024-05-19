"use strict";

let timerInterval;

export const startTimer = (timerElement) => {
    const startTime = Date.now();
    timerInterval = setInterval(() => {
        const elapsedTime = Math.floor((Date.now() - startTime) / 1000);
        timerElement.textContent = elapsedTime;
    }, 1000);
};

export const stopTimer = () => {
    clearInterval(timerInterval);
};

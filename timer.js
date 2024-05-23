"use strict";

let timerInterval;

export const startTimer = (timerElement) => {
    const startTime = Date.now();
    timerInterval = setInterval(() => {
        timerElement.textContent = Math.floor((Date.now() - startTime) / 1000);
    }, 1000);
};

export const stopTimer = () => {
    clearInterval(timerInterval);
};

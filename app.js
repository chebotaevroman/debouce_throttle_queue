const input = document.querySelector("input");

const onInput = (e) => console.log(e);

const debouncedOnInput = debounce(onInput, 1000);
const throttledOnInput = throttle(onInput, 1000);
const queuedOnInput = queue(onInput, 1000);

input.addEventListener("input", queuedOnInput);

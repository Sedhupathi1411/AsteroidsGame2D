const imgData = `data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB2ZXJzaW9uPSIxLjEiIGlkPSJMYXllcl8xIiB4PSIwcHgiIHk9IjBweCIgdmlld0JveD0iMCAwIDEyMi44OCA2Ni45MSIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgMTIyLjg4IDY2LjkxIiB4bWw6c3BhY2U9InByZXNlcnZlIj48Zz48cGF0aCBkPSJNMTEuNjgsNjQuOTZjLTIuNzIsMi42NS03LjA4LDIuNTktOS43My0wLjE0Yy0yLjY1LTIuNzItMi41OS03LjA4LDAuMTMtOS43M0w1Ni44NywxLjk3bDQuOCw0LjkzbC00LjgxLTQuOTUgYzIuNzQtMi42NSw3LjEtMi41OCw5Ljc2LDAuMTVjMC4wOCwwLjA4LDAuMTUsMC4xNiwwLjIzLDAuMjRMMTIwLjgsNTUuMWMyLjcyLDIuNjUsMi43OCw3LjAxLDAuMTMsOS43MyBjLTIuNjUsMi43Mi03LDIuNzgtOS43MywwLjE0TDYxLjY1LDE2LjVMMTEuNjgsNjQuOTZMMTEuNjgsNjQuOTZ6IiBzdHlsZT0iZmlsbDogd2hpdGU7Ii8+PC9nPjwvc3ZnPg==`;

export function addControllerToDOM() {
    const controls = document.querySelector('.controls') as HTMLElement;
    controls.style.display = "block";
    
    const leftBtn = document.querySelector(".controls .left-btn") as HTMLElement;
    leftBtn.ontouchstart = () => window.dispatchEvent(new KeyboardEvent("keydown", { key: "ArrowLeft" }));
    leftBtn.ontouchend = () => window.dispatchEvent(new KeyboardEvent("keyup", { key: "ArrowLeft" }));
    
    const rightBtn = document.querySelector(".controls .right-btn") as HTMLElement;
    rightBtn.ontouchstart = () => window.dispatchEvent(new KeyboardEvent("keydown", { key: "ArrowRight" }));
    rightBtn.ontouchend = () => window.dispatchEvent(new KeyboardEvent("keyup", { key: "ArrowRight" }));
    
    const upBtn = document.querySelector(".controls .up-btn") as HTMLElement;
    upBtn.ontouchstart = () => window.dispatchEvent(new KeyboardEvent("keydown", { key: "ArrowUp" }));
    upBtn.ontouchend = () => window.dispatchEvent(new KeyboardEvent("keyup", { key: "ArrowUp" }));

    // image
    [leftBtn, rightBtn, upBtn].forEach(div => div.style.backgroundImage = `url('${imgData}')`);

    const fireBtn = document.querySelector(".controls .fire-btn") as HTMLElement;
    fireBtn.ontouchstart = () => window.dispatchEvent(new KeyboardEvent("keydown", { key: " " }));
    fireBtn.ontouchend = () => window.dispatchEvent(new KeyboardEvent("keyup", { key: " " }));

}

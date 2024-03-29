import { Game } from "./game";
import { CONSTANTS } from "./constants";
import { Player, Rocket } from "./player";
import { PolygonsM } from "./asteroids";
import { FireGun } from "./bullets";
import { keyStates } from "./events";
import { Vector } from "./utils/vector";
import { addControllerToDOM } from "./controls";


function startGame() {
    var player = new Player();
    var animhandler = 0;
    var isOnForeground = true;

    // Setup
    Game.Init();
    PolygonsM.Init(player);
    FireGun.Init();


    // Update
    function updateLoop() {

        if (Game.shouldRefresh) {
            Game.shouldRefresh = false;
            PolygonsM.restart();
            FireGun.restart();
            cancelAnimationFrame(animhandler);
            if (Game.isGameOver) Game.GameOver();
            else setTimeout(startGame, CONSTANTS.REFRESH_TIME);
            return;
        }

        Game.ctx.fillStyle = "black";
        Game.ctx.fillRect(0, 0, Game.width, Game.height);

        Game.Update();
        FireGun.Update();
        PolygonsM.update(); // Asteroid & Player

        if (keyStates.space) FireGun.Fire(player.center, player.points[0].dir());

        if (PolygonsM.asteroids.length == 1) { // Player only left
            Game.score += CONSTANTS.SCORE_COUNT.LEVEL_UP;
            Game.shouldRefresh = true;
        }

        if (isOnForeground) animhandler = requestAnimationFrame(updateLoop);
    }

    updateLoop();

    window.onblur = () => isOnForeground = false;

    window.onfocus = () => {
        isOnForeground = true;
        updateLoop();
    }
}

window.onload = () => {
    var animhandler = 0;

    // Setup
    Game.Init();
    PolygonsM.Init(new Rocket(new Vector(Game.width / 2, Game.height / 2)));

    // Update
    function updateLoop() {
        Game.ctx.fillStyle = "black";
        Game.ctx.fillRect(0, 0, Game.width, Game.height);
        PolygonsM.update(); // Asteroid & Player
        animhandler = requestAnimationFrame(updateLoop);
    }

    updateLoop();

    window.onclick = window.onkeydown = () => {
        cancelAnimationFrame(animhandler);
        window.onclick = window.onkeydown = () => { }
        Game.Life = 3;
        Game.score = 0;
        document.body.removeChild(document.getElementById("fScreen"));
        document.body.requestFullscreen()
            .then(() => {
                if (CONSTANTS.IS_MOBILE_DEVICE) {
                    screen.orientation.lock("landscape-primary");
                    addControllerToDOM();
                    startGame();
                }
            })
            .finally(() => {
                if (!CONSTANTS.IS_MOBILE_DEVICE) startGame();
            });
    }
}

window.onresize = () => {
    Game.width = Game.canvas.width = innerWidth;
    Game.height = Game.canvas.height = innerHeight;
}

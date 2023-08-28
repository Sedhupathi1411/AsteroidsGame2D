export const CONSTANTS = {
    INITIAL_ASTEROIDS_COUNT: 8,
    GAME_REFRESH_TIME: 200,
    GUN_REFRESHING_RATE: 15,
    BULLET_LIFE_SPAN: 200,
    BULLET_LENGTH: 8,
    ASTEROID_MAXSPEED: 1.6,
    ASTEROID_MINSPEED: 0.5,
    /** Max hit an asteroid can get */
    ASTEROID_STRENGTH: 5,
    ROCKET_SIZE: () => innerWidth / 30,

    ROCKET_ACC_MAG: 0.5,

    SCORE_COUNT: {
        LEVEL_UP: 500,
        BURST: 150,
        HIT: 50
    },

    REFRESH_TIME: 500,
    IS_MOBILE_DEVICE: [/Android/i, /webOS/i, /iPhone/i, /iPad/i, /BlackBerry/i, /Windows Phone/i].some(regex => navigator.userAgent.match(regex)),
};

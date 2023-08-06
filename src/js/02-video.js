import Player from '@vimeo/player';
console.log(Player);

import throttle from 'lodash.throttle';

const CURRENT_TIME_KEY = 'videoplayer-current-time';
const iframe = document.querySelector('iframe');
const player = new Player(iframe);

player.on('timeupdate', throttle(getPlayedTime, 1000));

function getPlayedTime (currentTime) {
    const playedTime = currentTime.seconds;
    localStorage.setItem(CURRENT_TIME_KEY, JSON.stringify(playedTime));
};

player.setCurrentTime(JSON.parse(localStorage.getItem(CURRENT_TIME_KEY)) || 0);
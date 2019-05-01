import Alarm from '../../../assets/sounds/alarm.mp3';
import Coffee from '../../../assets/images/coffee.png';
import Code from '../../../assets/images/code.png';

const pomodoroAlert = (sessionLength, audioSetting, notificationSetting) => {
  // audio
  if (audioSetting) {
    const newAudio = new Audio(Alarm);
    const playPromise = newAudio.play();

    // In browsers that don’t yet support this functionality,
    // playPromise won’t be defined.
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          // Automatic playback started!
          setTimeout(() => newAudio.pause(), 2500);
        })
        .catch(error => {
          // Automatic playback failed.
          // Show a UI element to let the user manually start playback.
          console.log(error);
        });
    }
  }
  // notification
  if (notificationSetting) {
    if (sessionLength === 25) {
      const newNotification = new Notification('Relax :)', {
        icon: Coffee,
        lang: 'en',
        body: 'Relax, have a coffee.'
      });
    } else {
      const newNotification = new Notification('The time is over!', {
        icon: Code,
        lang: 'en',
        body: 'Hey, back to work!'
      });
    }
  }
};

export default pomodoroAlert;

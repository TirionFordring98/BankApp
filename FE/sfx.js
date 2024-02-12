import { Howl } from "howler";

export const playClickSound = () => {
  const sound = new Howl({
    src: ["./public/SFX/Click.mp3"], // Replace with the path to your click sound file
  });
  sound.play();
};

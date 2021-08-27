import Phaser from "phaser";

class Colorfun extends Phaser.Scene
{
    constructor ()
    {
        super();
    }

    create ()
    {
        const color = new Phaser.Display.Color();
        for (let i = 0; i < 100; i++)
        {
            color.random(50);
            this.add.rectangle(400, i * 6, 800, 6, color.color);
        }
    }
}

export default Colorfun;
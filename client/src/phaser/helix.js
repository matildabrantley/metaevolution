import Phaser from "phaser";

var graphics;
var line, lines;
let count = 0;

class Helix extends Phaser.Scene
{
    constructor ()
    {
        super();
    }
    
    create ()
    {
        let n = (Math.random() * 0xfffff * 1000000).toString(16);
        let randColor = '0x' + n.slice(0, 6);
        graphics = this.add.graphics({ lineStyle: { width: 4, color: randColor, alpha: 0.6 } });
    
        line = new Phaser.Geom.Line(1, 300, 400, 300);
    
        lines = [];
    }

    update ()
{
    count++;
    Phaser.Geom.Line.Rotate(line, 0.03);

    //graphics = this.add.graphics({ lineStyle: { width: 4, color: randColor, alpha: 0.6 } });


    lines.push(Phaser.Geom.Line.Clone(line));

    graphics.clear();

    graphics.strokeLineShape(line);

    for(var i = 0; i < lines.length; i++)
    {
        Phaser.Geom.Line.Offset(lines[i], 2, Math.random() - 0.5);

        if(lines[i].left > 800)
        {
            lines.splice(i--, 1);
        }
        else
        {
            graphics.strokeLineShape(lines[i]);
        }

    }

    if (count > 300){
        graphics.clear();
        graphics.destroy();
        let n = (Math.random() * 0xfffff * 1000000).toString(16);
        let randColor = '0x' + n.slice(0, 6);
        graphics = this.add.graphics({ lineStyle: { width: 4, color: randColor, alpha: 0.6 } });
        lines = [];
        count = 0;
    }

}
}

export default Helix;
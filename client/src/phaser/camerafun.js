import Phaser from "phaser";
import floral from './assets/sprites/floral-stunning.jpg';
import floral2 from './assets/sprites/floral-colorful.jpg';

class Camerafun extends Phaser.Scene
{
    constructor ()
    {
        super();
    }

    preload () 
    {
        this.load.image('background', floral);
        this.load.image('background2', floral2);
    }

    create () 
    {
        const cam = this.cameras.main.setBounds(0, 0, 1440, 1440);



        this.bgs = [];
        this.bgs.push(this.add.image(0, 0, 'background').setOrigin(0));
        this.bgs.push(this.add.image(720, 0, 'background').setOrigin(0));
        this.bgs[1].flipX=true;
        this.bgs.push(this.add.image(0, 720, 'background').setOrigin(0));
        this.bgs[2].flipY=true;
        this.bgs.push(this.add.image(720, 720, 'background').setOrigin(0));
        this.bgs[3].flipX=true;
        this.bgs[3].flipY=true;

        for (const background of this.bgs) {
            background.setDisplaySize(2048, 2048);
            background.setScale(0.5);
            background.alpha = 0.4;
        }

        this.bgs2 = [];
        this.bgs2.push(this.add.image(0, 0, 'background2').setOrigin(0));
        this.bgs2.push(this.add.image(720, 0, 'background2').setOrigin(0));
        this.bgs2[1].flipX=true;
        this.bgs2.push(this.add.image(0, 720, 'background2').setOrigin(0));
        this.bgs2[2].flipY=true;
        this.bgs2.push(this.add.image(720, 720, 'background2').setOrigin(0));
        this.bgs2[3].flipX=true;
        this.bgs2[3].flipY=true;

        for (const background of this.bgs2) {
            background.setDisplaySize(2048, 2048);
            background.setScale(0.5);
            background.alpha = 0.2;
        }
        
        this.maxOpacity = 0.5;
        this.bgOpacity = this.maxOpacity;
        this.bgOpacity2 = 0;
        this.bgOpacityDirection = 1;


    
        this.cursors = this.input.keyboard.createCursorKeys();
        this.keys = this.input.keyboard.addKeys('W,A,S,D');
    
        // this.cameras.main.originX = 1;
        this.cameras.main.centerToSize();
        cam.setBackgroundColor(0xbababa);
    }

    update () 
    {
        if (this.bgOpacity >= this.maxOpacity)
            this.bgOpacityDirection = -1;
        else if (this.bgOpacity <= 0)
            this.bgOpacityDirection = 1;
  
        this.bgOpacity += 0.001 * this.bgOpacityDirection;
        this.bgOpacity2 += 0.001 * this.bgOpacityDirection * -1;
        
        this.bgs.forEach(bg => { bg.alpha = this.bgOpacity })
        this.bgs2.forEach(bg => { bg.alpha = this.bgOpacity2 })
        

        const cam = this.cameras.main;
    
        if (this.keys.A.isDown)
        {
            cam.scrollX -= 4;
        }
        else if (this.keys.D.isDown)
        {
            cam.scrollX += 4;
        }
    
        if (this.keys.W.isDown)
        {
            cam.scrollY -= 4;
        }
        else if (this.keys.S.isDown)
        {
            cam.scrollY += 4;
        }
    
        if (this.cursors.left.isDown)
        {
            cam.rotation -= 0.005;
        }
        else if (this.cursors.right.isDown)
        {
            cam.rotation += 0.005;
        }
    }
}

export default Camerafun;
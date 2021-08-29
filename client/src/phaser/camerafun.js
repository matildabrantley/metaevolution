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
        this.backgrounds = ['background', 'background2'];
        this.load.image(this.backgrounds[0], floral);
        this.load.image(this.backgrounds[1], floral2);
    }

    create () 
    {
        const cam = this.cameras.main.setBounds(0, 0, 1440, 1440);

        let numStyles = 2;
        this.bgs = [];
        for (let i=0; i < numStyles; i++)  {
            let newBg = this.backgrounds[i];
            //four quadrants of background
            const bg = new Array(4);
            bg[0] = this.add.image(0, 0, newBg).setOrigin(0);
            bg[1] = this.add.image(720, 0, newBg).setOrigin(0);
            bg[1].flipX=true;
            bg[2] = this.add.image(0, 720, newBg).setOrigin(0);
            bg[2].flipY=true;
            bg[3] = this.add.image(720, 720, newBg).setOrigin(0);
            bg[3].flipX=true;
            bg[3].flipY=true;
            for (const quadrant of bg) {
                quadrant.setDisplaySize(2048, 2048);
                quadrant.setScale(0.5);
                quadrant.alpha = 0.4;
            }
            this.bgs.push(bg);
        }

        // for (const background of this.bgs) {
        //     background.setDisplaySize(2048, 2048);
        //     background.setScale(0.5);
        //     background.alpha = 0.4;
        // }

        // this.bgs2 = [];
        // this.bgs2.push(this.add.image(0, 0, 'background2').setOrigin(0));
        // this.bgs2.push(this.add.image(720, 0, 'background2').setOrigin(0));
        // this.bgs2[1].flipX=true;
        // this.bgs2.push(this.add.image(0, 720, 'background2').setOrigin(0));
        // this.bgs2[2].flipY=true;
        // this.bgs2.push(this.add.image(720, 720, 'background2').setOrigin(0));
        // this.bgs2[3].flipX=true;
        // this.bgs2[3].flipY=true;

        // for (const background of this.bgs2) {
        //     background.setDisplaySize(2048, 2048);
        //     background.setScale(0.5);
        //     background.alpha = 0.2;
        // }
        
        this.maxOpacity = 0.5;
        this.bgOpacity = new Array(numStyles);
        this.bgOpacity[0] = this.maxOpacity;
        this.bgOpacity[1] = 0;
        this.bgOpacityDirection = 1;


    
        this.cursors = this.input.keyboard.createCursorKeys();
        this.keys = this.input.keyboard.addKeys('W,A,S,D');
    
        // this.cameras.main.originX = 1;
        this.cameras.main.centerToSize();
        cam.setBackgroundColor(0xffffff);
    }

    update () 
    {
        if (this.bgOpacity[0] >= this.maxOpacity)
            this.bgOpacityDirection = -1;
        else if (this.bgOpacity[0] <= 0)
            this.bgOpacityDirection = 1;
  
        this.bgOpacity[0] += 0.001 * this.bgOpacityDirection;
        this.bgOpacity[1] += 0.001 * this.bgOpacityDirection * -1;
        
        for (let i in this.bgs) {
            this.bgs[i].forEach(quadrant => { quadrant.alpha = this.bgOpacity[i] }) ;
        }

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
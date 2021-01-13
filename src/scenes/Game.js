const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

const game = new Phaser.Game(config);

function preload ()
{
    this.load.image('tiles', 'src/tiles/default.png');
    this.load.tilemapTiledJSON('floor', 'src/tiles/finalized.json')
}

function create ()
{
    const map = this.make.tilemap({ key: 'floor' })
    const tileset = map.addTilesetImage('default', 'tiles')

    const layer = map.createLayer('Tile Layer 1', tileset)
}

function update ()
{
    if (this.game.input.activePointer.isDown) {
        if (this.game.origDragPoint) {
          // move the camera by the amount the mouse has moved since last update
          this.cameras.main.scrollX +=
            this.game.origDragPoint.x - this.game.input.activePointer.position.x;
          this.cameras.main.scrollY +=
            this.game.origDragPoint.y - this.game.input.activePointer.position.y;
        } // set new drag origin to current position
        this.game.origDragPoint = this.game.input.activePointer.position.clone();
      } else {
        this.game.origDragPoint = null;
      }
}
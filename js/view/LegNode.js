// Copyright 2002-2013, University of Colorado Boulder

/**
 * Scenery display object (scene graph node) for the leg of the model.
 @author Vasily Shakhov (Mlearner)
 */

define( function( require ) {
  'use strict';
  var inherit = require( 'PHET_CORE/inherit' );
  var Node = require( 'SCENERY/nodes/Node' );
  var Image = require( 'SCENERY/nodes/Image' );
  var SimpleDragHandler = require( 'SCENERY/input/SimpleDragHandler' );
  var Vector2 = require( 'DOT/Vector2' );
  var Shape = require( 'KITE/Shape' );
  var Path = require( 'SCENERY/nodes/Path' );
  var JohnTravoltageImages = require( 'JohnTravoltageImages' );

  function LegNode( model, scene ) {
    var self = this;

    // super constructor
    Node.call( this, { cursor: 'pointer' } );

    this.x = model.location.x;
    this.y = model.location.y;

    this.model = model;

    this.addInputListener( {
      down: function( event ) {
        scene.rotationObject = self;
        self.border.visible = false;
      }
    } );

    // add the image
    this.addChild( new Image( JohnTravoltageImages.getImage( 'leg.png' ) ) );

    this.border = new Path( {
      shape: new Shape.roundRect( 0, 0, 140, 160, 10, 10 ),
      x: 0, y: 0,
      stroke: '#f58220',
      lineWidth: 1,
      lineDash: [ 10, 10 ],
      renderer: 'svg'
    } );
    this.addChild( this.border );

    //changes visual position
    model.rotationAngleProperty.link( function updateLocation( angle ) {
      self.rotation = angle;
      //save angle history
      model.angleHistory[0] = model.angleHistory[1];
      model.angleHistory[2] = model.angleHistory[2];
      model.angleHistory[2] = angle;
    } );
  }

  inherit( Node, LegNode ); // prototype chaining

  return LegNode;
} );
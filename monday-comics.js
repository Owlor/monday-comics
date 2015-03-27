// monday-comics.js
// Copyright 2015 Ross Angle. Released under the MIT License.
//
// I'm thinking of developing a casual habit on Sunday nights: Write a
// tiny self-contained celebration of some characters I like, thus
// giving myself a sense of accomplishment and a clean palette for the
// approaching work week. Since writer's block would only have the
// opposite effect, I'm making a procedural generator of writing
// prompts.

"use strict";

function randomlyPickNat( max ) {
    if ( max === 0 )
        throw new Error();
    do {
        var i = Math.floor( Math.random() * max );
    } while ( i === max );
    return i;
}

function randomlyPickElement( arr ) {
    return arr[ randomlyPickNat( arr.length ) ];
}

function randomlyPickWeighted( arr ) {
    var n = arr.length;
    if ( n === 0 )
        throw new Error();
    var total = 0;
    _.arrEach( arr, function ( elem ) {
        total += elem.weight;
    } );
    var chosenWeight = randomlyPickNat( total );
    return _.arrAny( arr, function ( elem ) {
        if ( chosenWeight <= elem.weight )
            return { val: elem.val };
        chosenWeight -= elem.weight;
        return false;
    } ).val;
}

var characters = [];
var prompts = [];

function randomlyPickCharacter() {
    return randomlyPickElement( characters );
}

function randomlyPickQuality( character ) {
    return randomlyPickElement( character.qualities );
}

function randomlyPickMondayComicPrompt() {
    return randomlyPickWeighted( prompts )();
}

// The detail takes B by surprise. (1 configuration)
prompts.push( { weight: 1, val: function () {
    do {
        var main = randomlyPickCharacter();
        var foil = randomlyPickCharacter();
        var havingQuality = randomlyPickQuality( main );
    } while ( main.name === foil.name );
    
    return "The fact of " + main.name + " " + havingQuality + " " +
        "takes " + foil.name + " by surprise.";
} } );

// B tries to use the detail to their advantage and either succeeds or
// fails. Maybe they fail because of another detail.
// (3 configurations)
prompts.push( { weight: 3, val: function () {
    do {
        var main = randomlyPickCharacter();
        var foil = randomlyPickCharacter();
        var havingQuality = randomlyPickQuality( main );
        var havingAnotherQuality = randomlyPickQuality( main );
    } while ( main.name === foil.name
        || havingQuality === havingAnotherQuality );
    
    return foil.name + " tries to benefit from " + main.name + " " +
        havingQuality + ", " +
        randomlyPickElement( [
            "and the attempt succeeds.",
            "but the attempt fails.",
            "but the attempt fails because of " + main.name + " " +
                havingAnotherQuality + "."
        ] );
} } );

// B or A offers advice to or solicits advice from the other, in
// regard to that detail. (4 configurations)
prompts.push( { weight: 4, val: function () {
    do {
        var main = randomlyPickCharacter();
        var foil = randomlyPickCharacter();
        var havingQuality = randomlyPickQuality( main );
    } while ( main.name === foil.name );
    
    return randomlyPickElement( [
        main.name + ", enthused with " + havingQuality + ", offers " +
            "advice to " + foil.name + ".",
        main.name + ", frustrated with " + havingQuality + ", " +
            "seeks advice from " + foil.name + ".",
        foil.name + " offers advice to " + main.name + " to deal " +
            "with " + havingQuality + ".",
        foil.name + " seeks advice from " + main.name + " on " +
            havingQuality + "."
    ] );
} } );

// They participate in a situation where the detail is surprisingly
// valuable or surprisingly challenging. (2 configurations)
prompts.push( { weight: 2, val: function () {
    do {
        var main = randomlyPickCharacter();
        var foil = randomlyPickCharacter();
        var havingQuality = randomlyPickQuality( main );
    } while ( main.name === foil.name );
    
    return foil.name + " discovers a surprising " +
        randomlyPickElement( [ "benefit ", "drawback " ] ) + "in " +
        main.name + " " + havingQuality + ".";
} } );

characters.push( { name: "Magical Radia", qualities: [
    "breaking the fourth wall",
    "liking Fromara",
    "pretending to be straight",
    "having elephant-shaped hair",
    "doing magic",
    "believing in individual rights"
] } );

characters.push( { name: "Fromara", qualities: [
    "being optimistic",
    "being a troll",
    "letting romance get away from her",
    "having hearts, spades, and S's on her clothes",
    "having lots of money",
    "believing in capitalism"
] } );

characters.push( { name: "Robbie", qualities: [
    "being a master thief",
    "liking Magical Radia",
    "having no sense of humor",
    "wearing belts instead of a shirt",
    "having inner focus",
    "doing magic",
    "believing in centralization"
] } );
